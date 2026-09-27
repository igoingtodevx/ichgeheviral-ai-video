# Production Backend Boundary

This layer is the minimal Railway boundary around the frozen `GOLDEN_V1` engine.
`produce_pool.py`, `prompts.py`, `GOLDEN_V1.md`, golden tags, and accepted runs are not changed.

## Final V1 topology

```text
POST /checkout
  -> PostgreSQL purchase_drafts row
  -> Shopify Storefront API cartCreate (live mode only)
  -> browser redirects to checkout_url
  -> Shopify orders/paid webhook
  -> HMAC/domain/variant verification + webhook dedupe
  -> exactly one PostgreSQL jobs row
  -> Railway Worker claims queued row (FOR UPDATE SKIP LOCKED)
  -> frozen produce_pool.py / Golden V1
  -> Runware
  -> Railway Bucket: jobs/<job-id>/...
  -> completed row + presigned final.mp4 URL
```

`COMMERCE_BACKEND=mock` stops after the draft and deterministic mock checkout
response. It never creates a job and never pretends money was paid. Anonymous
production `POST /jobs` is disabled; only a verified paid Shopify webhook can
create a production generation job.

- API service
- Worker service
- PostgreSQL
- Railway Storage Bucket
- Runware for the unchanged Golden V1 inference path

There is no Redis, Google Cloud, Cloudflare R2, Kubernetes, VPS production dependency,
authentication, payment logic, frontend, or generic workflow engine.

## Processes

Both Railway services build the repository's `Dockerfile`.

API service start command:

```bash
python -m pool_backend.api --host 0.0.0.0
```

Worker service start command:

```bash
python -m pool_backend.worker --loop --jobs-dir /tmp/pool-jobs --concurrency 1
```

The API honors Railway's `PORT` variable. The worker defaults to one in-process job and
hard-rejects concurrency above two. Keep the Railway Worker at one replica initially;
PostgreSQL claims remain atomic if a second worker is deliberately added later.

The API never waits for generation. `POST /jobs` only validates the concept, writes the
queued row, and returns `202`. The worker is the only process that invokes Golden V1.

## PostgreSQL job schema

`pool_backend/schema.sql` is the standalone schema. The API and Worker also apply the
same idempotent `CREATE TABLE IF NOT EXISTS` statements at startup.

```sql
CREATE TABLE IF NOT EXISTS jobs (
    id TEXT PRIMARY KEY,
    idempotency_key TEXT UNIQUE,
    status TEXT NOT NULL CHECK (status IN (
        'queued', 'generating_images', 'generating_videos',
        'assembling', 'completed', 'failed'
    )),
    concept TEXT NOT NULL,
    progress JSONB NOT NULL,
    cost NUMERIC(12, 7),
    error TEXT,
    final_video_key TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    claimed_at TIMESTAMPTZ,
    completed_at TIMESTAMPTZ
);
CREATE INDEX IF NOT EXISTS jobs_queue_idx ON jobs (status, created_at, id);
```

`PostgresJobStore.claim_next()` uses one transaction containing:

```sql
SELECT ... FOR UPDATE SKIP LOCKED;
UPDATE jobs SET status = 'generating_images', claimed_at = NOW();
```

The implementation uses the equivalent single CTE `UPDATE ... FROM next_job ... RETURNING`
statement. A second worker skips the locked row. A job can only transition from `queued`
to claimed once, so a worker retry cannot start a second paid Golden run for the same job.

`progress` is JSON with `phase`, `completed`, `total`, and `percent`. `cost` is the actual
`total_runware_cost_usd` retained from the Golden manifest when available. `final_video_key`
is the object-storage key, normally `jobs/<job-id>/final.mp4`.

## Purchase-draft and webhook schema

The same startup schema also creates these minimal commerce tables:

