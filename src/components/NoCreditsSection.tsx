"use client";

import React from "react";
import { CheckCircle2, XCircle } from "lucide-react";

const TYPICAL = [
  "Einzelne KI-Clips separat erstellen",
  "Clips manuell zusammensuchen",
  "Aufwendiges Zusammenschneiden",
  "Zeit für Schnitt und Bearbeitung verlieren",
];

const IGV = [
  "Generieren klicken und Erstellung starten",
  "Die KI erstellt dein komplettes Video mit MAXIMALEM Viral Potenzial",
  "Zusammenhängendes 60+ Sekunden Video",
  "Kein Zusammenschneiden einzelner Clips",
  "Direkt für TikTok bereit",
];

export function NoCreditsSection() {
  return (
    <section id="einfacher-ablauf" className="scroll-mt-28 bg-white py-20 lg:py-28">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <span className="text-xs font-black uppercase tracking-[0.18em] text-[#5947e8]">
            Einfacher Ablauf
          </span>
          <h2 className="mt-3 text-3xl font-black tracking-[-0.05em] text-[#101114] sm:text-6xl">
            Ein Klick. Ein fertiges KI Video.
          </h2>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          <div className="rounded-[22px] border border-[#e6e4ef] bg-[#faf9fc] p-7 sm:p-8">
            <span className="text-xs font-black uppercase tracking-widest text-[#a1a5ab]">
              KLASSISCHER KI Video Generator
            </span>
            <ul className="mt-5 space-y-4">
              {TYPICAL.map((item) => (
                <li key={item} className="flex gap-3 text-sm leading-6 text-[#686c73]">
                  <XCircle className="mt-0.5 h-4 w-4 shrink-0 text-[#c7ab8f]" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-[22px] border-2 border-[#b9b0ff] bg-[#f7f5ff] p-7 sm:p-8">
            <span className="text-xs font-black uppercase tracking-widest text-[#5947e8]">
              ICHGEHEVIRAL
            </span>
            <ul className="mt-5 space-y-4">
              {IGV.map((item) => (
                <li key={item} className="flex gap-3 text-sm font-semibold leading-6 text-[#101114]">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#6d5dfc]" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
