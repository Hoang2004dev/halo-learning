import { motion } from "framer-motion";
import clsx from "clsx";
import { StudyDayStatus } from "../../models/studyDay";

interface Props {
  status: StudyDayStatus;
  editable: boolean;
  onChange: (newStatus: StudyDayStatus) => void;
  className?: string;
}

const OPTIONS: { value: StudyDayStatus; label: string; emoji: string; hint: string }[] = [
  { value: "NotStarted", label: "Not Started", emoji: "🕒", hint: "Plan • Practice • Progress" },
  { value: "InProgress", label: "In Progress", emoji: "🚀", hint: "Keep your momentum!" },
  { value: "Completed", label: "Completed", emoji: "✅", hint: "Great job — review next." },
  { value: "Overdue", label: "Overdue", emoji: "⚠️", hint: "Start a small step now." },
];

// Style cho badge xem-only
const BADGE_STYLES: Record<StudyDayStatus, string> = {
  NotStarted:
    "bg-slate-100 text-slate-700 dark:bg-slate-800/70 dark:text-slate-200 ring-slate-300/70 dark:ring-slate-700",
  InProgress:
    "bg-amber-100 text-amber-900 dark:bg-amber-900/30 dark:text-amber-300 ring-amber-300/70 dark:ring-amber-700/70",
  Completed:
    "bg-emerald-100 text-emerald-900 dark:bg-emerald-900/30 dark:text-emerald-300 ring-emerald-300/70 dark:ring-emerald-700/70",
  Overdue:
    "bg-rose-100 text-rose-900 dark:bg-rose-900/30 dark:text-rose-300 ring-rose-300/70 dark:ring-rose-700/70",
};

// **NEW**: Nền gradient đậm khi chọn
const ACTIVE_BG: Record<StudyDayStatus, string> = {
  NotStarted:
    "bg-gradient-to-br from-slate-500 to-slate-700 dark:from-slate-600 dark:to-slate-800 ring-1 ring-slate-300/40 dark:ring-slate-600",
  InProgress:
    "bg-gradient-to-br from-amber-400 to-orange-500 dark:from-amber-500 dark:to-orange-600 ring-1 ring-amber-300/40 dark:ring-amber-600",
  Completed:
    "bg-gradient-to-br from-emerald-400 to-teal-500 dark:from-emerald-500 dark:to-teal-600 ring-1 ring-emerald-300/40 dark:ring-emerald-600",
  Overdue:
    "bg-gradient-to-br from-rose-400 to-red-500 dark:from-rose-500 dark:to-red-600 ring-1 ring-rose-300/40 dark:ring-rose-600",
};

// **NEW**: Shadow/Glow theo trạng thái
const ACTIVE_GLOW: Record<StudyDayStatus, string> = {
  NotStarted: "shadow-lg shadow-slate-300/50 dark:shadow-slate-900/40",
  InProgress: "shadow-lg shadow-amber-300/50 dark:shadow-amber-900/40",
  Completed: "shadow-lg shadow-emerald-300/50 dark:shadow-emerald-900/40",
  Overdue: "shadow-lg shadow-rose-300/50 dark:shadow-rose-900/40",
};

export default function StudyDayStatusSection({
  status,
  editable,
  onChange,
  className,
}: Props) {
  const SelectFallback = (
    <select
      value={status}
      onChange={(e) => onChange(e.target.value as StudyDayStatus)}
      className="block sm:hidden text-sm px-3 py-2 rounded-lg bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 border border-gray-300 dark:border-gray-600 shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition"
      aria-label="Change study status"
    >
      {OPTIONS.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.emoji} {opt.label}
        </option>
      ))}
    </select>
  );

  return (
    <div className={clsx("mb-6 flex flex-col gap-2", className)}>
      <div className="flex items-center gap-3 text-sm">
        <span className="font-semibold text-slate-700 dark:text-slate-200">📍 Status:</span>

        {!editable && (
          <span
            className={clsx(
              "inline-flex items-center gap-2 px-3 py-1 rounded-full font-medium text-xs shadow-sm ring-1",
              BADGE_STYLES[status]
            )}
            role="status"
            aria-live="polite"
            title={OPTIONS.find((o) => o.value === status)?.hint}
          >
            <span>{OPTIONS.find((o) => o.value === status)?.emoji}</span>
            <span>{OPTIONS.find((o) => o.value === status)?.label}</span>
          </span>
        )}
      </div>

      {editable && (
        <>
          {SelectFallback}

          {/* Segmented control (>= sm) */}
          <div
            role="radiogroup"
            aria-label="Study status"
            className="hidden sm:flex relative w-full max-w-full overflow-x-auto rounded-xl bg-white/60 dark:bg-gray-900/40 ring-1 ring-slate-200 dark:ring-gray-700 p-1"
          >
            <div className="grid grid-cols-4 w-full gap-1">
              {OPTIONS.map((opt) => {
                const isActive = status === opt.value;
                return (
                  <motion.button
                    key={opt.value}
                    role="radio"
                    aria-checked={isActive}
                    title={opt.hint}
                    onClick={() => onChange(opt.value)}
                    whileTap={{ scale: 0.98 }}
                    animate={isActive ? { scale: 1.01 } : { scale: 1 }}
                    transition={{ type: "spring", stiffness: 300, damping: 24 }}
                    className={clsx(
                      "relative inline-flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition outline-none",
                      "focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-sky-500 dark:focus-visible:ring-sky-400 focus-visible:ring-offset-white dark:focus-visible:ring-offset-gray-900",
                      isActive
                        ? "text-white"
                        : "text-slate-600 dark:text-slate-300 hover:bg-slate-100/70 dark:hover:bg-gray-800/60"
                    )}
                  >
                    {/* Nền active nổi bật */}
                    {isActive && (
                      <motion.span
                        layoutId="statusActiveBg"
                        className={clsx(
                          "absolute inset-0 rounded-lg -z-10",
                          ACTIVE_BG[opt.value],
                          ACTIVE_GLOW[opt.value]
                        )}
                        transition={{ type: "spring", stiffness: 500, damping: 40 }}
                      />
                    )}
                    <span className="text-base">{opt.emoji}</span>
                    <span className="truncate">{opt.label}</span>
                  </motion.button>
                );
              })}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
