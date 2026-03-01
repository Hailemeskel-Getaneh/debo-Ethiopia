/* eslint-disable @typescript-eslint/no-explicit-any */
import { api } from './api';

export interface Project {
  id: number;
  title: string;
  description: string;
  status: string;
  image?: string;
  start_date?: string;
  end_date?: string;
  budget?: number;
  location?: string;
  created_at?: string;
  updated_at?: string;
}

export const projectsService = {
  getAll: () => api.get<any>('/api/projects/'),
  getById: (id: number) => api.get<any>(`/api/projects/${id}/`),
};

export default projectsService;
