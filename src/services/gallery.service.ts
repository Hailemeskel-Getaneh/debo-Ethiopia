import { api } from './api';
import type { GalleryItem, PaginatedResponse } from '../types/admin';

export interface GalleryListParams {
  page?: number;
  page_size?: number;
  search?: string;
}

export interface GalleryPayload {
  title: string;
  description?: string | null;
}

export const galleryService = {
  list: (params?: GalleryListParams) =>
    api.get<PaginatedResponse<GalleryItem>>('/gallery/', params as Record<string, unknown>),

  get: (id: number) =>
    api.get<GalleryItem>(`/gallery/${id}/`),

  create: (data: GalleryPayload) =>
    api.post<GalleryItem>('/gallery/', data),

  update: (id: number, data: Partial<GalleryPayload>) =>
    api.patch<GalleryItem>(`/gallery/${id}/`, data),

  delete: (id: number) =>
    api.delete(`/gallery/${id}/`),

  // Aliases for user-api-integration
  getAll: () => api.get<PaginatedResponse<GalleryItem>>('/gallery/'),
  getById: (id: number) => api.get<GalleryItem>(`/gallery/${id}/`),
};

export default galleryService;

