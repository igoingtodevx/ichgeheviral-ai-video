import { isClerkConfigured } from "../../../lib/auth";
import { loadPublicConfig } from "../../../lib/business-config-server";
import { canCheckout } from "../../../lib/business-config";

export const dynamic = "force-dynamic";
export async function GET() {
  const state = await loadPublicConfig();
  return Response.json({
    ok: true,
    revision: process.env.RAILWAY_GIT_COMMIT_SHA || process.env.VERCEL_GIT_COMMIT_SHA || process.env.APP_RELEASE_SHA || null,
    auth_configured: isClerkConfigured && Boolean(process.env.CLERK_SECRET_KEY),
    api_configured: Boolean(process.env.NEXT_PUBLIC_API_URL),
    checkout_ui_enabled: state.config.packages.some((pkg) => canCheckout(state, pkg)),
  }, { headers: { "Cache-Control": "no-store" } });
}
