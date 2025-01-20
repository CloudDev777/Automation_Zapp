//Third party imports
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

// Pages imports
import {
  DashboardPage,
  HistoryPage,
  LandingPage,
  ProfilePage,
  SignInPage,
  SignUpPage,
  ZapsPage,
} from "./pages";

// Layouts imports
import { GlobalLayout, DashboardLayout } from "./layouts";

// Action imports
import { action as signInAction } from "./pages/SignInPage";
import { action as signUpAction } from "./pages/SignUpPage";

// Loaders imports
import { loader as dashboardLoader } from "./layouts/DashboardLayout";
import { loader as zapsLoader } from "./pages/ZapsPage";

// Components imports
import { Error } from "./components";

// Query Client Instance
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
    },
  },
});

// Routes
const router = createBrowserRouter([
  {
    path: "/",
    element: <GlobalLayout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <LandingPage />,
      },
      {
        path: "sign-in",
        element: <SignInPage />,
        action: signInAction(queryClient),
      },
      {
        path: "sign-up",
        element: <SignUpPage />,
        action: signUpAction(queryClient),
      },
    ],
  },
  {
    path: "/dashboard",
    element: <DashboardLayout queryClient={queryClient} />,
    loader: dashboardLoader(queryClient),
    children: [
      {
        index: true,
        element: <DashboardPage />,
      },
      {
        path: "zaps",
        element: <ZapsPage />,
        loader: zapsLoader(queryClient),
      },
      {
        path: "history",
        element: <HistoryPage />,
      },
      {
        path: "profile",
        element: <ProfilePage />,
      },
    ],
  },
]);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ReactQueryDevtools position="bottom" initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
