# IchGeheViral — Project Handbook

## Zweck und Quellenstatus

Dieses Dokument beschreibt den beobachtbaren Stand des Projekts. Es ist **keine Produktvision und keine Freigabe**.

Wenn dieses Dokument einer aktuellen Quelldatei, einem Testresultat oder dem Live-System widerspricht, gilt die aktuellere Primärquelle. Nicht belegte Aussagen sind als `OPEN` markiert.

Evidenztypen:

- `SOURCE` — aus versioniertem Code, Konfiguration oder Git-Historie.
- `TEST` — aus einem reproduzierbaren Test-, Build- oder Verify-Befehl.
- `RUNTIME` — aus einem konkreten Live-/Deployment-Readback.
- `OPEN` — aus den vorhandenen Quellen nicht abschließend ableitbar.

## Repository-Snapshot

- Repository: `https://github.com/igoingtodevx/ichgeheviral-ai-video`
- Branch: `main`
- Snapshot, auf dessen Basis dieses Dokument erstellt wurde: `b08e5aea7beae7f6b8a793b936a8132dcca894bf`
- Remote `origin/main` entsprach beim Erstellen diesem Commit. `SOURCE`, Git-Readback.
- Frontend-Projekt, kein Monorepo mit dem Backend. `SOURCE`, Repository-Struktur und Railway-Service-Metadaten.
- Paketmanager: `pnpm@11.18.0`. `SOURCE`, `package.json:L31`.
- Framework: Next.js `16.3.6`; React `19.2.8`. `SOURCE`, `package.json:L13-L18`.

Versionierte Markdown-Dokumente vor diesem Handbook waren nur `AGENTS.md`, `CLAUDE.md` und `README.md`. Es gab keine zentrale Projektbeschreibung mit Timo-/Produktkontext. `SOURCE`, `git ls-files '*.md'`.

Das originale Änderungs-DOCX ist nicht Bestandteil dieses Repositories. Im Repository liegen 32 Dateien unter `screenshots/`, aber ihre vollständige Zuordnung zum DOCX ist aus dem Repository allein nicht beweisbar. `SOURCE`, `git ls-files`.

## Lokales Ausführen und Prüfungen

`package.json` definiert:

```bash
pnpm dev
pnpm run build
pnpm start
pnpm run lint
pnpm run typecheck
pnpm run test:contracts
```

Quelle: `package.json:L5-L11`.

Der technische Verify-Lauf kann mit folgendem Befehl reproduziert werden:

```bash
hermes verify --json --timeout 300 --ready-timeout 60 /home/deploy/ichgeheviral-ai-video
```

Beim letzten Verify-Lauf wurden Bootstrap, Build, Typecheck, Lint, Runtime-Start und HTTP-Readiness erfolgreich abgeschlossen. Zusätzlich liefen die Contract-Tests mit `15/15` bestandenen Tests. `TEST`, Verify- und Testausgabe vom Snapshot.

Lint meldet derzeit fünf `@next/next/no-img-element`-Warnings und keine Fehler. Warnings sind kein Beweis für optimale Bildauslieferung. `TEST`, `pnpm run lint`.

## Deployment und externe Systeme

### Railway

`railway.toml` definiert:

- Builder: `RAILPACK`
- Build: `pnpm run build`
- Start: `pnpm exec next start --hostname 0.0.0.0 --port ${PORT:-3000}`
- Healthcheck: `/api/health`
- Restart: `ON_FAILURE`, maximal drei Retries

Quelle: `railway.toml:L1-L10`.

Beim letzten Readback:

- Railway-Projekt: `responsible-nurturing`
- Environment: `production`
- Service: `ichgeheviral-web`
- Deployment: `1cf1a9a8-16aa-410e-a93b-6b8a97f72786`
- Status: `SUCCESS`, nicht gestoppt
- Preview-URL: `https://ichgeheviral-web-production.up.railway.app`

`RUNTIME`, Railway CLI Readback.

Der Railway-Service berichtete als Source-Repository `igoingtodevx/ichgeheviral-ai-video`. Das Backend läuft als separater Railway-Service beziehungsweise separates Repository; Backend-Code ist nicht Bestandteil dieses Checkouts. `RUNTIME`, Railway-Service-Metadaten.

### Öffentliche Laufzeitbeobachtung

Beobachtet am `2026-10-02T00:07:00+02:00`:

