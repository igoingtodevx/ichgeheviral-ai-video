"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, DownloadCloud, MessageSquarePlus, Sparkles } from "lucide-react";
import { PRESET_CONCEPTS } from "../lib/constants";

const STEPS = [
  {
    num: "01",
    icon: MessageSquarePlus,
    title: "Beschreibe deine Idee",
    desc: "Ein Satz reicht: Ausgangszustand und gewünschtes Endergebnis. Vorlagen helfen beim Einstieg.",
  },
  {
    num: "02",
    icon: Sparkles,
    title: "IchGeheViral baut dein Reel",
    desc: "Das System erstellt automatisch mehrere aufeinander abgestimmte Phasen und setzt sie zu einem fertigen Video zusammen.",
  },
  {
    num: "03",
    icon: DownloadCloud,
    title: "Herunterladen & posten",
    desc: "Du erhältst ein fertiges vertikales 9:16-Reel — sofort bereit für TikTok, Reels oder Shorts.",
  },
];

export function HowItWorks() {
  return (
    <section id="so-funktionierts" className="bg-[#f7f7f5] py-20 lg:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <span className="text-xs font-black uppercase tracking-[0.18em] text-[#e97800]">
            Radikal einfach
          </span>
          <h2 className="mt-3 text-4xl font-black tracking-[-0.05em] text-[#101114] sm:text-6xl">
            In 3 Schritten zum fertigen Reel.
          </h2>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {STEPS.map(({ num, icon: Icon, title, desc }) => (
            <div key={num} className="rounded-[22px] border border-[#e7e3df] bg-white p-7">
              <div className="flex items-center justify-between">
                <span className="text-3xl font-black text-[#eadfd5]">{num}</span>
                <Icon className="h-6 w-6 text-[#ff8600]" />
              </div>
              <h3 className="mt-6 text-xl font-black text-[#101114]">{title}</h3>
              <p className="mt-3 text-sm leading-6 text-[#686c73]">{desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 rounded-[22px] border border-[#e7e3df] bg-white p-6 sm:p-8">
          <b className="text-sm font-black uppercase tracking-wider text-[#101114]">
            So sieht eine gute Eingabe aus
          </b>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {PRESET_CONCEPTS.map((preset) => (
              <div key={preset.id} className="rounded-xl border border-[#eee9e4] bg-[#faf9f7] p-4 text-sm leading-6 text-[#4f555d]">
                {preset.prompt}
              </div>
            ))}
          </div>
          <Link
            href="/kundenbereich"
            className="mt-6 inline-flex items-center gap-2 text-sm font-black text-[#ff8600] hover:text-[#e97800]"
          >
            Eigene Idee eingeben <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
