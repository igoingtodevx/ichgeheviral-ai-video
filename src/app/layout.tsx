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
  title: "IchGeheViral — Eine Idee. Dein fertiges 60s Reel. Vollautomatisch.",
  description:
    "Der autonome KI-Video-Agent für Creator & Brands. Verwandelt ein simples Thema in kohärente Transformations-Phasen, nahtlose Videoübergänge und ein fertiges 60+ Sekunden 9:16 Video.",
  openGraph: {
    title: "IchGeheViral — Autonomer KI-Video-Generator",
    description: "Aus einer Idee wird ein virales 60+ Sekunden Reel. Vollautomatisch mit nativer Akustik und konsistenter Architektur.",
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
      <body className="min-h-screen bg-[#07060B] text-slate-100 antialiased selection:bg-purple-600 selection:text-white">
        {children}
      </body>
    </html>
  );
}
