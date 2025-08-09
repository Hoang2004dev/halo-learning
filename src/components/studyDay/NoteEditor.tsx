import { motion, AnimatePresence } from "framer-motion";
import { useMemo } from "react";

interface Props {
  note: string;
  editing: boolean;
  saving: boolean;
  onEdit: () => void;
  onCancel: () => void;
  onChange: (newValue: string) => void;
  onSave: () => void;
}

export default function NoteEditor({
  note,
  editing,
  saving,
  onEdit,
  onCancel,
  onChange,
  onSave,
}: Props) {
  const length = useMemo(() => (note ?? "").trim().length, [note]);
  const isEmpty = length === 0;

  return (
    <div className="mb-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div>
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-slate-100">
            📝 Notes
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Capture quick thoughts to review later.
          </p>
        </div>

        {!editing && (
          <button
            className="text-sm px-3 py-1.5 rounded-lg bg-sky-600 text-white hover:bg-sky-700 active:scale-[0.99] transition shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-sky-500 dark:focus-visible:ring-offset-gray-900"
            onClick={onEdit}
            aria-label="Edit note"
            title="Edit"
          >
            ✏️ Edit
          </button>
        )}
      </div>

      {/* Content */}
      <div className="rounded-xl ring-1 ring-slate-200 dark:ring-gray-700 bg-white/70 dark:bg-gray-900/50 p-4">
        <AnimatePresence mode="wait">
          {!editing ? (
            <motion.div
              key="note-view"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
            >
              {isEmpty ? (
                <div className="border border-dashed rounded-lg p-4 text-sm text-slate-500 dark:text-slate-400 bg-white/40 dark:bg-gray-900/20">
                  <div className="flex items-center gap-2">
                    <span>🗒️</span>
                    <span>No notes yet. Click <strong>Edit</strong> to add your first note.</span>
                  </div>
                </div>
              ) : (
                <p className="text-[0.95rem] leading-relaxed text-slate-700 dark:text-slate-300 whitespace-pre-wrap">
                  {note}
                </p>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="note-edit"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="space-y-3"
            >
              {/* Editing chip */}
              <div className="inline-flex items-center gap-2 text-xs px-2.5 py-1 rounded-full bg-amber-100 text-amber-900 dark:bg-amber-900/30 dark:text-amber-300 ring-1 ring-amber-300/50 dark:ring-amber-700/50">
                ✍️ Editing — <span className="hidden sm:inline">Press</span>
                <kbd className="px-1.5 py-0.5 rounded bg-white/60 dark:bg-gray-800/70 ring-1 ring-slate-300/60 dark:ring-gray-700 text-[10px]">
                  Ctrl
                </kbd>
                +
                <kbd className="px-1.5 py-0.5 rounded bg-white/60 dark:bg-gray-800/70 ring-1 ring-slate-300/60 dark:ring-gray-700 text-[10px]">
                  Enter
                </kbd>
                <span className="hidden sm:inline">to save •</span>
                <kbd className="px-1.5 py-0.5 rounded bg-white/60 dark:bg-gray-800/70 ring-1 ring-slate-300/60 dark:ring-gray-700 text-[10px]">
                  Esc
                </kbd>
                <span className="hidden sm:inline">to cancel</span>
              </div>

              <div className="relative">
                <textarea
                  value={note}
                  onChange={(e) => onChange(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Escape") {
                      e.preventDefault();
                      onCancel();
                    }
                    if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
                      e.preventDefault();
                      onSave();
                    }
                  }}
                  rows={5}
                  placeholder="Jot down your ideas, key points, or reminders here…"
                  className="w-full rounded-xl px-3.5 py-3 text-sm bg-white dark:bg-gray-800 text-slate-900 dark:text-slate-100 ring-1 ring-slate-300 dark:ring-gray-600 focus:outline-none focus:ring-2 focus:ring-sky-500 shadow-sm resize-y"
                  aria-label="Note content"
                />

                {/* Char counter */}
                <div className="absolute bottom-2 right-3 text-[11px] text-slate-400 dark:text-slate-500 select-none">
                  {length} chars
                </div>
              </div>

              <div className="flex justify-end gap-2">
                <button
                  onClick={onCancel}
                  className="px-4 py-2 rounded-lg text-sm bg-slate-200 dark:bg-gray-700 hover:bg-slate-300 dark:hover:bg-gray-600 text-slate-800 dark:text-slate-100 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-slate-400 dark:focus-visible:ring-offset-gray-900"
                >
                  ✖ Cancel
                </button>

                <motion.button
                  onClick={onSave}
                  disabled={saving}
                  whileTap={{ scale: 0.98 }}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm bg-sky-600 hover:bg-sky-700 text-white shadow-sm disabled:opacity-60 disabled:cursor-not-allowed transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-sky-500 dark:focus-visible:ring-offset-gray-900"
                >
                  {saving ? (
                    <>
                      <svg
                        className="h-4 w-4 animate-spin"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                        />
                      </svg>
                      Saving…
                    </>
                  ) : (
                    <>
                      💾 Save
                    </>
                  )}
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
