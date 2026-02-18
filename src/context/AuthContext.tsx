import React, { createContext, useState, type ReactNode } from 'react';

type Role = 'user' | 'admin';

interface AuthContextType {
    isAuthenticated: boolean;
    userRole: Role | null;
    login: (role: Role) => void;
    logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

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
