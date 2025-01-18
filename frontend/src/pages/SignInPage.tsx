import { Navigate, redirect } from "react-router-dom";
import { Zap, ArrowRight } from "lucide-react";
import customFetch from "@/utils/fetch";
import { QueryClient } from "@tanstack/react-query";
import { Form } from "react-router-dom";
import toast from "react-hot-toast";
import { useDashboardContext } from "@/layouts/DashboardLayout";

export const action =
  (queryClient: QueryClient) =>
  async ({ request }: { request: Request }) => {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);
    try {
      await customFetch.post("/auth/login", data);
      // @ts-ignore
      queryClient.invalidateQueries(["user"]);
      toast.success("Login successful");
      return redirect("/dashboard");
    } catch (error) {
      toast.error("Invalid credentials");
      return error;
    }
  };

function SignInPage() {
  const { user } = useDashboardContext();
  console.log(user);
  if (user) {
    return <Navigate to="/dashboard" replace />;
  }
  // if (!user) {
  //   return <Navigate to="/sign-in" replace />;
  // }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <a
          href="/"
          className="flex items-center justify-center text-purple-600"
        >
          <Zap className="w-10 h-10" />
        </a>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Sign in to your account
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Or{" "}
          <a
            href="/sign-up"
            className="font-medium text-purple-600 hover:text-purple-500"
          >
            create a free account
          </a>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <Form className="space-y-6" method="post">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email address
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
              >
                Sign in <ArrowRight className="ml-2 w-4 h-4" />
              </button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default SignInPage;
