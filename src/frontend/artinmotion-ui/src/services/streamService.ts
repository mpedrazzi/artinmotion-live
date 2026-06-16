import { apiClient } from './apiClient';
import type { Keypoint, StartStreamRequest, StreamSession } from '../types';

export const streamService = {
  get: (id: string): Promise<StreamSession> =>
    apiClient.get<StreamSession>(`/api/streams/${id}`),

  start: (data: StartStreamRequest): Promise<string> =>
    apiClient.post<string>('/api/streams/start', data),

  end: (id: string): Promise<void> =>
    apiClient.post<void>(`/api/streams/${id}/end`, {}),

  publishPose: (id: string, timestampMs: number, keypoints: Keypoint[]): Promise<void> =>
    apiClient.post<void>(`/api/streams/${id}/pose`, { timestampMs, keypoints }),
};
