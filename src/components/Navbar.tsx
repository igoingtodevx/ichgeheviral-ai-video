"use client";

import React, { useState } from "react";
import { ArrowRight, Menu, X, Play } from "lucide-react";

interface NavbarProps {
  onOpenVideo?: () => void;
  onScrollToGenerator?: () => void;
}

export function Navbar({ onOpenVideo, onScrollToGenerator }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/[0.07] bg-[#07060B]/85 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8 h-18">
        {/* Brand Wordmark */}
        <a href="#" className="flex items-center gap-2 group">
          <div className="flex items-center text-xl sm:text-2xl font-bold tracking-tight text-white">
            <span>IchGehe</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-indigo-300 to-sky-400 pl-0.5">
              Viral
            </span>
          </div>
          <span className="hidden sm:inline-block rounded px-1.5 py-0.5 text-[10px] font-mono tracking-widest text-violet-400 bg-violet-950/60 border border-violet-800/40">
            AI VIDEO
          </span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
          <a
            href="#pipeline"
            className="hover:text-white transition-colors duration-150"
          >
            Transformation
          </a>
          <a
            href="#how-it-works"
            className="hover:text-white transition-colors duration-150"
          >
            Ablauf
          </a>
          <a
            href="#founder"
            className="hover:text-white transition-colors duration-150 flex items-center gap-1.5"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse" />
            Timo erklärt
          </a>
          <a
            href="#showcase"
            className="hover:text-white transition-colors duration-150"
          >
            Beispiele
          </a>
          <a
            href="#generator"
            className="hover:text-white transition-colors duration-150"
          >
            Generator
          </a>
          <a
            href="#faq"
            className="hover:text-white transition-colors duration-150"
          >
            FAQ
          </a>
        </nav>

        {/* Desktop Actions */}
        <div className="hidden sm:flex items-center gap-3">
          {onOpenVideo && (
            <button
              onClick={onOpenVideo}
              className="flex items-center gap-2 px-3.5 py-2 text-xs font-mono uppercase tracking-wider text-slate-300 hover:text-white rounded-lg border border-white/10 hover:border-white/20 hover:bg-white/5 transition-all"
            >
              <Play className="w-3.5 h-3.5 text-violet-400 fill-violet-400/40" />
              <span>Demo</span>
            </button>
          )}
          <a
            href="#generator"
            onClick={(e) => {
              if (onScrollToGenerator) {
                e.preventDefault();
                onScrollToGenerator();
              }
            }}
            className="btn-electric flex items-center gap-1.5 rounded-lg px-4 py-2 text-xs font-semibold tracking-wide text-white"
          >
            <span>Video erstellen</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden flex items-center p-2 text-slate-300 hover:text-white"
          aria-label="Menü öffnen"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-white/10 bg-[#0A0815] px-6 py-6 space-y-4">
          <nav className="flex flex-col space-y-3 text-base text-slate-200">
            <a
              href="#pipeline"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-violet-400"
            >
              Transformation
            </a>
            <a
              href="#how-it-works"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-violet-400"
            >
              So funktioniert es
            </a>
            <a
              href="#founder"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-violet-400"
            >
              Kurz erklärt (Timo)
            </a>
            <a
              href="#showcase"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-violet-400"
            >
              Beispiel-Reels
            </a>
            <a
              href="#generator"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-violet-400"
            >
              Generator Shell
            </a>
            <a
              href="#faq"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-violet-400"
            >
              Häufige Fragen
            </a>
          </nav>
          <div className="pt-4 border-t border-white/10 flex flex-col gap-3">
            {onOpenVideo && (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenVideo();
                }}
                className="w-full py-2.5 rounded-lg border border-white/15 text-sm font-medium text-slate-200 flex items-center justify-center gap-2"
              >
                <Play className="w-4 h-4 text-violet-400" />
                Demo-Reel ansehen (63s)
              </button>
            )}
            <a
              href="#generator"
              onClick={() => setMobileMenuOpen(false)}
              className="btn-electric w-full py-2.5 rounded-lg text-sm font-semibold text-center text-white flex items-center justify-center gap-2"
            >
              <span>Jetzt Reel erstellen</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
