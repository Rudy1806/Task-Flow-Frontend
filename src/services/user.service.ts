import api from "@/lib/axios";

export const UserService = {
  getUsers: async () => {
    const response = await api.get("/users");
    return response.data;
  },

  getProfile: async () => {
    const response = await api.get("/users/profile");
    return response.data;
  },

  updateProfile: async (data: any) => {
    const response = await api.put(
      "/users/profile",
      data
    );

    return response.data;
  },
};