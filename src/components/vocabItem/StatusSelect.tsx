// src/components/vocab/StatusSelect.tsx
import { Fragment } from "react";
import { Listbox, Transition } from "@headlessui/react";
import clsx from "clsx";
import { VocabStatus } from "../../models/vocabItem";

const META: Record<VocabStatus, { label: string; dot: string }> = {
  NotLearned: { label: "Not Learned", dot: "bg-slate-400" },
  Learning:   { label: "Learning",    dot: "bg-sky-500" },
  Mastered:   { label: "Mastered",    dot: "bg-emerald-500" },
  Review:     { label: "Review",      dot: "bg-amber-500" },
};

const OPTIONS: VocabStatus[] = ["NotLearned", "Learning", "Mastered", "Review"];

export default function StatusSelect({
  value,
  onChange,
  loading = false,
  disabled = false,
}: {
  value: VocabStatus;
  onChange: (v: VocabStatus) => void;
  loading?: boolean;
  disabled?: boolean;
}) {
  const meta = META[value];

  return (
    <Listbox value={value} onChange={onChange} disabled={disabled || loading}>
      <div className="relative w-[150px]">
        <Listbox.Button
          className={clsx(
            "w-full px-3 py-1.5 text-xs rounded-md ring-1 ring-slate-200 dark:ring-gray-700",
            "bg-white dark:bg-gray-900 text-slate-700 dark:text-slate-200",
            "flex items-center justify-between gap-2",
            (disabled || loading) && "opacity-60 cursor-not-allowed"
          )}
          title="Change status"
        >
          <span className="flex items-center gap-2">
            <span className={clsx("h-2 w-2 rounded-full", meta.dot)} />
            {meta.label}
          </span>
          <span className="text-slate-400">{loading ? "…" : "▾"}</span>
        </Listbox.Button>

        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="opacity-0 translate-y-1"
          enterTo="opacity-100 translate-y-0"
          leave="transition ease-in duration-75"
          leaveFrom="opacity-100 translate-y-0"
          leaveTo="opacity-0 translate-y-1"
        >
          <Listbox.Options
            className={clsx(
              "absolute z-20 mt-1 w-full overflow-hidden rounded-md ring-1",
              "ring-slate-200 dark:ring-gray-700 bg-white dark:bg-gray-900 shadow-lg"
            )}
          >
            {OPTIONS.map((opt) => {
              const m = META[opt];
              return (
                <Listbox.Option
                  key={opt}
                  value={opt}
                  className={({ active }) =>
                    clsx(
                      "px-3 py-2 text-xs cursor-pointer flex items-center justify-between",
                      active
                        ? "bg-slate-100 dark:bg-gray-800 text-slate-900 dark:text-slate-100"
                        : "text-slate-700 dark:text-slate-200"
                    )
                  }
                >
                  {({ selected }) => (
                    <>
                      <span className="flex items-center gap-2">
                        <span className={clsx("h-2 w-2 rounded-full", m.dot)} />
                        {m.label}
                      </span>
                      {selected && (
                        <span className="text-sky-600 dark:text-sky-400">✓</span>
                      )}
                    </>
                  )}
                </Listbox.Option>
              );
            })}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  );
}
