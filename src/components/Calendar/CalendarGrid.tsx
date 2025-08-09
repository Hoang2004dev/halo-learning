import dayjs from "dayjs";
import CalendarDayCell from "./CalendarDayCell";
import { StudyDayDto, StudyDayStatus } from "../../models/studyDay";
import { motion, AnimatePresence } from "framer-motion";

interface Props {
  year: number;
  month: number;
  direction: number;
  studyMap: Record<string, StudyDayDto>;
  filter: StudyDayStatus | "All";
  onDayClick: (dateStr: string) => void;
}

const CalendarGrid = ({
  year,
  month,
  direction,
  studyMap,
  filter,
  onDayClick,
}: Props) => {
  const today = dayjs().format("YYYY-MM-DD");
  const firstDay = dayjs(`${year}-${month}-01`);
  const days = Array.from({ length: 42 }, (_, i) =>
    firstDay.startOf("week").add(i - firstDay.day(), "day")
  );

  return (
    <>
      <div className="grid grid-cols-7 text-center font-semibold mb-2 text-sm text-gray-600 dark:text-gray-300">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
          <div key={d}>{d}</div>
        ))}
      </div>

      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={`${year}-${month}`}
          custom={direction}
          initial="enter"
          animate="center"
          exit="exit"
          variants={{
            enter: (dir: number) => ({
              x: dir > 0 ? 100 : -100,
              opacity: 0,
              position: "absolute",
            }),
            center: {
              x: 0,
              opacity: 1,
              position: "relative",
            },
            exit: (dir: number) => ({
              x: dir > 0 ? -100 : 100,
              opacity: 0,
              position: "absolute",
            }),
          }}
          transition={{ duration: 0.3 }}
          className="grid grid-cols-7 gap-1 min-h-[340px]"
        >
          {days.map((date) => {
            const dateStr = date.format("YYYY-MM-DD");
            const studyDay = studyMap[dateStr];

            if (filter !== "All" && studyDay?.status !== filter) return null;

            return (
              <CalendarDayCell
                key={dateStr}
                date={date}
                isCurrentMonth={date.month() + 1 === month}
                isToday={dateStr === today}
                studyDay={studyDay}
                onClick={onDayClick}
              />
            );
          })}
        </motion.div>
      </AnimatePresence>
    </>
  );
};

export default CalendarGrid;
