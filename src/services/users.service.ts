import { api } from './api';
import type { User, PaginatedResponse } from '../types/admin';

export interface UserListParams {
    page?: number;
    page_size?: number;
    search?: string;
    is_staff?: boolean;
}

export interface UserCreatePayload {
    first_name: string;
    last_name: string;
    email: string;
    phone_number?: string;
    password: string;
    role?: number; // integer ID from /api/user-roles/
}

export interface UserUpdatePayload {
    first_name?: string;
    last_name?: string;
    phone_number?: string;
    is_staff?: boolean;
    is_superuser?: boolean;
    role?: number; // integer ID from /api/user-roles/
}

export const usersService = {
    list: (params?: UserListParams) =>
        api.get<PaginatedResponse<User>>('/auth/users/', params as Record<string, unknown>),

    get: (id: string | number) =>
        api.get<User>(`/auth/users/${id}/`),
    create: (data: UserCreatePayload) =>
        api.post<User>('/auth/users/', data),

    update: (id: string | number, data: UserUpdatePayload) =>
        api.patch<User>(`/auth/users/${id}/`, data),

    setRole: (id: string | number, roleId: number) =>
        api.patch<User>(`/auth/users/${id}/set-role/`, { role: roleId }),

    delete: (id: string | number) =>
        api.delete(`/auth/users/${id}/`),

    grantSuperAdmin: (id: string | number) =>
        api.patch<User>(`/auth/users/${id}/`, { is_superuser: true }),

    revokeSuperAdmin: (id: string | number) =>
        api.patch<User>(`/auth/users/${id}/`, { is_superuser: false }),
};
