import api from "@/lib/axios";

export const AuthService = {
  register: async (data: {
    name: string;
    email: string;
    password: string;
  }) => {
    const response = await api.post(
      "/auth/register",
      data
    );

    return response.data;
  },

  login: async (data: {
    email: string;
    password: string;
  }) => {
    const response = await api.post(
      "/auth/login",
      data
    );

    return response.data;
  },

  me: async () => {
    const response = await api.get(
      "/auth/me"
    );

    return response.data;
  },
};