import { api } from './api';
import type { Project, PaginatedResponse } from '../types/admin';

export interface ProjectListParams {
    page?: number;
    page_size?: number;
    search?: string;
    status?: string;
}

export interface ProjectPayload {
    name: string;
    description: string;
    location: string;
    budget: number;
    currency: string;
    start_date: string;
    end_date: string;
    status: string;
    progress_percent?: number;
}

export const projectsService = {
    list: (params?: ProjectListParams) =>
        api.get<PaginatedResponse<Project>>('/projects/', params as Record<string, unknown>),

    get: (id: string | number) =>
        api.get<Project>(`/projects/${id}/`),

    create: (data: ProjectPayload) =>
        api.post<Project>('/projects/', data),

    update: (id: string | number, data: Partial<ProjectPayload>) =>
        api.patch<Project>(`/projects/${id}/`, data),

    delete: (id: string | number) =>
        api.delete(`/projects/${id}/`),

    // Aliases for compatibility with user-api-integration
    getAll: () => api.get<PaginatedResponse<Project>>('/projects/'),
    getById: (id: string | number) => api.get<Project>(`/projects/${id}/`),
};

export default projectsService;

