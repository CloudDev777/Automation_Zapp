import { X } from "lucide-react";

const ConfigModalInputModal = ({
  isOpen,
  onClose,
  type,
}: {
  isOpen: boolean;
  onClose: () => void;
  onSelectNewApp: () => void;
  initialAppId: string;
  zapId: string;
  type: "trigger" | "action";
}) => {
  if (!isOpen) return null;

  async function handleOnClick() {
    try {
      // Save config input
      // await saveConfigInput();
      onClose();
    } catch (error) {
      console.error(`Error saving ${type}:`, error);
      alert(`Failed to save ${type}. Please try again.`);
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-[520px] mx-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Configure {type} inputs</h2>
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
              Config {type}
            </label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-purple-500 focus:border-purple-500"
            />
          </div>

          <div className="flex justify-end space-x-3 mt-6">
            <button
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={handleOnClick}
              className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 disabled:opacity-50"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfigModalInputModal;
