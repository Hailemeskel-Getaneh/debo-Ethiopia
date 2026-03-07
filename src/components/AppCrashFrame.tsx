import { RefreshCcw, Home, AlertTriangle } from "lucide-react";
import type { FallbackProps } from "react-error-boundary";

export const AppCrashFrame = ({ error, resetErrorBoundary }: FallbackProps) => {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-zinc-950 p-6 relative overflow-hidden font-sans">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-linear-to-br from-zinc-950/90 via-red-950/30 to-zinc-950/90 z-10" />
      </div>

      <main className="relative z-10 w-full max-w-md animate-in fade-in zoom-in duration-500">
        <div className="card bg-white/10 backdrop-blur-3xl border border-white/20 p-8 sm:p-10 rounded-[2.5rem] shadow-2xl text-center">
          <div className="w-20 h-20 bg-red-50 dark:bg-red-900/20 rounded-2xl flex items-center justify-center mx-auto mb-6 ring-4 ring-red-500/10">
            <AlertTriangle className="w-10 h-10 text-red-600" />
          </div>

          <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mb-3 tracking-tight">
            Something went wrong
          </h1>

          <p className="text-zinc-600 dark:text-zinc-400 mb-8 leading-relaxed font-medium">
            An unexpected error occurred. We've been notified and are working on
            it.
          </p>

          <ErrorActions resetErrorBoundary={resetErrorBoundary} />

          {/* Development Debug Info */}
          {import.meta.env.DEV && <DebugInfo error={error} />}
        </div>
      </main>
    </div>
  );
};

const DebugInfo = ({ error }: { error: any }) => {
  return (
    <div className="mt-8 p-4 bg-black/40 rounded-2xl text-left border border-white/5 overflow-hidden">
      <p className="text-[10px] font-bold text-red-400 uppercase tracking-widest mb-2">
        Debug Info
      </p>
      <pre className="text-[10px] text-zinc-500 overflow-x-auto whitespace-pre-wrap font-mono leading-tight">
        {(error as Error)?.message ?? String(error)}
      </pre>
    </div>
  );
};

const ErrorActions = ({
  resetErrorBoundary,
}: {
  resetErrorBoundary: (...args: unknown[]) => void;
}) => {
  return (
    <div className="flex flex-col gap-3">
      <button
        onClick={resetErrorBoundary}
        className="w-full flex items-center justify-center gap-2 bg-primary-600 hover:bg-primary-700 text-white font-bold py-3.5 rounded-xl transition-all shadow-lg shadow-primary-500/20 active:scale-95"
      >
        <RefreshCcw className="w-4 h-4" />
        Retry Loading
      </button>

      <a
        href="/"
        className="w-full flex items-center justify-center gap-2 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-200 font-bold py-3.5 rounded-xl transition-all"
      >
        <Home className="w-4 h-4" />
        Back to Home
      </a>
    </div>
  );
};
