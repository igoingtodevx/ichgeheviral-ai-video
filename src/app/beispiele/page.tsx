import Image from "next/image";
import Link from "next/link";
import { STUDIO_REELS } from "../../lib/studio";

export default function ExamplesPage() {
  return <main className="min-h-screen bg-[#f7f7fb] px-5 py-12 text-[#101114]"><div className="mx-auto max-w-6xl"><Link href="/" className="text-sm font-bold text-[#5d4de1]">← Zur Website</Link><h1 className="mt-7 text-4xl font-black tracking-tight">Beispiele & Inspiration</h1><p className="mt-4 max-w-2xl text-sm leading-6 text-[#686c73]">Diese öffentliche Galerie enthält zwei produzierte Beispielvideos und illustrative Bildvorschauen. Sie zeigt keine Kundenaufträge und keinen Produktionsstatus.</p><div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{STUDIO_REELS.map((reel) => <Link key={reel.slug} href={`/beispiele/${reel.slug}`} className="overflow-hidden rounded-2xl border border-[#e4e1ec] bg-white"><div className="relative aspect-[4/5]"><Image src={reel.posterSrc} alt={reel.title} fill sizes="(max-width: 640px) 100vw, 300px" className="object-cover" /></div><div className="p-4"><span className="text-[10px] font-black uppercase tracking-wider text-[#5d4de1]">{reel.videoSrc ? "Produziertes Beispiel" : "Illustrative Bildvorschau"}</span><h2 className="mt-2 text-sm font-black">{reel.title}</h2></div></Link>)}</div></div></main>;
}
