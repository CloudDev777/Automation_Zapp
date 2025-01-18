import { Outlet } from "react-router-dom";

const DashboardLayout = () => {
  return (
    <>
      <main>
        <Outlet />
      </main>
    </>
  );
};
export default DashboardLayout;
