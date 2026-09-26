"use client";

import React from "react";
import { ArrowRight, Target } from "lucide-react";

interface FounderSectionProps {
  onScrollToGenerator?: () => void;
}

export function FounderSection({ onScrollToGenerator }: FounderSectionProps) {
  return (
    <section id="founder" className="relative py-20 lg:py-28 bg-[#0B0918] border-t border-b border-white/[0.06] overflow-hidden scroll-mt-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <div className="lg:col-span-7 flex flex-col items-start">
            <div className="inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 bg-violet-950/70 border border-violet-700/40 text-xs font-mono font-bold tracking-widest text-violet-300 uppercase mb-6">
              <Target className="w-3.5 h-3.5 text-violet-400" />
              <span>DAS PRODUKTZIEL</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-[1.12] mb-6">
              Warum IchGeheViral?
            </h2>

            <div className="space-y-4 text-base sm:text-lg text-slate-300 leading-relaxed mb-8">
              <p>
                IchGeheViral verfolgt ein klares Ziel: Aus einer einzigen Idee soll ein zusammenhängendes,
                veröffentlichungsfertiges Transformations-Reel entstehen — ohne dass du einzelne KI-Clips
                zusammensetzen oder selbst schneiden musst.
              </p>
              <p>
                Dafür baut die Pipeline mehrere aufeinander abgestimmte Phasen auf, hält die visuelle Entwicklung
                konsistent und führt das Video auf einen klaren Final-Reveal hin. Technik ist dabei Mittel zum Zweck:
                Das Ergebnis soll sich wie ein echtes Shortform-Video anfühlen, nicht wie eine Sammlung zufälliger Generierungen.
              </p>
            </div>

            <div className="flex items-center gap-4 mb-8 pb-6 border-b border-white/[0.08] w-full">
              <div className="w-12 h-12 rounded-full overflow-hidden border border-violet-500/40 shrink-0">
                <img
                  src="/media/founder/timo-founder.jpg"
                  alt="Timo"
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <div>
                <div className="font-bold text-white text-base">Timo</div>
                <div className="text-xs font-mono text-violet-300">Gründer von IchGeheViral</div>
              </div>
            </div>

            {onScrollToGenerator && (
              <button
                onClick={onScrollToGenerator}
                className="btn-electric flex items-center gap-2 px-7 py-3.5 rounded-xl text-sm font-semibold text-white shadow-xl"
              >
                <span>Jetzt eigenes Video erstellen</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>

          <div className="lg:col-span-5 relative">
            <div className="absolute -inset-4 rounded-3xl bg-gradient-to-r from-violet-600/20 to-indigo-600/15 blur-2xl opacity-50 pointer-events-none" />

            <div className="relative rounded-3xl overflow-hidden border border-white/15 bg-black shadow-2xl aspect-[4/5] max-w-md mx-auto group">
              <img
                src="/media/founder/timo-founder.jpg"
                alt="Timo – Gründer von IchGeheViral"
                className="w-full h-full object-cover object-top filter brightness-95 group-hover:scale-105 transition-transform duration-700"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent" />

              <div className="absolute bottom-6 inset-x-6 z-10 text-white">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-xs font-mono text-violet-300 mb-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  <span>Transformation + Retention</span>
                </div>
                <h4 className="text-lg font-bold text-white">
                  Timo // Gründer
                </h4>
                <p className="text-xs text-slate-300 mt-1">
                  Fokus auf zusammenhängende Shortform-Videos statt zufälliger Einzelclips.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
