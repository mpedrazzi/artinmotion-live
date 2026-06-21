import { apiClient } from './apiClient';
import type { CreatePerformerRequest, Performer } from '../types';

export const performerService = {
  list: (): Promise<Performer[]> =>
    apiClient.get<Performer[]>('/api/performers'),

  get: (id: string): Promise<Performer> =>
    apiClient.get<Performer>(`/api/performers/${id}`),

  create: (data: CreatePerformerRequest): Promise<string> =>
    apiClient.post<string>('/api/performers', data),
};
