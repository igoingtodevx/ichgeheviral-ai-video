"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { Check, Circle, Pause, Play, RotateCcw } from "lucide-react";
import { PRODUCTION_STEPS, STUDIO_REELS } from "../../../lib/studio";

const PHASE_LABELS = [
  "Ausgangslage",
  "Lagunenform abstecken",
  "Becken ausheben",
  "Bewehrung & Technik",
  "Beckenhülle herstellen",
  "Oberflächen & Umfeld",
  "Wasser einlassen",
  "Mediterrane Lagunen-Oase mit Naturstein",
];

export default function ProductionDemoPage() {
  const reel = STUDIO_REELS[0];
  const [phase, setPhase] = useState(0);
  const [running, setRunning] = useState(false);
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    if (!running) return;
    const timer = window.setInterval(() => {
      setPhase((current) => {
        if (current >= 7) {
          window.clearInterval(timer);
          setRunning(false);
          setFinished(true);
          return 7;
        }
        return current + 1;
      });
    }, 950);
    return () => window.clearInterval(timer);
  }, [running]);

  const progress = Math.round(((phase + 1) / 8) * 100);
  const activeMacro = useMemo(() => {
    if (phase <= 0) return 0;
    if (phase <= 3) return 1;
    if (phase <= 5) return 2;
    if (phase <= 6) return 3;
    return 4;
  }, [phase]);

  function restart() {
    setPhase(0);
    setFinished(false);
    setRunning(true);
  }

  return (
    <div className="px-4 py-8 sm:px-6 lg:px-10 lg:py-10">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="text-xs font-black uppercase tracking-[0.16em] text-[#5d4de1]">
              Reel-Ablauf
            </span>
            <h1 className="mt-4 text-4xl font-black tracking-[-0.055em] sm:text-5xl">
              So entsteht dein Reel.
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-[#686c73] sm:text-base">
              Von der Ausgangslage bis zum fertigen Ergebnis – acht Szenen machen jede Veränderung
              sichtbar und führen zu einem klaren Finale.
            </p>
          </div>

          <button
            type="button"
            onClick={() => (finished ? restart() : setRunning((value) => !value))}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#6d5dfc] px-5 py-3.5 text-sm font-black text-white shadow-[0_12px_32px_rgba(109,93,252,.22)] transition hover:bg-[#5947e8]"
          >
            {running ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4 fill-current" />}
            {running ? "Ablauf pausieren" : finished ? "Ablauf erneut ansehen" : "Ablauf abspielen"}
          </button>
        </div>

        <div className="mt-8 grid gap-6 xl:grid-cols-[1fr_420px]">
          <section className="overflow-hidden rounded-[26px] border border-[#e4e1ec] bg-white shadow-[0_18px_60px_rgba(37,31,68,.06)]">
            <div className="flex items-center justify-between border-b border-[#efedf3] px-5 py-4 sm:px-6">
              <div>
                <div className="text-xs font-bold uppercase tracking-[0.14em] text-[#8a8e94]">Ablauf · 8 Szenen</div>
                <div className="mt-1 text-sm font-black">{PHASE_LABELS[phase]}</div>
              </div>
              <div className="rounded-full bg-[#f0edff] px-3 py-1.5 text-xs font-black text-[#5d4de1]">
                {progress}%
              </div>
            </div>

            <div className="grid gap-0 md:grid-cols-[1fr_220px]">
              <div className="relative min-h-[420px] overflow-hidden bg-[#111] sm:min-h-[560px]">
                <Image
                  key={reel.stateImages[phase]}
                  src={reel.stateImages[phase]}
                  alt={PHASE_LABELS[phase]}
                  fill
                  priority
                  sizes="(min-width: 1280px) 600px, 100vw"
                  className="object-cover"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent px-5 pb-5 pt-16 text-white">
                  <div className="text-xs font-bold text-white/65">Szene {phase + 1} von 8</div>
                  <div className="mt-1 text-xl font-black">{PHASE_LABELS[phase]}</div>
                </div>
              </div>

              <div className="border-t border-[#efedf3] bg-[#faf9fd] p-4 md:border-l md:border-t-0">
                <div className="grid grid-cols-4 gap-2 md:grid-cols-2">
                  {reel.stateImages.map((src, index) => (
                    <button
                      key={src}
                      type="button"
                      onClick={() => {
                        setPhase(index);
                        setRunning(false);
                        setFinished(index === 7);
                      }}
                      className={`relative aspect-[4/5] overflow-hidden rounded-lg border-2 ${
                        phase === index ? "border-[#6d5dfc]" : "border-transparent opacity-65 hover:opacity-100"
                      }`}
                      aria-label={`Szene ${index + 1} ansehen`}
                    >
                      <Image src={src} alt="" fill sizes="110px" className="object-cover" />
                      <span className="absolute bottom-1 left-1 rounded bg-black/65 px-1.5 py-0.5 text-[9px] font-black text-white">
                        {index + 1}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <aside className="rounded-[26px] border border-[#e4e1ec] bg-white p-5 shadow-[0_18px_60px_rgba(37,31,68,.06)] sm:p-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-black">5 Produktionsschritte</h2>
              {finished && (
                <button
                  type="button"
                  onClick={restart}
                  className="inline-flex items-center gap-1.5 text-xs font-black text-[#5d4de1]"
                >
                  <RotateCcw className="h-3.5 w-3.5" />
                  Neustart
                </button>
              )}
            </div>

            <p className="mt-2 text-xs leading-5 text-[#858991]">
              Ein Schritt kann mehrere Szenen umfassen.
            </p>

            <div className="mt-3 h-2 overflow-hidden rounded-full bg-[#efedf4]">
              <div
                className="h-full rounded-full bg-[#6d5dfc] transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>

            <div className="mt-6 space-y-1">
              {PRODUCTION_STEPS.map((step, index) => {
                const done = index < activeMacro || finished;
                const active = index === activeMacro && !finished;
                return (
                  <div key={step.title} className="relative flex gap-3 pb-6">
                    {index < PRODUCTION_STEPS.length - 1 && (
                      <span className="absolute left-[11px] top-6 h-[calc(100%-12px)] w-px bg-[#e4e1ec]" />
                    )}
                    <span
                      className={`relative z-10 mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full ${
                        done
                          ? "bg-[#6d5dfc] text-white"
                          : active
                            ? "border-2 border-[#6d5dfc] bg-[#f0edff] text-[#6d5dfc]"
                            : "border border-[#d9d6e2] bg-white text-[#b0b3ba]"
                      }`}
                    >
                      {done ? <Check className="h-3.5 w-3.5" /> : <Circle className="h-2.5 w-2.5 fill-current" />}
                    </span>
                    <div>
                      <div className={`text-sm font-black ${active ? "text-[#5d4de1]" : "text-[#101114]"}`}>
                        {step.title}
                      </div>
                      <p className="mt-1 text-xs leading-5 text-[#858991]">{step.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            {finished ? (
              <>
                <Link
                  href="/kundenbereich/reel/mediterrane-lagune"
                  className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-[#6d5dfc] px-5 py-4 text-sm font-black text-white"
                >
                  Reel ansehen
                </Link>

              </>
            ) : null}
          </aside>
        </div>
      </div>
    </div>
  );
}
