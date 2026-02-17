import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

interface ProtectedRouteProps {
    isAllowed: boolean;
    redirectTo?: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
    isAllowed,
    redirectTo = "/login"
}) => {
    if (!isAllowed) {
        return <Navigate replace to={redirectTo} />;
    }

    return <Outlet />;
};

export default ProtectedRoute;