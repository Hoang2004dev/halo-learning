//D:\ReactJS Project\halo-learning\src\components\common\FeatureCard.tsx
import React, { FunctionComponent } from 'react';
import { IconType, IconBaseProps } from 'react-icons';

interface FeatureCardProps {
  icon: IconType;
  title: string;
  description: string;
  colorClass?: string;       // Icon color
  containerColor?: string;   // Container bg color
  textColor?: string;        // Optional override text color
}

const FeatureCard = ({
  icon,
  title,
  description,
  colorClass = 'text-white',
  containerColor = 'bg-orange-100',
  textColor = 'text-slate-800',
}: FeatureCardProps) => {
  // ✅ Ép kiểu rõ ràng trước khi render JSX
  const IconComponent = icon as FunctionComponent<IconBaseProps>;

  return (
    <div className={`p-6 rounded-xl shadow-sm border border-transparent hover:shadow-md transition ${containerColor}`}>
      <div className="mb-4">
        <IconComponent className={`${colorClass} text-2xl`} />
      </div>
      <h3 className={`text-lg font-bold mb-2 ${textColor}`}>{title}</h3>
      <p className={`text-sm ${textColor} opacity-80`}>{description}</p>
    </div>
  );
};

export default FeatureCard;
