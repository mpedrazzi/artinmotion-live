import { useEffect, useRef, useState } from 'react';
import { VideoCapture } from '../../components/VideoCapture';
import { PoseOverlay } from '../../components/PoseOverlay';
import { usePoseTracking } from '../../hooks/usePoseTracking';
import { useWebRTC } from '../../hooks/useWebRTC';
import { performerService } from '../../services/performerService';
import { sessionService } from '../../services/sessionService';
import { streamService } from '../../services/streamService';
import type { Keypoint } from '../../types';
import './Studio.scss';

export function Studio() {
  const { videoRef, isCapturing, startCapture, stopCapture, error } = useWebRTC();
  const { keypoints, isTracking, startTracking, stopTracking } = usePoseTracking();
  const [streamId, setStreamId] = useState<string | null>(null);
  const [performerName, setPerformerName] = useState('');
  const [sessionTitle, setSessionTitle] = useState('');
  const [streamLoading, setStreamLoading] = useState(false);
  const [streamError, setStreamError] = useState<string | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Keep a ref so the interval always reads the latest keypoints (avoids stale closure)
  const keypointsRef = useRef<Keypoint[]>([]);
  useEffect(() => {
    keypointsRef.current = keypoints;
  }, [keypoints]);

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
    setStreamError(null);
  };

  const handleStartStream = async () => {
    if (!isCapturing) return;
    setStreamLoading(true);
    setStreamError(null);
    try {
      const performerId = await performerService.create({
        name: performerName.trim() || 'Anonymous Performer',
      });
      const createdSessionId = await sessionService.create({
        title: sessionTitle.trim() || 'Live Session',
        performerId,
      });
      const id = await streamService.start({ sessionId: createdSessionId });
      setStreamId(id);

      intervalRef.current = setInterval(async () => {
        const pts = keypointsRef.current;
        if (pts.length > 0) {
          await streamService.publishPose(id, Date.now(), pts).catch(err =>
            console.error('Failed to publish pose frame:', err)
          );
        }
      }, 100);
    } catch (err) {
      setStreamError(err instanceof Error ? err.message : 'Failed to start stream');
    } finally {
      setStreamLoading(false);
    }
  };

  const handleEndStream = async () => {
    if (!streamId) return;
    if (intervalRef.current) clearInterval(intervalRef.current);
    try {
      await streamService.end(streamId);
    } catch (err) {
      console.error('Failed to end stream:', err);
      setStreamError(err instanceof Error ? err.message : 'Failed to end stream');
    }
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
            <>
              <div>
                <label className="studio__label" htmlFor="performer-name">Your Name</label>
                <input
                  id="performer-name"
                  className="studio__input"
                  type="text"
                  placeholder="Anonymous Performer"
                  value={performerName}
                  onChange={e => setPerformerName(e.target.value)}
                  disabled={!isCapturing || streamLoading}
                />
              </div>
              <div>
                <label className="studio__label" htmlFor="session-title">Session Title</label>
                <input
                  id="session-title"
                  className="studio__input"
                  type="text"
                  placeholder="Live Session"
                  value={sessionTitle}
                  onChange={e => setSessionTitle(e.target.value)}
                  disabled={!isCapturing || streamLoading}
                />
              </div>
              <button
                className="btn btn--primary"
                onClick={handleStartStream}
                disabled={!isCapturing || streamLoading}
              >
                {streamLoading ? 'Starting…' : 'Go Live'}
              </button>
              {streamError && <p className="studio__error">{streamError}</p>}
            </>
          ) : (
            <>
              <button className="btn btn--danger" onClick={handleEndStream}>
                End Stream
              </button>
              <p className="studio__stream-id">
                Stream ID: <code>{streamId}</code>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
