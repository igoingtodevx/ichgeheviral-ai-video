"use client";

import React, { useMemo, useState } from "react";
import { ArrowRight, Eye, MousePointerClick, ShoppingBag, WalletCards } from "lucide-react";

const number = new Intl.NumberFormat("de-DE", { maximumFractionDigits: 0 });
const currency = new Intl.NumberFormat("de-DE", {
  style: "currency",
  currency: "EUR",
  maximumFractionDigits: 0,
});

function safeNumber(value: string) {
  const parsed = Number(value.replace(",", "."));
  return Number.isFinite(parsed) && parsed >= 0 ? parsed : 0;
}

function Field({
  label,
  value,
  onChange,
  suffix,
  icon: Icon,
}: {
  label: string;
  value: number;
  onChange: (value: number) => void;
  suffix?: string;
  icon: typeof Eye;
}) {
  return (
    <label className="block rounded-2xl border border-[#e7e3df] bg-white p-4 sm:p-5">
      <span className="mb-2.5 flex items-center gap-2 text-sm font-extrabold text-[#101114]">
        <Icon className="h-4 w-4 text-[#ff8600]" />
        {label}
      </span>
      <div className="relative">
        <input
          type="number"
          min="0"
          step={label === "Video-Aufrufe" ? "1000" : "0.1"}
          value={value}
          onChange={(event) => onChange(safeNumber(event.target.value))}
          className="w-full rounded-xl border border-[#ddd7d1] bg-[#fffaf4] px-4 py-3 pr-11 text-lg font-black text-[#101114] outline-none transition focus:border-[#ff8600] focus:ring-2 focus:ring-[#ff8600]/10"
        />
        {suffix && (
          <span className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-sm font-bold text-[#858991]">
            {suffix}
          </span>
        )}
      </div>
    </label>
  );
}

export function PotentialCalculator() {
  const [views, setViews] = useState(100000);
  const [ctr, setCtr] = useState(1.5);
  const [conversionRate, setConversionRate] = useState(3);
  const [valuePerConversion, setValuePerConversion] = useState(30);

  const result = useMemo(() => {
    const clicks = views * (ctr / 100);
    const conversions = clicks * (conversionRate / 100);
    return {
      clicks,
      conversions,
      revenue: conversions * valuePerConversion,
    };
  }, [views, ctr, conversionRate, valuePerConversion]);

  return (
    <section id="rechner" className="bg-[#f7f7f5] py-20 sm:py-24 lg:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <span className="text-xs font-black uppercase tracking-[0.18em] text-[#e97800]">
            Reichweiten-Rechner
          </span>
          <h2 className="mt-3 text-4xl font-black tracking-[-0.05em] text-[#101114] sm:text-5xl lg:text-6xl">
            Was können Views für dein Angebot bedeuten?
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-[#686c73] sm:text-lg">
            Spiele ein eigenes Szenario durch: Reichweite, Klickrate und Conversion bestimmen, wie viele Klicks und Käufe daraus rechnerisch entstehen könnten.
          </p>
        </div>

        <div className="mt-10 grid gap-5 lg:grid-cols-[1.08fr_.92fr] lg:gap-6">
          <div className="rounded-[26px] border border-[#e7e3df] bg-white p-5 shadow-[0_18px_60px_rgba(61,45,31,.07)] sm:p-7">
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Video-Aufrufe" value={views} onChange={setViews} icon={Eye} />
              <Field label="Klickrate (CTR)" value={ctr} onChange={setCtr} suffix="%" icon={MousePointerClick} />
              <Field label="Conversion-Rate" value={conversionRate} onChange={setConversionRate} suffix="%" icon={ShoppingBag} />
              <Field label="Wert pro Conversion" value={valuePerConversion} onChange={setValuePerConversion} suffix="€" icon={WalletCards} />
            </div>
            <p className="mt-4 text-xs leading-5 text-[#8a8e94]">
              Die Werte sind Beispielwerte und jederzeit frei änderbar.
            </p>
          </div>

          <div className="overflow-hidden rounded-[26px] bg-[#101114] p-6 text-white shadow-[0_22px_60px_rgba(16,17,20,.14)] sm:p-7">
            <span className="text-xs font-black uppercase tracking-[0.18em] text-[#ffad4d]">
              Deine Beispielrechnung
            </span>

            <div className="mt-6 space-y-3">
              <div className="flex items-center justify-between gap-4 rounded-2xl bg-white/[0.06] px-4 py-4">
                <span className="text-sm text-white/65">Geschätzte Klicks</span>
                <strong className="text-2xl font-black">{number.format(result.clicks)}</strong>
              </div>
              <div className="flex items-center justify-between gap-4 rounded-2xl bg-white/[0.06] px-4 py-4">
                <span className="text-sm text-white/65">Geschätzte Conversions</span>
                <strong className="text-2xl font-black">{number.format(result.conversions)}</strong>
              </div>
              <div className="rounded-2xl bg-[#ff8600] px-4 py-5 text-white">
                <div className="text-xs font-black uppercase tracking-[0.14em] text-white/75">
                  Rechnerischer Umsatz
                </div>
                <div className="mt-1 text-4xl font-black tracking-[-0.04em]">
                  {currency.format(result.revenue)}
                </div>
              </div>
            </div>

            <div className="mt-5 flex items-start gap-3 border-t border-white/10 pt-5 text-xs leading-5 text-white/55">
              <ArrowRight className="mt-0.5 h-4 w-4 shrink-0 text-[#ffad4d]" />
              <p>
                Reine Beispielrechnung, keine Verdienst- oder Reichweitengarantie. Tatsächliche Ergebnisse hängen unter anderem von Zielgruppe, Angebot, Plattform und Distribution ab.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
