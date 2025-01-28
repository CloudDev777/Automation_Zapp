import { QueryClient, useQuery } from "@tanstack/react-query";
import { Outlet, redirect, Navigate } from "react-router-dom";
import { userQuery } from "@/lib/queries";
import { MobileAppHeader, MobileSidebar, SideBar } from "@/components";

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

const DashboardLayout = () => {
  useQuery(userQuery);

  return (
    <ProtectedRoute>
      <main className="flex">
        <SideBar />
        <MobileSidebar />
        <section className="flex-1 overflow-y-auto h-screen bg-[#E5E7EB] p-6">
          <MobileAppHeader />
          <Outlet />
        </section>
      </main>
    </ProtectedRoute>
  );
};

export default DashboardLayout;
