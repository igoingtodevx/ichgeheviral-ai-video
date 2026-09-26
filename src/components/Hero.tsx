"use client";

import React from "react";
import { ArrowRight, Play, CheckCircle2, TrendingUp, Coins, Zap } from "lucide-react";
import { PhoneMockup } from "./PhoneMockup";

interface HeroProps {
  onOpenVideo: () => void;
  onScrollToGenerator: () => void;
}

export function Hero({ onOpenVideo, onScrollToGenerator }: HeroProps) {
  return (
    <section className="relative overflow-hidden pt-6 pb-12 lg:pt-12 lg:pb-16 radial-glow-hero">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 xl:gap-12 items-center">
          {/* Left Column: Messaging & Conversion */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            {/* Telemetry Eyebrow */}
            <div className="inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 bg-[#14102c] border border-violet-500/40 text-xs font-mono tracking-wider text-violet-300 mb-6 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-violet-400 animate-ping" />
              <span>ENTWICKELT FÜR MAXIMALES VIRALPOTENZIAL</span>
            </div>

            {/* Monolithic Headline - Focus on Viralpotenzial */}
            <h1 className="text-4xl sm:text-6xl lg:text-6xl xl:text-7xl font-extrabold tracking-tight text-white leading-[1.08] mb-6">
              Videos, die für <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-indigo-300 to-sky-400">
                maximales Viralpotenzial
              </span>{" "}
              <br />
              gebaut sind.
            </h1>

            {/* Subheadline */}
            <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed mb-8">
              Aus einer einzigen Idee entsteht automatisch ein fertiges <span className="text-white font-semibold">60+ Sekunden Reel</span> — mit 
              starkem Vorher/Nachher, sichtbarer Entwicklung und einem Final-Reveal für TikTok, Instagram Reels und YouTube Shorts.
            </p>

            {/* CTA Action Row */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto mb-8">
              <button
                onClick={onScrollToGenerator}
                className="btn-electric flex items-center justify-center gap-2.5 rounded-xl px-7 py-4 text-base font-semibold text-white shadow-xl"
              >
                <span>Video erstellen</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onOpenVideo}
                className="flex items-center justify-center gap-2.5 rounded-xl px-6 py-4 text-base font-medium text-slate-200 border border-white/15 bg-white/[0.04] hover:bg-white/[0.08] hover:border-white/25 transition-all"
              >
                <Play className="w-4 h-4 text-violet-400 fill-violet-400/40" />
                <span>Echtes Ergebnis ansehen (63s)</span>
              </button>
            </div>

            {/* Grounded Trust Signals */}
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs sm:text-sm text-slate-400 font-mono">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                <span className="text-amber-300 font-semibold">Keine Credits</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-violet-400 shrink-0" />
                <span>Kein manueller Videoschnitt</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-sky-400 shrink-0" />
                <span>60+ Sekunden · 9:16</span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual Asset (Phone Mockup) */}
          <div className="lg:col-span-5 flex justify-center">
            <PhoneMockup onPlayFull={onOpenVideo} />
          </div>
        </div>

        {/* 3 Core USPs Directly Visible Below Hero */}
        <div className="mt-12 sm:mt-16 grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6 border-t border-white/[0.08] pt-10">
          {/* USP 1: MAXIMALES VIRALPOTENZIAL */}
          <div className="relative rounded-3xl p-7 lg:p-8 border border-violet-500/40 bg-gradient-to-b from-[#181232]/80 to-[#0a0815]/90 shadow-xl overflow-hidden group hover:border-violet-400/70 transition-all duration-300">
            <div className="absolute top-0 right-0 w-32 h-32 bg-violet-600/10 rounded-full blur-2xl pointer-events-none" />
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-violet-500/20 text-violet-300 border border-violet-500/30 text-xs font-mono font-bold tracking-wider mb-4">
              <TrendingUp className="w-3.5 h-3.5 text-violet-400" />
              <span>MAXIMALES VIRALPOTENZIAL</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-white mb-3 tracking-tight">
              Aufmerksamkeitsstarke Transformation
            </h3>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              Jedes Video wird von Sekunde 1 an als fesselnde Verwandlung aufgebaut: Starker Scroll-Stop zu Beginn, 
              kontinuierlicher Baufortschritt und ein visueller Final-Reveal für maximale Verweildauer.
            </p>
          </div>

          {/* USP 2: KEINE CREDITS - High Contrast Highlight */}
          <div className="relative rounded-3xl p-7 lg:p-8 border border-amber-400/50 bg-gradient-to-b from-amber-500/15 via-[#1a140d]/80 to-[#0a0815]/95 shadow-xl overflow-hidden group hover:border-amber-300/80 transition-all duration-300">
            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/40 text-xs font-mono font-bold tracking-wider mb-4">
              <Coins className="w-3.5 h-3.5 text-amber-400" />
              <span>KEINE CREDITS</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-white mb-3 tracking-tight">
              Kein Credit-System. <br className="hidden sm:inline" />
              Keine Rechnerei.
            </h3>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              Schluss mit intransparenten Token-Paketen und Angst vor Fehlversuchen. 
              Du erstellst dein Video statt Credits zu zählen — volle Kostentransparenz ohne versteckte Gebühren.
            </p>
          </div>

          {/* USP 3: VOLLAUTOMATISCH */}
          <div className="relative rounded-3xl p-7 lg:p-8 border border-sky-500/40 bg-gradient-to-b from-sky-500/10 via-[#0e1628]/80 to-[#0a0815]/90 shadow-xl overflow-hidden group hover:border-sky-400/70 transition-all duration-300">
            <div className="absolute top-0 right-0 w-32 h-32 bg-sky-500/10 rounded-full blur-2xl pointer-events-none" />
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-500/20 text-sky-300 border border-sky-500/30 text-xs font-mono font-bold tracking-wider mb-4">
              <Zap className="w-3.5 h-3.5 text-sky-400" />
              <span>VOLLAUTOMATISCH</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-white mb-3 tracking-tight">
              Idee eingeben. <br className="hidden sm:inline" />
              Fertiges Reel erhalten.
            </h3>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              Kein Videoschnitt, kein Keyframing, keine komplizierte Software. 
              Bildaufbau, konsistente Kameraperspektive, Phasenübergänge und Audio laufen vollautomatisch im System ab.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
