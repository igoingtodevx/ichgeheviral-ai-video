import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Download, Eye, Film, Play, Plus } from "lucide-react";
import {
  MARKETING_SEED_REELS,
  REAL_STUDIO_REELS,
  type StudioReel,
} from "../../lib/studio";

function ReelCard({ reel, compact = false }: { reel: StudioReel; compact?: boolean }) {
  return (
    <article
      className={`overflow-hidden rounded-[24px] border border-[#e4e1ec] bg-white shadow-[0_18px_60px_rgba(37,31,68,.07)] ${
        compact ? "rounded-[20px]" : ""
      }`}
    >
      <Link href={`/kundenbereich/reel/${reel.slug}`} className="group block">
        <div className={`relative overflow-hidden bg-[#111] ${compact ? "aspect-[4/5]" : "aspect-[16/10]"}`}>
          <Image
            src={reel.posterSrc}
            alt={reel.title}
            fill
            sizes={compact ? "(min-width: 1280px) 25vw, (min-width: 640px) 50vw, 100vw" : "(min-width: 1024px) 50vw, 100vw"}
            className="object-cover transition duration-500 group-hover:scale-[1.03]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-transparent" />
          <span
            className={`absolute left-4 top-4 inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-[10px] font-black shadow-sm ${
              reel.isDemo
                ? "border border-[#f4dfb3] bg-[#fff8e7]/95 text-[#9b6b11]"
                : "bg-white/95 text-[#2f9b66]"
            }`}
          >
            <span className={`h-2 w-2 rounded-full ${reel.isDemo ? "bg-[#d99a24]" : "bg-[#35b978]"}`} />
            {reel.status}
          </span>
          <span className="absolute inset-0 m-auto grid h-12 w-12 place-items-center rounded-full bg-white/95 text-[#5d4de1] shadow-xl transition group-hover:scale-105">
            {reel.isDemo ? <Eye className="h-5 w-5" /> : <Play className="ml-0.5 h-5 w-5 fill-current" />}
          </span>
          <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-3 text-white">
            <div className="min-w-0">
              <div className="truncate text-[10px] font-bold uppercase tracking-wider text-white/65">
                {reel.styleLabel}
              </div>
              <div className={`${compact ? "min-h-[2.5rem] text-base leading-5" : "text-xl"} mt-1 font-black`}>
                {reel.title}
              </div>
            </div>
            <div className="shrink-0 text-right text-[10px] font-bold text-white/75">
              {reel.isDemo ? "Bildvorschau" : reel.duration}
              <br />
              {reel.isDemo ? "1 Bild" : `${reel.phaseCount} Szenen`}
            </div>
          </div>
        </div>
      </Link>

      <div className={compact ? "p-4" : "p-5 sm:p-6"}>
        <p className={`${compact ? "line-clamp-2 text-xs" : "text-sm"} leading-6 text-[#686c73]`}>{reel.summary}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          <Link
            href={`/kundenbereich/reel/${reel.slug}`}
            className={`inline-flex items-center gap-2 rounded-xl bg-[#101114] px-3.5 py-2.5 text-xs font-black text-white transition hover:bg-[#272832] ${
              compact ? "w-full justify-center" : ""
            }`}
          >
            {reel.isDemo ? <Eye className="h-3.5 w-3.5" /> : <Film className="h-3.5 w-3.5" />}
            {reel.isDemo ? "Bildvorschau ansehen" : "Reel ansehen"}
          </Link>
          {reel.videoSrc ? (
            <a
              href={reel.videoSrc}
              download
              className="inline-flex items-center gap-2 rounded-xl border border-[#dedbe7] bg-white px-3.5 py-2.5 text-xs font-black text-[#555a62] transition hover:border-[#b9b0ff] hover:text-[#101114]"
            >
              <Download className="h-3.5 w-3.5" />
              Herunterladen
            </a>
          ) : (
            <span className="inline-flex items-center rounded-xl border border-dashed border-[#dedbe7] px-3.5 py-2.5 text-[10px] font-bold text-[#989ca2]">
              Nur Bildvorschau
            </span>
          )}
        </div>
      </div>
    </article>
  );
}

