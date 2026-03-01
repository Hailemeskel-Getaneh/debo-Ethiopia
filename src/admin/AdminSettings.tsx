import React, { useState, useContext, useEffect } from 'react';
import {
    User,
    Bell,
    Lock,
    Shield,
    Save,
    Loader2,
    CheckCircle2,
    AlertCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { AuthContext } from '../context/AuthContextCore';
import { authService } from '../services/auth.service';

const AdminSettings: React.FC = () => {
    const auth = useContext(AuthContext);
    const [activeTab, setActiveTab] = useState('Profile');
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    const tabs = [
        { id: 'Profile', icon: User, label: 'Profile Settings' },
        { id: 'Notifications', icon: Bell, label: 'Notifications' },
        { id: 'Security', icon: Lock, label: 'Password & Security' },
        { id: 'System', icon: Shield, label: 'System Preferences' },
    ];

    useEffect(() => {
        if (success || error) {
            const timer = setTimeout(() => {
                setSuccess(null);
                setError(null);
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [success, error]);

    const handleProfileUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccess(null);

        const formData = new FormData(e.currentTarget);
        const payload = {
            first_name: formData.get('firstName') as string,
            last_name: formData.get('lastName') as string,
            // Bio might not be in our core AuthUser type but we can send it or handle it separately if the API supports it
        };

        try {
            await authService.updateMe(payload);
            setSuccess('Profile updated successfully!');
        } catch (err) {
            setError('Failed to update profile. Please try again.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handlePasswordChange = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const current = formData.get('currentPassword') as string;
        const newPass = formData.get('newPassword') as string;
        const confirmPass = formData.get('confirmPassword') as string;

        if (newPass !== confirmPass) {
            setError('New passwords do not match.');
            return;
        }

        setLoading(true);
        setError(null);
        setSuccess(null);

        try {
            await authService.setPassword({
                current_password: current,
                new_password: newPass,
                re_new_password: confirmPass
            });
            setSuccess('Password changed successfully!');
            (e.target as HTMLFormElement).reset();
        } catch (err) {
            setError('Failed to change password. Verify your current password.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

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
                            ? 'bg-primary-50 text-primary-700 dark:bg-primary-900/20 dark:text-primary-400'
                            : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800'
                            }`}
                    >
                        <tab.icon className="w-5 h-5" />
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Content Area */}
            <div className="flex-1 bg-white dark:bg-zinc-900 rounded-2xl shadow-sm border border-zinc-200 dark:border-zinc-800 p-8 min-h-[500px] relative">
                {/* Feedback Messages */}
                <AnimatePresence>
                    {success && (
                        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                            className="absolute top-4 right-8 left-8 p-3 bg-green-50 text-green-700 border border-green-200 rounded-xl flex items-center gap-2 text-sm z-10">
                            <CheckCircle2 className="w-4 h-4" /> {success}
                        </motion.div>
                    )}
                    {error && (
                        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                            className="absolute top-4 right-8 left-8 p-3 bg-red-50 text-red-700 border border-red-200 rounded-xl flex items-center gap-2 text-sm z-10">
                            <AlertCircle className="w-4 h-4" /> {error}
                        </motion.div>
                    )}
                </AnimatePresence>

                {activeTab === 'Profile' && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-6"
                    >
                        <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 border-b border-zinc-100 dark:border-zinc-800 pb-4">Public Profile</h3>

                        <div className="flex items-center gap-6">
                            <div className="w-24 h-24 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center text-primary-600 text-3xl font-bold relative group cursor-pointer overflow-hidden border-2 border-primary-50">
                                {auth?.user?.image ? (
                                    <img src={auth.user.image} alt="Avatar" className="w-full h-full object-cover" />
                                ) : (
                                    <span>{auth?.user?.first_name?.[0]}{auth?.user?.last_name?.[0]}</span>
                                )}
                                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                    <span className="text-xs text-white font-medium">Change</span>
                                </div>
                            </div>
                            <div>
                                <h4 className="font-bold text-zinc-900 dark:text-zinc-100">{auth?.user?.first_name} {auth?.user?.last_name}</h4>
                                <p className="text-sm text-zinc-500 dark:text-zinc-400 capitalize">{auth?.userRole || 'Staff Member'}</p>
                            </div>
                        </div>

                        <form onSubmit={handleProfileUpdate} className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">First Name</label>
                                <input name="firstName" type="text" defaultValue={auth?.user?.first_name} className="w-full px-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-primary-500/20" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Last Name</label>
                                <input name="lastName" type="text" defaultValue={auth?.user?.last_name} className="w-full px-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-primary-500/20" />
                            </div>
                            <div className="space-y-2 md:col-span-2">
                                <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Email Address (Read-only)</label>
                                <input type="email" value={auth?.user?.email} readOnly className="w-full px-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-800/50 text-zinc-500 cursor-not-allowed" />
                            </div>
                            <div className="pt-4 flex justify-end md:col-span-2">
                                <button type="submit" disabled={loading} className="flex items-center gap-2 bg-primary-600 text-white px-6 py-2.5 rounded-xl font-medium hover:bg-primary-700 transition-colors shadow-lg shadow-primary-500/20 disabled:opacity-60">
                                    {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />} Save Profile
                                </button>
                            </div>
                        </form>
                    </motion.div>
                )}

                {activeTab === 'Security' && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-6"
                    >
                        <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 border-b border-zinc-100 dark:border-zinc-800 pb-4">Security Settings</h3>

                        <form onSubmit={handlePasswordChange} className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Current Password</label>
                                <input name="currentPassword" required type="password" className="w-full max-w-md px-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-primary-500/20" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">New Password</label>
                                <input name="newPassword" required type="password" className="w-full max-w-md px-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-primary-500/20" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Confirm New Password</label>
                                <input name="confirmPassword" required type="password" className="w-full max-w-md px-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-primary-500/20" />
                            </div>
                            <div className="pt-4 flex justify-end">
                                <button type="submit" disabled={loading} className="flex items-center gap-2 bg-primary-600 text-white px-6 py-2.5 rounded-xl font-medium hover:bg-primary-700 transition-colors shadow-lg shadow-primary-500/20 disabled:opacity-60">
                                    {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Shield className="w-4 h-4" />} Update Password
                                </button>
                            </div>
                        </form>
                    </motion.div>
                )}

                {(activeTab === 'Notifications' || activeTab === 'System') && (
                    <div className="flex flex-col items-center justify-center h-64 text-zinc-400">
                        <p>This section is under development.</p>
                        <p className="text-xs mt-2 text-zinc-500">System metrics and notification preferences will be available in the next release.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminSettings;
