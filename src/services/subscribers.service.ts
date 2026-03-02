import { api } from './api';
import type { Subscriber, PaginatedResponse } from '../types/admin';

export interface SubscriberListParams {
    page?: number;
    page_size?: number;
    search?: string;
    email?: string;
    subscribed_after?: string;
    subscribed_before?: string;
    ordering?: string;
}

export const subscribersService = {
    list: (params?: SubscriberListParams) =>
        api.get<PaginatedResponse<Subscriber>>('/subscribers/', params as Record<string, unknown>),

    get: (id: number) =>
        api.get<Subscriber>(`/subscribers/${id}/`),

    subscribe: (data: { email: string }) =>
        api.post<{ email: string }>('/subscribers/subscribe/', data),

    delete: (id: number) =>
        api.delete(`/subscribers/${id}/`),
};
