"use client";

import Link from "next/link";
import { useAuth } from "@clerk/nextjs";
import { useCallback, useEffect, useState } from "react";
import { api, type CustomerJob } from "../lib/api/client";
import { formatDateTime, progressPercent, STATUS_LABELS, TERMINAL_STATUSES } from "../lib/jobs";

export function CustomerJobDetail({ jobId }: { jobId: string }) {
  const { getToken, isLoaded, isSignedIn } = useAuth();
  const [job, setJob] = useState<CustomerJob | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const load = useCallback(async () => {
    try { setJob(await api.getJob(jobId, getToken)); setError(null); }
    catch (reason) { setError(reason instanceof Error ? reason.message : "Auftrag nicht verfügbar."); }
  }, [jobId, getToken]);
  useEffect(() => {
    if (!isLoaded || !isSignedIn) return;
    const initial = window.setTimeout(() => void load(), 0);
    const poll = window.setInterval(() => void load(), 10_000);
    return () => { window.clearTimeout(initial); window.clearInterval(poll); };
  }, [isLoaded, isSignedIn, load]);

  async function video(download: boolean) {
    setBusy(true); setError(null);
    try {
      const { url } = await api.getVideoUrl(jobId, getToken, download);
      if (download) {
        const link = document.createElement("a"); link.href = url; link.download = `ichgeheviral-${jobId}.mp4`; link.rel = "noreferrer"; link.click();
      } else setVideoUrl(url);
    } catch (reason) { setError(reason instanceof Error ? reason.message : "Video nicht verfügbar."); }
    finally { setBusy(false); }
  }

  const percent = job ? progressPercent(job) : null;
  return <div className="mx-auto max-w-5xl px-5 py-10"><Link href="/kundenbereich" className="text-sm font-bold text-[#5d4de1]">← Meine Reels</Link>{error && <p role="alert" className="mt-6 rounded-2xl bg-red-50 p-5 text-sm text-red-800">{error}</p>}{!job ? <p className="mt-10">{error ? "Der Auftrag existiert nicht oder gehört nicht zu deinem Account." : "Auftrag wird geladen …"}</p> : <section className="mt-8 rounded-3xl border border-[#e4e1ec] bg-white p-6 sm:p-9"><p className="text-xs font-black uppercase tracking-wider text-[#5d4de1]">{STATUS_LABELS[job.status]}</p><h1 className="mt-4 text-3xl font-black tracking-tight">{job.concept}</h1><p className="mt-4 text-sm text-[#686c73]">Letzte Aktualisierung: {formatDateTime(job.updated_at)}</p>{percent !== null && <p className="mt-4 text-sm">Fortschritt vom Server: {percent}%</p>}{job.status === "interrupted" && <p className="mt-4 text-sm text-amber-800">Die Produktion wurde unterbrochen. Es wird keine kostenpflichtige Inferenz automatisch wiederholt.</p>}{job.status === "failed" && <p className="mt-4 text-sm text-red-800">{job.error || "Die Produktion ist fehlgeschlagen. Bitte kontaktiere uns."}</p>}{job.status === "completed" ? <><div className="mt-7 flex flex-wrap gap-3"><button disabled={busy} onClick={() => void video(false)} className="rounded-xl bg-[#6d5dfc] px-5 py-3 text-sm font-black text-white disabled:opacity-50">{busy ? "Lade …" : "Video öffnen / Link erneuern"}</button><button disabled={busy} onClick={() => void video(true)} className="rounded-xl border border-[#dedbe7] px-5 py-3 text-sm font-black disabled:opacity-50">Herunterladen</button></div><p className="mt-3 text-xs text-[#858991]">Der geschützte Videolink ist 5 Minuten gültig. Danach kannst du ihn hier erneuern.</p>{videoUrl && <video src={videoUrl} controls playsInline preload="metadata" onError={() => setError("Videolink abgelaufen oder nicht erreichbar. Bitte den Link erneuern.")} className="mt-7 max-h-[75vh] w-full rounded-2xl bg-black" />}</> : !TERMINAL_STATUSES.has(job.status) && <Link href={`/kundenbereich/produktion?job_id=${encodeURIComponent(jobId)}`} className="mt-7 inline-block text-sm font-black text-[#5d4de1]">Status & Fortschritt ansehen →</Link>}</section>}</div>;
}
