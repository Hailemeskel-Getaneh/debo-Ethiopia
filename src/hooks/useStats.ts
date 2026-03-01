/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from 'react';
import { statsService } from '../services';
import type { StatItem } from '../services';

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
        const response = await statsService.getAll();
        // Handle both paginated and non-paginated responses
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
