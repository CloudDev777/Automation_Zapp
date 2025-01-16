import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;

// TODO: Add the following code to the App.tsx file
{
  /* <QueryClientProvider client={queryClient}>
  <RouterProvider router={router} />
  <ReactQueryDevtools initialIsOpen={false} />
</QueryClientProvider>; */
}
