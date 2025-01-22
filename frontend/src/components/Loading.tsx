const Loading = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="relative w-16 h-16">
        <div className="absolute w-16 h-16 border-4 border-t-purple-500 border-b-purple-300 border-l-purple-200 border-r-purple-100 rounded-full animate-spin" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-2 h-2 bg-purple-500 rounded-full" />
        </div>
      </div>
      <span className="ml-4 text-lg font-medium text-purple-700">
        Loading...
      </span>
    </div>
  );
};

export default Loading;
