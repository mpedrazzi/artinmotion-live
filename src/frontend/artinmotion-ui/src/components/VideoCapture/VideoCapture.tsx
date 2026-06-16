import { useEffect } from 'react';
import type { RefObject } from 'react';
import './VideoCapture.scss';

interface VideoCaptureProps {
  videoRef: RefObject<HTMLVideoElement | null>;
  isCapturing: boolean;
  onStart: () => Promise<void>;
  onStop: () => void;
  error?: string | null;
}

export function VideoCapture({ videoRef, isCapturing, onStart, onStop, error }: VideoCaptureProps) {
  useEffect(() => {
    if (videoRef.current && isCapturing) {
      videoRef.current.play().catch(console.error);
    }
  }, [isCapturing, videoRef]);

  return (
    <div className="video-capture">
      <div className="video-capture__viewport">
        <video
          ref={videoRef as RefObject<HTMLVideoElement>}
          className="video-capture__feed"
          autoPlay
          muted
          playsInline
        />
        {!isCapturing && (
          <div className="video-capture__placeholder">
            <span>Camera off</span>
          </div>
        )}
      </div>

      <div className="video-capture__controls">
        {!isCapturing ? (
          <button className="btn btn--primary" onClick={onStart}>
            Start Camera
          </button>
        ) : (
          <button className="btn btn--danger" onClick={onStop}>
            Stop Camera
          </button>
        )}
      </div>

      {error && <p className="video-capture__error">{error}</p>}
    </div>
  );
}
