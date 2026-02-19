import axios from 'axios';

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

const axiosInstance = axios.create({
    baseURL: API_BASE_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    }
});

// Add a request interceptor to include auth tokens if needed
axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export const api = {
    get: async <T>(endpoint: string): Promise<T> => {
        const response = await axiosInstance.get<T>(endpoint);
        return response.data;
    },
    post: async <T>(endpoint: string, data?: unknown): Promise<T> => {
        const response = await axiosInstance.post<T>(endpoint, data);
        return response.data;
    },
    put: async <T>(endpoint: string, data?: unknown): Promise<T> => {
        const response = await axiosInstance.put<T>(endpoint, data);
        return response.data;
    },
    delete: async (endpoint: string): Promise<void> => {
        await axiosInstance.delete(endpoint);
    }
};

export default axiosInstance;