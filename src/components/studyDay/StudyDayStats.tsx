import { StudyDayDto } from "../../models/studyDay";
import { useCalendarFilter } from "../../contexts/CalendarFilterContext";
import dayjs from "dayjs";
import { useState } from "react";
import {
  PieChart,
  Pie,
  Tooltip,
  Cell,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface Props {
  studyMap: Record<string, StudyDayDto>;
}

const COLORS = [
  "#10B981", // Completed
  "#FBBF24", // In Progress
  "#F87171", // Not Started
  "#8B5CF6", // Overdue
  "#9CA3AF", // No Data
];

const StudyDayStats = ({ studyMap }: Props) => {
  const { month, year, filter } = useCalendarFilter();
  const [viewMode, setViewMode] = useState<"bar" | "pie">("bar");

  const daysInMonth = dayjs(`${year}-${month}-01`).daysInMonth();

  // Filter StudyDays in selected month + (if needed) matching status
  const studyDaysInMonth = Object.values(studyMap).filter((day) => {
    const date = dayjs(day.targetDate);
    const isSameMonth = date.month() + 1 === month && date.year() === year;
    const matchFilter = filter === "All" || day.status === filter;
    return isSameMonth && matchFilter;
  });

  const statusCount = {
    Completed: 0,
    InProgress: 0,
    NotStarted: 0,
    Overdue: 0,
  };

  studyDaysInMonth.forEach((day) => {
    if (statusCount.hasOwnProperty(day.status)) {
      statusCount[day.status as keyof typeof statusCount]++;
    }
  });

  const knownDays = Object.values(studyMap).filter((d) => {
    const date = dayjs(d.targetDate);
    return date.month() + 1 === month && date.year() === year;
  }).length;

  const noDataCount = daysInMonth - knownDays;

  const stats = [
    {
      label: "✅ Completed",
      value: statusCount.Completed,
      percent: ((statusCount.Completed / daysInMonth) * 100).toFixed(1),
      color: "bg-green-500",
    },
    {
      label: "🔵 In Progress",
      value: statusCount.InProgress,
      percent: ((statusCount.InProgress / daysInMonth) * 100).toFixed(1),
      color: "bg-yellow-400",
    },
    {
      label: "🟡 Not Started",
      value: statusCount.NotStarted,
      percent: ((statusCount.NotStarted / daysInMonth) * 100).toFixed(1),
      color: "bg-red-400",
    },
    {
      label: "⏰ Overdue",
      value: statusCount.Overdue,
      percent: ((statusCount.Overdue / daysInMonth) * 100).toFixed(1),
      color: "bg-purple-500",
    },
    {
      label: "📭 No Data",
      value: noDataCount,
      percent: ((noDataCount / daysInMonth) * 100).toFixed(1),
      color: "bg-gray-400",
    },
  ];

  const handleExport = () => {
    const csvData =
      `Status,Count,Percent\n` +
      stats
        .map((s) => `${s.label},${s.value},${s.percent}%`)
        .join("\n");

    const blob = new Blob([csvData], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `study_stats_${month}_${year}.csv`;
    a.click();
  };

  return (
    <div className="bg-gradient-to-br from-sky-50 to-emerald-50 dark:from-gray-700 dark:to-gray-800 p-6 md:p-10 rounded-2xl shadow w-full">
      <h2 className="text-xl font-semibold text-center text-emerald-700 dark:text-emerald-300 mb-6">
        📊 Study Progress - {month}/{year} ({filter === "All" ? "All statuses" : filter})
      </h2>

      {/* Toolbar */}
      <div className="flex justify-between items-center mb-6 flex-wrap gap-3">
        <div className="flex gap-2">
          <button
            onClick={() => setViewMode("bar")}
            className={`px-3 py-1 rounded-full text-sm font-medium transition ${
              viewMode === "bar"
                ? "bg-blue-500 text-white"
                : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
            }`}
          >
            📊 Bar View
          </button>
          <button
            onClick={() => setViewMode("pie")}
            className={`px-3 py-1 rounded-full text-sm font-medium transition ${
              viewMode === "pie"
                ? "bg-blue-500 text-white"
                : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
            }`}
          >
            🥧 Pie Chart
          </button>
        </div>

        <button
          onClick={handleExport}
          className="text-sm px-4 py-1.5 bg-emerald-500 hover:bg-emerald-600 text-white rounded-full transition"
        >
          📥 Export CSV
        </button>
      </div>

      {/* Chart Area */}
      {viewMode === "bar" ? (
        <div className="space-y-4">
          {stats.map((stat, idx) => (
            <div key={idx}>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-700 dark:text-gray-200">{stat.label}</span>
                <span className="text-gray-500 dark:text-gray-300">
                  {stat.value} days ({stat.percent}%)
                </span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                <div
                  className={`${stat.color} h-3 rounded-full transition-all duration-500`}
                  style={{ width: `${stat.percent}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="h-64">
          <ResponsiveContainer>
            <PieChart>
              <Pie
                data={stats}
                dataKey="value"
                nameKey="label"
                cx="50%"
                cy="50%"
                outerRadius={80}
                label={(entry) => `${entry.percent}%`}
              >
                {stats.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend verticalAlign="bottom" />
            </PieChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* Footer */}
      <div className="mt-6 text-center text-gray-600 dark:text-gray-300 text-sm italic">
        Tracked: <span className="font-semibold">{knownDays}</span> /
        <span className="font-semibold"> {daysInMonth}</span> days in{" "}
        {dayjs(`${year}-${month}-01`).format("MMMM YYYY")}
      </div>
    </div>
  );
};

export default StudyDayStats;
