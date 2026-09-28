"use client";

import { useRouter } from "next/navigation";
import { ArrowRight, Check, Gauge, Layers3, Smartphone } from "lucide-react";

const BENEFITS = [
  ["60+ Sek.", "fertiges vertikales Reel", Gauge],
  ["8 Phasen", "sichtbarer Aufbau bis zum Reveal", Layers3],
  ["9:16", "Short-Form-Format", Smartphone],
] as const;

export default function NewReelPage() {
  const router = useRouter();

  return (
    <div className="px-4 py-8 sm:px-6 lg:px-10 lg:py-10">
      <div className="mx-auto max-w-5xl">
        <div>
          <span className="text-xs font-black uppercase tracking-[0.18em] text-[#5d4de1]">
            Neues Transformations-Reel
          </span>
          <h1 className="mt-3 max-w-3xl text-4xl font-black tracking-[-0.055em] sm:text-6xl">
            Ein Klick. Dein nächstes Reel.
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-6 text-[#686c73] sm:text-base">
            Keine Presets, keine Promptfelder, keine technischen Entscheidungen. Das Studio hält die
            aktuelle Poolbau-Kategorie und die kontrollierte Variation im Hintergrund.
          </p>
        </div>

        <section className="mt-9 overflow-hidden rounded-[30px] bg-[#17151f] text-white shadow-[0_24px_80px_rgba(23,21,31,.16)]">
          <div className="grid gap-8 p-6 sm:p-9 lg:grid-cols-[1fr_280px] lg:items-center lg:p-12">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-3 py-1.5 text-[11px] font-black uppercase tracking-[0.14em] text-[#c5beff]">
                <span className="h-2 w-2 rounded-full bg-[#8f82ff]" />
                Poolbau · aktuell verfügbar
              </span>
              <h2 className="mt-5 max-w-xl text-3xl font-black tracking-[-0.04em] sm:text-4xl">
                Bereit für eine neue Transformation?
              </h2>
              <p className="mt-4 max-w-xl text-sm leading-6 text-white/60 sm:text-base">
                Drücke Generate. Die Produktionsansicht zeigt dir anschließend, wie aus dem
                Ausgangszustand ein fertiges Reel mit sichtbarem Fortschritt entsteht.
              </p>
              <p className="mt-5 max-w-xl rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-xs leading-5 text-white/55">
                <strong className="text-white/80">Visuelle Demo:</strong> Generate startet hier
                keinen echten Job und keinen Download. Du siehst den Ablauf anhand eines vorhandenen
                Golden-V1-Beispiels.
              </p>

              <button
                type="button"
                onClick={() => router.push("/kundenbereich/produktion")}
                className="mt-8 inline-flex items-center justify-center gap-2 rounded-xl bg-[#6d5dfc] px-7 py-4 text-sm font-black text-white shadow-[0_12px_32px_rgba(109,93,252,.25)] transition hover:bg-[#7d6eff]"
              >
                Generate <ArrowRight className="h-4 w-4" />
              </button>
            </div>

            <div className="rounded-[24px] border border-white/10 bg-white/[0.05] p-5">
              <div className="text-xs font-black uppercase tracking-[0.14em] text-white/45">Was du erhältst</div>
              <ul className="mt-4 space-y-3">
                {["Ein zusammenhängendes Reel", "Kontrollierte kreative Variation", "Keine Credits in der Demo"].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm font-semibold text-white/80">
                    <Check className="h-4 w-4 shrink-0 text-[#9b8fff]" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="mt-6 grid gap-3 sm:grid-cols-3">
          {BENEFITS.map(([value, label, Icon]) => (
            <div key={value} className="rounded-2xl border border-[#e4e1ec] bg-white p-5">
              <Icon className="h-5 w-5 text-[#6d5dfc]" />
              <div className="mt-4 text-xl font-black text-[#101114]">{value}</div>
              <div className="mt-1 text-xs leading-5 text-[#858991]">{label}</div>
            </div>
          ))}
        </section>

        <p className="mt-7 text-center text-xs leading-5 text-[#a1a5ab]">
          Studio-Vorschau: Der Generate-Button führt aktuell in die visuelle Produktionsdemo. Echte
          Kundenkonten, Jobs und Downloads werden in der nächsten Backend-Phase angebunden.
        </p>
      </div>
    </div>
  );
}
