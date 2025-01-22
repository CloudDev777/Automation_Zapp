import customFetch from "@/utils/fetch";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { LoaderIcon } from "lucide-react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const ZapDeleteButton = ({ zapId }: { zapId: string }) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate, isPending } = useMutation({
    mutationFn: async () => {
      const response = await customFetch.delete(`/zaps/${zapId}`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["zaps"] });
      toast.success("Zap deleted successfully!");
      navigate("/dashboard/zaps");
    },
    onError: (error: any) => {
      const errorMessage = error?.response?.data?.msg || "Failed to delete Zap";
      toast.error(errorMessage);
    },
  });

  return (
    <button
      onClick={() => mutate()}
      disabled={isPending}
      type="button"
      className="text-red-600 hover:text-red-900"
    >
      {isPending ? <LoaderIcon /> : "Delete"}
    </button>
  );
};

export default ZapDeleteButton;
