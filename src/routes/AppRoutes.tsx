import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

// Layouts
import AuthLayout from "../components/layout/AuthLayout";
import UserLayout from "../components/layout/UserLayout";
import AdminLayout from "../components/layout/AdminLayout";

// Features
import Login from "../features/auth/pages/Login";
import Register from "../features/auth/pages/Register";
import ForgotPassword from "../features/auth/pages/ForgotPassword";
import AdminDashboard from "../admin/dashboard/AdminDashboard";

// Protected Route Wrapper
import ProtectedRoute from "./ProtectedRoute";
import HomePage from "../features/home/HomePage";

const AppRoutes: React.FC = () => {
  const { isAuthenticated, userRole } = useAuth();

  return (
    <Routes>
      {/* 1️⃣ Public Landing */}
      <Route path="/" element={<HomePage />} />
      {/* Auth Routes */}
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
      </Route>

      {/* User Routes */}
      <Route element={<ProtectedRoute isAllowed={isAuthenticated} />}>
        <Route element={<UserLayout />}>
          <Route
            path="/dashboard"
            element={<div>User Dashboard Placeholder</div>}
          />
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
          <Route
            path="/admin/users"
            element={<div>Manage Users Placeholder</div>}
          />
        </Route>
      </Route>

      {/* Redirects */}
      {/* <Route path="/" element={<Navigate to="/dashboard" replace />} /> */}
      <Route path="*" element={<div>404 - Not Found</div>} />
    </Routes>
  );
};

export default AppRoutes;
