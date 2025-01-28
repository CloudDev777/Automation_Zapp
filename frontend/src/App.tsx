//Third party imports
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

// Pages imports
import {
  CreateZapPage,
  DashboardPage,
  HistoryPage,
  LandingPage,
  ProfilePage,
  SignInPage,
  SignUpPage,
  ZapsPage,
} from "./pages";

// Layouts imports
import {
  GlobalLayout,
  DashboardLayout,
  ZapsLayout,
  SettingsLayout,
} from "./layouts";

// Action imports
import { action as signInAction } from "./pages/SignInPage";
import { action as signUpAction } from "./pages/SignUpPage";
import { action as profileAction } from "./pages/ProfilePage";
import { action as changePasswordAction } from "./components/ChangePassword";

// Loaders imports
import { loader as dashboardLoader } from "./layouts/DashboardLayout";
import { loader as createZapsLoader } from "./pages/CreateZapPage";

// Components imports
import { ChangePassword, Error, Loading } from "./components";
import { Suspense } from "react";

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
    element: <DashboardLayout />,
    loader: dashboardLoader(queryClient),
    children: [
      {
        index: true,
        element: <DashboardPage />,
      },
      {
        path: "zaps",
        element: <ZapsLayout />,
        children: [
          {
            index: true,
            element: <ZapsPage />,
          },
          {
            path: "create",
            element: <CreateZapPage />,
            loader: createZapsLoader(queryClient),
          },
        ],
      },
      {
        path: "history",
        element: <HistoryPage />,
      },
      {
        path: "settings",
        element: <SettingsLayout />,
        children: [
          {
            index: true,
            element: <ProfilePage />,
            action: profileAction(queryClient),
          },
          {
            path: "security",
            element: <h1>Settings Page, coming soon.</h1>,
          },
          {
            path: "billing",
            element: <h1>Billing Page, coming soon.</h1>,
          },
          {
            path: "notifications",
            element: <h1>Notifications Page, coming soon.</h1>,
          },
          {
            path: "password",
            element: <ChangePassword />,
            action: changePasswordAction(queryClient),
          },
        ],
      },
    ],
  },
]);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Suspense fallback={<Loading />}>
        <RouterProvider router={router} />
      </Suspense>
      <ReactQueryDevtools position="bottom" initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
