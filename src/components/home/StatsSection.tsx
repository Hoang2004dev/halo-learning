import { motion } from "framer-motion";
import {
  FaUserFriends,
  FaBook,
  FaChartLine,
  FaRocket,
  FaStar,
} from "react-icons/fa";
import { IconType } from "react-icons";

const stats: {
  value: string;
  label: string;
  description: string;
  icon: IconType;
  bgColor: string;
  textColor: string;
  iconColor: string;
}[] = [
  {
    value: "10K+",
    label: "Trusted Users",
    description: "Learners who trust and use Halo every day.",
    icon: FaUserFriends,
    bgColor: "bg-sky-100 dark:bg-sky-800",
    textColor: "text-sky-700 dark:text-sky-300",
    iconColor: "text-sky-500",
  },
  {
    value: "500+",
    label: "Rich Lessons",
    description: "Covering vocabulary, grammar, listening and more.",
    icon: FaBook,
    bgColor: "bg-emerald-100 dark:bg-emerald-800",
    textColor: "text-emerald-700 dark:text-emerald-300",
    iconColor: "text-emerald-500",
  },
  {
    value: "95%",
    label: "Satisfaction Rate",
    description: "High satisfaction from learners of all levels.",
    icon: FaChartLine,
    bgColor: "bg-orange-100 dark:bg-orange-800",
    textColor: "text-orange-700 dark:text-orange-300",
    iconColor: "text-orange-500",
  },
];

const StatsSection = () => {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.2 }}
      className="z-0 py-16 bg-gradient-to-tr from-white via-sky-50 to-emerald-50 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800 rounded-3xl mb-20"
      aria-labelledby="stats-title"
    >
      <h2
        id="stats-title"
        className="text-3xl sm:text-4xl font-extrabold text-center mb-14 text-emerald-700 dark:text-emerald-300"
      >
        📊 Halo's Achievements
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-6xl mx-auto px-4">
        {stats.map((stat, i) => {
          const Icon = stat.icon as React.FC<React.SVGProps<SVGSVGElement>>;

          return (
            <motion.div
              key={i}
              initial={{ scale: 0.95, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 + i * 0.15 }}
              className={`rounded-2xl shadow-lg p-6 hover:scale-[1.03] transition-transform duration-300 border dark:border-gray-700 ${stat.bgColor}`}
            >
              <div className="flex flex-col items-center text-center space-y-3">
                <Icon className={`text-4xl ${stat.iconColor}`} />
                <h3 className={`text-3xl font-bold ${stat.textColor}`}>
                  {stat.value}
                </h3>
                <p className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                  {stat.label}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {stat.description}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.section>
  );
};

export default StatsSection;
