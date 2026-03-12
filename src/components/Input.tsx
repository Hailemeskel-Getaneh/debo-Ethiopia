import type { LucideIcon } from "lucide-react";
import { forwardRef, type InputHTMLAttributes, type ReactNode } from "react";

interface AuthInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  icon?: LucideIcon;
  error?: string;
  rightElement?: ReactNode;
}

export const Input = forwardRef<HTMLInputElement, AuthInputProps>(
  ({ label, icon: Icon, error, rightElement, className, ...props }, ref) => {
    return (
      <div className="form-control w-full space-y-1.5">
        <label className="label py-0 px-1">
          <span className="label-text text-[16px] uppercase tracking-widest font-black text-zinc-400">
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
            className={`
              w-full py-3.5 pr-4 rounded-xl border-2 transition-all font-medium outline-none
              ${Icon ? "pl-12" : "pl-4"} 
              ${
                error
                  ? "border-red-500 text-red-900 bg-red-50"
                  : "border-zinc-100 bg-white text-zinc-900 focus:border-brand-main focus:ring-4 focus:ring-brand-main/5"
              }
              ${rightElement ? "pr-12" : ""}
              ${className}
            `}
          />

          {rightElement && (
            <div className="absolute right-4 top-1/2 -translate-y-1/2 z-20">
              {rightElement}
            </div>
          )}
        </div>

        {error && (
          <span className="text-[13px] text-error font-bold ml-1">{error}</span>
        )}
      </div>
    );
  },
);
