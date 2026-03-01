import { api } from './api';

export interface News {
  id: number;
  title: string;
  content: string;
  summary?: string;
  image?: string;
  is_published: boolean;
  published_date?: string;
  created_at?: string;
  updated_at?: string;
}

export interface NewsImage {
  id: number;
  image: string;
  caption?: string;
}

export interface NewsVideo {
  id: number;
  video_url: string;
  caption?: string;
}

export const newsService = {
  getAll: () => api.get<any>('/api/news/'),
  getById: (id: number) => api.get<any>(`/api/news/${id}/`),
};

export default newsService;
