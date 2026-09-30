import type { CustomerJob, CustomerJobStatus } from "./api/client";

export const STATUS_LABELS: Record<CustomerJobStatus, string> = {
  preparing: "Auftrag wird vorbereitet",
  queued: "Wartet auf Start",
  generating_images: "Bilder werden erstellt",
  generating_videos: "Übergänge werden erstellt",
  assembling: "Reel wird zusammengesetzt",
  upload_pending: "Video wird gespeichert",
  interrupted: "Unterbrochen – kein Neustart automatisch",
  completed: "Fertig",
  failed: "Fehlgeschlagen",
};

export const TERMINAL_STATUSES = new Set<CustomerJobStatus>(["completed", "failed"]);

export function progressPercent(job: CustomerJob): number | null {
  const percent = job.progress?.percent;
  return typeof percent === "number" && Number.isFinite(percent)
    ? Math.max(0, Math.min(100, percent))
    : null;
}

export function formatDate(value: string | null): string {
  if (!value) return "Noch kein Datum";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Noch kein Datum";
  return new Intl.DateTimeFormat("de-DE", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(date);
}

export function formatDateTime(value: string | null): string {
  if (!value) return "Noch kein Zeitstempel";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Noch kein Zeitstempel";
  return new Intl.DateTimeFormat("de-DE", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}
