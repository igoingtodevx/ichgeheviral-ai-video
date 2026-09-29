export interface TestimonialItem {
  id: string;
  quote: string;
  author_name: string;
  author_role?: string | null;
  company?: string | null;
  created_at?: string;
}

export interface TestimonialsPage {
  items: TestimonialItem[];
  has_more: boolean;
}

const API_BASE = (process.env.NEXT_PUBLIC_API_URL || "https://aivideo-pool-automation-pipeline-production.up.railway.app").replace(/\/$/, "");

export const hasTestimonialsApi = Boolean(API_BASE);

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

export async function fetchTestimonials(limit = 6, offset = 0): Promise<TestimonialsPage> {
  if (!API_BASE) return { items: [], has_more: false };
  const res = await fetch(`${API_BASE}/testimonials?limit=${limit}&offset=${offset}`, {
    cache: "no-store",
  });
  return (await jsonOrError(res)) as TestimonialsPage;
}

export async function checkTestimonialsAdmin(token: string): Promise<void> {
  if (!API_BASE) throw new Error("Backend ist noch nicht verbunden.");
  const res = await fetch(`${API_BASE}/testimonials/admin/check`, {
    headers: { Authorization: `Bearer ${token}` },
    cache: "no-store",
  });
  await jsonOrError(res);
}

export async function createTestimonial(
  token: string,
  input: {
    quote: string;
    author_name: string;
    author_role?: string;
    company?: string;
  }
): Promise<TestimonialItem> {
  if (!API_BASE) throw new Error("Backend ist noch nicht verbunden.");
  const res = await fetch(`${API_BASE}/testimonials`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(input),
  });
  const payload = await jsonOrError(res);
  return payload.item as TestimonialItem;
}

export async function deleteTestimonial(token: string, itemId: string): Promise<void> {
  if (!API_BASE) throw new Error("Backend ist noch nicht verbunden.");
  const res = await fetch(`${API_BASE}/testimonials/${encodeURIComponent(itemId)}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });
  await jsonOrError(res);
}
