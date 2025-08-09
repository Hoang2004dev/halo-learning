import { motion, Variants } from "framer-motion";
import { JSX, ReactNode } from "react";

type AnimationVariant =
  | "fade"
  | "fade-up"
  | "fade-down"
  | "fade-left"
  | "fade-right"
  | "zoom-in"
  | "slide-left"
  | "slide-right";

interface MotionWrapperProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
  variant?: AnimationVariant;
}

const getVariants = (variant: AnimationVariant, duration: number): Variants => {
  switch (variant) {
    case "fade":
      return {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration } },
      };
    case "fade-up":
      return {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration } },
      };
    case "fade-down":
      return {
        hidden: { opacity: 0, y: -30 },
        visible: { opacity: 1, y: 0, transition: { duration } },
      };
    case "fade-left":
      return {
        hidden: { opacity: 0, x: -30 },
        visible: { opacity: 1, x: 0, transition: { duration } },
      };
    case "fade-right":
      return {
        hidden: { opacity: 0, x: 30 },
        visible: { opacity: 1, x: 0, transition: { duration } },
      };
    case "zoom-in":
      return {
        hidden: { scale: 0.9, opacity: 0 },
        visible: { scale: 1, opacity: 1, transition: { duration } },
      };
    case "slide-left":
      return {
        hidden: { x: -50 },
        visible: { x: 0, transition: { duration } },
      };
    case "slide-right":
      return {
        hidden: { x: 50 },
        visible: { x: 0, transition: { duration } },
      };
    default:
      return {};
  }
};

const MotionWrapper = ({
  children,
  delay = 0,
  duration = 0.6,
  className = "",
  as: ElementTag = "div",
  variant = "fade-up",
}: MotionWrapperProps) => {
  const MotionElement = motion(ElementTag);
  const variants = getVariants(variant, duration);

  return (
    <MotionElement
      className={className}
      custom={delay}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      {children}
    </MotionElement>
  );
};

export default MotionWrapper;
