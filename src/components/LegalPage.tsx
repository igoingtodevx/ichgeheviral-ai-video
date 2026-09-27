import Link from "next/link";
import type { ReactNode } from "react";

export function LegalPage({
  title,
  lead,
  children,
}: {
  title: string;
  lead: string;
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#f7f7fb] text-[#101114]">
      <header className="border-b border-[#e6e4ef] bg-white">
        <div className="mx-auto flex h-[72px] max-w-5xl items-center justify-between px-4 sm:px-6">
          <Link href="/" className="text-xl font-black tracking-[-0.05em]">
            IchGehe<span className="text-[#6d5dfc]">Viral</span>
          </Link>
          <Link
            href="/"
            className="rounded-full border border-[#dddbe7] bg-white px-4 py-2 text-sm font-bold text-[#4f545b] transition hover:border-[#6d5dfc] hover:text-[#101114]"
          >
            Zur Website
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 py-14 sm:px-6 sm:py-20">
        <div className="max-w-3xl">
          <span className="text-xs font-black uppercase tracking-[0.18em] text-[#5947e8]">
            Rechtliches
          </span>
          <h1 className="mt-3 break-words text-4xl font-black tracking-[-0.05em] sm:text-5xl">
            {title}
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-[#686c73] sm:text-lg">
            {lead}
          </p>
        </div>

        <div className="mt-10 space-y-6">{children}</div>

        <nav className="mt-12 flex flex-wrap gap-x-5 gap-y-3 border-t border-[#dddbe7] pt-6 text-sm font-bold text-[#666b72]">
          <Link className="hover:text-[#5947e8]" href="/impressum">Impressum</Link>
          <Link className="hover:text-[#5947e8]" href="/datenschutz">Datenschutz</Link>
          <Link className="hover:text-[#5947e8]" href="/agb">AGB</Link>
          <Link className="hover:text-[#5947e8]" href="/widerrufsrecht">Widerrufsrecht</Link>
          <Link className="hover:text-[#5947e8]" href="/kontakt">Kontakt</Link>
        </nav>
      </main>
    </div>
  );
}

export const legalCardClass =
  "rounded-[24px] border border-[#e5e0da] bg-white p-6 shadow-[0_18px_55px_rgba(61,45,31,.06)] sm:p-8";

export const legalTextClass =
  "space-y-5 text-[15px] leading-7 text-[#555a62] [&_a]:font-semibold [&_a]:text-[#d96f00] [&_a]:underline-offset-4 hover:[&_a]:underline [&_h2]:pt-1 [&_h2]:text-2xl [&_h2]:font-black [&_h2]:tracking-[-0.03em] [&_h2]:text-[#101114] [&_h3]:pt-3 [&_h3]:text-lg [&_h3]:font-extrabold [&_h3]:text-[#101114] [&_strong]:font-extrabold [&_strong]:text-[#101114]";
