import { Link } from "react-router-dom";

interface Props {
  title: string;
  description: string;
  butttonText: string;
  link?: string;
}
const PageHeader = ({
  title,
  description,
  butttonText,
  link = "create",
}: Props) => {
  return (
    <header className="bg-white border border-neutral-200/20 rounded-lg p-4 mb-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">{title}</h1>
          <p className="hidden lg:block text-sm text-gray-500">{description}</p>
        </div>
        <div className="flex gap-3">
          {/* <button className="border border-neutral-200/20 bg-white hover:bg-gray-50 text-gray-700 px-4 py-2 rounded-lg transition duration-300">
            Cancel
          </button> */}
          {link && (
            <Link
              to={link}
              className="border border-neutral-200/20 bg-primary hover:bg-purple-600 text-white px-4 py-2 rounded-lg transition duration-300"
            >
              {butttonText}
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};
export default PageHeader;
