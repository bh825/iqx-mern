import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useUserStore = create(
  persist(
    (set) => ({
      user: {},
      addUser: (user) => set({ user }),
    }),
    {
      name: "users",
    }
  )
);
