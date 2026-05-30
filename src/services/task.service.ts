import api from "@/lib/axios";

export const TaskService = {
  getTasks: async () => {
    const response = await api.get("/tasks");

    return response.data;
  },

  createTask: async (data: any) => {
    const response = await api.post(
      "/tasks",
      data
    );

    return response.data;
  },

  updateTask: async (
    id: string,
   data: {
    title?: string;
    description?: string;
    status?: string;
    priority?: string;
    assigned_to?: string | null;
    }
  ) => {
    const response = await api.put(
      `/tasks/${id}`,
      data
    );

    return response.data;
  },

  deleteTask: async (
    id: string
  ) => {
    const response = await api.delete(
      `/tasks/${id}`
    );

    return response.data;
  },
};