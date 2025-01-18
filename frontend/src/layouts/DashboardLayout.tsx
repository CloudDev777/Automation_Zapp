import customFetch from "@/utils/fetch";
import { QueryClient, useQuery } from "@tanstack/react-query";
import { useContext, useEffect, createContext, useState } from "react";
import toast from "react-hot-toast";
import { Outlet, redirect, useNavigate } from "react-router-dom";
import { Navigate } from "react-router-dom";

const userQuery = {
  queryKey: ["user"],
  queryFn: async () => {
    const { data } = await customFetch.get("/users/current-user");
    console.log(data);

    if (data) {
      return data;
    }
    return null;
  },
};

// Protected route wrapper (redirects to sign-in if not logged in)
export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  return useDashboardContext() ? children : <Navigate to="/sign-in" replace />;
};

export const loader = (queryClient: QueryClient) => async () => {
  try {
    return await queryClient.ensureQueryData(userQuery);
  } catch (error) {
    return redirect("/");
  }
};

const DashboardContext = createContext<any>({});

const DashboardLayout = ({ queryClient }: { queryClient: QueryClient }) => {
  const { user } = useQuery(userQuery)?.data;
  const navigate = useNavigate();
  // const navigation = useNavigation();
  // const isPageLoading = navigation.state === "loading";
  const [isAuthError, setIsAuthError] = useState(false);

  const logoutUser = async () => {
    await customFetch.get("/auth/logout");
    queryClient.invalidateQueries();
    toast.success("Logging out...");
    navigate("/");
  };

  customFetch.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error?.response?.status === 401) {
        setIsAuthError(true);
      }
      return Promise.reject(error);
    }
  );

  useEffect(() => {
    if (!isAuthError) return;
    logoutUser();
  }, [isAuthError]);

  return (
    <>
      <DashboardContext.Provider value={user}>
        <main>
          <ProtectedRoute>
            <Outlet />
          </ProtectedRoute>
        </main>
      </DashboardContext.Provider>
    </>
  );
};
// @ts-ignore
export const useDashboardContext = () => useContext(DashboardContext);

export default DashboardLayout;
