/* eslint-disable @typescript-eslint/no-explicit-any */
import { api } from './api';

// Types for the API responses
export interface StatsSummary {
  total_projects: number;
  total_programs: number;
  total_donations: number;
  total_students: number;
  recent_projects: Project[];
  recent_programs: Program[];
  recent_events: Event[];
}

export interface Project {
  id: number;
  title: string;
  description: string;
  status: string;
  image?: string;
  start_date?: string;
  end_date?: string;
  created_at?: string;
}

export interface Program {
  id: number;
  name: string;
  description: string;
  category: string;
  image?: string;
  created_at?: string;
}

export interface Event {
  id: number;
  title: string;
  description: string;
  date: string;
  location: string;
  image?: string;
  is_upcoming?: boolean;
  created_at?: string;
}

export const homeService = {
  getStatsSummary: () => api.get<any>('/stats/summary/'),
  getProjects: () => api.get<any>('/projects/'),
  getPrograms: () => api.get<any>('/programs/'),
  getEvents: () => api.get<any>('/events/'),
};

export default homeService;
