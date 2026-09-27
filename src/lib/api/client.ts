/**
 * Client boundary for the public purchase entry point.
 *
 * Per the production backend contract, `POST /checkout` is the ONLY
 * public purchase entry point. A generation job is created exclusively
 * by a verified, paid Shopify webhook — never directly by the frontend.
 * There is intentionally no client method that calls `/jobs`.
 */

const API_BASE = (
  process.env.NEXT_PUBLIC_API_URL || "https://aivideo-pool-automation-pipeline-production.up.railway.app"
).replace(/\/$/, "");

export interface CheckoutRequest {
  concept: string;
  add_course?: boolean;
}

export interface CheckoutResponse {
  request_id: string;
  checkout_url: string;
}

class CheckoutApiClient {
  constructor(private baseUrl: string = API_BASE) {}

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
}

export const api = new CheckoutApiClient();
