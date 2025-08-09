import { useEffect, useState } from "react";
import { StudyDayDto } from "../../models/studyDay";
import { studyDayApi } from "../../api/studyDayApi";
import { useNavigate } from "react-router-dom";
import StudyDayForm from "./StudyDayForm";
import HaloCalendar from "../../components/Calendar/HaloCalendar";
import StudyDayQuote from "../../components/studyDay/StudyDayQuote";
import StudyDayStats from "../../components/studyDay/StudyDayStats";
import StudyDayTips from "../../components/studyDay/StudyDayTips";
import StudyDaySuggestions from "../../components/studyDay/StudyDaySuggestions";
import { CalendarFilterProvider } from "../../contexts/CalendarFilterContext";
import dayjs from "dayjs";

const StudyDayList = () => {
  const [openForm, setOpenForm] = useState(false);
  const [editData, setEditData] = useState<StudyDayDto | undefined>();
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [studyMap, setStudyMap] = useState<Record<string, StudyDayDto>>({});
  const navigate = useNavigate();

  const fetchStudyDays = async () => {
    try {
      const res = await studyDayApi.getAll();
      const map = Object.fromEntries(
        res.map((item) => [dayjs(item.targetDate).format("YYYY-MM-DD"), item])
      );
      setStudyMap(map);
    } catch (error) {
      console.error("❌ Failed to fetch study days", error);
    }
  };

  useEffect(() => {
    fetchStudyDays();
  }, []);

  const handleDateClick = (dateStr: string, studyDay?: StudyDayDto) => {
    if (studyDay) {
      navigate(`/study-day/${studyDay.id}`);
    } else {
      setSelectedDate(dateStr);
      setEditData(undefined);
      setOpenForm(true);
    }
  };

  const handleSuccess = () => {
    setOpenForm(false);
    setSelectedDate(null);
    fetchStudyDays();
  };

  // StudyDayList.tsx (đoạn return)
  return (
    <CalendarFilterProvider>
      <div className="min-h-screen w-full overflow-x-hidden bg-transparent py-8">
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {/* Top Section: Quote + Stats | Calendar */}
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="lg:w-1/3 space-y-6">
              <StudyDayQuote />
              <StudyDayStats studyMap={studyMap} />
            </div>

            <div className="lg:w-2/3">
              {/* Card bên trong vẫn có nền riêng để nội dung dễ đọc */}
              <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-6 h-full">
                <HaloCalendar
                  studyMap={studyMap}
                  onDateClick={handleDateClick}
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <StudyDayTips />
            <StudyDaySuggestions />
          </div>
        </div>

        {selectedDate && (
          <StudyDayForm
            open={openForm}
            onClose={() => {
              setOpenForm(false);
              setSelectedDate(null);
            }}
            onSuccess={handleSuccess}
            mode="create"
            initialData={{
              id: 0,
              targetDate: selectedDate,
              note: "",
              status: "NotStarted",
            }}
          />
        )}
      </div>
    </CalendarFilterProvider>
  );
};

export default StudyDayList;
