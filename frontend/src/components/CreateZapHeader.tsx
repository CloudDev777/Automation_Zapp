import { useNavigate } from "react-router-dom";
import customFetch from "@/utils/fetch";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { useWorkflowStore } from "@/store/workflowStore";

const CreateZapHeader = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { resetWorkflow } = useWorkflowStore();
  const createZapMutation = useMutation({
    mutationFn: async () => {
      const response = await customFetch.post("/zaps");
      return response.data;
    },
    onSuccess: (data) => {
      resetWorkflow();
      queryClient.invalidateQueries({ queryKey: ["zaps"] });
      navigate(`/dashboard/zaps/draft/${data.zap.id}`);
    },
    onError: (error) => {
      console.error("Error creating Zap:", error);
      // You could add toast notification or error handling here
    },
  });

  return (
    <header className="bg-white border border-neutral-200/20 rounded-lg p-4 mb-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Create Zap</h1>
          <p className="hidden lg:block text-sm text-gray-500">
            Set up your automation
          </p>
        </div>
        <button
          onClick={() => createZapMutation.mutate()}
          disabled={createZapMutation.isPending}
          className={`border border-neutral-200/20 bg-primary hover:bg-purple-600 text-white px-4 py-2 rounded-lg transition duration-300 ${
            createZapMutation.isPending ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {createZapMutation.isPending ? "Creating..." : "Create"}
        </button>
      </div>
    </header>
  );
};

export default CreateZapHeader;
