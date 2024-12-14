import { create } from "zustand";
import { UserState } from "../types/zustand/userState";
import { User } from "@/types/user/user";

export const useUserStore = create<UserState>((set) => ({
  user: null,
  setUser: (user: User) => set({ user }),
}));
