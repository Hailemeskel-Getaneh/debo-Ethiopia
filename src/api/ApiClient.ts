import type { AxiosRequestConfig } from "axios";
import api from "./api";

export interface PaginatedFetchResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

export class ApiClient<T> {
  private readonly endpoint: string;
  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  public getAll = async (config?: AxiosRequestConfig) => {
    const response = await api.get<PaginatedFetchResponse<T>>(
      this.endpoint,
      config,
    );
    return response.data;
  };

  // Handles both /users/123 and /users/me/
  public get = async (id?: number | string, config?: AxiosRequestConfig) => {
    // If id is provided, append it; otherwise, just hit the base endpoint
    const url = id ? `${this.endpoint}/${id}` : this.endpoint;
    const response = await api.get<T>(url, config);
    return response.data;
  };

  // Special method for File Uploads (like images)
  public postMultipart = async (
    data: FormData,
    config?: AxiosRequestConfig,
  ) => {
    const response = await api.post<T>(this.endpoint, data, {
      ...config,
      headers: {
        ...config?.headers,
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  };

  public post = async (data: Partial<T> | FormData) => {
    const response = await api.post<T>(this.endpoint, data);
    return response.data;
  };

  public patchMultipart = async (
    id: string | number,
    data: FormData,
    config?: AxiosRequestConfig,
  ) => {
    const response = await api.patch<T>(`${this.endpoint}/${id}`, data, {
      ...config,
      headers: {
        ...config?.headers,
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  };

  public patch = async (id: number | string, data: Partial<T> | FormData) => {
    const response = await api.patch<T>(`${this.endpoint}/${id}`, data);
    return response.data;
  };

  public putMultipart = async (
    id: string | number,
    data: FormData,
    config?: AxiosRequestConfig,
  ) => {
    const response = await api.put<T>(`${this.endpoint}/${id}`, data, {
      ...config,
      headers: {
        ...config?.headers,
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  };

  public put = async (id: number | string, data: Partial<T> | FormData) => {
    const response = await api.put<T>(`${this.endpoint}/${id}`, data);
    return response.data;
  };

  public delete = async (id: number | string) => {
    const response = await api.delete(`${this.endpoint}/${id}`);
    return response.data;
  };
}

const apiClient = <T>(endpoint: string) => new ApiClient<T>(endpoint);

export default apiClient;
