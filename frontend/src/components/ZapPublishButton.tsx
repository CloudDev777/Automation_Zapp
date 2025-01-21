import { X } from "lucide-react";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router-dom";
import useZapCreationStore from "@/store/zapStore";
import customFetch from "@/utils/fetch";
import toast from "react-hot-toast";
import { useWorkflowStore } from "@/store/workflowStore";

// You'll need to create this type based on your API response
type PublishResponse = {
  success: boolean;
  message: string;
};

const PublishModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const [zapName, setLocalZapName] = useState("");
  const [error, setError] = useState("");
  const { setZapName, zapData, resetZap } = useZapCreationStore();
  const { resetWorkflow } = useWorkflowStore();
  const navigate = useNavigate();

  const queryClient = useQueryClient();
  // Add your API mutation

  const publishMutation = useMutation<PublishResponse, Error, typeof zapData>({
    mutationFn: async (data) => {
      const response = await customFetch.post("/zaps", data);
      return response.data;
    },
    onSuccess: () => {
      resetZap();
      navigate("/dashboard/zaps");
      queryClient.invalidateQueries({ queryKey: ["zaps"] });
      toast.success("Zap published successfully");
      resetWorkflow();
      console.log(zapData);
    },
    onError: (error) => {
      setError(error.message);
    },
  });

  const handlePublish = () => {
    if (!zapName.trim()) {
      setError("Please enter a zap name");
      return;
    }

    setError("");
    setZapName(zapName);

    const payload = { ...zapData, zapName }; // Include the updated zapName
    publishMutation.mutate(payload);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-96 mx-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Publish Zap</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Zap Name
            </label>
            <input
              type="text"
              value={zapName}
              onChange={(e) => setLocalZapName(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter zap name..."
            />
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
          </div>

          <div className="flex justify-end space-x-3">
            <button
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={handlePublish}
              disabled={publishMutation.isPending}
              className="px-4 py-2 bg-primary hover:bg-purple-600 text-white rounded-lg transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {publishMutation.isPending ? "Publishing..." : "Publish"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

interface Props {
  title: string;
  description: string;
}

const ZapPublishButton = ({ title, description }: Props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const zapData = useZapCreationStore((state) => state.zapData);

  // Validation function to check if we have required data
  const isPublishEnabled = () => {
    const hasActions = zapData.actions.length > 0;
    const hasTriggerId = Boolean(zapData.availableTriggerId);

    return hasActions && hasTriggerId;
  };
  zapData;

  return (
    <>
      <header className="bg-white border border-neutral-200/20 rounded-lg p-4 mb-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">{title}</h1>
            <p className="hidden lg:block text-sm text-gray-500">
              {description}
            </p>
          </div>
          <div className="flex gap-3">
            <Link
              to="/dashboard/zaps"
              className="border border-neutral-200/20 bg-white hover:bg-gray-50 text-gray-700 px-4 py-2 rounded-lg transition duration-300"
            >
              Back
            </Link>
            <button
              onClick={() => setIsModalOpen(true)}
              disabled={!isPublishEnabled()}
              className="border border-neutral-200/20 bg-primary hover:bg-purple-600 text-white px-4 py-2 rounded-lg transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-primary"
              title={
                !isPublishEnabled()
                  ? "Please configure trigger and at least one action"
                  : "Publish zap"
              }
            >
              Publish
            </button>
          </div>
        </div>
      </header>

      <PublishModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};

export default ZapPublishButton;
