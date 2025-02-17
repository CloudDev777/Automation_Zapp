import { toast } from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import customFetch from "@/utils/fetch";
import { ZapStatus } from "@/lib/types";
import { AlertCircle } from "lucide-react";

interface Props {
  zapId: string;
  initialStatus: ZapStatus;
}

const ZapToggleSwitch = ({ zapId, initialStatus }: Props) => {
  const queryClient = useQueryClient();
  const toggleMutation = useMutation({
    mutationFn: async () => {
      const response = await customFetch.patch(`/zaps/${zapId}/toggle`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["zaps"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard"] });
      toast.success(
        `Zap ${
          initialStatus === "PUBLISHED" ? "paused" : "published"
        } successfully`
      );
    },
    onError: () => {
      toast.error("Failed to toggle zap status");
    },
  });

  const handleClick = () => {
    if (initialStatus === "DRAFT") {
      toast.error("Cannot toggle draft zaps. Please publish first.");
      return;
    }
    toggleMutation.mutate();
  };

  const isDisabled = initialStatus === "DRAFT" || toggleMutation.isPending;

  return (
    <div className="flex items-center space-x-2 group relative">
      <button
        onClick={handleClick}
        disabled={isDisabled}
        className={`
          relative inline-flex items-center h-6 rounded-full w-11
          transition-colors duration-200 ease-in-out
          ${initialStatus === "PUBLISHED" ? "bg-green-500" : "bg-gray-200"}
          ${
            isDisabled
              ? "opacity-50 cursor-not-allowed"
              : "cursor-pointer hover:opacity-90"
          }
          focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500
        `}
        aria-label={`Toggle zap ${
          initialStatus === "PUBLISHED" ? "off" : "on"
        }`}
      >
        <span
          className={`
            inline-block w-4 h-4 transform rounded-full bg-white shadow
            transition-transform duration-200 ease-in-out
            ${initialStatus === "PUBLISHED" ? "translate-x-6" : "translate-x-1"}
          `}
        />
      </button>
      {initialStatus === "DRAFT" && (
        <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute left-0 -top-8 bg-gray-800 text-white text-xs rounded px-2 py-1 whitespace-nowrap">
          Draft zaps cannot be toggled
        </div>
      )}
      <span
        className={`
        text-sm
        ${initialStatus === "PUBLISHED" ? "text-green-500" : "text-gray-500"}
      `}
      >
        {initialStatus === "DRAFT" && (
          <AlertCircle className="inline-block w-4 h-4 ml-1 text-gray-400" />
        )}
      </span>
    </div>
  );
};

export default ZapToggleSwitch;
