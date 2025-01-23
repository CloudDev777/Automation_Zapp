export const ZapLayoutSkeleton = () => {
  return (
    <div className="animate-pulse">
      {/* Header */}
      <div className="bg-white border border-neutral-200/20 rounded-lg p-4 mb-6">
        <div className="flex justify-between items-center">
          <div>
            <div className="h-6 bg-gray-200 rounded w-36 mb-2"></div>
            <div className="hidden lg:block h-4 bg-gray-200 rounded w-64"></div>
          </div>
          <div className="h-8 bg-gray-200 rounded w-20"></div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg border border-neutral-200/20 overflow-hidden">
        {/* Table Header */}
        <div className="p-6 border-b border-neutral-200/20">
          <div className="h-6 bg-gray-200 rounded w-32"></div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left">
                  <div className="h-4 bg-gray-200 rounded w-20"></div>
                </th>
                <th className="px-6 py-3 text-left">
                  <div className="h-4 bg-gray-200 rounded w-16"></div>
                </th>
                <th className="px-6 py-3 text-left">
                  <div className="h-4 bg-gray-200 rounded w-20"></div>
                </th>
                <th className="px-6 py-3 text-left">
                  <div className="h-4 bg-gray-200 rounded w-16"></div>
                </th>
              </tr>
            </thead>
            {/* Table Rows */}
            <tbody className="bg-white divide-y divide-neutral-200/20">
              {Array.from({ length: 7 }).map((_, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 bg-gray-200 rounded-full"></div>
                      <div className="ml-4">
                        <div className="h-4 bg-gray-200 rounded w-36 mb-1"></div>
                        <div className="h-3 bg-gray-200 rounded w-24"></div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="h-4 bg-gray-200 rounded w-16"></div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="h-4 bg-gray-200 rounded w-24"></div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex gap-3">
                      <div className="h-6 bg-gray-200 rounded w-12"></div>
                      <div className="h-6 bg-gray-200 rounded w-12"></div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export const SettingsLayoutSkeletonMain = () => {
  return (
    <div className="lg:col-span-2">
      <div className="bg-white border border-neutral-200/20 rounded-lg p-6 space-y-6">
        {/* <!-- Profile Section Skeleton --> */}
        <div className="flex items-center mb-6 space-x-4">
          <div className="w-20 h-20 bg-gray-300 rounded-full"></div>
          <div>
            <div className="h-8 w-32 bg-gray-300 rounded"></div>
            <div className="h-4 w-24 bg-gray-300 rounded mt-2"></div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6">
          <div>
            <div className="h-4 w-28 bg-gray-300 rounded mb-2"></div>
            <div className="h-10 bg-gray-300 rounded"></div>
          </div>
          <div>
            <div className="h-4 w-36 bg-gray-300 rounded mb-2"></div>
            <div className="h-10 bg-gray-300 rounded"></div>
          </div>
          <div>
            <div className="h-4 w-32 bg-gray-300 rounded mb-2"></div>
            <div className="h-10 bg-gray-300 rounded"></div>
          </div>
          <div>
            <div className="h-4 w-40 bg-gray-300 rounded mb-2"></div>
            <div className="h-10 bg-gray-300 rounded"></div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end space-x-4">
          <div className="h-10 w-24 bg-gray-300 rounded"></div>
          <div className="h-10 w-32 bg-gray-300 rounded"></div>
        </div>
      </div>
    </div>
  );
};

export const SettingsLayoutSkeletonNavbar = () => {
  return (
    <div className="lg:col-span-1">
      <div className="bg-white border border-neutral-200/20 rounded-lg p-4">
        <div className="space-y-3">
          <div className="flex items-center px-4 py-2 rounded-lg bg-gray-200">
            <div className="w-5 h-5 bg-gray-300 rounded-full mr-3"></div>
            <div className="h-4 w-24 bg-gray-300 rounded"></div>
          </div>
          <div className="flex items-center px-4 py-2 rounded-lg bg-gray-200">
            <div className="w-5 h-5 bg-gray-300 rounded-full mr-3"></div>
            <div className="h-4 w-28 bg-gray-300 rounded"></div>
          </div>
          <div className="flex items-center px-4 py-2 rounded-lg bg-gray-200">
            <div className="w-5 h-5 bg-gray-300 rounded-full mr-3"></div>
            <div className="h-4 w-20 bg-gray-300 rounded"></div>
          </div>
          <div className="flex items-center px-4 py-2 rounded-lg bg-gray-200">
            <div className="w-5 h-5 bg-gray-300 rounded-full mr-3"></div>
            <div className="h-4 w-32 bg-gray-300 rounded"></div>
          </div>
        </div>
      </div>
    </div>
  );
};
