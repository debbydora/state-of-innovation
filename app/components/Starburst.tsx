/** Decorative starburst / sticker shape */
export default function Starburst({
  color,
  points = 10,
  className = "",
}: {
  color: string;
  points?: number;
  className?: string;
}) {
  const coords = Array.from({ length: points * 2 }, (_, i) => {
    const r = i % 2 === 0 ? 50 : 30;
    const a = (Math.PI * i) / points;
    return `${(50 + r * Math.sin(a)).toFixed(2)},${(50 - r * Math.cos(a)).toFixed(2)}`;
  }).join(" ");

  return (
    <svg
      viewBox="0 0 100 100"
      aria-hidden="true"
      className={`pointer-events-none select-none ${className}`}
    >
      <polygon points={coords} style={{ fill: color }} strokeLinejoin="round" />
    </svg>
  );
}
