import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

// Layouts
import AuthLayout from "../components/layout/AuthLayout";
import AdminLayout from "../components/layout/AdminLayout";

// Features
import { Login, ForgotPassword } from "../features/auth/pages";
import { AdminDashboard } from "../admin/dashboard";
import ManageUsers from "../admin/ManageUsers";
import ManageProjects from "../admin/ManageProjects";
import ManageEvents from "../admin/ManageEvents";
import ManageDonations from "../admin/ManageDonations";
import ManageNews from "../admin/ManageNews";
import ManageGallery from "../admin/ManageGallery";
import ManageMessages from "../admin/ManageMessages";
import ManageAchievements from "../admin/ManageAchievements";
import AdminSettings from "../admin/AdminSettings";
import ProtectedRoute from "./ProtectedRoute";
import HomePage from "../features/home/HomePage";
import { About } from "../features/about/About";
import { BoardLeadership } from "../features/about/BoardLeadership";
import { ProgramsRouter } from "../features/programs/ProgramsRouter";
import { ProjectsRouter } from "../features/projects/ProjectsRouter";
import { EventsRouter } from "../features/events/EventsRouter";
import { Gallery } from "../features/gallery/Gallery";
import { Newsletter } from "../features/newsletter/Newsletter";
import { Donate } from "../features/donate/Donate";
import { Contact } from "../features/contact/Contact";
import Achievements from "../features/achievements/Achievements";
import ManagePrograms from "../admin/ManagePrograms";
import NotificationHub from "../admin/NotificationHub";
import ManageSubscribers from "../admin/ManageSubscribers";
import ManageMetrics from "../admin/ManageMetrics";

const AppRoutes: React.FC = () => {
  const { isAuthenticated, userRole } = useAuth();

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/about" element={<About />} />
      <Route path="/boardleadership" element={<BoardLeadership />} />
      <Route path="/programs" element={<ProgramsRouter />} />
      <Route path="/projects" element={<ProjectsRouter />} />
      <Route path="/events" element={<EventsRouter />} />
      <Route path="/gallery" element={<Gallery />} />
      <Route path="/newsletter" element={<Newsletter />} />
      <Route path="/donate" element={<Donate />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/achievements" element={<Achievements />} />

      {/* Auth Routes */}
      <Route element={<AuthLayout />}>
        <Route path="/abc/login" element={<Login />} />
        <Route path="/login" element={<Navigate to="/abc/login" replace />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
      </Route>

      {/* Admin Specific Routes */}
      <Route
        element={
          <ProtectedRoute
            isAllowed={isAuthenticated && userRole === "admin"}
            redirectTo="/abc/login"
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
          <Route path="/admin/programs" element={<ManagePrograms />} />
          <Route path="/admin/subscribers" element={<ManageSubscribers />} />
          <Route path="/admin/metrics" element={<ManageMetrics />} />
          <Route path="/admin/notifications" element={<NotificationHub />} />
          <Route path="/admin/settings" element={<AdminSettings />} />

          {/* Legacy Redirect for /dashboard */}
          <Route path="/dashboard" element={<Navigate to="/admin/dashboard" replace />} />
        </Route>
      </Route>

      {/* Redirects */}
      <Route path="*" element={<div>404 - Not Found</div>} />
    </Routes>
  );
};

export default AppRoutes;
