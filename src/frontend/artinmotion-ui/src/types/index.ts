export enum SessionStatus {
  Scheduled = 0,
  Live = 1,
  Ended = 2,
}

export enum StreamStatus {
  Idle = 0,
  Active = 1,
  Ended = 2,
}

export interface Keypoint {
  name: string;
  x: number;
  y: number;
  z: number;
  confidence: number;
}

export interface PoseFrame {
  streamSessionId: string;
  timestampMs: number;
  keypoints: Keypoint[];
}

export interface Performer {
  id: string;
  name: string;
  avatarUrl?: string;
  bio?: string;
  createdAt: string;
}

export interface Session {
  id: string;
  title: string;
  description?: string;
  status: SessionStatus;
  performerId: string;
  performerName: string;
  createdAt: string;
  startedAt?: string;
  endedAt?: string;
}

export interface StreamSession {
  id: string;
  sessionId: string;
  status: StreamStatus;
  webRtcOfferId?: string;
  createdAt: string;
  startedAt?: string;
  endedAt?: string;
}

export interface CreateSessionRequest {
  title: string;
  performerId: string;
  description?: string;
}

export interface CreatePerformerRequest {
  name: string;
  avatarUrl?: string;
  bio?: string;
}

export interface StartStreamRequest {
  sessionId: string;
  webRtcOfferId?: string;
}
