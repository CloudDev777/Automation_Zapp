import { userQuery } from "@/lib/queries";
import { useQuery } from "@tanstack/react-query";
import clsx from "clsx";
import { NavLink } from "react-router-dom";

const SideBarUserProfile = () => {
  const {
    data: { user },
  } = useQuery(userQuery);

  return (
    <NavLink
      to={"profile"}
      className={({ isActive }) =>
        clsx(
          "nav-link flex items-center text-gray-700 transition-colors hover:bg-purple-700 hover:text-white",
          {
            "bg-purple-700 text-white": isActive,
            "text-gray-700": !isActive,
          }
        )
      }
    >
      {({ isActive }) => (
        <div className="p-3 lg:p-6 flex items-center group">
          <img
            src="/avatar.png"
            alt="User"
            className="w-8 h-8 rounded-full transition-opacity duration-300 opacity-100"
            loading="lazy"
          />
          <div className="ml-3">
            <p
              className={clsx(
                "text-sm font-medium transition-colors group-hover:text-white",
                {
                  "text-white": isActive,
                  "text-gray-700": !isActive,
                }
              )}
            >
              {user?.name}
            </p>
            <p
              className={clsx(
                "text-xs transition-colors group-hover:text-white",
                {
                  "text-white": isActive,
                  "text-gray-500": !isActive,
                }
              )}
            >
              {user?.email}
            </p>
          </div>
        </div>
      )}
    </NavLink>
  );
};

export default SideBarUserProfile;
