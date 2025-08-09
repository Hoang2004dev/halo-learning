import React from 'react';

interface TooltipProps {
  content: string;
  children: React.ReactNode;
  position?: 'top' | 'bottom'; // mở rộng nếu cần
}

const Tooltip: React.FC<TooltipProps> = ({ content, children, position = 'top' }) => {
  const posClass =
    position === 'top'
      ? 'bottom-full mb-2'
      : 'top-full mt-2';

  const arrowClass =
    position === 'top'
      ? 'top-full'
      : 'bottom-full rotate-45';

  return (
    <div className="group relative inline-block">
      {children}

      {/* Tooltip bubble */}
      <div
        className={`absolute z-50 ${posClass} left-1/2 -translate-x-1/2 
        opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 
        transition-all duration-200 ease-out
        whitespace-nowrap bg-gray-900 text-white text-xs px-3 py-1 
        rounded-lg shadow-lg pointer-events-none`}
      >
        {content}
        <div
          className={`absolute ${arrowClass} left-1/2 -translate-x-1/2 
          w-2 h-2 bg-gray-900 rotate-45 mt-[-1px]`}
        ></div>
      </div>
    </div>
  );
};

export default Tooltip;
