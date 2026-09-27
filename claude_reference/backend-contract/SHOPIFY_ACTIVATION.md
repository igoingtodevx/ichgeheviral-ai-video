# Shopify activation checklist

This repository contains the complete Shopify boundary. Live Shopify access and all
production Shopify variables intentionally remain unset until the client supplies
the store details. `produce_pool.py`, `prompts.py`, `GOLDEN_V1.md`, Golden tags,
and accepted runs are immutable.

## What is already implemented

- `POST /checkout` persists a `purchase_draft` before any Storefront API request.
- `COMMERCE_BACKEND=mock` returns a deterministic checkout URL only. It never
  marks an order paid and never creates a video job.
- `COMMERCE_BACKEND=shopify` uses Storefront API `cartCreate` with the AI video
  variant and, when requested, the course variant. Shopify owns pricing.
- The opaque `request_id` is attached as a cart attribute and a line attribute;
  the full concept is not sent to Shopify.
- `POST /webhooks/shopify/orders-paid` verifies the raw-body HMAC, shop domain,
  webhook ID, variant, draft, and exact-once job creation before returning `202`.
- An invalid/duplicate/unknown/course-only/wrong-variant event creates no video
  job. A verified paid order containing the configured AI video variant creates
  exactly one queued job.
- Anonymous production `POST /jobs` is disabled. It cannot bypass checkout.

## Remaining live activation steps

When Shopify admin access is available, perform these steps in order:

1. **Create/select exactly two products in Shopify.**
   - One product for the AI video generation.
   - One marketing mini-course product.
   - Keep the final prices in Shopify. Do not put prices or Shopify product IDs
     into this repository.
2. **Copy the real variant IDs**, not product IDs. The values can be numeric IDs
   or `gid://shopify/ProductVariant/<id>` values.
3. **Create/select the Storefront API access credential** with permission to
   create carts, then copy the token into the API service only.
4. **Choose the real store domain**, for example `store.example` or
   `store.myshopify.com`; copy only the host, without a path, into the API
   service.
5. **Set these variables on the Railway API service** (and do not expose them
   to the browser/frontend):

   ```text
   COMMERCE_BACKEND=shopify
   SHOPIFY_STORE_DOMAIN=<real store host>
   SHOPIFY_STOREFRONT_ACCESS_TOKEN=<Storefront API token>
   SHOPIFY_APP_SECRET=<webhook HMAC secret>
   AI_VIDEO_VARIANT_ID=<AI video variant ID>
   MARKETING_COURSE_VARIANT_ID=<course variant ID>
   ```

   The default Storefront API version is `2026-07`; only override it with
   `SHOPIFY_API_VERSION` when the store's documented API version requires it.
6. **Register the paid-order webhook** in the Shopify app/admin integration:
   - topic: `orders/paid`
   - format: JSON
   - URL: `https://<api-domain>/webhooks/shopify/orders-paid`
   - use the same app secret in `SHOPIFY_APP_SECRET`
   - include the configured shop domain in the webhook request as Shopify does
7. **Keep the Worker stopped and `RUNWARE_API_KEY` unset for the first checkout
   contract test.** No Golden V1 inference can run in this state.
8. **Run the first safe E2E checkout test** with a controlled test product/order:
   - call `POST /checkout` with `concept` and `add_course`;
   - verify the response contains only `request_id` and the Shopify
     `checkout_url` contract;
   - verify the draft is present in PostgreSQL with status `checkout_created`
     and a Shopify cart ID;
   - complete the controlled Shopify checkout only when the client approves the
     real charge;
   - verify Shopify delivers one `orders/paid` webhook and the matching draft
     records `shopify_order_id` and one queued job;
   - replay the same webhook and verify the job count stays at one;
   - verify course-only and wrong-variant fixtures produce zero jobs.
9. **Only after the checkout/webhook E2E is accepted**, decide separately whether
   to enable paid generation: set `RUNWARE_API_KEY` on the Worker, keep
   `WORKER_CONCURRENCY=1`, start one Worker replica, and run a deliberately
   approved paid Golden V1 job. This is outside the current activation and has
   not been performed by this implementation.

## Checkout contract

```http
POST /checkout
Content-Type: application/json
```

```json
{
  "concept": "user video concept",
  "add_course": true
}
```

```json
{
  "request_id": "req_<opaque-id>",
  "checkout_url": "https://<shop-domain>/checkouts/..."
}
```

The API never calls Shopify directly from the frontend. The frontend only calls
`POST /checkout` and redirects to the returned URL.

## Local no-charge validation

```bash
COMMERCE_BACKEND=mock python -m unittest discover -s tests -v
```

This uses no live Shopify call, no Shopify credential, no Runware credential, and
no paid inference.
