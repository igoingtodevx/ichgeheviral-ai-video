import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Check, Download, Gauge, Layers3, PlayCircle } from "lucide-react";
import { STUDIO_REELS } from "../../../../lib/studio";

export function generateStaticParams() {
  return STUDIO_REELS.map((reel) => ({ slug: reel.slug }));
}

export default async function ReelDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const reel = STUDIO_REELS.find((item) => item.slug === slug);
  if (!reel) notFound();

  return (
    <div className="px-4 py-8 sm:px-6 lg:px-10 lg:py-10">
      <div className="mx-auto max-w-6xl">
        <Link
          href="/kundenbereich"
          className="inline-flex items-center gap-2 text-sm font-bold text-[#777b82] hover:text-[#101114]"
        >
          <ArrowLeft className="h-4 w-4" />
          Zurück zu Meine Reels
        </Link>

        <div className="mt-6 grid gap-8 xl:grid-cols-[420px_1fr] xl:items-start">
          <div className="overflow-hidden rounded-[26px] bg-[#0d0d10] p-2 shadow-[0_24px_70px_rgba(17,15,28,.18)]">
            <video
              src={reel.videoSrc}
              poster={reel.posterSrc}
              controls
              preload="metadata"
              playsInline
              className="aspect-[9/16] w-full rounded-[20px] bg-black object-cover"
            />
          </div>

          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-[#cdebdc] bg-[#f1fbf6] px-3 py-2 text-[11px] font-black uppercase tracking-[0.14em] text-[#2f9b66]">
              <Check className="h-3.5 w-3.5" />
              Reel fertig
            </span>
            <h1 className="mt-4 text-4xl font-black tracking-[-0.055em] text-[#101114] sm:text-5xl">
              {reel.title}
            </h1>
            <p className="mt-3 text-base leading-7 text-[#686c73]">{reel.subtitle}</p>

            <div className="mt-7 grid gap-3 sm:grid-cols-3">
              <div className="rounded-2xl border border-[#e4e1ec] bg-white p-4">
                <PlayCircle className="h-5 w-5 text-[#6d5dfc]" />
                <div className="mt-3 text-xs font-bold uppercase tracking-wider text-[#989ca2]">Laufzeit</div>
                <div className="mt-1 text-lg font-black">{reel.duration}</div>
              </div>
              <div className="rounded-2xl border border-[#e4e1ec] bg-white p-4">
                <Layers3 className="h-5 w-5 text-[#6d5dfc]" />
                <div className="mt-3 text-xs font-bold uppercase tracking-wider text-[#989ca2]">Bauphasen</div>
                <div className="mt-1 text-lg font-black">{reel.phaseCount}</div>
              </div>
              <div className="rounded-2xl border border-[#e4e1ec] bg-white p-4">
                <Gauge className="h-5 w-5 text-[#6d5dfc]" />
                <div className="mt-3 text-xs font-bold uppercase tracking-wider text-[#989ca2]">Format</div>
                <div className="mt-1 text-lg font-black">9:16 MP4</div>
              </div>
            </div>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <a
                href={reel.videoSrc}
                download
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#6d5dfc] px-6 py-4 text-sm font-black text-white shadow-[0_12px_32px_rgba(109,93,252,.22)] transition hover:bg-[#5947e8]"
              >
                <Download className="h-4 w-4" />
                MP4 herunterladen
              </a>
              <Link
                href="/kundenbereich/produktion"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#dedbe7] bg-white px-6 py-4 text-sm font-black text-[#101114] transition hover:border-[#b9b0ff]"
              >
                Entstehung ansehen
              </Link>
            </div>

            <div className="mt-9">
              <h2 className="text-xl font-black tracking-[-0.03em]">Die 8 Bauzustände</h2>
              <div className="mt-4 grid grid-cols-4 gap-2 sm:grid-cols-8">
                {reel.stateImages.map((src, index) => (
                  <div key={src} className="relative aspect-[4/5] overflow-hidden rounded-xl border border-[#e4e1ec] bg-white">
                    <Image
                      src={src}
                      alt={`Bauphase ${index + 1}`}
                      fill
                      sizes="120px"
                      className="object-cover"
                    />
                    <span className="absolute bottom-1.5 left-1.5 rounded-md bg-black/65 px-1.5 py-1 text-[9px] font-black text-white">
                      {index + 1}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
