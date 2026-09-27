"use client";

import React, { useState } from "react";
import { Play } from "lucide-react";
import { GOLDEN_V1_STATES, SHOWCASE_VIDEOS } from "../lib/constants";

export function TransformationShowcase({ onOpenVideo }: { onOpenVideo: (videoSrc: string) => void }) {
  const [activeState, setActiveState] = useState(0);
  const current = GOLDEN_V1_STATES[activeState];

  return (
    <section id="ergebnisse" className="bg-white py-20 lg:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <span className="text-xs font-black uppercase tracking-[0.18em] text-[#5947e8]">
            Echtes Produkt, keine Grafik
          </span>
          <h2 className="mt-3 text-4xl font-black tracking-[-0.05em] text-[#101114] sm:text-6xl">
            Eine Idee. Ein zusammenhängendes Reel.
          </h2>
          <p className="mt-5 text-base leading-7 text-[#686c73] sm:text-lg">
            Kein Zusammenschneiden einzelner KI-Clips. Das System baut mehrere aufeinander
            abgestimmte Phasen auf einer stabilen Kameraperspektive auf — bis zum finalen Reveal.
          </p>
        </div>

        {/* Phase scrubber using the real generated states */}
        <div className="mt-14 grid gap-8 lg:grid-cols-[1.1fr_.9fr]">
          <div className="overflow-hidden rounded-[24px] border border-[#e8e5f0] bg-[#111] shadow-[0_24px_70px_rgba(89,49,20,.14)]">
            <div className="aspect-[4/5] w-full">
              <img
                src={current.imageSrc}
                alt={current.title}
                className="h-full w-full object-cover"
              />
            </div>
          </div>

          <div className="flex flex-col justify-center">
            <span className="text-xs font-black uppercase tracking-widest text-[#5947e8]">
              {current.stageName}
            </span>
            <h3 className="mt-3 text-2xl font-black text-[#101114] sm:text-3xl">{current.title}</h3>
            <p className="mt-4 text-sm leading-6 text-[#686c73] sm:text-base">{current.description}</p>

            <div className="mt-8 flex flex-wrap gap-2">
              {GOLDEN_V1_STATES.map((state, i) => (
                <button
                  key={state.id}
                  onClick={() => setActiveState(i)}
                  aria-label={`Phase ${state.phaseNumber}: ${state.title}`}
                  className={`h-11 w-11 shrink-0 overflow-hidden rounded-xl border-2 transition ${
                    i === activeState ? "border-[#6d5dfc]" : "border-transparent opacity-60 hover:opacity-100"
                  }`}
                >
                  <img src={state.imageSrc} alt="" className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
            <p className="mt-4 text-xs font-bold uppercase tracking-wider text-[#a1a5ab]">
              Phase {current.phaseNumber} von {GOLDEN_V1_STATES.length} — zieh dich durch, um den Aufbau zu sehen
            </p>
          </div>
        </div>

        {/* Two real finished reels */}
        <div className="mt-16 grid gap-6 sm:grid-cols-2">
          {SHOWCASE_VIDEOS.map((video) => (
            <button
              key={video.id}
              onClick={() => onOpenVideo(video.videoSrc)}
              className="group relative overflow-hidden rounded-[22px] border border-[#e6e4ef] bg-[#111] text-left shadow-[0_18px_50px_rgba(54,39,27,.08)]"
            >
              <div className="aspect-[4/5] overflow-hidden">
                <img
                  src={video.posterSrc}
                  alt={video.title}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
              <span className="absolute inset-0 m-auto grid h-16 w-16 place-items-center rounded-full bg-[#6d5dfc] text-white shadow-[0_10px_30px_rgba(109,93,252,.32)]">
                <Play className="h-6 w-6 fill-current" />
              </span>
              <div className="absolute bottom-5 left-5 right-5 text-white">
                <b className="block text-base">{video.title}</b>
                <span className="mt-1 block text-xs text-white/75">
                  {video.duration} · {video.tag}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
