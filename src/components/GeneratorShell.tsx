"use client";

import React, { useState } from "react";
import { PRESET_CONCEPTS } from "../lib/constants";
import { api } from "../lib/api/client";
import { VideoJob, JobStatus } from "../lib/types";
import { Sparkles, ArrowRight, Loader2, CheckCircle2, Download, RefreshCw, Film, Layers } from "lucide-react";

export function GeneratorShell({ onOpenVideo }: { onOpenVideo?: (videoSrc: string) => void }) {
  const [prompt, setPrompt] = useState(
    "Ugly backyard zu moderner Luxus-Pooloase mit Naturstein-Wasserfall, eingelassenem Spa & Pergola"
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentJob, setCurrentJob] = useState<VideoJob | null>(null);
  const [simulatedStep, setSimulatedStep] = useState<number>(0);

  const handlePresetClick = (concept: string) => {
    setPrompt(concept);
  };

  const handleStartGeneration = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    setIsSubmitting(true);
    setSimulatedStep(1);

    try {
      const job = await api.createJob({ concept: prompt });
      setCurrentJob(job);

      // Simulate step progression for frontend shell preview
      const timers = [
        setTimeout(() => setSimulatedStep(2), 1200),
        setTimeout(() => setSimulatedStep(3), 2600),
        setTimeout(() => setSimulatedStep(4), 4200),
        setTimeout(() => {
          setSimulatedStep(5);
          setIsSubmitting(false);
          setCurrentJob({
            ...job,
            status: "completed",
            progress: {
              phase: "completed",
              completed: 15,
              total: 15,
              percent: 100,
              details: "Fertiggestellt (63.1s Reel)",
            },
            final_video_url: "/media/videos/golden-pool-run1.mp4",
          });
        }, 5800),
      ];

      return () => timers.forEach(clearTimeout);
    } catch (err) {
      console.error(err);
      setIsSubmitting(false);
    }
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
          <div className="inline-flex items-center gap-2 rounded-full px-3 py-1 bg-violet-950/60 border border-violet-700/40 text-xs font-mono text-violet-300 mb-4">
            <Sparkles className="w-3.5 h-3.5 text-violet-400" />
            <span>INTERAKTIVE PRODUKT-SHELL</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
            Probiere den Generator aus.
          </h2>

          <p className="text-base sm:text-lg text-slate-300">
            Formuliere dein gewünschtes Transformations-Konzept. Die Benutzeroberfläche 
            ist direkt an die Architektur unseres Python/Runware-Backends angebunden.
          </p>
        </div>

        {/* Generator Main Container */}
        <div className="glass-panel rounded-3xl p-6 sm:p-10 border border-white/[0.09] shadow-2xl max-w-4xl mx-auto">
          {!currentJob || currentJob.status !== "completed" ? (
            /* Input Form Mode */
            <form onSubmit={handleStartGeneration} className="space-y-6">
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
                    9:16 VERTICAL // 60+ SEC
                  </div>
                </div>
              </div>

              {/* Preset Quick Chips */}
              <div>
                <span className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-2.5">
                  Vorschlag wählen:
                </span>
                <div className="flex flex-wrap gap-2">
                  {PRESET_CONCEPTS.map((concept, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handlePresetClick(concept)}
                      disabled={isSubmitting}
                      className="text-xs text-left px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 hover:border-violet-500/40 transition-all font-sans"
                    >
                      {concept.split("→")[0]} → {concept.split("→")[1]?.slice(0, 30)}...
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
                      <span>AUTONOME PIPELINE ARBEITET...</span>
                    </span>
                    <span>SCHRITT {simulatedStep} VON 4</span>
                  </div>

                  <div className="w-full h-1.5 bg-black/60 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-violet-500 to-sky-400 transition-all duration-500"
                      style={{ width: `${(simulatedStep / 4) * 100}%` }}
                    />
                  </div>

                  <div className="text-xs text-slate-300 font-mono space-y-1 pt-1">
                    {simulatedStep >= 1 && (
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Konzept normalisiert & State 08 Design-Lock gesetzt (1536×2752)</span>
                      </div>
                    )}
                    {simulatedStep >= 2 && (
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                        <span>8 Bauphasen sequentiell synthetisiert (State 08 → State 01)</span>
                      </div>
                    )}
                    {simulatedStep >= 3 && (
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                        <span>7x Omni-Flash Video-Transitionen gerendert (720×1280 9:16)</span>
                      </div>
                    )}
                    {simulatedStep >= 4 && (
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                        <span>FFmpeg Stream-Copy Concat & finale Validierung (63.1s)</span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Action Button */}
              <div className="flex items-center justify-between pt-2">
                <span className="text-xs text-slate-400 font-mono hidden sm:inline-block">
                  POST /jobs → 202 Accepted
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
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-white">
                      Reel erfolgreich generiert!
                    </h4>
                    <p className="text-xs text-slate-400 font-mono">
                      Job-ID: {currentJob.id} // Dauer: 63.1s // Status: 200 OK
                    </p>
                  </div>
                </div>

                <button
                  onClick={handleReset}
                  className="flex items-center gap-1.5 text-xs font-mono text-slate-400 hover:text-white px-3 py-1.5 rounded-lg border border-white/10 hover:bg-white/5 transition-all"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Neues Video</span>
                </button>
              </div>

              {/* Result Preview Box */}
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-center">
                <div className="sm:col-span-5 aspect-[9/16] rounded-2xl overflow-hidden border border-violet-500/40 bg-black shadow-xl relative group">
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
                      Generiertes Format
                    </span>
                    <h5 className="text-lg font-bold text-white">
                      {prompt.slice(0, 70)}...
                    </h5>
                    <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                      Natives 9:16 MP4-Video, 8 aufeinander abgestimmte Bauphasen, 7 flüssige 
                      Interpolations-Transitionen und reale Akustik.
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-black/40 border border-white/10 text-xs font-mono space-y-1 text-slate-300">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Auflösung:</span>
                      <span className="text-white">720×1280 (HD Vertical)</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Dauer:</span>
                      <span className="text-emerald-400">63.144 Sekunden</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">FPS / Audio:</span>
                      <span className="text-white">24 fps // Stereo Native</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-3 pt-2">
                    <a
                      href={currentJob.final_video_url || "/media/videos/golden-pool-run1.mp4"}
                      download="ichgeheviral_reel.mp4"
                      className="btn-electric flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold text-white shadow-lg"
                    >
                      <Download className="w-4 h-4" />
                      <span>Video herunterladen (MP4)</span>
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
