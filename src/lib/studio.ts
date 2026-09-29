export type StudioReelStatus = "Fertig" | "Beispiel";

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
    styleLabel: "Poolbau · Modern",
    summary:
      "Vom verwilderten Hinterhof bis zur fertigen modernen Pooloase in acht sichtbaren Szenen.",
    isDemo: false,
    sourceLabel: "Fertiges Poolbau-Reel",
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
    styleLabel: "Poolbau · Mediterran",
    summary:
      "Eine mediterrane Außenanlage entwickelt sich Schritt für Schritt zur organischen Pool-Lagune.",
    isDemo: false,
    sourceLabel: "Fertiges Poolbau-Reel",
  },
];

const MARKETING_SEED_TITLES = [
  "Infinity-Pool im Stadtgarten",
  "Kompakte Poolterrasse",
  "Pool im Abendlicht",
  "Familienpool mit Lounge",
  "Mediterrane Gartenkante",
  "Pooldeck aus warmem Holz",
  "Minimalistische Betonoptik",
  "Pool mit Sitzbank",
  "Pool am Gartenhang",
  "Oase mit Außendusche",
  "Naturstein-Pool mit Feuer",
  "Ruhige Poolterrasse",
  "Innenhof als Wellness-Oase",
  "Poolgarten mit Pergola",
  "Baugrundstück zum Pool",
  "Organische Lagunenform",
  "Pool im schmalen Garten",
  "Pool mit versenkter Lounge",
  "Sommergarten mit Wasserfall",
  "Modernes Becken im Altbauhof",
  "Travertin-Terrasse mit Spa",
  "Gartenumbau mit Geometrie",
  "Mediterraner Poolbereich",
  "Wasser zwischen Naturstein",
  "Dachterrasse als Mini-Oase",
  "Pool mit Holzterrasse",
  "Abendlicht am Pool",
  "Pooloase mit Outdoor-Küche",
] as const;

const MARKETING_SEED_POSTERS = Array.from(
  { length: MARKETING_SEED_TITLES.length },
  (_, index) => `/media/studio-seeds/marketing-demo-${String(index + 1).padStart(2, "0")}.jpg`
);

const MARKETING_SEED_STYLES = [
  "Poolbau · Modern",
  "Poolbau · Mediterran",
  "Poolbau · Abendlicht",
  "Poolbau · Lounge",
  "Poolbau · Naturstein",
  "Poolbau · Minimal",
  "Poolbau · Holzterrasse",
  "Poolbau · Outdoor",
] as const;

const MARKETING_SEED_DURATIONS = [
  "58 Sek.",
  "61 Sek.",
  "54 Sek.",
  "67 Sek.",
  "63 Sek.",
  "72 Sek.",
  "56 Sek.",
  "64 Sek.",
] as const;

const MARKETING_SEED_PHASE_COUNTS = [7, 8, 6, 9, 8, 10, 7, 8] as const;

/**
 * The dashboard stays visually populated before the customer-account backend
 * is connected. The records use prepared poster views until their generated
 * video files are available.
 */
export const MARKETING_SEED_REELS: StudioReel[] = MARKETING_SEED_TITLES.map((title, index) => {
  const posterSrc = MARKETING_SEED_POSTERS[index % MARKETING_SEED_POSTERS.length];
  return {
    slug: `marketing-demo-${String(index + 1).padStart(2, "0")}`,
    title,
    subtitle: "Poolbau-Transformation vom Ausgangszustand bis zum fertigen Ergebnis",
    status: "Fertig",
    duration: MARKETING_SEED_DURATIONS[index % MARKETING_SEED_DURATIONS.length],
    phaseCount: MARKETING_SEED_PHASE_COUNTS[index % MARKETING_SEED_PHASE_COUNTS.length],
    videoSrc: null,
    posterSrc,
    stateImages: [posterSrc],
    styleLabel: MARKETING_SEED_STYLES[index % MARKETING_SEED_STYLES.length],
    summary: "Schritt für Schritt vom Ausgangszustand bis zur fertigen Poolanlage.",
    isDemo: true,
    sourceLabel: "Fertiges Poolbau-Reel",
  };
});

/** All records used by the static demo routes. Real assets stay first and identifiable. */
export const STUDIO_REELS: StudioReel[] = [...REAL_STUDIO_REELS, ...MARKETING_SEED_REELS];

export const PRODUCTION_STEPS = [
  {
    title: "Transformation bestätigt",
    description: "Die freigegebene Transformation und das Zielbild sind definiert.",
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
    description: "Alle Szenen werden zu deinem fertigen vertikalen Reel mit über 60 Sekunden Laufzeit zusammengesetzt.",
  },
] as const;
