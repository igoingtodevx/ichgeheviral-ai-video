"use client";

import React from "react";

export function VideoModal({ src, onClose }: { src: string; onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 z-[100] grid place-items-center bg-black/85 p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div className="w-full max-w-sm" onClick={(e) => e.stopPropagation()}>
        <video
          src={src}
          controls
          autoPlay
          playsInline
          className="aspect-[9/16] w-full rounded-2xl bg-black shadow-2xl"
        />
        <button
          onClick={onClose}
          className="mt-3 w-full rounded-xl bg-white px-4 py-3 text-sm font-bold text-black"
        >
          Schließen
        </button>
      </div>
    </div>
  );
}
