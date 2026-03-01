import React, { useState, useEffect } from 'react';
import {
  Users,
  Briefcase,
  DollarSign,
  Calendar,
  TrendingUp,
  TrendingDown,
  MoreHorizontal,
  Loader2,
  AlertTriangle
} from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend
} from 'recharts';
import { motion } from 'framer-motion';
import { statsService } from '../../services/stats.service';
import { donationsService } from '../../services/donations.service';
import { eventsService } from '../../services/events.service';
import { usersService } from '../../services/users.service';
import { projectsService } from '../../services/projects.service';
import type { StatMetric, Donation, Event, Project } from '../../types/admin';

const AdminDashboard: React.FC = () => {
  const [metrics, setMetrics] = useState<StatMetric[]>([]);
  const [recentDonations, setRecentDonations] = useState<Donation[]>([]);
  const [recentEvents, setRecentEvents] = useState<Event[]>([]);
  const [activeProjects, setActiveProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [statsRes, donationsRes, eventsRes, usersRes, projectsRes] = await Promise.all([
        statsService.list(),
        donationsService.list({ page_size: 5 }),
        eventsService.list({ page_size: 5 }),
        usersService.list({ page_size: 1 }),
        projectsService.list({ page_size: 4 })
      ]);

      // Map metrics from statsRes and supplement with direct counts
      const fetchedMetrics = statsRes.results || [];

      const injectMetric = (name: string, value: number) => {
        const lower = name.toLowerCase();
        const exists = fetchedMetrics.some(m => m.name.toLowerCase().includes(lower));
        if (!exists) {
          fetchedMetrics.push({
            id: Math.random(),
            name: name,
            value: value,
            updated_at: new Date().toISOString()
          });
        } else {
          // Update existing if value is 0 (fallback)
          const idx = fetchedMetrics.findIndex(m => m.name.toLowerCase().includes(lower));
          if (fetchedMetrics[idx].value === 0) {
            fetchedMetrics[idx].value = value;
          }
        }
      };

      injectMetric('user', usersRes.count || 0);
      injectMetric('project', projectsRes.count || 0);
      injectMetric('event', eventsRes.count || 0);

      // If direct count from donations is available, use it as fallback for count
      // but 'donation' metric in dashboard usually implies money.
      // We'll trust statsService for money, but fallback to 0 if not found.

      setMetrics(fetchedMetrics);
      setRecentDonations(donationsRes.results || []);
      setRecentEvents(eventsRes.results || []);
      setActiveProjects((projectsRes.results || []).slice(0, 4));
      setError(null);
    } catch (err) {
      console.error('Failed to fetch dashboard data', err);
      setError('Failed to load dashboard statistics. Please try refreshing.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const getMetric = (name: string) => {
    if (!Array.isArray(metrics)) return 0;
    return metrics.find(m => m.name.toLowerCase().includes(name.toLowerCase()))?.value || 0;
  };

  const stats = [
    {
      title: 'Total Users',
      value: getMetric('user').toLocaleString(),
      change: '+100%', // Placeholder since we don't have historical data yet
      isPositive: true,
      icon: Users,
      color: 'text-blue-500',
      bg: 'bg-blue-50 dark:bg-blue-900/20'
    },
    {
      title: 'Total Donations',
      value: `$${getMetric('donation').toLocaleString()}`,
      change: '+100%',
      isPositive: true,
      icon: DollarSign,
      color: 'text-green-500',
      bg: 'bg-green-50 dark:bg-green-900/20'
    },
    {
      title: 'Active Projects',
      value: getMetric('project').toString(),
      change: 'Active',
      isPositive: true,
      icon: Briefcase,
      color: 'text-purple-500',
      bg: 'bg-purple-50 dark:bg-purple-900/20'
    },
    {
      title: 'Events',
      value: getMetric('event').toString(),
      change: 'Scheduled',
      isPositive: true,
      icon: Calendar,
      color: 'text-orange-500',
      bg: 'bg-orange-50 dark:bg-orange-900/20'
    },
  ];

  const donationData = [
    { name: 'Jan', amount: 4000 },
    { name: 'Feb', amount: 3000 },
    { name: 'Mar', amount: 5000 },
    { name: 'Apr', amount: 2780 },
    { name: 'May', amount: 1890 },
    { name: 'Jun', amount: getMetric('donation') || 2390 },
    { name: 'Jul', amount: getMetric('donation') * 1.1 || 3490 },
  ];

  const projectStatusData = activeProjects.map(p => ({
    name: p.name,
    completed: p.progress_percent,
    remaining: Math.max(0, 100 - p.progress_percent)
  }));

  const recentActivities = [
    ...recentDonations.map(d => ({
      id: `donation-${d.id}`,
      user: `${d.first_name} ${d.last_name}`,
      action: `Donated ${d.currency} ${d.amount}`,
      time: new Date(d.donated_at).toLocaleDateString(),
      icon: DollarSign,
      color: 'text-green-500',
      bg: 'bg-green-100 dark:bg-green-900/30'
    })),
    ...recentEvents.map(e => ({
      id: `event-${e.id}`,
      user: e.title,
      action: `Starts at ${new Date(e.start_date).toLocaleDateString()}`,
      time: 'New Event',
      icon: Calendar,
      color: 'text-orange-500',
      bg: 'bg-orange-100 dark:bg-orange-900/30'
    }))
  ].sort((a, b) => b.id.localeCompare(a.id)).slice(0, 8);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh]">
        <Loader2 className="w-12 h-12 text-primary-600 animate-spin mb-4" />
        <p className="text-zinc-500 animate-pulse">Loading dashboard metrics...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {error && (
        <div className="p-4 bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-900/20 rounded-xl text-red-600 dark:text-red-400 text-sm flex items-center gap-3">
          <AlertTriangle className="w-5 h-5" />
          {error}
        </div>
      )}

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white dark:bg-zinc-900 p-6 rounded-2xl shadow-sm border border-zinc-100 dark:border-zinc-800 hover:shadow-md transition-shadow"
          >
            <div className="flex justify-between items-start">
              <div className={`p-3 rounded-xl ${stat.bg} ${stat.color}`}>
                <stat.icon className="w-6 h-6" />
              </div>
              <span className={`flex items-center text-sm font-medium ${stat.isPositive ? 'text-green-500' : 'text-red-500'}`}>
                {stat.isPositive ? <TrendingUp className="w-4 h-4 mr-1" /> : <TrendingDown className="w-4 h-4 mr-1" />}
                {stat.change}
              </span>
            </div>
            <div className="mt-4">
              <h3 className="text-sm font-medium text-zinc-500 dark:text-zinc-400">{stat.title}</h3>
              <p className="text-3xl font-bold text-zinc-900 dark:text-zinc-100 mt-1">{stat.value}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Chart */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
          className="lg:col-span-2 bg-white dark:bg-zinc-900 p-6 rounded-2xl shadow-sm border border-zinc-100 dark:border-zinc-800"
        >
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">Donation Overview</h3>
              <p className="text-sm text-zinc-500 dark:text-zinc-400">Monthly donation trends (Projected)</p>
            </div>
            <button className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg">
              <MoreHorizontal className="w-5 h-5 text-zinc-400" />
            </button>
          </div>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%" minWidth={0} debounce={100}>
              <AreaChart data={donationData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#4f46e5" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#71717a' }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#71717a' }} />
                <CartesianGrid vertical={false} stroke="#e4e4e7" strokeDasharray="3 3" />
                <Tooltip
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Area
                  type="monotone"
                  dataKey="amount"
                  stroke="#4f46e5"
                  fillOpacity={1}
                  fill="url(#colorAmount)"
                  strokeWidth={3}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white dark:bg-zinc-900 p-6 rounded-2xl shadow-sm border border-zinc-100 dark:border-zinc-800 flex flex-col"
        >
          <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 mb-4">Recent Activity</h3>
          <div className="flex-1 overflow-y-auto space-y-6 pr-2 custom-scrollbar">
            {recentActivities.length === 0 ? (
              <p className="text-sm text-zinc-500 text-center py-10">No recent activity detected.</p>
            ) : (
              recentActivities.map((activity) => (
                <div key={activity.id} className="flex gap-4 items-start group">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${activity.bg} ${activity.color} group-hover:scale-110 transition-transform`}>
                    <activity.icon className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 truncate">{activity.user}</p>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400 line-clamp-1">{activity.action}</p>
                    <p className="text-xs text-zinc-400 mt-1">{activity.time}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </motion.div>
      </div>

      {/* Bottom Row - Project Progress (Static for now) */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="bg-white dark:bg-zinc-900 p-6 rounded-2xl shadow-sm border border-zinc-100 dark:border-zinc-800"
      >
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">Current Initiatives</h3>
          <button className="text-sm text-primary-600 font-medium hover:underline">Track All Projects</button>
        </div>
        <div className="h-64 w-full text-zinc-900 dark:text-zinc-100">
          {projectStatusData.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%" minWidth={0} debounce={100}>
              <BarChart data={projectStatusData} layout="vertical" margin={{ left: 20 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#e4e4e7" />
                <XAxis type="number" hide />
                <YAxis dataKey="name" type="category" width={100} tick={{ fill: '#71717a', fontSize: 13, fontWeight: 500 }} axisLine={false} tickLine={false} />
                <Tooltip cursor={{ fill: 'transparent' }} contentStyle={{ borderRadius: '8px' }} />
                <Legend />
                <Bar dataKey="completed" name="Completed (%)" fill="#4f46e5" radius={[0, 4, 4, 0]} barSize={20} />
                <Bar dataKey="remaining" name="Remaining (%)" fill="#e2e8f0" radius={[0, 4, 4, 0]} barSize={20} />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex items-center justify-center h-full text-zinc-500 italic">
              No active projects to display.
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default AdminDashboard;
