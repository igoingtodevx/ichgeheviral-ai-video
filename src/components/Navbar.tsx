"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, Menu, X } from "lucide-react";

const LINKS = [
  { href: "#ergebnisse", label: "Ergebnisse" },
  { href: "#so-funktionierts", label: "So funktioniert's" },
  { href: "#rechner", label: "Rechner" },
  { href: "#keine-credits", label: "Keine Credits" },
  { href: "#preise", label: "Preise" },
  { href: "#faq", label: "FAQ" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-[#e6e4ef] bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-[68px] max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="text-xl font-black tracking-[-0.05em] text-[#101114]">
          IchGehe<span className="text-[#6d5dfc]">Viral</span>
        </Link>

        <nav className="hidden items-center gap-7 text-sm font-semibold text-[#555a62] lg:flex">
          {LINKS.map((link) => (
            <a key={link.href} href={link.href} className="transition hover:text-[#101114]">
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/kundenbereich"
            className="hidden items-center gap-2 rounded-full bg-[#6d5dfc] px-5 py-3 text-xs font-black text-white transition hover:bg-[#5947e8] sm:inline-flex"
          >
            Studio öffnen <ArrowRight className="h-3.5 w-3.5" />
          </Link>
          <button
            onClick={() => setOpen((v) => !v)}
            className="grid h-10 w-10 place-items-center rounded-full border border-[#e6e4ef] text-[#101114] lg:hidden"
            aria-label="Menü öffnen"
            aria-expanded={open}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-[#e6e4ef] bg-white px-4 py-4 lg:hidden">
          <nav className="flex flex-col gap-1">
            {LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-3 text-sm font-bold text-[#33373d] hover:bg-[#f7f7fb]"
              >
                {link.label}
              </a>
            ))}
            <Link
              href="/kundenbereich"
              className="mt-2 flex items-center justify-center gap-2 rounded-full bg-[#6d5dfc] px-5 py-3 text-sm font-black text-white"
            >
              Studio öffnen <ArrowRight className="h-4 w-4" />
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
