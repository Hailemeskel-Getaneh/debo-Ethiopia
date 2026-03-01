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

  update: (id: number, value: number) =>
    api.patch<StatMetric>(`/stats/${id}/`, { value }),

  // Aliases for compatibility with user-api-integration
  getAll: () => api.get<PaginatedResponse<StatMetric>>('/stats/'),
};

export default statsService;

