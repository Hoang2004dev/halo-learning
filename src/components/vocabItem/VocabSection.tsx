import { useMemo, useState } from "react";
import { VocabItemDto, VocabStatus } from "../../models/vocabItem";
import VocabItemList from "./VocabItemList";

interface Props {
  items: VocabItemDto[];
  onAdd: () => void;
  onEdit: (item: VocabItemDto) => void;
  onDelete: (id: number) => void;
  onChangeStatus: (id: number, status: VocabStatus) => Promise<void> | void; // từ parent
}

const STATUS_FILTERS = [
  { key: "ALL", label: "All" },
  { key: "NotLearned", label: "Not Learned" },
  { key: "Learning", label: "Learning" },
  { key: "Mastered", label: "Mastered" },
  { key: "Review", label: "Review" },
];

export default function VocabSection({
  items,
  onAdd,
  onEdit,
  onDelete,
  onChangeStatus,
}: Props) {
  const [q, setQ] = useState("");
  const [statusKey, setStatusKey] = useState<string>("ALL");

  const filtered = useMemo(() => {
    const qq = q.trim().toLowerCase();
    return items.filter((v) => {
      const okText =
        !qq ||
        v.word.toLowerCase().includes(qq) ||
        (v.nativeMeaning ?? "").toLowerCase().includes(qq) ||
        (v.foreignMeaning ?? "").toLowerCase().includes(qq) ||
        (v.example ?? "").toLowerCase().includes(qq);
      const okStatus = statusKey === "ALL" || (v as any).status === statusKey;
      return okText && okStatus;
    });
  }, [items, q, statusKey]);

  return (
    <>
      <div className="mt-8 mb-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">📚 Vocabulary</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">Manage your words — search, filter, and keep practicing.</p>
        </div>

        {/* Header controls */}
        <div className="flex flex-col gap-3">
          {/* Search */}
          <div className="relative w-full sm:max-w-md">
            <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">🔎</span>
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search word, meaning, example…"
              className="w-full rounded-lg pl-9 pr-12 py-2.5 text-sm bg-white dark:bg-gray-800 text-slate-900 dark:text-slate-100 ring-1 ring-slate-300 dark:ring-gray-600 focus:outline-none focus:ring-2 focus:ring-sky-500 transition"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs select-none">Ctrl K</span>
          </div>

          {/* Row: Status + Add */}
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-1 rounded-lg ring-1 ring-slate-200 dark:ring-gray-700 p-1 bg-white/60 dark:bg-gray-900/40">
              {STATUS_FILTERS.map((f) => {
                const active = statusKey === f.key;
                return (
                  <button
                    key={f.key}
                    onClick={() => setStatusKey(f.key)}
                    aria-pressed={active}
                    className={
                      active
                        ? "px-5 min-w-[84px] py-1.5 rounded-md text-sm bg-sky-600 text-white shadow-sm ring-1 ring-sky-500 transition"
                        : "px-5 min-w-[84px] py-1.5 rounded-md text-sm text-slate-600 dark:text-slate-300 hover:bg-slate-100/70 dark:hover:bg-gray-800/60 transition"
                    }
                  >
                    {f.label}
                  </button>
                );
              })}
            </div>

            <button
              className="px-6 py-2 rounded-lg text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-sm min-w-[140px] transition"
              onClick={onAdd}
            >
              + Add Vocab
            </button>
          </div>
        </div>
      </div>

      {/* Count line */}
      <div className="mb-2 text-xs text-slate-500 dark:text-slate-400">
        Showing <strong>{filtered.length}</strong> of {items.length}
      </div>

      <VocabItemList
        items={filtered}
        onEdit={onEdit}
        onDelete={onDelete}
        onChangeStatus={onChangeStatus}
      />
    </>
  );
}
