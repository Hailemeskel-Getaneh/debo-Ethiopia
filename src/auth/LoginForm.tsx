import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, Eye, EyeOff, Loader2, Lock, Mail } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Input, ErrorAlert } from "@/components";
import { useAuthStore } from "@/store/useAuthStore";
import { loginSchema, type LoginFormData } from "@/validation";

export const LoginForm = () => {
  const { login, isLoading } = useAuthStore();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    setServerError(null);
    try {
      await login(data);
      navigate("/admin/dashboard");
    } catch (err: any) {
      // Extract the most relevant error message
      const message =
        err.response?.data?.detail ||
        err.response?.data?.non_field_errors?.[0] ||
        "Invalid credentials. Please check your email and password.";

      setServerError(message);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <ErrorAlert error={serverError} />

      <Input
        {...register("email")}
        label="Email"
        icon={Mail}
        type="email"
        placeholder="Enter your email"
        error={errors.email?.message}
      />

      <Input
        {...register("password")}
        label="Password"
        icon={Lock}
        type={showPassword ? "text" : "password"}
        placeholder="••••••••"
        error={errors.password?.message}
        rightElement={
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="text-zinc-500 hover:text-white transition-colors focus:outline-none"
          >
            {showPassword ? (
              <EyeOff className="w-5 h-5" />
            ) : (
              <Eye className="w-5 h-5" />
            )}
          </button>
        }
      />

      <button
        type="submit"
        disabled={isLoading}
        className="btn btn-block h-14 rounded-2xl bg-white hover:bg-zinc-200 text-primary-950 border-none font-black text-base shadow-lg transition-all active:scale-95 disabled:bg-zinc-400"
      >
        {isLoading ? (
          <Loader2 className="w-5 h-5 animate-spin" />
        ) : (
          <>
            Sign In <ArrowRight className="w-5 h-5 ml-2" />
          </>
        )}
      </button>
    </form>
  );
};
