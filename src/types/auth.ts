export type Role = 'user' | 'admin';

export interface AuthTokens {
    access: string;
    refresh: string;
}

export interface AuthUser {
    id: number;
    email: string;
    first_name: string;
    last_name: string;
    phone_number?: string;
    image?: string | null;
    is_staff: boolean;
    role?: string;
}

export interface AuthContextType {
    isAuthenticated: boolean;
    userRole: Role | null;
    user: AuthUser | null;
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
    loading: boolean;
}
