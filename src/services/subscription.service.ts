/* eslint-disable @typescript-eslint/no-explicit-any */
import { api } from './api';

export interface SubscribeData {
  email: string;
}

export interface Subscriber {
  id: number;
  email: string;
  subscribed_at: string;
}

export const subscriptionService = {
  subscribe: (data: any) => api.post<any>('/subscribers/subscribe/', data),
  getAll: () => api.get<any>('/subscribers/'),
};

export default subscriptionService;
