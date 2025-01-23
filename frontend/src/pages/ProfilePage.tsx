const ProfilePage = () => {
  return (
    <div className="lg:col-span-2">
      <div className="bg-white border border-neutral-200/20 rounded-lg p-6">
        {/* <!-- Profile Section --> */}
        <div className="mb-8">
          <div className="flex items-center mb-6">
            <img
              src="/avatar.png"
              alt="Profile"
              className="w-20 h-20 rounded-full transition-opacity duration-300 opacity-100"
              loading="lazy"
            />
            <div className="ml-4">
              <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition duration-300">
                Change Photo
              </button>
              <p className="text-sm text-gray-500 mt-1">JPG or PNG up to 2MB</p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Name
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-neutral-200/20 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                value="John Doe"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                className="w-full px-3 py-2 border border-neutral-200/20 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                value="john@example.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Company
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-neutral-200/20 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                value="Acme Inc."
              />
            </div>
          </div>

          <div className="mt-6 flex items-center justify-end space-x-4">
            <button className="px-4 py-2 border border-neutral-200/20 rounded-lg text-gray-700 hover:bg-gray-50 transition duration-300">
              Cancel
            </button>
            <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition duration-300">
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ProfilePage;
