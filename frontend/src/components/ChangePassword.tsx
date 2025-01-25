import customFetch from "@/utils/fetch";
import { QueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import {
  ActionFunctionArgs,
  Form,
  useActionData,
  useNavigation,
} from "react-router-dom";

export const action =
  (queryClient: QueryClient) =>
  async ({ request }: ActionFunctionArgs): Promise<Response | unknown> => {
    try {
      // Parse form data
      const formData = await request.formData();
      const data = Object.fromEntries(formData);

      // Validation
      const errors: { [key: string]: string } = {};

      if (!data.oldPassword)
        errors.oldPassword = "Current password is required";
      if (!data.newPassword) errors.newPassword = "New password is required";
      // @ts-ignore
      if (data.newPassword.length < 8)
        errors.newPassword = "Password must be at least 8 characters long";
      if (data.newPassword !== data.confirmPassword)
        errors.confirmPassword = "Passwords do not match";

      // If there are validation errors, return them
      if (Object.keys(errors).length > 0) {
        return { errors };
      }

      await customFetch.patch("/users/updateUserPassword", {
        oldPassword: data.oldPassword,
        newPassword: data.newPassword,
      });

      queryClient.invalidateQueries({ queryKey: ["user"] });
      toast.success("Password changed successfully");

      // @ts-ignore
      document.getElementById("password-form")?.reset();
      return null;
    } catch (error: any) {
      if (error.response?.status === 401) {
        toast.error("Invalid credentials");
      }
    }
  };

const ChangePassword = () => {
  const actionData = useActionData();
  console.log(actionData);
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  return (
    <div className="lg:col-span-2">
      <div className="bg-white border border-neutral-200/20 rounded-lg p-6">
        <Form method="post" replace id="password-form">
          <div className="grid grid-cols-1 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Current Password
              </label>
              <input
                type="password"
                autoComplete="current-password"
                name="oldPassword"
                placeholder="Enter current password"
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:border-transparent 
                    ${
                      actionData?.errors?.oldPassword
                        ? "border-red-500 focus:ring-red-500"
                        : "border-neutral-200/20 focus:ring-indigo-500"
                    }`}
              />
              {actionData?.errors?.oldPassword && (
                <p className="text-red-500 text-xs mt-1">
                  {actionData.errors.oldPassword}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                New Password
              </label>
              <input
                type="password"
                autoComplete="new-password"
                name="newPassword"
                placeholder="Enter new password"
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:border-transparent 
                    ${
                      actionData?.errors?.newPassword
                        ? "border-red-500 focus:ring-red-500"
                        : "border-neutral-200/20 focus:ring-indigo-500"
                    }`}
              />
              {actionData?.errors?.newPassword && (
                <p className="text-red-500 text-xs mt-1">
                  {actionData.errors.newPassword}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Confirm New Password
              </label>
              <input
                type="password"
                autoComplete="new-password"
                name="confirmPassword"
                placeholder="Confirm new password"
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:border-transparent 
                    ${
                      actionData?.errors?.confirmPassword
                        ? "border-red-500 focus:ring-red-500"
                        : "border-neutral-200/20 focus:ring-indigo-500"
                    }`}
              />
              {actionData?.errors?.confirmPassword && (
                <p className="text-red-500 text-xs mt-1">
                  {actionData.errors.confirmPassword}
                </p>
              )}
            </div>
            {actionData?.errors?.submit && (
              <p className="text-red-500 text-xs mt-1">
                {actionData.errors.submit}
              </p>
            )}
          </div>

          <div className="mt-6 flex items-center justify-end space-x-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition duration-300 disabled:opacity-50"
            >
              {isSubmitting ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default ChangePassword;