```text
GET https://ichgeheviral-web-production.up.railway.app/       HTTP 200
GET https://ichgeheviral-web-production.up.railway.app/api/health HTTP 200
```

Health-Response zu diesem Zeitpunkt:

```json
{
  "ok": true,
  "revision": "b08e5aea7beae7f6b8a793b936a8132dcca894bf",
  "auth_configured": true,
  "api_configured": true,
  "checkout_ui_enabled": false
}
```

Die Root-Domain `https://ichgeheviral.de` antwortete ebenfalls mit HTTP 200. Der Host `https://app.ichgeheviral.de` lieferte im selben Probe-Lauf keinen erfolgreichen HTTP-Status (`000`). Das Ergebnis beweist nur die jeweilige Erreichbarkeit zum Probezeitpunkt, nicht die Ursache des DNS-/Netzwerkproblems. `RUNTIME`.

### Secrets und externe Zustände

`.gitignore` schließt `.env*`, `.vercel/`, `.next/`, Produktionsartefakte und lokale TypeScript-Builddateien aus; `.env.example` ist die Ausnahme. `SOURCE`, `.gitignore:L33-L43`.

Nicht aus diesem Repository ableitbar sind insbesondere:

- Railway-Variablen und Secret-Werte.
- Clerk-Nutzer, Sessions und Rollen-Backenddaten.
- PostgreSQL-Inhalte.
- Bucket-/Storage-Inhalte.
- Backend-Code und Worker-Laufzeit.
- DNS-Verwaltung.
- Belege für Marketingclaims.

## Frontend-Architektur

### Root-Layout und Konfiguration

`src/app/layout.tsx`:

- setzt deutsche Sprache und Metadata;
- lädt Public Config request-time über `loadPublicConfig()`;
- aktiviert `ClerkProvider` nur, wenn `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` vorhanden ist;
- aktiviert Theme-Initialisierung aus Local Storage/Systempräferenz.

Quelle: `src/app/layout.tsx:L21-L76`.

`loadPublicConfig()` fragt `API_URL` oder `NEXT_PUBLIC_API_URL` request-time ab. Wenn keine gültige Antwort vorliegt, wird `SAFE_PUBLIC_CONFIG` verwendet. Quelle: `src/lib/business-config-server.ts:L1-L6`, `src/lib/business-config.ts:L114-L120`.

Die Public-Config validiert genau zwei Backend-Paket-IDs: `ai-video` und `ai-video-course`. Checkout ist nur möglich, wenn Backend-Flag, Produktfreigabe, Shop-/Legal-Felder, Preise und weitere Bedingungen vollständig erfüllt sind. Quelle: `src/lib/business-config.ts:L1-L37`, `L72-L111`.

### Route-Übersicht

Im App Router existieren unter anderem:

- `/` — öffentliche Landingpage.
- `/kundenbereich` — authentifizierter Kundenbereich.
- `/kundenbereich/neu` — neuer Auftrag/Checkout-Grenze.
- `/kundenbereich/produktion` — Produktionsstatus.
- `/kundenbereich/reel/[slug]` — Reel-Detail.
- `/operations` — eingeschränkter Betriebsbereich.
- `/admin`, `/admin/overview` — globale Administration.
- `/beispiele`, `/beispiele/[slug]` — Beispiele.
- `/sign-in`, `/sign-up`, rechtliche Seiten und `/checkout/return`.

Die Route-Dateien liegen unter `src/app/**/page.tsx`.

### Authentifizierung und Rollen

`src/proxy.ts` schützt bei konfiguriertem Clerk die Pfade aus `isProtectedPath()`. Diese umfassen `/kundenbereich`, `/admin`, `/operations` und `/checkout/return`. Quelle: `src/proxy.ts:L6-L26`, `src/lib/access.ts:L15-L17`.

Die Frontend-Gates verwenden ausschließlich die Backend-Felder:

- `is_global_admin === true` → Administration.
- `is_global_admin === true` oder `is_operator === true` → Operations.
- Account-Ownership oder Textwerte wie `role: "owner"` werden nicht automatisch als globale Berechtigung akzeptiert.

Quelle: `src/lib/access.ts:L1-L13`, `src/components/AccessGate.tsx:L37-L42`, Contract-Tests 1–3.

Der API-Client sendet Clerk-Tokens als `Authorization: Bearer ...` an das externe Backend und enthält Endpunkte für Jobs, Purchases, Checkout, Operations, Admin-Overview und Operator-Grants. Quelle: `src/lib/api/client.ts:L114-L235`.

