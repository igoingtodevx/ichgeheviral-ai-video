"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "./ThemeProvider";

export function ThemeToggle({ className = "" }: { className?: string }) {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      data-theme-toggle
      aria-label={isDark ? "Hellmodus aktivieren" : "Dunkelmodus aktivieren"}
      aria-pressed={isDark}
      title={isDark ? "Hellmodus aktivieren" : "Dunkelmodus aktivieren"}
      className={`inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#e6e4ef] bg-white text-[#101114] transition hover:border-[#b9b0ff] hover:text-[#5947e8] ${className}`}
    >
      {isDark ? <Sun className="h-4 w-4" aria-hidden="true" /> : <Moon className="h-4 w-4" aria-hidden="true" />}
    </button>
  );
}
