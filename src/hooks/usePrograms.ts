/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from 'react';
import { programsService } from '../services';

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
        const response = await programsService.getAll();
        // Handle paginated response - extract results array
        const programsData = response.results || response;
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
