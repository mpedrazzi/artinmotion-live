import { useCallback, useState } from 'react';
import { SceneViewer } from '../../components/SceneViewer';
import { useSignalR } from '../../hooks/useSignalR';
import type { PoseFrame } from '../../types';
import './Viewer.scss';

export function Viewer() {
  const [streamSessionId, setStreamSessionId] = useState('');
  const [watching, setWatching] = useState(false);
  const [latestFrame, setLatestFrame] = useState<PoseFrame | null>(null);
  const [inputId, setInputId] = useState('');

  const onPoseFrame = useCallback((frame: PoseFrame) => {
    setLatestFrame(frame);
  }, []);

  useSignalR({
    streamSessionId: watching ? streamSessionId : undefined,
    onPoseFrame: watching ? onPoseFrame : undefined,
  });

  const handleWatch = () => {
    if (!inputId.trim()) return;
    setStreamSessionId(inputId.trim());
    setWatching(true);
    setLatestFrame(null);
  };

  const handleStop = () => {
    setWatching(false);
    setStreamSessionId('');
    setLatestFrame(null);
  };

  return (
    <div className="viewer">
      <h1 className="viewer__title">Viewer</h1>
      <p className="viewer__subtitle">Watch a live 3D stream.</p>

      <div className="viewer__layout">
        <div className="viewer__scene">
          <SceneViewer poseFrame={latestFrame} />
        </div>

        <div className="viewer__sidebar">
          {!watching ? (
            <>
              <label className="viewer__label" htmlFor="stream-id">
                Stream Session ID
              </label>
              <input
                id="stream-id"
                className="viewer__input"
                type="text"
                placeholder="Enter stream ID..."
                value={inputId}
                onChange={e => setInputId(e.target.value)}
              />
              <button
                className="btn btn--primary"
                onClick={handleWatch}
                disabled={!inputId.trim()}
              >
                Watch Stream
              </button>
            </>
          ) : (
            <>
              <div className="viewer__live-badge">
                <span className="viewer__live-dot" /> LIVE
              </div>
              <p className="viewer__stream-id">
                <code>{streamSessionId}</code>
              </p>
              {latestFrame && (
                <p className="viewer__keypoints">
                  {latestFrame.keypoints.length} keypoints tracked
                </p>
              )}
              <button className="btn btn--danger" onClick={handleStop}>
                Stop Watching
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
