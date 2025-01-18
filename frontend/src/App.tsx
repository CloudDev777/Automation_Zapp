//Third party imports
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

// Pages imports
import { DashboardPage, LandingPage, SignInPage, SignUpPage } from "./pages";

// Layouts imports
import { GlobalLayout, DashboardLayout } from "./layouts";

// Action imports
import { action as signInAction } from "./pages/SignInPage";

// Loaders imports
import { loader as dashboardLoader } from "./layouts/DashboardLayout";

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
    ],
  },
]);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
