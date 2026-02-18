import React, { useState, type ReactNode } from 'react';
import { AuthContext } from './AuthContextCore';
import type { Role } from '../types/auth';

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true); // Logged in by default for testing
    const [userRole, setUserRole] = useState<Role | null>('user');

    const login = (role: Role) => {
        setIsAuthenticated(true);
        setUserRole(role);
    };

    const logout = () => {
        setIsAuthenticated(false);
        setUserRole(null);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, userRole, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

