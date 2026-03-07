// api.ts
import axios, {
  type AxiosInstance,
  type InternalAxiosRequestConfig,
} from "axios";
import { tokenManager } from "./TokenManager";
import { requestManager } from "./RequestManager";
import { exceptionHandler } from "./ExceptionHandler";

interface ExtendedAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

const BASE_URL = "https://debo-ethiopia-api.onrender.com/api";

const api: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

export const baseApi = axios.create({
  baseURL: BASE_URL,
});

// Intercept the request(the ingoing gatekeeper)

api.interceptors.request.use((config) => {
  if (!requestManager.canRequest()) {
    const errorMsg = "System is cooling down due to high traffic. Please wait.";
    exceptionHandler.emit({ message: errorMsg, type: "warning" });
    throw new axios.Cancel(errorMsg);
  }

  const token = tokenManager.getToken();
  if (token) config.headers.Authorization = `JWT ${token}`;

  return config;
});

// Intercept the response (the outgoing gatekeeper)
api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error.config as ExtendedAxiosRequestConfig;

    // Concurrent Token Refresh (Proxy Pattern)
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const newToken = await requestManager.handleRefresh(async () => {
          const { data } = await baseApi.post(
            "/auth/jwt/refresh/",
            {},
            { withCredentials: true },
          );
          tokenManager.setToken(data.access);
          return data.access;
        });

        originalRequest.headers.Authorization = `JWT ${newToken}`;
        return api(originalRequest);
      } catch (err) {
        tokenManager.clearToken();
        exceptionHandler.emit({
          message: "Session expired. Please login again.",
          type: "error",
        });
        globalThis.location.href = "/login";
        throw err;
      }
    }

    // Global Error Mapping (Global Exception Handler)
    const status = error.response?.status;

    if (status === 429) {
      requestManager.tripBreaker();
      exceptionHandler.emit({
        message: "Too many requests. Breaker tripped.",
        type: "warning",
        status,
      });
    } else if (status >= 500) {
      exceptionHandler.emit({
        message: "Server encountered an error. Retrying later.",
        type: "error",
        status,
      });
    } else if (status === 403) {
      exceptionHandler.emit({
        message: "Access Denied: You don't have permission.",
        type: "error",
        status,
      });
    } else if (error.code === "ECONNABORTED") {
      exceptionHandler.emit({ message: "Request timed out.", type: "warning" });
    }

    throw error;
  },
);

export default api;
