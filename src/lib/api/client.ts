import { safeHttpUrl } from "../business-config";
import { parseOperationsOverview, type OperationsOverview, type OperatorGrant } from "../operations";

const API_BASE = (process.env.NEXT_PUBLIC_API_URL || "").replace(/\/$/, "");

export const hasApiConfiguration = Boolean(API_BASE);

export type TokenProvider = () => Promise<string | null>;

export type CustomerJobStatus =
  | "preparing"
  | "queued"
  | "generating_images"
  | "generating_videos"
  | "assembling"
  | "upload_pending"
  | "interrupted"
  | "completed"
  | "failed";

export interface CheckoutRequest {
  concept: string;
  package: "single" | "ai-video" | "ai-video-course";
  add_course: boolean;
}

export interface CheckoutResponse {
  request_id: string;
  checkout_url: string;
}

export interface CustomerJobProgress {
  phase?: string | null;
  completed?: number | null;
  total?: number | null;
  percent?: number | null;
}

export interface CustomerJob {
  id: string;
  account_id?: string | null;
  user_id?: string | null;
  status: CustomerJobStatus;
  execution_mode?: string | null;
  concept: string;
  created_at: string | null;
  updated_at: string | null;
  claimed_at?: string | null;
  completed_at?: string | null;
  progress?: CustomerJobProgress | null;
  cost?: number | null;
  error?: string | null;
  final_video?: string | null;
}

export interface PurchaseStatus {
  request_id: string;
  account_id: string | null;
  package: "single" | string;
  add_course: boolean;
  status: string;
  video_job_id: string | null;
  created_at: string | null;
  updated_at: string | null;
  job_status: CustomerJobStatus | null;
  course_fulfillment: string | null;
}

export interface MeResponse {
  account: { id: string; name: string } | null;
  role: string;
  user_id: string;
  account_role: "owner" | "admin" | "customer" | string;
  is_global_admin: boolean;
  is_operator: boolean;
}

export interface AdminOverview {
  accounts: Array<{ id: string; name: string; created_at: string | null }>;
  memberships: Array<{ account_id: string; user_id: string; role: string }>;
  jobs: Array<{
    id: string;
    account_id: string | null;
    user_id: string | null;
    status: CustomerJobStatus;
    concept: string;
    cost: number | null;
    progress: CustomerJobProgress | null;
    created_at: string | null;
    updated_at: string | null;
    execution_mode: string | null;
  }>;
  usage: Array<Record<string, unknown>>;
  summary: { accounts: number; jobs: number; completed: number; cost_usd: number };
}

export class ApiError extends Error {
  constructor(message: string, public readonly status: number, public readonly code?: string) {
    super(message);
    this.name = "ApiError";
  }
}

interface CustomerJobListResponse {
  items: CustomerJob[];
  has_more: boolean;
}

interface VideoResponse {
  url: string;
  expires_in: number;
}

export class ApiClient {
  constructor(private readonly baseUrl: string = API_BASE) {}

  private requireConfigured() {
    if (!this.baseUrl) throw new ApiError("Die App ist noch nicht mit dem Backend verbunden.", 0, "api_unconfigured");
  }

  private async authHeaders(getToken: TokenProvider, extra: HeadersInit = {}): Promise<Headers> {
    const token = await getToken();
    if (!token) throw new ApiError("Deine Anmeldung ist abgelaufen. Bitte melde dich erneut an.", 401, "auth_required");
    const headers = new Headers(extra);
    headers.set("Authorization", `Bearer ${token}`);
    return headers;
  }

  private async json<T>(path: string, getToken: TokenProvider, init: RequestInit = {}): Promise<T> {
    this.requireConfigured();
    const res = await fetch(`${this.baseUrl}${path}`, {
      ...init,
      headers: await this.authHeaders(getToken, init.headers),
      cache: "no-store",
    });
    const payload = await res.json().catch(() => ({}));
    if (!res.ok) {
      const message = typeof payload?.error === "string" ? payload.error : `Backend-Fehler (${res.status})`;
      throw new ApiError(message, res.status, typeof payload?.code === "string" ? payload.code : undefined);
    }
    return payload as T;
  }

