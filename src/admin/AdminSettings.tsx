import React, { useState } from 'react';
import {
    User,
    Bell,
    Lock,
    Shield,
    Save
} from 'lucide-react';
import { motion } from 'framer-motion';

const AdminSettings: React.FC = () => {
    const [activeTab, setActiveTab] = useState('Profile');

    const tabs = [
        { id: 'Profile', icon: User, label: 'Profile Settings' },
        { id: 'Notifications', icon: Bell, label: 'Notifications' },
        { id: 'Security', icon: Lock, label: 'Password & Security' },
        { id: 'System', icon: Shield, label: 'System Preferences' },
    ];

    return (
        <div className="flex flex-col md:flex-row gap-8">
            {/* Settings Sidebar */}
            <div className="w-full md:w-64 shrink-0 space-y-2">
                <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 mb-6 px-2">Settings</h2>
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${activeTab === tab.id
                            ? 'bg-[--color-primary-50] text-[--color-primary-700] dark:bg-[--color-primary-900]/20 dark:text-[--color-primary-400]'
                            : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800'
                            }`}
                    >
                        <tab.icon className="w-5 h-5" />
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Content Area */}
            <div className="flex-1 bg-white dark:bg-zinc-900 rounded-2xl shadow-sm border border-zinc-200 dark:border-zinc-800 p-8 min-h-[500px]">
                {activeTab === 'Profile' && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-6"
                    >
                        <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 border-b border-zinc-100 dark:border-zinc-800 pb-4">Public Profile</h3>

                        <div className="flex items-center gap-6">
                            <div className="w-24 h-24 rounded-full bg-zinc-200 dark:bg-zinc-800 flex items-center justify-center text-zinc-400 text-3xl font-bold relative group cursor-pointer overflow-hidden">
                                AD
                                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                    <span className="text-xs text-white font-medium">Change</span>
                                </div>
                            </div>
                            <div>
                                <h4 className="font-bold text-zinc-900 dark:text-zinc-100">Admin User</h4>
                                <p className="text-sm text-zinc-500 dark:text-zinc-400">Super Administrator</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label htmlFor="firstName" className="text-sm font-medium text-zinc-700 dark:text-zinc-300">First Name</label>
                                <input id="firstName" type="text" defaultValue="Admin" className="w-full px-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-[--color-primary-500]/20" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Last Name</label>
                                <input type="text" defaultValue="User" className="w-full px-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-[--color-primary-500]/20" />
                            </div>
                            <div className="space-y-2 md:col-span-2">
                                <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Email Address</label>
                                <input type="email" defaultValue="admin@debo.org" className="w-full px-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-[--color-primary-500]/20" />
                            </div>
                            <div className="space-y-2 md:col-span-2">
                                <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Bio</label>
                                <textarea className="w-full px-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-[--color-primary-500]/20 min-h-[100px]" defaultValue="Managing the DEBO platform operations." />
                            </div>
                        </div>

                        <div className="pt-4 flex justify-end">
                            <button className="flex items-center gap-2 bg-[--color-primary-600] text-white px-6 py-2.5 rounded-xl font-medium hover:bg-[--color-primary-700] transition-colors shadow-lg shadow-[--color-primary-500]/20">
                                <Save className="w-4 h-4" /> Save Changes
                            </button>
                        </div>
                    </motion.div>
                )}

                {activeTab === 'Security' && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-6"
                    >
                        <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 border-b border-zinc-100 dark:border-zinc-800 pb-4">Security Settings</h3>

                        <div className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Current Password</label>
                                <input type="password" className="w-full max-w-md px-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-[--color-primary-500]/20" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">New Password</label>
                                <input type="password" className="w-full max-w-md px-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-[--color-primary-500]/20" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Confirm New Password</label>
                                <input type="password" className="w-full max-w-md px-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-[--color-primary-500]/20" />
                            </div>
                        </div>

                        <div className="pt-6 border-t border-zinc-100 dark:border-zinc-800">
                            <h4 className="font-medium text-zinc-900 dark:text-zinc-100 mb-4">Two-Factor Authentication</h4>
                            <div className="flex items-center justify-between p-4 border border-zinc-200 dark:border-zinc-700 rounded-xl bg-zinc-50/50 dark:bg-zinc-800/30">
                                <div>
                                    <p className="font-medium text-sm text-zinc-900 dark:text-zinc-100">Secure your account</p>
                                    <p className="text-xs text-zinc-500 dark:text-zinc-400">Add an extra layer of security.</p>
                                </div>
                                <button className="text-sm font-medium text-[--color-primary-600]">Enable</button>
                            </div>
                        </div>
                    </motion.div>
                )}

                {(activeTab === 'Notifications' || activeTab === 'System') && (
                    <div className="flex flex-col items-center justify-center h-64 text-zinc-400">
                        <p>This section is under development.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminSettings;
