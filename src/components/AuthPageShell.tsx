import Link from "next/link";
import type { ReactNode } from "react";

export const AUTH_APPEARANCE = {
  variables: {
    colorPrimary: "#6d5dfc",
    colorBackground: "var(--auth-card)",
    colorInputBackground: "var(--auth-input)",
    colorInputText: "var(--auth-text)",
    colorText: "var(--auth-text)",
    colorTextSecondary: "var(--auth-muted)",
  },
  elements: {
    card: "!bg-transparent !shadow-none !p-0",
  },
};

export function AuthPageShell({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow: string;
  title: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <main className="min-h-screen bg-[#f7f7fb] px-4 py-10 text-[#101114] sm:py-16">
      <div className="mx-auto max-w-md">
        <Link href="/" className="block text-center text-2xl font-black tracking-[-0.05em]">
          IchGehe<span className="text-[#6d5dfc]">Viral</span>
        </Link>
        <div className="mt-8 rounded-[28px] border border-[#e4e1ec] bg-white p-6 shadow-[0_18px_60px_rgba(37,31,68,.08)] sm:p-8">
          <div className="mb-6">
            <div className="text-xs font-black uppercase tracking-[0.16em] text-[#5d4de1]">{eyebrow}</div>
            <h1 className="mt-2 text-3xl font-black tracking-[-0.05em]">{title}</h1>
            <p className="mt-2 text-sm leading-6 text-[#686c73]">{description}</p>
          </div>
          <div className="mb-6 rounded-xl border border-[#dedbe7] bg-[#f8f7ff] p-3.5 text-xs text-[#5140d8]">
            <p className="font-bold">Google-Anmeldung:</p>
            <p className="mt-1 leading-5 text-[#5947e8]">
              Melde dich bitte mit demselben Google-Konto an, mit dem der Account erstellt wurde.
            </p>
          </div>
          {children}
        </div>
        <p className="mt-6 text-center text-xs font-semibold text-[#8a8e94]">
          Sicherer Zugang zum IchGeheViral-Kundenbereich
        </p>
      </div>
    </main>
  );
}
