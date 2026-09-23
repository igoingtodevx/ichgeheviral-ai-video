"use client";

import React from "react";
import { ArrowRight, Play, CheckCircle2, Sparkles, ShieldCheck, Zap, Film } from "lucide-react";
import { PhoneMockup } from "./PhoneMockup";

interface HeroProps {
  onOpenVideo: () => void;
  onScrollToGenerator: () => void;
}

export function Hero({ onOpenVideo, onScrollToGenerator }: HeroProps) {
  return (
    <section className="relative overflow-hidden pt-8 pb-16 lg:pt-16 lg:pb-24 radial-glow-hero">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Messaging & Conversion */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            {/* Telemetry Eyebrow */}
            <div className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 bg-[#120F25] border border-violet-500/30 text-xs font-mono tracking-wider text-violet-300 mb-6">
              <span className="w-2 h-2 rounded-full bg-violet-400 animate-ping" />
              <span>AUTONOMER KI-REEL-GENERATOR // V1 VALIDATED</span>
            </div>

            {/* Monolithic Headline */}
            <h1 className="text-4xl sm:text-6xl lg:text-6xl xl:text-7xl font-extrabold tracking-tight text-white leading-[1.08] mb-6">
              Eine Idee. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-indigo-300 to-sky-400">
                Dein fertiges Reel.
              </span>{" "}
              <br />
              Vollautomatisch.
            </h1>

            {/* Subheadline */}
            <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed mb-8">
              Gib dem System ein Konzept oder ein Vorher-Nachher-Thema.
              Unsere Pipeline berechnet die visuelle Architektur, generiert 8 kohärente 
              Transformations-Zustände, berechnet flüssige Videoübergänge und liefert 
              ein fertiges <span className="text-white font-semibold">60+ Sekunden 9:16 Video</span> mit 
              nativer Akustik.
            </p>

            {/* CTA Action Row */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto mb-8">
              <button
                onClick={onScrollToGenerator}
                className="btn-electric flex items-center justify-center gap-2.5 rounded-xl px-7 py-4 text-base font-semibold text-white shadow-xl"
              >
                <span>Video erstellen</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onOpenVideo}
                className="flex items-center justify-center gap-2.5 rounded-xl px-6 py-4 text-base font-medium text-slate-200 border border-white/15 bg-white/[0.04] hover:bg-white/[0.08] hover:border-white/25 transition-all"
              >
                <Play className="w-4 h-4 text-violet-400 fill-violet-400/40" />
                <span>Demo ansehen (63s)</span>
              </button>
            </div>

            {/* Grounded Trust Signals */}
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs sm:text-sm text-slate-400 font-mono">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-violet-400 shrink-0" />
                <span>Kein manueller Schnitt nötig</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-sky-400 shrink-0" />
                <span>60+ Sekunden Vollformat</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>100% Kameraperspektiv-Lock</span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual Asset (Phone Mockup) */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <PhoneMockup onPlayFull={onOpenVideo} />
          </div>
        </div>

        {/* Feature Highlights Bar Below Hero */}
        <div className="mt-16 sm:mt-24 grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6 border-t border-white/[0.07] pt-12">
          {/* Pillar 1 */}
          <div className="glass-panel rounded-2xl p-6 relative overflow-hidden group hover:border-violet-500/40 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-violet-600/20 border border-violet-500/30 flex items-center justify-center mb-4">
              <Film className="w-5 h-5 text-violet-300" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">
              Virale Bau- & Transformations-Reels
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              Vom verkommenen Hinterhof zur Luxus-Pooloase. Physikalisch logische Bauabschnitte, 
              die das Gehirn fesseln und für maximale Verweildauer sorgen.
            </p>
          </div>

          {/* Pillar 2 */}
          <div className="glass-panel rounded-2xl p-6 relative overflow-hidden group hover:border-sky-500/40 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-sky-600/20 border border-sky-500/30 flex items-center justify-center mb-4">
              <ShieldCheck className="w-5 h-5 text-sky-300" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">
              Exakte Architektur-Kontinuität
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              Kein Springen der Kameraperspektive. Das Gebäude, die Zäune und die Grundstücksgrenzen 
              bleiben über alle 8 Phasen millimetergenau verankert.
            </p>
          </div>

          {/* Pillar 3 */}
          <div className="glass-panel rounded-2xl p-6 relative overflow-hidden group hover:border-indigo-500/40 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center mb-4">
              <Zap className="w-5 h-5 text-indigo-300" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">
              Alles automatisiert in der Cloud
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              2K-Bildmodelle, Video-Transitionen und die finale Video-Assemblierung 
              laufen autark in unserer Cloud-GPU-Pipeline ab.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
