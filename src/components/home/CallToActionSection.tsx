// src/components/home/CallToActionSection.tsx

import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaRocket, FaCheckCircle } from "react-icons/fa";
import ctaImg from "../../assets/images/cta_learning.png"; // nếu có hình minh họa
const RocketIcon = FaRocket as React.FC<React.SVGProps<SVGSVGElement>>;

const CallToActionSection = () => {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="z-0 mt-24 bg-gradient-to-br from-sky-100 to-emerald-100 dark:from-sky-900 dark:to-emerald-900 rounded-3xl py-16 px-6 shadow-lg"
    >
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        {/* Left content */}
        <div className="space-y-6 text-center md:text-left">
          <h2 className="text-3xl sm:text-4xl font-bold text-emerald-700 dark:text-emerald-300 flex items-center justify-center md:justify-start gap-2">
            <RocketIcon className="text-sky-500 text-2xl" />
            Ready to Level Up Your Learning?
          </h2>
          <p className="text-gray-700 dark:text-gray-300 text-base">
            Create your free Halo account and start a personalized,
            science-backed learning journey today.
          </p>
          <ul className="text-sm text-gray-700 dark:text-gray-400 space-y-2 pl-6 list-disc">
            <li>Smart scheduling tailored to your goals</li>
            <li>Learn vocabulary, grammar, and speaking in one place</li>
            <li>Track your daily progress and stay motivated</li>
          </ul>
          <Link
            to="/register"
            className="inline-block mt-4 px-6 py-3 bg-emerald-600 text-white rounded-full font-semibold hover:bg-emerald-700 transition"
          >
            ✍️ Join Now – It's Free
          </Link>
        </div>

        {/* Right illustration */}
        <div className="flex justify-center">
          <img
            src={ctaImg}
            alt="Join Halo"
            className="w-full max-w-md rounded-xl shadow-xl dark:shadow-emerald-800"
          />
        </div>
      </div>
    </motion.section>
  );
};

export default CallToActionSection;
