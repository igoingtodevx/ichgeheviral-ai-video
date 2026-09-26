import { TransformationState, VideoShowcaseItem } from "./types";

export const GOLDEN_V1_STATES: TransformationState[] = [
  {
    id: 1,
    phaseNumber: 1,
    title: "Ausgangszustand",
    stageName: "Phase 1 // Ausgangszustand",
    description: "Verwilderte Rasenfläche, unebener Erdboden, rudimentäre Pflasterung und ungenutzte Gartenfläche.",
    imageSrc: "/media/states/run1/state_01.jpg",
    technicalMilestone: "Horizontlinie und Grundstücksbereich verankert.",
  },
  {
    id: 2,
    phaseNumber: 2,
    title: "Vermessung & Trassen",
    stageName: "Phase 2 // Vermessung & Trassen",
    description: "Markierungsspray, Vermessungsstative, Richtschnüre und erste Bauholz-Lieferungen für die Beckenmaße.",
    imageSrc: "/media/states/run1/state_02.jpg",
    technicalMilestone: "Exakter Beckenverlauf bei stabiler Kameraperspektive.",
  },
  {
    id: 3,
    phaseNumber: 3,
    title: "Tiefenaushub & Grube",
    stageName: "Phase 3 // Tiefenaushub & Grube",
    description: "Kompaktbagger im Hintergrund, ausgehobene Beckengrube mit Gefälle, erste Grundleitungen und Abwasserrohre.",
    imageSrc: "/media/states/run1/state_03.jpg",
    technicalMilestone: "Aushubtiefe und Leitungsführung strukturiert.",
  },
  {
    id: 4,
    phaseNumber: 4,
    title: "Stahlbewehrung & Schalung",
    stageName: "Phase 4 // Stahlbewehrung & Schalung",
    description: "Vollständiges Stahlmatten-Skelett, hölzerne Randschalung, präzise verlegte Einlaufdüsen und Bodenabläufe.",
    imageSrc: "/media/states/run1/state_04.jpg",
    technicalMilestone: "Bewehrungsmatten und Schalung präzise verlegt.",
  },
  {
    id: 5,
    phaseNumber: 5,
    title: "Betonage (Beckenkörper)",
    stageName: "Phase 5 // Gegossene Schale",
    description: "Monolithisch gegossene Beckenstruktur, integrierte Einstiegstreppe und Sitzbank-Kontur mit glatter Textur.",
    imageSrc: "/media/states/run1/state_05.jpg",
    technicalMilestone: "Monolithischer Beckenkörper und Einstiegsstufen.",
  },
  {
    id: 6,
    phaseNumber: 6,
    title: "Naturstein & Travertin",
    stageName: "Phase 6 // Rand & Terrassenbelag",
    description: "Verlegung warmer Sandsteinplatten, Beckenrandsteine, Pergola-Bau im Hintergrund und Vorbereitung der Verfugung.",
    imageSrc: "/media/states/run1/state_06.jpg",
    technicalMilestone: "Materialkontraste zwischen Stein und Terrassenplatten.",
  },
  {
    id: 7,
    phaseNumber: 7,
    title: "Befüllung & Wasserfall",
    stageName: "Phase 7 // Wasser & Technik",
    description: "Erste Wasserbefüllung mit türkisem Schimmer, aktive Wasserfall-Schütte in Natursteinwand und Loungemöbel-Aufbau.",
    imageSrc: "/media/states/run1/state_07.jpg",
    technicalMilestone: "Wasser-Reflexionen und Kaskadenschütte aktiv.",
  },
  {
    id: 8,
    phaseNumber: 8,
    title: "Luxus-Oase Finale",
    stageName: "Phase 8 // Fertige Pool-Oase",
    description: "Kristallklares Poolwasser, warme Abenddämmerung, illuminierte Bepflanzung, fertige Pergola mit Design-Feuerstelle.",
    imageSrc: "/media/states/run1/state_08.jpg",
    technicalMilestone: "Finales Video-Asset mit passendem Raumklang.",
  },
];

