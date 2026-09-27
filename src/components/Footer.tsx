"use client";

import React from "react";
import Link from "next/link";

const LEGAL_LINKS = [
  { href: "/impressum", label: "Impressum" },
  { href: "/datenschutz", label: "Datenschutz" },
  { href: "/agb", label: "AGB" },
  { href: "/widerrufsrecht", label: "Widerrufsrecht" },
  { href: "/kontakt", label: "Kontakt" },
];

export function Footer() {
  return (
    <footer className="border-t border-[#202126] bg-[#080a0d] py-8 text-white">
      <div className="mx-auto max-w-6xl px-4 text-xs text-[#8d9299] sm:px-6 lg:px-8">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <b className="text-base text-white">
              IchGehe<span className="text-[#6d5dfc]">Viral</span>
            </b>
            <div>Transformations-Reels</div>
          </div>

          <nav className="flex flex-wrap gap-x-4 gap-y-2">
            {LEGAL_LINKS.map((link) => (
              <Link key={link.href} href={link.href} className="transition hover:text-white">
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="mt-5 border-t border-[#202126] pt-5 sm:text-right">
          © {new Date().getFullYear()} IchGeheViral
        </div>
      </div>
    </footer>
  );
}
