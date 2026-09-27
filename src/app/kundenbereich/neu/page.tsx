"use client";

import React, { FormEvent, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Check,
  Loader2,
  LockKeyhole,
  ShieldCheck,
} from "lucide-react";
import { api } from "../../../lib/api/client";
import { PRESET_CONCEPTS } from "../../../lib/constants";
import { PACKAGES, PRICING_LAUNCHED, formatPrice, type ProductPackage } from "../../../lib/pricing";

const STYLE_IMAGES: Record<string, string> = {
  "pool-travertin": "/media/states/run1/state_08.jpg",
  "finca-lagune": "/media/states/run2/state_08.jpg",
};

export default function NewReelPage() {
  const [presetId, setPresetId] = useState(PRESET_CONCEPTS[0].id);
  const [packageId, setPackageId] = useState<ProductPackage["id"]>("ai-video");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const checkoutEnabled = process.env.NEXT_PUBLIC_CHECKOUT_ENABLED === "true" && PRICING_LAUNCHED;
  const selectedPreset = PRESET_CONCEPTS.find((preset) => preset.id === presetId)!;
  const selectedPackage = PACKAGES.find((pkg) => pkg.id === packageId)!;

  async function startCheckout(e: FormEvent) {
    e.preventDefault();
    if (!checkoutEnabled || busy) return;
    setBusy(true);
    setError("");
    try {
      const checkout = await api.createCheckout({
        concept: selectedPreset.prompt,
        add_course: selectedPackage.addCourse,
      });
      window.location.assign(checkout.checkout_url);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Checkout konnte nicht gestartet werden.");
      setBusy(false);
    }
  }

  return (
    <div className="px-4 py-8 sm:px-6 lg:px-10 lg:py-10">
      <div className="mx-auto max-w-5xl">
        <div>
          <span className="text-xs font-black uppercase tracking-[0.18em] text-[#5d4de1]">
            Neues Pool-Reel
          </span>
          <h1 className="mt-3 text-4xl font-black tracking-[-0.055em] sm:text-5xl">
            Welcher Pool-Stil soll es werden?
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-[#686c73] sm:text-base">
            Kein Prompt, kein komplizierter Generator. Wähle eine freigegebene Pool-Variante und danach dein Paket.
          </p>
        </div>

        <form onSubmit={startCheckout} className="mt-8 space-y-7">
          <section className="rounded-[26px] border border-[#e4e1ec] bg-white p-5 shadow-[0_18px_60px_rgba(37,31,68,.06)] sm:p-7">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-black uppercase tracking-[0.14em] text-[#8a8e94]">Schritt 1</span>
                <h2 className="mt-1 text-xl font-black">Pool-Stil auswählen</h2>
              </div>
              <LockKeyhole className="h-6 w-6 text-[#6d5dfc]" />
            </div>

            <div className="mt-5 grid gap-4 md:grid-cols-2">
              {PRESET_CONCEPTS.map((preset) => {
                const selected = preset.id === presetId;
                return (
                  <button
                    key={preset.id}
                    type="button"
                    onClick={() => setPresetId(preset.id)}
                    aria-pressed={selected}
                    className={`overflow-hidden rounded-[20px] border-2 text-left transition ${
                      selected
                        ? "border-[#6d5dfc] bg-[#f7f5ff] shadow-[0_12px_35px_rgba(109,93,252,.10)]"
                        : "border-[#e4e1ec] bg-white hover:border-[#b9b0ff]"
                    }`}
                  >
                    <div className="relative aspect-[16/9] overflow-hidden bg-[#111]">
                      <Image
                        src={STYLE_IMAGES[preset.id]}
                        alt={preset.label}
                        fill
                        sizes="(min-width: 768px) 50vw, 100vw"
                        className="object-cover"
                      />
                      {selected && (
                        <span className="absolute right-3 top-3 grid h-8 w-8 place-items-center rounded-full bg-[#6d5dfc] text-white shadow-lg">
                          <Check className="h-4 w-4" />
                        </span>
                      )}
                    </div>
                    <div className="p-5">
                      <b className="text-base font-black text-[#101114]">{preset.label}</b>
                      <p className="mt-2 text-sm leading-6 text-[#686c73]">{preset.description}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </section>

          <section className="rounded-[26px] border border-[#e4e1ec] bg-white p-5 shadow-[0_18px_60px_rgba(37,31,68,.06)] sm:p-7">
            <span className="text-xs font-black uppercase tracking-[0.14em] text-[#8a8e94]">Schritt 2</span>
            <h2 className="mt-1 text-xl font-black">Paket wählen</h2>

            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {PACKAGES.map((pkg) => {
                const selected = pkg.id === packageId;
                return (
                  <button
                    key={pkg.id}
                    type="button"
                    onClick={() => setPackageId(pkg.id)}
                    aria-pressed={selected}
                    className={`rounded-2xl border-2 p-5 text-left transition ${
                      selected
                        ? "border-[#6d5dfc] bg-[#f7f5ff]"
                        : "border-[#e4e1ec] bg-white hover:border-[#b9b0ff]"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <b className="text-sm font-black">{pkg.name}</b>
                        <p className="mt-1 text-xs leading-5 text-[#686c73]">{pkg.tagline}</p>
                      </div>
                      {selected && <Check className="h-5 w-5 shrink-0 text-[#6d5dfc]" />}
                    </div>
                    <div className="mt-4 text-lg font-black text-[#101114]">{formatPrice(pkg.priceEUR)}</div>
                  </button>
                );
              })}
            </div>
          </section>

          <section className="grid gap-5 lg:grid-cols-[1fr_.85fr]">
            <div className="rounded-[26px] border border-[#e4e1ec] bg-white p-5 sm:p-7">
              <span className="text-xs font-black uppercase tracking-[0.14em] text-[#8a8e94]">Schritt 3</span>
              <h2 className="mt-1 text-xl font-black">Bestellübersicht</h2>
              <div className="mt-5 space-y-3 text-sm">
                <div className="flex justify-between gap-4 border-b border-[#efedf3] pb-3">
                  <span className="text-[#777b82]">Pool-Stil</span>
                  <b className="text-right">{selectedPreset.label}</b>
                </div>
                <div className="flex justify-between gap-4 border-b border-[#efedf3] pb-3">
                  <span className="text-[#777b82]">Paket</span>
                  <b className="text-right">{selectedPackage.name}</b>
                </div>
                <div className="flex justify-between gap-4">
                  <span className="text-[#777b82]">Preis</span>
                  <b className="text-right">{formatPrice(selectedPackage.priceEUR)}</b>
                </div>
              </div>
            </div>

            <div className="rounded-[26px] bg-[#17151f] p-5 text-white sm:p-7">
              <div className="flex items-center gap-2 text-sm font-black">
                {checkoutEnabled ? (
                  <ShieldCheck className="h-5 w-5 text-[#9b8fff]" />
                ) : (
                  <LockKeyhole className="h-5 w-5 text-[#9b8fff]" />
                )}
                {checkoutEnabled ? "Sicher bezahlen" : "Verkaufsstart in Vorbereitung"}
              </div>
              <p className="mt-3 text-xs leading-5 text-white/60">
                {checkoutEnabled
                  ? "Nach dem Klick wechselst du zum sicheren Shopify-Checkout."
                  : "Sobald die finalen Preise veröffentlicht sind, wird der Checkout hier freigeschaltet."}
              </p>

              {error && (
                <div className="mt-4 rounded-xl border border-red-400/30 bg-red-400/10 p-3 text-xs text-red-100">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={!checkoutEnabled || busy}
                className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-[#6d5dfc] px-5 py-4 text-sm font-black text-white transition hover:bg-[#7d6eff] disabled:cursor-not-allowed disabled:bg-white/15 disabled:text-white/45"
              >
                {busy ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" /> Checkout wird erstellt…
                  </>
                ) : checkoutEnabled ? (
                  <>
                    Weiter zur Bezahlung <ArrowRight className="h-4 w-4" />
                  </>
                ) : (
                  <>
                    Bestellung zum Verkaufsstart verfügbar <LockKeyhole className="h-4 w-4" />
                  </>
                )}
              </button>
            </div>
          </section>

          <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 text-[11px] font-semibold text-[#858991]">
            <Link href="/agb" className="hover:text-[#5d4de1]">AGB</Link>
            <Link href="/widerrufsrecht" className="hover:text-[#5d4de1]">Widerrufsrecht</Link>
            <Link href="/datenschutz" className="hover:text-[#5d4de1]">Datenschutz</Link>
            <Link href="/impressum" className="hover:text-[#5d4de1]">Impressum</Link>
            <Link href="/kontakt" className="hover:text-[#5d4de1]">Kontakt</Link>
          </div>
        </form>
      </div>
    </div>
  );
}
