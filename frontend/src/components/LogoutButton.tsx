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
    <button onClick={handleLogout} className="btn btn-primary">
      Logout
    </button>
  );
};

export default LogoutButton;
