import type { LucideIcon } from "lucide-react";
import { forwardRef, type InputHTMLAttributes, type ReactNode } from "react";

interface AuthInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  icon?: LucideIcon;
  error?: string;
  rightElement?: ReactNode;
}

export const Input = forwardRef<HTMLInputElement, AuthInputProps>(
  ({ label, icon: Icon, error, rightElement, ...props }, ref) => {
    return (
      <div className="form-control w-full space-y-1.5">
        <label className="label py-0 px-1">
          <span className="label-text text-[11px] uppercase tracking-widest font-black text-zinc-400">
            {label}
          </span>
        </label>

        <div className="relative group">
          {Icon && (
            <Icon className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-primary-400 transition-colors z-20" />
          )}

          <input
            {...props}
            ref={ref}
            className={`w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500/50 transition-all font-medium
              ${error ? "input-error" : ""} ${rightElement ? "pr-12" : ""}`}
          />

          {rightElement && (
            <div className="absolute right-4 top-1/2 -translate-y-1/2 z-20">
              {rightElement}
            </div>
          )}
        </div>

        {error && (
          <span className="text-[10px] text-error font-bold ml-1">{error}</span>
        )}
      </div>
    );
  },
);

