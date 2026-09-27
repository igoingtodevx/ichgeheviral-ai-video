import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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
    "Aus einer verfügbaren Transformation entsteht ein fertiges 60+ Sekunden 9:16 Reel mit sichtbarer Entwicklung und starkem Final-Reveal. Poolbau ist die erste verfügbare Kategorie.",
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
    <html lang="de" className={`${geistSans.variable} ${geistMono.variable} h-full`}>
      <body className="min-h-screen bg-white text-[#101114] antialiased">{children}</body>
    </html>
  );
}
