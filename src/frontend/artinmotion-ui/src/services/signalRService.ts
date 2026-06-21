import * as signalR from '@microsoft/signalr';
import type { PoseFrame } from '../types';

const HUB_URL = `${(import.meta.env.VITE_API_URL ?? 'http://localhost:5000').replace(/\/$/, '')}/hubs/pose`;

export class SignalRService {
  private connection: signalR.HubConnection;

  constructor() {
    this.connection = new signalR.HubConnectionBuilder()
      .withUrl(HUB_URL)
      .withAutomaticReconnect()
      .build();
  }

  async start(): Promise<void> {
    if (this.connection.state === signalR.HubConnectionState.Disconnected) {
      await this.connection.start();
    }
  }

  async stop(): Promise<void> {
    await this.connection.stop();
  }

  async joinStream(streamSessionId: string): Promise<void> {
    await this.connection.invoke('JoinStream', streamSessionId);
  }

  async leaveStream(streamSessionId: string): Promise<void> {
    await this.connection.invoke('LeaveStream', streamSessionId);
  }

  onPoseFrameReceived(handler: (frame: PoseFrame) => void): void {
    this.connection.on('PoseFrameReceived', handler);
  }

  onStreamStarted(handler: (streamSessionId: string) => void): void {
    this.connection.on('StreamStarted', handler);
  }

  onStreamEnded(handler: (streamSessionId: string) => void): void {
    this.connection.on('StreamEnded', handler);
  }

  offPoseFrameReceived(handler: (frame: PoseFrame) => void): void {
    this.connection.off('PoseFrameReceived', handler);
  }
}

export const signalRService = new SignalRService();
