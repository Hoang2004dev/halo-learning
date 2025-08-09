// src/components/common/AnimatedPattern.tsx
import { useMemo } from "react";

const NUM_ELEMENTS = 60;

const getRandom = (min: number, max: number) =>
  Math.random() * (max - min) + min;

const generateElements = () => {
  const shapes = ["circle", "rect", "triangle"];
  const elements = [];

  for (let i = 0; i < NUM_ELEMENTS; i++) {
    const x = getRandom(0, 100);
    const y = getRandom(0, 100);
    const size = getRandom(1, 3);
    const shape = shapes[Math.floor(Math.random() * shapes.length)];
    const delay = getRandom(0, 6);

    elements.push({ x, y, size, shape, delay });
  }

  return elements;
};

const AnimatedPattern = () => {
  const elements = useMemo(() => generateElements(), []);

  return (
    <div className="absolute inset-0 -z-10 pointer-events-none select-none">
      <svg
        className="w-full h-full animate-drift-slow"
        viewBox="0 0 100 100"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <radialGradient id="haloGradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#34d399" stopOpacity="0.3" />
          </radialGradient>
        </defs>

        {elements.map((el, index) => {
          const { x, y, size, shape, delay } = el;

          const commonProps = {
            key: index,
            fill: "url(#haloGradient)",
            transform: `translate(${x}, ${y})`,
          };

          const animate = (
            <animate
              attributeName="opacity"
              values="0.3;0.7;0.3"
              dur="6s"
              begin={`${delay}s`}
              repeatCount="indefinite"
            />
          );

          if (shape === "circle") {
            return (
              <circle r={size} {...commonProps}>
                {animate}
              </circle>
            );
          } else if (shape === "rect") {
            return (
              <rect width={size} height={size} {...commonProps}>
                {animate}
              </rect>
            );
          } else if (shape === "triangle") {
            const points = `0,${-size} ${size},${size} ${-size},${size}`;
            return (
              <polygon points={points} {...commonProps}>
                {animate}
              </polygon>
            );
          }
        })}
      </svg>
    </div>
  );
};

export default AnimatedPattern;
