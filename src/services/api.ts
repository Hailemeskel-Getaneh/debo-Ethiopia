export const API_BASE_URL = 'http://localhost:5000/api';

// Simple fetch wrapper — currently returns mock data.
// When backend is ready, uncomment the fetch calls below.
export const api = {
    get: async <T>(): Promise<T> => {
        await new Promise(resolve => setTimeout(resolve, 300));
        // const response = await fetch(`${API_BASE_URL}${_endpoint}`);
        // if (!response.ok) throw new Error(`API Error: ${response.status}`);
        // return response.json() as Promise<T>;
        return {} as T;
    },
    post: async <T>(data: unknown): Promise<T> => {
        await new Promise(resolve => setTimeout(resolve, 300));
        // const response = await fetch(`${API_BASE_URL}${_endpoint}`, {
        //   method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data),
        // });
        // return response.json() as Promise<T>;
        return data as T;
    },
    put: async <T>(data: unknown): Promise<T> => {
        await new Promise(resolve => setTimeout(resolve, 300));
        return data as T;
    },
    delete: async (): Promise<void> => {
        await new Promise(resolve => setTimeout(resolve, 300));
    },
};