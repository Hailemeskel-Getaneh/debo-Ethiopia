/* eslint-disable @typescript-eslint/no-explicit-any */
import { api } from './api';

export interface Staff {
  id: number;
  name: string;
  position: string;
  bio?: string;
  image?: string;
  email?: string;
  phone?: string;
  created_at?: string;
}

export const aboutService = {
  getStaffs: () => api.get<any>('/staffs/'),
  getStaff: (id: number) => api.get<any>(`/staffs/${id}/`),
};

export default aboutService;
