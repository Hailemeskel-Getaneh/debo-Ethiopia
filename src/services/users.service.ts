import { api } from './api';
import type { User, PaginatedResponse } from '../types/admin';

export interface UserListParams {
    page?: number;
    page_size?: number;
    search?: string;
    is_staff?: boolean;
}

export interface UserUpdatePayload {
    first_name?: string;
    last_name?: string;
    phone_number?: string;
    is_staff?: boolean;
}

export const usersService = {
    list: (params?: UserListParams) =>
        api.get<PaginatedResponse<User>>('/auth/users/', params as Record<string, unknown>),

    get: (id: number) =>
        api.get<User>(`/auth/users/${id}/`),

    update: (id: number, data: UserUpdatePayload) =>
        api.patch<User>(`/auth/users/${id}/`, data),

    delete: (id: number) =>
        api.delete(`/auth/users/${id}/`),
};
