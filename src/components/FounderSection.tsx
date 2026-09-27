"use client";

import React from "react";

export function FounderSection() {
  return (
    <section className="border-y border-[#e6e4ef] bg-white py-20 lg:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_.85fr]">
          <div>
            <span className="text-xs font-black uppercase tracking-[0.18em] text-[#5947e8]">
              Warum IchGeheViral
            </span>
            <h2 className="mt-3 text-4xl font-black tracking-[-0.05em] text-[#101114] sm:text-5xl">
              Ein fertiges Reel statt zufälliger Einzelclips.
            </h2>
            <div className="mt-6 space-y-4 text-base leading-7 text-[#686c73]">
              <p>
                Aus einer einzigen Idee soll ein zusammenhängendes, veröffentlichungsfertiges
                Transformations-Reel entstehen — ohne dass du selbst schneidest oder einzelne Clips
                zusammensetzt. Poolbau ist aktuell die erste verfügbare Kategorie.
              </p>
              <p>
                Dafür baut das System mehrere aufeinander abgestimmte Phasen auf, hält die
                Kameraperspektive konsistent und führt das Video bewusst auf einen Final-Reveal hin.
              </p>
            </div>

            <div className="mt-8 flex items-center gap-4 border-t border-[#e6e4ef] pt-6">
              <div className="h-12 w-12 shrink-0 overflow-hidden rounded-full border border-[#e6e4ef]">
                <img
                  src="/media/founder/timo-founder.jpg"
                  alt="Timo, Gründer von IchGeheViral"
                  className="h-full w-full object-cover object-top"
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

          <div className="relative mx-auto w-full max-w-sm overflow-hidden rounded-[26px] border border-[#e6e4ef] shadow-[0_24px_70px_rgba(59,42,25,.1)]">
            <img
              src="/media/founder/timo-founder-work.jpg"
              alt="Timo bei der Arbeit an IchGeheViral"
              className="aspect-[4/5] w-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
