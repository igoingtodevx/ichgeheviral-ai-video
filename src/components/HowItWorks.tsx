"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle2, DownloadCloud, Gauge } from "lucide-react";
import { PRESET_CONCEPTS } from "../lib/constants";

const STEPS = [
  {
    num: "01",
    icon: CheckCircle2,
    title: "Transformation auswählen",
    desc: "Du wählst den passenden Stil für dein Reel. Die Struktur und Umsetzung übernehmen wir.",
  },
  {
    num: "02",
    icon: CheckCircle2,
    title: "Dein Reel entsteht",
    desc: "Aus der Transformation wird ein zusammenhängendes Short-Form-Video mit Fortschritt und Reveal-Moment.",
  },
  {
    num: "03",
    icon: DownloadCloud,
    title: "Fertiges Reel erhalten",
    desc: "Du bekommst ein vertikales Video, bereit für TikTok, Instagram Reels und YouTube Shorts.",
  },
];

export function HowItWorks() {
  return (
    <section id="so-funktionierts" className="bg-[#f7f7fb] py-20 lg:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-4xl font-black tracking-[-0.05em] text-[#101114] sm:text-6xl">
            Von der Transformation zum fertigen Reel.
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
          <b className="text-sm font-black uppercase tracking-wider text-[#101114]">Aktuelle Kategorie</b>
          <p className="mt-2 text-sm leading-6 text-[#686c73]">
            Poolbau ist die erste freigeschaltete Transformations-Kategorie. Weitere Kategorien folgen nach Validierung.
          </p>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {PRESET_CONCEPTS.map((preset) => (
              <div key={preset.id} className="rounded-2xl border border-[#efedf3] bg-[#faf9fc] p-5">
                <div className="text-sm font-black text-[#101114]">{preset.label}</div>
                <p className="mt-2 text-sm leading-6 text-[#686c73]">{preset.description}</p>
              </div>
            ))}
          </div>
          <div className="mt-6 flex flex-wrap gap-4">
            <Link href="/kundenbereich/neu" className="inline-flex items-center gap-2 text-sm font-black text-[#6d5dfc] hover:text-[#5947e8]">
              Transformation starten <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/kundenbereich/produktion" className="inline-flex items-center gap-2 text-sm font-black text-[#555a62] hover:text-[#101114]">
              <Gauge className="h-4 w-4 text-[#6d5dfc]" /> Beispiel ansehen
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
