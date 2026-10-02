"use client";

import Link from "next/link";
import { ArrowLeft, BookOpen, Clock } from "lucide-react";

// Course copy, modules and checkout are supplied by Timo; nothing here is invented placeholder content.
export default function CoursePage() {
  return (
    <div className="px-4 py-8 sm:px-6 lg:px-10 lg:py-10">
      <div className="mx-auto max-w-5xl">
        <div className="mb-6">
          <Link
            href="/kundenbereich"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#686c73] transition hover:text-[#5d4de1]"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> Zurück zur Übersicht
          </Link>
        </div>

        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-[#dedbe7] bg-white px-3 py-1 text-xs font-black uppercase tracking-[0.14em] text-[#5d4de1]">
              <BookOpen className="h-3.5 w-3.5" />
              Kurs
            </div>
            <h1 className="mt-3 text-4xl font-black tracking-[-0.055em] text-[#101114] sm:text-5xl">
              Richtig Uploaden = Viral gehen
            </h1>
          </div>

          <div className="shrink-0 rounded-2xl border border-[#e4e1ec] bg-white p-5 text-right sm:min-w-[180px]">
            <span className="text-xs font-bold uppercase tracking-wider text-[#8a8e94]">Kurspreis</span>
            <div className="mt-1 text-3xl font-black text-[#101114]">19€</div>
          </div>
        </div>

        <section className="mt-8 rounded-2xl border border-[#dedbe7] bg-white p-6 shadow-sm sm:p-7">
          <div className="flex items-start gap-4">
            <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[#f0edff] text-[#5d4de1]">
              <Clock className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-lg font-black text-[#101114]">Bald verfügbar</h2>
              <p className="mt-1.5 text-sm leading-6 text-[#686c73]">
                Die Kursinhalte werden in Kürze hier freigeschaltet.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
