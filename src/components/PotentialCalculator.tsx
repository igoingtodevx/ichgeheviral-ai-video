"use client";

import React, { useMemo, useState } from "react";
import { BarChart3, SlidersHorizontal } from "lucide-react";

// Matches the old IchGeheViral.de calculator: 30 uploads/month and nearest-25€ rounding.
const VIDEOS_PER_MONTH = 30;
const RPM_EUR = 1.5;
const MIN_VIEWS_PER_VIDEO = 5_000;
const MAX_VIEWS_PER_VIDEO = 500_000;
const VIEW_STEP = 5_000;
const DEFAULT_VIEWS_PER_VIDEO = 100_000;

const numberFormatter = new Intl.NumberFormat("de-DE");
const euroFormatter = new Intl.NumberFormat("de-DE", {
  style: "currency",
  currency: "EUR",
  maximumFractionDigits: 0,
});
const rpmFormatter = new Intl.NumberFormat("de-DE", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

function formatViews(value: number) {
  return numberFormatter.format(value);
}

export function PotentialCalculator() {
  const [viewsPerVideo, setViewsPerVideo] = useState(DEFAULT_VIEWS_PER_VIDEO);

  const result = useMemo(() => {
    const monthlyViews = viewsPerVideo * VIDEOS_PER_MONTH;
    const estimatedMonthlyRevenue = Math.round(((monthlyViews * RPM_EUR) / 1_000) / 25) * 25;
    return { monthlyViews, estimatedMonthlyRevenue };
  }, [viewsPerVideo]);

  return (
    <section id="rechner" className="bg-[#f7f7fb] py-20 lg:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <span className="text-xs font-black uppercase tracking-[0.18em] text-[#5947e8]">
            Transparenter Beispielrechner
          </span>
          <h2 className="mt-3 text-4xl font-black tracking-[-0.05em] text-[#101114] sm:text-6xl">
            Was kann dein Format einbringen?
          </h2>
          <p className="mt-5 text-base leading-7 text-[#686c73] sm:text-lg">
            Teste verschiedene Aufrufziele. Das Ergebnis ist eine nachvollziehbare Beispielrechnung —
            kein Einkommensversprechen.
          </p>
        </div>

        <div className="mt-12 grid gap-5 lg:grid-cols-[.9fr_1.1fr]">
          <div className="rounded-[26px] border border-[#e4e1ec] bg-white p-6 shadow-[0_18px_60px_rgba(37,31,68,.06)] sm:p-8">
            <div className="flex items-start justify-between gap-4">
              <div>
                <span className="text-xs font-black uppercase tracking-[0.14em] text-[#8a8e94]">
                  Szenario
                </span>
                <h3 className="mt-2 text-2xl font-black tracking-[-0.03em] text-[#101114]">
                  Ø Aufrufe pro Video
                </h3>
              </div>
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-[#f0edff] text-[#5d4de1]">
                <SlidersHorizontal className="h-5 w-5" />
              </span>
            </div>

            <div className="mt-8 rounded-2xl bg-[#faf9fd] p-5">
              <div className="flex items-baseline justify-between gap-3">
                <label htmlFor="views-per-video" className="text-sm font-bold text-[#686c73]">
                  Durchschnittliche Views
                </label>
                <output htmlFor="views-per-video" className="text-2xl font-black text-[#101114]">
                  {formatViews(viewsPerVideo)}
                </output>
              </div>
              <input
                id="views-per-video"
                type="range"
                min={MIN_VIEWS_PER_VIDEO}
                max={MAX_VIEWS_PER_VIDEO}
                step={VIEW_STEP}
                value={viewsPerVideo}
                onChange={(event) => setViewsPerVideo(Number(event.target.value))}
                aria-label={`Ø Aufrufe pro Video ${formatViews(viewsPerVideo)} Views`}
                aria-valuetext={`${formatViews(viewsPerVideo)} Views pro Video`}
                className="mt-6 h-2 w-full cursor-pointer accent-[#6d5dfc]"
              />
              <div className="mt-2 flex justify-between text-[11px] font-bold text-[#a1a5ab]">
                <span>{formatViews(MIN_VIEWS_PER_VIDEO)}</span>
                <span>{formatViews(MAX_VIEWS_PER_VIDEO)}</span>
              </div>
            </div>

            <div className="mt-5 flex items-center gap-3 border-t border-[#efedf3] pt-5 text-sm text-[#686c73]">
              <BarChart3 className="h-4 w-4 shrink-0 text-[#6d5dfc]" />
              <span>
                Beispiel bei <strong className="text-[#101114]">{VIDEOS_PER_MONTH} Videos / Monat</strong>
              </span>
            </div>
          </div>

          <div className="rounded-[26px] bg-[#17151f] p-6 text-white shadow-[0_22px_70px_rgba(23,21,31,.14)] sm:p-8">
            <div className="flex items-center justify-between gap-4">
              <span className="text-xs font-black uppercase tracking-[0.16em] text-[#9b8fff]">
                Deine Beispielrechnung
              </span>
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[11px] font-black text-white/60">
                {VIDEOS_PER_MONTH} Videos / Monat
              </span>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-white/[0.06] p-5">
                <div className="text-xs font-bold uppercase tracking-wider text-white/50">Views / Monat</div>
                <div className="mt-3 text-3xl font-black tracking-[-0.04em] sm:text-4xl">
                  {formatViews(result.monthlyViews)}
                </div>
                <div className="mt-2 text-xs text-white/45">{formatViews(viewsPerVideo)} × 30 Videos</div>
              </div>
              <div className="rounded-2xl border border-[#8f82ff]/35 bg-[#6d5dfc]/15 p-5">
                <div className="text-xs font-bold uppercase tracking-wider text-[#c5beff]">Umsatz-Schätzung</div>
                <div className="mt-3 text-3xl font-black tracking-[-0.04em] text-white sm:text-4xl">
                  ≈ {euroFormatter.format(result.estimatedMonthlyRevenue)}
                </div>
                <div className="mt-2 text-xs text-white/45">pro Monat · illustrative Rechnung</div>
              </div>
            </div>

            <p className="mt-7 border-t border-white/10 pt-5 text-xs leading-5 text-white/50">
              * Orientierung bei {VIDEOS_PER_MONTH} Videos/Monat und {rpmFormatter.format(RPM_EUR)} € RPM
              (pro 1.000 Views). Keine Garantie; Vergütung, qualifizierte Views, Region und
              Plattformregeln variieren.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
