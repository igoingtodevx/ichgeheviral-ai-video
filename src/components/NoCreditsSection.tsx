"use client";

import React from "react";
import { CheckCircle2, XCircle } from "lucide-react";

const TYPICAL = [
  "Wie viele Credits habe ich noch übrig?",
  "Was kostet mich der nächste Versuch?",
  "Kurze Einzelclips ohne echten Spannungsbogen",
  "Manuelles Zusammensetzen in einer Schnitt-App",
];

const IGV = [
  "Du beschreibst das gewünschte Ergebnis",
  "Du bekommst ein fertiges Video",
  "Ein zusammenhängendes 60+ Sekunden Reel",
  "Kein Zusammenschneiden einzelner Clips",
];

export function NoCreditsSection() {
  return (
    <section id="keine-credits" className="bg-white py-20 lg:py-28">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <span className="text-xs font-black uppercase tracking-[0.18em] text-[#e97800]">
            Kein Credit-Zählen
          </span>
          <h2 className="mt-3 text-4xl font-black tracking-[-0.05em] text-[#101114] sm:text-6xl">
            Du kaufst ein Ergebnis. Keine Guthaben-Rechnerei.
          </h2>
          <p className="mt-5 text-base leading-7 text-[#686c73] sm:text-lg">
            Viele KI-Tools zwingen dich, in Credits, Tokens und Fehlversuchen zu denken.
            Bei IchGeheViral bestellst du ein klar definiertes, fertiges Reel.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          <div className="rounded-[22px] border border-[#e7e3df] bg-[#faf9f7] p-7 sm:p-8">
            <span className="text-xs font-black uppercase tracking-widest text-[#a1a5ab]">
              Typisches KI-Tool
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

          <div className="rounded-[22px] border-2 border-[#ffb45f] bg-[#fff8ef] p-7 sm:p-8">
            <span className="text-xs font-black uppercase tracking-widest text-[#e97800]">
              IchGeheViral
            </span>
            <ul className="mt-5 space-y-4">
              {IGV.map((item) => (
                <li key={item} className="flex gap-3 text-sm font-semibold leading-6 text-[#101114]">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#ff8600]" />
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
