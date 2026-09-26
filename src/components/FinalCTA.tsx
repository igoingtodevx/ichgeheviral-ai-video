"use client";

import React from "react";
import { ArrowRight, Check } from "lucide-react";

export function FinalCTA({ onScrollToGenerator }: { onScrollToGenerator: () => void }) {
  return (
    <section className="relative py-20 lg:py-28 overflow-hidden">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl p-8 sm:p-14 lg:p-16 overflow-hidden border border-violet-500/40 bg-gradient-to-b from-[#16112C] via-[#0E0B1F] to-[#07060B] shadow-2xl text-center">
          {/* Ambient decorative glow */}
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full bg-violet-600/30 blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-3xl mx-auto space-y-6">
            <div className="inline-flex items-center rounded-full px-4 py-1.5 bg-violet-950/80 border border-violet-600/40 text-xs font-mono font-bold tracking-widest text-violet-300 uppercase">
              <span>KEINE CREDITS · MAXIMALES VIRALPOTENZIAL</span>
            </div>

            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.12]">
              Hör auf, Credits für zufällige KI-Clips zu verbrennen. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-indigo-300 to-sky-400">
                Erstelle stattdessen ein fertiges Transformations-Reel.
              </span>
            </h2>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-xl mx-auto">
              Aus einer einzigen Idee entsteht automatisch ein 60+ Sekunden Reel, dessen Aufbau gezielt auf 
              Aufmerksamkeit, kontinuierlichen Fortschritt und einen starken visuellen Payoff ausgelegt ist.
            </p>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={onScrollToGenerator}
                className="btn-electric w-full sm:w-auto flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl text-base font-semibold text-white shadow-xl hover:scale-[1.02] transition-transform"
              >
                <span>Jetzt Video erstellen</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            <div className="pt-4 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs sm:text-sm text-slate-300 font-mono">
              <div className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-amber-400" />
                <span className="text-white font-medium">Keine Credits</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-violet-400" />
                <span>Kein Videoschnitt</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-sky-400" />
                <span>60+ Sekunden</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span>Natives 9:16</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