export const SHOWCASE_VIDEOS: VideoShowcaseItem[] = [
  {
    id: "pool-run1",
    title: "Hinterhof zu moderner Luxus-Pooloase",
    concept: "Verwilderter Hinterhof zu moderner Rechteck-Pooloase mit integriertem Spa, Wasserfall und Pergola",
    duration: "63s",
    resolution: "720×1280 (720p)",
    stateCount: 8,
    posterSrc: "/media/videos/hero-poster.jpg",
    videoSrc: "/media/videos/golden-pool-run1.mp4",
    tag: "Moderne Pooloase",
    viewsEstimate: "",
  },
  {
    id: "pool-run2",
    title: "Mediterrane Lagunen-Oase mit Naturstein",
    concept: "Mediterraner Garten zu organischem Naturstein-Lagunenpool mit Wasserfall und Palmenbepflanzung",
    duration: "63s",
    resolution: "720×1280 (720p)",
    stateCount: 8,
    posterSrc: "/media/contact-sheets/run2-contact-sheet.jpg",
    videoSrc: "/media/videos/golden-pool-run2.mp4",
    tag: "Mediterrane Lagune",
    viewsEstimate: "",
  },
];

export interface PresetConcept {
  id: string;
  label: string;
  prompt: string;
}

export const PRESET_CONCEPTS: PresetConcept[] = [
  {
    id: "pool-travertin",
    label: "Hinterhof → Luxus-Pool & Travertin",
    prompt: "Verwilderter Hinterhof → moderne Luxus-Pooloase mit Travertin-Terrasse, Naturstein-Wasserfall & Pergola",
  },
  {
    id: "finca-lagune",
    label: "Mediterrane Finca → Naturstein-Lagune",
    prompt: "Mediterrane Finca → organischer Naturstein-Lagunenpool mit Spa & Palmenbepflanzung",
  },
  {
    id: "garten-rechteck",
    label: "Verwilderter Garten → Rechteck-Pool",
    prompt: "Verwilderter Garten → High-End Rechteck-Pool mit eingelassener Sitzecke & Abendlicht",
  },
  {
    id: "schotter-pergola",
    label: "Schotterfläche → Pooloase mit Pergola",
    prompt: "Schotterfläche → kompakte Design-Pooloase mit Pergola & warmer Holzterrasse",
  },
];

export const FAQ_ITEMS = [
  {
    question: "Kann Viralität garantiert werden?",
    answer:
      "Nein — eine garantierte View-Zahl oder garantierte Viralität wäre unseriös. Was IchGeheViral liefert, ist ein Aufbau mit maximalem Viralpotenzial: Ein sofortiger Scroll-Stop in den ersten Sekunden, kontinuierlicher visueller Fortschritt über 8 Bauphasen und ein starker Final-Reveal, der die Watch-Time auf TikTok, Reels und Shorts maximiert.",
  },
  {
    question: "Brauche ich Credits für die Erstellung?",
    answer:
      "Nein. Bei IchGeheViral gibt es für dich kein unübersichtliches Credit-System, bei dem jeder Klick oder Fehlversuch ein Punktekonto leert. Du erstellst dein Video transparent ohne komplizierte Token-Rechnerei.",
  },
  {
    question: "Muss ich Kenntnisse im Videoschnitt haben?",
    answer:
      "Nein, überhaupt nicht. Du gibst lediglich deine Idee oder dein Vorher-Nachher-Thema ein. Den Bildaufbau, die flüssigen Phasenübergänge und die passende Umgebungsakustik generiert das System vollautomatisch.",
  },
  {
    question: "Welches Format und welche Länge erhalte ich?",
    answer:
      "Du erhältst ein fertiges 9:16 Video im MP4-Format mit über 60 Sekunden Laufzeit (720×1280 bei 24fps) inklusive synchronisierter Umgebungsakustik — sofort bereit zum Posten auf TikTok, Instagram Reels und YouTube Shorts.",
  },
  {
    question: "Welche Videoarten werden aktuell unterstützt?",
    answer:
      "Aktuell ist die Pipeline für bauliche Transformationen und Außenanlagen (wie Poolbau, Garten- und Terrassenprojekte) validiert und live einsatzbereit. Weitere Transformationsformate folgen schrittweise nach vollständiger Validierung.",
  },
];
