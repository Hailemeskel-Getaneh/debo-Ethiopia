import { api } from './api';
import type { Staff, PaginatedResponse } from '../types/admin';

export interface StaffListParams {
    page?: number;
    page_size?: number;
    search?: string;
    ordering?: string;
}

export interface StaffCreatePayload {
    user_id: string | number;
    region: string;
    position: string;
}

export interface StaffUpdatePayload {
    region?: string;
    position?: string;
}

export const staffsService = {
    list: (params?: StaffListParams) =>
        api.get<PaginatedResponse<Staff>>('/staffs/', params as Record<string, unknown>),

    get: (id: string | number) =>
        api.get<Staff>(`/staffs/${id}/`),

    create: (data: StaffCreatePayload) =>
        api.post<Staff>('/staffs/', data),

    update: (id: string | number, data: StaffUpdatePayload) =>
        api.patch<Staff>(`/staffs/${id}/`, data),

    delete: (id: string | number) =>
        api.delete(`/staffs/${id}/`),
};

export default staffsService;
