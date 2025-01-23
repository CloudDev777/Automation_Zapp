import { Zap as ZapType } from "@/lib/types";
import { Loader, Zap } from "lucide-react";
import { useNavigation } from "react-router-dom";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import DeleteZapModal from "./DeleteZapModal";

const ZapListTable = ({ zaps }: { zaps: ZapType[] }) => {
  dayjs.extend(relativeTime);
  const navigation = useNavigation();
  const isPageLoading = navigation.state === "loading";
  return (
    <>
      {!isPageLoading ? (
        <>
          {zaps.length > 0 ? (
            <>
              <div className="bg-white rounded-lg border border-neutral-200/20 overflow-hidden">
                <div className="p-6 border-b border-neutral-200/20">
                  <h2 className="text-lg font-semibold text-gray-800">
                    Recent Zaps
                  </h2>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Name
                        </th>
                        <th className="hidden md:block px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Last Run
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-neutral-200/20">
                      {zaps.map((zap) => {
                        const createdFromNow = dayjs(zap.createdAt).fromNow();
                        return (
                          <tr key={zap.id}>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <div className="flex-shrink-0 h-10 w-10 bg-indigo-100 rounded-full flex items-center justify-center">
                                  <Zap className="w-6 h-6 text-indigo-600" />
                                </div>
                                <div className="ml-4">
                                  <div className="text-sm font-medium text-gray-900">
                                    {zap.zapName}
                                  </div>
                                  <div className="text-sm text-gray-500">
                                    {zap.trigger.type.name} →{" "}
                                    {zap.actions
                                      .map((action) => action.type.name)
                                      .join(" → ")}{" "}
                                    {/*TODO: Add icons instead of names */}
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap hidden md:block">
                              <span className="px-2 inline-flex text-xs leading-5 mt-3 font-semibold rounded-full bg-green-100 text-green-800">
                                {zap.isActive ? "Active" : "Inactive"}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {/* @ts-ignore */}
                              {createdFromNow}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                              {/* //TODO: Add START button */}
                              <DeleteZapModal zapId={zap.id} />
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          ) : (
            "No zaps, create one!"
          )}
        </>
      ) : (
        <Loader />
      )}
    </>
  );
};
export default ZapListTable;
