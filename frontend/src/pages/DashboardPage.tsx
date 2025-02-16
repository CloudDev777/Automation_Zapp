import { DashboardCardsList, PageHeader, ZapListTable } from "@/components";

const DashboardPage = () => {
  return (
    <>
      <PageHeader
        butttonText="Create Zap"
        title="Dashboard"
        description="Welcome to your dashboard"
      />
      <DashboardCardsList />
      <ZapListTable dashboard={true} />
    </>
  );
};
export default DashboardPage;
