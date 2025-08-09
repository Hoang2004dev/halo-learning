import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import clsx from "clsx";
import ConfirmDialog from "../common/ConfirmDialog";
import { VocabItemDto, VocabStatus } from "../../models/vocabItem";
import StatusSelect from "./StatusSelect";

interface Props {
  items: VocabItemDto[];
  onEdit: (item: VocabItemDto) => void;
  onDelete: (id: number) => Promise<void> | void;
  onChangeStatus: (id: number, status: VocabStatus) => Promise<void> | void;
}

const normalizeStatus = (raw?: string): VocabStatus => {
  const r = (raw || "").toLowerCase().trim();
  if (r === "notlearned" || r.includes("not")) return "NotLearned";
  if (r === "mastered" || r.includes("master")) return "Mastered";
  if (r === "review" || r.includes("review")) return "Review";
  return "Learning";
};

const VocabItemList = ({ items, onEdit, onDelete, onChangeStatus }: Props) => {
  const [expanded, setExpanded] = useState<Set<number>>(new Set());
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [pendingDelete, setPendingDelete] = useState<{ id: number; word: string } | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [updatingId, setUpdatingId] = useState<number | null>(null);

  const toggleExpand = (id: number) => {
    setExpanded((prev) => {
      const s = new Set(prev);
      s.has(id) ? s.delete(id) : s.add(id);
      return s;
    });
  };

  const askDelete = (id: number, word: string) => {
    setPendingDelete({ id, word });
    setConfirmOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!pendingDelete) return;
    try {
      setDeleting(true);
      await onDelete(pendingDelete.id);
      setConfirmOpen(false);
      setPendingDelete(null);
    } finally {
      setDeleting(false);
    }
  };

  if (!items.length) {
    return (
      <div className="rounded-xl border border-dashed border-slate-300 dark:border-gray-700 p-6 text-sm text-slate-500 dark:text-slate-400 bg-white/60 dark:bg-gray-900/40">
        <div className="flex items-center gap-2">
          <span>📭</span>
          <span>No vocabulary added yet. Click <strong>“+ Add Vocab”</strong> to create one.</span>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="space-y-4">
        <AnimatePresence initial={false}>
          {items.map((v) => {
            const isOpen = expanded.has(v.id);
            const current = normalizeStatus((v as any).status);

            return (
              <motion.div
                key={v.id}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                className="p-5 rounded-2xl bg-white/80 dark:bg-gray-900/60 ring-1 ring-slate-200 dark:ring-gray-700 shadow-sm hover:shadow-md transition"
              >
                <div className="flex flex-col md:flex-row gap-4 md:items-start">
                  {/* Left */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 flex-wrap">
                      <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 break-words">
                        {v.word}
                      </h3>

                      {v.foreignMeaning && (
                        <span className="text-sm px-2 py-0.5 rounded-md bg-sky-100 text-sky-800 dark:bg-sky-900/30 dark:text-sky-300 ring-1 ring-sky-200/60 dark:ring-sky-700/60">
                          {v.foreignMeaning}
                        </span>
                      )}

                      {/* Đổi trạng thái trực tiếp */}
                      <div className="ml-auto md:ml-0">
                        <StatusSelect
                          value={current}
                          loading={updatingId === v.id}
                          onChange={async (next) => {
                            try {
                              setUpdatingId(v.id);
                              await onChangeStatus(v.id, next);
                            } finally {
                              setUpdatingId((id) => (id === v.id ? null : id));
                            }
                          }}
                        />
                      </div>
                    </div>

                    <p className="mt-1 text-sm text-slate-700 dark:text-slate-300">
                      <span className="font-medium text-slate-900 dark:text-slate-100">Meaning:</span>{" "}
                      {v.nativeMeaning}
                    </p>

                    {v.example && (
                      <p className="mt-1 text-sm italic text-slate-600 dark:text-slate-400">e.g. {v.example}</p>
                    )}

                    {v.description && (
                      <div className="mt-2">
                        <button
                          onClick={() => toggleExpand(v.id)}
                          className="text-xs text-sky-700 dark:text-sky-300 hover:underline inline-flex items-center gap-1"
                          aria-expanded={isOpen}
                          aria-controls={`desc-${v.id}`}
                        >
                          {isOpen ? "Hide description" : "Show description"}
                          <span className={clsx("transition", isOpen ? "rotate-180" : "")}>▼</span>
                        </button>

                        <AnimatePresence initial={false}>
                          {isOpen && (
                            <motion.div
                              id={`desc-${v.id}`}
                              key="desc"
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.22, ease: "easeOut" }}
                              className="overflow-hidden mt-2"
                            >
                              <div className="prose prose-sm dark:prose-invert max-w-none text-slate-800 dark:text-slate-200">
                                <div dangerouslySetInnerHTML={{ __html: v.description }} />
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    )}

                    {v.audioUrl?.trim() && (
                      <div className="mt-3 flex items-center gap-2">
                        <audio
                          controls
                          className="w-full max-w-sm rounded-lg ring-1 ring-slate-200 dark:ring-gray-700 bg-slate-50 dark:bg-gray-800"
                          src={v.audioUrl}
                        >
                          Your browser does not support the audio element.
                        </audio>
                        <button
                          onClick={() => {
                            const a = new Audio(v.audioUrl);
                            a.play().catch(() => {});
                          }}
                          className="inline-flex items-center justify-center gap-2 px-3.5 py-2.5 rounded-lg text-sm font-medium ring-1 ring-inset transition focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-gray-900 min-w-[108px] bg-sky-600 text-white hover:bg-sky-700 ring-sky-700/20"
                          title="Quick play"
                        >
                          ▶︎ Play
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Actions: nhẹ */}
                  <div className="md:w-40 flex md:flex-col justify-between items-end gap-3">
                    <div className="hidden md:block" />
                    <div className="flex gap-4">
                      <button
                        onClick={() => onEdit(v)}
                        className="px-2 py-1 text-sm font-medium text-sky-600 hover:text-sky-700 underline-offset-2 hover:underline transition"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => askDelete(v.id, v.word)}
                        className="px-2 py-1 text-sm font-medium text-rose-600 hover:text-rose-700 underline-offset-2 hover:underline transition"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      <ConfirmDialog
        open={confirmOpen}
        title="Delete vocabulary?"
        message={
          pendingDelete
            ? `This action will permanently remove “${pendingDelete.word}”. You can’t undo this.`
            : "This action will remove the item."
        }
        confirmText="Delete"
        cancelText="Cancel"
        onCancel={() => {
          if (deleting) return;
          setConfirmOpen(false);
          setPendingDelete(null);
        }}
        onConfirm={handleConfirmDelete}
        loading={deleting}
        danger
      />
    </>
  );
};

export default VocabItemList;
