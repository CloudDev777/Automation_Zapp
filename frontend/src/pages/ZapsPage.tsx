import { PageHeader, ZapListTable } from "@/components";
import { zapsQuery } from "@/lib/queries";
import { QueryClient, useQuery } from "@tanstack/react-query";
import { redirect } from "react-router-dom";

export const loader = (queryClient: QueryClient) => async () => {
  try {
    const { data } = await queryClient.ensureQueryData(zapsQuery);
    return data;
  } catch (error) {
    return redirect("/");
  }
};

const ZapsPage = () => {
  const { data } = useQuery(zapsQuery);
  return (
    <>
      <PageHeader
        title="Zaps"
        link={"create"}
        description="Create and customize your automation workflow"
        butttonText="Create"
      />
      <ZapListTable zaps={data?.zaps} />
    </>
  );
};
export default ZapsPage;
