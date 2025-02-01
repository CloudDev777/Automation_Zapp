import React from "react";
import { X } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { useWorkflowStore } from "@/store/workflowStore";
import { useZapCreationStore } from "@/store/zapStore";
import {
  appsQuery,
  availableActionsQuery,
  availableTriggersQuery,
} from "@/lib/queries";
import AppSelectionModal from "./AppSelectionModal";

const EnhancedConfigModal = () => {
  const { blocks, modalState, closeModal, updateBlock } = useWorkflowStore();
  const currentBlock = blocks.find((block) => block.id === modalState.blockId);

  const { data: appsData } = useQuery(appsQuery);
  const { data: triggersData } = useQuery(availableTriggersQuery);
  const { data: actionsData } = useQuery(availableActionsQuery);

  const [selectedAppId, setSelectedAppId] = React.useState("");
  const [selectedId, setSelectedId] = React.useState("");
  const [metadata, setMetadata] = React.useState("");
  const [isConnected, setIsConnected] = React.useState(false);
  const [isAppModalOpen, setIsAppModalOpen] = React.useState(false);

  const { setTriggerId, addAction, setTriggerName } = useZapCreationStore();

  React.useEffect(() => {
    if (currentBlock) {
      setSelectedId(currentBlock.selectedId || "");
      setMetadata(currentBlock.metadata || "");
      // @ts-ignore
      setSelectedAppId(currentBlock.appId || "");
    }
  }, [currentBlock]);

  const filteredItems = React.useMemo(() => {
    if (currentBlock?.type === "trigger") {
      return triggersData?.availableTriggers.filter(
        (t: any) => t.appId === selectedAppId
      );
    }
    return actionsData?.availableActions.filter(
      (a: any) => a.appId === selectedAppId
    );
  }, [selectedAppId, currentBlock?.type, triggersData, actionsData]);

  const handleSave = () => {
    if (!isConnected) {
      alert("Please connect your account first");
      return;
    }

    if (modalState.blockId) {
      updateBlock(modalState.blockId, {
        selectedId,
        metadata,
        // @ts-ignore
        appId: selectedAppId,
      });

      if (currentBlock?.type === "trigger") {
        setTriggerId(selectedId);
        setTriggerName(getItemName(selectedId));
      } else {
        const actionIndex = blocks
          .filter((block) => block.type === "action")
          .findIndex((block) => block.id === modalState.blockId);

        if (actionIndex !== -1) {
          addAction(selectedId, metadata, getItemName(selectedId));
        }
      }
    }
    closeModal();
  };

  const handleConnect = async (appId: string) => {
    try {
      const authWindow = window.open(
        `/api/oauth/${appId}/authorize`,
        "Connect Account",
        "width=600,height=600"
      );

      window.addEventListener(
        "message",
        (event) => {
          if (event.data.type === "oauth_complete") {
            setIsConnected(true);
            if (authWindow) authWindow.close();
          }
        },
        { once: true }
      );
    } catch (error) {
      console.error("Failed to connect account:", error);
    }
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

  const getCurrentApp = () => {
    return appsData?.apps.find((app: any) => app.id === selectedAppId);
  };

  const handleAppSelect = (appId: string) => {
    setSelectedAppId(appId);
    setSelectedId("");
    setIsConnected(false);
    setIsAppModalOpen(false);
  };

  if (!modalState.isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 w-[520px] mx-4">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">
              Configure{" "}
              {currentBlock?.type === "trigger" ? "Trigger" : "Action"}
            </h2>
            <button
              onClick={closeModal}
              className="text-gray-500 hover:text-gray-700"
            >
              <X />
            </button>
          </div>

          <div className="space-y-6">
            {/* App Selection Button */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select App
              </label>
              <button
                onClick={() => setIsAppModalOpen(true)}
                className="w-full flex items-center justify-between border border-gray-300 rounded-md px-3 py-2 bg-white hover:bg-gray-50 focus:ring-2 focus:ring-blue-500"
              >
                {selectedAppId ? (
                  <span className="flex items-center">
                    {getCurrentApp()?.icon && (
                      <img
                        src={getCurrentApp()?.icon}
                        alt=""
                        className="w-5 h-5 mr-2"
                      />
                    )}
                    {getCurrentApp()?.name}
                  </span>
                ) : (
                  <span className="text-gray-500">Select an app...</span>
                )}
                <span className="text-gray-400">↓</span>
              </button>
            </div>

            {/* Connect Account Button */}
            {selectedAppId && !isConnected && (
              <div className="flex items-center justify-between bg-blue-50 p-4 rounded-lg">
                <div>
                  <h3 className="font-medium text-blue-700">
                    Connect {getCurrentApp()?.name}
                  </h3>
                  <p className="text-sm text-blue-600">
                    Authorization required to proceed
                  </p>
                </div>
                <button
                  onClick={() => handleConnect(selectedAppId)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Connect Account
                </button>
              </div>
            )}

            {/* Trigger/Action Selection */}
            {selectedAppId && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select{" "}
                  {currentBlock?.type === "trigger" ? "Trigger" : "Action"}
                </label>
                <select
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                  value={selectedId}
                  onChange={(e) => setSelectedId(e.target.value)}
                  disabled={!isConnected}
                >
                  <option value="">Select...</option>
                  {filteredItems?.map((item: any) => (
                    <option key={item.id} value={item.id}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Configuration Fields */}
            {selectedId && isConnected && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Configuration
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

            {/* Action Buttons */}
            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={closeModal}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={!selectedId || !isConnected}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>

      {isAppModalOpen && (
        <AppSelectionModal
          isOpen={isAppModalOpen}
          onClose={() => setIsAppModalOpen(false)}
          onSelectApp={handleAppSelect}
          type={currentBlock?.type || "trigger"}
        />
      )}
    </>
  );
};

export default EnhancedConfigModal;
