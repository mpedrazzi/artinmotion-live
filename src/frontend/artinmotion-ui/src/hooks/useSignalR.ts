import { useCallback, useEffect, useRef } from 'react';
import { signalRService } from '../services/signalRService';
import type { PoseFrame } from '../types';

interface UseSignalROptions {
  streamSessionId?: string;
  onPoseFrame?: (frame: PoseFrame) => void;
  onStreamStarted?: (id: string) => void;
  onStreamEnded?: (id: string) => void;
}

export function useSignalR({
  streamSessionId,
  onPoseFrame,
  onStreamStarted,
  onStreamEnded,
}: UseSignalROptions = {}) {
  const joinedRef = useRef(false);

  useEffect(() => {
    signalRService.start().catch(console.error);

    if (onPoseFrame) signalRService.onPoseFrameReceived(onPoseFrame);
    if (onStreamStarted) signalRService.onStreamStarted(onStreamStarted);
    if (onStreamEnded) signalRService.onStreamEnded(onStreamEnded);

    return () => {
      if (onPoseFrame) signalRService.offPoseFrameReceived(onPoseFrame);
    };
  }, [onPoseFrame, onStreamStarted, onStreamEnded]);

  useEffect(() => {
    if (!streamSessionId) return;
    signalRService.start().then(async () => {
      await signalRService.joinStream(streamSessionId);
      joinedRef.current = true;
    }).catch(console.error);

    return () => {
      if (joinedRef.current && streamSessionId) {
        signalRService.leaveStream(streamSessionId).catch(console.error);
        joinedRef.current = false;
      }
    };
  }, [streamSessionId]);

  const joinStream = useCallback(async (id: string) => {
    await signalRService.joinStream(id);
  }, []);

  const leaveStream = useCallback(async (id: string) => {
    await signalRService.leaveStream(id);
  }, []);

  return { joinStream, leaveStream };
}
