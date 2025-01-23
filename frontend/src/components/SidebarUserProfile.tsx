import { userQuery } from "@/lib/queries";
import { useQuery } from "@tanstack/react-query";

const SideBarUserProfile = () => {
  const {
    data: { user },
  } = useQuery(userQuery);

  return (
    <div className="p-3 lg:p-6 flex items-center ">
      <img
        src="/avatar.png"
        alt="User"
        className="w-8 h-8 rounded-full transition-opacity duration-300 opacity-100"
        loading="lazy"
      />
      <div className="ml-3">
        <p className="text-sm font-medium transition-colors ">{user?.name}</p>
        <p className="text-xs transition-colors ">{user?.email}</p>
      </div>
    </div>
  );
};

export default SideBarUserProfile;
