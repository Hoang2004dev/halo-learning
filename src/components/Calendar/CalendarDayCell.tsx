import React from "react";
import dayjs from "dayjs";
import { StudyDayDto, StudyDayStatus } from "../../models/studyDay";
import Tooltip from "./Tooltip";

interface Props {
  date: dayjs.Dayjs;
  isCurrentMonth: boolean;
  isToday: boolean;
  studyDay?: StudyDayDto;
  onClick: (dateStr: string) => void;
}

const bgColorMap: Record<StudyDayStatus, string> = {
  NotStarted: "bg-gradient-to-br from-yellow-100 to-yellow-200",
  InProgress: "bg-gradient-to-br from-blue-100 to-blue-200",
  Completed: "bg-gradient-to-br from-green-100 to-green-200",
  Overdue: "bg-gradient-to-br from-red-100 to-red-200",
};

const textColorMap: Record<StudyDayStatus, string> = {
  NotStarted: "text-yellow-900",
  InProgress: "text-blue-900",
  Completed: "text-green-900",
  Overdue: "text-red-900",
};

const emojiMap: Record<StudyDayStatus, string> = {
  NotStarted: "🟡",
  InProgress: "🔵",
  Completed: "✅",
  Overdue: "⏰",
};

const CalendarDayCell: React.FC<Props> = ({
  date,
  isCurrentMonth,
  isToday,
  studyDay,
  onClick,
}) => {
  const dateStr = date.format("YYYY-MM-DD");
  const status = studyDay?.status;

  const bgColor = status
    ? bgColorMap[status]
    : isToday
    ? "bg-rose-50"
    : isCurrentMonth
    ? "bg-white"
    : "bg-gray-100 opacity-50";

  const textColor = status
    ? textColorMap[status]
    : isCurrentMonth
    ? "text-gray-800"
    : "text-gray-400";

  const borderClass = isToday
    ? "border-2 border-rose-400 shadow-inner"
    : "border border-gray-200";

  const hoverEffect = "hover:scale-[1.03] hover:shadow-lg";
  const transitionClass = "transition-transform duration-200 ease-in-out";

  const cellContent = (
    <div
      onClick={() => onClick(dateStr)}
      className={`
        w-full h-20 p-2 rounded-xl cursor-pointer select-none
        ${bgColor} ${textColor} ${borderClass}
        ${hoverEffect} ${transitionClass}
        flex flex-col justify-start items-start text-sm
      `}
    >
      <div className="font-semibold">{date.date()}</div>
      {studyDay?.note && (
        <div className="text-xs mt-1 truncate italic w-full">
          {studyDay.note}
        </div>
      )}
    </div>
  );

  return studyDay ? (
    <Tooltip content={`${emojiMap[status!]} ${status} – ${studyDay.note}`}>
      {cellContent}
    </Tooltip>
  ) : (
    cellContent
  );
};

export default CalendarDayCell;
