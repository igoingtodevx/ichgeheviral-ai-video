import { loadPublicConfig } from "../../../../lib/business-config-server";

export const dynamic = "force-dynamic";
export async function GET() {
  return Response.json(await loadPublicConfig(), { headers: { "Cache-Control": "no-store" } });
}
