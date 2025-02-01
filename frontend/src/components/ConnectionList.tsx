import React from "react";
import { useQuery } from "@tanstack/react-query";
import { connectionsQuery } from "@/lib/queries";
import ConnectionSelector from "./ConnectionSelector";

const ConnectionList = ({ appId }: { appId: string }) => {
  const { data, isLoading } = useQuery(connectionsQuery(appId));
  const connections = data?.connections;
  const [selectedConnection, setSelectedConnection] = React.useState<
    string | null
  >(null);

  if (isLoading) return <p>Loading connections...</p>;

  return (
    <div className="p-4 border rounded-lg bg-white">
      <h3 className="text-lg font-semibold mb-2">Available Connections</h3>

      {connections?.length === 0 ? (
        <div className="text-center p-4 border rounded-lg bg-gray-50">
          <p>No connections found.</p>
          <button className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
            Sign in to connect
          </button>
        </div>
      ) : (
        <ConnectionSelector
          connections={connections}
          selectedConnection={selectedConnection}
          onSelectConnection={setSelectedConnection}
        />
      )}
    </div>
  );
};

export default ConnectionList;
