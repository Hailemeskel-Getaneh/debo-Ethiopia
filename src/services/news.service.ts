import { api } from './api';
import type { NewsArticle, PaginatedResponse } from '../types/admin';

export interface NewsListParams {
    page?: number;
    page_size?: number;
    search?: string;
    is_published?: boolean;
}

export interface NewsPayload {
    title: string;
    content: string;
}

export interface PublishPayload {
    notify_subscribers?: boolean;
}

export const newsService = {
    list: (params?: NewsListParams) =>
        api.get<PaginatedResponse<NewsArticle>>('/news/', params as Record<string, unknown>),

    get: (id: number) =>
        api.get<NewsArticle>(`/news/${id}/`),

    create: (data: NewsPayload) =>
        api.post<NewsArticle>('/news/', data),

    update: (id: number, data: Partial<NewsPayload>) =>
        api.patch<NewsArticle>(`/news/${id}/`, data),

    delete: (id: number) =>
        api.delete(`/news/${id}/`),

    publish: (id: number, payload?: PublishPayload) =>
        api.patch<NewsArticle>(`/news/${id}/publish/`, payload ?? {}),

    unpublish: (id: number) =>
        api.patch<NewsArticle>(`/news/${id}/unpublish/`, {}),

    addImage: (newsId: number, image: File) => {
        const formData = new FormData();
        formData.append('image', image);
        return api.postMultipart<unknown>(`/news/${newsId}/images/`, formData);
    }
};
