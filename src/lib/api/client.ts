const API_BASE = (
  process.env.NEXT_PUBLIC_API_URL || "https://aivideo-pool-automation-pipeline-production.up.railway.app"
).replace(/\/$/, "");

export type TokenProvider = () => Promise<string | null>;

export type CustomerJobStatus =
  | "queued"
  | "generating_images"
  | "generating_videos"
  | "assembling"
  | "completed"
  | "failed";

export interface CheckoutRequest {
  concept: string;
  add_course?: boolean;
}

export interface CheckoutResponse {
  request_id: string;
  checkout_url: string;
}

export interface CustomerJobProgress {
  phase?: string;
  completed?: number;
  total?: number;
  percent?: number;
}

export interface CustomerJob {
  id: string;
  status: CustomerJobStatus;
  concept: string;
  created_at: string | null;
  updated_at: string | null;
  claimed_at?: string | null;
  completed_at?: string | null;
  progress: CustomerJobProgress;
  cost?: number | null;
  error?: string | null;
  final_video?: string | null;
}

interface CustomerJobListResponse {
  items: CustomerJob[];
  has_more: boolean;
}

class CheckoutApiClient {
  constructor(private baseUrl: string = API_BASE) {}

  private async authHeaders(getToken: TokenProvider, extra: HeadersInit = {}): Promise<Headers> {
    const token = await getToken();
    if (!token) throw new Error("Deine Anmeldung ist abgelaufen. Bitte melde dich erneut an.");
    const headers = new Headers(extra);
    headers.set("Authorization", `Bearer ${token}`);
    return headers;
  }

  private async json<T>(
    path: string,
    getToken: TokenProvider,
    init: RequestInit = {},
  ): Promise<T> {
    const res = await fetch(`${this.baseUrl}${path}`, {
      ...init,
      headers: await this.authHeaders(getToken, init.headers),
      cache: "no-store",
    });
    const payload = await res.json().catch(() => ({}));
    if (!res.ok) {
      const message = typeof payload?.error === "string" ? payload.error : `Backend-Fehler (${res.status})`;
      throw new Error(message);
    }
    return payload as T;
  }

  async createCheckout(req: CheckoutRequest, getToken: TokenProvider): Promise<CheckoutResponse> {
    return this.json<CheckoutResponse>("/checkout", getToken, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ concept: req.concept, add_course: Boolean(req.add_course) }),
    });
  }

  async listJobs(getToken: TokenProvider): Promise<CustomerJob[]> {
    const payload = await this.json<CustomerJobListResponse>("/jobs", getToken);
    return Array.isArray(payload.items) ? payload.items : [];
  }

  async getJob(jobId: string, getToken: TokenProvider): Promise<CustomerJob> {
    return this.json<CustomerJob>(`/jobs/${encodeURIComponent(jobId)}`, getToken);
  }

  async getVideoUrl(jobId: string, getToken: TokenProvider): Promise<string> {
    const token = await getToken();
    if (!token) throw new Error("Deine Anmeldung ist abgelaufen. Bitte melde dich erneut an.");
    const res = await fetch(`${this.baseUrl}/jobs/${encodeURIComponent(jobId)}/video`, {
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store",
    });
    if (!res.ok) {
      const payload = await res.json().catch(() => ({}));
      const message = typeof payload?.error === "string" ? payload.error : `Video nicht verfügbar (${res.status})`;
      throw new Error(message);
    }
    return res.url;
  }
}

export const api = new CheckoutApiClient();
