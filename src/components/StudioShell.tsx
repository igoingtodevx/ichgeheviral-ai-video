"use client";

import Link from "next/link";
import { UserButton } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import { Gauge, Home, PlusCircle, ExternalLink } from "lucide-react";
import type { ReactNode } from "react";
import { ThemeToggle } from "./ThemeToggle";

const NAV_ITEMS = [
  { href: "/kundenbereich", label: "Meine Reels", mobileLabel: "Meine Reels", icon: Home },
  { href: "/kundenbereich/neu", label: "Neues Reel", mobileLabel: "Neues Reel", icon: PlusCircle },
  { href: "/kundenbereich/produktion", label: "Produktionsstatus", mobileLabel: "Status", icon: Gauge },
];

export function StudioShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-[#f7f7fb] text-[#101114]">
      <div className="mx-auto min-h-screen max-w-[1500px] lg:grid lg:grid-cols-[248px_1fr]">
        <aside className="hidden border-r border-[#e6e4ef] bg-white lg:sticky lg:top-0 lg:flex lg:h-screen lg:min-h-0 lg:flex-col">
          <div className="px-6 py-7">
            <Link href="/kundenbereich" className="inline-flex items-baseline gap-2 text-xl font-black tracking-[-0.05em]">
              IchGehe<span className="text-[#6d5dfc]">Viral</span>
              <span className="text-sm font-extrabold tracking-normal text-[#a1a5ab]">Studio</span>
            </Link>
          </div>

          <nav className="px-3">
            {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
              const active = pathname === href || (href !== "/kundenbereich" && pathname.startsWith(href));
              return (
                <Link
                  key={href}
                  href={href}
                  className={`mb-1 flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-bold transition ${
                    active
                      ? "bg-[#f0edff] text-[#5140d8]"
                      : "text-[#666b72] hover:bg-[#f7f7fb] hover:text-[#101114]"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {label}
                </Link>
              );
            })}
          </nav>

          <div className="mt-auto px-4 pb-5">
            <div className="mb-3 flex items-center gap-3 rounded-2xl border border-[#e6e4ef] bg-white p-3">
              <UserButton />
              <span className="text-xs font-bold text-[#777b82]">Mein Konto</span>
            </div>
            <div className="mb-3 flex items-center justify-between rounded-2xl border border-[#e6e4ef] bg-white p-3">
              <span className="text-xs font-bold text-[#777b82]">Erscheinungsbild</span>
              <ThemeToggle />
            </div>
            <div className="rounded-2xl border border-[#e3dfff] bg-[#f8f7ff] p-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.14em] text-[#6555e8]">
                <Gauge className="h-4 w-4" />
                Poolbau-Reels
              </div>
              <p className="mt-2 text-xs leading-5 text-[#777b82]">
                Klare Vorher-Nachher-Geschichten für dein Studio.
              </p>
            </div>
            <Link
              href="/"
              className="mt-3 flex items-center gap-2 px-2 py-2 text-xs font-bold text-[#777b82] hover:text-[#101114]"
            >
              <ExternalLink className="h-3.5 w-3.5" />
              Zur Website
            </Link>
          </div>
        </aside>

        <div className="min-w-0">
          <header className="sticky top-0 z-40 border-b border-[#e6e4ef] bg-white/95 backdrop-blur lg:hidden">
            <div className="flex h-16 items-center justify-between gap-3 px-4">
              <Link href="/kundenbereich" className="text-lg font-black tracking-[-0.04em]">
                IchGehe<span className="text-[#6d5dfc]">Viral</span>{" "}
                <span className="text-sm text-[#a1a5ab]">Studio</span>
              </Link>
              <div className="flex shrink-0 items-center gap-2">
                <UserButton />
                <ThemeToggle className="h-9 w-9" />
                <Link
                  href="/kundenbereich/neu"
                  className="inline-flex items-center gap-2 rounded-full bg-[#6d5dfc] px-4 py-2.5 text-xs font-black text-white"
                >
                  <PlusCircle className="h-4 w-4" />
                  Neues Reel
                </Link>
              </div>
            </div>
            <nav className="flex overflow-x-auto px-3 pb-2">
              {NAV_ITEMS.map(({ href, label, mobileLabel, icon: Icon }) => {
                const active = pathname === href || (href !== "/kundenbereich" && pathname.startsWith(href));
                return (
                  <Link
                    key={href}
                    href={href}
                    className={`mr-2 inline-flex shrink-0 items-center gap-2 rounded-full px-3 py-2 text-xs font-bold ${
                      active ? "bg-[#f0edff] text-[#5140d8]" : "text-[#777b82]"
                    }`}
                  >
                    <Icon className="h-3.5 w-3.5" />
                    <span className="sm:hidden">{mobileLabel}</span>
                    <span className="hidden sm:inline">{label}</span>
                  </Link>
                );
              })}
            </nav>
          </header>

          <main className="min-h-screen">{children}</main>
        </div>
      </div>
    </div>
  );
}
