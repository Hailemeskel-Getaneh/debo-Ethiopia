import axios, { type AxiosResponse } from 'axios';

const rawBaseUrl = import.meta.env.VITE_API_BASE_URL || 'https://debo-ethiopia-api.onrender.com';
export const API_BASE_URL = rawBaseUrl.endsWith('/api') ? rawBaseUrl : `${rawBaseUrl}/api`;

const axiosInstance = axios.create({
    baseURL: API_BASE_URL,
    timeout: 15000,
    withCredentials: true, // Required for cookie-based refresh tokens
    headers: {
        'Content-Type': 'application/json',
    },
});

// ── Request Interceptor: Attach JWT token ──────────────────────────────────
axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('access_token');
        // Do not attach token for login or refresh requests to avoid conflicts
        const isAuthRequest = config.url?.includes('/auth/jwt/');
        if (token && !isAuthRequest) {
            config.headers.Authorization = `JWT ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// ── Response Interceptor: Handle 401 & Token Refresh ──────────────────────
axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        // Redirect to login on 401 if it's NOT a retry and NOT a login request
        if (error.response?.status === 401 && !originalRequest._retry && !originalRequest.url?.includes('/auth/jwt/create')) {
            originalRequest._retry = true;

            try {
                // Refresh token – explicitly send the token from localStorage
                const refresh = localStorage.getItem('refresh_token');
                const res = await axiosInstance.post('/auth/jwt/refresh', { refresh });

                const newAccess = res.data.access;
                if (newAccess) {
                    localStorage.setItem('access_token', newAccess);
                    originalRequest.headers.Authorization = `JWT ${newAccess}`;
                    return axiosInstance(originalRequest);
                }
            } catch (refreshError) {
                // Refresh failed – clear access token and redirect
                localStorage.removeItem('access_token');
                window.location.href = '/abc/login';
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);

// ── API Methods ────────────────────────────────────────────────────────────
export const api = {
    get: async <T>(endpoint: string, params?: Record<string, unknown>): Promise<T> => {
        const response: AxiosResponse<T> = await axiosInstance.get(endpoint, { params });
        return response.data;
    },

    post: async <T>(endpoint: string, data?: unknown): Promise<T> => {
        const response: AxiosResponse<T> = await axiosInstance.post(endpoint, data);
        return response.data;
    },

    put: async <T>(endpoint: string, data?: unknown): Promise<T> => {
        const response: AxiosResponse<T> = await axiosInstance.put(endpoint, data);
        return response.data;
    },
    patch: async <T>(endpoint: string, data?: unknown): Promise<T> => {
        const response: AxiosResponse<T> = await axiosInstance.patch(endpoint, data);
        return response.data;
    },

    delete: async (endpoint: string): Promise<void> => {
        await axiosInstance.delete(endpoint);
    },

    postMultipart: async <T>(endpoint: string, data: FormData): Promise<T> => {
        const response: AxiosResponse<T> = await axiosInstance.post(endpoint, data, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });
        return response.data;
    },

    patchMultipart: async <T>(endpoint: string, data: FormData): Promise<T> => {
        const response: AxiosResponse<T> = await axiosInstance.patch(endpoint, data, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });
        return response.data;
    },
};

export default axiosInstance;