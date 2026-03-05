import { api } from './api';
import type { ContactMessage, PaginatedResponse } from '../types/admin';

export interface MessageListParams {
    page?: number;
    page_size?: number;
    search?: string;
    is_responded?: boolean;
}

export const messagesService = {
    list: (params?: MessageListParams) =>
        api.get<PaginatedResponse<ContactMessage>>('/contact-messages/', params as Record<string, unknown>),

    get: (id: string | number) =>
        api.get<ContactMessage>(`/contact-messages/${id}/`),

    respond: (id: string | number, response: string) =>
        api.patch<ContactMessage>(`/contact-messages/${id}/respond/`, { response }),

    delete: (id: string | number) =>
        api.delete(`/contact-messages/${id}/`),
};
