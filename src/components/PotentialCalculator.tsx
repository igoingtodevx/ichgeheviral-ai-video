"use client";

import React, { useMemo, useState } from "react";

const number = new Intl.NumberFormat("de-DE");

export function PotentialCalculator() {
  const [videos, setVideos] = useState(30);
  const [views, setViews] = useState(250000);

  const result = useMemo(() => ({
    total: videos * views,
    million: ((videos * views) / 1000000).toFixed(1),
  }), [videos, views]);

  return (
    <section id="rechner" className="bg-[#f7f7fb] py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <span className="text-xs font-black uppercase tracking-[0.18em] text-[#5947e8]">Viral-Rechner</span>
          <h2 className="mt-3 text-4xl font-black tracking-[-0.05em] sm:text-6xl">Was könnte dein Content erreichen?</h2>
          <p className="mt-5 text-[#686c73]">Spiele ein Szenario durch: mehr Videos, mehr Chancen auf Reichweite.</p>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          <div className="rounded-[26px] border border-[#e6e4ef] bg-white p-7">
            <label className="block text-sm font-black">Videos pro Monat</label>
            <input className="mt-4 w-full accent-[#6d5dfc]" type="range" min="1" max="60" value={videos} onChange={e => setVideos(Number(e.target.value))} />
            <div className="mt-2 text-3xl font-black">{videos}</div>

            <label className="mt-8 block text-sm font-black">Durchschnittliche Views pro Video</label>
            <input className="mt-4 w-full accent-[#6d5dfc]" type="range" min="10000" max="1000000" step="10000" value={views} onChange={e => setViews(Number(e.target.value))} />
            <div className="mt-2 text-3xl font-black">{number.format(views)}</div>
          </div>

          <div className="rounded-[26px] bg-[#101114] p-7 text-white">
            <div className="text-xs font-black uppercase tracking-[0.18em] text-[#9b8fff]">Potenzial</div>
            <div className="mt-5 text-5xl font-black">{result.million} Mio.</div>
            <div className="mt-2 text-white/60">mögliche Views pro Monat im Beispiel</div>

            <div className="mt-8 space-y-3 rounded-2xl bg-white/5 p-5">
              <div className="flex justify-between"><span className="text-white/60">Videos</span><b>{videos}</b></div>
              <div className="flex justify-between"><span className="text-white/60">Views/Video</span><b>{number.format(views)}</b></div>
              <div className="flex justify-between border-t border-white/10 pt-3"><span className="text-white/60">Gesamt</span><b>{number.format(result.total)}</b></div>
            </div>

            <p className="mt-5 text-xs leading-5 text-white/50">Beispielrechnung, keine Garantie. Tatsächliche Reichweite hängt von Plattform, Inhalt und Distribution ab.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
