import React, { useState } from "react";
import { Outlet, useLocation, Link } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  Settings,
  Bell,
  Search,
  Menu,
  X,
  LogOut,
  Briefcase,
  Calendar,
  Image as ImageIcon,
  MessageSquare,
  DollarSign,
  Newspaper,
  Award,
  Layers,
  Mail,
  BarChart3,
  BellRing,
} from "lucide-react";
import { useAuth } from "../../hooks/useAuth";

const AdminLayout: React.FC = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const location = useLocation();
  const { logout } = useAuth();

  const navItems = [
    { name: "Dashboard", icon: LayoutDashboard, path: "/admin/dashboard" },
    { name: "Users", icon: Users, path: "/admin/users" },
    { name: "Programs", icon: Layers, path: "/admin/programs" },
    { name: "Projects", icon: Briefcase, path: "/admin/projects" },
    { name: "Events", icon: Calendar, path: "/admin/events" },
    { name: "Donations", icon: DollarSign, path: "/admin/donations" },
    { name: "Content (News)", icon: Newspaper, path: "/admin/news" },
    { name: "Gallery", icon: ImageIcon, path: "/admin/gallery" },
    { name: "Messages", icon: MessageSquare, path: "/admin/messages" },
    { name: "Achievements", icon: Award, path: "/admin/achievements" },
    { name: "Subscribers", icon: Mail, path: "/admin/subscribers" },
    { name: "Metrics", icon: BarChart3, path: "/admin/metrics" },
    { name: "Notifications", icon: BellRing, path: "/admin/notifications" },
    { name: "Settings", icon: Settings, path: "/admin/settings" },
  ];

  return (
    <div className="flex h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 font-sans antialiased overflow-hidden">
      {/* Sidebar Overlay for Mobile */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-20 lg:hidden backdrop-blur-sm transition-opacity"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-30 w-72 bg-white dark:bg-zinc-900 border-r border-zinc-200 dark:border-zinc-800 transform transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:relative lg:translate-x-0 flex flex-col shadow-xl lg:shadow-none`}
      >
        {/* Logo Area */}
        <div className="h-20 flex items-center px-8 border-b border-zinc-100 dark:border-zinc-800/50">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-900 to-secondary-900 flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-primary-500/20">
              D
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-primary-600 to-secondary-500 bg-clip-text text-transparent">
              DEBO Admin
            </span>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden ml-auto p-2 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-1 scrollbar-thin scrollbar-thumb-zinc-200 dark:scrollbar-thumb-zinc-800">
          <div className="px-4 mb-2 text-xs font-semibold text-zinc-400 uppercase tracking-wider">
            Main Menu
          </div>
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 group ${
                  isActive
                    ? "bg-[--color-primary-50] text-[--color-primary-700] dark:bg-[--color-primary-500]/10 dark:text-[--color-primary-400] shadow-sm ring-1 ring-[--color-primary-500]/10"
                    : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 hover:text-zinc-900 dark:hover:text-zinc-100"
                }`}
              >
                <item.icon
                  className={`w-5 h-5 transition-colors duration-200 ${
                    isActive
                      ? "text-[--color-primary-600] dark:text-[--color-primary-400]"
                      : "text-zinc-400 group-hover:text-zinc-600 dark:group-hover:text-zinc-300"
                  }`}
                />
                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* User Profile Footer */}
        <div className="p-4 border-t border-zinc-100 dark:border-zinc-800/50 bg-zinc-50/50 dark:bg-zinc-900/50 backdrop-blur-sm">
          <div className="flex items-center gap-3 p-3 rounded-xl hover:bg-white dark:hover:bg-zinc-800 border border-transparent hover:border-zinc-200 dark:hover:border-zinc-700 transition-all shadow-sm hover:shadow-md cursor-pointer group">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-zinc-200 to-zinc-100 dark:from-zinc-700 dark:to-zinc-800 flex items-center justify-center text-zinc-500 dark:text-zinc-300 font-bold border-2 border-white dark:border-zinc-700 shadow-sm relative overflow-hidden">
              <span className="text-sm">AD</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-zinc-900 dark:text-zinc-100 truncate group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                Admin User
              </p>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 truncate">
                admin@debo.org
              </p>
            </div>
            <button
              onClick={logout}
              className="p-2 text-zinc-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 rounded-lg transition-colors"
              title="Logout"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 bg-white dark:bg-zinc-950 relative overflow-hidden">
        {/* Top Header */}
        <header className="h-20 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md border-b border-zinc-100 dark:border-zinc-800/50 sticky top-0 z-40 px-8 flex items-center justify-between transition-all">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(!isSidebarOpen)}
              className="lg:hidden p-2 text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-xl"
            >
              <Menu className="w-6 h-6" />
            </button>

            {/* Breadcrumbs or Page Title */}
            <div>
              <h1 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 tracking-tight">
                {navItems.find((item) => item.path === location.pathname)
                  ?.name || "Dashboard"}
              </h1>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 font-medium">
                Overview & Statistics
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Global Search */}
            <div className="relative hidden md:block group">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 group-focus-within:text-primary-500 transition-colors" />
              <input
                type="text"
                placeholder="Search anything..."
                className="w-72 pl-10 pr-4 py-2.5 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all shadow-sm"
              />
            </div>

            <div className="h-8 w-px bg-zinc-200 dark:bg-zinc-800 mx-1 hidden md:block"></div>

            {/* Notifications */}
            <button className="relative p-2.5 text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-xl transition-all hover:text-primary-600 active:scale-95">
              <Bell className="w-5 h-5" />
              <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-zinc-950 shadow-sm animate-pulse"></span>
            </button>
          </div>
        </header>

        {/* Scrollable Content */}
        <main
          id="main-content"
          className="flex-1 overflow-y-auto p-4 sm:p-8 scroll-smooth scrollbar-thin scrollbar-thumb-zinc-300 dark:scrollbar-thumb-zinc-700"
        >
          <div className="max-w-7xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
