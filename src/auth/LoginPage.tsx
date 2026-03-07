import loginBg from "@/assets/images/login-bg.png";
import { LoginForm } from "@/auth/LoginForm";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const LoginPage = () => {
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
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="text-center mb-10">
            <h1 className="text-3xl font-black text-white tracking-widest uppercase">
              Sign In
            </h1>
          </div>

          <div className="card bg-white/10 backdrop-blur-3xl border border-white/20 p-8 sm:p-10 rounded-[2.5rem] shadow-2xl">
            <LoginForm />

            <div className="mt-8 pt-6 border-t border-white/5 text-center">
              <Link
                to="/forgot-password"
                title="Forgot Password"
                className="text-xs text-zinc-500 hover:text-white transition-colors font-bold"
              >
                Forgot Credentials?
              </Link>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default LoginPage;
