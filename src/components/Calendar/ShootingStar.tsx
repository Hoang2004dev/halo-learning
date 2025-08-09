// src/components/calendar/ShootingStar.tsx
const ShootingStar = () => {
  return (
    <div className="absolute inset-0 z-40 pointer-events-none overflow-hidden">
      {[...Array(4)].map((_, i) => (
        <div
          key={i}
          className="absolute top-0 left-0 w-1 h-1 bg-white rounded-full animate-shooting-star"
          style={{
            animationDelay: `${i * 2}s`,
            top: `${Math.random() * 80}%`,
            left: `${Math.random() * 80}%`,
          }}
        />
      ))}
    </div>
  );
};

export default ShootingStar;
