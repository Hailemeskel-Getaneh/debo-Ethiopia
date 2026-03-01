/* eslint-disable @typescript-eslint/no-explicit-any */
import { api } from './api';

export interface Achievement {
  id: number;
  title: string;
  description: string;
  image?: string;
  date?: string;
  category?: string;
  created_at?: string;
}

export const achievementsService = {
  getAll: () => api.get<any>('/api/achievements/'),
  getById: (id: number) => api.get<any>(`/api/achievements/${id}/`),
};

export default achievementsService;
