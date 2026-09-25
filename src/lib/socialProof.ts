export interface SocialProofItem {
  id: string;
  kind: "image" | "video";
  mime_type: string;
  title?: string | null;
  caption?: string | null;
  created_at: string;
  media_url: string;
}

export interface SocialProofPage {
  items: SocialProofItem[];
  has_more: boolean;
}

const API_BASE = (process.env.NEXT_PUBLIC_API_URL || "https://aivideo-pool-automation-pipeline-production.up.railway.app").replace(/\/$/, "");

export const hasSocialProofApi = Boolean(API_BASE);

export function socialProofMediaUrl(item: SocialProofItem): string {
  if (/^https?:\/\//i.test(item.media_url)) return item.media_url;
  return `${API_BASE}${item.media_url}`;
}

async function jsonOrError(res: Response) {
  const payload = await res.json().catch(() => ({}));
  if (!res.ok) {
    const message =
      typeof payload?.error === "string"
        ? payload.error
        : `Request failed (${res.status})`;
    throw new Error(message);
  }
  return payload;
}

export async function fetchSocialProof(
  limit = 6,
  offset = 0
): Promise<SocialProofPage> {
  if (!API_BASE) return { items: [], has_more: false };
  const res = await fetch(
    `${API_BASE}/social-proof?limit=${limit}&offset=${offset}`,
    { cache: "no-store" }
  );
  return (await jsonOrError(res)) as SocialProofPage;
}

export async function checkSocialProofAdmin(token: string): Promise<void> {
  if (!API_BASE) throw new Error("Backend ist noch nicht verbunden.");
  const res = await fetch(`${API_BASE}/social-proof/admin/check`, {
    headers: { Authorization: `Bearer ${token}` },
    cache: "no-store",
  });
  await jsonOrError(res);
}

export async function createSocialProof(
  token: string,
  input: {
    filename: string;
    mime_type: string;
    title?: string;
    caption?: string;
    data_base64: string;
  }
): Promise<SocialProofItem> {
  if (!API_BASE) throw new Error("Backend ist noch nicht verbunden.");
  const res = await fetch(`${API_BASE}/social-proof`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(input),
  });
  const payload = await jsonOrError(res);
  return payload.item as SocialProofItem;
}

export async function deleteSocialProof(
  token: string,
  itemId: string
): Promise<void> {
  if (!API_BASE) throw new Error("Backend ist noch nicht verbunden.");
  const res = await fetch(`${API_BASE}/social-proof/${encodeURIComponent(itemId)}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });
  await jsonOrError(res);
}
