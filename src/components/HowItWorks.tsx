"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle2, DownloadCloud, Gauge, Sparkles } from "lucide-react";
import { PRESET_CONCEPTS } from "../lib/constants";

const STEPS = [
  {
    num: "01",
    icon: CheckCircle2,
    title: "Pool-Stil auswählen",
    desc: "Du wählst zwischen den aktuell freigegebenen Pool-Transformationen. Keine Prompt-Eingabe nötig.",
  },
  {
    num: "02",
    icon: Sparkles,
    title: "IchGeheViral baut dein Reel",
    desc: "Das System erstellt acht aufeinander aufbauende Bauzustände und verbindet sie zu einem fertigen Poolbau-Reel.",
  },
  {
    num: "03",
    icon: DownloadCloud,
    title: "Herunterladen & posten",
    desc: "Du erhältst ein fertiges vertikales 9:16-Reel — bereit für TikTok, Instagram Reels oder YouTube Shorts.",
  },
];

export function HowItWorks() {
  return (
    <section id="so-funktionierts" className="bg-[#f7f7fb] py-20 lg:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <span className="text-xs font-black uppercase tracking-[0.18em] text-[#5947e8]">
            Radikal einfach
          </span>
          <h2 className="mt-3 text-4xl font-black tracking-[-0.05em] text-[#101114] sm:text-6xl">
            In 3 Schritten zum fertigen Pool-Reel.
          </h2>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {STEPS.map(({ num, icon: Icon, title, desc }) => (
            <div key={num} className="rounded-[22px] border border-[#e6e4ef] bg-white p-7">
              <div className="flex items-center justify-between">
                <span className="text-3xl font-black text-[#e8e5f0]">{num}</span>
                <Icon className="h-6 w-6 text-[#6d5dfc]" />
              </div>
              <h3 className="mt-6 text-xl font-black text-[#101114]">{title}</h3>
              <p className="mt-3 text-sm leading-6 text-[#686c73]">{desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 rounded-[22px] border border-[#e6e4ef] bg-white p-6 sm:p-8">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <b className="text-sm font-black uppercase tracking-wider text-[#101114]">
                Aktuell freigegebene Pool-Stile
              </b>
              <p className="mt-2 text-sm leading-6 text-[#686c73]">
                Wir schalten nur Varianten frei, die zur aktuell validierten Poolbau-Pipeline passen.
              </p>
            </div>
            <span className="text-xs font-bold text-[#a1a5ab]">Weitere Kategorien folgen erst nach Validierung.</span>
          </div>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {PRESET_CONCEPTS.map((preset) => (
              <div key={preset.id} className="rounded-2xl border border-[#efedf3] bg-[#faf9fc] p-5">
                <div className="text-sm font-black text-[#101114]">{preset.label}</div>
                <p className="mt-2 text-sm leading-6 text-[#686c73]">{preset.description}</p>
              </div>
            ))}
          </div>
          <div className="mt-6 flex flex-wrap gap-4">
            <Link
              href="/kundenbereich/neu"
              className="inline-flex items-center gap-2 text-sm font-black text-[#6d5dfc] hover:text-[#5947e8]"
            >
              Pool-Stil auswählen <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/kundenbereich/produktion"
              className="inline-flex items-center gap-2 text-sm font-black text-[#555a62] hover:text-[#101114]"
            >
              <Gauge className="h-4 w-4 text-[#6d5dfc]" /> Produktionsansicht ansehen
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
