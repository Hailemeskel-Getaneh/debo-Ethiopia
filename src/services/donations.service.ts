import { api } from './api';
import type { Donation, PaginatedResponse } from '../types/admin';

export interface DonationListParams {
    page?: number;
    page_size?: number;
    search?: string;
    payment_status?: string;
}

export const donationsService = {
    list: (params?: DonationListParams) =>
        api.get<PaginatedResponse<Donation>>('/donations/', params as Record<string, unknown>),

    get: (id: number) =>
        api.get<Donation>(`/donations/${id}/`),
};
