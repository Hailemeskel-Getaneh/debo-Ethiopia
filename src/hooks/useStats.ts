/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from 'react';
import { statsService } from '../services';
import type { StatItem } from '../services';
import { cachedFetch } from './apiCache';

interface UseStatsResult {
  stats: StatItem[];
  loading: boolean;
  error: string | null;
}

export const useStats = (): UseStatsResult => {
  const [stats, setStats] = useState<StatItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await cachedFetch('stats', () => statsService.getAll());
        const statsData = (response as any).results || response || [];
        setStats(statsData);
      } catch (err) {
        console.error('Error fetching stats:', err);
        setError('Failed to load stats');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { stats, loading, error };
};

export default useStats;
