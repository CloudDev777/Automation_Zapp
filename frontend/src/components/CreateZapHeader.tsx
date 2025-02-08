import { useNavigate } from "react-router-dom";
import customFetch from "@/utils/fetch";
import { useQueryClient } from "@tanstack/react-query";

const CreateZapHeader = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  async function handleOnClick() {
    try {
      const response = await customFetch.post("/zaps");
      const { data } = response;
      queryClient.invalidateQueries({ queryKey: ["zaps"] });
      navigate(`/dashboard/zaps/draft/${data.zap.id}`);
    } catch (error) {
      console.error("Error creating Zap:", error);
    }
  }

  return (
    <header className="bg-white border border-neutral-200/20 rounded-lg p-4 mb-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Create Zap</h1>
          <p className="hidden lg:block text-sm text-gray-500">Create a Zap</p>
        </div>
        <button
          onClick={handleOnClick}
          className="border border-neutral-200/20 bg-primary hover:bg-purple-600 text-white px-4 py-2 rounded-lg transition duration-300"
        >
          Create
        </button>
      </div>
    </header>
  );
};

export default CreateZapHeader;
