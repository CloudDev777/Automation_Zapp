import customFetch from "@/utils/fetch";
import { QueryClient, useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

import { Outlet, redirect, useNavigate, Navigate } from "react-router-dom";
import { useDashboardStore } from "@/store/dashboardStore";

// Query configuration
export const userQuery = {
  queryKey: ["user"],
  queryFn: async () => {
    const { data } = await customFetch.get("/users/current-user");
    // Use setState to update the store
    useDashboardStore.setState({ user: data });
    return data;
  },
};

// Loader function
export const loader = (queryClient: QueryClient) => async () => {
  try {
    return await queryClient.ensureQueryData(userQuery);
  } catch (error) {
    return redirect("/");
  }
};

// Protected route wrapper
export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const user = useDashboardStore((state) => state.user);
  return user ? children : <Navigate to="/sign-in" replace />;
};

// Dashboard Layout component
const DashboardLayout = ({ queryClient }: { queryClient: QueryClient }) => {
  const navigate = useNavigate();
  // const { data: userData } = useQuery(userQuery);
  const { isAuthError, setIsAuthError, logoutUser } = useDashboardStore();

  // Set up axios interceptor
  customFetch.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error?.response?.status === 401) {
        setIsAuthError(true);
      }
      return Promise.reject(error);
    }
  );

  // Handle auth errors
  useEffect(() => {
    if (!isAuthError) return;
    const handleLogout = async () => {
      await logoutUser();
      queryClient.invalidateQueries();
      navigate("/");
    };
    handleLogout();
  }, [isAuthError, logoutUser, queryClient, navigate]);

  return (
    <main>
      <ProtectedRoute>
        <Outlet />
      </ProtectedRoute>
    </main>
  );
};

export default DashboardLayout;
