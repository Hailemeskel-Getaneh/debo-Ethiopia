import React from 'react';
import {
  Users,
  Briefcase,
  DollarSign,
  Calendar,
  TrendingUp,
  TrendingDown,
  MoreHorizontal
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

const AdminDashboard: React.FC = () => {
  // Mock Data - In production, fetch this from API
  const stats = [
    {
      title: 'Total Users',
      value: '2,543',
      change: '+12.5%',
      isPositive: true,
      icon: Users,
      color: 'text-blue-500',
      bg: 'bg-blue-50 dark:bg-blue-900/20'
    },
    {
      title: 'Total Donations',
      value: '$45,231',
      change: '+8.2%',
      isPositive: true,
      icon: DollarSign,
      color: 'text-green-500',
      bg: 'bg-green-50 dark:bg-green-900/20'
    },
    {
      title: 'Active Projects',
      value: '12',
      change: '-2.4%',
      isPositive: false,
      icon: Briefcase,
      color: 'text-purple-500',
      bg: 'bg-purple-50 dark:bg-purple-900/20'
    },
    {
      title: 'Upcoming Events',
      value: '4',
      change: '+1',
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
    { name: 'Jun', amount: 2390 },
    { name: 'Jul', amount: 3490 },
  ];

  const projectStatusData = [
    { name: 'Water Well', completed: 80, remaining: 20 },
    { name: 'School Build', completed: 45, remaining: 55 },
    { name: 'Health Camp', completed: 90, remaining: 10 },
    { name: 'Food Drive', completed: 30, remaining: 70 },
  ];

  const recentActivities = [
    { id: 1, user: 'Sarah Johnson', action: 'Donated $500', time: '2 mins ago', icon: DollarSign, color: 'text-green-500', bg: 'bg-green-100 dark:bg-green-900/30' },
    { id: 2, user: 'New User', action: 'Registered', time: '1 hour ago', icon: Users, color: 'text-blue-500', bg: 'bg-blue-100 dark:bg-blue-900/30' },
    { id: 3, user: 'Project Alpha', action: 'Status updated to In Progress', time: '4 hours ago', icon: Briefcase, color: 'text-purple-500', bg: 'bg-purple-100 dark:bg-purple-900/30' },
    { id: 4, user: 'Charity Gala', action: 'Event created', time: '1 day ago', icon: Calendar, color: 'text-orange-500', bg: 'bg-orange-100 dark:bg-orange-900/30' },
  ];

  return (
    <div className="space-y-8">
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
              <p className="text-sm text-zinc-500 dark:text-zinc-400">Monthly donation trends</p>
            </div>
            <button className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg">
              <MoreHorizontal className="w-5 h-5 text-zinc-400" />
            </button>
          </div>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={donationData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--color-primary-500)" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="var(--color-primary-500)" stopOpacity={0} />
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
                  stroke="var(--color-primary-600)"
                  fillOpacity={1}
                  fill="url(#colorAmount)"
                  strokeWidth={3}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Secondary Widget / Recent Activity */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white dark:bg-zinc-900 p-6 rounded-2xl shadow-sm border border-zinc-100 dark:border-zinc-800 flex flex-col"
        >
          <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 mb-4">Recent Activity</h3>
          <div className="flex-1 overflow-y-auto space-y-6 pr-2 custom-scrollbar">
            {recentActivities.map((activity, idx) => (
              <div key={idx} className="flex gap-4 items-start group">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${activity.bg} ${activity.color} group-hover:scale-110 transition-transform`}>
                  <activity.icon className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">{activity.user}</p>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400">{activity.action}</p>
                  <p className="text-xs text-zinc-400 mt-1">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-4 py-2 text-sm font-medium text-[--color-primary-600] dark:text-[--color-primary-400] hover:bg-[--color-primary-50] dark:hover:bg-[--color-primary-900]/20 rounded-xl transition-colors">
            View All Activity
          </button>
        </motion.div>
      </div>

      {/* Bottom Row - Project Progress */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="bg-white dark:bg-zinc-900 p-6 rounded-2xl shadow-sm border border-zinc-100 dark:border-zinc-800"
      >
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">Project Progress</h3>
          <button className="text-sm text-[--color-primary-600] font-medium hover:underline">View Reports</button>
        </div>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={projectStatusData} layout="vertical" margin={{ left: 20 }}>
              <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#e4e4e7" />
              <XAxis type="number" hide />
              <YAxis dataKey="name" type="category" width={100} tick={{ fill: '#52525b', fontSize: 13, fontWeight: 500 }} axisLine={false} tickLine={false} />
              <Tooltip cursor={{ fill: 'transparent' }} contentStyle={{ borderRadius: '8px' }} />
              <Legend />
              <Bar dataKey="completed" name="Completed (%)" fill="var(--color-primary-500)" radius={[0, 4, 4, 0]} barSize={20} />
              <Bar dataKey="remaining" name="Remaining (%)" fill="#e4e4e7" radius={[0, 4, 4, 0]} barSize={20} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminDashboard;
