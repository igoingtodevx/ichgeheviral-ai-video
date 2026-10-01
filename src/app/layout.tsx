import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";
import Script from "next/script";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "../components/ThemeProvider";
import { CLERK_PUBLISHABLE_KEY, isClerkConfigured } from "../lib/auth";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "IchGeheViral — Transformations-Reels für starken Content",
  description:
    "Aus einer verfügbaren Transformation entsteht ein fertiges 60+ Sekunden 9:16 Reel mit sichtbarer Entwicklung und klarem Finale. Poolbau ist die erste verfügbare Kategorie.",
  openGraph: {
    title: "IchGeheViral — Transformations-Reels für starken Content",
    description:
      "Erstellte Transformations-Reels für TikTok, Instagram Reels und YouTube Shorts — 60+ Sekunden, 9:16. Poolbau ist die erste verfügbare Kategorie.",
    siteName: "IchGeheViral",
    locale: "de_DE",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="de"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full`}
    >
      <Script id="theme-init" strategy="beforeInteractive">
        {`(() => {
          try {
            const key = "ichgeheviral-theme";
            const stored = window.localStorage.getItem(key);
            const theme = stored === "dark" || stored === "light"
              ? stored
              : (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
            document.documentElement.dataset.theme = theme;
            document.documentElement.style.colorScheme = theme;
          } catch {
            document.documentElement.dataset.theme = "light";
          }
        })();`}
      </Script>
      <body className="min-h-screen antialiased">
        {isClerkConfigured ? (
          <ClerkProvider publishableKey={CLERK_PUBLISHABLE_KEY}>
            <ThemeProvider>{children}</ThemeProvider>
          </ClerkProvider>
        ) : (
          <ThemeProvider>{children}</ThemeProvider>
        )}
      </body>
    </html>
  );
}
