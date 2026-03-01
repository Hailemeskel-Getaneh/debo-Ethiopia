import { api } from './api';
import type { Program, PaginatedResponse } from '../types/admin';

export interface ProgramListParams {
    page?: number;
    page_size?: number;
    search?: string;
}

export interface ProgramPayload {
    name: string;
    description: string;
}

export const programsService = {
    list: (params?: ProgramListParams) =>
        api.get<PaginatedResponse<Program>>('/programs/', params as Record<string, unknown>),

    get: (id: number) =>
        api.get<Program>(`/programs/${id}/`),

    create: (data: ProgramPayload) =>
        api.post<Program>('/programs/', data),

    update: (id: number, data: Partial<ProgramPayload>) =>
        api.patch<Program>(`/programs/${id}/`, data),

    delete: (id: number) =>
        api.delete(`/programs/${id}/`),

    // Aliases for compatibility with user-api-integration
    getAll: () => api.get<PaginatedResponse<Program>>('/programs/'),
    getById: (id: number) => api.get<Program>(`/programs/${id}/`),
};

export default programsService;

