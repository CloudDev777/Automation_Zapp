import { PageHeader, ZapListTable } from "@/components";

const ZapsPage = () => {
  return (
    <>
      <PageHeader
        title="Zaps"
        link={"create"}
        description="Create and customize your automation workflow"
        butttonText="Create"
      />
      <ZapListTable />
    </>
  );
};
export default ZapsPage;
