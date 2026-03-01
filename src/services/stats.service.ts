import { api } from './api';

// Backend schema: { name: string, value: number }[]
export interface StatItem {
  name: string;
  value: number;
}

export const statsService = {
  getAll: () => api.get<StatItem[]>('/api/stats/'),
};

export default statsService;
