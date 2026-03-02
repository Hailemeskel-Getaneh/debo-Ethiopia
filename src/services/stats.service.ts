import { api } from './api';
import type { StatMetric, PaginatedResponse } from '../types/admin';

export interface StatsListParams {
  page?: number;
  page_size?: number;
  search?: string;
}

export const statsService = {
  list: (params?: StatsListParams) =>
    api.get<PaginatedResponse<StatMetric>>('/stats/', params as Record<string, unknown>),

  get: (id: number) =>
    api.get<StatMetric>(`/stats/${id}/`),

  create: (data: { name: string; value: number }) =>
    api.post<StatMetric>('/stats/', data),

  update: (id: number, data: Partial<Omit<StatMetric, 'id' | 'created_at' | 'updated_at'>>) =>
    api.patch<StatMetric>(`/stats/${id}/`, data),

  delete: (id: number) =>
    api.delete(`/stats/${id}/`),

  getSummary: () =>
    api.get<StatMetric>('/stats/summary/'),

  // Aliases for compatibility
  getAll: () => api.get<PaginatedResponse<StatMetric>>('/stats/'),
};

export default statsService;

