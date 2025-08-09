// src/components/home/TestimonialsSection.tsx

import { motion } from "framer-motion";
import { FaQuoteLeft } from "react-icons/fa";
const QuoteIcon = FaQuoteLeft as React.FC<React.SVGProps<SVGSVGElement>>;

const testimonials = [
  {
    text: `"I used to struggle with motivation, but since I started using Halo, learning has actually become enjoyable!"`,
    name: "— Linh, FPT University Student",
    color: "text-sky-600",
    avatar: "https://i.pravatar.cc/100?img=1",
  },
  {
    text: `"I love the vocabulary features with examples and audio. It’s perfect for daily listening practice."`,
    name: "— Tuan, IELTS Learner",
    color: "text-emerald-600",
    avatar: "https://i.pravatar.cc/100?img=8",
  },
  {
    text: `"The interface feels very Vietnamese-friendly. It's intuitive and works great even for online learners like me."`,
    name: "— Ha, Office Worker",
    color: "text-orange-500",
    avatar: "https://i.pravatar.cc/100?img=5",
  },
];

const TestimonialsSection = () => {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ delay: 0.2 }}
      className="z-0 mt-24 bg-gradient-to-tr from-emerald-50 to-sky-50 dark:from-gray-800 dark:to-gray-900 py-20 px-6 rounded-3xl shadow-xl"
    >
      <h2 className="text-3xl font-bold text-center mb-14 text-emerald-700 dark:text-emerald-300">
        💬 What do learners say about Halo?
      </h2>

      <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto text-sm">
        {testimonials.map((item, i) => (
          <motion.div
            key={i}
            whileHover={{ y: -4 }}
            transition={{ type: "spring", stiffness: 150 }}
            className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md border border-gray-100 dark:border-gray-700 flex flex-col justify-between h-full"
          >
            <QuoteIcon className={`text-2xl mb-3 ${item.color}`} />
            <p className="italic text-gray-700 dark:text-gray-300 mb-4">
              {item.text}
            </p>
            <div className="flex items-center justify-end space-x-3">
              <img
                src={item.avatar}
                alt={item.name}
                className="w-10 h-10 rounded-full object-cover border border-gray-300 dark:border-gray-600"
              />
              <span className={`font-medium ${item.color}`}>{item.name}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};

export default TestimonialsSection;
