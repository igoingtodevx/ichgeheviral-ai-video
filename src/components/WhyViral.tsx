"use client";

import React from "react";
import { Eye, Sparkles, Smartphone, TrendingUp } from "lucide-react";

const POINTS = [
  {
    icon: Eye,
    title: "Scroll Stop",
    desc: "Ein ungewöhnlicher Ausgangspunkt sorgt direkt für Aufmerksamkeit und weckt Neugier auf das, was als Nächstes passiert.",
  },
  {
    icon: TrendingUp,
    title: "Sichtbarer Fortschritt",
    desc: "Das Gebäude entsteht Schritt für Schritt. Jede Szene zeigt eine erkennbare Veränderung und gibt dem Zuschauer einen Grund weiterzuschauen.",
  },
  {
    icon: Sparkles,
    title: "Neugier auf das Ergebnis",
    desc: "Der Aufbau führt gezielt auf das fertige Gebäude hin. Dadurch entsteht ein natürlicher Anreiz, bis zum Ende zu schauen.",
  },
  {
    icon: Smartphone,
    title: "Short-Form-ready",
    desc: "Im optimierten 9:16-Format – bereit für TikTok, Instagram Reels und YouTube Shorts.",
  },
];

export function WhyViral() {
  return (
    <section className="bg-white py-20 lg:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <span className="text-xs font-black uppercase tracking-[0.18em] text-[#5947e8]">
            Warum KI-Building-Videos funktionieren
          </span>
          <h2 className="mt-3 text-4xl font-black tracking-[-0.05em] text-[#101114] sm:text-6xl">
            Gebaut für maximale Aufmerksamkeit.
          </h2>
          <p className="mt-5 text-base leading-7 text-[#686c73] sm:text-lg">
            KI-Building-Videos verbinden einen klaren visuellen Aufbau mit sichtbarem Fortschritt und
            einem starken Finale. Genau diese Elemente machen das Format besonders interessant für
            TikTok und andere Short-Form-Plattformen.
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
