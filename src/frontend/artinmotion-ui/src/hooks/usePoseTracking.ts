import { useCallback, useEffect, useRef, useState } from 'react';
import { MediaPipePoseTracker, type PoseDetectionResult } from '../services/poseTrackingService';
import type { Keypoint } from '../types';

interface UsePoseTrackingReturn {
  keypoints: Keypoint[];
  isTracking: boolean;
  startTracking: (videoElement: HTMLVideoElement) => Promise<void>;
  stopTracking: () => void;
}

export function usePoseTracking(): UsePoseTrackingReturn {
  const [keypoints, setKeypoints] = useState<Keypoint[]>([]);
  const [isTracking, setIsTracking] = useState(false);
  const trackerRef = useRef<MediaPipePoseTracker | null>(null);

  const startTracking = useCallback(async (videoElement: HTMLVideoElement) => {
    const tracker = new MediaPipePoseTracker();
    await tracker.initialize(videoElement);
    trackerRef.current = tracker;
    setIsTracking(true);
    tracker.start((result: PoseDetectionResult) => {
      setKeypoints(result.keypoints);
    });
  }, []);

  const stopTracking = useCallback(() => {
    trackerRef.current?.dispose();
    trackerRef.current = null;
    setIsTracking(false);
    setKeypoints([]);
  }, []);

  useEffect(() => {
    return () => {
      trackerRef.current?.dispose();
    };
  }, []);

  return { keypoints, isTracking, startTracking, stopTracking };
}
