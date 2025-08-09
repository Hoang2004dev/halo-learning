import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import heroImg from "../assets/images/learning_hero.png";
import {
  FaBook,
  FaCalendarAlt,
  FaUserFriends,
  FaChartLine,
} from "react-icons/fa";
import FeatureCard from "../components/common/FeatureCard";
import HowItHelpsSection from "../components/home/HowItHelpsSection";
import TestimonialsSection from "../components/home/TestimonialsSection";
import CallToActionSection from "../components/home/CallToActionSection";
import HeroSection from "../components/home/HeroSection";
import StatsSection from "../components/home/StatsSection";
import FeaturesSection from "../components/home/FeaturesSection";
import WhyItWorksSection from "../components/home/WhyItWorksSection";
import { IconType } from "react-icons";
import { FunctionComponent } from "react";
import { IconBaseProps } from "react-icons";
import AnimatedPattern from "../components/common/AnimatedPattern";
import WaveBackground from "../components/common/WaveBackground";
import WaveFooter from "../components/common/WaveFooter";

const features: {
  title: string;
  description: string;
  icon: IconType;
  colorClass?: string;
  containerColor?: string;
  textColor?: string;
}[] = [
  {
    title: "Lập kế hoạch học tập dễ dàng",
    description:
      "Tùy chỉnh lịch học theo ngày, chủ đề, và theo dõi tiến độ cá nhân hóa.",
    icon: FaCalendarAlt,
    colorClass: "text-sky-600",
    containerColor: "bg-sky-50",
    textColor: "text-gray-800",
  },
  {
    title: "Học mọi kỹ năng",
    description:
      "Luyện từ vựng, ngữ pháp, nghe – nói với bài học sinh động, dễ hiểu.",
    icon: FaBook,
    colorClass: "text-emerald-600",
    containerColor: "bg-emerald-50",
    textColor: "text-gray-800",
  },
  {
    title: "Thiết kế cho người Việt",
    description: "Giao diện tiếng Việt thân thiện, tối ưu cho mọi thiết bị.",
    icon: FaUserFriends,
    colorClass: "text-orange-600",
    containerColor: "bg-orange-50",
    textColor: "text-gray-800",
  },
];

// Define stats with explicit IconType for icon property
const stats: {
  value: string;
  label: string;
  icon: IconType; // Explicitly type as IconType
}[] = [
  { value: "10K+", label: "Người dùng tin cậy", icon: FaUserFriends },
  { value: "500+", label: "Bài học đa dạng", icon: FaBook },
  { value: "95%", label: "Tỷ lệ hài lòng", icon: FaChartLine },
];

const HomePage = () => {
  return (
    <div className="relative overflow-hidden text-gray-800 dark:text-gray-100 px-4 sm:px-6 py-12 max-w-7xl mx-auto">
      <AnimatedPattern />
      <WaveBackground />
      <HeroSection />
      <StatsSection />
      <FeaturesSection />
      <WhyItWorksSection />
      <HowItHelpsSection />
      <TestimonialsSection />
      <CallToActionSection />
      <WaveFooter />
    </div>
  );
};

export default HomePage;
