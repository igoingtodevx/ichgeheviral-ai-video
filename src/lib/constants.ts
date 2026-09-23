import { TransformationState, VideoShowcaseItem } from "./types";

export const GOLDEN_V1_STATES: TransformationState[] = [
  {
    id: 1,
    phaseNumber: 1,
    title: "Ausgangszustand",
    stageName: "State 01 // Raw Backyard",
    description: "Verwilderte Rasenfläche, unebener Erdboden, rudimentäre Pflasterung und ungenutzte Gartenfläche.",
    imageSrc: "/media/states/run1/state_01.jpg",
    technicalMilestone: "Kamera-Lock, Horizontlinie & Grundstücksgeometrie festgelegt.",
  },
  {
    id: 2,
    phaseNumber: 2,
    title: "Vermessung & Trassen",
    stageName: "State 02 // Site Layout",
    description: "Neon-Markierungsspray, Vermessungsstative, Richtschnüre und erste Bauholz-Lieferungen für die Beckenmaße.",
    imageSrc: "/media/states/run1/state_02.jpg",
    technicalMilestone: "Exakter Becken-Footprint mit 100% Perspektiv-Kontinuität verankert.",
  },
  {
    id: 3,
    phaseNumber: 3,
    title: "Tiefenaushub & Grube",
    stageName: "State 03 // Excavation",
    description: "Kompaktbagger im Hintergrund, ausgehobene Beckengrube mit Gefälle, erste Grundleitungen und Abwasserrohre.",
    imageSrc: "/media/states/run1/state_03.jpg",
    technicalMilestone: "Erdaushub-Volumen physikalisch konsistent zur Zieltiefe generiert.",
  },
  {
    id: 4,
    phaseNumber: 4,
    title: "Stahlbewehrung & Schalung",
    stageName: "State 04 // Rebar & Plumbing",
    description: "Vollständiges Stahlmatten-Skelett, hölzerne Randschalung, präzise verlegte Einlaufdüsen und Bodenabläufe.",
    imageSrc: "/media/states/run1/state_04.jpg",
    technicalMilestone: "Statische Rebar-Gitter ohne Bildartefakte oder Linienverzerrungen.",
  },
  {
    id: 5,
    phaseNumber: 5,
    title: "Spritzbeton-Guss (Gunite)",
    stageName: "State 05 // Concrete Shell",
    description: "Monolithisch gegossene Beckenstruktur, integrierte Einstiegstreppe und Sitzbank-Kontur mit glatter grauer Textur.",
    imageSrc: "/media/states/run1/state_05.jpg",
    technicalMilestone: "Nahtlose Schalenverdichtung, Wandstärke und Stufenpositionen fixiert.",
  },
  {
    id: 6,
    phaseNumber: 6,
    title: "Naturstein & Travertin",
    stageName: "State 06 // Coping & Decking",
    description: "Verlegung warmer Sandsteinplatten, Beckenrandsteine, Pergola-Bau im Hintergrund und Vorbereitung der Verfugung.",
    imageSrc: "/media/states/run1/state_06.jpg",
    technicalMilestone: "Materialübergänge zwischen Poolkante und Terrassenplatten kalibriert.",
  },
  {
    id: 7,
    phaseNumber: 7,
    title: "Befüllung & Wasserfall",
    stageName: "State 07 // Water Fill & Spa",
    description: "Erste Wasserbefüllung mit türkisem Schimmer, aktive Wasserfall-Schütte in Natursteinwand und Loungemöbel-Aufbau.",
    imageSrc: "/media/states/run1/state_07.jpg",
    technicalMilestone: "Wasser-Reflexionen und Strömungssimulation aktiv.",
  },
  {
    id: 8,
    phaseNumber: 8,
    title: "Luxus-Oase Finale",
    stageName: "State 08 // Pristine Oasis",
    description: "Kristallklares Poolwasser, warme Abenddämmerung, illuminierte Bepflanzung, fertige Pergola mit Design-Feuerstelle.",
    imageSrc: "/media/states/run1/state_08.jpg",
    technicalMilestone: "Render-Payoff bei 63s: Fertiges Master-Asset für virale Reichweite.",
  },
];

