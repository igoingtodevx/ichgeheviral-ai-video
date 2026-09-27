"use client";

import React from "react";
import { Eye, Layers, Sparkles, Smartphone } from "lucide-react";

const POINTS = [
  { icon: Eye, title: "Der erste Moment zählt", desc: "Ein starkes Vorher erzeugt sofort Neugier: Menschen wollen sehen, wie aus dem Ausgangszustand ein fertiges Ergebnis wird." },
  { icon: Layers, title: "Fortschritt statt einzelne Clips", desc: "Die Geschichte entsteht durch eine nachvollziehbare Entwicklung mit klaren Zwischenstufen." },
  { icon: Sparkles, title: "Der Reveal-Moment", desc: "Das Finale liefert den visuellen Payoff, auf den Zuschauer während des Videos warten." },
  { icon: Smartphone, title: "Bereit für Short Form", desc: "Vertikale Reels für TikTok, Instagram und YouTube Shorts — ohne manuellen Videoschnitt." },
];

export function WhyViral() {
  return (
    <section className="bg-[#f7f7fb] py-20 lg:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <span className="text-xs font-black uppercase tracking-[0.18em] text-[#5947e8]">Warum Transformationen funktionieren</span>
          <h2 className="mt-3 text-4xl font-black tracking-[-0.05em] text-[#101114] sm:text-6xl">
            Menschen bleiben nicht für KI. Sie bleiben für die Verwandlung.
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-7 text-[#686c73] sm:text-lg">
            Vorher-Nachher-Content erzeugt Spannung: Der Zuschauer will sehen, wie aus einem Ausgangszustand ein fertiges Ergebnis entsteht.
          </p>
        </div>
        <div className="mt-12 grid gap-4 md:grid-cols-4">
          {POINTS.map(({ icon: Icon, title, desc }) => (
            <article key={title} className="rounded-[22px] border border-[#e6e4ef] bg-white p-6">
              <Icon className="h-7 w-7 text-[#6d5dfc]" />
              <h3 className="mt-6 text-xl font-black">{title}</h3>
              <p className="mt-3 text-sm leading-6 text-[#686c73]">{desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
