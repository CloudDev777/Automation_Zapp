import { userQuery } from "@/lib/queries";
import { useQuery } from "@tanstack/react-query";
import { History, Menu, Zap } from "lucide-react";
import LogOutModal from "./LogOutModal";
import clsx from "clsx";
import { Link, NavLink } from "react-router-dom";

const SideBar = () => {
  // @ts-ignore
  const {
    data: { user },
  } = useQuery(userQuery);

  return (
    <nav className="hidden lg:flex flex-col w-64 min-h-screen bg-white border-r border-neutral-200/20 sticky top-0">
      {/* <!-- Logo --> */}
      <SideBarLogo />

      {/* <!-- Navigation Links --> */}
      <SideBarLinks />

      {/* <!-- Logout Button --> */}
      <LogOutModal />

      {/* <!-- User Profile --> */}
      <SideBarUserProfile email={user?.email} name={user?.name} />
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

const links = [
  {
    to: "/dashboard",
    label: "Dashboard",
    icon: Menu,
  },
  {
    to: "zaps",
    label: "Zaps",
    icon: Zap,
  },
  {
    to: "history",
    label: "History",
    icon: History,
  },
];

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

const SideBarUserProfile = ({
  email,
  name,
}: {
  email: string;
  name: string;
}) => {
  return (
    <Link to={"profile"} className="p-6 border-t border-neutral-200/20">
      <div className="flex items-center">
        <img
          src="/avatar.png"
          alt="User"
          className="w-8 h-8 rounded-full transition-opacity duration-300 opacity-100"
          loading="lazy"
        />
        <div className="ml-3">
          <p className="text-sm font-medium text-gray-700">{name}</p>
          <p className="text-xs text-gray-500">{email}</p>
        </div>
      </div>
    </Link>
  );
};
