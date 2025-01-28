import { PageHeader } from "@/components";

const DashboardPage = () => {
  return (
    <div>
      <PageHeader
        link={"zaps"}
        butttonText="Create Zap"
        title="Dashboard"
        description="Welcome to your dashboard"
      />
    </div>
  );
};
export default DashboardPage;
