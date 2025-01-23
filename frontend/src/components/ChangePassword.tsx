import { Form } from "react-router-dom";

const ChangePassword = () => {
  return (
    <div className="lg:col-span-2">
      <div className="bg-white border border-neutral-200/20 rounded-lg p-6">
        {/* <!-- Profile Section --> */}
        <Form className="mb-8">
          <div className="grid grid-cols-1 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Old Password
              </label>
              <input
                type="text"
                placeholder="********"
                className="w-full px-3 py-2 border border-neutral-200/20 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                New Password
              </label>
              <input
                type="text"
                placeholder="********"
                className="w-full px-3 py-2 border border-neutral-200/20 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Confirm Password
              </label>
              <input
                type="text"
                placeholder="********"
                className="w-full px-3 py-2 border border-neutral-200/20 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>
          </div>

          <div className="mt-6 flex items-center justify-end space-x-4">
            <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition duration-300">
              Save Changes
            </button>
          </div>
        </Form>
      </div>
    </div>
  );
};
export default ChangePassword;
