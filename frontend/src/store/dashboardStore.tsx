import customFetch from "@/utils/fetch";
import toast from "react-hot-toast";
import { create } from "zustand";

// Define the store state type
interface DashboardStore {
  user: any | null;
  isAuthError: boolean;
  setIsAuthError: (error: boolean) => void;
  logoutUser: () => Promise<void>;
}

// Create the Zustand store
export const useDashboardStore = create<DashboardStore>((set) => ({
  user: null,
  isAuthError: false,
  setIsAuthError: (error) => set({ isAuthError: error }),
  logoutUser: async () => {
    await customFetch.delete("/auth/logout");
    set({ user: null });
    toast.success("Logging out...");
  },
}));
