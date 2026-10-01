"use client";

import Image from "next/image";
import React from "react";
import { BadgeCheck, Sparkles } from "lucide-react";

const FOUNDER_VIDEO_SRC = process.env.NEXT_PUBLIC_FOUNDER_VIDEO_SRC;
const FOUNDER_VIDEO_POSTER = "/media/founder/timo-founder-work.jpg";

const TRUST_POINTS = [
  "Über 8.000+ Zufriedene Kunden",
  "6+ Jahre TikTok Erfahrung",
  "12+ Jahre YouTube Erfahrung",
  "Spezialisiert auf Kurzform Videos",
];

const SOCIAL_HANDLES = ["YoTimoLifestyle", "YoTimoKing", "YoTimo1", "TimoEnricha"];

export function FounderSection() {
  return (
    <section id="timo" className="scroll-mt-28 border-y border-[#e6e4ef] bg-white py-20 lg:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-[.85fr_1.15fr] lg:gap-16">
          <div>
            <span className="text-xs font-black uppercase tracking-[0.18em] text-[#5947e8]">
              In besten Händen bei Timo
            </span>
            <h2 className="mt-3 text-4xl font-black tracking-[-0.05em] text-[#101114] sm:text-5xl">
              Warum dieses Format?
            </h2>

            <ul className="mt-7 space-y-4 text-base font-bold leading-7 text-[#34383f]">
              {TRUST_POINTS.map((point) => (
                <li key={point} className="flex items-start gap-3">
                  <Sparkles className="mt-1 h-5 w-5 shrink-0 text-[#6d5dfc]" aria-hidden="true" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>

            <div className="mt-7 rounded-2xl border border-[#e6e4ef] bg-[#faf9fc] p-5">
              <div className="text-xs font-black uppercase tracking-[0.14em] text-[#8a8e94]">
                Auch bekannt unter
              </div>
              <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                {SOCIAL_HANDLES.map((handle) => (
                  <li key={handle} className="flex items-center gap-2 text-sm font-black text-[#101114]">
                    <BadgeCheck className="h-5 w-5 shrink-0 fill-[#2389da] text-white" aria-label="TikTok verifiziert" />
                    {handle}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8 flex items-center gap-4 border-t border-[#e6e4ef] pt-6">
              <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full border border-[#e6e4ef]">
                <Image
                  src="/media/founder/timo-founder.jpg"
                  alt="Timo, Gründer von IchGeheViral"
                  fill
                  loading="eager"
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
                  alt="Timos persönliches Erklärvideo"
                  fill
                  loading="eager"
                  sizes="(min-width: 1024px) 55vw, 100vw"
                  className="object-cover opacity-75"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-black/10" />
                <div className="absolute inset-x-6 bottom-6 text-white sm:inset-x-8 sm:bottom-8">
                  <span className="inline-flex rounded-full border border-white/20 bg-black/30 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.16em] text-white/80">
                    Timos Perspektive
                  </span>
                  <div className="mt-3 text-2xl font-black tracking-[-0.03em] sm:text-3xl">
                    Vom Projekt zum fertigen Reel
                  </div>
                  <p className="mt-2 max-w-md text-sm leading-6 text-white/70">
                    Ein klarer Ablauf, vom ersten Bild bis zur finalen Szene.
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
