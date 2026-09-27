/**
 * Central product & pricing configuration.
 *
 * This is the ONLY place price information should live in the frontend.
 * Shopify owns the final charge amount — these values are for display only
 * and must be updated here once the store's public prices are approved.
 *
 * Until `priceEUR` is set on a package, the UI shows a tasteful
 * "wird in Kürze freigeschaltet" state instead of a fake number.
 */

export interface ProductPackage {
  id: "ai-video" | "ai-video-course";
  name: string;
  tagline: string;
  /** Final gross price in EUR. `null` = not yet approved for public display. */
  priceEUR: number | null;
  features: string[];
  addCourse: boolean;
  highlight?: boolean;
}

export const PRICING_LAUNCHED = false;

export const PACKAGES: ProductPackage[] = [
  {
    id: "ai-video",
    name: "AI-Video",
    tagline: "Ein fertiges Transformations-Reel",
    priceEUR: null,
    addCourse: false,
    highlight: true,
    features: [
      "1 fertiges 60+ Sekunden Reel",
      "Natives 9:16 Format",
      "8 aufeinander aufbauende Phasen",
      "Kein Videoschnitt nötig",
      "Kein Credit-System",
    ],
  },
  {
    id: "ai-video-course",
    name: "AI-Video + Marketing-Kurs",
    tagline: "Video plus Anleitung zur Auswertung",
    priceEUR: null,
    addCourse: true,
    features: [
      "Alles aus „AI-Video“",
      "Zusätzlicher Marketing-Kurs",
      "Anleitung zur Content-Auswertung",
      "Ideal für den ersten Start",
    ],
  },
];

export function formatPrice(value: number | null): string {
  if (value === null) return "Preis zum Start";
  return new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(value);
}

export function getPackage(id: ProductPackage["id"]): ProductPackage {
  const pkg = PACKAGES.find((p) => p.id === id);
  if (!pkg) throw new Error(`Unknown package: ${id}`);
  return pkg;
}
