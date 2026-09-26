"use client";

import React, { useEffect, useState } from "react";

type ThemeId = "violet" | "ocean" | "emerald" | "coral" | "light";

const THEMES: Array<{
  id: ThemeId;
  label: string;
  swatch: string;
}> = [
  {
    id: "violet",
    label: "Violett",
    swatch: "linear-gradient(135deg, #7c3aed, #38bdf8)",
  },
  {
    id: "ocean",
    label: "Blau",
    swatch: "linear-gradient(135deg, #2563eb, #22d3ee)",
  },
  {
    id: "emerald",
    label: "Emerald",
    swatch: "linear-gradient(135deg, #059669, #2dd4bf)",
  },
  {
    id: "coral",
    label: "Coral",
    swatch: "linear-gradient(135deg, #e11d48, #fb7185)",
  },
  {
    id: "light",
    label: "Hell",
    swatch: "linear-gradient(135deg, #f8fafc, #cbd5e1)",
  },
];

const STORAGE_KEY = "igv-preview-theme";

function isThemeId(value: string | null): value is ThemeId {
  return THEMES.some((theme) => theme.id === value);
}

export function ThemeSwitcher() {
  const [activeTheme, setActiveTheme] = useState<ThemeId>("violet");

  useEffect(() => {
    const storedTheme = window.localStorage.getItem(STORAGE_KEY);
    const nextTheme: ThemeId = isThemeId(storedTheme) ? storedTheme : "violet";

    setActiveTheme(nextTheme);
    document.documentElement.dataset.theme = nextTheme;
  }, []);

  const selectTheme = (theme: ThemeId) => {
    setActiveTheme(theme);
    document.documentElement.dataset.theme = theme;
    window.localStorage.setItem(STORAGE_KEY, theme);
  };

  return (
    <aside
      aria-label="Farbthema auswählen"
      className="fixed bottom-3 left-1/2 z-[80] w-[calc(100%-1rem)] max-w-xl -translate-x-1/2 rounded-2xl border border-white/15 bg-black/80 p-2 shadow-2xl backdrop-blur-xl sm:bottom-5 sm:w-auto"
    >
      <div className="flex items-center gap-2 overflow-x-auto">
        <span className="hidden shrink-0 px-2 text-[10px] font-mono font-bold uppercase tracking-[0.16em] text-slate-300 sm:inline">
          Farbwahl
        </span>

        {THEMES.map((theme) => {
          const isActive = activeTheme === theme.id;

          return (
            <button
              key={theme.id}
              type="button"
              onClick={() => selectTheme(theme.id)}
              aria-pressed={isActive}
              className={
                "flex min-w-fit items-center gap-2 rounded-xl border px-2.5 py-2 text-xs font-semibold transition-all " +
                (isActive
                  ? "border-white/35 bg-white/15 text-white"
                  : "border-white/10 bg-white/[0.04] text-slate-300 hover:border-white/25 hover:bg-white/[0.08] hover:text-white")
              }
            >
              <span
                aria-hidden="true"
                className="h-4 w-4 rounded-full border border-white/30 shadow-inner"
                style={{ background: theme.swatch }}
              />
              <span>{theme.label}</span>
            </button>
          );
        })}
      </div>
    </aside>
  );
}
