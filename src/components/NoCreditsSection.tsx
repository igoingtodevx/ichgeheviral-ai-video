"use client";

import React from "react";
import { CheckCircle2, XCircle } from "lucide-react";

const TYPICAL = [
  "Viele Einzelschritte bis zum fertigen Video",
  "Unklare Ergebnisse bei jedem neuen Versuch",
  "Kurze Clips ohne zusammenhängenden Spannungsbogen",
  "Manuelles Zusammensetzen in einer Schnitt-App",
];

const IGV = [
  "Du klickst auf Generate und startest die Erstellung",
  "Du bekommst ein fertiges Video",
  "Ein zusammenhängendes 60+ Sekunden Reel",
  "Kein Zusammenschneiden einzelner Clips",
];

export function NoCreditsSection() {
  return (
    <section id="keine-credits" className="bg-white py-20 lg:py-28">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <span className="text-xs font-black uppercase tracking-[0.18em] text-[#5947e8]">
            Klarer Ablauf
          </span>
          <h2 className="mt-3 text-3xl font-black tracking-[-0.05em] text-[#101114] sm:text-6xl">
            Ein Klick. Ein fertiges Reel.
          </h2>
          <p className="mt-5 text-base leading-7 text-[#686c73] sm:text-lg">
            Du bestellst ein klar definiertes, fertiges Reel — ohne dich durch technische Einzelschritte oder einzelne Clips arbeiten zu müssen.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          <div className="rounded-[22px] border border-[#e6e4ef] bg-[#faf9fc] p-7 sm:p-8">
            <span className="text-xs font-black uppercase tracking-widest text-[#a1a5ab]">
              Klassischer Video-Workflow
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
              IchGeheViral
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

        <p className="mt-6 text-center text-xs leading-5 text-[#a1a5ab]">
          Hinweis: Die Anzahl der enthaltenen Videos richtet sich nach dem gewählten Paket im
          Abschnitt Preise weiter unten. Das ist kein unlimitiertes Generieren, sondern ein klarer,
          planbarer Kauf.
        </p>
      </div>
    </section>
  );
}
