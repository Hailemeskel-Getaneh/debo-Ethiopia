import apiClient from "./ApiClient";

export interface UserProfile {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar?: string;
}

// A client for /auth/users/me/
const meClient = apiClient<UserProfile>("/auth/users/me");

//  A client for /auth/users/avatar/ (the upload endpoint)
const avatarClient = apiClient<UserProfile>("/auth/users/avatar");

export const userService = {
  getCurrentUser: async () => {
    return await meClient.get();
  },

  // Update profile image
  updateAvatar: async (file: File) => {
    const formData = new FormData();
    formData.append("avatar", file);
    return await avatarClient.postMultipart(formData);
  },
};
