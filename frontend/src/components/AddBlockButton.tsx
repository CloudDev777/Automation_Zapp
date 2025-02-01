const AddBlockButton = ({ onClick }: { onClick: () => void }) => (
  <div className="flex justify-center">
    <button
      onClick={onClick}
      className="bg-gray-100 hover:bg-gray-200 rounded-full p-2 transition-colors"
    >
      <svg
        className="w-6 h-6 text-gray-600"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M12 6v6m0 0v6m0-6h6m-6 0H6"
        />
      </svg>
    </button>
  </div>
);
export default AddBlockButton;
