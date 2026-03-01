import { api } from './api';

export interface Gallery {
  id: number;
  title: string;
  description?: string;
  category?: string;
  images?: GalleryImage[];
  videos?: GalleryVideo[];
  created_at?: string;
}

export interface GalleryImage {
  id: number;
  image: string;
  caption?: string;
}

export interface GalleryVideo {
  id: number;
  video_url: string;
  caption?: string;
}

export const galleryService = {
  getAll: () => api.get<any>('/api/gallery/'),
  getById: (id: number) => api.get<any>(`/api/gallery/${id}/`),
};

export default galleryService;
