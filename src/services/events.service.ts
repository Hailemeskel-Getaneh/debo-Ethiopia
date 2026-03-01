/* eslint-disable @typescript-eslint/no-explicit-any */
import { api } from './api';

export interface Event {
  id: number;
  title: string;
  description: string;
  date: string;
  end_date?: string;
  location: string;
  image?: string;
  is_upcoming: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface EventImage {
  id: number;
  image: string;
  caption?: string;
}

export const eventsService = {
  getAll: () => api.get<any>('/api/events/'),
  getById: (id: number) => api.get<any>(`/api/events/${id}/`),
};

export default eventsService;
