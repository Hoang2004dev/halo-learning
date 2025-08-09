// src/components/home/FeaturesSection.tsx

import { motion } from "framer-motion";
import { FaCalendarAlt, FaBook, FaUserFriends } from "react-icons/fa";

const features = [
  {
    title: "Flexible Study Planning",
    description:
      "Customize your daily, weekly, or topic-based schedule to stay on track.",
    icon: FaCalendarAlt,
    color: "text-sky-600",
    bg: "bg-sky-100 dark:bg-sky-900",
    border: "border-sky-200 dark:border-sky-700",
  },
  {
    title: "All-in-One Skill Training",
    description:
      "Improve vocabulary, grammar, listening, and speaking in one place.",
    icon: FaBook,
    color: "text-emerald-600",
    bg: "bg-emerald-100 dark:bg-emerald-900",
    border: "border-emerald-200 dark:border-emerald-700",
  },
  {
    title: "Designed for Vietnamese Learners",
    description:
      "A friendly Vietnamese interface, accessible across all devices.",
    icon: FaUserFriends,
    color: "text-orange-600",
    bg: "bg-orange-100 dark:bg-orange-900",
    border: "border-orange-200 dark:border-orange-700",
  },
];

const FeaturesSection = () => {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ delay: 0.3 }}
      className="z-0 mb-20 py-16 px-6 bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 rounded-3xl"
      aria-labelledby="features-title"
    >
      <h2
        id="features-title"
        className="text-3xl sm:text-4xl font-bold text-center mb-14 text-gray-800 dark:text-gray-100"
      >
        ✨ Why Choose Halo?
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {features.map((feature, i) => {
          const Icon = feature.icon as React.FC<React.SVGProps<SVGSVGElement>>;

          return (
            <motion.div
              key={i}
              whileHover={{ y: -6 }}
              transition={{ type: "spring", stiffness: 150 }}
              className={`rounded-2xl border shadow-sm hover:shadow-md transition-all p-6 ${feature.bg} ${feature.border}`}
            >
              <div className="flex flex-col items-center text-center space-y-4">
                <div
                  className={`w-14 h-14 rounded-full flex items-center justify-center bg-white dark:bg-gray-800 border ${feature.color}`}
                >
                  <Icon className={`text-2xl ${feature.color}`} />
                </div>
                <h3
                  className={`text-lg font-semibold mt-2 ${feature.color}`}
                >
                  {feature.title}
                </h3>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.section>
  );
};

export default FeaturesSection;
