"use client";

import React, { useEffect, useRef } from "react";
import { X, Play } from "lucide-react";

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoSrc: string;
  title?: string;
  isFounderVideo?: boolean;
}

export function VideoModal({
  isOpen,
  onClose,
  videoSrc,
  title = "IchGeheViral — Beispiel-Reel",
  isFounderVideo = false,
}: VideoModalProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/90 backdrop-blur-xl animate-fade-in">
      <div
        className="absolute inset-0"
        onClick={onClose}
        aria-label="Modal schließen"
      />

      <div className="relative z-10 w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl max-h-[92vh] flex flex-col items-center bg-[#0D0A1C] border border-violet-500/30 rounded-3xl p-4 sm:p-6 shadow-2xl overflow-hidden">
        {/* Header Bar */}
        <div className="w-full flex items-center justify-between pb-3 border-b border-white/10 mb-4 px-1">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-violet-400 animate-pulse" />
            <span className="text-xs font-mono font-bold text-white tracking-wide truncate max-w-[260px]">
              {title}
            </span>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-slate-300 hover:text-white transition-colors"
            aria-label="Schließen"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Video or Founder Placeholder */}
        {isFounderVideo ? (
          <div className="w-full aspect-[16/10] sm:aspect-[16/9] rounded-2xl overflow-hidden bg-slate-950/80 border border-white/10 flex flex-col items-center justify-center p-6 sm:p-8 text-center my-auto">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-violet-950/80 border border-violet-500/40 flex items-center justify-center text-violet-400 mb-4 shadow-xl shadow-violet-900/30">
              <Play className="w-7 h-7 fill-current translate-x-0.5 opacity-80" />
            </div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-violet-900/40 border border-violet-600/30 text-[11px] font-mono text-violet-300 mb-3">
              <span>IN VORBEREITUNG</span>
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-white mb-2">
              Video in Kürze verfügbar
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-sm leading-relaxed mb-6">
              Timo bereitet derzeit die persönliche Vorstellung von IchGeheViral vor. Hier wird das Video in Kürze abrufbar sein.
            </p>
            <button
              onClick={onClose}
              className="px-5 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-xs font-medium text-slate-200 transition-colors"
            >
              Schließen
            </button>
          </div>
        ) : (
          <div className="relative w-full aspect-[9/16] max-h-[75vh] rounded-2xl overflow-hidden bg-black shadow-inner">
            <video
              ref={videoRef}
              src={videoSrc}
              autoPlay
              controls
              playsInline
              className="w-full h-full object-contain"
            />
          </div>
        )}

        {/* Bottom Metadata */}
        <div className="w-full pt-3 flex items-center justify-between text-[11px] font-mono text-slate-400 px-1">
          <span>{isFounderVideo ? "PERSÖNLICHE VORSTELLUNG // TIMO" : "ORIGINAL-SAMPLE // 63s REEL"}</span>
          <span className="text-emerald-400">{isFounderVideo ? "BALD VERFÜGBAR" : "720×1280 @ 24FPS"}</span>
        </div>
      </div>
    </div>
  );
}
