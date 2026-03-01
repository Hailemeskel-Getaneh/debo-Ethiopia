/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from 'react';
import { aboutService } from '../services';

interface UseAboutResult {
  staff: any[];
  loading: boolean;
  error: string | null;
}

export const useAbout = (): UseAboutResult => {
  const [staff, setStaff] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await aboutService.getStaffs();
        const staffData = response.results || response || [];
        setStaff(staffData);
      } catch (err) {
        console.error('Error fetching staff:', err);
        setError('Failed to load staff data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { staff, loading, error };
};

export default useAbout;
