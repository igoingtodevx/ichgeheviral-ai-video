"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Play } from "lucide-react";
import { SHOWCASE_VIDEOS } from "../lib/constants";

const FACTS: [string, string][] = [
  ["60+ Sek.", "fertiges Reel"],
  ["9:16", "Shortform-nativ"],
  ["8", "Transformationsphasen"],
  ["0", "Credits zu zählen"],
];

export function Hero({ onOpenVideo }: { onOpenVideo: () => void }) {
  const demo = SHOWCASE_VIDEOS[0];

  return (
    <section className="radial-glow overflow-hidden pt-14 sm:pt-20">
      <div className="mx-auto max-w-6xl px-4 text-center sm:px-6 lg:px-8">
        <span className="inline-flex rounded-full border border-[#dfdaff] bg-[#f7f5ff] px-3 py-2 text-[11px] font-black uppercase tracking-[0.14em] text-[#5947e8]">
          Für Aufmerksamkeit, Fortschritt &amp; Payoff gebaut
        </span>

        <h1 className="mx-auto mt-6 max-w-5xl text-5xl font-black leading-[0.98] tracking-[-0.065em] text-[#101114] sm:text-7xl lg:text-[80px]">
          Pool-Transformationen, gebaut für{" "}
          <span className="accent-serif text-[#6d5dfc]">maximales Viralpotenzial</span>.
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-[#686c73] sm:text-lg">
          Vom Ausgangszustand bis zur fertigen Pooloase: IchGeheViral erstellt ein zusammenhängendes
          60+ Sekunden Reel mit acht sichtbaren Bauphasen und starkem Final-Reveal. Kein Videoschnitt,
          kein Zusammensetzen einzelner KI-Clips.
        </p>

        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            href="/kundenbereich/neu"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-[#6d5dfc] px-7 py-4 text-sm font-black text-white shadow-[0_14px_38px_rgba(109,93,252,.24)] transition hover:bg-[#5947e8]"
          >
            Pool-Reel auswählen <ArrowRight className="h-4 w-4" />
          </Link>
          <button
            onClick={onOpenVideo}
            className="inline-flex items-center justify-center gap-2 rounded-full border border-[#d9d5d0] bg-white px-7 py-4 text-sm font-black text-[#101114] transition hover:border-[#b9b0ff]"
          >
            <Play className="h-4 w-4 fill-[#6d5dfc] text-[#6d5dfc]" /> Echtes Ergebnis ansehen
          </button>
        </div>

        <div className="relative mx-auto mt-12 max-w-4xl overflow-hidden rounded-[24px] border border-[#e8e5f0] bg-[#111] shadow-[0_32px_82px_rgba(89,49,20,.18)]">
          <button
            onClick={onOpenVideo}
            className="group relative block aspect-[16/8.7] w-full overflow-hidden"
          >
            <img
              src={demo.posterSrc}
              alt="Beispiel eines fertigen IchGeheViral Reels"
              className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.02]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
            <span className="absolute inset-0 m-auto grid h-20 w-20 place-items-center rounded-full bg-[#6d5dfc] text-white shadow-[0_10px_35px_rgba(109,93,252,.32)]">
              <Play className="h-7 w-7 fill-current" />
            </span>
            <span className="absolute bottom-6 left-6 text-left text-white">
              <b className="block text-lg">Echtes Ergebnis, kein Mockup</b>
              <small className="text-white/75">
                {demo.duration} · 9:16 · {demo.stateCount} Phasen
              </small>
            </span>
          </button>
        </div>

        <div className="mt-10 grid border-y border-[#e6e4ef] py-6 sm:grid-cols-4">
          {FACTS.map(([value, label]) => (
            <div key={label} className="border-[#e6e4ef] py-4 sm:border-r sm:py-0 sm:last:border-r-0">
              <b className="block text-3xl font-black">{value}</b>
              <span className="mt-1 block text-[11px] font-bold uppercase tracking-wider text-[#777b82]">
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
