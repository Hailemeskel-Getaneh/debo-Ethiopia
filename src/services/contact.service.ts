/* eslint-disable @typescript-eslint/no-explicit-any */
import { api } from './api';

export interface ContactMessage {
  id: number;
  name: string;
  email: string;
  subject?: string;
  message: string;
  is_responded: boolean;
  created_at?: string;
}

export interface ContactSubmitData {
  name: string;
  email: string;
  subject?: string;
  message: string;
}

export const contactService = {
  submit: (data: any) => api.post<any>('/contact-messages/submit/', data),
  getAll: () => api.get<any>('/contact-messages/'),
};

export default contactService;
