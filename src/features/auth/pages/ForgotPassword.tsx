import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, ArrowLeft, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import loginBg from '@/assets/images/login-bg.png';

const ForgotPassword: React.FC = () => {
    const [loading, setLoading] = React.useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        // Mocking request
        setTimeout(() => setLoading(false), 2000);
    };

    return (
        <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-zinc-950">
            {/* Ambient Background */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-gradient-to-br from-zinc-950/90 via-zinc-900/60 to-primary-950/90 z-10" />
                <img
                    src={loginBg}
                    alt="Background"
                    className="w-full h-full object-cover opacity-30 scale-105 blur-[3px]"
                />
            </div>

            <main className="relative z-10 w-full max-w-md px-6">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    <div className="text-center mb-8">
                        <h1 className="text-xl font-black text-white tracking-widest uppercase">Recovery</h1>
                    </div>

                    <div className="bg-white/10 backdrop-blur-3xl border border-white/20 p-8 sm:p-10 rounded-[2.5rem] shadow-2xl">
                        <p className="text-zinc-400 text-sm mb-8 text-center font-medium">
                            Enter your email address and we'll send you instructions to reset your password.
                        </p>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="space-y-1.5">
                                <label className="text-[11px] uppercase tracking-widest font-black text-zinc-400 ml-1">Work Email</label>
                                <div className="relative group/input">
                                    <Mail className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within/input:text-primary-400 transition-colors" />
                                    <input
                                        type="email"
                                        required
                                        placeholder="Enter your email"
                                        className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-primary-500/50 transition-all font-medium"
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full py-4 rounded-2xl bg-white text-primary-950 font-black text-base hover:bg-zinc-100 transition-all disabled:opacity-60 flex items-center justify-center gap-3 active:scale-[0.98]"
                            >
                                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Send Reset Link"}
                            </button>
                        </form>

                        <div className="mt-8 pt-6 border-t border-white/5 text-center">
                            <Link to="/abc/login" className="inline-flex items-center gap-2 text-xs text-zinc-500 hover:text-white transition-colors font-bold">
                                <ArrowLeft className="w-3 h-3" /> Back to Login
                            </Link>
                        </div>
                    </div>
                </motion.div>
            </main>
        </div>
    );
};

export default ForgotPassword;
