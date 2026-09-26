"use client";

import React, { useState } from "react";
import { GOLDEN_V1_STATES } from "../lib/constants";
import { Sliders, Play, Sparkles, Check } from "lucide-react";

export function TransformationScrubber({ onOpenVideo }: { onOpenVideo?: () => void }) {
  const [activeStateIndex, setActiveStateIndex] = useState(7); // default to final oasis (Phase 8)
  const [compareMode, setCompareMode] = useState(false);

  const currentState = GOLDEN_V1_STATES[activeStateIndex];
  const initialState = GOLDEN_V1_STATES[0];

  const viralMechanisms = [
    {
      num: "01",
      tag: "SEKUNDE 0–3",
      title: "Scroll Stop",
      desc: "Starker Ausgangszustand: Ein verwilderter Garten erzeugt sofort Neugier und die unausgesprochene Erwartung: Was wird hier gebaut?",
      imageSrc: "/media/states/run1/state_01.jpg",
      highlight: "Erzeugt sofortige Neugier",
    },
    {
      num: "02",
      tag: "SEKUNDE 4–45",
      title: "Kontinuierlicher Fortschritt",
      desc: "Aufeinander aufbauende Zwischenphasen statt isolierter Clips. Jede Sekunde liefert neuen sichtbaren Baufortschritt, der den Loop offen hält.",
      imageSrc: "/media/states/run1/state_04.jpg",
      highlight: "Hält Aufmerksamkeit hoch",
    },
    {
      num: "03",
      tag: "SEKUNDE 46–63",
      title: "Final Reveal & Payoff",
      desc: "Der visuelle Payoff: Das fertige Luxusergebnis belohnt das Weiterschauen bis zum Ende und treibt Kommentare, Saves und Weiterleitungen.",
      imageSrc: "/media/states/run1/state_08.jpg",
      highlight: "Maximaler visueller Payoff",
    },
    {
      num: "04",
      tag: "PLATTFORM-NATIV",
      title: "Social-First Nativ",
      desc: "9:16 Vollformat, 60+ Sekunden Laufzeit und passender Raumklang — maßgeschneidert für den Algorithmus von TikTok, Instagram und YouTube.",
      imageSrc: "/media/videos/hero-poster.jpg",
      highlight: "Sofort postfertig",
    },
  ];

  return (
    <section id="pipeline" className="relative py-20 lg:py-28 bg-[#090714] border-t border-b border-white/[0.06] overflow-hidden scroll-mt-20">
      {/* Background Subtle Gradient */}
      <div className="absolute inset-0 radial-glow-section pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header: Viral-Mechanik as Primary Focus */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 bg-[#14102c] border border-violet-500/40 text-xs font-mono font-bold tracking-widest text-violet-300 uppercase mb-4">
            <Sparkles className="w-3.5 h-3.5 text-violet-400" />
            <span>DIE VIRALITÄTS-LOGIK</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4 leading-tight">
            Nicht einfach KI-generiert. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-indigo-300 to-sky-400">
              Fürs Weiterschauen aufgebaut.
            </span>
          </h2>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
            Zuschauer bleiben nicht hängen, weil ein Video „KI“ ist — sondern weil die Dramaturgie fesselt. 
            Vier Mechanismen machen den Unterschied zwischen 3 Sekunden Abbruch und Millionen Views:
          </p>
        </div>

        {/* 4 Viral Mechanism Cards with Real Pipeline Assets */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-16">
          {viralMechanisms.map((mech) => (
            <div
              key={mech.num}
              className="glass-panel rounded-2xl overflow-hidden border border-white/[0.09] hover:border-violet-500/40 transition-all duration-300 flex flex-col group shadow-xl"
            >
              {/* Asset Thumbnail Header */}
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-black">
                <img
                  src={mech.imageSrc}
                  alt={mech.title}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />
                <div className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded bg-black/75 backdrop-blur-md border border-white/15 text-[10px] font-mono font-bold text-violet-300">
                  {mech.tag}
                </div>
                <div className="absolute top-2.5 right-2.5 text-xs font-mono font-black text-white/50">
                  {mech.num}
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-base font-bold text-white mb-2 tracking-tight">
                    {mech.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
                    {mech.desc}
                  </p>
                </div>

                <div className="pt-3 border-t border-white/[0.06] flex items-center gap-1.5 text-xs font-mono text-emerald-400">
                  <Check className="w-3.5 h-3.5 shrink-0" />
                  <span>{mech.highlight}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Interactive Workspace Card - The Interactive Proof */}
        <div className="glass-panel rounded-2xl sm:rounded-3xl p-4 sm:p-8 lg:p-10 border border-white/[0.09] shadow-2xl">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-violet-400 block mb-1">
              INTERAKTIVER BEWEIS
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-white">
              Prüfe alle 8 Bauphasen im Detail
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 mt-1">
              Bewege den Schieberegler oder nutze den Vorher/Nachher-Modus, um die konsistente Kameraperspektive zu prüfen.
            </p>
          </div>

          {/* Controls Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-5 border-b border-white/[0.08]">
            <div className="flex items-center gap-2 sm:gap-3">
              <span className="text-xs sm:text-sm font-mono text-violet-400 font-semibold uppercase tracking-wider">
                Phase {currentState.phaseNumber}/8:
              </span>
              <span className="text-xs sm:text-base font-bold text-white truncate max-w-[200px] sm:max-w-none">
                {currentState.title}
              </span>
            </div>

            <div className="flex items-center gap-2 sm:gap-3">
              <button
                onClick={() => setCompareMode(!compareMode)}
                className={`flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  compareMode
                    ? "bg-violet-600 text-white shadow-lg shadow-violet-600/30"
                    : "bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white border border-white/10"
                }`}
              >
                <Sliders className="w-3.5 h-3.5" />
                <span>{compareMode ? "Einzelfokus" : "Vorher / Nachher"}</span>
              </button>

              {onOpenVideo && (
                <button
                  onClick={onOpenVideo}
                  className="hidden sm:flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold text-white bg-violet-600/30 border border-violet-500/40 hover:bg-violet-600/50 transition-all"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>Fertiges Reel ansehen</span>
                </button>
              )}
            </div>
          </div>

          {/* Media Viewport */}
          <div className="my-6 sm:my-8">
            {compareMode ? (
              /* Split Comparison View: Phase 1 vs. Current Phase */
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
                {/* Before: Phase 1 */}
                <div className="relative rounded-xl sm:rounded-2xl overflow-hidden border border-white/10 bg-black aspect-[4/3] sm:aspect-[9/14]">
                  <img
                    src={initialState.imageSrc}
                    alt="Ausgangszustand Vorher"
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute top-3 left-3 z-10 px-2.5 py-0.5 rounded bg-black/75 backdrop-blur-md border border-white/15 text-[11px] font-mono font-bold text-amber-300">
                    VORHER // Phase 1
                  </div>
                  <div className="absolute bottom-3 inset-x-3 z-10 p-2.5 rounded-lg bg-black/80 backdrop-blur-md border border-white/10 text-[11px] text-slate-300">
                    {initialState.description}
                  </div>
                </div>

                {/* After: Current Phase */}
                <div className="relative rounded-xl sm:rounded-2xl overflow-hidden border border-violet-500/40 bg-black aspect-[4/3] sm:aspect-[9/14] shadow-2xl">
                  <img
                    src={currentState.imageSrc}
                    alt="Aktueller Zustand Nachher"
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute top-3 left-3 z-10 px-2.5 py-0.5 rounded bg-violet-950/80 backdrop-blur-md border border-violet-500/40 text-[11px] font-mono font-bold text-violet-300">
                    NACHHER // Phase {currentState.phaseNumber} ({currentState.title})
                  </div>
                  <div className="absolute bottom-3 inset-x-3 z-10 p-2.5 rounded-lg bg-black/80 backdrop-blur-md border border-white/10 text-[11px] text-slate-300">
                    {currentState.description}
                  </div>
                </div>
              </div>
            ) : (
              /* Single Focused State with Context */
              <div className="relative rounded-xl sm:rounded-2xl overflow-hidden border border-white/15 bg-black max-w-4xl mx-auto aspect-[4/3] sm:aspect-[16/9] shadow-2xl">
                <img
                  src={currentState.imageSrc}
                  alt={currentState.title}
                  loading="lazy"
                  className="w-full h-full object-cover"
                />

                {/* Top Corner Badges */}
                <div className="absolute top-3 sm:top-4 left-3 sm:left-4 z-10 flex flex-wrap gap-2">
                  <div className="px-2.5 sm:px-3 py-1 rounded-md bg-black/80 backdrop-blur-md border border-white/15 text-[11px] sm:text-xs font-mono font-bold text-white">
                    {currentState.stageName}
                  </div>
                  <div className="px-2.5 py-1 rounded-md bg-violet-950/80 backdrop-blur-md border border-violet-700/50 text-[10px] sm:text-[11px] font-mono text-violet-300 hidden sm:inline-block">
                    HOCHAUFLÖSEND · 9:16
                  </div>
                </div>

                {/* Bottom Context Info Overlay */}
                <div className="absolute bottom-0 inset-x-0 p-3 sm:p-6 bg-gradient-to-t from-black/95 via-black/75 to-transparent">
                  <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 sm:gap-3">
                    <div>
                      <h4 className="text-sm sm:text-xl font-bold text-white mb-0.5 sm:mb-1">
                        {currentState.title}
                      </h4>
                      <p className="text-[11px] sm:text-sm text-slate-300 max-w-xl line-clamp-2 sm:line-clamp-none">
                        {currentState.description}
                      </p>
                    </div>

                    <div className="shrink-0 text-left sm:text-right hidden sm:block">
                      <span className="block text-[10px] font-mono uppercase tracking-widest text-slate-400">
                        Phasen-Fokus
                      </span>
                      <span className="text-xs font-mono text-emerald-400 font-medium">
                        {currentState.technicalMilestone}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Interactive Range Scrubber */}
          <div className="space-y-4 pt-2 sm:pt-4">
            <div className="flex items-center justify-between text-[11px] sm:text-xs font-mono text-slate-400">
              <span>01 // Ausgang</span>
              <span className="text-violet-400 font-bold">REGLER: PHASE {currentState.phaseNumber}</span>
              <span>08 // Finale</span>
            </div>

            <input
              type="range"
              min="0"
              max="7"
              value={activeStateIndex}
              onChange={(e) => setActiveStateIndex(parseInt(e.target.value))}
              className="w-full h-2.5 bg-slate-800 rounded-lg appearance-none cursor-pointer border border-white/10"
              aria-label="Bauzustand Schieberegler"
            />

            {/* Thumbnail Stepper Pills */}
            <div className="grid grid-cols-4 sm:grid-cols-8 gap-1.5 sm:gap-2 pt-2">
              {GOLDEN_V1_STATES.map((state, idx) => {
                const isActive = idx === activeStateIndex;
                return (
                  <button
                    key={state.id}
                    onClick={() => setActiveStateIndex(idx)}
                    className={`relative rounded-lg sm:rounded-xl overflow-hidden p-1 text-left transition-all ${
                      isActive
                        ? "ring-2 ring-violet-500 bg-violet-950/40"
                        : "opacity-60 hover:opacity-100 bg-white/5"
                    }`}
                  >
                    <div className="aspect-[4/3] rounded overflow-hidden mb-1 bg-slate-900">
                      <img
                        src={state.imageSrc}
                        alt={state.title}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>
                    <span className="block text-[9px] sm:text-[10px] font-mono font-semibold truncate text-white">
                      0{state.phaseNumber} <span className="hidden sm:inline">{state.title}</span>
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
