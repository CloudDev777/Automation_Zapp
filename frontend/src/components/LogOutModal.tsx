import { useDashboardStore } from "@/store/dashboardStore";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import LogoutButton from "./LogoutButton";
import { LogOutIcon } from "lucide-react";


const LogOutModal = () => {
  const { logoutUser } = useDashboardStore();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return (
    <>
      <button
        className="w-full flex items-center px-6 py-3 text-gray-700 transition-colors hover:bg-purple-700 hover:text-white"
        onClick={() => {
          // @ts-ignore
          document.getElementById("my_modal_5").showModal();
        }}
      >
        <LogOutIcon className="w-5 h-5 mr-3" />
        Logout
      </button>
      <dialog
        id="my_modal_5"
        className="modal modal-bottom sm:modal-middle z-index-999"
      >
        <div className="modal-box">
          <h3 className="font-bold text-lg">Log Out</h3>
          <p className="py-4">
            Are you sure you want to log out? This action will end your current
            session.
          </p>
          <div className="modal-action">
            <form method="dialog" className="flex gap-3">
              {/* If there is a button in form, it will close the modal */}
              {/* Logout Button */}
              <button className="btn">Cancel</button>
              <LogoutButton
                logoutUser={logoutUser}
                queryClient={queryClient}
                navigate={navigate}
              />
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
};
export default LogOutModal;
