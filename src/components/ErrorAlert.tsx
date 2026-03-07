import { AnimatePresence, motion } from "framer-motion";
import { AlertCircle } from "lucide-react";

interface Props {
  error: string | null;
}

export const ErrorAlert = ({ error }: Props) => {
  if (!error) return null;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ opacity: 0, height: 0, y: -10 }}
        animate={{ opacity: 1, height: "auto", y: 0 }}
        exit={{ opacity: 0, height: 0, y: -10 }}
        className="flex items-center gap-3 p-4 bg-red-500/10 border border-red-500/30 rounded-2xl text-red-300 text-xs font-medium"
      >
        <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
        <span>{error}</span>
      </motion.div>
    </AnimatePresence>
  );
};
