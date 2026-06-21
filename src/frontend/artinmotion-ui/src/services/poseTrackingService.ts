import { FilesetResolver, PoseLandmarker } from '@mediapipe/tasks-vision';
import type { Keypoint } from '../types';

export interface PoseDetectionResult {
  keypoints: Keypoint[];
  timestampMs: number;
}

export type PoseCallback = (result: PoseDetectionResult) => void;

export interface IPoseTracker {
  initialize(videoElement: HTMLVideoElement): Promise<void>;
  start(onPose: PoseCallback): void;
  stop(): void;
  dispose(): void;
}

// MediaPipe Pose Landmarker — 33 landmarks in order
const LANDMARK_NAMES = [
  'nose',
  'left_eye_inner', 'left_eye', 'left_eye_outer',
  'right_eye_inner', 'right_eye', 'right_eye_outer',
  'left_ear', 'right_ear',
  'mouth_left', 'mouth_right',
  'left_shoulder', 'right_shoulder',
  'left_elbow', 'right_elbow',
  'left_wrist', 'right_wrist',
  'left_pinky', 'right_pinky',
  'left_index', 'right_index',
  'left_thumb', 'right_thumb',
  'left_hip', 'right_hip',
  'left_knee', 'right_knee',
  'left_ankle', 'right_ankle',
  'left_heel', 'right_heel',
  'left_foot_index', 'right_foot_index',
];

const WASM_URL =
  'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.35/wasm';
const MODEL_URL =
  'https://storage.googleapis.com/mediapipe-models/pose_landmarker/pose_landmarker_lite/float16/1/pose_landmarker_lite.task';

export class MediaPipePoseTracker implements IPoseTracker {
  private poseLandmarker: PoseLandmarker | null = null;
  private running = false;
  private animationFrameId: number | null = null;
  private videoElement: HTMLVideoElement | null = null;
  private onPose: PoseCallback | null = null;

  async initialize(videoElement: HTMLVideoElement): Promise<void> {
    this.videoElement = videoElement;
    const vision = await FilesetResolver.forVisionTasks(WASM_URL);
    const options = {
      baseOptions: { modelAssetPath: MODEL_URL, delegate: 'GPU' as const },
      runningMode: 'VIDEO' as const,
      numPoses: 1,
    };
    try {
      this.poseLandmarker = await PoseLandmarker.createFromOptions(vision, options);
    } catch (gpuErr) {
      // GPU delegate unavailable in this browser — fall back to CPU
      console.warn('MediaPipe GPU delegate unavailable, falling back to CPU:', gpuErr);
      this.poseLandmarker = await PoseLandmarker.createFromOptions(vision, {
        ...options,
        baseOptions: { modelAssetPath: MODEL_URL, delegate: 'CPU' as const },
      });
    }
  }

  start(onPose: PoseCallback): void {
    if (this.running || !this.videoElement || !this.poseLandmarker) return;
    this.running = true;
    this.onPose = onPose;
    this.loop();
  }

  stop(): void {
    this.running = false;
    if (this.animationFrameId !== null) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }
  }

  dispose(): void {
    this.stop();
    this.poseLandmarker?.close();
    this.poseLandmarker = null;
    this.videoElement = null;
    this.onPose = null;
  }

  private loop(): void {
    if (!this.running) return;
    this.animationFrameId = requestAnimationFrame(() => {
      this.detectAndEmit();
      this.loop();
    });
  }

  private detectAndEmit(): void {
    const video = this.videoElement;
    const landmarker = this.poseLandmarker;
    if (!video || !landmarker || !this.onPose) return;
    // Wait until the video has actual frames to process
    if (video.readyState < 2 || video.paused || video.ended) return;

    const nowMs = performance.now();
    const result = landmarker.detectForVideo(video, nowMs);
    if (result.landmarks.length === 0) return;

    const keypoints: Keypoint[] = result.landmarks[0].map((lm, i) => ({
      name: LANDMARK_NAMES[i] ?? `landmark_${i}`,
      x: lm.x,
      y: lm.y,
      z: lm.z ?? 0,
      confidence: lm.visibility ?? 1,
    }));
    if (import.meta.env.DEV && keypoints.length !== LANDMARK_NAMES.length) {
      console.warn(`MediaPipe returned ${keypoints.length} landmarks but expected ${LANDMARK_NAMES.length}`);
    }
    this.onPose({ keypoints, timestampMs: Math.round(nowMs) });
  }
}
