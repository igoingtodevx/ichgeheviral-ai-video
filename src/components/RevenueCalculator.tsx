"use client";

import React, { useMemo, useState } from "react";
import { Calculator, Eye, MousePointerClick, ShoppingCart, WalletCards } from "lucide-react";

const numberFormatter = new Intl.NumberFormat("de-DE", {
  maximumFractionDigits: 0,
});

const currencyFormatter = new Intl.NumberFormat("de-DE", {
  style: "currency",
  currency: "EUR",
  maximumFractionDigits: 0,
});

function safeNumber(value: string, fallback = 0) {
  const parsed = Number(value.replace(",", "."));
  return Number.isFinite(parsed) && parsed >= 0 ? parsed : fallback;
}

export function RevenueCalculator() {
  const [views, setViews] = useState(100000);
  const [clickRate, setClickRate] = useState(1.5);
  const [conversionRate, setConversionRate] = useState(3);
  const [valuePerConversion, setValuePerConversion] = useState(30);

  const results = useMemo(() => {
    const clicks = views * (clickRate / 100);
    const conversions = clicks * (conversionRate / 100);
    const revenue = conversions * valuePerConversion;

    return { clicks, conversions, revenue };
  }, [views, clickRate, conversionRate, valuePerConversion]);

  return (
    <section id="potential-rechner" className="relative overflow-hidden py-20 lg:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 max-w-3xl sm:mb-12">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-violet-500/35 bg-violet-950/50 px-3.5 py-1.5 text-xs font-mono font-bold uppercase tracking-widest text-violet-300">
            <Calculator className="h-3.5 w-3.5" />
            <span>Potenzial-Rechner</span>
          </div>

          <h2 className="mb-4 text-3xl font-extrabold tracking-tight text-white sm:text-5xl">
            Was können Reichweite und Klicks bedeuten?
          </h2>
          <p className="max-w-2xl text-base leading-relaxed text-slate-300 sm:text-lg">
            Spiele dein eigenes Szenario durch. Du bestimmst Reichweite, Klickrate, Conversion-Rate und den Wert einer Conversion.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="glass-panel rounded-3xl p-6 shadow-2xl sm:p-8">
            <div className="grid gap-5 sm:grid-cols-2">
              <label className="block">
                <span className="mb-2 flex items-center gap-2 text-sm font-semibold text-white">
                  <Eye className="h-4 w-4 text-violet-400" />
                  Video-Aufrufe
                </span>
                <input
                  type="number"
                  min="0"
                  step="1000"
                  value={views}
                  onChange={(event) => setViews(safeNumber(event.target.value))}
                  className="w-full rounded-xl border border-white/12 bg-black/30 px-4 py-3 text-base font-semibold text-white outline-none transition focus:border-violet-500/60 focus:ring-2 focus:ring-violet-500/15"
                />
              </label>

              <label className="block">
                <span className="mb-2 flex items-center gap-2 text-sm font-semibold text-white">
                  <MousePointerClick className="h-4 w-4 text-sky-400" />
                  Klickrate (CTR)
                </span>
                <div className="relative">
                  <input
                    type="number"
                    min="0"
                    step="0.1"
                    value={clickRate}
                    onChange={(event) => setClickRate(safeNumber(event.target.value))}
                    className="w-full rounded-xl border border-white/12 bg-black/30 px-4 py-3 pr-10 text-base font-semibold text-white outline-none transition focus:border-violet-500/60 focus:ring-2 focus:ring-violet-500/15"
                  />
                  <span className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-sm text-slate-400">%</span>
                </div>
              </label>

              <label className="block">
                <span className="mb-2 flex items-center gap-2 text-sm font-semibold text-white">
                  <ShoppingCart className="h-4 w-4 text-emerald-400" />
                  Conversion-Rate
                </span>
                <div className="relative">
                  <input
                    type="number"
                    min="0"
                    step="0.1"
                    value={conversionRate}
                    onChange={(event) => setConversionRate(safeNumber(event.target.value))}
                    className="w-full rounded-xl border border-white/12 bg-black/30 px-4 py-3 pr-10 text-base font-semibold text-white outline-none transition focus:border-violet-500/60 focus:ring-2 focus:ring-violet-500/15"
                  />
                  <span className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-sm text-slate-400">%</span>
                </div>
              </label>

              <label className="block">
                <span className="mb-2 flex items-center gap-2 text-sm font-semibold text-white">
                  <WalletCards className="h-4 w-4 text-amber-400" />
                  Wert pro Conversion
                </span>
                <div className="relative">
                  <input
                    type="number"
                    min="0"
                    step="1"
                    value={valuePerConversion}
                    onChange={(event) => setValuePerConversion(safeNumber(event.target.value))}
                    className="w-full rounded-xl border border-white/12 bg-black/30 px-4 py-3 pr-10 text-base font-semibold text-white outline-none transition focus:border-violet-500/60 focus:ring-2 focus:ring-violet-500/15"
                  />
                  <span className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-sm text-slate-400">€</span>
                </div>
              </label>
            </div>

            <p className="mt-5 text-xs leading-relaxed text-slate-500">
              Beispielwerte sind vorausgefüllt und frei änderbar.
            </p>
          </div>

          <div className="relative overflow-hidden rounded-3xl border border-violet-500/35 bg-gradient-to-br from-[#17112f] via-[#0e0b1e] to-[#080611] p-6 shadow-2xl sm:p-8">
            <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-violet-600/20 blur-3xl" />

            <div className="relative">
              <span className="text-xs font-mono font-bold uppercase tracking-[0.18em] text-violet-300">
                Beispiel-Ergebnis
              </span>

              <div className="mt-6 grid gap-3">
                <div className="rounded-2xl border border-white/10 bg-white/[0.05] p-4">
                  <div className="text-xs font-mono uppercase tracking-wider text-slate-400">Geschätzte Klicks</div>
                  <div className="mt-1 text-3xl font-black tracking-tight text-white">
                    {numberFormatter.format(results.clicks)}
                  </div>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/[0.05] p-4">
                  <div className="text-xs font-mono uppercase tracking-wider text-slate-400">Geschätzte Conversions</div>
                  <div className="mt-1 text-3xl font-black tracking-tight text-white">
                    {numberFormatter.format(results.conversions)}
                  </div>
                </div>

                <div className="rounded-2xl border border-emerald-400/30 bg-emerald-500/10 p-4">
                  <div className="text-xs font-mono uppercase tracking-wider text-emerald-300">Rechnerischer Umsatz</div>
                  <div className="mt-1 text-4xl font-black tracking-tight text-white">
                    {currencyFormatter.format(results.revenue)}
                  </div>
                </div>
              </div>

              <div className="mt-5 text-xs leading-relaxed text-slate-400">
                Reine Beispielrechnung. IchGeheViral garantiert weder Reichweite, Klickrate, Conversions noch Einnahmen. Tatsächliche Ergebnisse hängen unter anderem von Zielgruppe, Angebot, Plattform und Distribution ab.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
