"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function FinalCTA() {
  return (
    <section className="bg-[#101114] py-20 text-white">
      <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
        <span className="text-xs font-black uppercase tracking-[0.18em] text-[#9b8fff]">Bereit?</span>
        <h2 className="mt-4 text-4xl font-black tracking-[-0.05em] sm:text-6xl">
          Aus deiner Idee wird ein fertiges Reel.
        </h2>
        <p className="mx-auto mt-5 max-w-2xl text-[#b2b5ba]">
          Im Studio startest du mit einer verfügbaren Transformation. Poolbau ist aktuell die erste Kategorie — weitere werden schrittweise ergänzt.
        </p>
        <Link
          href="/kundenbereich/neu"
          className="mt-8 inline-flex items-center gap-2 rounded-xl bg-[#6d5dfc] px-8 py-4 text-sm font-black text-white transition hover:bg-[#5947e8]"
        >
          Studio starten <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </section>
  );
}
