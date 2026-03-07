import { Input } from "@/components";
import { forgotPasswordSchema, type ForgotPasswordData } from "@/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, Loader2, Mail } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useAuthStore } from "../store/useAuthStore";

export const ForgotPasswordForm = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { requestPasswordReset, isLoading } = useAuthStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordData>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = async (data: ForgotPasswordData) => {
    await requestPasswordReset(data.email);
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center space-y-4"
        >
          <div className="flex justify-center">
            <CheckCircle2 className="w-12 h-12 text-green-400" />
          </div>
          <p className="text-zinc-300 font-medium">
            Instructions sent! Check your inbox.
          </p>
        </motion.div>
      </AnimatePresence>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <Input
        {...register("email")}
        label="Work Email"
        icon={Mail}
        type="email"
        placeholder="Enter your email"
        error={errors.email?.message}
      />

      <button
        type="submit"
        disabled={isLoading}
        className="btn btn-block h-14 rounded-2xl bg-white hover:bg-zinc-200 text-primary-950 border-none font-black text-base shadow-lg transition-all active:scale-95 disabled:bg-zinc-400"
      >
        {isLoading ? (
          <Loader2 className="w-5 h-5 animate-spin" />
        ) : (
          "Send Reset Link"
        )}
      </button>
    </form>
  );
};
