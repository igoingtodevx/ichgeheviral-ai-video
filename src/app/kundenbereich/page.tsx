import Image from "next/image";
import Link from "next/link";
import { Film, Play, Plus } from "lucide-react";
import { STUDIO_REELS, type StudioReel } from "../../lib/studio";

function ReelCard({ reel }: { reel: StudioReel }) {
  const styleLabel = reel.styleLabel;
  const duration = reel.duration;
  const phaseCount = reel.phaseCount;

  return (
    <article className="overflow-hidden rounded-[20px] border border-[#e4e1ec] bg-white shadow-[0_14px_42px_rgba(37,31,68,.06)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_20px_52px_rgba(37,31,68,.1)]">
      <Link href={`/kundenbereich/reel/${reel.slug}`} className="group block">
        <div className="relative aspect-video overflow-hidden bg-[#111]">
          <Image
            src={reel.posterSrc}
            alt={reel.title}
            fill
            sizes="(min-width: 1280px) 20vw, (min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
            loading="eager"
            className="object-cover transition duration-500 group-hover:scale-[1.04]"
          />
          <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-white/95 px-2.5 py-1.5 text-[10px] font-black text-[#2f9b66] shadow-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-[#35b978]" />
            Fertig
          </span>
          <span className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-white/95 text-[#5d4de1] shadow-xl transition group-hover:scale-105">
            <Play className="ml-0.5 h-4 w-4 fill-current" />
          </span>
        </div>
      </Link>
      <div className="p-3.5 sm:p-4">
        <div className="text-[10px] font-bold uppercase tracking-wider text-[#8a8e94]">{styleLabel}</div>
        <div className="mt-1 line-clamp-2 min-h-10 text-sm font-black leading-5 text-[#101114]">{reel.title}</div>
        <div className="mt-2 text-[10px] font-bold uppercase tracking-wider text-[#989ca2]">
          {duration} <span className="px-1 text-[#c9c6d2]">·</span> {phaseCount} Szenen
        </div>
        <Link
          href={`/kundenbereich/reel/${reel.slug}`}
          className="mt-3 inline-flex items-center gap-1.5 text-[11px] font-black text-[#5d4de1] transition hover:text-[#3f31bd]"
        >
          <Film className="h-3.5 w-3.5" />
          Reel ansehen
        </Link>
      </div>
    </article>
  );
}

export default function StudioDashboardPage() {
  const totalReels = STUDIO_REELS.length;

  return (
    <div className="px-4 py-8 sm:px-6 lg:px-10 lg:py-10">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-4xl font-black tracking-[-0.055em] text-[#101114] sm:text-5xl">Meine Reels</h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-[#686c73] sm:text-base">
              Alle deine Videos an einem Ort.
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
            [String(totalReels), "Videos"],
            ["9:16", "Format"],
            ["Fertig", "Status"],
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
              <span className="text-xs font-black uppercase tracking-[0.16em] text-[#5d4de1]">Videobibliothek</span>
              <h2 className="mt-2 text-2xl font-black tracking-[-0.04em] text-[#101114] sm:text-3xl">Alle Reels</h2>
            </div>
            <p className="max-w-md text-xs leading-5 text-[#686c73]">
              Deine fertigen Poolbau-Videos – bereit zum Ansehen und Teilen.
            </p>
          </div>

          <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {STUDIO_REELS.map((reel) => (
              <ReelCard key={reel.slug} reel={reel} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
