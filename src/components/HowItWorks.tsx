"use client";

import React from "react";
import { MessageSquarePlus, Sparkles, DownloadCloud, ArrowRight } from "lucide-react";

export function HowItWorks() {
  const steps = [
    {
      num: "01",
      icon: MessageSquarePlus,
      title: "Idee eingeben",
      desc: "Transformation in einem Satz beschreiben oder eine bewährte Vorlage auswählen.",
      tag: "1 Satz genügt",
    },
    {
      num: "02",
      icon: Sparkles,
      title: "IchGeheViral erstellt dein Video",
      desc: "Der Prozess läuft vollautomatisch. Das System baut 8 Phasen auf und rendert das fertige Reel.",
      tag: "Vollautomatisch",
    },
    {
      num: "03",
      icon: DownloadCloud,
      title: "Herunterladen & posten",
      desc: "Fertiges vertikales 9:16 Reel herunterladen und direkt auf TikTok, Reels oder Shorts posten.",
      tag: "Sofort sendefertig",
    },
  ];

  return (
    <section id="how-it-works" className="relative py-20 lg:py-28 overflow-hidden scroll-mt-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-mono font-bold tracking-widest text-violet-400 uppercase">
            RADIKAL EINFACH
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mt-2 mb-4">
            In 3 Schritten zum fertigen Reel.
          </h2>
          <p className="text-base sm:text-lg text-slate-300">
            Keine komplizierte Schnittsoftware. Kein stundenlanges Prompten.
          </p>
        </div>

        {/* 3 Steps Unboxed Flow */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 relative">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.num}
                className="relative glass-panel rounded-3xl p-7 lg:p-8 flex flex-col justify-between group hover:border-violet-500/50 transition-all duration-300 shadow-xl"
              >
                {/* Step Header */}
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-3xl font-mono font-black text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-indigo-300">
                      {step.num}
                    </span>
                    <div className="w-12 h-12 rounded-2xl bg-violet-600/15 border border-violet-500/30 flex items-center justify-center group-hover:scale-110 group-hover:bg-violet-600/25 transition-all">
                      <Icon className="w-6 h-6 text-violet-300" />
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-2">
                    {step.title}
                  </h3>

                  <p className="text-sm text-slate-300 leading-relaxed mb-6">
                    {step.desc}
                  </p>
                </div>

                {/* Step Sub-tag */}
                <div className="pt-4 border-t border-white/[0.08] flex items-center justify-between">
                  <span className="text-xs font-mono text-violet-300">
                    {step.tag}
                  </span>
                  <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-violet-400 group-hover:translate-x-1 transition-all" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
