/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from 'react';
import { eventsService } from '../services';

interface UseEventsResult {
  events: any[];
  upcoming: any[];
  past: any[];
  loading: boolean;
  error: string | null;
}

export const useEvents = (): UseEventsResult => {
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await eventsService.getAll();
        const eventsData = response.results || response || [];
        setEvents(eventsData);
      } catch (err) {
        console.error('Error fetching events:', err);
        setError('Failed to load events');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Filter events by upcoming/past based on date
  const now = new Date();
  const upcoming = events.filter((event: any) => {
    const eventDate = new Date(event.start_date || event.end_date);
    return eventDate >= now;
  });
  const past = events.filter((event: any) => {
    const eventDate = new Date(event.start_date || event.end_date);
    return eventDate < now;
  });

  return { events, upcoming, past, loading, error };
};

export default useEvents;
