import { api } from './api';
import type { AuthTokens, AuthUser } from '../types/auth';

export const authService = {
    /**
     * Login with email and password.
     * Stores access and refresh tokens in localStorage.
     */
    login: async (email: string, password: string): Promise<AuthUser> => {
        const tokens = await api.post<AuthTokens>('/auth/jwt/create', { email, password });
        localStorage.setItem('access_token', tokens.access);
        localStorage.setItem('refresh_token', tokens.refresh);
        return authService.getMe();
    },

    /**
     * Register a new user account.
     */
    register: async (data: {
        first_name: string;
        last_name: string;
        email: string;
        phone_number?: string;
        password: string;
        re_password: string;
    }): Promise<AuthUser> => {
        return api.post<AuthUser>('/auth/users/', data);
    },

    /**
     * Refresh the access token using the stored refresh token.
     */
    refreshToken: async (): Promise<string> => {
        const refresh = localStorage.getItem('refresh_token');
        if (!refresh) throw new Error('No refresh token stored');
        const res = await api.post<{ access: string }>('/auth/jwt/refresh', { refresh });
        localStorage.setItem('access_token', res.access);
        return res.access;
    },

    /**
     * Fetch the currently authenticated user's profile.
     */
    getMe: async (): Promise<AuthUser> => {
        return api.get<AuthUser>('/auth/users/me/');
    },

    /**
     * Update the current user's profile info.
     */
    updateMe: async (data: Partial<AuthUser>): Promise<AuthUser> => {
        return api.patch<AuthUser>('/auth/users/me/', data);
    },

    /**
     * Upload a new avatar image for the current user.
     */
    updateAvatar: async (file: File): Promise<AuthUser> => {
        const formData = new FormData();
        formData.append('avatar', file);
        return api.patchMultipart<AuthUser>('/auth/users/avatar/', formData);
    },

    /**
     * Change the current user's password.
     */
    setPassword: async (data: {
        current_password: string;
        new_password: string;
        re_new_password: string;
    }): Promise<void> => {
        await api.post('/auth/users/set_password/', data);
    },

    /**
     * Initiate a password reset email.
     */
    resetPassword: async (email: string): Promise<void> => {
        await api.post('/auth/users/reset_password/', { email });
    },

    /**
     * Clear all stored tokens (logout).
     */
    logout: (): void => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
    },

    /**
     * Check if a valid access token exists in localStorage.
     */
    isLoggedIn: (): boolean => {
        return !!localStorage.getItem('access_token');
    },
};