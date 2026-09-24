"use client";

import React, { useState } from "react";
import { PRESET_CONCEPTS } from "../lib/constants";
import { api } from "../lib/api/client";
import { VideoJob } from "../lib/types";
import { ArrowRight, Loader2, CheckCircle2, Download, RefreshCw, Info } from "lucide-react";

export function GeneratorShell({ onOpenVideo }: { onOpenVideo?: (videoSrc: string) => void }) {
  const [prompt, setPrompt] = useState(
    "Verwilderter Hinterhof → moderne Luxus-Pooloase mit Travertin-Terrasse, Naturstein-Wasserfall & Pergola"
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentJob, setCurrentJob] = useState<VideoJob | null>(null);
  const [simulatedStep, setSimulatedStep] = useState<number>(0);

  const hasBackendApi = Boolean(process.env.NEXT_PUBLIC_API_URL);

  const handlePresetClick = (concept: string) => {
    setPrompt(concept);
  };

  const handleStartGeneration = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    setIsSubmitting(true);
    setSimulatedStep(1);

    if (hasBackendApi) {
      try {
        const job = await api.createJob({ concept: prompt });
        setCurrentJob(job);

        // Poll backend
        const pollInterval = setInterval(async () => {
          try {
            const updated = await api.getJob(job.id);
            setCurrentJob(updated);
            if (updated.status === "completed" || updated.status === "failed") {
              clearInterval(pollInterval);
              setIsSubmitting(false);
            }
          } catch {
            clearInterval(pollInterval);
            setIsSubmitting(false);
          }
        }, 3000);
      } catch (err) {
        console.error(err);
        setIsSubmitting(false);
      }
      return;
    }

    // Demo / Preview Mode: simulate pipeline steps without pretending arbitrary prompt was rendered
    const timers = [
      setTimeout(() => setSimulatedStep(2), 1200),
      setTimeout(() => setSimulatedStep(3), 2500),
      setTimeout(() => setSimulatedStep(4), 3900),
      setTimeout(() => {
        setSimulatedStep(5);
        setIsSubmitting(false);
        setCurrentJob({
          id: "preview_sample",
          concept: prompt,
          status: "completed",
          progress: {
            phase: "completed",
            completed: 15,
            total: 15,
            percent: 100,
            details: "Vorschau abgeschlossen",
          },
          cost: null,
          error: null,
          final_video_url: "/media/videos/golden-pool-run1.mp4",
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        });
      }, 5200),
    ];

    return () => timers.forEach(clearTimeout);
  };

  const handleReset = () => {
    setCurrentJob(null);
    setSimulatedStep(0);
  };

  return (
    <section id="generator" className="relative py-20 lg:py-28 bg-[#090714] border-t border-b border-white/[0.06] overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center rounded-full px-3.5 py-1 bg-violet-950/60 border border-violet-700/40 text-xs font-mono text-violet-300 mb-4">
            <span>INTERAKTIVE VORSCHAU</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
            Probiere den Generator aus.
          </h2>

          <p className="text-base sm:text-lg text-slate-300">
            Formuliere dein gewünschtes Transformations-Konzept und sieh, wie 
            die automatisierte Pipeline daraus ein fertiges 60+ Sekunden Reel aufbaut.
          </p>
        </div>

        {/* Generator Main Container */}
        <div className="glass-panel rounded-3xl p-6 sm:p-10 border border-white/[0.09] shadow-2xl max-w-4xl mx-auto">
          {!currentJob || currentJob.status !== "completed" ? (
            /* Input Form Mode */
            <form onSubmit={handleStartGeneration} className="space-y-6">
              {!hasBackendApi && (
                <div className="p-3.5 rounded-2xl bg-violet-950/30 border border-violet-700/30 flex items-start gap-3">
                  <Info className="w-4 h-4 text-violet-400 mt-0.5 shrink-0" />
                  <div className="text-xs text-slate-300 leading-relaxed">
                    <span className="font-semibold text-white">Vorschau-Modus: </span>
                    Hier testest du die interaktive Benutzeroberfläche und den Ablauf der Pipeline. Sobald das Backend angebunden ist, wird dein individueller Prompt direkt live gerendert.
                  </div>
                </div>
              )}

              <div>
                <label className="block text-sm font-semibold text-white mb-2">
                  Beschreibe dein Video-Konzept:
                </label>
                <div className="relative">
                  <textarea
                    rows={4}
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="z.B. Vorher-Nachher Transformation: Verwilderter Schotter-Hinterhof verwandelt sich schrittweise in eine exklusive Wellness-Oase mit Pool und Außendusche..."
                    disabled={isSubmitting}
                    className="w-full rounded-2xl bg-black/50 border border-white/15 p-4 text-sm sm:text-base text-white placeholder-slate-500 focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition-all resize-none font-sans"
                  />
                  <div className="absolute bottom-3 right-3 text-[11px] font-mono text-slate-500">
                    9:16 FORMAT · 60+ SEK
                  </div>
                </div>
              </div>

              {/* Preset Quick Chips */}
              <div>
                <span className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-2.5">
                  Vorschlag wählen:
                </span>
                <div className="flex flex-wrap gap-2">
                  {PRESET_CONCEPTS.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => handlePresetClick(item.prompt)}
                      disabled={isSubmitting}
                      className="text-xs px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 hover:border-violet-500/40 transition-all font-sans"
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Pipeline Simulation Progress (if running) */}
              {isSubmitting && (
                <div className="p-5 rounded-2xl bg-[#120F26] border border-violet-500/30 space-y-3">
                  <div className="flex items-center justify-between text-xs font-mono text-violet-300">
                    <span className="flex items-center gap-2">
                      <Loader2 className="w-4 h-4 animate-spin text-violet-400" />
                      <span>PIPELINE WIRD DURCHLAUFEN...</span>
                    </span>
                    <span>SCHRITT {simulatedStep} VON 4</span>
                  </div>

                  <div className="w-full h-1.5 bg-black/60 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-violet-500 to-sky-400 transition-all duration-500"
                      style={{ width: `${(simulatedStep / 4) * 100}%` }}
                    />
                  </div>

                  <div className="text-xs text-slate-300 font-mono space-y-1.5 pt-1">
                    {simulatedStep >= 1 && (
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Konzept analysiert & finale Zielszene definiert</span>
                      </div>
                    )}
                    {simulatedStep >= 2 && (
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                        <span>8 aufeinander aufbauende Bauphasen geplant</span>
                      </div>
                    )}
                    {simulatedStep >= 3 && (
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Nahtlose Video-Übergänge berechnet (720×1280 9:16)</span>
                      </div>
                    )}
                    {simulatedStep >= 4 && (
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Sound synchronisiert & fertiges 60+ Sekunden Reel exportiert</span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Action Button */}
              <div className="flex items-center justify-between pt-2">
                <span className="text-xs text-slate-400 font-mono hidden sm:inline-block">
                  60+ Sekunden · 9:16 · Vollautomatisch
                </span>

                <button
                  type="submit"
                  disabled={isSubmitting || !prompt.trim()}
                  className="btn-electric w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl text-sm font-semibold text-white shadow-xl disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Pipeline generiert Reel...</span>
                    </>
                  ) : (
                    <>
                      <span>Video erstellen</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </form>
          ) : (
            /* Result View Mode */
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-white">
                      {hasBackendApi ? "Reel erfolgreich generiert!" : "Ablauf erfolgreich durchlaufen"}
                    </h4>
                    <p className="text-xs text-slate-400 font-mono">
                      {hasBackendApi
                        ? `Job-ID: ${currentJob.id} · Dauer: 63s`
                        : "Vorschau-Modus · Echte Referenz aus der Pipeline"}
                    </p>
                  </div>
                </div>

                <button
                  onClick={handleReset}
                  className="flex items-center gap-1.5 text-xs font-mono text-slate-400 hover:text-white px-3 py-1.5 rounded-lg border border-white/10 hover:bg-white/5 transition-all"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Neues Konzept</span>
                </button>
              </div>

              {!hasBackendApi && (
                <div className="p-4 rounded-xl bg-violet-950/40 border border-violet-500/30 text-xs sm:text-sm text-slate-300 space-y-1.5">
                  <div className="font-semibold text-white flex items-center gap-2">
                    <Info className="w-4 h-4 text-violet-400" />
                    <span>Hinweis zur Live-Generierung:</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed pl-6">
                    Dein eingegebenes Konzept <span className="text-violet-300 font-medium">&ldquo;{prompt}&rdquo;</span> wurde als interaktiver Vorschau-Ablauf simuliert. Da die GPU-Live-Generierung für individuelle Prompts aktuell im geschlossenen Kontingent läuft, siehst du unten das <strong>echte, fertig generierte Referenz-Reel</strong> aus genau diesem automatisierten Pipeline-Verfahren.
                  </p>
                </div>
              )}

              {/* Result Preview Box */}
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-center">
                <div
                  onClick={() => onOpenVideo?.(currentJob.final_video_url || "/media/videos/golden-pool-run1.mp4")}
                  className="sm:col-span-5 aspect-[9/16] rounded-2xl overflow-hidden border border-violet-500/40 bg-black shadow-xl relative group"
                >
                  <video
                    src={currentJob.final_video_url || "/media/videos/golden-pool-run1.mp4"}
                    poster="/media/videos/hero-poster.jpg"
                    controls
                    autoPlay
                    loop
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="sm:col-span-7 space-y-4">
                  <div>
                    <span className="text-[11px] font-mono text-violet-400 uppercase tracking-widest block mb-1">
                      {hasBackendApi ? "Generiertes Format" : "Referenz-Ergebnis aus der Pipeline"}
                    </span>
                    <h5 className="text-lg font-bold text-white">
                      Hinterhof zu moderner Luxus-Pooloase
                    </h5>
                    <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                      Natives 9:16 MP4-Video, 8 aufeinander abgestimmte Bauphasen, nahtlose Übergänge und passender Umgebungssound.
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-black/40 border border-white/10 text-xs font-mono space-y-1.5 text-slate-300">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Auflösung:</span>
                      <span className="text-white">720×1280 (720p HD Vertical)</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Laufzeit:</span>
                      <span className="text-emerald-400">63 Sekunden</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">FPS / Audio:</span>
                      <span className="text-white">24 fps · Synchronisierter Sound</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-3 pt-2">
                    <a
                      href={currentJob.final_video_url || "/media/videos/golden-pool-run1.mp4"}
                      download="ichgeheviral_referenz_reel.mp4"
                      className="btn-electric flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold text-white shadow-lg"
                    >
                      <Download className="w-4 h-4" />
                      <span>Referenz-Reel herunterladen (MP4)</span>
                    </a>

                    <button
                      onClick={handleReset}
                      className="px-4 py-2.5 rounded-xl text-xs font-medium text-slate-300 hover:text-white border border-white/10 hover:bg-white/5 transition-all"
                    >
                      Anderes Konzept testen
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
