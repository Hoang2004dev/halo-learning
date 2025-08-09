import MotionWrapper from "../common/MotionWrapper";

const StudyDaySuggestions = () => {
  const suggestions = [
    "Try a listening practice today 🎧",
    "Review yesterday’s grammar point 📘",
    "Add an example sentence for a vocab word ✍️",
    "Mark one item as completed ✅",
  ];

  return (
      <div className="bg-gradient-to-br from-rose-50 to-red-50 dark:from-gray-700 dark:to-gray-800 p-6 md:p-10 rounded-2xl shadow mb-6 w-full">
        <h2 className="text-xl font-semibold text-rose-700 dark:text-rose-300 mb-4 text-center">🧭 Suggestions for Today</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          {suggestions.map((suggestion, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow text-sm text-gray-800 dark:text-gray-200"
            >
              {suggestion}
            </div>
          ))}
        </div>
      </div>
  );
};

export default StudyDaySuggestions;
