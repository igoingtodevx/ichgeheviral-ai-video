"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { PACKAGES, PRICING_LAUNCHED, formatPrice } from "../lib/pricing";

export function Pricing() {
  return (
    <section id="preise" className="bg-white py-20 lg:py-28">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <span className="text-xs font-black uppercase tracking-[0.18em] text-[#e97800]">
            Preise &amp; Zugang
          </span>
          <h2 className="mt-3 text-4xl font-black tracking-[-0.05em] text-[#101114] sm:text-6xl">
            Kein Credit-System. Ein klarer Checkout.
          </h2>
          <p className="mt-5 text-[#686c73]">
            {PRICING_LAUNCHED
              ? "Wähle das passende Paket und starte direkt im sicheren Checkout."
              : "Die Pakete stehen fest. Die finalen Verkaufspreise werden zum Start veröffentlicht — bis dahin kannst du dir das Studio bereits ansehen."}
          </p>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {PACKAGES.map((pkg) => (
            <div
              key={pkg.id}
              className={
                pkg.highlight
                  ? "rounded-[24px] border-2 border-[#ffb45f] bg-[#fff8ef] p-7 sm:p-9"
                  : "rounded-[24px] border border-[#e7e3df] bg-white p-7 sm:p-9"
              }
            >
              <span
                className={
                  pkg.highlight
                    ? "text-xs font-black uppercase tracking-widest text-[#e97800]"
                    : "text-xs font-black uppercase tracking-widest text-[#686c73]"
                }
              >
                {pkg.addCourse ? "Mit Marketing-Kurs" : "AI-Video"}
              </span>
              <h3 className="mt-3 text-3xl font-black text-[#101114]">{pkg.name}</h3>
              <p className="mt-2 text-sm text-[#686c73]">{pkg.tagline}</p>

              <div className="mt-5 text-2xl font-black text-[#101114]">
                {formatPrice(pkg.priceEUR)}
              </div>

              <ul className="mt-6 space-y-3 text-sm text-[#4f555d]">
                {pkg.features.map((feature) => (
                  <li key={feature} className="flex gap-2">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#ff8600]" />
                    {feature}
                  </li>
                ))}
              </ul>

              <Link
                href="/kundenbereich"
                className={
                  pkg.highlight
                    ? "mt-8 flex items-center justify-center gap-2 rounded-xl bg-[#ff8600] px-6 py-4 text-sm font-black text-white transition hover:bg-[#e97800]"
                    : "mt-8 flex items-center justify-center gap-2 rounded-xl border border-[#e7e3df] bg-white px-6 py-4 text-sm font-black text-[#101114] transition hover:border-[#ffb45f]"
                }
              >
                Zum Studio <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
