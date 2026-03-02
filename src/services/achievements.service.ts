import { api } from './api';
import type { Achievement, PaginatedResponse } from '../types/admin';

export interface AchievementListParams {
    page?: number;
    page_size?: number;
    search?: string;
}

export interface AchievementPayload {
    title: string;
    description: string;
    achieved_at: string;
    image_url?: string | null;
}

export const achievementsService = {
    list: (params?: AchievementListParams) =>
        api.get<PaginatedResponse<Achievement>>('/achievements/', params as Record<string, unknown>),

    get: (id: number) =>
        api.get<Achievement>(`/achievements/${id}/`),

    create: (data: AchievementPayload) =>
        api.post<Achievement>('/achievements/', data),

    update: (id: number, data: Partial<AchievementPayload>) =>
        api.patch<Achievement>(`/achievements/${id}/`, data),

    delete: (id: number) =>
        api.delete(`/achievements/${id}/`),

    // Aliases for compatibility with user-api-integration
    getAll: () => api.get<PaginatedResponse<Achievement>>('/achievements/'),
    getById: (id: number) => api.get<Achievement>(`/achievements/${id}/`),
};

export default achievementsService;

