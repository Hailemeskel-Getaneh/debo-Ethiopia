import { Component, type ErrorInfo, type ReactNode } from 'react';
import { AlertTriangle, RefreshCcw, Home } from 'lucide-react';

interface Props {
    children: ReactNode;
}

interface State {
    hasError: boolean;
    error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
    public state: State = {
        hasError: false,
        error: null
    };

    public static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error };
    }

    public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error('Uncaught error:', error, errorInfo);
    }

    public render() {
        if (this.state.hasError) {
            return (
                <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 flex items-center justify-center p-4 font-sans">
                    <div className="max-w-md w-full bg-white dark:bg-zinc-900 rounded-3xl shadow-2xl border border-zinc-200 dark:border-zinc-800 p-8 text-center animate-in fade-in zoom-in duration-300">
                        <div className="w-20 h-20 bg-red-50 dark:bg-red-900/20 rounded-2xl flex items-center justify-center mx-auto mb-6 ring-4 ring-red-500/10">
                            <AlertTriangle className="w-10 h-10 text-red-600" />
                        </div>

                        <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mb-3 tracking-tight">
                            Something went wrong
                        </h1>

                        <p className="text-zinc-600 dark:text-zinc-400 mb-8 leading-relaxed font-medium">
                            An unexpected error occurred. We've been notified and are working on it.
                        </p>

                        <div className="flex flex-col gap-3">
                            <button
                                onClick={() => window.location.reload()}
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

                        {process.env.NODE_ENV === 'development' && this.state.error && (
                            <div className="mt-8 p-4 bg-zinc-100 dark:bg-zinc-800 rounded-xl text-left overflow-hidden">
                                <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-2">Debug Info</p>
                                <pre className="text-xs text-red-500 dark:text-red-400 overflow-x-auto whitespace-pre-wrap font-mono">
                                    {this.state.error.toString()}
                                </pre>
                            </div>
                        )}
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
