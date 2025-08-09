import React, { createContext, useContext, useState } from "react";
import { StudyDayStatus } from "../models/studyDay";

interface CalendarFilterState {
  month: number;
  year: number;
  filter: StudyDayStatus | "All";
  setMonth: (m: number) => void;
  setYear: (y: number) => void;
  setFilter: (f: StudyDayStatus | "All") => void;
}

const CalendarFilterContext = createContext<CalendarFilterState | undefined>(undefined);

export const CalendarFilterProvider = ({ children }: { children: React.ReactNode }) => {
  const now = new Date();
  const [month, setMonth] = useState(now.getMonth() + 1); // 1-12
  const [year, setYear] = useState(now.getFullYear());
  const [filter, setFilter] = useState<StudyDayStatus | "All">("All");

  return (
    <CalendarFilterContext.Provider
      value={{ month, year, filter, setMonth, setYear, setFilter }}
    >
      {children}
    </CalendarFilterContext.Provider>
  );
};

export const useCalendarFilter = () => {
  const context = useContext(CalendarFilterContext);
  if (!context) throw new Error("useCalendarFilter must be used within CalendarFilterProvider");
  return context;
};