```sql
CREATE TABLE IF NOT EXISTS purchase_drafts (
    request_id TEXT PRIMARY KEY,
    concept TEXT NOT NULL,
    add_course BOOLEAN NOT NULL,
    status TEXT NOT NULL,
    shopify_cart_id TEXT,
    shopify_order_id TEXT,
    video_job_id TEXT,
    error TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE TABLE IF NOT EXISTS shopify_webhook_events (
    webhook_id TEXT PRIMARY KEY,
    request_id TEXT,
    shopify_order_id TEXT,
    status TEXT NOT NULL,
    job_id TEXT,
    received_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
```

`request_id` is generated server-side and persisted before `cartCreate`. The
unique webhook ID is inserted before processing, and the paid-order transaction
locks the draft and inserts one `jobs` row with a unique
`shopify-order:<order-id>` idempotency key.

## Artifact storage

The existing `ArtifactStorage` boundary has two adapters:

- `FilesystemStorage`: local development, tests, and mock Golden-run materialization.
- `S3ArtifactStorage`: Railway's private S3-compatible Bucket.

The worker always uses a local ephemeral workspace while FFmpeg and the frozen engine run.
After materialization, the S3 adapter uploads the complete job tree:

```text
jobs/<job-id>/
  concept.json
  manifest.json
  engine_manifest.json
  run.log
  states/state_01.jpg ... state_08.jpg
  clips/transition_01.mp4 ... transition_07.mp4
  final.mp4
```

QA files and `concat_list.txt` are retained when present. `GET /jobs/:id/video` returns an
HTTP redirect to a private, 15-minute presigned Railway Bucket URL; it does not proxy the
MP4 through the API in production. Local filesystem mode continues to stream the local file
for tests.

## Required Railway variables

Create the variables on **both** API and Worker services unless noted otherwise:

- `DATABASE_URL` — Railway PostgreSQL variable reference.
- `STORAGE_BACKEND=s3`.
- `BUCKET` — Railway Bucket S3 variable reference.
- `ACCESS_KEY_ID` — Railway Bucket S3 variable reference.
- `SECRET_ACCESS_KEY` — Railway Bucket S3 variable reference.
- `REGION` — Railway Bucket S3 variable reference, normally `auto`.
- `ENDPOINT` — Railway Bucket S3 variable reference, for example `https://t3.storageapi.dev`.
- `LOCAL_ARTIFACT_ROOT=/tmp/pool-jobs`.

Worker only:

- `RUNWARE_API_KEY` — Runware secret. Do **not** add it during Shopify boundary
  validation; keep the Worker stopped until paid generation is explicitly approved.
- `WORKER_CONCURRENCY=1` — conservative paid-job limit.

Commerce/API service:

- `COMMERCE_BACKEND=mock` for no-charge staging validation (default-safe mode).
- `COMMERCE_BACKEND=shopify` only after the client supplies live Shopify access.
- `SHOPIFY_STORE_DOMAIN` — real store host, no path.
- `SHOPIFY_STOREFRONT_ACCESS_TOKEN` — Storefront API token.
- `SHOPIFY_APP_SECRET` — webhook HMAC secret.
- `AI_VIDEO_VARIANT_ID` — AI video ProductVariant ID, not product ID.
- `MARKETING_COURSE_VARIANT_ID` — course ProductVariant ID, not product ID.
- Optional `SHOPIFY_API_VERSION` — defaults to `2026-07`.

`POST /jobs` is disabled when `APP_ENV`, `ENVIRONMENT`, or Railway's production
markers identify production. It remains available only for local filesystem
validation; it is not a payment bypass.

Optional:

- `S3_ADDRESSING_STYLE=virtual` when the Bucket Credentials tab specifies virtual-hosted URLs.
  Use `path` only for an older Bucket whose Credentials tab explicitly requires it.

The code also accepts `AWS_BUCKET_NAME`, `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`,
`AWS_DEFAULT_REGION`, and `AWS_ENDPOINT_URL` aliases for local S3-compatible testing. Do not
commit any secret or `.env` file.