  async createCheckout(req: CheckoutRequest, getToken: TokenProvider): Promise<CheckoutResponse> {
    return this.json<CheckoutResponse>("/checkout", getToken, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ concept: req.concept, package: req.package, add_course: req.add_course }),
    });
  }

  async getMe(getToken: TokenProvider): Promise<MeResponse> {
    return this.json<MeResponse>("/me", getToken);
  }

  async listJobs(getToken: TokenProvider): Promise<CustomerJob[]> {
    const payload = await this.json<CustomerJobListResponse>("/jobs", getToken);
    return Array.isArray(payload.items) ? payload.items : [];
  }

  async getJob(jobId: string, getToken: TokenProvider): Promise<CustomerJob> {
    return this.json<CustomerJob>(`/jobs/${encodeURIComponent(jobId)}`, getToken);
  }

  async getPurchase(requestId: string, getToken: TokenProvider): Promise<PurchaseStatus> {
    return this.json<PurchaseStatus>(`/purchases/${encodeURIComponent(requestId)}`, getToken);
  }

  async getAdminOverview(getToken: TokenProvider): Promise<AdminOverview> {
    return this.json<AdminOverview>("/admin/overview", getToken);
  }

  async getOperationsOverview(getToken: TokenProvider): Promise<OperationsOverview> {
    const value = parseOperationsOverview(await this.json<unknown>("/operations/overview", getToken));
    if (!value) throw new ApiError("Die Betriebsdaten sind unvollständig oder ungültig.", 502, "invalid_operations");
    return value;
  }

  async getOperators(getToken: TokenProvider): Promise<OperatorGrant[]> {
    const payload = await this.json<{ items: OperatorGrant[] }>("/admin/operators", getToken);
    if (!Array.isArray(payload.items) || !payload.items.every((item) => typeof item.user_id === "string" && typeof item.enabled === "boolean")) throw new ApiError("Die Betriebsfreigaben sind ungültig.", 502);
    return payload.items;
  }

  async setOperator(input: { user_id: string; enabled: boolean }, getToken: TokenProvider): Promise<OperatorGrant> {
    return this.json("/admin/operators", getToken, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ user_id: input.user_id, enabled: input.enabled }) });
  }

  async getOperationsVideoUrl(jobId: string, getToken: TokenProvider): Promise<VideoResponse> {
    const value = await this.json<VideoResponse>(`/operations/jobs/${encodeURIComponent(jobId)}/video?download=1`, getToken);
    const base = new URL(this.baseUrl);
    let url = value.url;
    if (typeof url === "string" && url.startsWith("/")) {
      const resolved = new URL(url, base);
      if (resolved.origin !== base.origin || !resolved.pathname.startsWith("/operations/jobs/")) throw new ApiError("Das Videoziel ist ungültig.", 502, "invalid_video_url");
      url = resolved.toString();
    }
    if (!safeHttpUrl(url) || !Number.isFinite(value.expires_in) || value.expires_in <= 0) throw new ApiError("Das Videoziel ist ungültig oder abgelaufen.", 502, "invalid_video_url");
    return { url, expires_in: value.expires_in };
  }

  async operationsDownloadTarget(jobId: string, getToken: TokenProvider): Promise<{ url: string; temporary: boolean }> {
    const { url } = await this.getOperationsVideoUrl(jobId, getToken);
    const target = new URL(url);
    const base = new URL(this.baseUrl);
    if (target.origin === base.origin && (target.pathname.startsWith("/operations/jobs/") || target.pathname.startsWith(`${base.pathname.replace(/\/$/, "")}/operations/jobs/`))) {
      // Local storage content still needs verified authentication. Never forward bearer tokens to a signed storage URL.
      const response = await fetch(url, { headers: await this.authHeaders(getToken), cache: "no-store", redirect: "error" });
      if (!response.ok) throw new ApiError("Das Video konnte nicht heruntergeladen werden.", response.status);
      return { url: URL.createObjectURL(await response.blob()), temporary: true };
    }
    return { url, temporary: false };
  }

  async addMembership(
    input: { account_id: string; user_id: string; role: "owner" | "admin" | "customer" },
    getToken: TokenProvider,
  ): Promise<{ account_id: string; user_id: string; role: string }> {
    return this.json("/admin/memberships", getToken, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(input),
    });
  }

  async getVideoUrl(jobId: string, getToken: TokenProvider, download = false): Promise<VideoResponse> {
    const payload = await this.json<VideoResponse>(`/jobs/${encodeURIComponent(jobId)}/video${download ? "?download=1" : ""}`, getToken);
    if (!payload.url || !/^https?:\/\//i.test(payload.url) || !Number.isFinite(payload.expires_in)) {
      throw new ApiError("Das Videoziel ist ungültig oder abgelaufen.", 502, "invalid_video_url");
    }
    return payload;
  }
}

export const api = new ApiClient();
