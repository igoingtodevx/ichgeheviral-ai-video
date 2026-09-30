"use client";

import Link from "next/link";
import { useAuth } from "@clerk/nextjs";
import { ArrowRight, Check, Gauge, Layers3, Smartphone } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { api } from "../../../lib/api/client";
import { getPackage, PRICING_LAUNCHED } from "../../../lib/pricing";

const BENEFITS = [
  ["60+ Sek.", "fertiges vertikales Reel", Gauge],
  ["8 Szenen", "sichtbarer Aufbau bis zum Ergebnis", Layers3],
  ["9:16", "Short-Form-Format", Smartphone],
] as const;

export default function NewReelPage() {
  const searchParams = useSearchParams();
  const { getToken } = useAuth();
  const selected = searchParams.get("package") === "ai-video-course" ? "ai-video-course" : "ai-video";
  const pkg = getPackage(selected);
  const [starting, setStarting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function startCheckout() {
    if (!PRICING_LAUNCHED) return;
    setStarting(true);
    setError(null);
    try {
      const result = await api.createCheckout({
        concept: "Poolbau-Transformation mit sichtbarem Vorher-Nachher-Aufbau",
        package: "single",
        add_course: pkg.addCourse,
      }, getToken);
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
          <span className="text-xs font-black uppercase tracking-[0.18em] text-[#5d4de1]">Neues Transformations-Reel</span>
          <h1 className="mt-3 max-w-3xl text-4xl font-black tracking-[-0.055em] sm:text-6xl">Ein Auftrag. Ein fertiges Reel.</h1>
          <p className="mt-4 max-w-2xl text-sm leading-6 text-[#686c73] sm:text-base">Wähle deinen Umfang. Der Auftrag wird erst nach bestätigtem Checkout angelegt – diese Umgebung startet keine kostenpflichtige Inferenz.</p>
        </div>

        <section className="mt-9 overflow-hidden rounded-[30px] bg-[#17151f] text-white shadow-[0_24px_80px_rgba(23,21,31,.16)]">
          <div className="grid gap-8 p-6 sm:p-9 lg:grid-cols-[1fr_280px] lg:items-center lg:p-12">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-3 py-1.5 text-[11px] font-black uppercase tracking-[0.14em] text-[#c5beff]"><span className="h-2 w-2 rounded-full bg-[#8f82ff]" /> {pkg.name}</span>
              <h2 className="mt-5 max-w-xl text-3xl font-black tracking-[-0.04em] sm:text-4xl">{pkg.tagline}</h2>
              <p className="mt-4 max-w-xl text-sm leading-6 text-white/60 sm:text-base">{PRICING_LAUNCHED ? "Nach dem sicheren Checkout wird der Kaufstatus hier verifiziert." : "Checkout und Zahlung sind aktuell deaktiviert. Es wird kein Auftrag und kein Kauf erstellt."}</p>
              <button type="button" onClick={startCheckout} disabled={starting || !PRICING_LAUNCHED} className="mt-8 inline-flex items-center justify-center gap-2 rounded-xl bg-[#6d5dfc] px-7 py-4 text-sm font-black text-white shadow-[0_12px_32px_rgba(109,93,252,.25)] transition hover:bg-[#7d6eff] disabled:cursor-not-allowed disabled:opacity-60">
                {starting ? "Checkout wird geöffnet …" : PRICING_LAUNCHED ? "Sicher zum Checkout" : "Checkout derzeit deaktiviert"} <ArrowRight className="h-4 w-4" />
              </button>
              {error && <p className="mt-3 max-w-xl text-sm font-semibold text-[#ffb7b7]">{error}</p>}
              <p className="mt-3 text-xs font-semibold text-white/45">Der Kaufstatus wird ausschließlich vom Backend bestätigt; URL-Parameter sind kein Zahlungsnachweis.</p>
            </div>
            <div className="rounded-[24px] border border-white/10 bg-white/[0.05] p-5"><div className="text-xs font-black uppercase tracking-[0.14em] text-white/45">Im Paket</div><ul className="mt-4 space-y-3">{pkg.features.slice(0, 4).map((item) => <li key={item} className="flex items-start gap-2 text-sm font-semibold text-white/80"><Check className="mt-0.5 h-4 w-4 shrink-0 text-[#9b8fff]" />{item}</li>)}</ul></div>
          </div>
        </section>

        <div className="mt-6 flex flex-wrap gap-2" aria-label="Paket auswählen">
          <Link href="/kundenbereich/neu?package=ai-video" className={`rounded-full px-4 py-2 text-xs font-black ${selected === "ai-video" ? "bg-[#6d5dfc] text-white" : "border border-[#dedbe7] bg-white text-[#777b82]"}`}>Transformations-Reel</Link>
          <Link href="/kundenbereich/neu?package=ai-video-course" className={`rounded-full px-4 py-2 text-xs font-black ${selected === "ai-video-course" ? "bg-[#6d5dfc] text-white" : "border border-[#dedbe7] bg-white text-[#777b82]"}`}>Reel + Marketing-Kurs</Link>
        </div>
        <section className="mt-6 grid gap-3 sm:grid-cols-3">{BENEFITS.map(([value, label, Icon]) => <div key={value} className="rounded-2xl border border-[#e4e1ec] bg-white p-5"><Icon className="h-5 w-5 text-[#6d5dfc]" /><div className="mt-4 text-xl font-black text-[#101114]">{value}</div><div className="mt-1 text-xs leading-5 text-[#858991]">{label}</div></div>)}</section>
      </div>
    </div>
  );
}
