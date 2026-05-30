import { create } from "zustand";
import { useRouter } from "next/navigation";

interface User {
  id: string;
  name: string;
  email: string;
  avatar_url?: string | null;
}

interface AuthStore {
  user: User | null;
  token: string | null;

  setAuth: (user: User, token: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  token: null,

  setAuth: (user, token) => {
    localStorage.setItem("access_token", token);

    set({
      user,
      token,
    });
  },

  logout: () => {
    localStorage.removeItem("access_token");

    set({
      user: null,
      token: null,
    });
  },
}));