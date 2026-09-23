"use client";

import React, { useState } from "react";
import { Play, Check } from "lucide-react";

interface FounderSectionProps {
  onScrollToGenerator?: () => void;
  onOpenFounderModal?: () => void;
}

export function FounderSection({ onScrollToGenerator, onOpenFounderModal }: FounderSectionProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <section id="founder" className="relative py-20 lg:py-28 bg-[#0B0918] border-t border-b border-white/[0.06] overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Contextual Copy & Call to Action */}
          <div className="lg:col-span-5 flex flex-col items-start">
            <div className="inline-flex items-center gap-2 rounded-full px-3 py-1 bg-violet-950/70 border border-violet-700/40 text-xs font-mono text-violet-300 mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-violet-400" />
              <span>PERSÖNLICHE VORSTELLUNG</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-[1.12] mb-6">
              Kurz erklärt von Timo
            </h2>

            <p className="text-base text-slate-300 leading-relaxed mb-6">
              In diesem kurzen Video erklärt Timo persönlich die Idee hinter IchGeheViral: 
              Warum Creator und Brands bisher Tage in komplexen Schnittprogrammen verloren haben und wie unsere 
              automatisierte Pipeline aus einer einfachen Idee ein sendefertiges 60-Sekunden-Reel generiert.
            </p>

            <div className="space-y-3 mb-8 text-sm text-slate-300">
              <div className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Echte Einblicke in den automatisierten Ablauf</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Wie die visuelle Kontinuität über alle Szenen gehalten wird</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Kein Marketing-Blabla, sondern ein ehrlicher Produktüberblick</span>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <button
                onClick={() => {
                  if (onOpenFounderModal) {
                    onOpenFounderModal();
                  } else {
                    setIsPlaying(true);
                  }
                }}
                className="btn-electric flex items-center gap-2 px-6 py-3.5 rounded-xl text-sm font-semibold text-white shadow-xl"
              >
                <Play className="w-4 h-4 fill-current" />
                <span>Video ansehen</span>
              </button>

              {onScrollToGenerator && (
                <button
                  onClick={onScrollToGenerator}
                  className="px-5 py-3.5 rounded-xl text-sm font-medium text-slate-300 hover:text-white border border-white/10 hover:border-white/20 hover:bg-white/5 transition-all"
                >
                  Direkt zum Generator
                </button>
              )}
            </div>
          </div>

          {/* Right Column: High-End Cinematic Player Container */}
          <div className="lg:col-span-7 relative">
            {/* Ambient player glow */}
            <div className="absolute -inset-4 rounded-3xl bg-gradient-to-r from-violet-600/25 to-indigo-600/20 blur-2xl opacity-60 pointer-events-none" />

            <div className="relative rounded-3xl overflow-hidden border border-white/15 bg-black shadow-2xl aspect-[16/10] sm:aspect-[16/9] group">
              {isPlaying ? (
                /* Embedded Player View Placeholder */
                <div className="w-full h-full flex flex-col items-center justify-center p-8 text-center bg-slate-950">
                  <div className="w-14 h-14 rounded-2xl bg-violet-950/60 border border-violet-500/30 flex items-center justify-center text-violet-400 mb-3 shadow-lg shadow-violet-900/30">
                    <Play className="w-6 h-6 fill-current translate-x-0.5 opacity-80" />
                  </div>
                  <h4 className="text-lg font-bold text-white mb-2">Video in Kürze verfügbar</h4>
                  <p className="text-xs sm:text-sm text-slate-300 max-w-sm mb-4 leading-relaxed">
                    Timo bereitet derzeit die persönliche Vorstellung von IchGeheViral vor.
                  </p>
                  <button
                    onClick={() => setIsPlaying(false)}
                    className="text-xs font-mono text-violet-400 underline hover:text-violet-300"
                  >
                    Vorschau schließen
                  </button>
                </div>
              ) : (
                /* Cinematic Poster & Play Button */
                <>
                  <img
                    src="/media/founder/timo-founder.jpg"
                    alt="Timo – Gründer von IchGeheViral"
                    className="w-full h-full object-cover object-top filter brightness-90 group-hover:scale-105 transition-transform duration-700"
                  />

                  {/* Gradient Lighting overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/20" />

                  {/* Play Button Halo Trigger */}
                  <button
                    onClick={() => {
                      if (onOpenFounderModal) {
                        onOpenFounderModal();
                      } else {
                        setIsPlaying(true);
                      }
                    }}
                    className="absolute inset-0 m-auto w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-violet-600/80 hover:bg-violet-600 text-white flex items-center justify-center shadow-2xl backdrop-blur-md border border-white/25 hover:scale-110 transition-all duration-300 group-hover:shadow-[0_0_50px_rgba(124,58,237,0.7)]"
                    aria-label="Gründer Video abspielen"
                  >
                    <Play className="w-8 h-8 sm:w-10 sm:h-10 fill-white translate-x-0.5" />
                  </button>

                  {/* Top Left Badge */}
                  <div className="absolute top-4 left-4 z-10 px-3 py-1.5 rounded-lg bg-black/70 backdrop-blur-md border border-white/15 text-xs font-mono text-white flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-violet-400" />
                    <span>TIMO // GRÜNDER</span>
                  </div>

                  {/* Bottom Left Note */}
                  <div className="absolute bottom-4 left-4 z-10 hidden sm:block text-xs text-slate-300 font-medium">
                    Klicke zum Ansehen der persönlichen Vorstellung
                  </div>

                  {/* Bottom Right Status Badge */}
                  <div className="absolute bottom-4 right-4 z-10 px-2.5 py-1 rounded-md bg-black/75 backdrop-blur-md border border-white/15 text-[11px] font-mono text-violet-300 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse" />
                    <span>IN VORBEREITUNG</span>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
