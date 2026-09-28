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
    posterSrc: "/media/states/run1/state_08.jpg",
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
  description: string;
  prompt: string;
}

export const PRESET_CONCEPTS: PresetConcept[] = [
  {
    id: "pool-travertin",
    label: "Modern & rechteckig",
    description: "Verwilderter Hinterhof → moderner Luxus-Pool mit Travertin, Wasserfall und Pergola.",
    prompt: "Verwilderter Hinterhof → moderne Luxus-Pooloase mit rechteckigem Pool, Travertin-Terrasse, Naturstein-Wasserfall & Pergola",
  },
  {
    id: "finca-lagune",
    label: "Mediterrane Lagune",
    description: "Mediterrane Außenanlage → organischer Naturstein-Lagunenpool mit Spa und Palmen.",
    prompt: "Mediterrane Finca → organischer Naturstein-Lagunenpool mit Spa & Palmenbepflanzung",
  },
];

export const FAQ_ITEMS = [
  {
    question: "Kann Viralität garantiert werden?",
    answer:
      "Nein — eine garantierte View-Zahl oder garantierte Viralität wäre unseriös. Was IchGeheViral liefert, ist ein klarer Spannungsbogen: ein starker Einstieg, kontinuierlicher visueller Fortschritt über 8 Phasen und ein Final-Reveal. Dieser Aufbau ist darauf ausgelegt, Aufmerksamkeit und Watch-Time auf TikTok, Reels und Shorts zu fördern.",
  },
  {
    question: "Brauche ich Credits für die Erstellung?",
    answer:
      "Nein. Bei IchGeheViral gibt es für dich kein unübersichtliches Credit-System, bei dem jeder Klick oder Fehlversuch ein Punktekonto leert. Du erstellst dein Video transparent ohne komplizierte Token-Rechnerei.",
  },
  {
    question: "Muss ich ein Konzept auswählen oder einen Prompt schreiben?",
    answer:
      "Nein. In der aktuellen Studioansicht genügt der Generate-Button. Konzept, Bildaufbau, aufeinander abgestimmte Szenen und interne Variation bleiben bewusst im Hintergrund.",
  },
  {
    question: "Welches Format und welche Länge erhalte ich?",
    answer:
      "Du erhältst ein fertiges 9:16 Video im MP4-Format mit über 60 Sekunden Laufzeit (720×1280 bei 24fps) inklusive passender Klangatmosphäre — sofort bereit zum Posten auf TikTok, Instagram Reels und YouTube Shorts.",
  },
  {
    question: "Welche Videoarten werden aktuell unterstützt?",
    answer:
      "Aktuell ist IchGeheViral auf Poolbau-Transformationen fokussiert. Verfügbar sind ein moderner rechteckiger Luxus-Pool und eine mediterrane organische Lagunen-Variante. Garten-, Terrassen-, Haus-, Innenraum- oder andere Transformationskategorien werden erst nach eigener Prüfung ergänzt.",
  },
];
