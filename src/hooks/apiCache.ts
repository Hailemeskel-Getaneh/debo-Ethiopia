/**
 * Module-level in-memory cache for API responses.
 *
 * Because this is a plain ES module object, it survives React re-renders
 * and hot-reload remounts. Each unique cache key (endpoint) is only
 * fetched ONCE per browser session, preventing 429 rate-limit errors.
 *
 * Cache TTL: 5 minutes — after which the next hook mount will re-fetch.
 */

const CACHE_TTL_MS = 5 * 60 * 1000; // 5 minutes

interface CacheEntry {
    data: unknown;
    timestamp: number;
}

const cache = new Map<string, CacheEntry>();

/** In-flight promise deduplication — prevents simultaneous duplicate requests */
const inflight = new Map<string, Promise<unknown>>();

export async function cachedFetch<T>(
    key: string,
    fetcher: () => Promise<T>,
): Promise<T> {
    // Return cached value if still fresh
    const cached = cache.get(key);
    if (cached && Date.now() - cached.timestamp < CACHE_TTL_MS) {
        return cached.data as T;
    }

    // Deduplicate in-flight requests for the same key
    if (inflight.has(key)) {
        return inflight.get(key) as Promise<T>;
    }

    const promise = fetcher().then((data) => {
        cache.set(key, { data, timestamp: Date.now() });
        inflight.delete(key);
        return data;
    }).catch((err) => {
        inflight.delete(key);
        throw err;
    });

    inflight.set(key, promise);
    return promise;
}

/** Manually invalidate a cache entry (e.g., after a mutation) */
export function invalidateCache(key: string) {
    cache.delete(key);
}

/** Clear the entire cache */
export function clearCache() {
    cache.clear();
}
