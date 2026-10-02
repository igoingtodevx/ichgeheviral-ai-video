"use client";

import React, { useMemo, useState } from "react";

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
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-center text-4xl font-black tracking-[-0.05em] text-[#101114] sm:text-6xl">
          Was kann dein Format einbringen?
        </h2>

        <div className="mt-12 rounded-[26px] bg-[#17151f] p-6 text-white shadow-[0_22px_70px_rgba(23,21,31,.14)] sm:p-10">
          <div className="flex flex-col items-center gap-2 text-center sm:flex-row sm:flex-wrap sm:justify-center sm:gap-4">
            <output htmlFor="monthly-views" className="text-3xl font-black tracking-[-0.04em] sm:text-4xl">
              {formatViews(monthlyViews)} Views
            </output>
            <span className="text-base font-bold text-white/60 sm:text-lg">in einem Monat =</span>
            <span className="text-3xl font-black tracking-[-0.04em] text-[#b3a9ff] sm:text-4xl">
              {euroFormatter.format(estimatedMonthlyRevenue)}
            </span>
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
            className="mt-10 h-2 w-full cursor-pointer accent-[#6d5dfc]"
          />
          <p className="mt-6 text-center text-xs text-white/45">
            * Beispielrechnung mit {rpmFormatter.format(RPM_EUR)} € pro 1.000 Views, keine Garantie.
          </p>
        </div>
      </div>
    </section>
  );
}
