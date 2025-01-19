import { useDashboardStore } from "@/store/dashboardStore";

const LogoutButton = () => {
  // const { user } = useDashboardStore((state) => state.user);
  const logoutUser = useDashboardStore((state) => state.logoutUser);

  return (
    <div>
      {/* <h1>Welcome {user.name}</h1> */}
      <button onClick={logoutUser}>Logout</button>
    </div>
  );
};
export default LogoutButton;
