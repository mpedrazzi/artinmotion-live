import { useCallback, useEffect, useState } from 'react';
import { sessionService } from '../services/sessionService';
import type { CreateSessionRequest, Session } from '../types';

export function useSessions(performerId?: string) {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchSessions = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await sessionService.list(performerId);
      setSessions(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load sessions');
    } finally {
      setLoading(false);
    }
  }, [performerId]);

  const createSession = useCallback(async (data: CreateSessionRequest): Promise<string> => {
    const id = await sessionService.create(data);
    await fetchSessions();
    return id;
  }, [fetchSessions]);

  const endSession = useCallback(async (id: string): Promise<void> => {
    await sessionService.end(id);
    await fetchSessions();
  }, [fetchSessions]);

  useEffect(() => { fetchSessions(); }, [fetchSessions]);

  return { sessions, loading, error, createSession, endSession, refetch: fetchSessions };
}
