export interface TransformationState {
  id: number;
  phaseNumber: number;
  title: string;
  stageName: string;
  description: string;
  imageSrc: string;
  technicalMilestone: string;
}

export interface VideoShowcaseItem {
  id: string;
  title: string;
  concept: string;
  duration: string;
  resolution: string;
  stateCount: number;
  posterSrc: string;
  videoSrc: string;
  tag: string;
  viewsEstimate: string;
}
