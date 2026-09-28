export type StudioReelStatus = "Fertig" | "Marketing-Demo";

export interface StudioReel {
  slug: string;
  title: string;
  subtitle: string;
  status: StudioReelStatus;
  duration: string;
  phaseCount: number;
  videoSrc: string | null;
  posterSrc: string;
  stateImages: string[];
  styleLabel: string;
  summary: string;
  isDemo: boolean;
  sourceLabel: string;
}

export const REAL_STUDIO_REELS: StudioReel[] = [
  {
    slug: "modern-rechteckig",
    title: "Moderne Pooloase",
    subtitle: "Rechteckiger Luxus-Pool mit Travertin, Pergola und Wasserfall",
    status: "Fertig",
    duration: "63 Sek.",
    phaseCount: 8,
    videoSrc: "/media/videos/golden-pool-run1.mp4",
    posterSrc: "/media/states/run1/state_08.jpg",
    stateImages: Array.from({ length: 8 }, (_, index) =>
      `/media/states/run1/state_${String(index + 1).padStart(2, "0")}.jpg`
    ),
    styleLabel: "Golden V1 · Modern",
    summary:
      "Vom verwilderten Hinterhof bis zur fertigen modernen Pooloase in acht sichtbaren Bauphasen.",
    isDemo: false,
    sourceLabel: "Echte Golden-V1-MP4",
  },
  {
    slug: "mediterrane-lagune",
    title: "Mediterrane Lagunen-Oase",
    subtitle: "Organischer Naturstein-Pool mit Spa, Palmen und mediterraner Gestaltung",
    status: "Fertig",
    duration: "63 Sek.",
    phaseCount: 8,
    videoSrc: "/media/videos/golden-pool-run2.mp4",
    posterSrc: "/media/states/run2/state_08.jpg",
    stateImages: Array.from({ length: 8 }, (_, index) =>
      `/media/states/run2/state_${String(index + 1).padStart(2, "0")}.jpg`
    ),
    styleLabel: "Golden V1 · Mediterran",
    summary:
      "Eine mediterrane Außenanlage entwickelt sich Schritt für Schritt zur organischen Pool-Lagune.",
    isDemo: false,
    sourceLabel: "Echte Golden-V1-MP4",
  },
];

const MARKETING_SEED_TITLES = [
  "Stadtgarten mit Infinity-Pool",
  "Kompakte Poolterrasse mit Naturstein",
  "Hinterhof mit Abendbeleuchtung",
  "Familienpool mit Loungezone",
  "Mediterrane Gartenkante",
  "Pooldeck aus warmem Holz",
  "Minimalistische Betonoptik",
  "Pool mit integrierter Sitzbank",
  "Gartenhang mit Wasserlauf",
  "Kleine Oase mit Außendusche",
  "Naturstein-Pool mit Feuerstelle",
  "Terrasse mit ruhiger Wasserlinie",
  "Innenhof zur Wellness-Oase",
  "Poolgarten mit Pergola",
  "Baugrundstück zum Designgarten",
  "Organische Lagunenform",
  "Schmaler Garten, großer Reveal",
  "Pool mit versenkter Lounge",
  "Sommergarten mit Wasserfall",
  "Modernes Becken im Altbauhof",
  "Travertin-Terrasse mit Spa",
  "Gartenumbau mit klarer Geometrie",
  "Poolbereich mit mediterraner Bepflanzung",
  "Wasserfläche zwischen Naturstein",
  "Dachterrasse als Mini-Oase",
  "Pool mit gestufter Holzterrasse",
  "Lichtkonzept für die Abendstimmung",
  "Finale Pooloase mit Outdoor-Küche",
] as const;

const MARKETING_SEED_POSTERS = Array.from(
  { length: MARKETING_SEED_TITLES.length },
  (_, index) => `/media/studio-seeds/marketing-demo-${String(index + 1).padStart(2, "0")}.jpg`
);

/**
 * Marketing-only seed records keep the dashboard visually useful before real
 * customer accounts exist. Their poster derivatives are made from existing
 * Golden-V1 state frames; they intentionally do not point to a generated MP4.
 */
export const MARKETING_SEED_REELS: StudioReel[] = MARKETING_SEED_TITLES.map((title, index) => {
  const posterSrc = MARKETING_SEED_POSTERS[index % MARKETING_SEED_POSTERS.length];
  return {
    slug: `marketing-demo-${String(index + 1).padStart(2, "0")}`,
    title,
    subtitle: "Marketing-Beispiel für eine Poolbau-Transformation",
    status: "Marketing-Demo",
    duration: "Demo-Ansicht",
    phaseCount: 8,
    videoSrc: null,
    posterSrc,
    stateImages: [posterSrc],
    styleLabel: `Poolbau · Demo ${String(index + 1).padStart(2, "0")}`,
    summary:
      "Marketing-Demo-Eintrag zur Darstellung der Videobibliothek — keine separate Generation ausgelöst.",
    isDemo: true,
    sourceLabel: "Marketing-Demo · Seed-Daten",
  };
});

/** All records used by the static demo routes. Real assets stay first and identifiable. */
export const STUDIO_REELS: StudioReel[] = [...REAL_STUDIO_REELS, ...MARKETING_SEED_REELS];

export const PRODUCTION_STEPS = [
  {
    title: "Transformation bestätigt",
    description: "Die freigegebene Transformation und das feste Zielbild stehen fest.",
  },
  {
    title: "Szenen aufgebaut",
    description: "Vom Ausgangszustand bis zum fertigen Zielbild entsteht ein klarer visueller Fortschritt.",
  },
  {
    title: "Übergänge abgestimmt",
    description: "Die Szenen werden zu einer flüssigen Entwicklung miteinander verbunden.",
  },
  {
    title: "Atmosphäre ergänzt",
    description: "Bild und Ton geben dem Reel die passende Atmosphäre.",
  },
  {
    title: "Finales Reel",
    description: "Alle Phasen werden zu deinem fertigen vertikalen Reel mit über 60 Sekunden Laufzeit zusammengesetzt.",
  },
] as const;
