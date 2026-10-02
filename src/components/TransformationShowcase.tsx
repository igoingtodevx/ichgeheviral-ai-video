"use client";

import React, { useState } from "react";

const BUILDING_STAGES = [
  {
    phaseNumber: 1,
    stageName: "Szene 1 · Fundament",
    title: "Die Bodenplatte liegt",
    description: "Ein klarer Ausgangspunkt eröffnet die Geschichte und macht neugierig auf das fertige Gebäude.",
    imageSrc: "/media/house/house-01.jpg",
  },
  {
    phaseNumber: 2,
    stageName: "Szene 2 · Rohbau",
    title: "Die Mauern wachsen",
    description: "Die ersten sichtbaren Veränderungen geben dem Zuschauer einen Grund, weiterzuschauen.",
    imageSrc: "/media/house/house-02.jpg",
  },
  {
    phaseNumber: 3,
    stageName: "Szene 3 · Dachstuhl",
    title: "Die Form wird sichtbar",
    description: "Das Gebäude nimmt Gestalt an und die Spannung auf das Ergebnis steigt.",
    imageSrc: "/media/house/house-03.jpg",
  },
  {
    phaseNumber: 4,
    stageName: "Szene 4 · Fertiges Ergebnis",
    title: "Das fertige KI-Building",
    description: "Ein klares Finale belohnt die Aufmerksamkeit und macht das Ergebnis sofort verständlich.",
    imageSrc: "/media/house/house-04.jpg",
  },
];

export function TransformationShowcase() {
  const [activeState, setActiveState] = useState(0);
  const current = BUILDING_STAGES[activeState];

  return (
    <section id="ergebnisse" className="scroll-mt-28 bg-white py-20 lg:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <span className="text-xs font-black uppercase tracking-[0.18em] text-[#5947e8]">
            KI-Building Nische erklärt
          </span>
          <h2 className="mt-3 text-3xl font-black tracking-[-0.05em] text-[#101114] sm:text-6xl">
            KI-Building Nische ist der virale Hit!
          </h2>
          <p className="mt-5 text-base leading-7 text-[#686c73] sm:text-lg">
            Kein Zusammenschneiden einzelner Clips. Ein einziger Knopfdruck – und dein komplettes
            KI-Building-Video ist fertig. KI-Building-Videos eignen sich besonders für TikTok, da sie
            durch visuell spannende Bauprozesse, kontinuierliche Veränderungen und einen starken
            „Was passiert am Ende?“-Effekt die Zuschauer zum Dranbleiben animieren können.
          </p>
        </div>

        <div className="mt-14 grid gap-8 lg:grid-cols-[1.1fr_.9fr]">
          <div className="overflow-hidden rounded-[24px] border border-[#e8e5f0] bg-[#111] shadow-[0_24px_70px_rgba(89,49,20,.14)]">
            <div className="aspect-[4/5] w-full">
              <img src={current.imageSrc} alt={current.title} className="h-full w-full object-cover" />
            </div>
          </div>

          <div className="flex flex-col justify-center">
            <span className="text-xs font-black uppercase tracking-widest text-[#5947e8]">
              {current.stageName}
            </span>
            <h3 className="mt-3 text-2xl font-black text-[#101114] sm:text-3xl">{current.title}</h3>
            <p className="mt-4 text-sm leading-6 text-[#686c73] sm:text-base">{current.description}</p>

            <div className="mt-8 flex flex-wrap gap-2">
              {BUILDING_STAGES.map((state, i) => (
                <button
                  key={state.phaseNumber}
                  onClick={() => setActiveState(i)}
                  aria-label={`Szene ${state.phaseNumber}: ${state.title}`}
                  className={`h-11 w-11 shrink-0 overflow-hidden rounded-xl border-2 transition ${
                    i === activeState ? "border-[#6d5dfc]" : "border-transparent opacity-60 hover:opacity-100"
                  }`}
                >
                  <img src={state.imageSrc} alt="" className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
            <p className="mt-4 text-xs font-bold uppercase tracking-wider text-[#a1a5ab]">
              Szene {current.phaseNumber} von {BUILDING_STAGES.length} · Wähle eine Szene, um den Aufbau zu sehen
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
