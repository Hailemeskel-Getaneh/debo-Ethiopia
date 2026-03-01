/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from 'react';
import { galleryService } from '../services';

interface UseGalleryResult {
  galleries: any[];
  loading: boolean;
  error: string | null;
}

export const useGallery = (): UseGalleryResult => {
  const [galleries, setGalleries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await galleryService.getAll();
        const galleryData = response.results || response || [];
        setGalleries(galleryData);
      } catch (err) {
        console.error('Error fetching gallery:', err);
        setError('Failed to load gallery');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { galleries, loading, error };
};

export default useGallery;
