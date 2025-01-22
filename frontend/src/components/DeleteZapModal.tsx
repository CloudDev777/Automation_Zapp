import ZapDeleteButton from "./ZapDeleteButton";

const DeleteZapModal = ({ zapId }: { zapId: string }) => {
  return (
    <>
      <button
        className="text-white bg-red-500 px-2 rounded-2xl border-red-500 "
        onClick={() => {
          // @ts-ignore
          document.getElementById("my_modal_6").showModal();
        }}
      >
        Delete
      </button>
      <dialog id="my_modal_6" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Delete Zap</h3>
          <p className="text-wrap py-4">
            Are you sure you want to delete this Zap? This action cannot be
            undone.
          </p>
          <div className="modal-action flex justify-start gap-2">
            <form method="dialog">
              <button className={`primary-btn btn`}>Cancel</button>
            </form>
            <ZapDeleteButton zapId={zapId} />
          </div>
        </div>
      </dialog>
    </>
  );
};
export default DeleteZapModal;
