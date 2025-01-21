import customFetch from "@/utils/fetch";
import { QueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { Form, redirect, useNavigation } from "react-router-dom";

export const action =
  (queryClient: QueryClient) =>
  async ({ params }: { params: any }) => {
    try {
      await customFetch.delete(`/zaps/${params.id}`);
      queryClient.invalidateQueries({ queryKey: ["zaps"] });
      toast.success("Zap deleted successfully!");
    } catch (error) {
      // @ts-ignore
      toast.error(error?.response?.data?.msg);
    }
    // return redirect("/dashboard/zaps");
  };

const ZapDeleteButton = ({ zapId }: { zapId: string }) => {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  return (
    <Form method="post" action={`/delete-zap/${zapId}`}>
      <button
        disabled={isSubmitting}
        type="submit"
        className="text-red-600 hover:text-red-900"
      >
        {isSubmitting ? "Deleting" : "Delete"}
      </button>
    </Form>
  );
};
export default ZapDeleteButton;
