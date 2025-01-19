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
      className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
    >
      Logout
    </button>
  );
};

export default LogoutButton;
