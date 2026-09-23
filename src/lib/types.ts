export type JobStatus =
  | "queued"
  | "generating_images"
  | "generating_videos"
  | "assembling"
  | "completed"
  | "failed";

export interface JobProgress {
  phase: string;
  completed: number;
  total: number;
  percent: number;
  details?: string;
}

export interface VideoJob {
  id: string;
  concept: string;
  status: JobStatus;
  progress: JobProgress;
  cost?: number | null;
  error?: string | null;
  final_video_url?: string | null;
  created_at: string;
  updated_at: string;
}

export interface CreateJobRequest {
  concept: string;
  idempotency_key?: string;
}

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