export const SHOWCASE_VIDEOS: VideoShowcaseItem[] = [
  {
    id: "pool-run1",
    title: "Hinterhof zu moderner Luxus-Pooloase",
    concept: "Ugly backyard to modern rectangular luxury pool with integrated spa, waterfall and pergola",
    duration: "63.1s",
    resolution: "720×1280 (9:16)",
    stateCount: 8,
    posterSrc: "/media/videos/hero-poster.jpg",
    videoSrc: "/media/videos/golden-pool-run1.mp4",
    tag: "Golden V1 Baseline",
    viewsEstimate: "482K Views",
  },
  {
    id: "pool-run2",
    title: "Mediterrane Lagunen-Oase mit Naturstein",
    concept: "Mediterranean villa backyard with an organic lagoon-style luxury pool, natural stone waterfall & spa",
    duration: "63.1s",
    resolution: "720×1280 (9:16)",
    stateCount: 8,
    posterSrc: "/media/contact-sheets/run2-contact-sheet.jpg",
    videoSrc: "/media/videos/golden-pool-run2.mp4",
    tag: "Lagoon Transformation",
    viewsEstimate: "310K Views",
  },
];

export const PRESET_CONCEPTS = [
  "Ugly backyard → Moderne minimalistische Luxus-Pooloase mit Travertin-Terrasse & Wasserfall",
  "Mediterrane Finca → Organischer Naturstein-Lagunenpool mit Spa & Palmenbepflanzung",
  "Verlassener Hinterhof → High-End Infinity-Pool mit eingelassener Feuerstelle & Abendbeleuchtung",
  "Altbau-Dachboden → Zweistöckiges Designer-Penthouse mit bodentiefen Panoramafenstern",
];

export const FAQ_ITEMS = [
  {
    question: "Was genau macht IchGeheViral anders als normale KI-Video-Generatoren?",
    answer:
      "Klassische KI-Video-Tools generieren kurze 4-Sekunden-Clips, bei denen Kamera, Umgebung und Details von Schnitt zu Schnitt springen. IchGeheViral nutzt eine spezialisierte Pipeline mit striktem Architektur-Lock: Ein zentrales 2K-Designmodell berechnet 8 exakt aufeinander aufbauende Bau- und Transformationszustände und verbindet sie über flüssige Video-Transitionen zu einem fertigen 60+ Sekunden Reel ohne Stilbrüche.",
  },
  {
    question: "Welches Format haben die fertigen Videos?",
    answer:
      "Die Videos werden nativ im 9:16 Hochformat (720×1280 / 1080p) mit 24fps exportiert. Sie enthalten echte baustellen- und raumakustische Raumtöne und sind sofort fertig zum Veröffentlichen auf TikTok, Instagram Reels und YouTube Shorts.",
  },
  {
    question: "Funktioniert das System nur für Swimmingpools?",
    answer:
      "Nein. Der Pool- und Gartenbau ist das erste vollständig validierte und serienreife Produktionsformat ('Golden V1'). Die zugrundeliegende Architektur ist universell auf Bauprozesse, Renovierungen, Innenausbau und architektonische Transformationen ausgelegt. Weitere Formate werden schrittweise freigeschaltet.",
  },
  {
    question: "Wie lange dauert die Generierung eines kompletten 60s Videos?",
    answer:
      "Da im Hintergrund 8 fotorealistische 2K-Zustände generiert und anschließend 7 aufeinander abgestimmte 9-Sekunden-Videoübergänge berechnet und assembliert werden, liegt die reine GPU-Rechenzeit bei ca. 10 bis 13 Minuten. Sobald der Renderjob abgeschlossen ist, erhältst du den Download-Link direkt in dein Dashboard.",
  },
  {
    question: "Benötige ich eigene Software oder Vorkenntnisse im Videoschnitt?",
    answer:
      "Nein. Du gibst lediglich dein Konzept oder deine Idee in Textform ein. Du musst weder Keyframes setzen noch Schnittsoftware wie Premiere oder After Effects beherrschen. Das fertige MP4 wird direkt per Download ausgeliefert.",
  },
];
