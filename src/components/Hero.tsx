"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const PHONE_STAGES = [
  {
    step: "01",
    label: "Fundament",
    src: "/media/house/house-01.jpg",
    alt: "Bodenplatte als Ausgangspunkt für ein KI-Building-Video",
  },
  {
    step: "02",
    label: "Rohbau",
    src: "/media/house/house-02.jpg",
    alt: "Erdgeschoss im Rohbau als nächster Schritt",
  },
  {
    step: "03",
    label: "Dachstuhl",
    src: "/media/house/house-03.jpg",
    alt: "Dachstuhl und sichtbarer Fortschritt beim Hausbau",
  },
  {
    step: "04",
    label: "Fertiges Haus",
    src: "/media/house/house-04.jpg",
    alt: "Fertiges Haus als Abschluss des KI-Building-Videos",
  },
];

const FACTS: [string, string][] = [
  ["60+ Sek.", "Monetarisierbar"],
  ["9:16", "Perfekt für Shortform"],
  ["100 Mio Views+", "Gesammelte Views mit dieser Nische"],
  ["1 Nische", "Maximales Viral-Potenzial"],
];

export function Hero() {
  return (
    <section className="overflow-hidden bg-white pt-14 sm:pt-20">
      <div className="mx-auto max-w-6xl px-4 text-center sm:px-6 lg:px-8">
        <h1 className="mx-auto max-w-5xl text-4xl font-black leading-[0.98] tracking-[-0.065em] text-[#101114] sm:text-7xl lg:text-[80px]">
          Dein Virales Video ist nur ein Klick entfernt
        </h1>

        <p className="mx-auto mt-6 max-w-3xl text-base leading-7 text-[#686c73] sm:text-lg">
          IchGeheViral erstellt vollautomatisch KI-Building-Videos mit maximalem Viral-Potenzial.
          Durch unsere jahrelange Erfahrung im Bereich TikTok wissen wir genau, worauf es bei
          erfolgreichen Kurzvideos ankommt. Von der ersten Idee über den Aufbau und die Storyline
          bis hin zur finalen Erstellung wird der gesamte Prozess automatisiert. Du musst dich um
          nichts kümmern – auf Generieren klicken, herunterladen und veröffentlichen.
        </p>

        <div className="mt-8 flex justify-center">
          <Link
            href="/kundenbereich/neu"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#6d5dfc] px-9 py-5 text-base font-black text-white shadow-[0_14px_38px_rgba(109,93,252,.24)] transition hover:bg-[#5947e8]"
          >
            Jetzt generieren <ArrowRight className="h-5 w-5" />
          </Link>
        </div>

        <div className="relative mx-auto mt-12 max-w-5xl rounded-[28px] border border-[#e8e5f0] bg-[#17151f] p-5 shadow-[0_32px_82px_rgba(89,49,20,.18)] sm:p-8">
          <div className="grid gap-5 sm:grid-cols-4">
            {PHONE_STAGES.map((stage, index) => (
              <div key={stage.step} className="relative">
                <div className="mx-auto w-[76%] rounded-[30px] border-[6px] border-[#080a0d] bg-[#080a0d] p-1 shadow-[0_18px_35px_rgba(0,0,0,.28)] sm:w-full">
                  <div className="relative aspect-[9/16] overflow-hidden rounded-[23px] bg-[#272431]">
                    <Image
                      src={stage.src}
                      alt={stage.alt}
                      fill
                      sizes="(min-width: 640px) 22vw, 70vw"
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/10" />
                    <div className="absolute inset-x-3 bottom-3 text-left text-white">
                      <span className="text-[10px] font-black uppercase tracking-[0.16em] text-[#c5beff]">
                        Schritt {stage.step}
                      </span>
                      <div className="mt-1 text-sm font-black">{stage.label}</div>
                    </div>
                  </div>
                </div>
                {index < PHONE_STAGES.length - 1 && (
                  <ArrowRight className="absolute -right-4 top-1/2 hidden h-7 w-7 -translate-y-1/2 text-[#9b8fff] sm:block" aria-hidden="true" />
                )}
              </div>
            ))}
          </div>
          <p className="mt-6 text-xs font-bold uppercase tracking-[0.14em] text-white/45">
            Vom ersten Bild bis zum fertigen KI-Building-Video
          </p>
        </div>

        <div className="mt-10 grid border-y border-[#e6e4ef] py-6 sm:grid-cols-4">
          {FACTS.map(([value, label]) => (
            <div key={label} className="border-[#e6e4ef] px-3 py-4 sm:border-r sm:py-0 sm:last:border-r-0">
              <b className="block text-2xl font-black sm:text-3xl">{value}</b>
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
