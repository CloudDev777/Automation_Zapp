interface Props {
  title: string;
  description: string;
  butttonText: string;
}
const PageHeader = ({ title, description }: Props) => {
  return (
    <header className="bg-white border border-neutral-200/20 rounded-lg p-4 mb-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">{title}</h1>
          <p className="hidden lg:block text-sm text-gray-500">{description}</p>
        </div>
      </div>
    </header>
  );
};
export default PageHeader;
