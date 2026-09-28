"use client";

import Image from "next/image";
import React from "react";

const FOUNDER_VIDEO_SRC = process.env.NEXT_PUBLIC_FOUNDER_VIDEO_SRC;
const FOUNDER_VIDEO_POSTER = "/media/founder/timo-founder-work.jpg";

export function FounderSection() {
  return (
    <section id="timo" className="border-y border-[#e6e4ef] bg-white py-20 lg:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-[.85fr_1.15fr] lg:gap-16">
          <div>
            <span className="text-xs font-black uppercase tracking-[0.18em] text-[#5947e8]">
              Direkt von Timo
            </span>
            <h2 className="mt-3 text-4xl font-black tracking-[-0.05em] text-[#101114] sm:text-5xl">
              Warum dieses Format?
            </h2>
            <div className="mt-6 space-y-4 text-base leading-7 text-[#686c73]">
              <p>
                Timo erklärt dir persönlich, wie IchGeheViral aus einer Veränderung ein
                zusammenhängendes Transformations-Reel macht.
              </p>
              <p>
                Das Video wird direkt hier eingebunden, sobald die Aufnahme vorliegt. Der Platz ist
                bereits für das finale Hochformat-Video vorbereitet.
              </p>
            </div>

            <div className="mt-8 flex items-center gap-4 border-t border-[#e6e4ef] pt-6">
              <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full border border-[#e6e4ef]">
                <Image
                  src="/media/founder/timo-founder.jpg"
                  alt="Timo, Gründer von IchGeheViral"
                  fill
                  sizes="48px"
                  className="object-cover object-top"
                />
              </div>
              <div>
                <div className="text-sm font-black text-[#101114]">Timo</div>
                <div className="text-xs font-bold uppercase tracking-wider text-[#a1a5ab]">
                  Gründer von IchGeheViral
                </div>
              </div>
            </div>
          </div>

          <div
            data-testid="founder-video-slot"
            className="relative overflow-hidden rounded-[26px] border border-[#e6e4ef] bg-[#111] shadow-[0_24px_70px_rgba(59,42,25,.1)]"
          >
            {FOUNDER_VIDEO_SRC ? (
              <video
                src={FOUNDER_VIDEO_SRC}
                poster={FOUNDER_VIDEO_POSTER}
                controls
                playsInline
                preload="metadata"
                className="aspect-video w-full object-cover"
              />
            ) : (
              <div className="relative aspect-video w-full">
                <Image
                  src={FOUNDER_VIDEO_POSTER}
                  alt="Platzhalter für Timos persönliches IchGeheViral-Video"
                  fill
                  sizes="(min-width: 1024px) 55vw, 100vw"
                  className="object-cover opacity-75"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-black/10" />
                <div className="absolute inset-x-6 bottom-6 text-white sm:inset-x-8 sm:bottom-8">
                  <span className="inline-flex rounded-full border border-white/20 bg-black/30 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.16em] text-white/80">
                    Video-Platzhalter
                  </span>
                  <div className="mt-3 text-2xl font-black tracking-[-0.03em] sm:text-3xl">
                    Timos persönliche Erklärung
                  </div>
                  <p className="mt-2 max-w-md text-sm leading-6 text-white/70">
                    Die fertige Aufnahme wird hier ohne Layoutänderung eingebettet.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
