import customFetch from "@/utils/fetch";
import { QueryClient, useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

import { Outlet, redirect, useNavigate, Navigate } from "react-router-dom";
import { useDashboardStore } from "@/store/dashboardStore";
import LogoutButton from "@/components/LogoutButton";
import { userQuery } from "@/lib/queries";



export const loader = (queryClient: QueryClient) => async () => {
  try {
    return await queryClient.ensureQueryData(userQuery);
  } catch (error) {
    return redirect("/");
  }
};

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { data: user } = useQuery(userQuery);
  return user ? children : <Navigate to="/sign-in" replace />;
};

const DashboardLayout = ({ queryClient }: { queryClient: QueryClient }) => {
  const navigate = useNavigate();
  useQuery(userQuery);
  const { isAuthError, setIsAuthError, logoutUser } = useDashboardStore();

  // Set up axios interceptor
  useEffect(() => {
    const interceptor = customFetch.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error?.response?.status === 401) {
          setIsAuthError(true);
        }
        return Promise.reject(error);
      }
    );

    return () => {
      customFetch.interceptors.response.eject(interceptor);
    };
  }, [setIsAuthError]);

  // Handle auth errors
  useEffect(() => {
    if (!isAuthError) return;
    logoutUser(queryClient, navigate);
  }, [isAuthError, logoutUser, queryClient, navigate]);

  return (
    <main>
      <ProtectedRoute>
        <Outlet />
      </ProtectedRoute>
      <LogoutButton
        logoutUser={logoutUser}
        queryClient={queryClient}
        navigate={navigate}
      />
    </main>
  );
};

export default DashboardLayout;
