/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from 'react';
import { newsService } from '../services';

interface UseNewsResult {
  news: any[];
  published: any[];
  loading: boolean;
  error: string | null;
}

export const useNews = (): UseNewsResult => {
  const [news, setNews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await newsService.getAll();
        const newsData = response.results || response || [];
        setNews(newsData);
      } catch (err) {
        console.error('Error fetching news:', err);
        setError('Failed to load news');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Filter only published news
  const published = news.filter(item => item.is_published);

  return { news, published, loading, error };
};

export default useNews;
