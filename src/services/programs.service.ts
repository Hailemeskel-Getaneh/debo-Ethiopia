/* eslint-disable @typescript-eslint/no-explicit-any */
import { api } from './api';

// Backend schema: { id, name, description, created_at, updated_at }
export interface Program {
  id: number;
  name: string;
  description: string;
  created_at: string;
  updated_at: string;
}

export const programsService = {
  getAll: () => api.get<any>('/api/programs/'),
  getById: (id: number) => api.get<any>(`/api/programs/${id}/`),
};

export default programsService;
