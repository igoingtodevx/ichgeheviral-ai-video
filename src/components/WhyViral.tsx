"use client";

import React from "react";
import { Eye, Zap, Smartphone } from "lucide-react";

const POINTS = [
  {
    icon: Eye,
    title: "Scroll Stop",
    desc: "Ein klarer Ausgangspunkt und ein sofort erkennbares Vorher erzeugen Neugier in der ersten Sekunde.",
  },
  {
    icon: Zap,
    title: "Sichtbare Progression",
    desc: "Jede Szene verändert erkennbar etwas am Motiv — der Zuschauer bleibt dran, um zu sehen, was als Nächstes kommt.",
  },
  {
    icon: Zap,
    title: "Klares Finale",
    desc: "Der Aufbau führt bewusst auf einen sichtbaren Abschluss hin, statt einfach aufzuhören.",
  },
  {
    icon: Smartphone,
    title: "Short-Form-nativ",
    desc: "Vertikales 9:16-Format, sofort bereit für TikTok, Instagram Reels und YouTube Shorts.",
  },
];

export function WhyViral() {
  return (
    <section className="bg-white py-20 lg:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <span className="text-xs font-black uppercase tracking-[0.18em] text-[#5947e8]">
            Warum das Format funktioniert
          </span>
          <h2 className="mt-3 text-4xl font-black tracking-[-0.05em] text-[#101114] sm:text-6xl">
            Ein klarer Aufbau für längeres Zuschauen.
          </h2>
          <p className="mt-5 text-base leading-7 text-[#686c73] sm:text-lg">
            Viralität lässt sich nicht garantieren. Was sich gezielt gestalten lässt, ist die Struktur,
            die Aufmerksamkeit, Fortschritt und einen starken Abschluss erzeugt.
          </p>
        </div>

        <div className="mt-12 grid gap-px overflow-hidden rounded-[22px] border border-[#e6e4ef] bg-[#e6e4ef] md:grid-cols-4">
          {POINTS.map(({ icon: Icon, title, desc }) => (
            <article key={title} className="bg-white p-7">
              <Icon className="h-7 w-7 text-[#6d5dfc]" />
              <h3 className="mt-7 text-xl font-black text-[#101114]">{title}</h3>
              <p className="mt-3 text-sm leading-6 text-[#686c73]">{desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
