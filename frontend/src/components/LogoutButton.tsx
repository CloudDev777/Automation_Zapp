import useSidebarStore from "@/store/sidebarStore";
import { QueryClient } from "@tanstack/react-query";
import { NavigateFunction } from "react-router-dom";

interface LogoutButtonProps {
  logoutUser: (
    queryClient: QueryClient,
    navigate: NavigateFunction
  ) => Promise<void>;
  queryClient: QueryClient;
  navigate: NavigateFunction;
}

const LogoutButton = ({
  logoutUser,
  queryClient,
  navigate,
}: LogoutButtonProps) => {
  const handleLogout = async () => {
    await logoutUser(queryClient, navigate);
  };
  return (
    <button
      onClick={handleLogout}
      className="w-full lg:w-auto flex lg:btn items-center ml-3 py-3  transition-colors hover:bg-purple-700 hover:text-white lg:text-white-700 lg:btn-primary"
    >
      Logout
    </button>
  );
};

export default LogoutButton;
