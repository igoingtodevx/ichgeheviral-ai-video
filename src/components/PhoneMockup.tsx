"use client";

import React, { useRef, useState } from "react";
import { Heart, MessageCircle, Bookmark, Share2, Volume2, VolumeX, Sparkles, TrendingUp, Layers, CheckCircle2 } from "lucide-react";

interface PhoneMockupProps {
  onPlayFull?: () => void;
}

export function PhoneMockup({ onPlayFull }: PhoneMockupProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(true);

  const toggleSound = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

  return (
    <div className="relative mx-auto w-full max-w-[340px] sm:max-w-[360px] lg:max-w-[390px] select-none">
      {/* Background ambient lighting halo behind phone */}
      <div className="absolute -inset-4 sm:-inset-6 rounded-[48px] bg-gradient-to-tr from-violet-600/30 via-indigo-500/20 to-sky-400/25 blur-3xl opacity-75 pointer-events-none -z-10" />

      {/* Floating Micro-Badge Top Left */}
      <div className="hidden sm:flex absolute -left-12 lg:-left-20 top-12 z-20 flex-col gap-1 rounded-xl bg-[#120F24]/90 p-3.5 border border-violet-500/30 shadow-2xl backdrop-blur-md max-w-[210px] animate-fade-in">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-lg bg-violet-600/30 border border-violet-400/40 flex items-center justify-center">
            <Sparkles className="w-3.5 h-3.5 text-violet-300" />
          </div>
          <span className="text-[11px] font-semibold text-white tracking-tight">
            Autonomer Ablauf
          </span>
        </div>
        <p className="text-[10px] text-slate-400 leading-snug pt-0.5">
          Vollständiges Reel mit natürlicher Umgebungsakustik.
        </p>
      </div>

      {/* Floating Micro-Badge Mid Left */}
      <div className="hidden sm:flex absolute -left-10 lg:-left-16 bottom-28 z-20 items-center gap-2.5 rounded-xl bg-[#120F24]/90 px-3.5 py-2.5 border border-sky-500/30 shadow-2xl backdrop-blur-md">
        <div className="w-7 h-7 rounded-lg bg-sky-500/20 border border-sky-400/40 flex items-center justify-center">
          <TrendingUp className="w-4 h-4 text-sky-300" />
        </div>
        <div>
          <div className="text-xs font-bold text-white flex items-center gap-1">
            <span>Vorher & Nachher</span>
          </div>
          <p className="text-[9px] text-slate-400">Fokus auf Verweildauer</p>
        </div>
      </div>

      {/* Floating Micro-Badge Right */}
      <div className="hidden sm:flex absolute -right-8 lg:-right-16 top-28 z-20 flex-col gap-1 rounded-xl bg-[#120F24]/90 p-3 border border-indigo-500/30 shadow-2xl backdrop-blur-md max-w-[190px]">
        <div className="flex items-center gap-2">
          <Layers className="w-4 h-4 text-indigo-300" />
          <span className="text-[11px] font-semibold text-white">60+ Sekunden</span>
        </div>
        <p className="text-[10px] text-slate-400">
          Natives 9:16 Reel. Sofort bereit für TikTok & IG.
        </p>
      </div>

      {/* Editorial Handwriting Annotation */}
      <div className="hidden lg:block absolute -right-24 bottom-14 z-20 text-right pointer-events-none">
        <div className="flex items-center gap-2 justify-end text-violet-300 handwriting text-sm tracking-wide">
          <span>Aus einer Idee wird ein virales Reel.</span>
          <span className="text-base text-violet-400">✦</span>
        </div>
        <svg
          className="w-16 h-8 text-violet-400/70 ml-auto mr-4 transform rotate-12"
          viewBox="0 0 100 50"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M 90,10 Q 50,45 10,25" />
          <path d="M 18,18 L 10,25 L 22,30" />
        </svg>
      </div>

      {/* Phone Chassis Container */}
      <div className="relative rounded-[46px] p-2.5 sm:p-3 bg-gradient-to-b from-[#2a2444] via-[#151226] to-[#0d0a1a] phone-chassis border border-white/20">
        {/* Dynamic Island / Speaker Pill */}
        <div className="absolute top-5 sm:top-6 left-1/2 -translate-x-1/2 z-30 flex items-center justify-center gap-2 w-28 h-5 rounded-full bg-black/90 border border-white/10 shadow-inner">
          <div className="w-2.5 h-2.5 rounded-full bg-[#181818]" />
          <div className="w-2 h-2 rounded-full bg-violet-950/80" />
        </div>

        {/* Phone Screen Area (9:16 Aspect Ratio) */}
        <div
          onClick={onPlayFull}
          className="relative aspect-[9/19] sm:aspect-[9/18.5] w-full overflow-hidden rounded-[38px] bg-black cursor-pointer"
        >
          {/* Main Video: 2 MB optimized preview loop for instant mobile loading */}
          <video
            ref={videoRef}
            src="/media/videos/hero-preview-loop.mp4"
            poster="/media/videos/hero-poster.jpg"
            autoPlay
            loop
            muted
            playsInline
            className="h-full w-full object-cover"
          />

          {/* Gradient Overlay for Text Readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent 40% to-black/85 pointer-events-none" />

          {/* Audio Unmute Pill Top Right */}
          <button
            onClick={toggleSound}
            className="absolute top-12 right-3 z-30 flex items-center gap-1.5 rounded-full bg-black/60 px-2.5 py-1 text-[10px] font-medium text-white/90 backdrop-blur-md border border-white/15 hover:bg-black/80 transition-colors"
          >
            {isMuted ? (
              <>
                <VolumeX className="w-3 h-3 text-red-400" />
                <span>Audio an</span>
              </>
            ) : (
              <>
                <Volume2 className="w-3 h-3 text-emerald-400 animate-pulse" />
                <span>Audio läuft</span>
              </>
            )}
          </button>

          {/* Reel Platform UI Overlay */}
          <div className="absolute inset-x-0 bottom-0 p-3.5 sm:p-4 z-20 flex flex-col justify-end text-white">
            <div className="flex items-end justify-between gap-3">
              {/* Creator Info & Caption */}
              <div className="flex-1 space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-violet-500 to-sky-400 p-[1.5px]">
                    <div className="w-full h-full rounded-full bg-black flex items-center justify-center text-[10px] font-bold">
                      IGV
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-xs font-semibold tracking-tight">
                      @ichgeheviral
                    </span>
                    <CheckCircle2 className="w-3 h-3 text-violet-400 fill-violet-400/20" />
                  </div>
                </div>

                <p className="text-[11px] text-slate-100 font-normal leading-snug line-clamp-2 drop-shadow-sm">
                  Schottergarten zur Luxus-Pooloase mit Wasserfall & Spa. 
                  Vollautomatisch generiert.
                </p>

                <div className="flex items-center gap-2 pt-0.5 text-[10px] text-violet-300 font-mono">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-violet-400 animate-ping" />
                  <span>60+ Sekunden · 9:16 Format</span>
                </div>
              </div>

              {/* TikTok / Reels Right Action Rail (Clean without fake metric numbers) */}
              <div className="flex flex-col items-center gap-3.5 pb-1 text-white">
                <div className="w-9 h-9 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center hover:scale-110 transition-transform">
                  <Heart className="w-4 h-4 text-red-400 fill-red-400" />
                </div>

                <div className="w-9 h-9 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center">
                  <MessageCircle className="w-4 h-4 text-white" />
                </div>

                <div className="w-9 h-9 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center">
                  <Bookmark className="w-4 h-4 text-amber-300 fill-amber-300/40" />
                </div>

                <div className="w-9 h-9 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center">
                  <Share2 className="w-4 h-4 text-white" />
                </div>
              </div>
            </div>

            {/* Video Timeline Scrubber Bar */}
            <div className="mt-3 w-full h-1 bg-white/20 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-violet-400 to-sky-400 w-3/4 animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
