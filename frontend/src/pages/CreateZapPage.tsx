import { ZapPublishButton } from "@/components";
import { availableActionsQuery, availableTriggersQuery } from "@/lib/queries";
import { useWorkflowStore } from "@/store/workflowStore";
import useZapCreationStore from "@/store/zapStore";
import { QueryClient, useQuery } from "@tanstack/react-query";
import { X } from "lucide-react";
import React from "react";
import { redirect } from "react-router-dom";

export const loader = (queryClient: QueryClient) => async () => {
  try {
    const { data: triggers } = await queryClient.ensureQueryData(
      availableTriggersQuery
    );
    const { data: actions } = await queryClient.ensureQueryData(
      availableActionsQuery
    );
    return { triggers, actions };
  } catch (error) {
    return redirect("/");
  }
};

const BlockComponent = ({
  id,
  index,
  type,
}: {
  id: string;
  type: "trigger" | "action";
  index?: number;
}) => {
  const openModal = useWorkflowStore((state) => state.openModal);

  const blockStyles =
    type === "trigger"
      ? "bg-blue-100 border-2 border-blue-200 text-blue-700"
      : "bg-green-100 border-2 border-green-200 text-green-700";

  return (
    <div
      onClick={() => openModal(id)}
      className={`${blockStyles} cursor-pointer rounded-lg p-4 w-64 mx-auto hover:shadow-lg transition-all`}
    >
      <div className="flex items-center justify-between">
        <h3 className="font-semibold capitalize">
          {type === "trigger" ? "Trigger" : `${index}. Action`}
        </h3>
        <button
          className={`${
            type === "trigger"
              ? "text-blue-600 hover:text-blue-800"
              : "text-green-600 hover:text-green-800"
          }`}
        ></button>
      </div>
      <p
        className={`text-sm mt-2 ${
          type === "trigger" ? "text-blue-600" : "text-green-600"
        }`}
      >
        Configure your {type}
      </p>
    </div>
  );
};

const ConfigModal = () => {
  const { blocks, modalState, closeModal, updateBlock } = useWorkflowStore();
  const currentBlock = blocks.find((block) => block.id === modalState.blockId);

  const { data: triggersData } = useQuery(availableTriggersQuery);
  const { data: actionsData } = useQuery(availableActionsQuery);

  const [selectedId, setSelectedId] = React.useState("");
  const [metadata, setMetadata] = React.useState("");

  const { setTriggerId, addAction } = useZapCreationStore();

  React.useEffect(() => {
    if (currentBlock) {
      setSelectedId(getItemName(currentBlock.selectedId || ""));
      setMetadata(currentBlock.metadata || "");
    }
  }, [currentBlock]);

  const handleSave = () => {
    if (modalState.blockId) {
      updateBlock(modalState.blockId, {
        selectedId,
        metadata,
      });

      // If it's a trigger, update triggerId
      if (currentBlock?.type === "trigger") {
        setTriggerId(selectedId);
      } else {
        // If it's an action, find its index and update/add accordingly
        const actionIndex = blocks
          .filter((block) => block.type === "action")
          .findIndex((block) => block.id === modalState.blockId);

        if (actionIndex !== -1) {
          addAction(selectedId, metadata);
        }
      }
    }
    closeModal();
  };
  const getItemName = (id: string) => {
    if (currentBlock?.type === "trigger") {
      return (
        triggersData?.availableTriggers.find((t: any) => t.id === id)?.name ||
        ""
      );
    }
    return (
      actionsData?.availableActions.find((a: any) => a.id === id)?.name || ""
    );
  };

  return modalState.isOpen ? (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 w-96 mx-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">
            Configure {currentBlock?.type === "trigger" ? "Trigger" : "Action"}
          </h2>
          <button
            onClick={closeModal}
            className="text-gray-500 hover:text-gray-700"
          >
            <X />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Select {currentBlock?.type === "trigger" ? "Trigger" : "Action"}
            </label>
            <select
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
              value={selectedId}
              onChange={(e) => setSelectedId(e.target.value)}
            >
              <option value="">Select...</option>
              {currentBlock?.type === "trigger"
                ? triggersData?.availableTriggers.map((trigger: any) => (
                    <option key={trigger.id} value={trigger.id}>
                      {trigger.name}
                    </option>
                  ))
                : actionsData?.availableActions.map((action: any) => (
                    <option key={action.id} value={action.id}>
                      {action.name}
                    </option>
                  ))}
            </select>
          </div>

          {selectedId && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Metadata Configuration
              </label>
              <textarea
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                rows={4}
                value={metadata}
                onChange={(e) => setMetadata(e.target.value)}
                placeholder="Enter configuration metadata..."
              />
            </div>
          )}

          <div className="flex justify-end space-x-3">
            <button
              onClick={closeModal}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              disabled={!selectedId}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  ) : null;
};

const AddBlockButton = ({ onClick }: { onClick: () => void }) => (
  <div className="flex justify-center">
    <button
      onClick={onClick}
      className="bg-gray-100 hover:bg-gray-200 rounded-full p-2 transition-colors"
    >
      <svg
        className="w-6 h-6 text-gray-600"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M12 6v6m0 0v6m0-6h6m-6 0H6"
        />
      </svg>
    </button>
  </div>
);

const CreateZapPage = () => {
  const { blocks, addBlock } = useWorkflowStore();

  return (
    <>
      <ZapPublishButton
        title="Zaps"
        description="Create and customize your automation workflow"
      />
      <div
        className="bg-gray-50 rounded-lg min-h-[800px] pt-32 relative"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, #cbd5e1 1px, transparent 0)",
          backgroundSize: "20px 20px",
        }}
      >
        <div className="p-8 space-y-6">
          {blocks.map((block, index) => (
            <React.Fragment key={block.id}>
              <BlockComponent index={index} id={block.id} type={block.type} />
              {/* {index < blocks.length - 1 && (
              <AddBlockButton onClick={() => addBlock("action")} />
            )} */}
            </React.Fragment>
          ))}

          {blocks.length === 0 ? (
            <AddBlockButton onClick={() => addBlock("trigger")} />
          ) : (
            <AddBlockButton onClick={() => addBlock("action")} />
          )}
        </div>

        <ConfigModal />
      </div>
    </>
  );
};

export default CreateZapPage;
