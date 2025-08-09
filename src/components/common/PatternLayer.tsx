// src/components/common/PatternLayer.tsx
const PatternLayer = () => {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10"
      style={{
        backgroundImage:
          "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='220' height='220' viewBox='0 0 220 220'%3E%3Cg fill='none' stroke='%2394a3b8' stroke-width='1' opacity='0.2'%3E%3Cpath d='M0 18 C 45 10, 175 28, 220 18'/%3E%3Cpath d='M0 56 C 55 46, 165 66, 220 56'/%3E%3Cpath d='M0 94 C 40 84, 180 104, 220 94'/%3E%3Cpath d='M0 132 C 65 122, 155 142, 220 132'/%3E%3Cpath d='M0 170 C 50 160, 170 180, 220 170'/%3E%3Cpath d='M0 208 C 60 198, 160 218, 220 208'/%3E%3C/g%3E%3C/svg%3E\")",
        backgroundRepeat: "repeat",
        backgroundSize: "220px 220px",
      }}
    />
  );
};

export default PatternLayer;
