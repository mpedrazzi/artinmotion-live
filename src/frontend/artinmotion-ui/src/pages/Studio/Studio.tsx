import { useRef, useState } from 'react';
import { VideoCapture } from '../../components/VideoCapture';
import { PoseOverlay } from '../../components/PoseOverlay';
import { usePoseTracking } from '../../hooks/usePoseTracking';
import { useWebRTC } from '../../hooks/useWebRTC';
import { streamService } from '../../services/streamService';
import './Studio.scss';

export function Studio() {
  const { videoRef, isCapturing, startCapture, stopCapture, error } = useWebRTC();
  const { keypoints, isTracking, startTracking, stopTracking } = usePoseTracking();
  const [streamId, setStreamId] = useState<string | null>(null);
  const [sessionId] = useState<string>('');
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const handleStartCapture = async () => {
    await startCapture();
    if (videoRef.current) {
      await startTracking(videoRef.current);
    }
  };

  const handleStopCapture = () => {
    stopCapture();
    stopTracking();
    if (intervalRef.current) clearInterval(intervalRef.current);
    setStreamId(null);
  };

  const handleStartStream = async () => {
    if (!sessionId) return;
    const id = await streamService.start({ sessionId });
    setStreamId(id);

    intervalRef.current = setInterval(async () => {
      if (keypoints.length > 0) {
        await streamService.publishPose(id, Date.now(), keypoints);
      }
    }, 100);
  };

  const handleEndStream = async () => {
    if (!streamId) return;
    if (intervalRef.current) clearInterval(intervalRef.current);
    await streamService.end(streamId);
    setStreamId(null);
  };

  return (
    <div className="studio">
      <h1 className="studio__title">Studio</h1>
      <p className="studio__subtitle">Capture your movement and stream it live in 3D.</p>

      <div className="studio__layout">
        <div className="studio__capture">
          <div className="studio__viewport-wrapper">
            <VideoCapture
              videoRef={videoRef}
              isCapturing={isCapturing}
              onStart={handleStartCapture}
              onStop={handleStopCapture}
              error={error}
            />
            {isCapturing && (
              <PoseOverlay
                keypoints={keypoints}
                width={1280}
                height={720}
              />
            )}
          </div>
        </div>

        <div className="studio__sidebar">
          <div className="studio__status">
            <div className={`studio__indicator ${isCapturing ? 'studio__indicator--active' : ''}`} />
            <span>{isCapturing ? 'Camera Active' : 'Camera Off'}</span>
          </div>

          <div className="studio__status">
            <div className={`studio__indicator ${isTracking ? 'studio__indicator--tracking' : ''}`} />
            <span>{isTracking ? `Tracking ${keypoints.length} keypoints` : 'Pose Tracking Off'}</span>
          </div>

          {!streamId ? (
            <button
              className="btn btn--primary"
              onClick={handleStartStream}
              disabled={!isCapturing || !sessionId}
            >
              Go Live
            </button>
          ) : (
            <button className="btn btn--danger" onClick={handleEndStream}>
              End Stream
            </button>
          )}

          {streamId && (
            <p className="studio__stream-id">
              Stream ID: <code>{streamId}</code>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
