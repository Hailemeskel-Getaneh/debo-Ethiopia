import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, Loader2, AlertCircle, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../../hooks/useAuth';

// Import the generated background image path
import loginBg from '@/assets/images/login-bg.png';

const Login: React.FC = () => {
    const { login, isAuthenticated, userRole } = useAuth();
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Redirect if already authenticated
    React.useEffect(() => {
        if (isAuthenticated && userRole === 'admin') {
            navigate('/admin/dashboard', { replace: true });
        }
    }, [isAuthenticated, userRole, navigate]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setLoading(true);
        try {
            await login(email, password);
            // Use hard redirect to ensure context refresh
            window.location.href = '/admin/dashboard';
        } catch (err: unknown) {
            const errorData = err as { response?: { data?: { detail?: string; non_field_errors?: string[] } } };
            const detail = errorData.response?.data;
            setError(detail?.detail || detail?.non_field_errors?.[0] || 'Invalid credentials. Please verify your email and password.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-zinc-950">
            {/* Ambient Background with Image */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-gradient-to-br from-zinc-950/90 via-zinc-900/60 to-primary-950/90 z-10" />
                <img
                    src={loginBg}
                    alt="Background"
                    className="w-full h-full object-cover opacity-30 scale-105 blur-[3px]"
                />
            </div>

            {/* Decorative Elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-primary-600/10 blur-[120px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-secondary-600/10 blur-[120px]" />
            </div>

            <main className="relative z-10 w-full max-w-md px-6">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: 'easeOut' }}
                >
                    {/* Simple Header */}
                    <div className="text-center mb-10">
                        <h1 className="text-2xl font-black text-white tracking-widest uppercase">Sign In</h1>
                    </div>

                    <div className="bg-white/10 backdrop-blur-3xl border border-white/20 p-8 sm:p-10 rounded-[2.5rem] shadow-2xl relative overflow-hidden">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <AnimatePresence mode="wait">
                                {error && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        exit={{ opacity: 0, height: 0 }}
                                        className="flex items-center gap-3 p-4 bg-red-500/10 border border-red-500/30 rounded-2xl text-red-300 text-xs font-medium"
                                    >
                                        <AlertCircle className="w-4 h-4 shrink-0" />
                                        <span>{error}</span>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            <div className="space-y-1.5">
                                <label className="text-[11px] uppercase tracking-widest font-black text-zinc-400 ml-1">Email</label>
                                <div className="relative group/input">
                                    <Mail className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within/input:text-primary-400 transition-colors" />
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={e => setEmail(e.target.value)}
                                        required
                                        autoComplete="email"
                                        placeholder="Enter your email"
                                        className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500/50 transition-all font-medium"
                                    />
                                </div>
                            </div>

                            <div className="space-y-1.5">
                                <div className="flex justify-between items-center ml-1">
                                    <label className="text-[11px] uppercase tracking-widest font-black text-zinc-400">Password</label>
                                </div>
                                <div className="relative group/input">
                                    <Lock className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within/input:text-primary-400 transition-colors" />
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        value={password}
                                        onChange={e => setPassword(e.target.value)}
                                        required
                                        autoComplete="current-password"
                                        placeholder="••••••••"
                                        className="w-full pl-12 pr-12 py-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500/50 transition-all font-medium"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white transition-colors focus:outline-none"
                                    >
                                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                    </button>
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full py-4 rounded-2xl bg-white text-primary-950 font-black text-base hover:shadow-2xl hover:bg-zinc-100 transition-all disabled:opacity-60 flex items-center justify-center gap-3 active:scale-[0.98]"
                            >
                                {loading ? (
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                ) : (
                                    <>Sign In <ArrowRight className="w-5 h-5" /></>
                                )}
                            </button>
                        </form>

                        <div className="mt-8 pt-6 border-t border-white/5 text-center">
                            <Link to="/forgot-password" className="text-xs text-zinc-500 hover:text-white transition-colors font-bold">
                                Forgot Credentials?
                            </Link>
                        </div>
                    </div>

                </motion.div>
            </main>
        </div>
    );
};

export default Login;
