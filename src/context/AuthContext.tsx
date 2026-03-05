import React, { useState, useEffect, type ReactNode } from 'react';
import { AuthContext } from './AuthContextCore';
import { authService } from '../services/auth.service';
import type { AuthUser, Role } from '../types/auth';
import { Loader2 } from 'lucide-react';

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<AuthUser | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [isInitialized, setIsInitialized] = useState<boolean>(false);

    const isAuthenticated = !!user;

    // Backend role names (uppercase strings from /api/user-roles/)
    // Support either string name or ID-based role in AuthUser
    const roleUpper = String(user?.role || '').toUpperCase();
    const isSuperAdmin = !!(user?.is_superuser || roleUpper === 'SUPER_ADMIN');

    // EXECUTIVE_DIRECTOR is the admin-equivalent role (formerly "admin")
    // Note: Removed !!user to prevent regular users from accessing admin routes by default.
    const isAdminLike = isSuperAdmin || user?.is_staff || ['EXECUTIVE_DIRECTOR', 'ADMIN', 'PROGRAM_COORDINATOR'].includes(roleUpper);
    const userRole: Role | null = isSuperAdmin ? 'superadmin' : isAdminLike ? 'admin' : null;

    // On mount, try to restore session from stored token
    useEffect(() => {
        const restoreSession = async () => {
            if (authService.isLoggedIn()) {
                try {
                    const me = await authService.getMe();
                    setUser(me);
                } catch {
                    authService.logout();
                }
            }
            setIsInitialized(true);
        };
        restoreSession();
    }, []);

    const login = async (email: string, password: string): Promise<void> => {
        setLoading(true);
        try {
            const me = await authService.login(email, password);
            setUser(me);
        } finally {
            setLoading(false);
        }
    };

    const logout = () => {
        authService.logout();
        setUser(null);
    };

    if (!isInitialized) {
        return (
            <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 flex items-center justify-center font-sans">
                <div className="flex flex-col items-center gap-4">
                    <Loader2 className="w-10 h-10 text-primary-600 animate-spin" />
                    <p className="text-zinc-500 font-bold uppercase tracking-widest text-[10px]">Restoring Session...</p>
                </div>
            </div>
        );
    }

    return (
        <AuthContext.Provider value={{ isAuthenticated, userRole, isSuperAdmin, user, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};
