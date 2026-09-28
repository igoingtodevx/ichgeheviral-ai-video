"use client";

import React, { useEffect, useRef } from "react";

export function VideoModal({ src, onClose }: { src: string; onClose: () => void }) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleKeyDown);
    closeButtonRef.current?.focus();
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[100] grid place-items-center bg-black/85 p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="video-modal-title"
    >
      <div className="w-full max-w-sm" onClick={(event) => event.stopPropagation()}>
        <h2 id="video-modal-title" className="sr-only">
          Beispiel-Reel
        </h2>
        <video
          src={src}
          controls
          autoPlay
          playsInline
          className="aspect-[9/16] w-full rounded-2xl bg-black shadow-2xl"
        />
        <button
          ref={closeButtonRef}
          onClick={onClose}
          className="mt-3 w-full rounded-xl bg-white px-4 py-3 text-sm font-bold text-black"
        >
          Schließen
        </button>
      </div>
    </div>
  );
}
