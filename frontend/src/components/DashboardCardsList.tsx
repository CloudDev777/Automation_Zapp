import { dashboardQuery } from "@/lib/queries";
import { useQuery } from "@tanstack/react-query";
import { CircleCheck, QrCode, Zap } from "lucide-react";

const DashboardCardsList = () => {
  const { data, isLoading } = useQuery(dashboardQuery);
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
      <div className="bg-white p-6 rounded-lg border border-neutral-200/20">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Active Zaps</p>
            <h3 className="text-2xl font-bold text-gray-800">
              {isLoading ? "0" : data.activeZaps}
            </h3>
          </div>
          <div className="p-3 bg-purple-100 rounded-full">
            <Zap className="text-purple-600 h-5 w-5" />
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg border border-neutral-200/20">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Total Executions</p>
            <h3 className="text-2xl font-bold text-gray-800">
              {isLoading ? "0" : data.totalZaps}
            </h3>
          </div>
          <div className="p-3 bg-green-100 rounded-full">
            <CircleCheck className="text-green-600 h-5 w-5" />
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg border border-neutral-200/20">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Connected Apps</p>
            <h3 className="text-2xl font-bold text-gray-800">0</h3>
          </div>
          <div className="p-3 bg-blue-100 rounded-full">
            <QrCode className="text-blue-600 h-5 w-5" />
          </div>
        </div>
      </div>
    </div>
  );
};
export default DashboardCardsList;
