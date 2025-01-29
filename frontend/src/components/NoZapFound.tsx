import { Zap } from "lucide-react";
import { Link } from "react-router-dom";

const NoZapFound = () => {
  return (
    <div className="flex flex-col items-center justify-center p-8 bg-white rounded-lg border border-neutral-200/20 min-h-[300px]">
      <div className="h-16 w-16 bg-purple-100 rounded-full flex items-center justify-center mb-4">
        <Zap className="h-8 w-8 text-purple-600" />
      </div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">
        No Zaps Found
      </h3>
      <p className="text-gray-500 text-center max-w-md mb-6">
        Looks like you haven't created any zaps yet. Start automating your
        workflow by creating your first zap.
      </p>
      <Link
        to={"/dashboard/zaps/create"}
        className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition-colors"
      >
        Create Your First Zap
      </Link>
    </div>
  );
};
export default NoZapFound;
