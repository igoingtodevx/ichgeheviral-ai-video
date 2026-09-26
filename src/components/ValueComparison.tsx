"use client";

import React from "react";
import { Check, X, Sparkles, XCircle, CheckCircle2 } from "lucide-react";

export function ValueComparison() {
  const genericAiDrawbacks = [
    {
      title: "Kurze Einzelclips",
      desc: "Nur 4-Sekunden-Schnipsel ohne echten Spannungsbogen oder Storytelling.",
    },
    {
      title: "Wechselnde Perspektiven",
      desc: "Kamera, Gebäude und Umgebung springen unruhig von Schnitt zu Schnitt.",
    },
    {
      title: "Manuelles Zusammensetzen",
      desc: "Du musst die Clips trotzdem stundenlang in Schnittsoftware zusammenbauen.",
    },
    {
      title: "Frustrierendes Credit-System",
      desc: "Jeder Fehlversuch und jeder Prompt-Test zieht bezahltes Guthaben ab.",
    },
  ];

  const igvBenefits = [
    {
      title: "Zusammenhängende Transformation",
      desc: "8 logisch aufeinander aufbauende Phasen fesseln den Zuschauer bis zum Ende.",
    },
    {
      title: "Visuell stabile Entwicklung",
      desc: "Konsistente Kameraperspektive: Umgebung und Details bleiben fest verankert.",
    },
    {
      title: "Fertiges 60+ Sekunden Reel",
      desc: "Sendefertiges 9:16 Vollformat inklusive synchronisierter Umgebungsakustik.",
    },
    {
      title: "Keine Credits",
      desc: "Keine komplizierte Rechnerei. Video erstellen statt Token-Fallen fürchten.",
    },
  ];

  return (
    <section className="relative py-20 lg:py-28 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 bg-[#14102c] border border-violet-500/40 text-xs font-mono font-bold tracking-widest text-violet-300 uppercase mb-4">
            <Sparkles className="w-3.5 h-3.5 text-violet-400" />
            <span>DER UNTERSCHIED AUF EINEN BLICK</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mt-1 mb-4">
            Warum IchGeheViral statt generischer KI-Tools?
          </h2>
          <p className="text-base sm:text-lg text-slate-300">
            Fokus auf echten Nutzen: Ein fertiges Social-Media-Video statt unzusammenhängender Einzelschnipsel.
          </p>
        </div>

        {/* 2-Column Comparison Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto items-stretch">
          {/* Card 1: Generic AI Tools */}
          <div className="glass-panel rounded-3xl p-7 lg:p-9 border border-white/[0.08] flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.05] border border-white/10 text-xs font-mono font-bold text-slate-400 mb-6">
                <XCircle className="w-3.5 h-3.5 text-slate-500" />
                <span>GENERISCHE KI-TOOLS</span>
              </div>

              <h3 className="text-2xl font-bold text-white mb-6">
                Zufällige Schnipsel & Handarbeit
              </h3>

              <div className="space-y-5">
                {genericAiDrawbacks.map((item, i) => (
                  <div key={i} className="flex items-start gap-3.5">
                    <div className="w-6 h-6 rounded-full bg-white/[0.05] border border-white/10 flex items-center justify-center shrink-0 mt-0.5">
                      <X className="w-3.5 h-3.5 text-slate-500" />
                    </div>
                    <div>
                      <h4 className="text-sm sm:text-base font-semibold text-slate-200 mb-1">
                        {item.title}
                      </h4>
                      <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-white/[0.06] text-xs font-mono text-slate-500">
              Ergebnis: Hoher manueller Nachbearbeitungsaufwand.
            </div>
          </div>

          {/* Card 2: IchGeheViral */}
          <div className="relative rounded-3xl p-7 lg:p-9 border-2 border-violet-500/50 bg-gradient-to-b from-[#181232] via-[#0f0b1f] to-[#080612] shadow-2xl flex flex-col justify-between overflow-hidden group">
            {/* Ambient background glow */}
            <div className="absolute top-0 right-0 w-48 h-48 bg-violet-600/15 rounded-full blur-3xl pointer-events-none" />

            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/20 border border-violet-500/40 text-xs font-mono font-bold text-violet-300 mb-6">
                <CheckCircle2 className="w-3.5 h-3.5 text-violet-400" />
                <span>ICHGEHEVIRAL</span>
              </div>

              <h3 className="text-2xl font-bold text-white mb-6">
                Fertiges Reel mit Viralpotenzial
              </h3>

              <div className="space-y-5">
                {igvBenefits.map((item, i) => (
                  <div key={i} className="flex items-start gap-3.5">
                    <div className="w-6 h-6 rounded-full bg-violet-500/20 border border-violet-400/40 flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3.5 h-3.5 text-violet-300" />
                    </div>
                    <div>
                      <h4 className="text-sm sm:text-base font-semibold text-white mb-1">
                        {item.title}
                      </h4>
                      <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-white/[0.08] flex items-center justify-between text-xs font-mono text-emerald-400">
              <span className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5" />
                <span>100% automatisierte Pipeline</span>
              </span>
              <span className="text-slate-400">60+ Sekunden · 9:16</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
