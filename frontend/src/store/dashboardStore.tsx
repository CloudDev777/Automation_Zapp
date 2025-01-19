import customFetch from "@/utils/fetch";
import { QueryClient } from "@tanstack/react-query";
import { create } from "zustand";

interface DashboardStore {
  isAuthError: boolean;
  setIsAuthError: (error: boolean) => void;
  logoutUser: (
    queryClient: QueryClient,
    navigate: (path: string) => void
  ) => Promise<void>;
}

export const useDashboardStore = create<DashboardStore>((set) => ({
  isAuthError: false,
  setIsAuthError: (error) => set({ isAuthError: error }),
  logoutUser: async (queryClient, navigate) => {
    try {
      await customFetch.delete("/auth/logout");
      queryClient.clear(); // Clear all queries
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  },
}));
