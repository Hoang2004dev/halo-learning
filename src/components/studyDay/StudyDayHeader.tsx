import { motion } from "framer-motion";
import clsx from "clsx";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import { StudyDayStatus } from "../../models/studyDay";
dayjs.extend(localizedFormat);

type StatusMeta = {
  bg: string;
  ring: string;
  text: string;
  label: string; // English content
  icon: string;
  hint: string;  // sub copy
};

const STATUS_META: Record<StudyDayStatus, StatusMeta> = {
  NotStarted: {
    bg: "bg-slate-100 dark:bg-slate-800/70",
    ring: "ring-1 ring-slate-300/60 dark:ring-slate-700",
    text: "text-slate-700 dark:text-slate-200",
    label: "Ready to begin",
    icon: "🕒",
    hint: "Plan • Practice • Progress",
  },
  InProgress: {
    bg: "bg-amber-100 dark:bg-amber-900/30",
    ring: "ring-1 ring-amber-300/60 dark:ring-amber-700/60",
    text: "text-amber-800 dark:text-amber-300",
    label: "Keep it up",
    icon: "🚀",
    hint: "Stay focused and keep your streak!",
  },
  Completed: {
    bg: "bg-emerald-100 dark:bg-emerald-900/30",
    ring: "ring-1 ring-emerald-300/60 dark:ring-emerald-700/60",
    text: "text-emerald-800 dark:text-emerald-300",
    label: "Great job",
    icon: "✅",
    hint: "Nice! Review and move forward.",
  },
  Overdue: {
    bg: "bg-rose-100 dark:bg-rose-900/30",
    ring: "ring-1 ring-rose-300/60 dark:ring-rose-700/60",
    text: "text-rose-800 dark:text-rose-300",
    label: "Don’t miss it",
    icon: "⚠️",
    hint: "A small step today beats none.",
  },
};

interface HeaderProps {
  targetDate: string;           // ISO string
  status: StudyDayStatus;
  className?: string;
}

export default function StudyDayHeader({ targetDate, status, className }: HeaderProps) {
  const meta = STATUS_META[status];
  const datePretty = dayjs(targetDate).format("dddd, MMM D, YYYY");

  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className={clsx("mb-8", className)}
    >
      <div className="flex items-start justify-between gap-4 flex-wrap">
        {/* Left: Title + Date */}
        <div className="flex items-center gap-4">
          <div
            aria-hidden
            className="grid place-items-center w-14 h-14 rounded-2xl shadow-sm bg-gradient-to-br from-sky-100 to-emerald-100 dark:from-sky-900/30 dark:to-emerald-900/30 ring-1 ring-sky-200/60 dark:ring-sky-800/40"
          >
            <span className="text-3xl">📘</span>
          </div>

          <div>
            <h1 className="text-2xl sm:text-4xl font-extrabold leading-tight bg-gradient-to-r from-sky-500 to-emerald-500 bg-clip-text text-transparent">
              Study Journey
            </h1>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 mt-1">
              Study date:&nbsp;
              <span className="font-semibold text-slate-900 dark:text-slate-100">
                {datePretty}
              </span>
            </p>
          </div>
        </div>

        {/* Right: Status Badge */}
        <div
          className={clsx(
            "inline-flex items-center gap-2 px-3 py-1.5 rounded-full font-medium shadow-sm select-none",
            meta.bg,
            meta.ring,
            meta.text
          )}
          role="status"
          aria-live="polite"
          title={meta.hint}
        >
          <span className="text-base">{meta.icon}</span>
          <span className="text-xs sm:text-sm">{meta.label}</span>
        </div>
      </div>

      {/* Sub copy line */}
      <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">
        {status === "NotStarted" && "Plan your tasks and start strong today."}
        {status === "InProgress" && "You’re on track — a little more and you’re done."}
        {status === "Completed" && "Reflect on what you learned and schedule the next step."}
        {status === "Overdue" && "No worries — pick one small task and begin now."}
      </p>
    </motion.div>
  );
}
