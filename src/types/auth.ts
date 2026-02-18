export type Role = 'user' | 'admin';

export interface AuthContextType {
    isAuthenticated: boolean;
    userRole: Role | null;
    login: (role: Role) => void;
    logout: () => void;
}
