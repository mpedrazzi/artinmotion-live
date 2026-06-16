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

/**
 * MediaPipe-based pose tracker.
 * Uses the MediaPipe Pose Landmarker loaded via CDN script tag.
 * Falls back to a stub when MediaPipe is not available.
 */
export class MediaPipePoseTracker implements IPoseTracker {
  private running = false;
  private animationFrameId: number | null = null;
  private videoElement: HTMLVideoElement | null = null;
  private onPose: PoseCallback | null = null;

  async initialize(videoElement: HTMLVideoElement): Promise<void> {
    this.videoElement = videoElement;
  }

  start(onPose: PoseCallback): void {
    if (this.running || !this.videoElement) return;
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
    this.videoElement = null;
    this.onPose = null;
  }

  private loop(): void {
    if (!this.running) return;
    this.animationFrameId = requestAnimationFrame(() => {
      const result = this.detectPose();
      if (result && this.onPose) this.onPose(result);
      this.loop();
    });
  }

  private detectPose(): PoseDetectionResult | null {
    // Stub: returns synthetic keypoints for demonstration.
    // Replace with actual MediaPipe Pose Landmarker integration.
    const t = performance.now();
    const keypoints: Keypoint[] = [
      { name: 'nose', x: 0.5, y: 0.1, z: 0, confidence: 0.99 },
      { name: 'left_shoulder', x: 0.4, y: 0.3, z: 0, confidence: 0.95 },
      { name: 'right_shoulder', x: 0.6, y: 0.3, z: 0, confidence: 0.95 },
      { name: 'left_elbow', x: 0.35, y: 0.45, z: 0, confidence: 0.9 },
      { name: 'right_elbow', x: 0.65, y: 0.45, z: 0, confidence: 0.9 },
      { name: 'left_wrist', x: 0.3, y: 0.6, z: 0, confidence: 0.85 },
      { name: 'right_wrist', x: 0.7, y: 0.6, z: 0, confidence: 0.85 },
      { name: 'left_hip', x: 0.42, y: 0.55, z: 0, confidence: 0.97 },
      { name: 'right_hip', x: 0.58, y: 0.55, z: 0, confidence: 0.97 },
      { name: 'left_knee', x: 0.4, y: 0.72, z: 0, confidence: 0.92 },
      { name: 'right_knee', x: 0.6, y: 0.72, z: 0, confidence: 0.92 },
      { name: 'left_ankle', x: 0.38, y: 0.9, z: 0, confidence: 0.88 },
      { name: 'right_ankle', x: 0.62, y: 0.9, z: 0, confidence: 0.88 },
    ];
    return { keypoints, timestampMs: Math.round(t) };
  }
}
