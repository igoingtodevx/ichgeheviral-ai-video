"use client";

import React from "react";

export function Footer() {
  return (
    <footer className="w-full border-t border-white/[0.07] bg-[#050408] py-12 text-slate-400 text-xs">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Brand Info */}
          <div className="flex flex-col items-center md:items-start gap-1.5">
            <div className="flex items-center text-lg font-bold tracking-tight text-white">
              <span>IchGehe</span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-sky-400 pl-0.5">
                Viral
              </span>
            </div>
            <p className="text-slate-400 text-xs">
              Autonome KI-Video-Pipeline für Creator & Brands.
            </p>
          </div>

          {/* Legal Placeholders */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400">
            <a href="#impressum" className="hover:text-white transition-colors">
              Impressum
            </a>
            <span className="text-slate-700">·</span>
            <a href="#datenschutz" className="hover:text-white transition-colors">
              Datenschutz
            </a>
            <span className="text-slate-700">·</span>
            <a href="#kontakt" className="hover:text-white transition-colors">
              Kontakt
            </a>
          </div>

          {/* Copyright */}
          <div className="text-slate-400 text-xs font-mono">
            © {new Date().getFullYear()} IchGeheViral. Alle Rechte vorbehalten.
          </div>
        </div>
      </div>
    </footer>
  );
}
