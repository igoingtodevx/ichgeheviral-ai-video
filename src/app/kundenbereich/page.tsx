import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Download, Film, Play, Plus } from "lucide-react";
import { STUDIO_REELS } from "../../lib/studio";

export default function StudioDashboardPage() {
  return (
    <div className="px-4 py-8 sm:px-6 lg:px-10 lg:py-10">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="text-xs font-black uppercase tracking-[0.16em] text-[#5d4de1]">
              Beispiel-Reels
            </span>
            <h1 className="mt-4 text-4xl font-black tracking-[-0.055em] text-[#101114] sm:text-5xl">
              Meine Reels
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-[#686c73] sm:text-base">
              Hier findest du deine fertigen Transformations-Reels. Zum Start zeigen wir zwei erstellte
              Beispiele aus der aktuell verfügbaren Poolbau-Kategorie.
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

        <section className="mt-9 grid gap-5 lg:grid-cols-2">
          {STUDIO_REELS.map((reel) => (
            <article
              key={reel.slug}
              className="overflow-hidden rounded-[24px] border border-[#e4e1ec] bg-white shadow-[0_18px_60px_rgba(37,31,68,.07)]"
            >
              <Link href={`/kundenbereich/reel/${reel.slug}`} className="group block">
                <div className="relative aspect-[16/10] overflow-hidden bg-[#111]">
                  <Image
                    src={reel.posterSrc}
                    alt={reel.title}
                    fill
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    className="object-cover transition duration-500 group-hover:scale-[1.02]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
                  <span className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full bg-white/95 px-3 py-1.5 text-[11px] font-black text-[#2f9b66] shadow-sm">
                    <span className="h-2 w-2 rounded-full bg-[#35b978]" />
                    {reel.status}
                  </span>
                  <span className="absolute inset-0 m-auto grid h-14 w-14 place-items-center rounded-full bg-white/95 text-[#5d4de1] shadow-xl transition group-hover:scale-105">
                    <Play className="ml-0.5 h-5 w-5 fill-current" />
                  </span>
                  <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-4 text-white">
                    <div>
                      <div className="text-xs font-bold text-white/70">{reel.styleLabel}</div>
                      <div className="mt-1 text-xl font-black">{reel.title}</div>
                    </div>
                    <div className="shrink-0 text-right text-xs font-bold text-white/75">
                      {reel.duration}<br />{reel.phaseCount} Phasen
                    </div>
                  </div>
                </div>
              </Link>

              <div className="p-5 sm:p-6">
                <p className="text-sm leading-6 text-[#686c73]">{reel.summary}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  <Link
                    href={`/kundenbereich/reel/${reel.slug}`}
                    className="inline-flex items-center gap-2 rounded-xl bg-[#101114] px-4 py-3 text-xs font-black text-white transition hover:bg-[#272832]"
                  >
                    <Film className="h-4 w-4" />
                    Reel ansehen
                  </Link>
                  <a
                    href={reel.videoSrc}
                    download
                    className="inline-flex items-center gap-2 rounded-xl border border-[#dedbe7] bg-white px-4 py-3 text-xs font-black text-[#555a62] transition hover:border-[#b9b0ff] hover:text-[#101114]"
                  >
                    <Download className="h-4 w-4" />
                    Download
                  </a>
                </div>
              </div>
            </article>
          ))}
        </section>

        <section className="mt-7 overflow-hidden rounded-[26px] bg-[#17151f] text-white shadow-[0_22px_70px_rgba(23,21,31,.14)]">
          <div className="grid gap-6 p-6 sm:p-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <span className="text-xs font-black uppercase tracking-[0.16em] text-[#9b8fff]">
                Was passiert nach dem Klick?
              </span>
              <h2 className="mt-2 text-2xl font-black tracking-[-0.03em] sm:text-3xl">
                So entsteht dein fertiges Reel.
              </h2>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-white/60">
                Sieh Schritt für Schritt, wie aus der gewählten Transformation ein fertiges Reel wird.
              </p>
            </div>
            <Link
              href="/kundenbereich/produktion"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#6d5dfc] px-5 py-3.5 text-sm font-black text-white transition hover:bg-[#7d6eff]"
            >
              Entstehung ansehen <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
