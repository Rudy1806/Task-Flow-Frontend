import api from "@/lib/axios";

export const NotificationService = {
  getNotifications: async () => {
    const response = await api.get(
      "/notifications"
    );

    return response.data;
  },

  markAsRead: async (
    id: string
  ) => {
    const response = await api.put(
      `/notifications/${id}/read`
    );

    return response.data;
  },

  markAllRead: async () => {
    const response = await api.put(
      "/notifications/read-all"
    );

    return response.data;
  },
};