export default function StudioDashboardPage() {
  const totalReels = REAL_STUDIO_REELS.length + MARKETING_SEED_REELS.length;

  return (
    <div className="px-4 py-8 sm:px-6 lg:px-10 lg:py-10">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="text-xs font-black uppercase tracking-[0.16em] text-[#5d4de1]">
              Timos Marketing-Studio
            </span>
            <h1 className="mt-4 text-4xl font-black tracking-[-0.055em] text-[#101114] sm:text-5xl">
              Meine Reels
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-[#686c73] sm:text-base">
              Hier findest du deine fertigen Poolbau-Reels und vorbereitete Beispiele für deine
              Präsentation. Über „Neues Reel“ startest du ein weiteres Reel.
            </p>
          </div>

          <Link
            href="/kundenbereich/neu"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#6d5dfc] px-5 py-3.5 text-sm font-black text-white shadow-[0_12px_32px_rgba(109,93,252,.22)] transition hover:bg-[#5947e8]"
          >
            <Plus className="h-4 w-4" />
            Neues Reel
          </Link>
        </div>

        <section className="mt-8 grid gap-3 sm:grid-cols-3">
          {[
            [String(totalReels), "Einträge in deiner Bibliothek"],
            [String(REAL_STUDIO_REELS.length), "fertige Reels"],
            [String(MARKETING_SEED_REELS.length), "vorbereitete Beispiele"],
          ].map(([value, label]) => (
            <div key={label} className="rounded-2xl border border-[#e4e1ec] bg-white p-5">
              <div className="text-3xl font-black tracking-[-0.04em] text-[#101114]">{value}</div>
              <div className="mt-1 text-xs font-bold uppercase tracking-wider text-[#8a8e94]">{label}</div>
            </div>
          ))}
        </section>

        <section className="mt-10">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <span className="text-xs font-black uppercase tracking-[0.16em] text-[#2f9b66]">
                Direkt verfügbar
              </span>
              <h2 className="mt-2 text-2xl font-black tracking-[-0.04em] text-[#101114] sm:text-3xl">
                Deine fertigen Reels
              </h2>
            </div>
            <p className="max-w-md text-xs leading-5 text-[#686c73]">
              Diese beiden Reels kannst du direkt ansehen und herunterladen.
            </p>
          </div>

          <div className="mt-5 grid gap-5 lg:grid-cols-2">
            {REAL_STUDIO_REELS.map((reel) => (
              <ReelCard key={reel.slug} reel={reel} />
            ))}
          </div>
        </section>

        <section className="mt-12">
          <div className="rounded-[24px] border border-[#f0dfb8] bg-[#fffaf0] p-5 sm:flex sm:items-center sm:justify-between sm:gap-6 sm:p-6">
            <div>
              <span className="text-xs font-black uppercase tracking-[0.16em] text-[#9b6b11]">Für deine Präsentation</span>
              <h2 className="mt-2 text-xl font-black tracking-[-0.03em] text-[#101114]">
                {MARKETING_SEED_REELS.length} vorbereitete Beispiele
              </h2>
              <p className="mt-2 max-w-3xl text-sm leading-6 text-[#756b57]">
                Vorbereitete Poolbau-Beispiele, die dir zeigen, wie vielfältig das Ergebnis aussehen kann.
              </p>
            </div>
            <span className="mt-4 inline-flex shrink-0 items-center rounded-full border border-[#ead39f] bg-white/70 px-3 py-2 text-[11px] font-black text-[#9b6b11] sm:mt-0">
              Nur Bildvorschau
            </span>
          </div>

          <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {MARKETING_SEED_REELS.map((reel) => (
              <ReelCard key={reel.slug} reel={reel} compact />
            ))}
          </div>
        </section>

        <section className="mt-10 overflow-hidden rounded-[26px] bg-[#17151f] text-white shadow-[0_22px_70px_rgba(23,21,31,.14)]">
          <div className="grid gap-6 p-6 sm:p-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <span className="text-xs font-black uppercase tracking-[0.16em] text-[#9b8fff]">
                Was passiert nach dem Klick?
              </span>
              <h2 className="mt-2 text-2xl font-black tracking-[-0.03em] sm:text-3xl">
                So läuft dein Reel ab.
              </h2>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-white/60">
                Sieh Schritt für Schritt, wie aus einer Poolbau-Transformation ein fertiges Reel wird.
              </p>
            </div>
            <Link
              href="/kundenbereich/produktion"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#6d5dfc] px-5 py-3.5 text-sm font-black text-white transition hover:bg-[#7d6eff]"
            >
              Ablauf ansehen <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
