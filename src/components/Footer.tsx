"use client";

import React from "react";
import Link from "next/link";
import { useBusinessConfig } from "./BusinessConfigProvider";

const LEGAL_LINKS = [
  { href: "/impressum", label: "Impressum" },
  { href: "/datenschutz", label: "Datenschutz" },
  { href: "/agb", label: "AGB" },
  { href: "/widerrufsrecht", label: "Widerrufsrecht" },
  { href: "/kontakt", label: "Kontakt" },
];

export function Footer() {
  const { config } = useBusinessConfig();
  return (
    <footer className="border-t border-[#202126] bg-[#080a0d] py-8 text-white">
      <div className="mx-auto max-w-6xl px-4 text-xs text-[#8d9299] sm:px-6 lg:px-8">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <b className="text-base text-white">
              IchGehe<span className="text-[#6d5dfc]">Viral</span>
            </b>
            <div>Virale KI-Building Videos</div>
            {config.content.legal_entity && <div className="mt-2">{config.content.legal_entity}</div>}
            {config.content.support_email && <a className="mt-1 inline-block hover:text-white" href={`mailto:${config.content.support_email}`}>{config.content.support_email}</a>}
          </div>

          <div className="flex flex-col items-start gap-4 sm:items-end">
            <Link
              href="/kundenbereich/neu"
              className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 font-semibold text-[#101114] transition hover:bg-[#ecebff]"
            >
              Jetzt generieren <span aria-hidden="true">→</span>
            </Link>
            <nav className="flex flex-wrap gap-x-4 gap-y-2 sm:justify-end">
              {LEGAL_LINKS.map((link) => (
                <Link key={link.href} href={link.href} className="transition hover:text-white">
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>

        <div className="mt-5 border-t border-[#202126] pt-5 sm:text-right">
          © {new Date().getFullYear()} IchGeheViral
        </div>
      </div>
    </footer>
  );
}
