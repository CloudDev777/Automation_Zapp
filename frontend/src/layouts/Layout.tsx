import { Outlet, ScrollRestoration } from "react-router-dom";

const PagesLayout = () => {
  return (
    <>
      <main>
        <Outlet />
      </main>
      <ScrollRestoration />
    </>
  );
};
export default PagesLayout;
