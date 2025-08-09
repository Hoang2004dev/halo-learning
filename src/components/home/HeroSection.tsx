// src/components/home/HeroSection.tsx

import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import heroImg from "../../assets/images/learning_hero.png";

const HeroSection = () => {
  return (
    <div className="relative z-0 w-full bg-gradient-to-r from-sky-100 via-white to-emerald-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 overflow-hidden rounded-3xl shadow-lg">
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 flex flex-col md:flex-row items-center"
      >
        {/* Left Content */}
        <div className="flex-1 space-y-6 text-center md:text-left">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-sky-700 dark:text-sky-300 leading-tight">
            🌟 Learn Smarter with{" "}
            <span className="text-emerald-500">Halo Learning</span>
          </h1>
          <p className="text-base sm:text-lg text-gray-700 dark:text-gray-300 max-w-lg mx-auto md:mx-0">
            A personalized study platform that helps you master vocabulary,
            grammar, and communication skills — anytime, anywhere.
          </p>
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 max-w-md mx-auto md:mx-0">
            Designed for Vietnamese learners, powered by smart scheduling, and
            optimized for consistent progress.
          </p>
          <Link
            to="/study-day"
            className="inline-block px-6 py-3 bg-sky-600 text-white rounded-full font-semibold hover:bg-sky-700 transition focus:outline-none focus:ring-2 focus:ring-sky-500"
            aria-label="Start learning now with Halo"
          >
            🚀 Start Learning Now
          </Link>
        </div>

        {/* Right Image */}
        <div className="flex-1 mt-12 md:mt-0 flex justify-center">
          <img
            src={heroImg}
            alt="Learning with Halo"
            className="w-full max-w-md md:max-w-lg object-contain drop-shadow-xl"
            loading="lazy"
          />
        </div>
      </motion.section>

      {/* Wave Background */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0] rotate-180">
        <svg
          className="relative block w-[calc(150%+1.3px)] h-[80px]"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          viewBox="0 0 1200 120"
        >
          <path
            d="M985.66 92.01c-75.41-8.49-150.83-17-227.15-9.57-75.42 7.41-150.84 30.17-227.16 34.74-75.41 4.55-150.83-11.09-227.15-15.66C229.78 97.65 154.36 110.24 77.55 108.25 51.36 107.58 25.18 105.16 0 101.47V0h1200v107.73c-31.4-3.25-62.8-6.5-95.34-8.71-39.46-2.74-79.28-5.7-119-6.99-33.33-1.08-66.66.19-99.98 2.98z"
            fill="currentColor"
            className="text-white dark:text-gray-900"
          ></path>
        </svg>
      </div>
    </div>
  );
};

export default HeroSection;
