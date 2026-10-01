"use client";

import React, { useMemo, useState } from "react";
import { BarChart3, SlidersHorizontal } from "lucide-react";

const RPM_EUR = 1.5;
const MIN_MONTHLY_VIEWS = 100_000;
const MAX_MONTHLY_VIEWS = 10_000_000;
const VIEW_STEP = 100_000;
const DEFAULT_MONTHLY_VIEWS = 3_000_000;

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
  const [monthlyViews, setMonthlyViews] = useState(DEFAULT_MONTHLY_VIEWS);

  const estimatedMonthlyRevenue = useMemo(
    () => Math.round(((monthlyViews * RPM_EUR) / 1_000) / 25) * 25,
    [monthlyViews]
  );

  return (
    <section id="rechner" className="scroll-mt-28 bg-[#f7f7fb] py-20 lg:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <span className="text-xs font-black uppercase tracking-[0.18em] text-[#5947e8]">
            Transparenter Beispielrechner
          </span>
          <h2 className="mt-3 text-4xl font-black tracking-[-0.05em] text-[#101114] sm:text-6xl">
            Was kann dein Format einbringen?
          </h2>
          <p className="mt-5 text-base leading-7 text-[#686c73] sm:text-lg">
            Gib deine monatlichen Views ein. Das Ergebnis ist eine nachvollziehbare Beispielrechnung –
            kein Einkommensversprechen.
          </p>
        </div>

        <div className="mx-auto mt-12 grid max-w-5xl gap-5 lg:grid-cols-[.9fr_1.1fr]">
          <div className="rounded-[26px] border border-[#e4e1ec] bg-white p-6 shadow-[0_18px_60px_rgba(37,31,68,.06)] sm:p-8">
            <div className="flex items-start justify-between gap-4">
              <div>
                <span className="text-xs font-black uppercase tracking-[0.14em] text-[#8a8e94]">
                  Szenario
                </span>
                <h3 className="mt-2 text-2xl font-black tracking-[-0.03em] text-[#101114]">
                  Views in einem Monat
                </h3>
              </div>
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-[#f0edff] text-[#5d4de1]">
                <SlidersHorizontal className="h-5 w-5" />
              </span>
            </div>

            <div className="mt-8 rounded-2xl bg-[#faf9fd] p-5">
              <div className="flex flex-wrap items-baseline justify-between gap-3">
                <label htmlFor="monthly-views" className="text-sm font-bold text-[#686c73]">
                  Durchschnittliche Views / Monat
                </label>
                <output htmlFor="monthly-views" className="text-2xl font-black text-[#101114]">
                  {formatViews(monthlyViews)}
                </output>
              </div>
              <input
                id="monthly-views"
                type="range"
                min={MIN_MONTHLY_VIEWS}
                max={MAX_MONTHLY_VIEWS}
                step={VIEW_STEP}
                value={monthlyViews}
                onChange={(event) => setMonthlyViews(Number(event.target.value))}
                aria-label={`Monatliche Views ${formatViews(monthlyViews)}`}
                aria-valuetext={`${formatViews(monthlyViews)} Views im Monat`}
                className="mt-6 h-2 w-full cursor-pointer accent-[#6d5dfc]"
              />
              <div className="mt-2 flex justify-between text-[11px] font-bold text-[#a1a5ab]">
                <span>{formatViews(MIN_MONTHLY_VIEWS)}</span>
                <span>{formatViews(MAX_MONTHLY_VIEWS)}</span>
              </div>
            </div>

            <div className="mt-5 flex min-w-0 items-start gap-3 border-t border-[#efedf3] pt-5 text-sm text-[#686c73]">
              <BarChart3 className="h-4 w-4 shrink-0 text-[#6d5dfc]" />
              <span className="min-w-0 break-words">
                Direkte Beispielrechnung: <strong className="text-[#101114]">Views / Monat × RPM</strong>
              </span>
            </div>
          </div>

          <div className="rounded-[26px] bg-[#17151f] p-6 text-white shadow-[0_22px_70px_rgba(23,21,31,.14)] sm:p-8">
            <span className="text-xs font-black uppercase tracking-[0.16em] text-[#9b8fff]">
              Deine Beispielrechnung
            </span>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-white/[0.06] p-5">
                <div className="text-xs font-bold uppercase tracking-wider text-white/50">Views / Monat</div>
                <div className="mt-3 text-3xl font-black tracking-[-0.04em] sm:text-4xl">
                  {formatViews(monthlyViews)}
                </div>
              </div>
              <div className="rounded-2xl border border-[#8f82ff]/35 bg-[#6d5dfc]/15 p-5">
                <div className="text-xs font-bold uppercase tracking-wider text-[#c5beff]">Euro-Beispiel</div>
                <div className="mt-3 text-3xl font-black tracking-[-0.04em] text-white sm:text-4xl">
                  ≈ {euroFormatter.format(estimatedMonthlyRevenue)}
                </div>
              </div>
            </div>

            <p className="mt-7 border-t border-white/10 pt-5 text-sm leading-6 text-white/70">
              * Orientierung mit {rpmFormatter.format(RPM_EUR)} € RPM (pro 1.000 Views). Keine Garantie;
              Vergütung, qualifizierte Views, Region und Plattformregeln variieren.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
