"use client";

import Link from "next/link";
import { useAuth } from "@clerk/nextjs";
import { AlertCircle, Film, LoaderCircle, Play, Plus, RefreshCw } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { api, type CustomerJob } from "../../lib/api/client";
import { formatDate, progressPercent, STATUS_LABELS, TERMINAL_STATUSES } from "../../lib/jobs";

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
  const interrupted = job.status === "interrupted";

  return (
    <article className="overflow-hidden rounded-[20px] border border-[#e4e1ec] bg-white shadow-[0_14px_42px_rgba(37,31,68,.06)]">
      <div className="relative flex aspect-video items-center justify-center overflow-hidden bg-[#17151f]">
        <Film className="h-12 w-12 text-white/25" />
        <span
          className={`absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full px-2.5 py-1.5 text-[10px] font-black shadow-sm ${
            completed ? "bg-[#e7f8ef] text-[#217a4f]" : failed ? "bg-[#ffe9e9] text-[#a13b3b]" : "bg-[#eeeaff] text-[#5140d8]"
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
        <div className="text-[10px] font-bold uppercase tracking-wider text-[#8a8e94]">KI-Building Video · {formatDate(job.created_at)}</div>
        <Link href={`/kundenbereich/reel/${encodeURIComponent(job.id)}`} className="mt-1 block min-h-10 line-clamp-2 text-sm font-black leading-5 text-[#101114] hover:text-[#5d4de1]">
          {job.concept}
        </Link>
        {completed ? (
          <button type="button" onClick={() => onOpenVideo(job)} disabled={opening} className="mt-3 inline-flex items-center gap-1.5 text-[11px] font-black text-[#5d4de1] disabled:cursor-wait disabled:opacity-60">
            <Play className="h-3.5 w-3.5 fill-current" />
            {opening ? "Video wird geöffnet …" : "Video ansehen"}
          </button>
        ) : failed ? (
          <p className="mt-3 text-xs font-semibold text-[#a13b3b]">{job.error || "Die Erstellung ist fehlgeschlagen."}</p>
        ) : interrupted ? (
          <p className="mt-3 text-xs font-semibold text-[#8b5d14]">Dieser Auftrag wurde unterbrochen. Es wird keine kostenpflichtige Inferenz automatisch neu gestartet.</p>
        ) : (
          <div className="mt-3">
            <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-[#8a8e94]">
              <span>{STATUS_LABELS[job.status]}</span>
              {percent !== null && <span>{percent}% vom Server</span>}
            </div>
            {percent !== null ? (
              <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-[#efedf4]">
                <div className="h-full rounded-full bg-[#6d5dfc]" style={{ width: `${percent}%` }} />
              </div>
            ) : (
              <p className="mt-2 text-xs text-[#858991]">Der nächste Status kommt aus dem Backend.</p>
            )}
          </div>
        )}
        {!TERMINAL_STATUSES.has(job.status) && (
          <Link href={`/kundenbereich/produktion?job_id=${encodeURIComponent(job.id)}`} className="mt-3 inline-flex text-[11px] font-black text-[#777b82] hover:text-[#101114]">
            Status & Fortschritt öffnen →
          </Link>
        )}
      </div>
    </article>
  );
}

function DashboardLoading() {
  return <div className="flex min-h-[55vh] items-center justify-center px-4"><div className="flex items-center gap-3 text-sm font-bold text-[#686c73]"><LoaderCircle className="h-5 w-5 animate-spin text-[#6d5dfc]" /> Deine Reels werden geladen …</div></div>;
}

export default function StudioDashboardPage() {
  const { getToken, isLoaded, isSignedIn } = useAuth();
  const [jobs, setJobs] = useState<CustomerJob[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [openingJobId, setOpeningJobId] = useState<string | null>(null);

  const load = useCallback(async () => {
    try {
      const items = await api.listJobs(getToken);
      setJobs(items);
      setError(null);
    } catch (reason: unknown) {
      setError(reason instanceof Error ? reason.message : "Deine Reels konnten nicht geladen werden.");
    } finally {
      setLoading(false);
    }
  }, [getToken]);

  useEffect(() => {
    if (!isLoaded || !isSignedIn) return;
    const initialLoad = window.setTimeout(() => void load(), 0);
    const refreshId = window.setInterval(() => void load(), 10_000);
    return () => { window.clearTimeout(initialLoad); window.clearInterval(refreshId); };
  }, [isLoaded, isSignedIn, load]);

  const runningCount = useMemo(() => jobs.filter((job) => !TERMINAL_STATUSES.has(job.status)).length, [jobs]);
  const completedCount = useMemo(() => jobs.filter((job) => job.status === "completed").length, [jobs]);

  async function openVideo(job: CustomerJob) {
    setOpeningJobId(job.id);
    setError(null);
    const popup = window.open("about:blank", "_blank");
    try {
      const { url } = await api.getVideoUrl(job.id, getToken);
      if (popup) popup.location.href = url;
      else window.location.assign(url);
    } catch (reason: unknown) {
      popup?.close();
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
            <p className="mt-3 max-w-2xl text-sm leading-6 text-[#686c73] sm:text-base">Deine echten Aufträge und Videos – ohne Demo- oder Beispielinhalte.</p>
          </div>
          <div className="flex gap-2">
            <button type="button" onClick={() => void load()} className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#dedbe7] bg-white px-4 py-3.5 text-sm font-black text-[#101114]">
              <RefreshCw className="h-4 w-4" /> Aktualisieren
            </button>
            <Link href="/kundenbereich/neu" className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#6d5dfc] px-5 py-3.5 text-sm font-black text-white shadow-[0_12px_32px_rgba(109,93,252,.22)]">
              <Plus className="h-4 w-4" /> Neues Video
            </Link>
          </div>
        </div>

        {error && <div className="mt-6 flex items-start gap-3 rounded-2xl border border-[#f0caca] bg-[#fff5f5] p-4 text-sm font-semibold text-[#9c3c3c]"><AlertCircle className="mt-0.5 h-4 w-4 shrink-0" /><span>{error}</span></div>}

        <section className="mt-8 grid gap-3 sm:grid-cols-3">
          {[[String(jobs.length), "Aufträge"], [String(runningCount), "In Erstellung"], [String(completedCount), "Fertig"]].map(([value, label]) => <div key={label} className="rounded-2xl border border-[#e4e1ec] bg-white p-5"><div className="text-3xl font-black tracking-[-0.04em] text-[#101114]">{value}</div><div className="mt-1 text-xs font-bold uppercase tracking-wider text-[#8a8e94]">{label}</div></div>)}
        </section>

        {jobs.length === 0 ? (
          <section className="mt-10 rounded-[26px] border border-dashed border-[#d9d6e2] bg-white px-6 py-16 text-center shadow-[0_14px_42px_rgba(37,31,68,.04)]">
            <Film className="mx-auto h-10 w-10 text-[#b0b3ba]" />
            <h2 className="mt-5 text-2xl font-black tracking-[-0.04em] text-[#101114]">Noch kein Auftrag vorhanden</h2>
            <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-[#686c73]">Nach einem bestätigten Kauf erscheint dein Auftrag hier. Beispiele findest du getrennt unter <Link href="/beispiele" className="font-bold text-[#5d4de1]">Beispiele</Link>.</p>
            <Link href="/kundenbereich/neu" className="mt-7 inline-flex items-center justify-center gap-2 rounded-xl bg-[#6d5dfc] px-5 py-3.5 text-sm font-black text-white"><Plus className="h-4 w-4" /> Erstes Video starten</Link>
          </section>
        ) : (
          <section className="mt-10">
            <div><span className="text-xs font-black uppercase tracking-[0.16em] text-[#5d4de1]">Deine Videobibliothek</span><h2 className="mt-2 text-2xl font-black tracking-[-0.04em] text-[#101114] sm:text-3xl">Alle Aufträge</h2></div>
            <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">{jobs.map((job) => <JobCard key={job.id} job={job} opening={openingJobId === job.id} onOpenVideo={openVideo} />)}</div>
          </section>
        )}
      </div>
    </div>
  );
}
