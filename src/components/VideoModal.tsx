"use client";

import React, { useEffect, useRef } from "react";
import { X, Volume2, VolumeX, Maximize2 } from "lucide-react";

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
  title = "IchGeheViral — Golden V1 Reel",
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

      <div className="relative z-10 w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl max-h-[92vh] flex flex-col items-center bg-[#0D0A1C] border border-violet-500/30 rounded-3xl p-3 sm:p-5 shadow-2xl overflow-hidden">
        {/* Header Bar */}
        <div className="w-full flex items-center justify-between pb-3 border-b border-white/10 mb-3 px-1">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-violet-400 animate-pulse" />
            <span className="text-xs font-mono font-bold text-white tracking-wide truncate max-w-[240px]">
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

        {/* Video Player */}
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

        {/* Bottom Metadata */}
        <div className="w-full pt-3 flex items-center justify-between text-[11px] font-mono text-slate-400 px-1">
          <span>{isFounderVideo ? "FOUNDER OVERVIEW // 3 MIN" : "GOLDEN V1 MP4 // 63.14s"}</span>
          <span className="text-emerald-400">720×1280 @ 24FPS</span>
        </div>
      </div>
    </div>
  );
}
