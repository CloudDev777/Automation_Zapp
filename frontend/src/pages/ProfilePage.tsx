import { userQuery } from "@/lib/queries";
import customFetch from "@/utils/fetch";
import { QueryClient, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import toast from "react-hot-toast";
import {
  ActionFunctionArgs,
  Form,
  redirect,
  useNavigation,
} from "react-router-dom";

export const action =
  (queryClient: QueryClient) =>
  async ({ request }: ActionFunctionArgs): Promise<Response | unknown> => {
    try {
      // Parse form data
      const formData = await request.formData();
      const data = Object.fromEntries(formData);
      // Make API call to update user
      await customFetch.patch("/users/updateUser", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // Invalidate the relevant query
      queryClient.invalidateQueries({ queryKey: ["user"] });

      // Show success toast
      toast.success("Profile updated successfully");

      // Redirect after success
      return redirect(".");
    } catch (error: any) {
      // Log and handle the error
      toast.error("An error occurred. Please try again.");
      console.error("Error in action:", error);
      return error;
    }
  };

const ProfilePage = () => {
  const {
    data: { user },
  } = useQuery(userQuery);

  const [previewImage, setPreviewImage] = useState(
    user?.image || "/avatar.png"
  );

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]; // Use optional chaining to handle null or undefined
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === "string") {
          setPreviewImage(reader.result); // Set the preview image
        }
      };
      reader.readAsDataURL(file); // Read the file as a data URL
    }
  };

  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  return (
    <div className="lg:col-span-2">
      <div className="bg-white border border-neutral-200/20 rounded-lg p-6">
        {/* <!-- Profile Section --> */}
        <Form method="post" encType="multipart/form-data" className="mb-8">
          <div className="flex items-center mb-6">
            <img
              src={previewImage}
              alt="Profile"
              className="w-20 h-20 rounded-full transition-opacity duration-300 opacity-100"
              loading="lazy"
            />
            <div className="ml-4">
              <label
                htmlFor="image"
                className="cursor-pointer bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition duration-300 inline-block"
              >
                Change Photo
              </label>
              <input
                id="image"
                type="file"
                name="image"
                className="hidden"
                accept="image/png, image/jpeg" // Accept only JPG or PNG
                onChange={handleImageChange}
              />
              <p className="text-sm text-gray-500 mt-1">JPG or PNG up to 2MB</p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Name
              </label>
              <input
                type="text"
                placeholder="John Doe"
                name="name"
                required={true}
                className="w-full px-3 py-2 border border-neutral-200/20 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                defaultValue={user?.name}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                placeholder="john@example.com"
                required={true}
                className="w-full px-3 py-2 border border-neutral-200/20 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                defaultValue={user?.email}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Company
              </label>
              <input
                type="text"
                name="company"
                placeholder="SquadTech Innovations"
                className="w-full px-3 py-2 border border-neutral-200/20 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                defaultValue={user?.company}
              />
            </div>
          </div>

          <div className="mt-6 flex items-center justify-end space-x-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition duration-300"
            >
              {isSubmitting ? "Saving Changes..." : "Save Changes"}
            </button>
          </div>
        </Form>
      </div>
    </div>
  );
};
export default ProfilePage;
