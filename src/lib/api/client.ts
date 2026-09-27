import { CreateJobRequest, VideoJob } from "../types";

const API_BASE = (process.env.NEXT_PUBLIC_API_URL || "https://aivideo-pool-automation-pipeline-production.up.railway.app").replace(/\/$/, "");

export interface CheckoutRequest {
  concept: string;
  add_course?: boolean;
}

export interface CheckoutResponse {
  request_id: string;
  checkout_url: string;
}

export class JobApiClient {
  private baseUrl: string;

  constructor(baseUrl: string = API_BASE) {
    this.baseUrl = baseUrl;
  }

  async createCheckout(req: CheckoutRequest): Promise<CheckoutResponse> {
    if (!this.baseUrl) throw new Error("Checkout-Backend ist nicht verbunden.");
    const res = await fetch(`${this.baseUrl}/checkout`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ concept: req.concept, add_course: Boolean(req.add_course) }),
    });
    const payload = await res.json().catch(() => ({}));
    if (!res.ok) {
      const message = typeof payload?.error === "string" ? payload.error : `Checkout fehlgeschlagen (${res.status})`;
      throw new Error(message);
    }
    return payload as CheckoutResponse;
  }

  async createJob(req: CreateJobRequest): Promise<VideoJob> {
    if (this.baseUrl) {
      const res = await fetch(`${this.baseUrl}/jobs`, {
        method: "POST",
        headers: { "Content-Type": "application/json", ...(req.idempotency_key ? { "Idempotency-Key": req.idempotency_key } : {}) },
        body: JSON.stringify({ concept: req.concept }),
      });
      if (!res.ok) throw new Error(`Failed to create job: ${res.statusText}`);
      return await res.json();
    }
    return this.createMockJob(req.concept);
  }

  async getJob(jobId: string): Promise<VideoJob> {
    if (this.baseUrl) {
      const res = await fetch(`${this.baseUrl}/jobs/${jobId}`);
      if (!res.ok) throw new Error(`Failed to fetch job ${jobId}`);
      return await res.json();
    }
    return this.getMockJob(jobId);
  }

  getVideoUrl(jobId: string): string {
    return this.baseUrl ? `${this.baseUrl}/jobs/${jobId}/video` : "/media/videos/golden-pool-run1.mp4";
  }

  private createMockJob(concept: string): VideoJob {
    return { id: `job_mock_${Date.now().toString(36)}`, concept, status: "queued", progress: { phase: "queued", completed: 0, total: 15, percent: 0, details: "Job in Warteschlange eingereiht" }, cost: null, error: null, final_video_url: null, created_at: new Date().toISOString(), updated_at: new Date().toISOString() };
  }

  private getMockJob(jobId: string): VideoJob {
    return { id: jobId, concept: "Backyard to luxury pool oasis", status: "completed", progress: { phase: "completed", completed: 15, total: 15, percent: 100, details: "Render fertiggestellt (63.1s MP4)" }, cost: 7.26, error: null, final_video_url: "/media/videos/golden-pool-run1.mp4", created_at: new Date(Date.now() - 600000).toISOString(), updated_at: new Date().toISOString() };
  }
}

export const api = new JobApiClient();
