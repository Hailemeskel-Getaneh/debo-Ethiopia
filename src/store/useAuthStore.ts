// store/useAuthStore.ts
import { AxiosError } from "axios";
import { create } from "zustand";
import apiClient from "../api/ApiClient";
import { exceptionHandler } from "../api/ExceptionHandler";
import { tokenManager } from "../api/TokenManager";
import { authService, type LoginRequest } from "../api/authService";
import { type User } from "../types/user";

const userMeClient = apiClient<User>("/auth/users/me");

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: any) => Promise<void>;
  logout: () => Promise<void>;
  register: <T>(userData: T) => Promise<void>; // Added Register
  fetchMe: () => Promise<void>;
  requestPasswordReset: (email: string) => Promise<void>;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  isAuthenticated: tokenManager.isAuthenticated(),
  isLoading: false,

  fetchMe: async () => {
    // Prevent fetching if not authenticated to save network traffic
    if (!tokenManager.getToken()) return;

    try {
      const userData = await userMeClient.get(); // Calls api.get("/auth/users/me")
      set({ user: userData, isAuthenticated: true });
    } catch (error) {
      exceptionHandler.emit({
        message: (error as AxiosError).message,
        type: "error",
      });
      get().logout();
    }
  },
  register: async <T>(userData: T) => {
    set({ isLoading: true });
    try {
      await authService.register(userData);
      // Optional: Auto-login logic could go here if your backend returns tokens on register
      exceptionHandler.emit({
        message: "Registration successful! Please login.",
        type: "info",
      });
    } finally {
      set({ isLoading: false });
    }
  },
  requestPasswordReset: async (email: string) => {
    set({ isLoading: true });
    try {
      await authService.resetPassword(email);
    } finally {
      set({ isLoading: false });
    }
  },
  login: async (credentials: LoginRequest) => {
    set({ isLoading: true });
    try {
      await authService.login(credentials);
      // Immediately fetch user profile after successful login
      await get().fetchMe();
      set({ isLoading: false });
    } catch (error) {
      set({ isLoading: false, user: null, isAuthenticated: false });
      throw error;
    }
  },

  logout: async () => {
    set({ isLoading: true });
    try {
      await authService.logout();
    } finally {
      set({ user: null, isAuthenticated: false, isLoading: false });
    }
  },
}));
