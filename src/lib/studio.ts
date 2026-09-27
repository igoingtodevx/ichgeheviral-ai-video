export interface StudioReel {
  slug: string;
  title: string;
  subtitle: string;
  status: "Fertig";
  duration: string;
  phaseCount: number;
  videoSrc: string;
  posterSrc: string;
  stateImages: string[];
  styleLabel: string;
  summary: string;
}

export const STUDIO_REELS: StudioReel[] = [
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
    styleLabel: "Modern & rechteckig",
    summary:
      "Vom verwilderten Hinterhof bis zur fertigen modernen Pooloase in acht sichtbaren Bauphasen.",
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
    styleLabel: "Mediterrane Lagune",
    summary:
      "Eine mediterrane Außenanlage entwickelt sich Schritt für Schritt zur organischen Pool-Lagune.",
  },
];

export const PRODUCTION_STEPS = [
  {
    title: "Pool-Stil bestätigt",
    description: "Die freigegebene Pool-Variante und das feste Zielbild stehen fest.",
  },
  {
    title: "8 Bauzustände",
    description: "Vom Ausgangszustand bis zur fertigen Pooloase entstehen acht aufeinander aufbauende Bilder.",
  },
  {
    title: "7 Übergänge",
    description: "Die Bauzustände werden als fortlaufende Transformations-Timelapse miteinander verbunden.",
  },
  {
    title: "Umgebungsakustik",
    description: "Baustellen- und Umgebungsgeräusche ergänzen die visuellen Übergänge.",
  },
  {
    title: "Finales Reel",
    description: "Alle Phasen werden zu einem fertigen vertikalen 60+ Sekunden MP4 zusammengesetzt.",
  },
] as const;
