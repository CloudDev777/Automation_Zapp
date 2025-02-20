import { useWorkflowStore } from "@/store/workflowStore";

const BlockComponent = ({
  id,
  index,
  setIsConfigModalOpen,
  type,
}: {
  id: string;
  type: "trigger" | "action";
  index?: number;
  setIsConfigModalOpen?: (value: boolean) => void;
  name?: string;
}) => {
  const openModal = useWorkflowStore((state) => state.openModal);

  const blockStyles =
    type === "trigger"
      ? "bg-blue-100 border-2 border-blue-200 text-blue-700"
      : "bg-green-100 border-2 border-green-200 text-green-700";
  index = index! + 1;

  return (
    <div
      onClick={() => {
        openModal(id);
        // @ts-ignore
        setIsConfigModalOpen((prev) => !prev);
      }}
      className={`${blockStyles} cursor-pointer rounded-lg p-4 w-64 mx-auto hover:shadow-lg transition-all`}
    >
      <div className="flex items-center justify-between">
        <h3 className="font-semibold capitalize">
          {type === "trigger" ? `${index}.  Trigger` : `${index}. Action`}
        </h3>
        <button
          className={`${
            type === "trigger"
              ? "text-blue-600 hover:text-blue-800"
              : "text-green-600 hover:text-green-800"
          }`}
        ></button>
      </div>
    </div>
  );
};

export default BlockComponent;
