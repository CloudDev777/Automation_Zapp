//Third party imports
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

//Pages imports
import { LandingPage, SignInPage, SignUpPage } from "./pages";

//Layouts imports
import { GlobalLayout } from "./layouts";

const router = createBrowserRouter([
  {
    path: "sign-in",
    element: <SignInPage />,
  },
  {
    path: "sign-up",
    element: <SignUpPage />,
  },
  {
    path: "/",
    element: <GlobalLayout />,
    children: [
      {
        index: true,
        element: <LandingPage />,
      },
      {
        path: "about",
        element: <div>About</div>,
      },
    ],
  },
]);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
