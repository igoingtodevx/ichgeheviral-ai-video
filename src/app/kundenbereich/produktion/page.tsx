"use client";

import Link from "next/link";
import { useAuth } from "@clerk/nextjs";
import { AlertCircle, Check, Circle, LoaderCircle, RefreshCw } from "lucide-react";
import { Suspense, useCallback, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { api, type CustomerJob, type CustomerJobStatus } from "../../../lib/api/client";
import { formatDateTime, progressPercent, STATUS_LABELS } from "../../../lib/jobs";

const STEPS: Array<{ status: CustomerJobStatus; title: string; description: string }> = [
  { status: "preparing", title: "Auftrag vorbereitet", description: "Der bestätigte Auftrag wird für die Verarbeitung bereitgestellt." },
  { status: "queued", title: "In der Warteschlange", description: "Der Auftrag wartet auf einen freigegebenen Worker." },
  { status: "generating_images", title: "Bilder werden erstellt", description: "Die Szenenbilder entstehen aus dem Auftrag." },
  { status: "generating_videos", title: "Übergänge werden erstellt", description: "Die Bildfolgen werden als Videosequenzen ausgearbeitet." },
  { status: "assembling", title: "Reel wird zusammengesetzt", description: "Die Sequenzen werden zu einem Reel verbunden." },
  { status: "upload_pending", title: "Video wird gespeichert", description: "Das fertige Artefakt wird verifiziert gespeichert." },
  { status: "completed", title: "Reel fertig", description: "Das Backend meldet den Auftrag als abgeschlossen." },
];

const STATUS_INDEX = new Map(STEPS.map((step, index) => [step.status, index]));

function StatusTimeline({ job }: { job: CustomerJob }) {
  const currentIndex = STATUS_INDEX.get(job.status) ?? -1;
  const percent = progressPercent(job);
  return (
    <div>
      <div className="flex items-end justify-between gap-4"><div><div className="text-xs font-black uppercase tracking-[0.14em] text-[#8a8e94]">Serverstatus</div><div className="mt-1 text-2xl font-black text-[#101114]">{STATUS_LABELS[job.status]}</div></div>{percent !== null && <div className="text-sm font-black text-[#5d4de1]">{percent}%</div>}</div>
      {percent !== null && <div className="mt-4 h-2 overflow-hidden rounded-full bg-[#efedf4]"><div className="h-full rounded-full bg-[#6d5dfc]" style={{ width: `${percent}%` }} /></div>}
      <div className="mt-8 space-y-1">{STEPS.map((step, index) => { const done = job.status === "completed" ? true : currentIndex > index; const active = currentIndex === index; return <div key={step.status} className="relative flex gap-3 pb-6">{index < STEPS.length - 1 && <span className="absolute left-[11px] top-6 h-[calc(100%-12px)] w-px bg-[#e4e1ec]" />}<span className={`relative z-10 mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full ${done ? "bg-[#6d5dfc] text-white" : active ? "border-2 border-[#6d5dfc] bg-[#f0edff] text-[#6d5dfc]" : "border border-[#d9d6e2] bg-white text-[#b0b3ba]"}`}>{done ? <Check className="h-3.5 w-3.5" /> : <Circle className="h-2.5 w-2.5 fill-current" />}</span><div><div className={`text-sm font-black ${active ? "text-[#5d4de1]" : "text-[#101114]"}`}>{step.title}</div><p className="mt-1 text-xs leading-5 text-[#858991]">{step.description}</p></div></div>; })}</div>
      {job.status === "interrupted" && <div className="rounded-2xl border border-[#ead8b2] bg-[#fffaf0] p-4 text-sm font-semibold text-[#8b5d14]">Der Auftrag wurde unterbrochen. Paid-Inferenz wird nicht automatisch wiederholt; eine Recovery muss operativ erfolgen.</div>}
      {job.status === "failed" && <div className="rounded-2xl border border-[#f0caca] bg-[#fff5f5] p-4 text-sm font-semibold text-[#9c3c3c]">{job.error || "Das Backend meldet einen Fehler für diesen Auftrag."}</div>}
    </div>
  );
}

export default function ProductionStatusPage() {
  return (
    <Suspense fallback={<div className="flex min-h-[55vh] items-center justify-center gap-3 text-sm font-bold text-[#686c73]">Produktionsstatus wird geladen …</div>}>
      <ProductionStatusContent />
    </Suspense>
  );
}

function ProductionStatusContent() {
  const { getToken, isLoaded, isSignedIn } = useAuth();
  const searchParams = useSearchParams();
  const requestedJobId = searchParams.get("job_id");
  const [jobs, setJobs] = useState<CustomerJob[]>([]);
  const [job, setJob] = useState<CustomerJob | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    try {
      if (requestedJobId) {
        setJob(await api.getJob(requestedJobId, getToken));
      } else {
        const items = await api.listJobs(getToken);
        setJobs(items);
        setJob(items.find((item) => !["completed", "failed"].includes(item.status)) || items[0] || null);
      }
      setError(null);
    } catch (reason: unknown) {
      setError(reason instanceof Error ? reason.message : "Der Produktionsstatus konnte nicht geladen werden.");
    } finally {
      setLoading(false);
    }
  }, [getToken, requestedJobId]);

  useEffect(() => {
    if (!isLoaded || !isSignedIn) return;
    const initialLoad = window.setTimeout(() => void load(), 0);
    const refreshId = window.setInterval(() => void load(), 10_000);
    return () => { window.clearTimeout(initialLoad); window.clearInterval(refreshId); };
  }, [isLoaded, isSignedIn, load]);

  const choices = useMemo(() => jobs.length ? jobs : job ? [job] : [], [job, jobs]);

  if (!isLoaded || !isSignedIn || loading) return <div className="flex min-h-[55vh] items-center justify-center gap-3 text-sm font-bold text-[#686c73]"><LoaderCircle className="h-5 w-5 animate-spin text-[#6d5dfc]" /> Produktionsstatus wird geladen …</div>;

  return <div className="px-4 py-8 sm:px-6 lg:px-10 lg:py-10"><div className="mx-auto max-w-5xl"><div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"><div><span className="text-xs font-black uppercase tracking-[0.16em] text-[#5d4de1]">Echter Auftragsstatus</span><h1 className="mt-3 text-4xl font-black tracking-[-0.055em] sm:text-5xl">So steht dein Auftrag.</h1><p className="mt-3 max-w-2xl text-sm leading-6 text-[#686c73]">Diese Ansicht zeigt ausschließlich Status und Fortschritt aus dem Backend. Sie simuliert keine Produktion.</p></div><button type="button" onClick={() => void load()} className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#dedbe7] bg-white px-4 py-3 text-sm font-black"><RefreshCw className="h-4 w-4" /> Aktualisieren</button></div>
      {error && <div className="mt-6 flex items-start gap-3 rounded-2xl border border-[#f0caca] bg-[#fff5f5] p-4 text-sm font-semibold text-[#9c3c3c]"><AlertCircle className="mt-0.5 h-4 w-4" />{error}</div>}
      {choices.length > 1 && <div className="mt-8"><label htmlFor="job-select" className="text-xs font-black uppercase tracking-[0.14em] text-[#8a8e94]">Auftrag auswählen</label><select id="job-select" value={job?.id || ""} onChange={(event) => { const next = choices.find((item) => item.id === event.target.value); if (next) setJob(next); }} className="mt-2 w-full rounded-xl border border-[#e4e1ec] bg-white px-4 py-3 text-sm font-bold sm:max-w-xl">{choices.map((item) => <option key={item.id} value={item.id}>{item.concept}</option>)}</select></div>}
      {!job ? <section className="mt-10 rounded-[26px] border border-dashed border-[#d9d6e2] bg-white px-6 py-16 text-center"><h2 className="text-2xl font-black">Noch kein Auftrag ausgewählt</h2><p className="mx-auto mt-3 max-w-md text-sm leading-6 text-[#686c73]">Nach einem bestätigten Kauf erscheint der echte Produktionsstatus hier.</p><Link href="/kundenbereich" className="mt-7 inline-flex rounded-xl bg-[#6d5dfc] px-5 py-3.5 text-sm font-black text-white">Zu Meine Reels</Link></section> : <section className="mt-10 grid gap-6 lg:grid-cols-[1fr_280px]"><div className="rounded-[26px] border border-[#e4e1ec] bg-white p-6 shadow-[0_18px_60px_rgba(37,31,68,.06)] sm:p-8"><StatusTimeline job={job} /></div><aside className="rounded-[26px] border border-[#e4e1ec] bg-white p-6"><div className="text-xs font-black uppercase tracking-[0.14em] text-[#8a8e94]">Auftrag</div><h2 className="mt-3 text-lg font-black leading-6">{job.concept}</h2><dl className="mt-6 space-y-4 text-sm"><div><dt className="text-xs font-bold uppercase tracking-wider text-[#8a8e94]">Erstellt</dt><dd className="mt-1 font-semibold">{formatDateTime(job.created_at)}</dd></div><div><dt className="text-xs font-bold uppercase tracking-wider text-[#8a8e94]">Letzte Aktualisierung</dt><dd className="mt-1 font-semibold">{formatDateTime(job.updated_at)}</dd></div></dl>{job.status === "completed" && <Link href={`/kundenbereich/reel/${encodeURIComponent(job.id)}`} className="mt-7 flex w-full justify-center rounded-xl bg-[#6d5dfc] px-4 py-3.5 text-sm font-black text-white">Reel öffnen</Link>}</aside></section>}
    </div></div>;
}
