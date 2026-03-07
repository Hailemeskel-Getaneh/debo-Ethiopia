import { baseApi } from "./api";

// This call will NOT have a JWT header and won't trigger the 401 refresh logic

export const publicService = {
  getData: async <T>(endpoint: string) => {
    const { data } = await baseApi.get<T>(endpoint);
    return data;
  },

  postData: async <T>(endpoint: string, data: T) => {
    const response = await baseApi.post<T>(endpoint, data);
    return response.data;
  },
};
