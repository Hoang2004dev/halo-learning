import { FaQuoteLeft } from "react-icons/fa";
import MotionWrapper from "../common/MotionWrapper";

const Icon = FaQuoteLeft as unknown as React.FC<React.SVGProps<SVGSVGElement>>;

const StudyDayQuote = () => {
  return (
      <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-gray-700 dark:to-gray-800 p-6 md:p-10 rounded-2xl shadow mb-6 w-full">
        <div className="text-2xl md:text-3xl text-center font-semibold text-yellow-800 dark:text-yellow-300 flex items-start justify-center gap-3">
          <Icon className="text-yellow-500 mt-1" />
          “Learning is not attained by chance, it must be sought for with ardor and attended to with diligence.”
        </div>
        <p className="text-right text-sm mt-3 text-yellow-700 dark:text-yellow-400">— Abigail Adams</p>
      </div>
  );
};

export default StudyDayQuote;
