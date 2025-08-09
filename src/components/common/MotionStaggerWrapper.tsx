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

interface MotionStaggerWrapperProps {
  items: ReactNode[];
  variant?: AnimationVariant;
  baseDelay?: number;     // thời gian chờ ban đầu (s)
  stepDelay?: number;     // thời gian trễ giữa các phần tử
  duration?: number;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
}

const getVariants = (variant: AnimationVariant, duration: number): Variants => {
  switch (variant) {
    case "fade":
      return {
        hidden: { opacity: 0 },
        visible: (i: number) => ({
          opacity: 1,
          transition: { delay: i * 0.1, duration },
        }),
      };
    case "fade-up":
      return {
        hidden: { opacity: 0, y: 30 },
        visible: (i: number) => ({
          opacity: 1,
          y: 0,
          transition: { delay: i * 0.1, duration },
        }),
      };
    case "zoom-in":
      return {
        hidden: { scale: 0.9, opacity: 0 },
        visible: (i: number) => ({
          scale: 1,
          opacity: 1,
          transition: { delay: i * 0.1, duration },
        }),
      };
    default:
      return {
        hidden: {},
        visible: {},
      };
  }
};

const MotionStaggerWrapper = ({
  items,
  variant = "fade-up",
  baseDelay = 0,
  stepDelay = 0.1,
  duration = 0.5,
  className = "",
  as: ElementTag = "div",
}: MotionStaggerWrapperProps) => {
  const MotionElement = motion(ElementTag);
  const variants = getVariants(variant, duration);

  return (
    <div className={className}>
      {items.map((item, i) => (
        <MotionElement
          key={i}
          variants={variants}
          initial="hidden"
          whileInView="visible"
          custom={baseDelay + i * stepDelay}
          viewport={{ once: true, amount: 0.2 }}
        >
          {item}
        </MotionElement>
      ))}
    </div>
  );
};

export default MotionStaggerWrapper;
