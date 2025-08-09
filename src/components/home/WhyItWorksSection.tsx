// src/components/home/WhyItWorksSection.tsx

import { motion } from "framer-motion";
import { FaBrain, FaUserCheck, FaLightbulb } from "react-icons/fa";

const whyItWorks = [
  {
    title: "Modern Learning Methodology",
    desc: "Halo uses cognitive science-backed techniques to enhance memory retention and understanding.",
    icon: FaBrain,
    color: "text-sky-600",
    bgColor: "bg-sky-50 dark:bg-sky-900",
    borderColor: "border-sky-200 dark:border-sky-700",
  },
  {
    title: "Personalized Learning Paths",
    desc: "Content is tailored to your level, goals, and progress for effective and motivating study.",
    icon: FaUserCheck,
    color: "text-emerald-600",
    bgColor: "bg-emerald-50 dark:bg-emerald-900",
    borderColor: "border-emerald-200 dark:border-emerald-700",
  },
  {
    title: "Smart Practice Suggestions",
    desc: "Daily recommendations help you focus on what matters most to reach fluency faster.",
    icon: FaLightbulb,
    color: "text-yellow-600",
    bgColor: "bg-yellow-50 dark:bg-yellow-900",
    borderColor: "border-yellow-200 dark:border-yellow-700",
  },
];

const WhyItWorksSection = () => {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="z-0 py-20 bg-gradient-to-br from-white to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-3xl mb-20 px-6"
      aria-labelledby="why-it-works-title"
    >
      <h2
        id="why-it-works-title"
        className="text-3xl sm:text-4xl font-bold text-center mb-14 text-sky-700 dark:text-sky-400"
      >
        🧠 Why is Halo so effective?
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {whyItWorks.map((item, i) => {
          const Icon = item.icon as React.FC<React.SVGProps<SVGSVGElement>>;

          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.1 }}
              whileHover={{ y: -4 }}
              className={`rounded-2xl p-6 border shadow-sm hover:shadow-md transition-all ${item.bgColor} ${item.borderColor}`}
            >
              <div className="flex flex-col space-y-4">
                <Icon className={`text-3xl ${item.color}`} />
                <h3 className={`text-lg font-semibold ${item.color}`}>
                  {item.title}
                </h3>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  {item.desc}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.section>
  );
};

export default WhyItWorksSection;
