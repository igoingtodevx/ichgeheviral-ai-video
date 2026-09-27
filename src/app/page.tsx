"use client";

import React, { FormEvent, useEffect, useMemo, useState } from "react";
import { ArrowRight, Check, Eye, MousePointerClick, Play, ShoppingCart, Sparkles, WalletCards, Zap } from "lucide-react";
import { fetchSocialProof, socialProofMediaUrl, type SocialProofItem } from "../lib/socialProof";

function LightSocialProof() {
  const [items, setItems] = useState<SocialProofItem[]>([]);
  useEffect(() => {
    fetchSocialProof(6, 0).then((page) => setItems(page.items)).catch(() => undefined);
  }, []);
  if (!items.length) return null;
  return (
    <section id="ergebnisse" className="bg-[#f7f7f5] py-20 lg:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <span className="text-xs font-black uppercase tracking-[0.18em] text-[#e97800]">Echte Ergebnisse</span>
          <h2 className="mt-3 text-4xl font-black tracking-[-0.05em] text-[#101114] sm:text-6xl">Nicht unsere Meinung. Die Ergebnisse.</h2>
          <p className="mt-5 text-base leading-7 text-[#686c73] sm:text-lg">Veröffentlichte Kundenresultate und Clips direkt aus dem bestehenden Social-Proof-System.</p>
        </div>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <article key={item.id} className="overflow-hidden rounded-[22px] border border-[#e7e3df] bg-white shadow-[0_18px_50px_rgba(54,39,27,.08)]">
              <div className="aspect-[4/5] overflow-hidden bg-[#111]">
                {item.kind === "video" ? (
                  <video src={socialProofMediaUrl(item)} controls muted playsInline preload="metadata" className="h-full w-full object-cover" />
                ) : (
                  <img src={socialProofMediaUrl(item)} alt={item.title || "Kundenergebnis"} className="h-full w-full object-cover" />
                )}
              </div>
              {(item.title || item.caption) && (
                <div className="p-5">
                  {item.title && <h3 className="text-lg font-extrabold text-[#101114]">{item.title}</h3>}
                  {item.caption && <p className="mt-2 text-sm leading-6 text-[#686c73]">{item.caption}</p>}
                </div>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function PotentialCalculator() {
  const [views, setViews] = useState(100000);
  const [ctr, setCtr] = useState(1.5);
  const [conversion, setConversion] = useState(3);
  const [value, setValue] = useState(30);
  const result = useMemo(() => {
    const clicks = views * (ctr / 100);
    const sales = clicks * (conversion / 100);
    return { clicks, sales, revenue: sales * value };
  }, [views, ctr, conversion, value]);
  const n = new Intl.NumberFormat("de-DE", { maximumFractionDigits: 0 });
  const eur = new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR", maximumFractionDigits: 0 });
  return (
    <section id="rechner" className="bg-white py-20 lg:py-28">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <span className="text-xs font-black uppercase tracking-[0.18em] text-[#e97800]">Potenzial-Rechner</span>
          <h2 className="mt-3 text-4xl font-black tracking-[-0.05em] text-[#101114] sm:text-6xl">Was können Reichweite und Klicks bedeuten?</h2>
          <p className="mt-5 text-[#686c73]">Spiele dein eigenes Szenario durch. Keine Verdienstgarantie, sondern eine frei anpassbare Beispielrechnung.</p>
        </div>
        <div className="mt-12 rounded-[24px] border-2 border-[#ffc987] bg-gradient-to-br from-white to-[#fff8ef] p-6 shadow-[0_26px_74px_rgba(150,77,0,.12)] sm:p-9">
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Video-Aufrufe" value={views} setValue={setViews} icon={Eye} suffix="" step="1000" />
            <Field label="Klickrate (CTR)" value={ctr} setValue={setCtr} icon={MousePointerClick} suffix="%" step="0.1" />
            <Field label="Conversion-Rate" value={conversion} setValue={setConversion} icon={ShoppingCart} suffix="%" step="0.1" />
            <Field label="Wert pro Conversion" value={value} setValue={setValue} icon={WalletCards} suffix="€" step="1" />
          </div>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            <Result label="Klicks" value={n.format(result.clicks)} />
            <Result label="Conversions" value={n.format(result.sales)} />
            <div className="rounded-2xl bg-[#101114] p-5 text-white"><div className="text-xs font-black uppercase tracking-wider text-[#ffad4d]">Rechnerischer Umsatz</div><div className="mt-2 text-3xl font-black">{eur.format(result.revenue)}</div></div>
          </div>
          <p className="mt-5 text-xs leading-5 text-[#858991]">Beispielrechnung. Tatsächliche Ergebnisse hängen u. a. von Reichweite, Zielgruppe, Angebot, Plattform und Conversion ab. Keine Verdienstgarantie.</p>
        </div>
      </div>
    </section>
  );
}

function Field({ label, value, setValue, icon: Icon, suffix, step }: { label: string; value: number; setValue: React.Dispatch<React.SetStateAction<number>>; icon: typeof Eye; suffix: string; step: string }) {
  return <label className="rounded-2xl border border-[#eadfd5] bg-white p-4"><span className="mb-2 flex items-center gap-2 text-sm font-bold text-[#101114]"><Icon className="h-4 w-4 text-[#ff8600]" />{label}</span><div className="relative"><input type="number" min="0" step={step} value={value} onChange={(e) => setValue(Number(e.target.value) || 0)} className="w-full rounded-xl border border-[#ddd7d1] bg-[#fffaf4] px-4 py-3 pr-10 text-lg font-extrabold text-[#101114] outline-none focus:border-[#ff8600]" />{suffix && <span className="absolute inset-y-0 right-4 flex items-center text-sm text-[#77736f]">{suffix}</span>}</div></label>;
}

function Result({ label, value }: { label: string; value: string }) {
  return <div className="rounded-2xl bg-[#fff3e3] p-5"><div className="text-xs font-black uppercase tracking-wider text-[#a95d0b]">{label}</div><div className="mt-2 text-3xl font-black text-[#101114]">{value}</div></div>;
}

function GeneratorTeaser() {
  const [concept, setConcept] = useState("Verwilderter Hinterhof → moderne Luxus-Pooloase mit Travertin, Wasserfall und Pergola");
  function submit(e: FormEvent) {
    e.preventDefault();
    window.location.href = `/kundenbereich?concept=${encodeURIComponent(concept)}`;
  }
  return (
    <section id="generator" className="bg-[#f7f7f5] py-20 lg:py-28">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-[.9fr_1.1fr]">
          <div><span className="text-xs font-black uppercase tracking-[0.18em] text-[#e97800]">Generator ansehen</span><h2 className="mt-3 text-4xl font-black tracking-[-0.05em] text-[#101114] sm:text-6xl">Idee rein. Reel raus.</h2><p className="mt-5 text-base leading-7 text-[#686c73] sm:text-lg">Die Landingpage zeigt nur den Einstieg. Der eigentliche Generator lebt im Kundenbereich, wo du dein Konzept startest und in den sicheren Checkout gehst.</p><div className="mt-6 flex flex-wrap gap-3 text-sm font-bold text-[#4f555d]"><span className="rounded-full border border-[#e7e3df] bg-white px-4 py-2">9:16</span><span className="rounded-full border border-[#e7e3df] bg-white px-4 py-2">60+ Sekunden</span><span className="rounded-full border border-[#e7e3df] bg-white px-4 py-2">8 Phasen</span></div></div>
          <form onSubmit={submit} className="rounded-[24px] border-2 border-[#ffc987] bg-white p-6 shadow-[0_24px_70px_rgba(150,77,0,.10)] sm:p-8"><label className="text-sm font-extrabold text-[#101114]">Beschreibe dein Video-Konzept</label><textarea value={concept} onChange={(e) => setConcept(e.target.value)} rows={5} className="mt-3 w-full resize-none rounded-2xl border border-[#ddd7d1] bg-[#fffaf4] p-4 text-sm leading-6 text-[#101114] outline-none focus:border-[#ff8600]" /><button type="submit" className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-[#ff8600] px-6 py-4 text-sm font-black text-white shadow-[0_12px_30px_rgba(255,134,0,.25)] hover:bg-[#e97800]">Im Kundenbereich weiter <ArrowRight className="h-4 w-4" /></button><p className="mt-3 text-center text-xs text-[#858991]">Noch keine Zahlung auf dieser Seite.</p></form>
        </div>
      </div>
    </section>
  );
}

function Pricing() {
  return (
    <section id="preise" className="bg-white py-20 lg:py-28">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center"><span className="text-xs font-black uppercase tracking-[0.18em] text-[#e97800]">Preise & Zugang</span><h2 className="mt-3 text-4xl font-black tracking-[-0.05em] text-[#101114] sm:text-6xl">Kein Credit-System. Ein klarer Checkout.</h2><p className="mt-5 text-[#686c73]">Die finalen Verkaufspreise werden gerade festgelegt. Sobald sie in Shopify freigegeben sind, erscheinen sie hier. Bis dahin bleibt der Checkout bewusst gesperrt.</p></div>
        <div className="mt-12 grid gap-5 md:grid-cols-2">
          <div className="rounded-[24px] border-2 border-[#ffb45f] bg-[#fff8ef] p-7 sm:p-9"><span className="text-xs font-black uppercase tracking-widest text-[#e97800]">AI-Video</span><h3 className="mt-3 text-3xl font-black text-[#101114]">1 fertiges Transformations-Reel</h3><ul className="mt-6 space-y-3 text-sm text-[#4f555d]">{["60+ Sekunden","9:16 MP4","Automatisierte Transformations-Pipeline","Kein sichtbares Credit-System"].map((x) => <li key={x} className="flex gap-2"><Check className="mt-0.5 h-4 w-4 shrink-0 text-[#ff8600]" />{x}</li>)}</ul><a href="/kundenbereich" className="mt-8 flex items-center justify-center gap-2 rounded-xl bg-[#ff8600] px-6 py-4 text-sm font-black text-white hover:bg-[#e97800]">Zum Kundenbereich <ArrowRight className="h-4 w-4" /></a></div>
          <div className="rounded-[24px] border border-[#e7e3df] bg-white p-7 sm:p-9"><span className="text-xs font-black uppercase tracking-widest text-[#686c73]">Optional</span><h3 className="mt-3 text-3xl font-black text-[#101114]">AI-Video + Marketing-Kurs</h3><p className="mt-5 text-sm leading-6 text-[#686c73]">Optional kann der Marketing-Kurs zusammen mit dem AI-Video angeboten werden. Der finale Paketpreis erscheint hier nach der Preisfreigabe.</p><div className="mt-8 rounded-xl bg-[#f7f7f5] p-4 text-sm font-bold text-[#4f555d]">Finaler Preis folgt vor Launch.</div></div>
        </div>
      </div>
    </section>
  );
}

export default function LandingPage() {
  const [videoOpen, setVideoOpen] = useState(false);
  return (
    <div className="min-h-screen bg-white text-[#101114]">
      <div className="grid h-7 place-items-center bg-[#101114] text-[10px] font-black uppercase tracking-[0.16em] text-white">KI-VIDEOS FÜR MAXIMALES VIRALPOTENZIAL</div>
      <header className="sticky top-0 z-50 border-b border-[#e7e3df] bg-white/95 backdrop-blur">
        <div className="mx-auto flex h-[68px] max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8"><a href="#" className="text-xl font-black tracking-[-0.05em]">IchGehe<span className="text-[#ff8600]">Viral</span></a><nav className="hidden items-center gap-7 text-sm font-semibold text-[#555a62] lg:flex"><a href="#ergebnisse">Ergebnisse</a><a href="#rechner">Rechner</a><a href="#preise">Preise</a><a href="#generator">Generator</a></nav><a href="/kundenbereich" className="rounded-full bg-[#ff8600] px-5 py-3 text-xs font-black text-white hover:bg-[#e97800]">Kundenbereich →</a></div>
      </header>
      <main>
        <section className="overflow-hidden bg-[radial-gradient(circle_at_50%_22%,rgba(255,134,0,.12),transparent_52%)] pt-16 sm:pt-20">
          <div className="mx-auto max-w-6xl px-4 text-center sm:px-6 lg:px-8">
            <span className="inline-flex rounded-full border border-[#ffd7a8] bg-[#fff8ef] px-3 py-2 text-[11px] font-black uppercase tracking-[0.14em] text-[#e97800]">Für Aufmerksamkeit, Progression & Payoff gebaut</span>
            <h1 className="mx-auto mt-6 max-w-5xl text-5xl font-black leading-[.98] tracking-[-0.065em] text-[#101114] sm:text-7xl lg:text-[82px]">Videos, die für <em className="font-serif font-normal not-italic text-[#ff8600]">maximales Viralpotenzial</em> gebaut sind.</h1>
            <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-[#686c73] sm:text-lg">Aus einer Idee wird ein zusammenhängendes 60+ Sekunden Transformations-Reel — ohne dass du selbst schneiden oder einzelne KI-Clips zusammensetzen musst.</p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row"><a href="/kundenbereich" className="inline-flex items-center justify-center gap-2 rounded-full bg-[#ff8600] px-7 py-4 text-sm font-black text-white shadow-[0_14px_38px_rgba(255,134,0,.24)] hover:bg-[#e97800]">Video starten <ArrowRight className="h-4 w-4" /></a><button onClick={() => setVideoOpen(true)} className="inline-flex items-center justify-center gap-2 rounded-full border border-[#d9d5d0] bg-white px-7 py-4 text-sm font-black text-[#101114]"><Play className="h-4 w-4 fill-[#ff8600] text-[#ff8600]" /> Echtes Reel ansehen</button></div>
            <div className="relative mx-auto mt-12 max-w-4xl overflow-hidden rounded-[24px] border border-[#eadfd5] bg-[#111] shadow-[0_32px_82px_rgba(89,49,20,.18)]"><button onClick={() => setVideoOpen(true)} className="group relative block aspect-[16/8.7] w-full overflow-hidden"><img src="/media/videos/hero-poster.jpg" alt="IchGeheViral Beispiel-Reel" className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.02]" /><div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" /><span className="absolute inset-0 m-auto grid h-20 w-20 place-items-center rounded-full bg-[#ff8600] text-white shadow-[0_10px_35px_rgba(255,134,0,.4)]"><Play className="h-7 w-7 fill-current" /></span><span className="absolute bottom-6 left-6 text-left text-white"><b className="block text-lg">Echtes Pipeline-Ergebnis</b><small className="text-white/75">63 Sekunden · 9:16 · 8 Phasen</small></span></button></div>
            <div className="mt-10 grid border-y border-[#e7e3df] py-6 sm:grid-cols-4">{[["60+ Sek.","fertiges Reel"],["9:16","Shortform-native"],["8","aufeinander aufbauende Phasen"],["0","Credit-Zähler"]].map(([a,b],i)=><div key={i} className="border-[#e7e3df] py-4 sm:border-r sm:last:border-r-0 sm:py-0"><b className="block text-3xl font-black">{a}</b><span className="mt-1 block text-[11px] font-bold uppercase tracking-wider text-[#777b82]">{b}</span></div>)}</div>
          </div>
        </section>
        <section className="bg-white py-20 lg:py-28"><div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8"><div className="mx-auto max-w-3xl text-center"><span className="text-xs font-black uppercase tracking-[0.18em] text-[#e97800]">Warum es anders ist</span><h2 className="mt-3 text-4xl font-black tracking-[-0.05em] sm:text-6xl">Nicht einfach generiert. Fürs Weiterschauen aufgebaut.</h2></div><div className="mt-12 grid gap-px overflow-hidden rounded-[22px] border border-[#e7e3df] bg-[#e7e3df] md:grid-cols-4">{[[Eye,"Scroll Stop","Ein klares Vorher/Nachher erzeugt sofort Erwartung."],[Sparkles,"Progression","Jede Phase verändert sichtbar etwas am Motiv."],[Zap,"Final Reveal","Der Aufbau führt bewusst auf einen visuellen Payoff hin."],[Check,"Social-first","Das Ergebnis kommt direkt als vertikales Shortform-Reel."]].map(([Icon,title,desc],i)=>{const I=Icon as typeof Eye;return <article key={i} className="bg-white p-7"><I className="h-7 w-7 text-[#ff8600]"/><h3 className="mt-7 text-xl font-black">{title as string}</h3><p className="mt-3 text-sm leading-6 text-[#686c73]">{desc as string}</p></article>})}</div></div></section>
        <LightSocialProof />
        <PotentialCalculator />
        <Pricing />
        <GeneratorTeaser />
        <section className="bg-[#101114] py-20 text-white"><div className="mx-auto max-w-4xl px-4 text-center sm:px-6"><span className="text-xs font-black uppercase tracking-[0.18em] text-[#ffad4d]">Bereit?</span><h2 className="mt-4 text-4xl font-black tracking-[-0.05em] sm:text-6xl">Deine Idee. Unser System macht das Reel daraus.</h2><p className="mx-auto mt-5 max-w-2xl text-[#b2b5ba]">Der eigentliche Generator sitzt jetzt dort, wo er hingehört: im Kundenbereich.</p><a href="/kundenbereich" className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#ff8600] px-8 py-4 text-sm font-black hover:bg-[#e97800]">Kundenbereich öffnen <ArrowRight className="h-4 w-4" /></a></div></section>
      </main>
      <footer className="border-t border-[#202126] bg-[#080a0d] py-8 text-white"><div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 text-xs text-[#8d9299] sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8"><div><b className="text-base text-white">IchGehe<span className="text-[#ff8600]">Viral</span></b><div>AI Video Engine</div></div><div>© 2026 IchGeheViral</div></div></footer>
      {videoOpen && <div className="fixed inset-0 z-[100] grid place-items-center bg-black/85 p-4" onClick={() => setVideoOpen(false)}><div className="w-full max-w-sm" onClick={(e)=>e.stopPropagation()}><video src="/media/videos/golden-pool-run1.mp4" controls autoPlay className="aspect-[9/16] w-full rounded-2xl bg-black shadow-2xl"/><button onClick={()=>setVideoOpen(false)} className="mt-3 w-full rounded-xl bg-white px-4 py-3 text-sm font-bold text-black">Schließen</button></div></div>}
    </div>
  );
}
