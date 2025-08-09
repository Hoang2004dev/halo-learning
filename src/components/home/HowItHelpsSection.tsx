// src/components/home/HowItHelpsSection.tsx

import { motion } from "framer-motion";
import { FaCalendarAlt, FaMobileAlt, FaCloud } from "react-icons/fa";

const items = [
  {
    title: "Custom Learning Schedule",
    desc: "Pick your study days and track progress your own way.",
    subText: "Study on weekends or anytime that suits your lifestyle.",
    icon: FaCalendarAlt,
    bgColor: "bg-sky-50 dark:bg-sky-900",
    borderColor: "border-sky-200 dark:border-sky-700",
    textColor: "text-sky-700 dark:text-sky-300",
  },
  {
    title: "User-Friendly Interface",
    desc: "Smooth learning on all devices with zero friction.",
    subText: "Perfect for beginners and even young students.",
    icon: FaMobileAlt,
    bgColor: "bg-emerald-50 dark:bg-emerald-900",
    borderColor: "border-emerald-200 dark:border-emerald-700",
    textColor: "text-emerald-700 dark:text-emerald-300",
  },
  {
    title: "Sync & Security",
    desc: "Your learning data is securely stored and always accessible.",
    subText: "Never lose progress — even when switching devices.",
    icon: FaCloud,
    bgColor: "bg-orange-50 dark:bg-orange-900",
    borderColor: "border-orange-200 dark:border-orange-700",
    textColor: "text-orange-600 dark:text-orange-300",
  },
];

const HowItHelpsSection = () => {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ delay: 0.2 }}
      className="z-0 mt-24 bg-gradient-to-br from-white to-gray-100 dark:from-gray-800 dark:to-gray-900 py-20 px-6 rounded-3xl shadow-xl"
    >
      <h2 className="text-3xl sm:text-4xl font-bold text-center mb-16 text-sky-700 dark:text-sky-400">
        📚 How does Halo help you?
      </h2>

      <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">
        {items.map((item, i) => {
          const Icon = item.icon as React.FC<React.SVGProps<SVGSVGElement>>;

          return (
            <motion.div
              key={i}
              whileHover={{ y: -6 }}
              transition={{ type: "spring", stiffness: 150 }}
              className={`rounded-2xl p-6 border shadow-sm hover:shadow-md transition-all ${item.bgColor} ${item.borderColor}`}
            >
              <div className="flex flex-col items-start space-y-4">
                <Icon className={`text-3xl ${item.textColor}`} />
                <h3 className={`text-lg font-semibold ${item.textColor}`}>
                  {item.title}
                </h3>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  {item.desc}
                </p>
                <p className="text-xs italic text-gray-500 dark:text-gray-400">
                  {item.subText}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.section>
  );
};

export default HowItHelpsSection;
