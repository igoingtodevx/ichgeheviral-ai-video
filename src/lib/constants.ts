import { TransformationState, VideoShowcaseItem } from "./types";

export const GOLDEN_V1_STATES: TransformationState[] = [
  {
    id: 1,
    phaseNumber: 1,
    title: "Ausgangslage",
    stageName: "Szene 1 · Mediterraner Garten",
    description: "Eine trockene, ungestaltete Gartenfläche vor der mediterranen Villa bildet den Ausgangspunkt für die neue Lagunen-Oase.",
    imageSrc: "/media/states/run2/state_01.jpg",
    technicalMilestone: "Villa, Gartenbereich und Ausgangsperspektive verankert.",
  },
  {
    id: 2,
    phaseNumber: 2,
    title: "Lagunenform abstecken",
    stageName: "Szene 2 · Planung & Grundriss",
    description: "Die organische Form der Lagune wird im Garten markiert und auf die Villa, Wege und vorhandene Bepflanzung abgestimmt.",
    imageSrc: "/media/states/run2/state_02.jpg",
    technicalMilestone: "Beckenverlauf und geschwungene Zonen definiert.",
  },
  {
    id: 3,
    phaseNumber: 3,
    title: "Becken ausheben",
    stageName: "Szene 3 · Aushub & Rohform",
    description: "Die geschwungene Beckengrube entsteht mit unterschiedlichen Tiefen, Stufen und ersten Randbereichen.",
    imageSrc: "/media/states/run2/state_03.jpg",
    technicalMilestone: "Organische Beckenform und Tiefenzonen aufgebaut.",
  },
  {
    id: 4,
    phaseNumber: 4,
    title: "Bewehrung & Technik",
    stageName: "Szene 4 · Konstruktion",
    description: "Armierung, Leitungen und technische Einbauten bereiten die Lagune für eine stabile und dauerhaft funktionierende Beckenhülle vor.",
    imageSrc: "/media/states/run2/state_04.jpg",
    technicalMilestone: "Bewehrung und technische Anschlüsse präzise vorbereitet.",
  },
  {
    id: 5,
    phaseNumber: 5,
    title: "Beckenhülle herstellen",
    stageName: "Szene 5 · Rohbau",
    description: "Die Beckenhülle nimmt ihre endgültige Form an; Stufen, Sitzbereiche und geschwungene Übergänge werden sichtbar.",
    imageSrc: "/media/states/run2/state_05.jpg",
    technicalMilestone: "Lagunenvolumen, Stufen und Sitzbereiche ausgebildet.",
  },
  {
    id: 6,
    phaseNumber: 6,
    title: "Oberflächen & Umfeld",
    stageName: "Szene 6 · Ausbau",
    description: "Oberflächen, Randabschlüsse und die mediterrane Bepflanzung bringen die Außenanlage Schritt für Schritt in ihre finale Gestaltung.",
    imageSrc: "/media/states/run2/state_06.jpg",
    technicalMilestone: "Beckenrand, Oberflächen und Gartenbild abgestimmt.",
  },
  {
    id: 7,
    phaseNumber: 7,
    title: "Wasser einlassen",
    stageName: "Szene 7 · Wasser & Bepflanzung",
    description: "Das Wasser macht die organische Form sichtbar; Pflanzen, Steinbereiche und die verschiedenen Wasserzonen werden zusammengeführt.",
    imageSrc: "/media/states/run2/state_07.jpg",
    technicalMilestone: "Wasserwirkung, Lagunenkontur und Gartenraum verbunden.",
  },
  {
    id: 8,
    phaseNumber: 8,
    title: "Mediterrane Lagunen-Oase mit Naturstein",
    stageName: "Szene 8 · Fertiges Ergebnis",
    description: "Die fertige Naturstein-Lagune fügt sich mit klarem Wasser, üppiger Bepflanzung und warmem Abendlicht in den mediterranen Garten ein.",
    imageSrc: "/media/states/run2/state_08.jpg",
    technicalMilestone: "Finales Lagunen-Reel mit fertiger Garten- und Wasserwelt.",
  },
];

export const SHOWCASE_VIDEOS: VideoShowcaseItem[] = [
  {
    id: "pool-run2",
    title: "Mediterrane Lagunen-Oase mit Naturstein",
    concept: "Mediterraner Garten zu organischem Naturstein-Lagunenpool mit Wasserfall und Palmenbepflanzung",
    duration: "63s",
    resolution: "720×1280 (720p)",
    stateCount: 8,
    posterSrc: "/media/states/run2/state_08.jpg",
    videoSrc: "/media/videos/golden-pool-run2.mp4",
    tag: "Mediterrane Lagune",
    viewsEstimate: "",
  },
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
      "Nein — eine garantierte View-Zahl oder garantierte Viralität wäre unseriös. Was IchGeheViral liefert, ist ein klarer Spannungsbogen: ein starker Einstieg, kontinuierlicher visueller Fortschritt über 8 Szenen und ein klares Finale. Dieser Aufbau ist darauf ausgelegt, Aufmerksamkeit und Watch-Time auf TikTok, Reels und Shorts zu fördern.",
  },
  {
    question: "Brauche ich Credits für die Erstellung?",
    answer:
      "Nein. Bei IchGeheViral gibt es für dich kein unübersichtliches Credit-System, bei dem jeder Klick oder Fehlversuch ein Punktekonto leert. Du erstellst dein Video transparent ohne komplizierte Token-Rechnerei.",
  },
  {
    question: "Muss ich ein Konzept auswählen oder einen Prompt schreiben?",
    answer:
      "Nein. In der aktuellen Studioansicht genügt der Generate-Button. Konzept, Bildaufbau und aufeinander abgestimmte Szenen werden im Hintergrund zusammengestellt.",
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
