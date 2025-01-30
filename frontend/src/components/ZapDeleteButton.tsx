import customFetch from "@/utils/fetch";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const ZapDeleteButton = ({ zapId }: { zapId: string }) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [processingId, setProcessingId] = useState<string | null>(null);

  const { mutate } = useMutation({
    mutationFn: async () => {
      setProcessingId(zapId); // Set the zapId being processed
      const response = await customFetch.delete(`/zaps/${zapId}`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["zaps"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard"] });
      toast.success("Zap deleted successfully!");
      navigate("/dashboard/zaps");
    },
    onError: (error: any) => {
      const errorMessage = error?.response?.data?.msg || "Failed to delete Zap";
      toast.error(errorMessage);
    },
    onSettled: () => {
      setProcessingId(null); // Clear the processing state
    },
  });

  const isPending = processingId === zapId;

  return (
    <button
      onClick={() => !isPending && mutate()}
      disabled={isPending}
      type="button"
      className={` lg:w-auto flex btn items-center ml-3 py-3  transition-colors bg-red-500  hover:bg-red-700 text-white lg:text-white-700  ${
        isPending ? "opacity-50 cursor-not-allowed" : ""
      }`}
    >
      {isPending ? "Deleting..." : "Delete"}
    </button>
  );
};

export default ZapDeleteButton;
