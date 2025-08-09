import { useState } from "react";
import dayjs from "dayjs";
import { StudyDayDto } from "../../models/studyDay";
import CalendarDayCell from "./CalendarDayCell";
import { motion } from "framer-motion";

interface Props {
  studyMap: Record<string, StudyDayDto>;
  onDateClick: (dateStr: string, studyDay?: StudyDayDto) => void;
}

const WeeklyCalendar = ({ studyMap, onDateClick }: Props) => {
  const [offset, setOffset] = useState(0);
  const currentWeekStart = dayjs().startOf("week").add(offset, "week");

  const days = Array.from({ length: 7 }, (_, i) =>
    currentWeekStart.add(i, "day")
  );

  const handlePrev = () => setOffset((prev) => prev - 1);
  const handleNext = () => setOffset((prev) => prev + 1);
  const handleToday = () => setOffset(0);

  return (
    <div className="w-full px-4 py-6 overflow-hidden">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <button onClick={handlePrev} className="text-sm text-gray-600 dark:text-gray-300 hover:text-blue-600">
          ⬅️ Tuần trước
        </button>
        <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 text-center">
          Tuần: {currentWeekStart.format("DD MMM")} –{" "}
          {currentWeekStart.add(6, "day").format("DD MMM, YYYY")}
        </h2>
        <button onClick={handleNext} className="text-sm text-gray-600 dark:text-gray-300 hover:text-blue-600">
          Tuần sau ➡️
        </button>
      </div>

      {/* Nút hôm nay */}
      <div className="flex justify-center mb-4">
        <button
          onClick={handleToday}
          className="text-xs font-medium text-white bg-blue-500 hover:bg-blue-600 px-4 py-1.5 rounded-full transition"
        >
          📅 Hôm nay
        </button>
      </div>

      {/* Lưới ngày trong tuần */}
      <motion.div
        key={offset}
        initial={{ x: 50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: -50, opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="grid grid-cols-7 gap-2"
      >
        {days.map((date) => {
          const dateStr = date.format("YYYY-MM-DD");
          return (
            <CalendarDayCell
              key={dateStr}
              date={date}
              isCurrentMonth={true}
              isToday={dateStr === dayjs().format("YYYY-MM-DD")}
              studyDay={studyMap[dateStr]}
              onClick={onDateClick}
            />
          );
        })}
      </motion.div>
    </div>
  );
};

export default WeeklyCalendar;
