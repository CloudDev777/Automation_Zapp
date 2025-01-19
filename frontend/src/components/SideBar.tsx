import { userQuery } from "@/lib/queries";
import { useQuery } from "@tanstack/react-query";
import { Zap } from "lucide-react";
import LogOutModal from "./LogOutModal";
import { Link } from "react-router-dom";

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

const SideBarLinks = () => {
  return (
    <div className="flex-1 py-6">
      <a
        href="#dashboard"
        className="nav-link active-link flex items-center px-6 py-3 text-gray-700 hover:text-white"
      >
        <svg
          className="w-5 h-5 mr-3"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h16M4 18h16"
          ></path>
        </svg>
        Dashboard
      </a>
      <a
        href="#workflows"
        className="nav-link flex items-center px-6 py-3 text-gray-700 hover:text-white"
      >
        <svg
          className="w-5 h-5 mr-3"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M13 10V3L4 14h7v7l9-11h-7z"
          ></path>
        </svg>
        Workflows
      </a>
      <a
        href="#templates"
        className="nav-link flex items-center px-6 py-3 text-gray-700 hover:text-white"
      >
        <svg
          className="w-5 h-5 mr-3"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
          ></path>
        </svg>
        Templates
      </a>
      <a
        href="#apps"
        className="nav-link flex items-center px-6 py-3 text-gray-700 hover:text-white"
      >
        <svg
          className="w-5 h-5 mr-3"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"
          ></path>
        </svg>
        Apps
      </a>
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
    <div className="p-6 border-t border-neutral-200/20">
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
    </div>
  );
};
