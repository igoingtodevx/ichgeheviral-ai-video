import { isClerkConfigured } from "../../../lib/auth";
import { PRICING_LAUNCHED } from "../../../lib/pricing";

export const dynamic = "force-dynamic";
export function GET() {
  return Response.json({
    ok: true,
    revision: process.env.RAILWAY_GIT_COMMIT_SHA || process.env.VERCEL_GIT_COMMIT_SHA || process.env.APP_RELEASE_SHA || null,
    auth_configured: isClerkConfigured && Boolean(process.env.CLERK_SECRET_KEY),
    api_configured: Boolean(process.env.NEXT_PUBLIC_API_URL),
    checkout_ui_enabled: PRICING_LAUNCHED,
  }, { headers: { "Cache-Control": "no-store" } });
}
