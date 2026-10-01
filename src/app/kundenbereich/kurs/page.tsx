"use client";

import Link from "next/link";
import { ArrowLeft, BookOpen, CheckCircle2, Clock, Lock, Sparkles, Video } from "lucide-react";

const MODULES = [
  {
    number: "Modul 1",
    title: "Account-Setup & TikTok-Vorbereitung",
    duration: "Lektion 1",
    summary: "Das optimale Profil-Setup für maximale Ausspielung in der Building-Nische.",
    topics: [
      "Optimierung von Profilbild, Bio und Call-to-Action",
      "Kategorie-Einstellung und Nischen-Signal für den Algorithmus",
      "Wärmephase für neue Accounts: Dos & Don'ts vor dem ersten Upload",
    ],
  },
  {
    number: "Modul 2",
    title: "Der optimale Upload-Zeitpunkt & Frequenz",
    duration: "Lektion 2",
    summary: "Wann und wie oft Videos veröffentlicht werden sollten, um die For-You-Page zu dominieren.",
    topics: [
      "Beste Posting-Zeiten nach Zielgruppenanalyse",
      "Ideale Upload-Frequenz für konstantes Follower-Wachstum",
      "Wann ein Repost Sinn macht und wann er schadet",
    ],
  },
  {
    number: "Modul 3",
    title: "Virale Sounds, Hooks & Beschreibungen",
    duration: "Lektion 3",
    summary: "Wie du mit minimalem Zusatzaufwand die Retention über 60 Sekunden hältst.",
    topics: [
      "Trend-Sounds finden und im Hintergrund einbinden",
      "Die 3-Sekunden-Regel: Zusätzliche Text-Overlays für Scroll-Stopps",
      "Beschreibungen und Hashtags, die Kommentare provozieren",
    ],
  },
  {
    number: "Modul 4",
    title: "Monetarisierung & Auszahlung",
    duration: "Lektion 4",
    summary: "Schritt-für-Schritt von den ersten Views zu monatlichen Einnahmen.",
    topics: [
      "Voraussetzungen für das TikTok Creator Rewards Programm",
      "Warum 60+ Sekunden Videos den höchsten RPM (1,50 €+) erzielen",
      "Auszahlungsmethoden, Steuern und Skalierung auf mehrere Accounts",
    ],
  },
];

export default function CoursePage() {
  return (
    <div className="px-4 py-8 sm:px-6 lg:px-10 lg:py-10">
      <div className="mx-auto max-w-5xl">
        <div className="mb-6">
          <Link
            href="/kundenbereich"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#686c73] transition hover:text-[#5d4de1]"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> Zurück zur Übersicht
          </Link>
        </div>

        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-[#dedbe7] bg-white px-3 py-1 text-xs font-black uppercase tracking-[0.14em] text-[#5d4de1]">
              <BookOpen className="h-3.5 w-3.5" />
              Separater Kurs · 19 €
            </div>
            <h1 className="mt-3 text-4xl font-black tracking-[-0.055em] text-[#101114] sm:text-5xl">
              Richtig Uploaden = Viral gehen
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-[#686c73] sm:text-base">
              Timos praxiserprobte Anleitung, wie du deine generierten KI-Building-Videos optimal veröffentlichst, um maximale Klicks, Reichweite und Einnahmen auf TikTok aufzubauen.
            </p>
          </div>

          <div className="shrink-0 rounded-2xl border border-[#e4e1ec] bg-white p-5 text-right sm:min-w-[180px]">
            <span className="text-xs font-bold uppercase tracking-wider text-[#8a8e94]">Kurspreis</span>
            <div className="mt-1 text-3xl font-black text-[#101114]">19 €</div>
            <span className="text-xs font-bold text-[#5d4de1]">Einmalige Freischaltung</span>
          </div>
        </div>

        {/* Content-Slot Hinweis / Status-Banner */}
        <section className="mt-8 rounded-2xl border border-[#dedbe7] bg-white p-6 shadow-sm sm:p-7">
          <div className="flex items-start gap-4">
            <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[#f0edff] text-[#5d4de1]">
              <Sparkles className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-lg font-black text-[#101114]">Kurs-Vorschau & Vorläufiger Content-Slot</h2>
              <p className="mt-1.5 text-sm leading-6 text-[#686c73]">
                Dieser Bereich ist für Timos 19-€-Kurs vorbereitet. Sobald Timos finale Lektionstexte und Video-Links eingesetzt werden, stehen alle Inhalte hier direkt zum Abrufen bereit.
              </p>
            </div>
          </div>
        </section>

        {/* CONTENT-SLOT: Timos finale Texte und Video-Lektionen werden hier eingesetzt */}
        <section className="mt-10">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs font-black uppercase tracking-[0.16em] text-[#5d4de1]">Lehrplan</span>
              <h2 className="mt-1 text-2xl font-black tracking-[-0.04em] text-[#101114]">Übersicht der Module</h2>
            </div>
            <span className="text-xs font-bold text-[#8a8e94]">4 Module · Schritt für Schritt</span>
          </div>

          <div className="mt-6 space-y-4">
            {MODULES.map((mod) => (
              <article
                key={mod.number}
                className="overflow-hidden rounded-2xl border border-[#e4e1ec] bg-white p-6 shadow-sm transition hover:border-[#b9b0ff]"
              >
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-center gap-3">
                    <span className="rounded-lg bg-[#f0edff] px-2.5 py-1 text-xs font-black text-[#5d4de1]">
                      {mod.number}
                    </span>
                    <h3 className="text-lg font-black text-[#101114]">{mod.title}</h3>
                  </div>
                  <div className="flex items-center gap-3 text-xs font-bold text-[#8a8e94]">
                    <span className="inline-flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5" /> {mod.duration}
                    </span>
                    <span className="inline-flex items-center gap-1 text-[#6d5dfc]">
                      <Video className="h-3.5 w-3.5" /> Video + Text
                    </span>
                  </div>
                </div>

                <p className="mt-3 text-sm leading-6 text-[#686c73]">{mod.summary}</p>

                <div className="mt-5 rounded-xl border border-[#f0edff] bg-[#faf9ff] p-4">
                  <div className="text-xs font-black uppercase tracking-wider text-[#5d4de1]">Inhalte dieser Lektion:</div>
                  <ul className="mt-2.5 space-y-2">
                    {mod.topics.map((topic) => (
                      <li key={topic} className="flex items-start gap-2 text-xs font-semibold text-[#4f555d]">
                        <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#6d5dfc]" />
                        <span>{topic}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-4 flex items-center justify-between border-t border-[#f2f0f7] pt-4 text-xs font-bold text-[#8a8e94]">
                  <span className="inline-flex items-center gap-1.5">
                    <Lock className="h-3.5 w-3.5 text-[#a1a5ab]" /> In Vorbereitung durch Timo
                  </span>
                  <span className="text-[#5d4de1]">Wird freigeschaltet</span>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Support & Community Box */}
        <section className="mt-10 rounded-2xl border border-[#dedbe7] bg-white p-6 sm:p-8">
          <h3 className="text-lg font-black text-[#101114]">Fragen zu Timos Upload-Strategie?</h3>
          <p className="mt-2 max-w-xl text-sm leading-6 text-[#686c73]">
            Timo hat mit diesen Strategien über 100 Mio. Views erzielt. Bei Fragen zum Kurs wende dich an unseren Support oder nutze die Schritt-für-Schritt-Anleitungen direkt nach Erstellung deines Videos.
          </p>
        </section>
      </div>
    </div>
  );
}
