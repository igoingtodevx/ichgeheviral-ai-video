"use client";

import React, { FormEvent, Suspense, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Loader2,
  LockKeyhole,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { api } from "../../lib/api/client";
import { PRESET_CONCEPTS } from "../../lib/constants";
import { PACKAGES, PRICING_LAUNCHED, formatPrice, type ProductPackage } from "../../lib/pricing";

const DELIVERABLE_FACTS = [
  "Vertikales 9:16 Format",
  "60+ Sekunden Laufzeit",
  "8 aufeinander aufbauende Phasen",
  "Fertiges MP4 zum Herunterladen",
];

function StudioForm() {
  const searchParams = useSearchParams();
  const conceptFromUrl = searchParams.get("concept");
  const [concept, setConcept] = useState(conceptFromUrl || PRESET_CONCEPTS[0].prompt);
  const [packageId, setPackageId] = useState<ProductPackage["id"]>("ai-video");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const checkoutEnabled = process.env.NEXT_PUBLIC_CHECKOUT_ENABLED === "true" && PRICING_LAUNCHED;
  const selectedPackage = PACKAGES.find((p) => p.id === packageId)!;

  async function startCheckout(e: FormEvent) {
    e.preventDefault();
    if (!checkoutEnabled || !concept.trim() || busy) return;
    setBusy(true);
    setError("");
    try {
      const checkout = await api.createCheckout({
        concept: concept.trim(),
        add_course: selectedPackage.addCourse,
      });
      window.location.assign(checkout.checkout_url);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Checkout konnte nicht gestartet werden.");
      setBusy(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#f7f7f5] text-[#101114]">
      <header className="border-b border-[#e7e3df] bg-white">
        <div className="mx-auto flex h-[72px] max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link href="/" className="text-xl font-black tracking-[-0.05em]">
            IchGehe<span className="text-[#ff8600]">Viral</span> <span className="text-[#a1a5ab]">Studio</span>
          </Link>
          <Link href="/" className="inline-flex items-center gap-2 text-sm font-bold text-[#686c73] hover:text-[#101114]">
            <ArrowLeft className="h-4 w-4" /> Zur Website
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid gap-10 lg:grid-cols-[.75fr_1.25fr]">
          {/* Left: context + what you get */}
          <aside>
            <span className="inline-flex rounded-full border border-[#ffd7a8] bg-[#fff8ef] px-3 py-2 text-[11px] font-black uppercase tracking-[0.14em] text-[#e97800]">
              Neues Video erstellen
            </span>
            <h1 className="mt-5 text-4xl font-black tracking-[-0.055em] sm:text-5xl">
              Starte dein nächstes Reel.
            </h1>
            <p className="mt-5 leading-7 text-[#686c73]">
              Beschreibe deine Idee, wähle dein Paket und wechsle danach zum sicheren Checkout.
              Die Produktion startet automatisch, sobald deine Bestellung bestätigt ist.
            </p>

            <div className="mt-8 rounded-2xl border border-[#e7e3df] bg-white p-5">
              <b className="text-sm font-black uppercase tracking-wider text-[#101114]">Was du bekommst</b>
              <ul className="mt-4 space-y-3">
                {DELIVERABLE_FACTS.map((fact) => (
                  <li key={fact} className="flex gap-3 text-sm text-[#4f555d]">
                    <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-[#fff0df]">
                      <Check className="h-3.5 w-3.5 text-[#ff8600]" />
                    </span>
                    {fact}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-6 space-y-3">
              {[
                "1. Video-Konzept festlegen",
                "2. Paket wählen",
                "3. Sicher über Shopify bezahlen",
                "4. Produktion startet nach bestätigter Bestellung",
              ].map((step) => (
                <div key={step} className="flex gap-3 text-sm text-[#4f555d]">
                  <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-[#f0eee9] text-xs font-black text-[#686c73]">
                    {step.charAt(0)}
                  </span>
                  {step.slice(3)}
                </div>
              ))}
            </div>

            <div className="mt-8 rounded-2xl border border-[#e7e3df] bg-white p-5 text-sm leading-6 text-[#686c73]">
              <b className="block text-[#101114]">Tipp für ein besseres Ergebnis</b>
              Beschreibe Ausgangszustand und Wunsch-Ergebnis möglichst konkret. Je klarer Material, Stil und Zielbild sind, desto eindeutiger kann die Transformation aufgebaut werden.
            </div>
          </aside>

          {/* Right: the actual wizard */}
          <section className="rounded-[26px] border border-[#e0dbd5] bg-white p-6 shadow-[0_24px_70px_rgba(59,42,25,.08)] sm:p-9">
            <div className="flex items-center justify-between border-b border-[#eee9e4] pb-5">
              <div>
                <span className="text-xs font-black uppercase tracking-widest text-[#e97800]">Schritt 1–3</span>
                <h2 className="mt-1 text-2xl font-black">Video-Generator</h2>
              </div>
              <Sparkles className="h-7 w-7 text-[#ff8600]" />
            </div>

            <form onSubmit={startCheckout} className="mt-7 space-y-8">
              {/* Step 1: concept */}
              <div>
                <label className="text-sm font-extrabold">1. Was soll transformiert werden?</label>
                <p className="mt-1 text-xs leading-5 text-[#a1a5ab]">
                  Beschreibe kurz den Ausgangszustand und das gewünschte Endergebnis.
                </p>
                <textarea
                  value={concept}
                  onChange={(e) => setConcept(e.target.value)}
                  rows={5}
                  className="mt-3 w-full resize-none rounded-2xl border border-[#ddd7d1] bg-[#fffaf4] p-4 text-sm leading-6 outline-none focus:border-[#ff8600]"
                />
                <div className="mt-3 flex flex-wrap gap-2">
                  {PRESET_CONCEPTS.map((preset) => (
                    <button
                      key={preset.id}
                      type="button"
                      onClick={() => setConcept(preset.prompt)}
                      className="rounded-full border border-[#e7e3df] bg-white px-3 py-2 text-xs font-bold text-[#555a62] hover:border-[#ffb45f] hover:bg-[#fff8ef]"
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 2: package */}
              <div>
                <label className="text-sm font-extrabold">2. Paket wählen</label>
                <div className="mt-3 grid gap-3 sm:grid-cols-2">
                  {PACKAGES.map((pkg) => {
                    const selected = pkg.id === packageId;
                    return (
                      <button
                        key={pkg.id}
                        type="button"
                        onClick={() => setPackageId(pkg.id)}
                        className={`rounded-2xl border-2 p-4 text-left transition ${
                          selected ? "border-[#ff8600] bg-[#fff8ef]" : "border-[#e7e3df] bg-white hover:border-[#ffb45f]"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <b className="text-sm font-black">{pkg.name}</b>
                          {selected && <Check className="h-4 w-4 text-[#ff8600]" />}
                        </div>
                        <p className="mt-1 text-xs leading-5 text-[#686c73]">{pkg.tagline}</p>
                        <div className="mt-3 text-sm font-black text-[#101114]">{formatPrice(pkg.priceEUR)}</div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Step 3: summary + checkout */}
              <div>
                <label className="text-sm font-extrabold">3. Bestellübersicht</label>
                <div className="mt-3 rounded-2xl border border-[#e7e3df] bg-[#faf9f7] p-4 text-sm text-[#4f555d]">
                  <div className="flex justify-between"><span>Paket</span><b className="text-[#101114]">{selectedPackage.name}</b></div>
                  <div className="mt-2 flex justify-between"><span>Preis</span><b className="text-[#101114]">{formatPrice(selectedPackage.priceEUR)}</b></div>
                </div>
              </div>

              {error && <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">{error}</div>}

              <div className="rounded-2xl bg-[#101114] p-5 text-white">
                <div className="flex items-center gap-2 text-sm font-bold">
                  {checkoutEnabled ? <ShieldCheck className="h-5 w-5 text-[#ffad4d]" /> : <LockKeyhole className="h-5 w-5 text-[#ffad4d]" />}
                  {checkoutEnabled ? "Sicher bezahlen" : "Verkaufsstart in Vorbereitung"}
                </div>
                <p className="mt-2 text-xs leading-5 text-white/65">
                  {checkoutEnabled
                    ? "Nach dem Klick wird dein Konzept übernommen und du wechselst zur sicheren Bezahlung."
                    : "Sobald die finalen Preise veröffentlicht sind, kannst du deine Bestellung hier direkt abschließen."}
                </p>
              </div>

              <button
                type="submit"
                disabled={!checkoutEnabled || busy || !concept.trim()}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#ff8600] px-6 py-4 text-sm font-black text-white shadow-[0_12px_30px_rgba(255,134,0,.24)] transition hover:bg-[#e97800] disabled:cursor-not-allowed disabled:bg-[#d8d2cb] disabled:shadow-none"
              >
                {busy ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" /> Checkout wird erstellt…
                  </>
                ) : checkoutEnabled ? (
                  <>
                    Weiter zur sicheren Bezahlung <ArrowRight className="h-4 w-4" />
                  </>
                ) : (
                  <>
                    Bestellung zum Verkaufsstart verfügbar <LockKeyhole className="h-4 w-4" />
                  </>
                )}
              </button>

              <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 text-[11px] font-semibold text-[#858991]">
                <Link href="/agb" className="hover:text-[#e97800]">AGB</Link>
                <Link href="/widerrufsrecht" className="hover:text-[#e97800]">Widerrufsrecht</Link>
                <Link href="/datenschutz" className="hover:text-[#e97800]">Datenschutz</Link>
                <Link href="/impressum" className="hover:text-[#e97800]">Impressum</Link>
              </div>
            </form>
          </section>
        </div>
      </main>
    </div>
  );
}

export default function StudioPage() {
  return (
    <Suspense fallback={null}>
      <StudioForm />
    </Suspense>
  );
}