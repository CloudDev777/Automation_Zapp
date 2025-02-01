import { OAUTH_GMAIL } from "@/lib/links";
import {
  appsQuery,
  availableActionsQuery,
  availableTriggersQuery,
} from "@/lib/queries";
import { useQuery } from "@tanstack/react-query";
import { X } from "lucide-react";
import React from "react";
import ConnectionList from "./ConnectionList";

// ConfigurationModal.tsx
const ConfigModal = ({
  isOpen,
  onClose,
  onSelectNewApp,
  initialAppId,
  type,
}: {
  isOpen: boolean;
  onClose: () => void;
  onSelectNewApp: () => void;
  initialAppId: string;
  type: "trigger" | "action";
}) => {
  const { data: appsData } = useQuery(appsQuery);
  const { data: triggersData } = useQuery(availableTriggersQuery);
  const { data: actionsData } = useQuery(availableActionsQuery);

  const [selectedId, setSelectedId] = React.useState("");
  const [isConnected, setIsConnected] = React.useState(false);
  const currentApp = appsData?.apps.find((app: any) => app.id === initialAppId);

  const filteredItems = React.useMemo(() => {
    if (type === "trigger") {
      return triggersData?.availableTriggers.filter(
        (t: any) => t.appId === initialAppId
      );
    }
    return actionsData?.availableActions.filter(
      (a: any) => a.appId === initialAppId
    );
  }, [initialAppId, type, triggersData, actionsData]);

  const [connectedEmail, setConnectedEmail] = React.useState("");

  const handleConnect = async () => {
    const authWindow = window.open(
      OAUTH_GMAIL,
      "Connect the account",
      "width=600,height=600"
    );

    if (!authWindow) {
      alert("Popup blocked! Allow popups and try again.");
      return;
    }

    const messageHandler = (event: MessageEvent) => {

      if (event.origin !== "http://localhost:3000") {
        console.error("Invalid origin:", event.origin);
        return;
      }

      if (event.data?.type === "oauth_complete" && event.data?.success) {
        setIsConnected(true);
        setConnectedEmail(event.data.email); // Store the connected email
        window.removeEventListener("message", messageHandler);
      } else {
        console.error("OAuth failed or incomplete data:", event.data);
      }
    };

    window.addEventListener("message", messageHandler);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-[520px] mx-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Configure {type}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X />
          </button>
        </div>

        <div className="space-y-6">
          {/* App Selection Button */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Selected App
            </label>
            <div className="flex items-center space-x-3">
              <div className="flex-1 px-3 py-2 border rounded-md bg-gray-50">
                <div className="flex items-center">
                  {currentApp?.icon && (
                    <img
                      src={currentApp.icon}
                      alt=""
                      className="w-5 h-5 mr-2"
                    />
                  )}
                  <span>{currentApp?.name}</span>
                </div>
              </div>
              <button
                onClick={onSelectNewApp}
                className="px-4 py-2 text-sm border rounded-md hover:bg-gray-50"
              >
                Change App
              </button>
            </div>
          </div>

          {/* Trigger/Action Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select {type}
            </label>
            <select
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
              value={selectedId}
              onChange={(e) => setSelectedId(e.target.value)}
            >
              <option value="">Select...</option>
              {filteredItems?.map((item: any) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>

          {/* Connect Account Button */}
          <div className="flex items-center justify-between bg-blue-50 p-4 rounded-lg">
            <div>
              <h3 className="font-medium text-blue-700">
                {isConnected
                  ? `Connected as ${connectedEmail}`
                  : `Connect ${currentApp?.name}`}
              </h3>
              <p className="text-sm text-blue-600">
                {isConnected
                  ? "You are connected"
                  : "Authorization required to proceed"}
              </p>
            </div>
            <button
              onClick={handleConnect}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              {isConnected ? "Connected" : "Connect Account"}
            </button>
          </div>
          <ConnectionList appId={initialAppId} />
          {/* Action Buttons */}
          <div className="flex justify-end space-x-3 mt-6">
            <button
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
              disabled={!selectedId || !isConnected}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ConfigModal;
