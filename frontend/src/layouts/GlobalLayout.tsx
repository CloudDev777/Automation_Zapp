import { Outlet, ScrollRestoration } from "react-router-dom";

const GlobalLayout = () => {
  return (
    <>
      <main>
        <Outlet />
      </main>
      <ScrollRestoration />
    </>
  );
};
export default GlobalLayout;
