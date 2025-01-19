import { create } from "zustand";

interface SidebarState {
  isOpen: boolean;
  openSidebar: () => void;
  closeSidebar: () => void;
  toggleSidebar: () => void;
}

const useSidebarStore = create<SidebarState>((set) => ({
  isOpen: false,
  openSidebar: () => set({ isOpen: true }),
  closeSidebar: () => set({ isOpen: false }),
  toggleSidebar: () => set((state) => ({ isOpen: !state.isOpen })),
}));

export default useSidebarStore;
