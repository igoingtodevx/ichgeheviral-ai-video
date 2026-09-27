# IchGeheViral — Kostenlose Masterclass (Enricha Funnel)

German free-masterclass funnel for Timo's faceless short-form business, running on Next.js (App Router) in a Docker container on a netcup VPS (Germany), reverse-proxied by Caddy, with Brevo for lead capture, double opt-in and the 5-email follow-up sequence.

Production domain: **https://ichgeheviral.de**

## Architecture

- **Funnel** (`app/page.tsx`): approved design with email opt-in, video gate (direct MP4 or YouTube/Vimeo embed via `NEXT_PUBLIC_VSL_URL`), calculator, interactive four-step section, proof gallery, FAQ, local legal pages.
- **Lead capture** (`app/api/leads/route.ts`): server-side only. Validates, rate-limits and creates contacts in Brevo via the double opt-in endpoint (`POST /v3/contacts/doubleOptinConfirmation`). Confirmed contacts land on `/danke`, which flips the `ENRICHA_DOI` attribute to `confirmed`.
- **Brevo** is the single source of truth: list `IchGeheViral – Kostenlose Masterclass`, DOI template, five sequence templates (Tag 0/3/7/10/14, Timo's supplied copy in `emails/`), sender domain `ichgeheviral.de`. There is no second database.
- **Admin dashboard** (`/admin`): password-protected (scrypt hash + HMAC-signed HttpOnly session cookie, CSRF double-submit, rate limits). Shows signups, DOI status, unsubscribe state and transactional email events from the Brevo API, plus a reply form that sends through Brevo.
- **Email sequence**: runs as a Brevo marketing automation (list-entry trigger). Brevo's Automation API is not available on this account, so the workflow is created once in the Brevo UI — exact steps in `docs/DEPLOYMENT.md`.
- **Enricha Pro section** (`app/components/ProSection.tsx`): appears below the masterclass only after the existing unlock state is active (reuses the same store as the video gate — no second auth path). Lists TikTok Pro (447 € once, 6 months 1:1, personal call) with a checkout CTA.
- **Checkout & webhook** (`app/api/checkout/route.ts`, `app/api/stripe-webhook/route.ts`): server-side Stripe Checkout Session (price from `STRIPE_PRICE_ID`, never from the client; live in production) and a signature-verified webhook that fulfills `checkout.session.completed`, `checkout.session.async_payment_succeeded` and `checkout.session.async_payment_failed`, notifies Make (which provisions Coachy course access) and sets the Brevo buyer status for CRM display. Deduplication is a durable local SQLite event ledger (`app/lib/event-ledger.ts`), not a Brevo attribute — see `docs/STRIPE-SETUP.md` and `docs/MAKE-COACHY-SETUP.md`.

## Environment variables

| Variable | Purpose |
| --- | --- |
| `BREVO_API_KEY_ICHGEHEVIRAL` | Brevo API key (server-side only) |
| `BREVO_LIST_ID` / `BREVO_DOI_TEMPLATE_ID` | IDs printed by `npm run setup:brevo` |
| `BREVO_SENDER_EMAIL` / `BREVO_SENDER_NAME` | Sender of funnel emails (default `timo@ichgeheviral.de` / `Timo`) |
| `REPLY_TO_ADDRESS` | Where replies to funnel/admin emails land (default `support@enricha.de`) |
| `ADMIN_PASSWORD_HASH` | scrypt hash (`scrypt:<salt>:<hash>`) for `/admin` login |
| `SESSION_SECRET` | HMAC secret for admin sessions and `/danke` signatures |
| `ADMIN_PRO_BUYERS_ENABLED` | Optional admin-only TikTok Pro buyer overview; defaults to `false` |
| `NEXT_PUBLIC_SITE_URL` | Canonical site URL (metadata, DOI redirect) |
| `NEXT_PUBLIC_VSL_URL` | Final masterclass video URL (MP4 or YouTube/Vimeo embed) — set it and redeploy to activate the video |
| `STRIPE_SECRET_KEY` | Stripe secret key (server-only; empty = checkout/webhook disabled) |
| `STRIPE_PRICE_ID` | Stripe price id for TikTok Pro (447 €) — the price is never taken from the client |
| `STRIPE_WEBHOOK_SECRET` | Stripe webhook signing secret (`whsec_...`) for `/api/stripe-webhook` |
| `MAKE_WEBHOOK_URL` | Optional Make webhook URL called after a completed purchase |
| `ALLOWED_HOSTS` | Optional comma-separated custom-domain allowlist for Stripe return URLs |
| `EVENT_LEDGER_DB_PATH` | Optional path for the Stripe event-dedup SQLite file (default `data/event-ledger.sqlite3`; mounted as a Docker volume in production) |

## Commands

```bash
npm run dev          # local development (needs .env.local, see below)
npm run lint
npm test             # build + unit tests + integration tests against next start
npm run build
npm run setup:brevo # idempotent Brevo provisioning (list, attributes, templates, sender)
```

Local `.env.local` needs the variables above; point `NEXT_PUBLIC_SITE_URL` at `http://localhost:3000` for local DOI redirects.

## Brevo setup and DNS

`npm run setup:brevo` creates/updates everything that Brevo's API supports and prints:
- the exact IONOS DNS records for the sender domain (DKIM CNAMEs, ownership TXT, DMARC),
- the remaining manual Brevo UI steps (domain verification, automation workflow).

Full runbook: `docs/DEPLOYMENT.md`.

## Tests

- `tests/unit` — password hashing, session tokens, signed emails, email validation, rate limiting.
- `tests/integration` — spins up the production build and verifies the funnel HTML, legal pages, robots/sitemap, admin auth boundaries (redirect, login, CSRF, rate limit, logout) and lead-endpoint validation.