## Öffentliche Landingpage: beobachteter Ist-Zustand

`src/app/page.tsx` rendert in dieser Reihenfolge:

1. Announcement-Bar.
2. `Navbar`.
3. `Hero`.
4. `Pricing`.
5. `PotentialCalculator`.
6. `TestimonialsSection`.
7. `FounderSection`.
8. `TransformationShowcase`.
9. `WhyViral`.
10. `HowItWorks`.
11. `NoCreditsSection`.
12. `FAQ`.
13. `FinalCTA`.
14. `Footer`.

Quelle: `src/app/page.tsx:L18-L42`.

Der öffentliche Inhalt enthält statische Marketing- und UI-Daten in mehreren Komponenten, unter anderem:

- Hero und Kennzahlen: `src/components/Hero.tsx`.
- Preise: `src/components/Pricing.tsx`.
- Rechner: `src/components/PotentialCalculator.tsx`.
- Building-Stages: `src/components/TransformationShowcase.tsx`.
- Timo-/Claim-Bereich: `src/components/FounderSection.tsx`.
- FAQ: `src/lib/landing-content.ts`, verwendet von `src/components/FAQ.tsx`.
- Formatbeispiele/Testimonial-Fallback: `src/components/TestimonialsSection.tsx`.

### Claims: Inhalt versus Beleg

Im Code stehen unter anderem:

- `100 Mio Views+` und `Monetarisierbar` in `Hero.tsx`.
- `Über 8.000+ Zufriedene Kunden`, `6+ Jahre TikTok Erfahrung` und `12+ Jahre YouTube Erfahrung` in `FounderSection.tsx`.
- `TikTok-Einkommen` und blaue `BadgeCheck`-Symbole in `Pricing.tsx` beziehungsweise `FounderSection.tsx`.

Diese Stellen belegen nur, dass der Text bzw. die Darstellung ausgeliefert wird. Das Repository enthält keine unabhängigen Nachweise für die Wahrheit dieser Claims. `OPEN`, `src/components/Hero.tsx:L34-L39`, `src/components/FounderSection.tsx:L10-L18`, `src/components/Pricing.tsx:L31-L39`.

### Wichtige Implementierungsdifferenz: Landingpage vs. Backend-Config

Die öffentliche `Pricing`-Komponente definiert drei statische Karten direkt im Frontend:

- Starter — `49 €` — `4 KI-Building Videos`.
- Premium — `99 €` — `9 KI-Building Videos`.
- Premium — `297 €` — `30 KI-Building Videos`.

Quelle: `src/components/Pricing.tsx:L7-L29`.

Die Backend-Public-Config validiert dagegen zwei andere Paketobjekte (`ai-video`, `ai-video-course`) und wird von der Pricing-Komponente nicht verwendet. Quelle: `src/lib/business-config.ts:L1-L9`, `L72-L102`; `src/components/Pricing.tsx:L1-L42`.

Live-Public-Config zum oben genannten Probezeitpunkt:

```json
{
  "checkout_enabled": false,
  "product_ready": false,
  "package_ids": ["ai-video", "ai-video-course"],
  "package_names": ["KI-Video", "KI-Video + Kurs"],
  "price_eur": [null, null],
  "launch_missing": [
    "shopify.video_product_id",
    "shopify.course_product_id",
    "packages.ai-video.price_eur",
    "packages.ai-video.features",
    "packages.ai-video-course.price_eur",
    "packages.ai-video-course.features",
    "content.hero_video_url",
    "content.support_email",
    "content.legal_entity",
    "content.imprint_text",
    "content.privacy_text",
    "content.terms_text",
    "product_ready",
    "house_pipeline_approval"
  ]
}
```

Damit ist belegt: Die Landingpage zeigt aktuell Marketingpreise, während die Backend-/Checkout-Konfiguration keine freigegebenen Preise enthält. Daraus folgt nicht automatisch, ob dies beabsichtigt oder ein Fehler ist. `RUNTIME`, `/api/public/config`; `OPEN`, Produktentscheidung nicht aus Code ableitbar.

## Kundenbereich und ältere Produktlogik

Der Kundenbereich enthält weiterhin Poolbau-/Transformations-Terminologie:

