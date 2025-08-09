import MotionWrapper from "../common/MotionWrapper";

const StudyDayTips = () => {
  const tips = [
    "📌 Review new words every day",
    "🧠 Combine listening with writing",
    "🕒 Study in short, focused sessions",
    "📅 Stick to your daily plan",
  ];

  return (
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-700 dark:to-gray-800 p-6 md:p-10 rounded-2xl shadow mb-6 w-full">
        <h2 className="text-xl font-semibold text-indigo-700 dark:text-indigo-300 mb-4 text-center">💡 Learning Tips</h2>
        <ul className="list-disc pl-6 text-gray-700 dark:text-gray-200 space-y-2">
          {tips.map((tip, index) => (
            <li key={index}>{tip}</li>
          ))}
        </ul>
      </div>
  );
};

export default StudyDayTips;
