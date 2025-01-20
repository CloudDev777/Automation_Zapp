const PageHeader = () => {
  return (
    <header className="bg-white border border-neutral-200/20 rounded-lg p-4 mb-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Workflow Builder</h1>
          <p className="text-sm text-gray-500">
            Create and customize your automation workflow
          </p>
        </div>
        <div className="flex gap-3">
          <button className="border border-neutral-200/20 bg-white hover:bg-gray-50 text-gray-700 px-4 py-2 rounded-lg transition duration-300">
            s Cancel
          </button>
          <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition duration-300">
            Save Workflow
          </button>
        </div>
      </div>
    </header>
  );
};
export default PageHeader;
