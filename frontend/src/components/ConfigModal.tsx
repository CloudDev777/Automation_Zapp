import { OAUTH_GMAIL } from "@/lib/links";
import {
  appsQuery,
  availableActionsQuery,
  availableTriggersQuery,
  connectionsQuery,
} from "@/lib/queries";
import { useQuery } from "@tanstack/react-query";
import { X } from "lucide-react";
import React from "react";

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
  const { data: connectionsData } = useQuery(connectionsQuery(initialAppId));

  const [selectedId, setSelectedId] = React.useState("");
  const [showConnectionModal, setShowConnectionModal] = React.useState(false);
  const [selectedConnection, setSelectedConnection] = React.useState<{
    id: string;
    user: {
      email: string;
    };
    email: string;
  }>();

  const currentApp = appsData?.apps.find((app: any) => app.id === initialAppId);
  const connections = connectionsData?.connections || [];

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
      console.log(event.data);
      if (event.origin !== "http://localhost:3000") {
        console.error("Invalid origin:", event.origin);
        return;
      }

      if (event.data?.type === "oauth_complete" && event.data?.success) {
        console.log(event.data);
        setSelectedConnection({
          id: event.data.id,
          user: event.data,
          email: event.data.connectedEmail,
        });
        window.removeEventListener("message", messageHandler);
      } else {
        console.error("OAuth failed or incomplete data:", event.data);
      }
    };

    window.addEventListener("message", messageHandler);
  };

  const ConnectionModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-[400px]">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Select Connection</h3>
          <button
            onClick={() => setShowConnectionModal(false)}
            className="text-gray-500 hover:text-gray-700"
          >
            <X />
          </button>
        </div>
        <div className="space-y-4">
          {connections.map((connection: any) => (
            <button
              key={connection.id}
              onClick={() => {
                console.log(connection.id);
                setSelectedConnection({
                  id: connection.id,
                  user: connection.user,
                  email: connection.connectedEmail,
                });
                setShowConnectionModal(false);
              }}
              className="w-full p-3 text-left border rounded-lg hover:bg-gray-50 flex items-center justify-between"
            >
              <span>{connection.connectedEmail}</span>
              {selectedConnection === connection.id && (
                <span className="text-blue-600">✓</span>
              )}
            </button>
          ))}
          <button
            onClick={handleConnect}
            className="px-4 py-2  bg-blue-600 te  xt-white rounded-md w-full hover:bg-blue-700"
          >
            Add New Account
          </button>
        </div>
      </div>
    </div>
  );

  if (!isOpen) return null;
  console.log("selectedConnection: ", selectedConnection);
  console.log("selectedId: ", selectedId);
  console.log("connections: ", connections);
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

          <div className="flex items-center justify-between bg-blue-50 p-4 rounded-lg">
            <div>
              <h3 className="font-medium text-blue-700">
                {selectedConnection?.id
                  ? `Connected as ${selectedConnection.email}`
                  : `Connect ${currentApp?.name}`}
              </h3>
              <p className="text-sm text-blue-600">
                {selectedConnection?.id
                  ? "Account connected successfully"
                  : "Authorization required to proceed"}
              </p>
            </div>
            {connections.length > 0 ? (
              <button
                onClick={() => setShowConnectionModal(true)}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Select
              </button>
            ) : (
              <button
                onClick={handleConnect}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Connect
              </button>
            )}
          </div>

          <div className="flex justify-end space-x-3 mt-6">
            <button
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
              disabled={!selectedId}
            >
              Save
            </button>
          </div>
        </div>
      </div>
      {showConnectionModal && <ConnectionModal />}
    </div>
  );
};

export default ConfigModal;
