// components/auth/AuthGuard.tsx
import { useEffect } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { tokenManager } from "../api/TokenManager";

export const AuthGuard = ({ children }: { children: React.ReactNode }) => {
  const { fetchMe, isAuthenticated, user, isLoading } = useAuthStore();

  useEffect(() => {
    if (tokenManager.getToken() && !user) {
      fetchMe();
    }
  }, [fetchMe, user]);

  // Optional: Show a full-screen loader while the "Me" request is in flight
  if (isLoading && !user && tokenManager.getToken()) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center gap-4">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-blue-600 border-t-transparent" />
          <p className="text-sm font-medium text-gray-500">
            Securing session...
          </p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};
