// pages/ForgotPassword.tsx
import loginBg from "@/assets/images/login-bg.png";
import { ForgotPasswordForm } from "@/auth/ForgotPasswordForm";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const ForgotPasswordPage = () => {
  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-zinc-950">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-linear-to-br from-zinc-950/90 via-zinc-900/60 to-primary-950/90 z-10" />
        <img
          src={loginBg}
          className="w-full h-full object-cover opacity-30 blur-[3px]"
          alt="bg"
        />
      </div>

      <main className="relative z-10 w-full max-w-md px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <div className="text-center mb-8">
            <h1 className="text-2xl font-black text-white tracking-widest uppercase">
              Recovery
            </h1>
          </div>

          <div className="card bg-white/10 backdrop-blur-3xl border border-white/20 p-8 sm:p-10 rounded-[2.5rem] shadow-2xl">
            <p className="text-zinc-400 text-sm mb-8 text-center font-medium">
              Enter your email address and we'll send you instructions to reset
              your password.
            </p>

            <ForgotPasswordForm />

            <div className="mt-8 pt-6 border-t border-white/5 text-center">
              <Link
                to="/login"
                className="inline-flex items-center gap-2 text-xs text-zinc-500 hover:text-white transition-colors font-bold"
              >
                <ArrowLeft className="w-3 h-3" /> Back to Login
              </Link>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default ForgotPasswordPage;