- `src/app/kundenbereich/page.tsx:L50` zeigt `Poolbau-Reel`.
- `src/app/kundenbereich/neu/page.tsx:L48` sendet als Checkout-Konzept `Poolbau-Transformation ...`.
- `src/components/StudioShell.tsx:L61-L68` zeigt `Poolbau-Reels`.
- `src/lib/constants.ts:L3-L125` enthält Golden-V1-Poolzustände, Poolvideos, Pool-Presets und ältere Pool-FAQ-Daten.

Die aktuelle öffentliche Landingpage verwendet dagegen KI-Building-Terminologie und importiert ihre FAQ aus `src/lib/landing-content.ts`. Quelle: `src/app/page.tsx`, `src/components/FAQ.tsx:L5`, `src/lib/landing-content.ts`.

Das ist ein beobachteter Koexistenz-/Migrationszustand. Das Repository enthält keine Entscheidung, ob die alte Terminologie im Kundenbereich bereits ersetzt werden soll. `OPEN`.

`constants.ts` wird von `src/components/SocialProof.tsx` importiert. `SocialProof` ist nicht Bestandteil der aktuellen öffentlichen Landingpage-Komposition in `src/app/page.tsx`, bleibt aber im Repository und wird im Admin-Kontext durch separate Social-Proof-APIs ergänzt. `SOURCE`.

## Testimonials, Founder-Video und Medien

`TestimonialsSection` fragt den externen Endpoint `/testimonials` ab. Wenn keine Items eintreffen, rendert sie drei lokale Formatbeispiele aus `public/media/studio-seeds/` statt erfundener Kundenzitate. Quelle: `src/components/TestimonialsSection.tsx:L8-L27`, `L29-L99`.

Der Live-Endpoint meldete zum Probezeitpunkt:

```json
{"item_count": 0, "has_more": false}
```

Das gilt sowohl für `/testimonials` als auch für `/social-proof`. `RUNTIME`, externe API-Readback.

`FounderSection` verwendet `NEXT_PUBLIC_FOUNDER_VIDEO_SRC`, falls gesetzt. Ohne diese Variable wird ein lokales Posterbild mit Overlay gerendert; ein echter Videoinhalt ist aus dem Frontend-Repository nicht ableitbar. Quelle: `src/components/FounderSection.tsx:L7-L8`, `L75-L111`.

## Bekannte Dokumentations- und Wartungslücken

1. `README.md` sagt unter anderem, Production-Deployments seien mit Vercel verbunden (`README.md:L39-L42`). Der beobachtete aktuelle Production-Service läuft auf Railway. Das README ist daher nicht vollständig aktuell.
2. Es gibt keine kanonische Projekt-/Entscheidungsdokumentation außerhalb dieses Handbooks.
3. Der originale Timo-Brief ist nicht im Git-Repository.
4. Claims sind im Code vorhanden, aber im Repository nicht evidenzbelegt.
5. Die statische Marketing-Pricing-Schicht und die Backend-Public-Config verwenden unterschiedliche Paketmodelle.
6. Die öffentliche Landingpage und der authentifizierte Kundenbereich verwenden unterschiedliche Produktterminologie.
7. `scripts/audit-visuals.mjs` enthält ältere Selektoren wie `#pipeline`, `#founder` und `#generator`, während die aktuelle Landingpage andere IDs verwendet. Der Audit-Script ist deshalb nicht automatisch ein vollständiger Test der aktuellen Sections. Quelle: `scripts/audit-visuals.mjs:L35-L105`, aktuelle `src/app/page.tsx`-Komposition.
8. Keine Aussage über Datenbankinhalt, Clerk-Rollenbestand, Worker-Queue oder Paid-Inference-Produktionsfähigkeit kann aus diesem Frontend-Repository allein abgeleitet werden.

## Arbeitsweise für spätere Änderungen

Ein neuer Agent kann reproduzierbar beginnen mit:

```bash
git fetch --all --prune
git status --short
git log --oneline -10
pnpm install
pnpm run test:contracts
pnpm run typecheck
pnpm run lint
pnpm run build
```

Danach sollten Code und Live-Zustand getrennt geprüft werden:

- Code-/Testfakten aus diesem Repository.
- Backend-/Config-Fakten über `/api/health` und `/api/public/config`.
- Deployment-Fakten über Railway-Service-Readback.
- Auth-/Rollenfakten über die tatsächlichen Clerk-/Backend-Gates.
- Claims und Kundenstimmen nur als belegt behandeln, wenn separate Nachweise vorliegen.

Dieses Handbook soll Widersprüche sichtbar machen, nicht eine bestimmte Lösung erzwingen.
