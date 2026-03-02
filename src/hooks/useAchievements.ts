/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from 'react';
import { achievementsService } from '../services';
import { cachedFetch } from './apiCache';

interface UseAchievementsResult {
  achievements: any[];
  loading: boolean;
  error: string | null;
}

export const useAchievements = (): UseAchievementsResult => {
  const [achievements, setAchievements] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await cachedFetch('achievements', () =>
          achievementsService.getAll()
        );
        const achievementsData = (response as any).results || response || [];
        setAchievements(achievementsData);
      } catch (err) {
        console.error('Error fetching achievements:', err);
        setError('Failed to load achievements');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { achievements, loading, error };
};

export default useAchievements;
