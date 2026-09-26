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
  title: "IchGeheViral — Reels für maximales Viralpotenzial",
  description:
    "Aus einer Idee entsteht automatisch ein fertiges 60+ Sekunden 9:16 Transformations-Reel — mit sichtbarer Progression, starkem Final-Reveal und ohne Credit-System.",
  openGraph: {
    title: "IchGeheViral — Reels für maximales Viralpotenzial",
    description:
      "Automatisch erstellte Transformations-Reels für TikTok, Instagram Reels und YouTube Shorts — 60+ Sekunden, 9:16 und ohne Credit-System.",
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
      data-theme="violet"
      className={`${geistSans.variable} ${geistMono.variable} h-full`}
    >
      <body className="min-h-screen bg-[#07060B] text-slate-100 antialiased">
        {children}
      </body>
    </html>
  );
}
