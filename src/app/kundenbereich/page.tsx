"use client";

import Link from "next/link";
import { useAuth } from "@clerk/nextjs";
import { AlertCircle, Film, LoaderCircle, Play, Plus } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { api, type CustomerJob, type CustomerJobStatus } from "../../lib/api/client";

const STATUS_LABELS: Record<CustomerJobStatus, string> = {
  queued: "Wartet auf Start",
  generating_images: "Bilder werden erstellt",
  generating_videos: "Übergänge werden erstellt",
  assembling: "Reel wird zusammengesetzt",
  completed: "Fertig",
  failed: "Fehlgeschlagen",
};

function formatDate(value: string | null): string {
  if (!value) return "Noch kein Datum";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Noch kein Datum";
  return new Intl.DateTimeFormat("de-DE", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(date);
}

function progressPercent(job: CustomerJob): number {
  const percent = job.progress?.percent;
  return typeof percent === "number" ? Math.max(0, Math.min(100, percent)) : 0;
}

function JobCard({
  job,
  opening,
  onOpenVideo,
}: {
  job: CustomerJob;
  opening: boolean;
  onOpenVideo: (job: CustomerJob) => void;
}) {
  const percent = progressPercent(job);
  const completed = job.status === "completed";
  const failed = job.status === "failed";

  return (
    <article className="overflow-hidden rounded-[20px] border border-[#e4e1ec] bg-white shadow-[0_14px_42px_rgba(37,31,68,.06)]">
      <div className="relative flex aspect-video items-center justify-center overflow-hidden bg-[#17151f]">
        <Film className="h-12 w-12 text-white/25" />
        <span
          className={`absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full px-2.5 py-1.5 text-[10px] font-black shadow-sm ${
            completed
              ? "bg-[#e7f8ef] text-[#217a4f]"
              : failed
                ? "bg-[#ffe9e9] text-[#a13b3b]"
                : "bg-[#eeeaff] text-[#5140d8]"
          }`}
        >
          {!completed && !failed && <span className="h-1.5 w-1.5 rounded-full bg-current" />}
          {STATUS_LABELS[job.status]}
        </span>
        {completed && (
          <button
            type="button"
            onClick={() => onOpenVideo(job)}
            disabled={opening}
            className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-white/95 text-[#5d4de1] shadow-xl transition hover:scale-105 disabled:cursor-wait disabled:opacity-60"
            aria-label="Fertiges Video öffnen"
          >
            {opening ? <LoaderCircle className="h-4 w-4 animate-spin" /> : <Play className="ml-0.5 h-4 w-4 fill-current" />}
          </button>
        )}
      </div>

      <div className="p-4">
        <div className="text-[10px] font-bold uppercase tracking-wider text-[#8a8e94]">
          Poolbau-Reel · {formatDate(job.created_at)}
        </div>
        <div className="mt-1 line-clamp-2 min-h-10 text-sm font-black leading-5 text-[#101114]">
          {job.concept}
        </div>
        {completed ? (
          <button
            type="button"
            onClick={() => onOpenVideo(job)}
            disabled={opening}
            className="mt-3 inline-flex items-center gap-1.5 text-[11px] font-black text-[#5d4de1] transition hover:text-[#3f31bd] disabled:cursor-wait disabled:opacity-60"
          >
            <Play className="h-3.5 w-3.5 fill-current" />
            {opening ? "Video wird geöffnet …" : "Video ansehen"}
          </button>
        ) : failed ? (
          <p className="mt-3 text-xs font-semibold text-[#a13b3b]">{job.error || "Die Erstellung ist fehlgeschlagen."}</p>
        ) : (
          <div className="mt-3">
            <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-[#8a8e94]">
              <span>{STATUS_LABELS[job.status]}</span>
              <span>{percent}%</span>
            </div>
            <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-[#efedf4]">
              <div className="h-full rounded-full bg-[#6d5dfc] transition-all" style={{ width: `${percent}%` }} />
            </div>
          </div>
        )}
      </div>
    </article>
  );
}

function DashboardLoading() {
  return (
    <div className="flex min-h-[55vh] items-center justify-center px-4">
      <div className="flex items-center gap-3 text-sm font-bold text-[#686c73]">
        <LoaderCircle className="h-5 w-5 animate-spin text-[#6d5dfc]" />
        Deine Reels werden geladen …
      </div>
    </div>
  );
}

export default function StudioDashboardPage() {
  const { getToken, isLoaded, isSignedIn } = useAuth();
  const [jobs, setJobs] = useState<CustomerJob[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [openingJobId, setOpeningJobId] = useState<string | null>(null);

  useEffect(() => {
    if (!isLoaded || !isSignedIn) return;
    let cancelled = false;
    const load = async () => {
      try {
        const items = await api.listJobs(getToken);
        if (!cancelled) {
          setJobs(items);
          setError(null);
        }
      } catch (reason: unknown) {
        if (!cancelled) {
          setError(reason instanceof Error ? reason.message : "Deine Reels konnten nicht geladen werden.");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    void load();
    const refreshId = window.setInterval(load, 10_000);
    return () => {
      cancelled = true;
      window.clearInterval(refreshId);
    };
  }, [getToken, isLoaded, isSignedIn]);

  const runningCount = useMemo(
    () => jobs.filter((job) => !["completed", "failed"].includes(job.status)).length,
    [jobs],
  );
  const completedCount = useMemo(() => jobs.filter((job) => job.status === "completed").length, [jobs]);

  async function openVideo(job: CustomerJob) {
    setOpeningJobId(job.id);
    setError(null);
    try {
      const videoUrl = await api.getVideoUrl(job.id, getToken);
      window.open(videoUrl, "_blank", "noopener,noreferrer");
    } catch (reason: unknown) {
      setError(reason instanceof Error ? reason.message : "Das Video konnte nicht geöffnet werden.");
    } finally {
      setOpeningJobId(null);
    }
  }

  if (!isLoaded || !isSignedIn || loading) return <DashboardLoading />;

  return (
    <div className="px-4 py-8 sm:px-6 lg:px-10 lg:py-10">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-4xl font-black tracking-[-0.055em] text-[#101114] sm:text-5xl">Meine Reels</h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-[#686c73] sm:text-base">
              Deine echten Bestellungen und fertigen Transformations-Videos an einem Ort.
            </p>
          </div>

          <Link
            href="/kundenbereich/neu"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#6d5dfc] px-5 py-3.5 text-sm font-black text-white shadow-[0_12px_32px_rgba(109,93,252,.22)] transition hover:bg-[#5947e8]"
          >
            <Plus className="h-4 w-4" />
            Neues Reel
          </Link>
        </div>

        {error && (
          <div className="mt-6 flex items-start gap-3 rounded-2xl border border-[#f0caca] bg-[#fff5f5] p-4 text-sm font-semibold text-[#9c3c3c]">
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <section className="mt-8 grid gap-3 sm:grid-cols-3">
          {[
            [String(jobs.length), "Reels"],
            [String(runningCount), "In Erstellung"],
            [String(completedCount), "Fertig"],
          ].map(([value, label]) => (
            <div key={label} className="rounded-2xl border border-[#e4e1ec] bg-white p-5">
              <div className="text-3xl font-black tracking-[-0.04em] text-[#101114]">{value}</div>
              <div className="mt-1 text-xs font-bold uppercase tracking-wider text-[#8a8e94]">{label}</div>
            </div>
          ))}
        </section>

        {jobs.length === 0 ? (
          <section className="mt-10 rounded-[26px] border border-dashed border-[#d9d6e2] bg-white px-6 py-16 text-center shadow-[0_14px_42px_rgba(37,31,68,.04)]">
            <Film className="mx-auto h-10 w-10 text-[#b0b3ba]" />
            <h2 className="mt-5 text-2xl font-black tracking-[-0.04em] text-[#101114]">Noch kein Reel vorhanden</h2>
            <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-[#686c73]">
              Starte deinen ersten Auftrag. Nach der Zahlung erscheint der Fortschritt hier automatisch.
            </p>
            <Link
              href="/kundenbereich/neu"
              className="mt-7 inline-flex items-center justify-center gap-2 rounded-xl bg-[#6d5dfc] px-5 py-3.5 text-sm font-black text-white"
            >
              <Plus className="h-4 w-4" />
              Erstes Reel starten
            </Link>
          </section>
        ) : (
          <section className="mt-10">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <span className="text-xs font-black uppercase tracking-[0.16em] text-[#5d4de1]">Deine Videobibliothek</span>
                <h2 className="mt-2 text-2xl font-black tracking-[-0.04em] text-[#101114] sm:text-3xl">Alle Reels</h2>
              </div>
              <p className="max-w-md text-xs leading-5 text-[#686c73]">
                Laufende Aufträge und fertige Videos – ohne Demo- oder Beispielinhalte.
              </p>
            </div>

            <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {jobs.map((job) => (
                <JobCard
                  key={job.id}
                  job={job}
                  opening={openingJobId === job.id}
                  onOpenVideo={openVideo}
                />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
