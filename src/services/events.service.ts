import { api } from './api';
import type { Event, PaginatedResponse } from '../types/admin';

export interface EventListParams {
    page?: number;
    page_size?: number;
    search?: string;
}

export interface EventPayload {
    title: string;
    description: string;
    location: string;
    start_date: string;
    end_date: string;
    program_id?: string | number | null;
}

export const eventsService = {
    list: (params?: EventListParams) =>
        api.get<PaginatedResponse<Event>>('/events/', params as Record<string, unknown>),

    get: (id: string | number) =>
        api.get<Event>(`/events/${id}/`),

    create: (data: EventPayload) =>
        api.post<Event>('/events/', data),

    update: (id: string | number, data: Partial<EventPayload>) =>
        api.patch<Event>(`/events/${id}/`, data),

    delete: (id: string | number) =>
        api.delete(`/events/${id}/`),

    addImage: (eventId: string | number, image: File) => {
        const formData = new FormData();
        formData.append('image', image);
        return api.postMultipart<unknown>(`/events/${eventId}/images/`, formData);
    },

    // Aliases for compatibility with user-api-integration
    getAll: () => api.get<PaginatedResponse<Event>>('/events/'),
    getById: (id: string | number) => api.get<Event>(`/events/${id}/`),
};

export default eventsService;

