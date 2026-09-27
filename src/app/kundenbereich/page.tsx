"use client";

import React, { FormEvent, useEffect, useState } from "react";
import { ArrowLeft, ArrowRight, Check, Loader2, LockKeyhole, ShieldCheck, Sparkles } from "lucide-react";
import { api } from "../../lib/api/client";

const presets = [
  "Verwilderter Hinterhof → moderne Luxus-Pooloase mit Travertin, Wasserfall und Pergola",
  "Mediterraner Garten → organischer Naturstein-Lagunenpool mit Spa und Palmen",
  "Schotterfläche → kompakte Design-Pooloase mit Pergola und Holzterrasse",
];

export default function KundenbereichPage() {
  const [concept, setConcept] = useState(presets[0]);
  const [addCourse, setAddCourse] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const checkoutEnabled = process.env.NEXT_PUBLIC_CHECKOUT_ENABLED === "true";

  useEffect(() => {
    const value = new URLSearchParams(window.location.search).get("concept");
    if (value) setConcept(value);
  }, []);

  async function startCheckout(e: FormEvent) {
    e.preventDefault();
    if (!checkoutEnabled || !concept.trim() || busy) return;
    setBusy(true);
    setError("");
    try {
      const checkout = await api.createCheckout({ concept: concept.trim(), add_course: addCourse });
      window.location.assign(checkout.checkout_url);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Checkout konnte nicht gestartet werden.");
      setBusy(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#f7f7f5] text-[#101114]">
      <header className="border-b border-[#e7e3df] bg-white"><div className="mx-auto flex h-[72px] max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8"><a href="/" className="text-xl font-black tracking-[-0.05em]">IchGehe<span className="text-[#ff8600]">Viral</span></a><a href="/" className="inline-flex items-center gap-2 text-sm font-bold text-[#686c73] hover:text-[#101114]"><ArrowLeft className="h-4 w-4"/> Zur Website</a></div></header>
      <main className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid gap-10 lg:grid-cols-[.75fr_1.25fr]">
          <aside>
            <span className="inline-flex rounded-full border border-[#ffd7a8] bg-[#fff8ef] px-3 py-2 text-[11px] font-black uppercase tracking-[0.14em] text-[#e97800]">Kundenbereich · Preview</span>
            <h1 className="mt-5 text-4xl font-black tracking-[-0.055em] sm:text-5xl">Starte dein nächstes Reel.</h1>
            <p className="mt-5 leading-7 text-[#686c73]">Hier sitzt der eigentliche Generator. Konzept festlegen, optional den Marketing-Kurs ergänzen und nach Preisfreigabe direkt in den sicheren Shopify-Checkout wechseln.</p>
            <div className="mt-8 space-y-4">{["Video-Konzept festlegen","Optionalen Marketing-Kurs hinzufügen","Sicher über Shopify bezahlen","Produktion startet nach bestätigter Bestellung"].map((x)=><div key={x} className="flex gap-3 text-sm text-[#4f555d]"><span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-[#fff0df]"><Check className="h-3.5 w-3.5 text-[#ff8600]"/></span>{x}</div>)}</div>
            <div className="mt-8 rounded-2xl border border-[#e7e3df] bg-white p-5 text-sm leading-6 text-[#686c73]"><b className="block text-[#101114]">Was hier noch folgt</b>Login, Projekt-Historie und Downloads werden ergänzt, sobald das Account-System aktiviert wird. Für den aktuellen Stand ist der Generator bewusst der Mittelpunkt.</div>
          </aside>
          <section className="rounded-[26px] border border-[#e0dbd5] bg-white p-6 shadow-[0_24px_70px_rgba(59,42,25,.08)] sm:p-9">
            <div className="flex items-center justify-between border-b border-[#eee9e4] pb-5"><div><span className="text-xs font-black uppercase tracking-widest text-[#e97800]">Neues Video</span><h2 className="mt-1 text-2xl font-black">Generator</h2></div><Sparkles className="h-7 w-7 text-[#ff8600]"/></div>
            <form onSubmit={startCheckout} className="mt-7 space-y-6">
              <div><label className="text-sm font-extrabold">Video-Konzept</label><textarea value={concept} onChange={(e)=>setConcept(e.target.value)} rows={6} className="mt-3 w-full resize-none rounded-2xl border border-[#ddd7d1] bg-[#fffaf4] p-4 text-sm leading-6 outline-none focus:border-[#ff8600]"/><div className="mt-3 flex flex-wrap gap-2">{presets.map((p,i)=><button key={p} type="button" onClick={()=>setConcept(p)} className="rounded-full border border-[#e7e3df] bg-white px-3 py-2 text-xs font-bold text-[#555a62] hover:border-[#ffb45f] hover:bg-[#fff8ef]">Vorlage {i+1}</button>)}</div></div>
              <label className="flex cursor-pointer items-start gap-3 rounded-2xl border border-[#e7e3df] bg-[#faf9f7] p-4"><input type="checkbox" checked={addCourse} onChange={(e)=>setAddCourse(e.target.checked)} className="mt-1 h-4 w-4 accent-[#ff8600]"/><span><b className="block text-sm">Marketing-Kurs hinzufügen</b><span className="mt-1 block text-xs leading-5 text-[#686c73]">Optional zusammen mit dem AI-Video bestellen.</span></span></label>
              {error && <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">{error}</div>}
              <div className="rounded-2xl bg-[#101114] p-5 text-white"><div className="flex items-center gap-2 text-sm font-bold">{checkoutEnabled ? <ShieldCheck className="h-5 w-5 text-[#ffad4d]"/> : <LockKeyhole className="h-5 w-5 text-[#ffad4d]"/>}{checkoutEnabled ? "Sicherer Shopify-Checkout" : "Checkout noch gesperrt"}</div><p className="mt-2 text-xs leading-5 text-white/65">{checkoutEnabled ? "Nach dem Klick wird dein Konzept gespeichert und du wechselst zum Shopify-Checkout." : "Die Shopify-Produkte sind vorbereitet, aber die öffentlichen Verkaufspreise wurden noch nicht final freigegeben. Deshalb bleibt der Checkout bis zur Preisfreigabe bewusst deaktiviert."}</p></div>
              <button type="submit" disabled={!checkoutEnabled || busy || !concept.trim()} className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#ff8600] px-6 py-4 text-sm font-black text-white shadow-[0_12px_30px_rgba(255,134,0,.24)] hover:bg-[#e97800] disabled:cursor-not-allowed disabled:bg-[#d8d2cb] disabled:shadow-none">{busy ? <><Loader2 className="h-4 w-4 animate-spin"/> Checkout wird erstellt…</> : checkoutEnabled ? <>Weiter zum Shopify-Checkout <ArrowRight className="h-4 w-4"/></> : <>Checkout folgt nach Preisfreigabe <LockKeyhole className="h-4 w-4"/></>}</button>
            </form>
          </section>
        </div>
      </main>
    </div>
  );
}
