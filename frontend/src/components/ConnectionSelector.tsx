const ConnectionSelector = ({
  connections = [],
  selectedConnection,
  onSelectConnection,
}: {
  connections: any[];
  selectedConnection: string | null;
  onSelectConnection: (id: string) => void;
}) => {
  return (
    <div className="space-y-3 h-[100px] overflow-auto">
      {connections?.map((conn) => {
        console.log(conn);
        return (
          <div
            key={conn.id}
            className={`p-3 border rounded-md  cursor-pointer ${
              selectedConnection === conn.id
                ? "bg-blue-100 border-blue-500"
                : "hover:bg-gray-50"
            }`}
            onClick={() => onSelectConnection(conn.id)}
          >
            <span>
              {conn.user.name} - {conn.user.email}
            </span>
            {selectedConnection === conn.id && (
              <span className="ml-2 text-green-600">✔ Selected</span>
            )}
          </div>
        );
      })}
    </div>
  );
};
export default ConnectionSelector;
