import { useState, useEffect } from 'react';
import { projectsService } from '../services';

interface UseProjectsResult {
  projects: any[];
  active: any[];
  completed: any[];
  upcoming: any[];
  loading: boolean;
  error: string | null;
}

export const useProjects = (): UseProjectsResult => {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await projectsService.getAll();
        const projectsData = response.results || response || [];
        setProjects(projectsData);
      } catch (err) {
        console.error('Error fetching projects:', err);
        setError('Failed to load projects');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Filter projects by status
  const active = projects.filter(p => p.status === 'active');
  const completed = projects.filter(p => p.status === 'completed');
  const upcoming = projects.filter(p => p.status === 'planned');

  return { projects, active, completed, upcoming, loading, error };
};

export default useProjects;
