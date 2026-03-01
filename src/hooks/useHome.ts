import { useState, useEffect } from 'react';
import { homeService } from '../services';

interface UseHomeResult {
  stats: any;
  projects: any[];
  programs: any[];
  events: any[];
  loading: boolean;
  error: string | null;
}

export const useHome = (): UseHomeResult => {
  const [stats, setStats] = useState<any>(null);
  const [projects, setProjects] = useState<any[]>([]);
  const [programs, setPrograms] = useState<any[]>([]);
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch stats summary
        const statsData = await homeService.getStatsSummary();
        setStats(statsData);

        // Also fetch all projects, programs, and events separately if needed
        const [projectsRes, programsRes, eventsRes] = await Promise.all([
          homeService.getProjects(),
          homeService.getPrograms(),
          homeService.getEvents(),
        ]);

        // Handle paginated responses - extract results array
        setProjects(projectsRes.results || projectsRes || []);
        setPrograms(programsRes.results || programsRes || []);
        setEvents(eventsRes.results || eventsRes || []);
      } catch (err) {
        console.error('Error fetching home data:', err);
        setError('Failed to load home data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { stats, projects, programs, events, loading, error };
};

export default useHome;
