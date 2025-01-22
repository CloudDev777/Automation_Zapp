import customFetch from "@/utils/fetch";
import { QueryClient, useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import {
  Outlet,
  redirect,
  useNavigate,
  Navigate,
  useNavigation,
} from "react-router-dom";
import { useDashboardStore } from "@/store/dashboardStore";
import { userQuery } from "@/lib/queries";
import { MobileAppHeader, MobileSidebar, SideBar } from "@/components";
import { ZapLayoutSkeleton } from "@/components/LoadingSkeletons";

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
  const navigation = useNavigation();
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
    <ProtectedRoute>
      <main className="flex">
        <SideBar />
        <MobileSidebar />
        <section className="flex-1 overflow-y-auto h-screen bg-[#E5E7EB] p-6">
          <MobileAppHeader />
          {navigation.state === "loading" ? <ZapLayoutSkeleton /> : <Outlet />}
        </section>
      </main>
    </ProtectedRoute>
  );
};

export default DashboardLayout;
