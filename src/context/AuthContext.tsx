import React, { useState, type ReactNode } from 'react';
import { AuthContext, type Role } from './auth-context-core';

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true); // Placeholder state
    const [userRole, setUserRole] = useState<Role | null>('user'); // Placeholder state

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
