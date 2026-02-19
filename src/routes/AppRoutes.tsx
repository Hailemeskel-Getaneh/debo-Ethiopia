import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

// Layouts
import AuthLayout from "../components/layout/AuthLayout";
import UserLayout from "../components/layout/UserLayout";
import AdminLayout from "../components/layout/AdminLayout";

// Features
import { Login, Register, ForgotPassword } from '../features/auth/pages';
import { AdminDashboard } from '../admin/dashboard';
import ManageUsers from '../admin/ManageUsers';
import ManageProjects from '../admin/ManageProjects';
import ManageEvents from '../admin/ManageEvents';
import ManageDonations from '../admin/ManageDonations';
import ManageNews from '../admin/ManageNews';
import ManageGallery from '../admin/ManageGallery';
import ManageMessages from '../admin/ManageMessages';
import ManageAchievements from '../admin/ManageAchievements';
import AdminSettings from '../admin/AdminSettings';
// import ThemeTest from '../features/ThemeTest';

// Protected Route Wrapper
import ProtectedRoute from './ProtectedRoute';

const AppRoutes: React.FC = () => {
    const { isAuthenticated, userRole } = useAuth();

    return (
        <Routes>
            {/* Root redirects to admin dashboard */}
            <Route path="/" element={<Navigate to="/admin/dashboard" replace />} />
            <Route path="/theme-test" element={<Navigate to="/admin/dashboard" replace />} />

            {/* Auth Routes */}
            <Route element={<AuthLayout />}>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
            </Route>

            {/* User Routes */}
            <Route element={<ProtectedRoute isAllowed={isAuthenticated} />}>
                <Route element={<UserLayout />}>
                    <Route path="/dashboard" element={<AdminDashboard />} />
                    <Route path="/profile" element={<div>Profile Placeholder</div>} />
                </Route>
            </Route>

            {/* Admin Routes */}
            <Route
                element={
                    <ProtectedRoute
                        isAllowed={isAuthenticated && userRole === "admin"}
                        redirectTo="/dashboard"
                    />
                }
            >
                <Route element={<AdminLayout />}>
                    <Route path="/admin/dashboard" element={<AdminDashboard />} />
                    <Route path="/admin/users" element={<ManageUsers />} />
                    <Route path="/admin/projects" element={<ManageProjects />} />
                    <Route path="/admin/events" element={<ManageEvents />} />
                    <Route path="/admin/donations" element={<ManageDonations />} />
                    <Route path="/admin/news" element={<ManageNews />} />
                    <Route path="/admin/gallery" element={<ManageGallery />} />
                    <Route path="/admin/messages" element={<ManageMessages />} />
                    <Route path="/admin/achievements" element={<ManageAchievements />} />
                    <Route path="/admin/settings" element={<AdminSettings />} />
                </Route>
            </Route>

            {/* Redirects */}
            <Route path="*" element={<div>404 - Not Found</div>} />
        </Routes>
    );
};

export default AppRoutes;
