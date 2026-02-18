import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

// Layouts
import AuthLayout from '../components/layout/AuthLayout';
import UserLayout from '../components/layout/UserLayout';
import AdminLayout from '../components/layout/AdminLayout';

// Features
import { Login, Register, ForgotPassword } from '../features/auth/pages';
import { AdminDashboard } from '../admin/dashboard';
import ThemeTest from '../features/ThemeTest';

// Protected Route Wrapper
import ProtectedRoute from './ProtectedRoute';

const AppRoutes: React.FC = () => {
    const { isAuthenticated, userRole } = useAuth();

    return (
        <Routes>
            {/* Primary Entry Point for Color Testing */}
            <Route path="/" element={<ThemeTest />} />
            <Route path="/theme-test" element={<ThemeTest />} />

            {/* Auth Routes */}
            <Route element={<AuthLayout />}>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
            </Route>

            {/* User Routes */}
            <Route element={<ProtectedRoute isAllowed={isAuthenticated} />}>
                <Route element={<UserLayout />}>
                    <Route path="/dashboard" element={<ThemeTest />} />
                    <Route path="/profile" element={<div>Profile Placeholder</div>} />
                </Route>
            </Route>

            {/* Admin Routes */}
            <Route element={<ProtectedRoute isAllowed={isAuthenticated && userRole === 'admin'} redirectTo="/dashboard" />}>
                <Route element={<AdminLayout />}>
                    <Route path="/admin/dashboard" element={<AdminDashboard />} />
                    <Route path="/admin/users" element={<div>Manage Users Placeholder</div>} />
                </Route>
            </Route>

            {/* Redirects */}
            <Route path="*" element={<div>404 - Not Found</div>} />
        </Routes>
    );
};

export default AppRoutes;