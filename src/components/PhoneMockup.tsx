"use client";

import React, { useRef, useState } from "react";
import { Heart, MessageCircle, Bookmark, Share2, Volume2, VolumeX, CheckCircle2 } from "lucide-react";

interface PhoneMockupProps {
  onPlayFull?: () => void;
}

export function PhoneMockup({ onPlayFull }: PhoneMockupProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(true);

  const toggleSound = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

  return (
    <div className="relative mx-auto w-full max-w-[290px] sm:max-w-[320px] lg:max-w-[340px] select-none">
      {/* Background ambient lighting halo behind phone */}
      <div className="absolute -inset-4 sm:-inset-6 rounded-[48px] bg-gradient-to-tr from-violet-600/30 via-indigo-500/20 to-sky-400/25 blur-3xl opacity-75 pointer-events-none -z-10" />

      {/* Phone Chassis Container */}
      <div className="relative rounded-[44px] p-2.5 sm:p-3 bg-gradient-to-b from-[#2a2444] via-[#151226] to-[#0d0a1a] phone-chassis border border-white/20 shadow-2xl">
        {/* Dynamic Island / Speaker Pill */}
        <div className="absolute top-5 sm:top-6 left-1/2 -translate-x-1/2 z-30 flex items-center justify-center gap-2 w-24 h-4.5 rounded-full bg-black/90 border border-white/10 shadow-inner">
          <div className="w-2 h-2 rounded-full bg-[#181818]" />
          <div className="w-1.5 h-1.5 rounded-full bg-violet-950/80" />
        </div>

        {/* Phone Screen Area (9:16 Aspect Ratio) */}
        <div
          onClick={onPlayFull}
          className="relative aspect-[9/18.5] w-full overflow-hidden rounded-[36px] bg-black cursor-pointer group"
          role="button"
          tabIndex={0}
          aria-label="Reel im Vollbild abspielen"
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
            className="h-full w-full object-cover group-hover:scale-[1.02] transition-transform duration-500"
          />

          {/* Gradient Overlay for Text Readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-transparent 45% to-black/85 pointer-events-none" />

          {/* Audio Unmute Pill Top Right */}
          <button
            onClick={toggleSound}
            className="absolute top-10 right-3.5 z-30 flex items-center gap-1.5 rounded-full bg-black/60 px-2.5 py-1 text-[10px] font-medium text-white/90 backdrop-blur-md border border-white/15 hover:bg-black/80 transition-colors pointer-events-auto"
            aria-label={isMuted ? "Audio einschalten" : "Audio stummschalten"}
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
          <div className="absolute inset-x-0 bottom-0 p-3.5 sm:p-4 z-20 flex flex-col justify-end text-white pointer-events-none">
            <div className="flex items-end justify-between gap-3">
              {/* Creator Info & Caption */}
              <div className="flex-1 min-w-0 pr-2 space-y-1.5 pointer-events-auto">
                <div className="flex items-center gap-1.5">
                  <div className="w-5 h-5 rounded-full bg-gradient-to-tr from-violet-500 to-indigo-400 p-[1px] shrink-0">
                    <div className="w-full h-full rounded-full bg-black flex items-center justify-center text-[8px] font-bold text-white">
                      IGV
                    </div>
                  </div>
                  <span className="text-xs font-semibold tracking-tight text-white truncate">
                    @ichgeheviral
                  </span>
                  <CheckCircle2 className="w-3 h-3 text-violet-400 fill-violet-400/20 shrink-0" />
                </div>

                <p className="text-[11px] sm:text-xs text-slate-100 font-normal leading-snug drop-shadow-sm line-clamp-2">
                  Vom Schottergarten zur modernen Luxus-Pooloase.
                </p>
              </div>

              {/* TikTok / Reels Right Action Rail (Clean without fake metric numbers) */}
              <div className="w-8 sm:w-9 flex flex-col items-center gap-2.5 pb-0.5 text-white shrink-0 pointer-events-auto">
                <div className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center hover:scale-110 transition-transform">
                  <Heart className="w-3.5 h-3.5 text-red-400 fill-red-400" />
                </div>

                <div className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center">
                  <MessageCircle className="w-3.5 h-3.5 text-white" />
                </div>

                <div className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center">
                  <Bookmark className="w-3.5 h-3.5 text-amber-300 fill-amber-300/40" />
                </div>

                <div className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center">
                  <Share2 className="w-3.5 h-3.5 text-white" />
                </div>
              </div>
            </div>

            {/* Video Timeline Scrubber Bar */}
            <div className="mt-3 w-full h-[2px] bg-white/20 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-violet-400 to-sky-400 w-2/3" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
