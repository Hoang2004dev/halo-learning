// src/components/common/WaveFooter.tsx

const WaveFooter = () => {
  return (
    <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0] z-0 pointer-events-none select-none">
      <svg
        className="relative block w-[calc(150%+1.3px)] h-[80px] rotate-0"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        viewBox="0 0 1200 120"
      >
        <path
          d="M985.66 92.01c-75.41-8.49-150.83-17-227.15-9.57-75.42 7.41-150.84 30.17-227.16 34.74-75.41 4.55-150.83-11.09-227.15-15.66C229.78 97.65 154.36 110.24 77.55 108.25 51.36 107.58 25.18 105.16 0 101.47V120h1200V107.73c-31.4-3.25-62.8-6.5-95.34-8.71-39.46-2.74-79.28-5.7-119-6.99-33.33-1.08-66.66.19-99.98 2.98z"
          fill="currentColor"
          className="text-sky-100 dark:text-gray-900"
        ></path>
      </svg>
    </div>
  );
};

export default WaveFooter;
