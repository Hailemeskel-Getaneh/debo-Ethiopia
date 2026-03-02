import { api } from './api';
import type { NotificationLog, PaginatedResponse, BroadcastPayload } from '../types/admin';

export interface NotificationListParams {
    page?: number;
    page_size?: number;
    search?: string;
}

export const notificationsService = {
    list: (params?: NotificationListParams) =>
        api.get<PaginatedResponse<NotificationLog>>('/notifications/', params as Record<string, unknown>),

    broadcast: (payload: BroadcastPayload) =>
        api.post<NotificationLog>('/notifications/broadcast/', payload),

    getStats: () =>
        api.get<{
            total_subscribers: number;
            sent_this_month: number;
            avg_open_rate: string;
        }>('/notifications/stats/'),
};
