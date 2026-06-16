import { useCallback, useEffect, useRef, useState } from 'react';

interface UseWebRTCReturn {
  localStream: MediaStream | null;
  isCapturing: boolean;
  videoRef: React.RefObject<HTMLVideoElement | null>;
  startCapture: () => Promise<void>;
  stopCapture: () => void;
  error: string | null;
}

export function useWebRTC(): UseWebRTCReturn {
  const [localStream, setLocalStream] = useState<MediaStream | null>(null);
  const [isCapturing, setIsCapturing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const startCapture = useCallback(async () => {
    try {
      setError(null);
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: 1280, height: 720, facingMode: 'user' },
        audio: false,
      });
      setLocalStream(stream);
      setIsCapturing(true);
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Camera access denied');
    }
  }, []);

  const stopCapture = useCallback(() => {
    localStream?.getTracks().forEach(t => t.stop());
    setLocalStream(null);
    setIsCapturing(false);
    if (videoRef.current) videoRef.current.srcObject = null;
  }, [localStream]);

  useEffect(() => {
    return () => {
      localStream?.getTracks().forEach(t => t.stop());
    };
  }, [localStream]);

  return { localStream, isCapturing, videoRef, startCapture, stopCapture, error };
}
