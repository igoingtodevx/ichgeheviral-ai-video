"use client";

import React, { useMemo, useState } from "react";
import { CalendarDays, Eye, Film } from "lucide-react";
import type { LucideIcon } from "lucide-react";

const number = new Intl.NumberFormat("de-DE", { maximumFractionDigits: 0 });

function safeNumber(value: string, minimum: number) {
  const parsed = Number(value.replace(",", "."));
  return Number.isFinite(parsed) ? Math.max(minimum, parsed) : minimum;
}

function NumberField({
  label,
  value,
  onChange,
  suffix,
  icon: Icon,
  step,
  min,
}: {
  label: string;
  value: number;
  onChange: (value: number) => void;
  suffix?: string;
  icon: LucideIcon;
  step: number;
  min: number;
}) {
  return (
    <label className="block rounded-2xl border border-[#e6e4ef] bg-white p-4 sm:p-5">
      <span className="mb-2.5 flex items-center gap-2 text-sm font-extrabold text-[#101114]">
        <Icon className="h-4 w-4 text-[#6d5dfc]" />
        {label}
      </span>
      <div className="relative">
        <input
          type="number"
          min={min}
          step={step}
          value={value}
          onChange={(event) => onChange(safeNumber(event.target.value, min))}
          className="w-full rounded-xl border border-[#dddbe7] bg-[#faf9ff] px-4 py-3 pr-11 text-lg font-black text-[#101114] outline-none transition focus:border-[#6d5dfc] focus:ring-2 focus:ring-[#6d5dfc]/10"
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
  const [videosPerMonth, setVideosPerMonth] = useState(4);
  const [viewsPerVideo, setViewsPerVideo] = useState(25000);
  const [platform, setPlatform] = useState("TikTok");

  const result = useMemo(() => {
    const monthlyViews = videosPerMonth * viewsPerVideo;
    const annualViews = monthlyViews * 12;
    const annualVideos = videosPerMonth * 12;
    const cadence =
      videosPerMonth >= 12
        ? "Hohe Veröffentlichungsfrequenz"
        : videosPerMonth >= 4
          ? "Konstante Veröffentlichungsfrequenz"
          : "Kompakte Testfrequenz";

    return { monthlyViews, annualViews, annualVideos, cadence };
  }, [videosPerMonth, viewsPerVideo]);

  return (
    <section id="rechner" className="bg-[#f7f7fb] py-20 sm:py-24 lg:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <span className="text-xs font-black uppercase tracking-[0.18em] text-[#5947e8]">
            Potenzial-Rechner
          </span>
          <h2 className="mt-3 text-4xl font-black tracking-[-0.05em] text-[#101114] sm:text-5xl lg:text-6xl">
            Wie viel Content steckt in deinem Rhythmus?
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-[#686c73] sm:text-lg">
            Spiele mit Veröffentlichungsfrequenz und durchschnittlichen Views pro Reel. Die Rechnung zeigt ein einfaches Szenario — keine Prognose.
          </p>
        </div>

        <div className="mt-10 grid gap-5 lg:grid-cols-[1.08fr_.92fr] lg:gap-6">
          <div className="rounded-[26px] border border-[#e6e4ef] bg-white p-5 shadow-[0_18px_60px_rgba(61,45,31,.07)] sm:p-7">
            <div className="grid gap-4 sm:grid-cols-2">
              <NumberField
                label="Videos pro Monat"
                value={videosPerMonth}
                onChange={setVideosPerMonth}
                suffix="Reels"
                icon={Film}
                min={1}
                step={1}
              />
              <NumberField
                label="Durchschnittliche Views pro Video"
                value={viewsPerVideo}
                onChange={setViewsPerVideo}
                icon={Eye}
                min={0}
                step={1000}
              />
              <label className="block rounded-2xl border border-[#e6e4ef] bg-white p-4 sm:col-span-2 sm:p-5">
                <span className="mb-2.5 flex items-center gap-2 text-sm font-extrabold text-[#101114]">
                  <CalendarDays className="h-4 w-4 text-[#6d5dfc]" />
                  Plattform <span className="font-medium text-[#8a8e94]">(optional)</span>
                </span>
                <select
                  value={platform}
                  onChange={(event) => setPlatform(event.target.value)}
                  className="w-full rounded-xl border border-[#dddbe7] bg-[#faf9ff] px-4 py-3 text-base font-black text-[#101114] outline-none transition focus:border-[#6d5dfc] focus:ring-2 focus:ring-[#6d5dfc]/10"
                >
                  <option>TikTok</option>
                  <option>Instagram Reels</option>
                  <option>YouTube Shorts</option>
                  <option>Plattformübergreifend</option>
                </select>
              </label>
            </div>
            <p className="mt-4 text-xs leading-5 text-[#8a8e94]">
              Die Plattform ändert die Rechnung nicht. Sie hilft dir, das Szenario auf deinen Veröffentlichungsplan zu beziehen.
            </p>
          </div>

          <div className="overflow-hidden rounded-[26px] bg-[#101114] p-6 text-white shadow-[0_22px_60px_rgba(16,17,20,.14)] sm:p-7">
            <span className="text-xs font-black uppercase tracking-[0.18em] text-[#9b8fff]">
              Dein Beispielszenario
            </span>
            <p className="mt-2 text-sm text-white/55">{platform} · {videosPerMonth} Videos pro Monat</p>

            <div className="mt-6 space-y-3">
              <div className="flex items-center justify-between gap-4 rounded-2xl bg-white/[0.06] px-4 py-4">
                <span className="text-sm text-white/65">Monatliche Views</span>
                <strong className="text-2xl font-black">{number.format(result.monthlyViews)}</strong>
              </div>
              <div className="flex items-center justify-between gap-4 rounded-2xl bg-white/[0.06] px-4 py-4">
                <span className="max-w-[12rem] text-sm text-white/65">Gesamtreichweite bei gleicher Frequenz (12 Monate)</span>
                <strong className="text-right text-2xl font-black">{number.format(result.annualViews)}</strong>
              </div>
              <div className="rounded-2xl bg-[#6d5dfc] px-4 py-5 text-white">
                <div className="text-xs font-black uppercase tracking-[0.14em] text-white/75">
                  Content-Potenzial
                </div>
                <div className="mt-1 text-3xl font-black tracking-[-0.04em]">
                  {number.format(result.annualVideos)} Reels / Jahr
                </div>
                <div className="mt-1 text-sm font-semibold text-white/75">{result.cadence}</div>
              </div>
            </div>

            <div className="mt-5 border-t border-white/10 pt-5 text-xs leading-5 text-white/55">
              Beispielrechnung, keine Garantie für Reichweite oder Einnahmen.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
