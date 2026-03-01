import { api } from './api';
import type { Subscriber, PaginatedResponse } from '../types/admin';

export interface SubscriberListParams {
    page?: number;
    page_size?: number;
    search?: string;
}

export const subscribersService = {
    list: (params?: SubscriberListParams) =>
        api.get<PaginatedResponse<Subscriber>>('/subscribers/', params as Record<string, unknown>),

    delete: (id: number) =>
        api.delete(`/subscribers/${id}/`),
};
