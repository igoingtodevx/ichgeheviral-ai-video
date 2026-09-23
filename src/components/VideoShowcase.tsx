"use client";

import React, { useState } from "react";
import { SHOWCASE_VIDEOS } from "../lib/constants";
import { Play, Sparkles, Layers, Clock, Eye } from "lucide-react";
import { VideoShowcaseItem } from "../lib/types";

interface VideoShowcaseProps {
  onSelectVideo: (video: VideoShowcaseItem) => void;
}

export function VideoShowcase({ onSelectVideo }: VideoShowcaseProps) {
  const [activeTab, setActiveTab] = useState<"all" | "pools" | "contact-sheets">("all");

  return (
    <section id="showcase" className="relative py-20 lg:py-28 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-mono font-bold tracking-widest text-violet-400 uppercase">
            ECHTE ERGEBNISSE
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mt-2 mb-4">
            Reels, die mit IchGeheViral generiert wurden.
          </h2>
          <p className="text-base sm:text-lg text-slate-300">
            Keine Mockups, keine Photoshop-Collagen. Hier sind die tatsächlichen 60+ Sekunden 
            Videoergebnisse aus der validierten Golden V1 Pipeline.
          </p>
        </div>

        {/* Showcase Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 max-w-5xl mx-auto">
          {SHOWCASE_VIDEOS.map((item) => (
            <div
              key={item.id}
              className="glass-panel rounded-3xl p-6 sm:p-7 border border-white/[0.08] hover:border-violet-500/40 transition-all duration-300 group flex flex-col justify-between"
            >
              {/* Vertical Reel Card Area */}
              <div
                onClick={() => onSelectVideo(item)}
                className="relative aspect-[9/14] sm:aspect-[9/13] w-full rounded-2xl overflow-hidden bg-black cursor-pointer shadow-xl mb-6 group/video"
              >
                {/* Poster / Video Frame */}
                <img
                  src={item.posterSrc}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover/video:scale-105 transition-transform duration-500"
                />

                {/* Ambient vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/30" />

                {/* Floating Play Trigger */}
                <div className="absolute inset-0 m-auto w-16 h-16 rounded-full bg-violet-600/90 text-white flex items-center justify-center shadow-xl group-hover/video:scale-110 group-hover/video:bg-violet-600 transition-all">
                  <Play className="w-6 h-6 fill-white translate-x-0.5" />
                </div>

                {/* Top Badge */}
                <div className="absolute top-4 left-4 z-10 px-3 py-1 rounded-md bg-black/70 backdrop-blur-md border border-white/15 text-xs font-mono font-semibold text-violet-300">
                  {item.tag}
                </div>

                {/* Top Right Duration */}
                <div className="absolute top-4 right-4 z-10 px-2.5 py-1 rounded-md bg-black/70 backdrop-blur-md border border-white/15 text-xs font-mono text-slate-300 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-violet-400" />
                  <span>{item.duration}</span>
                </div>

                {/* Bottom Overlay Info */}
                <div className="absolute bottom-4 inset-x-4 z-10 text-white">
                  <div className="text-xs font-mono text-violet-300 mb-1 flex items-center gap-2">
                    <Layers className="w-3.5 h-3.5" />
                    <span>8 Bauphasen // 7 Omni-Transitions</span>
                  </div>
                  <h4 className="text-base sm:text-lg font-bold line-clamp-1">
                    {item.title}
                  </h4>
                </div>
              </div>

              {/* Card Meta Description */}
              <div className="space-y-3">
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  <span className="font-semibold text-white font-mono text-xs uppercase block mb-1">
                    Verwendeter Prompt:
                  </span>
                  &ldquo;{item.concept}&rdquo;
                </p>

                <div className="pt-3 border-t border-white/[0.08] flex items-center justify-between">
                  <button
                    onClick={() => onSelectVideo(item)}
                    className="text-xs font-semibold text-violet-400 hover:text-violet-300 flex items-center gap-1.5"
                  >
                    <span>Vollständiges Reel abspielen</span>
                    <Play className="w-3 h-3 fill-current" />
                  </button>

                  <span className="text-[11px] font-mono text-slate-400">
                    {item.resolution}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Contact Sheet Evidence Teaser */}
        <div className="mt-16 glass-panel rounded-3xl p-6 sm:p-10 border border-white/[0.08] max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-5">
              <span className="text-xs font-mono font-bold text-violet-400 uppercase tracking-wider block mb-2">
                Qualitätssicherung
              </span>
              <h3 className="text-2xl font-bold text-white mb-3">
                Vollständiges Phasen-Sheet beider Runs
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed mb-4">
                Jede Phase wird als 2K-Masterbild gerendert, bevor die Videomodelle 
                die Übergänge interpolieren. Das garantiert 100% stabile Geometrien 
                ohne das typische Verschwimmen herkömmlicher KI-Video-Tools.
              </p>
              <div className="flex items-center gap-2 text-xs font-mono text-emerald-400">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span>Zero Halluzinationen · Getestet auf 63.1s Dauer</span>
              </div>
            </div>

            <div className="md:col-span-7">
              <div className="rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-black">
                <img
                  src="/media/contact-sheets/run1-contact-sheet.jpg"
                  alt="Golden V1 Kontaktbogen aller 8 Phasen"
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
