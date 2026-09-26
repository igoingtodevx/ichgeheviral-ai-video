"use client";

import React from "react";
import { Coins, ArrowRight, XCircle, CheckCircle2 } from "lucide-react";

interface NoCreditsSectionProps {
  onScrollToGenerator?: () => void;
}

export function NoCreditsSection({ onScrollToGenerator }: NoCreditsSectionProps) {
  return (
    <section id="no-credits" className="relative py-20 lg:py-28 overflow-hidden scroll-mt-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* High-Contrast Luminous Card - Visueller Break gegen dunkle Monotonie */}
        <div className="relative rounded-3xl p-8 sm:p-12 lg:p-16 bg-gradient-to-br from-white via-slate-50 to-slate-100 text-slate-900 border border-white/60 shadow-[0_25px_80px_-15px_rgba(255,255,255,0.15)] overflow-hidden">
          {/* Subtle decorative gradient overlay */}
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-violet-200/50 rounded-full blur-3xl pointer-events-none" />

          {/* Section Eyebrow */}
          <div className="inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 bg-amber-100 border border-amber-300 text-xs font-mono font-bold text-amber-900 mb-6 shadow-sm">
            <Coins className="w-3.5 h-3.5 text-amber-700" />
            <span>ECHTER PRODUKT-USP</span>
          </div>

          {/* Main Headline */}
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-950 tracking-tight leading-[1.08] mb-6">
            Keine Credits. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-700 to-indigo-700">
              Keine komplizierte Rechnerei.
            </span>
          </h2>

          {/* Subtext */}
          <p className="text-base sm:text-xl text-slate-700 max-w-2xl leading-relaxed mb-12">
            IchGeheViral arbeitet nicht wie typische KI-Tools, bei denen jede weitere Generation und jeder 
            Fehlversuch einen Credit-Zähler reduziert. Bei uns zählst du keine Punkte — du erstellst dein Video.
          </p>

          {/* Side-by-Side Visual Comparison */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 items-stretch">
            {/* Box 1: Typical AI Tools */}
            <div className="rounded-2xl p-6 sm:p-8 bg-white border border-slate-200/90 shadow-sm flex flex-col justify-between">
              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-50 border border-red-200 text-xs font-mono font-bold text-red-700 mb-4">
                  <XCircle className="w-3.5 h-3.5 text-red-600" />
                  <span>ANDERE KI-VIDEO TOOLS</span>
                </div>

                <h3 className="text-xl font-bold text-slate-900 mb-6">
                  Der typische Credit-Verfall:
                </h3>

                <div className="space-y-4 font-mono text-xs sm:text-sm">
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between text-slate-700">
                    <span>100 Credits gekauft</span>
                    <span className="font-bold text-slate-900">Startguthaben</span>
                  </div>

                  <div className="text-center text-slate-400 font-bold text-base">↓</div>

                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between text-slate-600">
                    <span>80 Credits verbleibend</span>
                    <span className="text-red-600 font-semibold text-xs">Perspektive springt</span>
                  </div>

                  <div className="text-center text-slate-400 font-bold text-base">↓</div>

                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between text-slate-600">
                    <span>65 Credits verbleibend</span>
                    <span className="text-red-600 font-semibold text-xs">Clips unzusammenhängend</span>
                  </div>

                  <div className="text-center text-slate-400 font-bold text-base">↓</div>

                  <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-800 font-semibold text-xs leading-relaxed">
                    ❌ Guthaben aufgebraucht. Noch kein fertiges Video. Bitte neues Token-Paket kaufen.
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 text-xs text-slate-500">
                Ständige Ungewissheit über die tatsächlichen Gesamtkosten.
              </div>
            </div>

            {/* Box 2: IchGeheViral */}
            <div className="rounded-2xl p-6 sm:p-8 bg-[#0C0A1A] text-white border-2 border-violet-500 shadow-2xl relative overflow-hidden flex flex-col justify-between">
              <div className="absolute top-0 right-0 w-40 h-40 bg-violet-600/20 rounded-full blur-3xl pointer-events-none" />

              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/50 text-xs font-mono font-bold text-emerald-400 mb-4">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>ICHGEHEVIRAL</span>
                </div>

                <h3 className="text-xl font-bold text-white mb-6">
                  Ein klarer, transparenter Ablauf:
                </h3>

                <div className="space-y-3 font-sans text-xs sm:text-sm">
                  <div className="p-3.5 rounded-xl bg-white/[0.05] border border-white/10 flex items-center gap-3">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span className="text-slate-200">1 Idee oder Konzept eingeben</span>
                  </div>

                  <div className="p-3.5 rounded-xl bg-white/[0.05] border border-white/10 flex items-center gap-3">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span className="text-slate-200">System baut 8 zusammenhängende Phasen auf</span>
                  </div>

                  <div className="p-3.5 rounded-xl bg-white/[0.05] border border-white/10 flex items-center gap-3">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span className="text-slate-200">Fertiges 60+ Sekunden 9:16 Reel erhalten</span>
                  </div>

                  <div className="p-3.5 rounded-xl bg-violet-950/60 border border-violet-500/40 text-violet-200 font-semibold text-xs leading-relaxed">
                    ✨ Kein Credit-Zähler. Keine Token-Fallen. Volle Kostentransparenz von Anfang an.
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-white/10">
                <button
                  onClick={onScrollToGenerator}
                  className="btn-electric w-full flex items-center justify-center gap-2 rounded-xl px-6 py-4 text-sm font-bold text-white shadow-xl"
                >
                  <span>Video erstellen</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
