"use client";

import React from "react";
import { CheckCircle2, DownloadCloud } from "lucide-react";

const STEPS = [
  {
    num: "01",
    icon: CheckCircle2,
    title: "Generieren klicken",
    desc: "Du brauchst keine Konzept- oder Stilmaske. Ein Klick genügt – die weitere Ausgestaltung passiert im Hintergrund.",
  },
  {
    num: "02",
    icon: CheckCircle2,
    title: "Dein KI-Building-Video entsteht",
    desc: "Aus einer KI-Building-Idee wird ein zusammenhängendes Short-Form-Video mit sichtbarem Fortschritt und klarem Abschluss.",
  },
  {
    num: "03",
    icon: DownloadCloud,
    title: "Fertiges Video erhalten",
    desc: "Du bekommst ein vertikales KI-Building-Video, bereit für TikTok, Instagram Reels und YouTube Shorts.",
  },
];

export function HowItWorks() {
  return (
    <section id="so-funktionierts" className="scroll-mt-28 bg-[#f7f7fb] py-20 lg:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-4xl font-black tracking-[-0.05em] text-[#101114] sm:text-6xl">
            So funktioniert IchGeheViral
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
      </div>
    </section>
  );
}
