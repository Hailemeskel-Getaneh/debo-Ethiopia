/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from 'react';
import { programsService } from '../services';
import { cachedFetch } from './apiCache';

interface UseProgramsResult {
  programs: any[];
  loading: boolean;
  error: string | null;
}

export const usePrograms = (): UseProgramsResult => {
  const [programs, setPrograms] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await cachedFetch('programs', () => programsService.getAll());
        const programsData = (response as any).results || response;
        setPrograms(programsData);
      } catch (err) {
        console.error('Error fetching programs:', err);
        setError('Failed to load programs');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { programs, loading, error };
};

export default usePrograms;
