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
    const userRole: Role | null = (user?.is_staff || user?.role === 'admin' || !!user) ? 'admin' : null;

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
        <AuthContext.Provider value={{ isAuthenticated, userRole, user, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};
