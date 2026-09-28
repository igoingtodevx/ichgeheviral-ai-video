"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle2, DownloadCloud, Gauge } from "lucide-react";

const STEPS = [
  {
    num: "01",
    icon: CheckCircle2,
    title: "Generate klicken",
    desc: "Du brauchst keine Konzept- oder Stilmaske. Ein Klick genügt — die interne Variation bleibt im System.",
  },
  {
    num: "02",
    icon: CheckCircle2,
    title: "Dein Reel entsteht",
    desc: "Aus der Poolbau-Transformation wird ein zusammenhängendes Short-Form-Video mit Fortschritt und Reveal-Moment.",
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
          <p className="mt-2 max-w-3xl text-sm leading-6 text-[#686c73]">
            Poolbau ist die erste verfügbare Transformations-Kategorie. Die Auswahl der konkreten
            Variante und die kontrollierte interne Variation bleiben bewusst im Hintergrund.
          </p>
          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            {[
              ["Poolbau", "Eine klar abgegrenzte erste Nische"],
              ["8 Phasen", "Sichtbarer Fortschritt bis zum Reveal"],
              ["60+ Sek.", "Ein fertiges vertikales Reel"],
            ].map(([label, description]) => (
              <div key={label} className="rounded-2xl border border-[#efedf3] bg-[#faf9fc] p-5">
                <div className="text-sm font-black text-[#101114]">{label}</div>
                <p className="mt-2 text-sm leading-6 text-[#686c73]">{description}</p>
              </div>
            ))}
          </div>
          <div className="mt-6 flex flex-wrap gap-4">
            <Link
              href="/kundenbereich/neu"
              className="inline-flex items-center gap-2 text-sm font-black text-[#6d5dfc] hover:text-[#5947e8]"
            >
              Studio starten <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/kundenbereich/reel/modern-rechteckig"
              className="inline-flex items-center gap-2 text-sm font-black text-[#555a62] hover:text-[#101114]"
            >
              <Gauge className="h-4 w-4 text-[#6d5dfc]" /> Beispiel-Reel ansehen
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
