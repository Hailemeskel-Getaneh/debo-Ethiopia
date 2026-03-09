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

// ── Request Deduplication ──────────────────────────────────────────────────
const pendingRequests = new Map<string, Promise<unknown>>();

const getDeduplicatedKey = (endpoint: string, params?: Record<string, unknown>) => {
    return `${endpoint}?${JSON.stringify(params || {})}`;
};

// ── Response Interceptor: Handle 401 & Token Refresh ──────────────────────
axiosInstance.interceptors.response.use(
    (response) => {
        // Clean up pending request map on success
        const key = getDeduplicatedKey(response.config.url || '', response.config.params);
        pendingRequests.delete(key);
        return response;
    },
    async (error) => {
        const originalRequest = error.config;
        const key = getDeduplicatedKey(originalRequest.url || '', originalRequest.params);

        // Clean up pending request map on error
        pendingRequests.delete(key);

        // Redirect to login on 401 if it's NOT a retry, NOT a login request, and NOT a refresh request
        const isAuthRequest = originalRequest.url?.includes('/auth/jwt/create') || originalRequest.url?.includes('/auth/jwt/refresh');

        if (error.response?.status === 401 && !originalRequest._retry && !isAuthRequest) {
            originalRequest._retry = true;

            try {
                // Refresh token
                const refresh = localStorage.getItem('refresh_token');
                if (!refresh) throw new Error('No refresh token available');

                // VERY IMPORTANT: Use raw axios here, NOT axiosInstance,
                // otherwise a 401 on the refresh endpoint triggers an infinite loop!
                const res = await axios.post(`${API_BASE_URL}/auth/jwt/refresh/`, { refresh });

                const newAccess = res.data.access;
                if (newAccess) {
                    localStorage.setItem('access_token', newAccess);
                    originalRequest.headers.Authorization = `JWT ${newAccess}`;
                    return axiosInstance(originalRequest);
                }
            } catch (refreshError) {
                console.error('[Auth Error] Token refresh failed, redirecting to login:', refreshError);
                localStorage.removeItem('access_token');
                localStorage.removeItem('refresh_token');
                window.location.href = '/abc/login';
                return Promise.reject(refreshError);
            }
        }

        // Handle 429 Rate Limiting with Deduplication and Jittered Retry
        if (error.response?.status === 429) {
            console.error(`[429 Rate Limit] Blocked: ${originalRequest.url}. Time: ${new Date().toLocaleTimeString()}`);

            const retryCount = (originalRequest._retryCount || 0);
            if (retryCount < 2) { // Allow up to 2 retries
                originalRequest._retryCount = retryCount + 1;

                // Jittered delay: 2000ms to 3000ms
                const delay = 2000 + (Math.random() * 1000);
                console.warn(`[429 Rate Limit] Retry #${originalRequest._retryCount} in ${Math.round(delay)}ms...`);

                await new Promise(resolve => setTimeout(resolve, delay));
                return axiosInstance(originalRequest);
            }
        }

        return Promise.reject(error);
    }
);

// ── API Methods ────────────────────────────────────────────────────────────
export const api = {
    get: async <T>(endpoint: string, params?: Record<string, unknown>): Promise<T> => {
        const key = getDeduplicatedKey(endpoint, params);

        // If a request for this exact endpoint+params is already in flight, return it
        if (pendingRequests.has(key)) {
            console.log(`[Deduplication] Sharing in-flight request for: ${endpoint}`);
            return pendingRequests.get(key) as Promise<T>;
        }

        const fetchPromise = (async () => {
            const response: AxiosResponse<T> = await axiosInstance.get(endpoint, { params });
            return response.data;
        })();

        pendingRequests.set(key, fetchPromise);
        return fetchPromise;
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