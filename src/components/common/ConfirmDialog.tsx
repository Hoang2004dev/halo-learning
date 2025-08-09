import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useRef } from "react";

interface ConfirmDialogProps {
  open: boolean;
  title?: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  onCancel: () => void;
  onConfirm: () => void;
  loading?: boolean;
  danger?: boolean; // làm đỏ nút/viền khi là hành động nguy hiểm
}

const ConfirmDialog = ({
  open,
  title = "Confirm",
  message,
  confirmText = "Confirm",
  cancelText = "Cancel",
  onCancel,
  onConfirm,
  loading = false,
  danger = true,
}: ConfirmDialogProps) => {
  const cancelButtonRef = useRef<HTMLButtonElement | null>(null);

  return (
    <Transition appear show={open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-[100]"
        onClose={() => {
          if (!loading) onCancel();
        }}
        initialFocus={cancelButtonRef}
      >
        {/* Backdrop */}
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-150"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-120"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/40" />
        </Transition.Child>

        {/* Panel */}
        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-200"
              enterFrom="opacity-0 scale-95 translate-y-1"
              enterTo="opacity-100 scale-100 translate-y-0"
              leave="ease-in duration-150"
              leaveFrom="opacity-100 scale-100 translate-y-0"
              leaveTo="opacity-0 scale-95 translate-y-1"
            >
              <Dialog.Panel className="w-full max-w-sm transform overflow-hidden rounded-2xl bg-white dark:bg-gray-800 p-6 text-left align-middle shadow-xl ring-1 ring-slate-200 dark:ring-gray-700">
                <div className="flex items-start gap-3">
                  <div
                    className={
                      danger
                        ? "mt-0.5 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-300 ring-1 ring-rose-200/60 dark:ring-rose-700/60"
                        : "mt-0.5 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300 ring-1 ring-amber-200/60 dark:ring-amber-700/60"
                    }
                    aria-hidden
                  >
                    {danger ? "🗑" : "⚠️"}
                  </div>

                  <div className="flex-1">
                    <Dialog.Title className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                      {title}
                    </Dialog.Title>
                    <Dialog.Description className="mt-1 text-sm text-slate-600 dark:text-slate-300">
                      {message}
                    </Dialog.Description>
                  </div>
                </div>

                <div className="mt-6 flex justify-end gap-3">
                  <button
                    ref={cancelButtonRef}
                    onClick={onCancel}
                    disabled={loading}
                    className="px-4 py-2 text-sm rounded-md bg-slate-200 dark:bg-gray-700 hover:bg-slate-300 dark:hover:bg-gray-600 text-slate-800 dark:text-slate-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-slate-400 dark:focus-visible:ring-offset-gray-800 disabled:opacity-60"
                  >
                    {cancelText}
                  </button>
                  <button
                    onClick={onConfirm}
                    disabled={loading}
                    className={
                      "px-4 py-2 text-sm rounded-md text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-gray-800 disabled:opacity-60 " +
                      (danger
                        ? "bg-rose-600 hover:bg-rose-700 focus-visible:ring-rose-500"
                        : "bg-sky-600 hover:bg-sky-700 focus-visible:ring-sky-500")
                    }
                  >
                    {loading ? "Processing…" : confirmText}
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default ConfirmDialog;
