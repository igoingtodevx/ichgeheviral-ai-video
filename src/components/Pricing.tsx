"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { packageHref } from "../lib/business-config";

const PACKAGES = [
  {
    id: "starter",
    number: "Paket 1",
    name: "Starter",
    price: "49 €",
    videos: "4 KI-Building Videos",
    highlight: false,
  },
  {
    id: "premium-9",
    number: "Paket 2",
    name: "Premium",
    price: "99 €",
    videos: "9 KI-Building Videos",
    highlight: true,
  },
  {
    id: "premium-30",
    number: "Paket 3",
    name: "Premium",
    price: "297 €",
    videos: "30 KI-Building Videos",
    highlight: false,
  },
];

const FEATURES = [
  "Fertige KI-TikTok-Videos per Knopfdruck",
  "Viral optimierte Video-Konzepte",
  "60+ Sekunden Videolänge",
  "Hochformat 9:16",
  "Vollautomatische Erstellung",
  "Kein Videoschnitt nötig",
  "Kein Credit-System",
];

export function Pricing() {
  return (
    <section id="preise" className="scroll-mt-28 bg-white py-20 lg:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <span className="text-xs font-black uppercase tracking-[0.18em] text-[#5947e8]">
            Dein Einstieg
          </span>
          <h2 className="mt-3 text-4xl font-black tracking-[-0.05em] text-[#101114] sm:text-6xl">
            Dein Paket. Dein Content. Deine Chance.
          </h2>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {PACKAGES.map((pkg) => (
            <article
              key={`${pkg.price}-${pkg.name}`}
              className={
                pkg.highlight
                  ? "rounded-[24px] border-2 border-[#b9b0ff] bg-[#f7f5ff] p-7 shadow-[0_18px_55px_rgba(109,93,252,.12)] sm:p-8"
                  : "rounded-[24px] border border-[#e6e4ef] bg-white p-7 sm:p-8"
              }
            >
              <span className="text-xs font-black uppercase tracking-widest text-[#5947e8]">
                {pkg.number} · KI-TikTok Paket
              </span>
              <h3 className="mt-3 text-3xl font-black text-[#101114]">{pkg.name}</h3>
              <div className="mt-5 text-3xl font-black text-[#101114]">{pkg.price}</div>

              <p className="mt-5 text-sm leading-6 text-[#686c73]">
                Erstelle virale KI-Videos auf Knopfdruck und baue dir damit ein eigenes TikTok-Einkommen auf.
              </p>

              <ul className="mt-6 space-y-3 text-sm text-[#4f555d]">
                {[`${pkg.videos} mit maximalem Viral-Potenzial`, ...FEATURES].map((feature) => (
                  <li key={feature} className="flex gap-2">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#6d5dfc]" />
                    {feature}
                  </li>
                ))}
              </ul>

              <Link
                href={packageHref(pkg.id)}
                className={
                  pkg.highlight
                    ? "mt-8 flex items-center justify-center gap-2 rounded-xl bg-[#6d5dfc] px-6 py-4 text-sm font-black text-white transition hover:bg-[#5947e8]"
                    : "mt-8 flex items-center justify-center gap-2 rounded-xl border border-[#e6e4ef] bg-white px-6 py-4 text-sm font-black text-[#101114] transition hover:border-[#b9b0ff]"
                }
              >
                Jetzt generieren <ArrowRight className="h-4 w-4" />
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
