import useSidebarStore from "@/store/sidebarStore";
import { Menu, X } from "lucide-react";

const MobileSidebarButton = () => {
  const { isOpen, toggleSidebar } = useSidebarStore();
  return (
    <button
      type="button"
      className="lg:hidden fixed top-4 right-4 z-50 p-2 rounded-lg bg-white border border-neutral-200/20"
      aria-controls="mobile-menu"
      onClick={toggleSidebar}
      aria-expanded="false"
    >
      {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
    </button>
  );
};
export default MobileSidebarButton;
