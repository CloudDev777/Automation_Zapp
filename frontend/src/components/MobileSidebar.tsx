import clsx from "clsx";
import { NavLink, useNavigate } from "react-router-dom";
import { links } from "@/lib/links";
import MobileSidebarButton from "./MobileSidebarButton";
import useSidebarStore from "@/store/sidebarStore";
import SideBarUserProfile from "./SidebarUserProfile";
import LogoutButton from "./LogoutButton";
import { useDashboardStore } from "@/store/dashboardStore";
import { useQueryClient } from "@tanstack/react-query";
import { LogOutIcon } from "lucide-react";

const MobileSidebar = () => {
  return (
    <nav>
      <MobileSidebarButton />

      <MobileNavLinks />
    </nav>
  );
};
export default MobileSidebar;

const MobileNavLinks = () => {
  const { isOpen, closeSidebar } = useSidebarStore();
  const { logoutUser } = useDashboardStore();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  return (
    <div
      className={`fixed inset-0 z-40 bg-neutral-800/80 backdrop-blur-lg transition-opacity duration-300 ${
        isOpen ? "opacity-100 visible" : "opacity-0 invisible"
      }`}
      onClick={closeSidebar}
    >
      <div
        className="fixed flex flex-col inset-y-0 left-0 w-64 bg-white shadow-lg transition-transform duration-300 transform"
        style={{
          transform: isOpen ? "translateX(0)" : "translateX(-100%)",
        }}
        onClick={(e) => e.stopPropagation()} // Prevents closing when clicking inside the sidebar
      >
        <div className="p-6 border-b border-neutral-200/20">
          <span className="text-2xl font-bold text-indigo-600">Zappy</span>
        </div>
        <div className="py-6">
          {links.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              end={to === "/dashboard"}
              className={({ isActive }) =>
                clsx(
                  "nav-link flex items-center px-6 py-3 text-gray-700 transition-colors hover:bg-purple-700 hover:text-white",
                  {
                    "bg-purple-700 text-white": isActive,
                    "text-gray-700": !isActive,
                  }
                )
              }
            >
              <Icon className="w-5 h-5 mr-3" />
              {label}
            </NavLink>
          ))}
        </div>
        <div className="mt-auto  border-t border-neutral-200/20">
          <div className="w-full flex items-center px-6  text-gray-700 transition-colors hover:bg-purple-700 hover:text-white">
            <LogOutIcon className="w-5 h-5" />
            <LogoutButton
              logoutUser={logoutUser}
              queryClient={queryClient}
              navigate={navigate}
            />
          </div>
          <SideBarUserProfile />
        </div>
      </div>
    </div>
  );
};
