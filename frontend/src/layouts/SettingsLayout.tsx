import { Outlet, useNavigation } from "react-router-dom";

import { NavLink } from "react-router-dom";
import clsx from "clsx";
import { Bell, CreditCard, Lock, LockKeyhole, User } from "lucide-react";
import {
  SettingsLayoutSkeletonMain,
  SettingsLayoutSkeletonNavbar,
} from "@/components/LoadingSkeletons";

const links = [
  {
    to: "/dashboard/settings",
    label: "Profile",
    icon: User,
  },
  {
    to: "security",
    label: "Security",
    icon: Lock,
  },
  {
    to: "billing",
    label: "Billing",
    icon: CreditCard,
  },
  {
    to: "notifications",
    label: "Notifications",
    icon: Bell,
  },
  {
    to: "password",
    label: "Change Password",
    icon: LockKeyhole,
  },
];

const SettingsLayout = () => {
  const navigation = useNavigation();
  return (
    <>
      <div>
        {/* <!-- Header --> */}
        <header className="bg-white border border-neutral-200/20 rounded-lg p-4 mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Account Settings</h1>
          <p className="text-sm text-gray-500">
            Manage your account preferences and settings
          </p>
        </header>

        {/* <!-- Settings Content --> */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* <!-- Navigation Sidebar --> */}
          <div className="lg:col-span-1">
            <div className="bg-white border border-neutral-200/20 rounded-lg">
              {navigation.state == "loading" ? (
                <SettingsLayoutSkeletonNavbar />
              ) : (
                <SettingsNav />
              )}
            </div>
          </div>
          {/* <!-- Main Settings Panel --> */}
          {navigation.state == "loading" ? (
            <SettingsLayoutSkeletonMain />
          ) : (
            <Outlet />
          )}
        </div>
      </div>
    </>
  );
};
export default SettingsLayout;

const SettingsNav = () => {
  return (
    <nav className="space-y-1 p-4">
      {links.map(({ to, label, icon: Icon }) => (
        <NavLink
          key={to}
          to={to}
          end={to === "/dashboard/settings"}
          className={({ isActive }) =>
            clsx(
              "flex items-center px-4 py-2 rounded-lg group transition-colors",
              {
                "bg-indigo-50 text-gray-900": isActive, // Apply active styles
                "text-gray-600 hover:bg-gray-50": !isActive, // Apply inactive styles
              }
            )
          }
        >
          <Icon className={clsx("mr-3 h-5 w-5")} />
          {label}
        </NavLink>
      ))}
    </nav>
  );
};
