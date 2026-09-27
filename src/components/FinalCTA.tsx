"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function FinalCTA() {
  return (
    <section className="bg-[#101114] py-20 text-white">
      <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
        <span className="text-xs font-black uppercase tracking-[0.18em] text-[#ffad4d]">Bereit?</span>
        <h2 className="mt-4 text-4xl font-black tracking-[-0.05em] sm:text-6xl">
          Deine Idee. Ein fertiges Reel.
        </h2>
        <p className="mx-auto mt-5 max-w-2xl text-[#b2b5ba]">
          Der Generator lebt im Studio: Konzept eingeben, Ergebnis verstehen, sicher bestellen.
        </p>
        <Link
          href="/kundenbereich"
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#ff8600] px-8 py-4 text-sm font-black text-white transition hover:bg-[#e97800]"
        >
          Studio öffnen <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </section>
  );
}
