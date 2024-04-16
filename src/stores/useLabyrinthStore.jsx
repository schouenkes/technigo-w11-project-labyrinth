import { create } from "zustand";

export const useLabyrinthStore = create((set) => ({
  username: "",
  setUsername: (username) => set({ username }),
}));
