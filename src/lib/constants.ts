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
    concept: "Ugly backyard to modern rectangular luxury pool with integrated spa, waterfall and pergola",
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
    concept: "Mediterranean villa backyard with an organic lagoon-style luxury pool, natural stone waterfall & spa",
    duration: "63s",
    resolution: "720×1280 (720p)",
    stateCount: 8,
    posterSrc: "/media/contact-sheets/run2-contact-sheet.jpg",
    videoSrc: "/media/videos/golden-pool-run2.mp4",
    tag: "Mediterrane Lagune",
    viewsEstimate: "",
  },
];

export const PRESET_CONCEPTS = [
  "Ugly backyard → Moderne minimalistische Luxus-Pooloase mit Travertin-Terrasse & Wasserfall",
  "Mediterrane Finca → Organischer Naturstein-Lagunenpool mit Spa & Palmenbepflanzung",
  "Verwilderter Garten → High-End Rechteck-Pool mit eingelassener Sitzecke & Abendlicht",
  "Schotterfläche → Kompakte Design-Pooloase mit Pergola & warmer Holzterrasse",
];

export const FAQ_ITEMS = [
  {
    question: "Was genau macht IchGeheViral anders als normale KI-Video-Generatoren?",
    answer:
      "Klassische KI-Video-Tools generieren kurze 4-Sekunden-Clips, bei denen Kamera, Umgebung und Details von Schnitt zu Schnitt springen. IchGeheViral hält die Kameraperspektive über die gesamte Verwandlung stabil und verbindet aufeinander abgestimmte Bauphasen zu einem zusammenhängenden 60+ Sekunden Reel ohne Stilbrüche.",
  },
  {
    question: "Welches Format haben die fertigen Videos?",
    answer:
      "Die Videos werden nativ im 9:16 Hochformat (720×1280 / 720p) mit 24fps exportiert. Sie enthalten echte, passende Umgebungsakustik und sind sofort fertig zum Veröffentlichen auf TikTok, Instagram Reels und YouTube Shorts.",
  },
  {
    question: "Funktioniert das System aktuell nur für Swimmingpools?",
    answer:
      "Aktuell ist die automatisierte Bau-Transformation für Pool- und Außenanlagen validiert. Die zugrundeliegende Architektur ist universell auf Transformations- und Bauprozesse ausgelegt – weitere Formate folgen schrittweise.",
  },
  {
    question: "Wie lange dauert die Generierung eines kompletten 60s Videos?",
    answer:
      "Die vollständige Berechnung aller aufeinander abgestimmten Phasen und nahtlosen Videoübergänge beansprucht aktuell etwa 10 bis 15 Minuten Rechenzeit. Sobald der Renderjob abgeschlossen ist, steht die MP4-Datei direkt zum Herunterladen bereit.",
  },
  {
    question: "Benötige ich eigene Software oder Vorkenntnisse im Videoschnitt?",
    answer:
      "Nein. Du gibst lediglich deine Idee in Textform ein. Du musst weder Keyframes setzen noch Schnittprogramme beherrschen. Das fertige Video wird direkt per Download ausgeliefert.",
  },
];
