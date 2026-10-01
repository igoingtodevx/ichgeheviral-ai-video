import type { CustomerJobProgress, CustomerJobStatus } from "./api/client";

export interface OperationsCustomer { id: string; name: string; created_at: string | null }
export interface OperationsOrder {
  request_id: string;
  account_id: string | null;
  package: string;
  add_course: boolean;
  status: string;
  video_job_id: string | null;
  created_at: string | null;
  updated_at: string | null;
  order_id?: string | null;
}
export interface OperationsJob {
  id: string;
  account_id: string | null;
  status: CustomerJobStatus;
  concept: string;
  progress: CustomerJobProgress | null;
  created_at: string | null;
  updated_at: string | null;
  execution_mode: string | null;
}
export interface OperationsOverview {
  customers: OperationsCustomer[];
  orders: OperationsOrder[];
  jobs: OperationsJob[];
  summary: { customers: number; orders: number; jobs: number; completed: number };
}
export interface OperatorGrant { user_id: string; enabled: boolean; created_at?: string | null }
/** Revoked grants can disappear from the backend active-grants list. */
export function operatorGrantConfirmed(items: OperatorGrant[], userId: string, enabled: boolean): boolean {
  return items.some((item) => item.user_id === userId && item.enabled === true) === enabled;
}

const statuses = new Set(["preparing", "queued", "generating_images", "generating_videos", "assembling", "upload_pending", "interrupted", "completed", "failed"]);
function object(value: unknown): value is Record<string, unknown> { return value !== null && typeof value === "object" && !Array.isArray(value); }
function string(value: unknown): value is string { return typeof value === "string"; }
function nullable(value: unknown): value is string | null { return value === null || string(value); }

/** Project away accidental privileged fields; malformed operational data is never rendered. */
export function parseOperationsOverview(value: unknown): OperationsOverview | null {
  if (!object(value) || !Array.isArray(value.customers) || !Array.isArray(value.orders) || !Array.isArray(value.jobs) || !object(value.summary)) return null;
  const customers: OperationsCustomer[] = [];
  const orders: OperationsOrder[] = [];
  const jobs: OperationsJob[] = [];
  for (const c of value.customers) {
    if (!object(c) || !string(c.id) || !string(c.name) || !nullable(c.created_at)) return null;
    customers.push({ id: c.id, name: c.name, created_at: c.created_at });
  }
  for (const o of value.orders) {
    if (!object(o) || !string(o.request_id) || !nullable(o.account_id) || !string(o.package) || typeof o.add_course !== "boolean" || !string(o.status) || !nullable(o.video_job_id) || !nullable(o.created_at) || !nullable(o.updated_at) || (o.order_id !== undefined && !nullable(o.order_id))) return null;
    orders.push({ request_id: o.request_id, account_id: o.account_id, package: o.package, add_course: o.add_course, status: o.status, video_job_id: o.video_job_id, created_at: o.created_at, updated_at: o.updated_at, ...(o.order_id === undefined ? {} : { order_id: o.order_id }) });
  }
  for (const j of value.jobs) {
    if (!object(j) || !string(j.id) || !nullable(j.account_id) || !string(j.status) || !statuses.has(j.status) || !string(j.concept) || !nullable(j.created_at) || !nullable(j.updated_at) || !nullable(j.execution_mode)) return null;
    if (!(j.progress === null || object(j.progress))) return null;
    const progress: CustomerJobProgress = {};
    if (object(j.progress)) {
      if (j.progress.phase !== undefined && !nullable(j.progress.phase)) return null;
      if (j.progress.phase !== undefined) progress.phase = j.progress.phase;
      for (const key of ["percent", "completed", "total"] as const) {
        const n = j.progress[key];
        if (n !== undefined && n !== null && (typeof n !== "number" || !Number.isFinite(n))) return null;
        if (n !== undefined) progress[key] = n as number | null;
      }
    }
    jobs.push({ id: j.id, account_id: j.account_id, status: j.status as CustomerJobStatus, concept: j.concept, created_at: j.created_at, updated_at: j.updated_at, execution_mode: j.execution_mode, progress: j.progress === null ? null : progress });
  }
  const s = value.summary;
  if (![s.customers, s.orders, s.jobs, s.completed].every((n) => typeof n === "number" && Number.isSafeInteger(n) && n >= 0)) return null;
  if (s.customers !== customers.length || s.orders !== orders.length || s.jobs !== jobs.length || s.completed !== jobs.filter((j) => j.status === "completed").length) return null;
  return { customers, orders, jobs, summary: { customers: s.customers as number, orders: s.orders as number, jobs: s.jobs as number, completed: s.completed as number } };
}

export function filterOperations<T extends { account_id?: string | null; id?: string; status?: string }>(items: T[], input: { customer: string; status: string; query: string }): T[] {
  const query = input.query.trim().toLocaleLowerCase("de-DE");
  return items.filter((item) => (!input.customer || (item.account_id ?? item.id) === input.customer)
    && (!input.status || item.status === input.status)
    && (!query || Object.values(item).some((value) => typeof value === "string" && value.toLocaleLowerCase("de-DE").includes(query))));
}
