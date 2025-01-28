import { Construction } from "lucide-react";

const ComingSoon = () => {
    
  return (
    <div className="flex lg:col-span-2 flex-col items-center justify-center p-8 bg-white rounded-lg border border-neutral-200/20 min-h-full w-full">
      <div className="h-20 w-20 bg-amber-100 rounded-full flex items-center justify-center mb-6">
        <Construction className="h-10 w-10 text-amber-600" />
      </div>
      <h2 className="text-2xl font-bold text-gray-900 mb-3">Coming Soon</h2>
      <p className="text-gray-500 text-center max-w-md mb-8">
        We're working hard to bring you something amazing. Stay tuned for
        exciting new features and improvements.
      </p>
      <div className="flex flex-col items-center gap-4">
        <p className="text-sm text-gray-400">
          Want to be notified when we launch?
        </p>
        <div className="flex flex-col md:flex-row gap-3">
          <input
            type="email"
            placeholder="Enter your email"
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 "
          />
          <button className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors">
            Notify Me
          </button>
        </div>
      </div>
    </div>
  );
};
export default ComingSoon;
