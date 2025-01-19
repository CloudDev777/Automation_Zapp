import LogOutModal from "./LogOutModal";
import clsx from "clsx";
import { Link, NavLink } from "react-router-dom";
import { Zap } from "lucide-react";
import { links } from "@/lib/links";
import SideBarUserProfile from "./SidebarUserProfile";

const SideBar = () => {
  return (
    <nav className="hidden lg:flex flex-col w-64 min-h-screen bg-white border-r border-neutral-200/20 sticky top-0">
      {/* <!-- Logo --> */}
      <SideBarLogo />

      {/* <!-- Navigation Links --> */}
      <SideBarLinks />

      {/* <!-- Logout Button --> */}
      <LogOutModal />

      {/* <!-- User Profile --> */}
      <SideBarUserProfile />
    </nav>
  );
};
export default SideBar;

const SideBarLogo = () => {
  return (
    <Link
      to="/dashboard"
      className="p-6 border-b border-neutral-200/20 flex items-center "
    >
      <Zap className="text-purple-600 size-icon" />
      <span className="text-2xl font-bold text-purple-600 ml-2">Zappy</span>
    </Link>
  );
};

const SideBarLinks = () => {
  return (
    <div className="flex-1 py-6">
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
  );
};
