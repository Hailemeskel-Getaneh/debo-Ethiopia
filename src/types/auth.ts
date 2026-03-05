export type Role = 'user' | 'admin' | 'superadmin';

export interface AuthTokens {
    access: string;
    refresh: string;
}

export interface AuthUser {
    id: string | number;
    email: string;
    first_name: string;
    last_name: string;
    phone_number?: string;
    image?: string | null;
    image_url?: string | null;
    is_staff: boolean;
    is_superuser?: boolean;
    role?: string;
}

export interface AuthContextType {
    isAuthenticated: boolean;
    userRole: Role | null;
    isSuperAdmin: boolean;
    user: AuthUser | null;
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
    loading: boolean;
}
