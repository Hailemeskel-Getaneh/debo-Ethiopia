import api, { baseApi } from "./api";
import { tokenManager } from "./TokenManager";
import { exceptionHandler } from "./ExceptionHandler";

export interface LoginRequest {
  email: string;
  password?: string;
}

export const authService = {
  login: async (credentials: LoginRequest) => {
    const response = await baseApi.post("/auth/jwt/create/", credentials);
    tokenManager.setToken(response.data.access);
    return response.data;
  },

  // Logout: Clear local state and optionally notify server
  logout: async () => {
    tokenManager.clearToken();
    // must be the intercepted api request to clear session from the cookie
    await api.post("/auth/logout/", {});
    globalThis.location.href = "/login";
  },

  // Registration: Public endpoint, uses authApi
  register: async <T>(userData: T) => {
    try {
      const response = await baseApi.post("/auth/users/", userData);
      return response.data;
    } catch (error: any) {
      exceptionHandler.emit({
        message: error.response?.data?.detail || "Registration failed",
        type: "error",
      });
      throw error;
    }
  },

  resetPassword: async (email: string) => {
    try {
      const response = await baseApi.post("/auth/users/reset_password/", {
        email: email,
      });
      return response.data;
    } catch (error: any) {
      exceptionHandler.emit({
        message:
          error.response?.data?.detail ||
          "Unable to send password reset link!!",
        type: "error",
      });
      throw error;
    }
  },
};
