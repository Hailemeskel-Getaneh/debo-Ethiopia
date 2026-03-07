// components/GlobalErrorListener.tsx
import { AnimatePresence, motion } from "framer-motion";
import { AlertCircle, AlertTriangle, X } from "lucide-react";
import { useEffect, useState } from "react";
import { exceptionHandler, type AppError } from "./ExceptionHandler";

const GlobalErrorListener = () => {
  const [errors, setErrors] = useState<(AppError & { id: number })[]>([]);

  useEffect(() => {
    // Subscribe to the Global Exception Handler
    const unsubscribe = exceptionHandler.subscribe((error) => {
      const id = Date.now();
      setErrors((prev) => [...prev, { ...error, id }]);

      // Auto-remove after 5 seconds
      setTimeout(() => {
        setErrors((prev) => prev.filter((e) => e.id !== id));
      }, 5000);
    });

    return unsubscribe;
  }, []);

  const removeError = (id: number) => {
    setErrors((prev) => prev.filter((e) => e.id !== id));
  };

  return (
    <div className="fixed top-4 right-4 z-9999 space-y-3 w-full max-w-sm">
      <AnimatePresence>
        {errors.map((err) => (
          <motion.div
            key={err.id}
            initial={{ opacity: 0, x: 50, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 20, scale: 0.95 }}
            className={`flex items-start gap-3 p-4 rounded-2xl border shadow-xl backdrop-blur-md ${
              err.type === "error"
                ? "bg-red-50/90 border-red-200 text-red-800"
                : "bg-amber-50/90 border-amber-200 text-amber-800"
            }`}
          >
            {err.type === "error" ? (
              <AlertCircle className="w-5 h-5 shrink-0" />
            ) : (
              <AlertTriangle className="w-5 h-5 shrink-0" />
            )}

            <div className="flex-1">
              <p className="text-sm font-bold leading-tight">{err.message}</p>
              {!!err.status && (
                <span className="text-[10px] opacity-70 font-mono">
                  Status: {err.status}
                </span>
              )}
            </div>

            <button
              onClick={() => removeError(err.id)}
              className="p-1 hover:bg-black/5 rounded-lg transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default GlobalErrorListener;
