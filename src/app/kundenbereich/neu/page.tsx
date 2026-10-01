"use client";

import Link from "next/link";
import { useAuth } from "@clerk/nextjs";
import { ArrowRight, Check, Gauge, Layers3, Smartphone } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import { api } from "../../../lib/api/client";
import { formatPrice } from "../../../lib/pricing";
import { useBusinessConfig } from "../../../components/BusinessConfigProvider";
import { canCheckout, fetchPublicConfig, safeHttpUrl, type PackageId } from "../../../lib/business-config";
import { rememberPurchase } from "../../../lib/purchases";

const BENEFITS = [
  ["60+ Sek.", "monetarisierbare Videolänge", Gauge],
  ["8 Szenen", "sichtbarer KI-Baufortschritt", Layers3],
  ["9:16", "Short-Form-Format für TikTok", Smartphone],
] as const;

export default function NewReelPage() {
  return (
    <Suspense fallback={<div className="flex min-h-[55vh] items-center justify-center text-sm font-bold text-[#686c73]">Paket wird geladen …</div>}>
      <NewReelContent />
    </Suspense>
  );
}

function NewReelContent() {
  const searchParams = useSearchParams();
  const { getToken } = useAuth();
  const state = useBusinessConfig();
  const availablePackages = state.config.packages;
  const requested = searchParams.get("package");
  const selected: PackageId = (availablePackages.some((p) => p.id === requested)
    ? requested
    : availablePackages[0]?.id || "starter") as PackageId;
  const pkg = availablePackages.find((item) => item.id === selected) || availablePackages[0];
  const checkoutEnabled = canCheckout(state, pkg);
  const [starting, setStarting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function startCheckout() {
    if (!checkoutEnabled) return;
    setStarting(true);
    setError(null);
    try {
      // Recheck the live backend gate before posting; stale layouts cannot enable checkout.
      const fresh = await fetchPublicConfig("/api");
      const currentPackage = fresh.config.packages.find((item) => item.id === selected);
      if (!currentPackage || !canCheckout(fresh, currentPackage)) throw new Error("Der Checkout ist derzeit noch nicht freigeschaltet.");
      const result = await api.createCheckout({
        concept: "Virales KI-Building Video mit sichtbarem Baufortschritt bis zum fertigen Haus",
        package: currentPackage.id,
        add_course: currentPackage.add_course,
      }, getToken);
      try { rememberPurchase(window.sessionStorage, result.request_id); } catch { /* Storage access must not block checkout navigation. */ }
      if (!safeHttpUrl(result.checkout_url)) throw new Error("Das Checkoutziel ist ungültig.");
      window.location.assign(result.checkout_url);
    } catch (reason: unknown) {
      setError(reason instanceof Error ? reason.message : "Der Checkout konnte nicht gestartet werden.");
      setStarting(false);
    }
  }

  return (
    <div className="px-4 py-8 sm:px-6 lg:px-10 lg:py-10">
      <div className="mx-auto max-w-5xl">
        <div>
          <span className="text-xs font-black uppercase tracking-[0.18em] text-[#5d4de1]">Neues KI-Building-Video</span>
          <h1 className="mt-3 max-w-3xl text-4xl font-black tracking-[-0.055em] sm:text-6xl">Ein Klick. Dein fertiges Video.</h1>
          <p className="mt-4 max-w-2xl text-sm leading-6 text-[#686c73] sm:text-base">Wähle dein Paket. Dein KI-Building-Video wird vollautomatisch mit maximalem Viral-Potenzial erstellt – ohne Schnitt, direkt bereit für TikTok.</p>
        </div>

        <section className="mt-9 overflow-hidden rounded-[30px] bg-[#17151f] text-white shadow-[0_24px_80px_rgba(23,21,31,.16)]">
          <div className="grid gap-8 p-6 sm:p-9 lg:grid-cols-[1fr_280px] lg:items-center lg:p-12">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-3 py-1.5 text-[11px] font-black uppercase tracking-[0.14em] text-[#c5beff]"><span className="h-2 w-2 rounded-full bg-[#8f82ff]" /> {pkg.name}</span>
              <h2 className="mt-5 max-w-xl text-3xl font-black tracking-[-0.04em] sm:text-4xl">{pkg.tagline}</h2>
              <p className="mt-4 text-xl font-black">{formatPrice(pkg.price_eur)}</p>
              <p className="mt-4 max-w-xl text-sm leading-6 text-white/60 sm:text-base">{checkoutEnabled ? "Nach dem sicheren Checkout wird der Kaufstatus hier verifiziert." : "Vorschau — Die direkte Video-Erstellung wird in Kürze freigeschaltet. Derzeit sind noch keine Buchungen aktiv."}</p>
              <button type="button" onClick={startCheckout} disabled={starting || !checkoutEnabled} className="mt-8 inline-flex items-center justify-center gap-2 rounded-xl bg-[#6d5dfc] px-7 py-4 text-sm font-black text-white shadow-[0_12px_32px_rgba(109,93,252,.25)] transition hover:bg-[#7d6eff] disabled:cursor-not-allowed disabled:opacity-60">
                {starting ? "Checkout wird geöffnet …" : checkoutEnabled ? "Sicher zum Checkout" : "Vorschau — Noch nicht freigeschaltet"} <ArrowRight className="h-4 w-4" />
              </button>
              {error && <p className="mt-3 max-w-xl text-sm font-semibold text-[#ffb7b7]">{error}</p>}
              <p className="mt-3 text-xs font-semibold text-white/45">Der Kaufstatus wird ausschließlich vom Backend bestätigt; URL-Parameter sind kein Zahlungsnachweis.</p>
            </div>
            <div className="rounded-[24px] border border-white/10 bg-white/[0.05] p-5"><div className="text-xs font-black uppercase tracking-[0.14em] text-white/45">Im Paket</div><ul className="mt-4 space-y-3">{pkg.features.slice(0, 4).map((item) => <li key={item} className="flex items-start gap-2 text-sm font-semibold text-white/80"><Check className="mt-0.5 h-4 w-4 shrink-0 text-[#9b8fff]" />{item}</li>)}</ul></div>
          </div>
        </section>

        <div className="mt-6 flex flex-wrap gap-2" aria-label="Paket auswählen">
          {availablePackages.map((p) => (
            <Link
              key={p.id}
              href={`/kundenbereich/neu?package=${encodeURIComponent(p.id)}`}
              className={`rounded-full px-4 py-2 text-xs font-black transition ${
                selected === p.id
                  ? "bg-[#6d5dfc] text-white shadow-sm"
                  : "border border-[#dedbe7] bg-white text-[#777b82] hover:border-[#b9b0ff]"
              }`}
            >
              {p.name} · {p.tagline}
            </Link>
          ))}
        </div>
        <section className="mt-6 grid gap-3 sm:grid-cols-3">{BENEFITS.map(([value, label, Icon]) => <div key={value} className="rounded-2xl border border-[#e4e1ec] bg-white p-5"><Icon className="h-5 w-5 text-[#6d5dfc]" /><div className="mt-4 text-xl font-black text-[#101114]">{value}</div><div className="mt-1 text-xs leading-5 text-[#858991]">{label}</div></div>)}</section>
      </div>
    </div>
  );
}
