import { apiClient } from './apiClient';
import type { CreateSessionRequest, Session } from '../types';

export const sessionService = {
  list: (performerId?: string): Promise<Session[]> => {
    const qs = performerId ? `?performerId=${performerId}` : '';
    return apiClient.get<Session[]>(`/api/sessions${qs}`);
  },

  get: (id: string): Promise<Session> =>
    apiClient.get<Session>(`/api/sessions/${id}`),

  create: (data: CreateSessionRequest): Promise<string> =>
    apiClient.post<string>('/api/sessions', data),

  end: (id: string): Promise<void> =>
    apiClient.post<void>(`/api/sessions/${id}/end`, {}),
};
