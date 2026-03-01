import { useState, useCallback } from 'react';

interface UseApiState<T> {
    data: T | null;
    loading: boolean;
    error: string | null;
}

/**
 * Generic hook for async API calls.
 * Usage: const { data, loading, error, execute } = useApi<MyType[]>();
 */
export function useApi<T>() {
    const [state, setState] = useState<UseApiState<T>>({
        data: null,
        loading: false,
        error: null,
    });

    const execute = useCallback(async (apiCall: () => Promise<T>): Promise<T | null> => {
        setState({ data: null, loading: true, error: null });
        try {
            const result = await apiCall();
            setState({ data: result, loading: false, error: null });
            return result;
        } catch (err: unknown) {
            const message =
                (err as { response?: { data?: { detail?: string } } })?.response?.data?.detail ||
                (err instanceof Error ? err.message : 'An unexpected error occurred.');
            setState({ data: null, loading: false, error: message });
            return null;
        }
    }, []);

    return { ...state, execute };
}
