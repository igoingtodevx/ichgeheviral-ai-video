export interface BusinessPackage {
  id: "ai-video" | "ai-video-course";
  name: string;
  tagline: string;
  price_eur: number | null;
  add_course: boolean;
  features: string[];
  highlight: boolean;
}

export interface BusinessConfig {
  version: 1;
  app_url: string | null;
  shopify: {
    store_domain: string | null;
    video_product_id: string | null;
    video_variant_id: string | null;
    course_product_id: string | null;
    course_variant_id: string | null;
  };
  packages: BusinessPackage[];
  content: {
    hero_video_url: string | null;
    support_email: string | null;
    legal_entity: string | null;
    imprint_text: string | null;
    privacy_text: string | null;
    terms_text: string | null;
  };
  product_ready: boolean;
}

export interface PublicConfig {
  config: BusinessConfig;
  checkout_enabled: boolean;
  launch_missing: string[];
}

export const SAFE_PUBLIC_CONFIG: PublicConfig = {
  config: {
    version: 1,
    app_url: null,
    shopify: { store_domain: null, video_product_id: null, video_variant_id: null, course_product_id: null, course_variant_id: null },
    packages: [
      { id: "ai-video", name: "Transformations-Reel", tagline: "Ein fertiges Reel aus einer sichtbaren Veränderung", price_eur: null, add_course: false, features: [], highlight: true },
      { id: "ai-video-course", name: "Transformations-Reel + Marketing-Kurs", tagline: "Video mit zusätzlichem Marketing-Kurs", price_eur: null, add_course: true, features: [], highlight: false },
    ],
    content: { hero_video_url: null, support_email: null, legal_entity: null, imprint_text: null, privacy_text: null, terms_text: null },
    product_ready: false,
  },
  checkout_enabled: false,
  launch_missing: ["configuration_unavailable"],
};

function record(value: unknown): value is Record<string, unknown> {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}
function text(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0 && value.length <= 50000;
}
function nullableText(value: unknown): value is string | null {
  return value === null || text(value);
}
export function safeHttpUrl(value: unknown): value is string {
  if (!text(value)) return false;
  try {
    const url = new URL(value);
    return (url.protocol === "https:" || (url.protocol === "http:" && ["localhost", "127.0.0.1", "[::1]"].includes(url.hostname))) && !url.username && !url.password;
  } catch { return false; }
}

/** Validate the complete public boundary, then project only allowed public fields. */
export function parsePublicConfig(value: unknown): PublicConfig | null {
  if (!record(value) || typeof value.checkout_enabled !== "boolean" || !Array.isArray(value.launch_missing) || !value.launch_missing.every(text)) return null;
  const c = value.config;
  if (!record(c) || c.version !== 1 || typeof c.product_ready !== "boolean" || !(c.app_url === null || safeHttpUrl(c.app_url))) return null;
  if (!record(c.shopify) || !record(c.content) || !Array.isArray(c.packages) || c.packages.length !== 2) return null;
  const s = c.shopify;
  const t = c.content;
  for (const key of ["store_domain", "video_product_id", "video_variant_id", "course_product_id", "course_variant_id"]) {
    if (!nullableText(s[key])) return null;
  }
  if (s.store_domain !== null && (typeof s.store_domain !== "string" || !/^[a-z0-9][a-z0-9.-]*\.myshopify\.com$/i.test(s.store_domain))) return null;
  for (const key of ["support_email", "legal_entity", "imprint_text", "privacy_text", "terms_text"]) {
    if (!nullableText(t[key])) return null;
  }
  if (t.support_email !== null && (typeof t.support_email !== "string" || !/^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/.test(t.support_email))) return null;
  if (!(t.hero_video_url === null || safeHttpUrl(t.hero_video_url))) return null;
  const packages: BusinessPackage[] = [];
  for (const p of c.packages) {
    if (!record(p) || typeof p.id !== "string" || !["ai-video", "ai-video-course"].includes(p.id) || !text(p.name) || !text(p.tagline) || typeof p.add_course !== "boolean" || typeof p.highlight !== "boolean") return null;
    if (p.price_eur !== null && (typeof p.price_eur !== "number" || !Number.isFinite(p.price_eur) || p.price_eur <= 0)) return null;
    if (!Array.isArray(p.features) || !p.features.every(text) || p.add_course !== (p.id === "ai-video-course") || packages.some((other) => other.id === p.id)) return null;
    packages.push({ id: p.id as BusinessPackage["id"], name: p.name, tagline: p.tagline, price_eur: p.price_eur as number | null, add_course: p.add_course, features: p.features, highlight: p.highlight });
  }
  const config: BusinessConfig = {
    version: 1, app_url: c.app_url as string | null, product_ready: c.product_ready,
    shopify: { store_domain: s.store_domain as string | null, video_product_id: s.video_product_id as string | null, video_variant_id: s.video_variant_id as string | null, course_product_id: s.course_product_id as string | null, course_variant_id: s.course_variant_id as string | null },
    content: { hero_video_url: t.hero_video_url as string | null, support_email: t.support_email as string | null, legal_entity: t.legal_entity as string | null, imprint_text: t.imprint_text as string | null, privacy_text: t.privacy_text as string | null, terms_text: t.terms_text as string | null },
    packages,
  };
  return { config, checkout_enabled: value.checkout_enabled, launch_missing: value.launch_missing };
}

export function canCheckout(state: PublicConfig, pkg: BusinessPackage): boolean {
  const { config: c } = state;
  return state.checkout_enabled === true && c.product_ready === true && state.launch_missing.length === 0
    && !!c.app_url && !!c.shopify.store_domain && !!c.shopify.video_product_id && !!c.shopify.video_variant_id
    && !!c.content.legal_entity && !!c.content.imprint_text && !!c.content.privacy_text && !!c.content.terms_text && !!c.content.support_email
    && pkg.price_eur !== null && c.packages.some((p) => p.id === pkg.id && p.price_eur !== null)
    && (!pkg.add_course || (!!c.shopify.course_product_id && !!c.shopify.course_variant_id));
}

export async function fetchPublicConfig(baseUrl: string, fetcher: typeof fetch = fetch): Promise<PublicConfig> {
  if (!baseUrl) return SAFE_PUBLIC_CONFIG;
  try {
    const response = await fetcher(`${baseUrl.replace(/\/$/, "")}/public/config`, { cache: "no-store", signal: AbortSignal.timeout(4000) });
    if (!response.ok) return SAFE_PUBLIC_CONFIG;
    return parsePublicConfig(await response.json()) ?? SAFE_PUBLIC_CONFIG;
  } catch { return SAFE_PUBLIC_CONFIG; }
}

export function packageHref(id: BusinessPackage["id"]): string {
  return `/kundenbereich/neu?package=${encodeURIComponent(id)}`;
}
