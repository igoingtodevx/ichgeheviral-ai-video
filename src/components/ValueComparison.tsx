"use client";

import React from "react";
import { Check, X } from "lucide-react";

export function ValueComparison() {
  const rows = [
    {
      feature: "Produktionsaufwand",
      igv: "1 Idee eingeben – der Rest läuft automatisiert",
      manual: "Stundenlanges Keyframing, Masking & Schneiden",
      genericAi: "Dutzende Prompts für unzusammenhängende Clips",
    },
    {
      feature: "Kameraperspektive & Architektur",
      igv: "Konsistente Kameraperspektive über alle Bauphasen",
      manual: "Aufwendiges 3D-Tracking nötig",
      genericAi: "Springende Winkel, wechselnde Hausformen",
    },
    {
      feature: "Zusammenhängende Storyline",
      igv: "60+ Sekunden zusammenhängendes Narrativ",
      manual: "Manuell zusammengebaut",
      genericAi: "Nur 4-Sekunden-Schnipsel ohne Kontext",
    },
    {
      feature: "Bauliche Logik (Phasen)",
      igv: "Reale Abfolge (Aushub → Bewehrung → Finish)",
      manual: "Abhängig von vorhandenem Real-Material",
      genericAi: "Zufällige Transformationen ohne Bau-Sinn",
    },
    {
      feature: "Ausgabeformat",
      igv: "Natives 9:16 MP4 mit synchronisiertem Sound",
      manual: "Export über separate Schnitt-Software",
      genericAi: "Oft 16:9 quer, ohne passende Akustik",
    },
  ];

  return (
    <section className="relative py-20 lg:py-28 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-mono font-bold tracking-widest text-violet-400 uppercase">
            DER SYSTEMISCHE UNTERSCHIED
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mt-2 mb-4">
            Warum IchGeheViral statt mühsamer Handarbeit?
          </h2>
          <p className="text-base sm:text-lg text-slate-300">
            Fokus auf echten Produktnutzen statt unrealistischer Werbeversprechen.
          </p>
        </div>

        {/* Comparison Table */}
        <div className="glass-panel rounded-3xl overflow-hidden border border-white/[0.08] shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[640px]">
              <thead>
                <tr className="border-b border-white/10 bg-white/[0.02]">
                  <th className="py-5 px-6 text-xs font-mono uppercase tracking-wider text-slate-400 w-1/4">
                    Kriterium
                  </th>
                  <th className="py-5 px-6 text-sm font-bold text-white bg-violet-950/40 border-l border-r border-violet-500/30 w-1/3">
                    <div className="flex items-center gap-2">
                      <span className="text-violet-400 font-extrabold">IchGeheViral</span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-violet-500/20 text-violet-300">
                        AUTOMATISIERT
                      </span>
                    </div>
                  </th>
                  <th className="py-5 px-6 text-xs font-mono uppercase tracking-wider text-slate-400 w-1/4">
                    Klassischer Schnitt
                  </th>
                  <th className="py-5 px-6 text-xs font-mono uppercase tracking-wider text-slate-400 w-1/4">
                    Generische KI-Tools
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.06] text-sm">
                {rows.map((row, idx) => (
                  <tr key={idx} className="hover:bg-white/[0.015] transition-colors">
                    <td className="py-4 px-6 font-semibold text-slate-200">
                      {row.feature}
                    </td>

                    {/* IchGeheViral Pillar */}
                    <td className="py-4 px-6 bg-violet-950/20 border-l border-r border-violet-500/30 text-white font-medium">
                      <div className="flex items-start gap-2.5">
                        <div className="w-5 h-5 rounded-full bg-violet-500/20 border border-violet-400/40 flex items-center justify-center shrink-0 mt-0.5">
                          <Check className="w-3.5 h-3.5 text-violet-300" />
                        </div>
                        <span>{row.igv}</span>
                      </div>
                    </td>

                    {/* Manual editing */}
                    <td className="py-4 px-6 text-slate-400">
                      <div className="flex items-start gap-2.5">
                        <div className="w-5 h-5 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shrink-0 mt-0.5">
                          <X className="w-3.5 h-3.5 text-slate-500" />
                        </div>
                        <span>{row.manual}</span>
                      </div>
                    </td>

                    {/* Generic AI tools */}
                    <td className="py-4 px-6 text-slate-400">
                      <div className="flex items-start gap-2.5">
                        <div className="w-5 h-5 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shrink-0 mt-0.5">
                          <X className="w-3.5 h-3.5 text-slate-500" />
                        </div>
                        <span>{row.genericAi}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
