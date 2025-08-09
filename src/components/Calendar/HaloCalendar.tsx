import { useState } from "react";
import CalendarGrid from "./CalendarGrid";
import { StudyDayDto, StudyDayStatus } from "../../models/studyDay";
import dayjs from "dayjs";
import MonthSelector from "./MonthSelector";
import YearSelector from "./YearSelector";
import { useCalendarFilter } from "../../contexts/CalendarFilterContext";

interface Props {
  studyMap: Record<string, StudyDayDto>;
  onDateClick: (dateStr: string, studyDay?: StudyDayDto) => void;
}

const HaloCalendar = ({ studyMap, onDateClick }: Props) => {
  const today = dayjs();
  const { month, year, filter, setMonth, setYear, setFilter } =
    useCalendarFilter();
  const [direction, setDirection] = useState(0);

  const changeMonth = (offset: number) => {
    let newMonth = month + offset;
    let newYear = year;
    if (newMonth > 12) {
      newMonth = 1;
      newYear += 1;
    } else if (newMonth < 1) {
      newMonth = 12;
      newYear -= 1;
    }
    setDirection(offset > 0 ? 1 : -1);
    setMonth(newMonth);
    setYear(newYear);
  };

  const goToToday = () => {
    setDirection(0);
    setMonth(today.month() + 1);
    setYear(today.year());
  };

  const handleMonthChange = (newMonth: number) => {
    setDirection(0);
    setMonth(newMonth);
  };

  const handleYearChange = (newYear: number) => {
    setDirection(0);
    setYear(newYear);
  };

  const displayText = dayjs(`${year}-${month}-01`).format("MMMM, YYYY");

  return (
    <div className="w-full px-4 py-6 overflow-hidden">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-3 mb-4">
        {/* Điều hướng tháng */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => changeMonth(-1)}
            className="text-2xl px-2 py-1 text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-100 dark:hover:bg-gray-700 rounded-full transition focus:outline-none"
            title="Tháng trước"
          >
            ⭠
          </button>

          <MonthSelector value={month} onChange={handleMonthChange} />
          <YearSelector value={year} onChange={handleYearChange} />

          <button
            onClick={() => changeMonth(1)}
            className="text-2xl px-2 py-1 text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-100 dark:hover:bg-gray-700 rounded-full transition focus:outline-none"
            title="Tháng sau"
          >
            ⭢
          </button>
        </div>

        <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 text-center">
          {displayText}
        </h2>
      </div>

      {/* Nút hôm nay */}
      <div className="flex justify-center mb-4">
        <button
          onClick={goToToday}
          className="text-xs font-medium text-white bg-blue-500 hover:bg-blue-600 px-4 py-1.5 rounded-full transition"
        >
          📆 Hôm nay
        </button>
      </div>

      {/* Bộ lọc trạng thái */}
      <div className="flex justify-center mb-6 gap-2 flex-wrap">
        {["All", "NotStarted", "InProgress", "Completed", "Overdue"].map(
          (f) => (
            <button
              key={f}
              onClick={() => setFilter(f as any)}
              className={`px-3 py-1.5 text-sm rounded-full font-medium transition ${
                filter === f
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-blue-100 dark:hover:bg-gray-600"
              }`}
            >
              {f === "All" && "Tất cả"}
              {f === "NotStarted" && "🟡 Chưa học"}
              {f === "InProgress" && "🔵 Đang học"}
              {f === "Completed" && "✅ Đã học"}
              {f === "Overdue" && "⏰ Trễ"}
            </button>
          )
        )}
      </div>

      {/* Lưới lịch */}
      <CalendarGrid
        year={year}
        month={month}
        direction={direction}
        studyMap={studyMap}
        filter={filter}
        onDayClick={(dateStr) => onDateClick(dateStr, studyMap[dateStr])}
      />
    </div>
  );
};

export default HaloCalendar;
