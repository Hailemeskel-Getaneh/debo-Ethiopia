import { api } from './api';
import type { UserRole, PaginatedResponse } from '../types/admin';

export interface RoleListParams {
    page?: number;
    page_size?: number;
}

export interface RolePayload {
    name: string;
    description?: string;
}

export const rolesService = {
    list: (params?: RoleListParams) =>
        api.get<PaginatedResponse<UserRole>>('/user-roles/', params as Record<string, unknown>),

    get: (id: string | number) =>
        api.get<UserRole>(`/user-roles/${id}/`),

    create: (data: RolePayload) =>
        api.post<UserRole>('/user-roles/', data),

    update: (id: string | number, data: Partial<RolePayload>) =>
        api.patch<UserRole>(`/user-roles/${id}/`, data),

    delete: (id: string | number) =>
        api.delete(`/user-roles/${id}/`),
};

export default rolesService;