## API contract

`POST /checkout` is the only public purchase entry point:

```bash
curl -X POST "$API_URL/checkout" \
  -H 'Content-Type: application/json' \
  -d '{"concept":"Mediterranean villa backyard with an organic lagoon-style luxury pool","add_course":true}'
```

Response:

```json
{"request_id":"req_<opaque-id>","checkout_url":"https://<shop>/checkouts/..."}
```

The draft is persisted before Shopify is called. In mock mode the checkout URL is
synthetic, no money is represented as paid, and no generation job is created. In
live mode the browser redirects to `checkout_url`; the frontend never calls
Shopify directly.

`POST /webhooks/shopify/orders-paid` accepts Shopify's raw JSON webhook body.
It requires `X-Shopify-Hmac-Sha256`, `X-Shopify-Webhook-Id`, and
`X-Shopify-Shop-Domain`. The API verifies HMAC-SHA256 over the untouched raw
bytes, constant-time compares the signature, validates the configured shop,
extracts the opaque `request_id`, checks the configured AI variant, persists the
Shopify order ID, and returns `202` without running Golden V1. The webhook ID
and `shopify-order:<order-id>` idempotency key make retries produce no extra
jobs. Course-only and wrong-variant orders produce zero jobs.

Anonymous production `POST /jobs` returns `403` and cannot bypass payment. The
route remains available only in local/non-production filesystem validation:

```bash
curl -X POST "$API_URL/jobs" \
  -H 'Content-Type: application/json' \
  -H 'Idempotency-Key: local-only-001' \
  -d '{"concept":"local validation only"}'
```

For completed jobs:

```bash
curl "$API_URL/jobs/<job-id>"
curl -L "$API_URL/jobs/<job-id>/video" -o final.mp4
curl "$API_URL/healthz"
```

Statuses are `queued`, `generating_images`, `generating_videos`, `assembling`, `completed`,
or `failed`.

## Local validation without Shopify or Runware

Install the repository requirements, then run:

```bash
COMMERCE_BACKEND=mock python -m unittest discover -s tests -v
```

The mock worker materializes the accepted Golden run in
`runs/20260922T214307399047Z` and performs zero live Shopify, Runware, or paid
inference calls. Do not run a live Runware worker as part of validation.

Manual local processes (filesystem mode; no `DATABASE_URL`):

```bash
COMMERCE_BACKEND=mock python -m pool_backend.api --jobs-dir ./jobs --host 127.0.0.1 --port 8080
python -m pool_backend.worker --jobs-dir ./jobs --once
```

## Exact Railway UI steps remaining

The Railway infrastructure already exists in the linked project. Do **not** add
`RUNWARE_API_KEY` or start the Worker for Shopify boundary validation. When the
client supplies Shopify access, the remaining UI/configuration steps are:

1. On the API service, set `COMMERCE_BACKEND=shopify`.
2. On the API service only, set `SHOPIFY_STORE_DOMAIN`,
   `SHOPIFY_STOREFRONT_ACCESS_TOKEN`, `SHOPIFY_APP_SECRET`,
   `AI_VIDEO_VARIANT_ID`, and `MARKETING_COURSE_VARIANT_ID`.
3. Register one Shopify `orders/paid` JSON webhook at
   `https://<api-domain>/webhooks/shopify/orders-paid`.
4. Keep the Worker stopped and `RUNWARE_API_KEY` unset. Run the controlled
   checkout/webhook E2E described in `SHOPIFY_ACTIVATION.md`; verify one queued
   job and duplicate-event deduplication.
5. Only after explicit approval for paid generation, set the Runware secret,
   keep `WORKER_CONCURRENCY=1`, and start one Worker replica.

No GCP/R2/Redis/VPS setup is required. See
[`SHOPIFY_ACTIVATION.md`](SHOPIFY_ACTIVATION.md) for the exact live checklist.
