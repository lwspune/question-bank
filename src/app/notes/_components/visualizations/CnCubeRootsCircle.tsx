/**
 * The three cube roots of unity — 1, ω, ω² — as points on the unit circle,
 * 120° apart, forming an equilateral triangle (they sum to 0). Static SVG.
 */
export default function CnCubeRootsCircle() {
  const W = 220;
  const H = 200;
  const cx = W / 2;
  const cy = H / 2;
  const R = 70;
  // angles: 0°, 120°, 240°
  const pts = [0, 120, 240].map((d) => {
    const a = (d * Math.PI) / 180;
    return { x: cx + R * Math.cos(a), y: cy - R * Math.sin(a), d };
  });
  const labels = ["1", "ω", "ω²"];

  return (
    <div className="mx-auto max-w-xs rounded-xl border bg-indigo-50/40 p-4 dark:bg-indigo-950/20">
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full" role="img" aria-label="The three cube roots of unity — 1, omega and omega squared — equally spaced 120 degrees apart on the unit circle, forming an equilateral triangle centred at the origin.">
        {/* axes */}
        <line x1={16} y1={cy} x2={W - 12} y2={cy} className="stroke-slate-400" strokeWidth="0.7" />
        <line x1={cx} y1={16} x2={cx} y2={H - 14} className="stroke-slate-400" strokeWidth="0.7" />
        {/* unit circle */}
        <circle cx={cx} cy={cy} r={R} className="fill-none stroke-slate-300 dark:stroke-slate-600" strokeWidth="1" />
        {/* equilateral triangle */}
        <polygon points={pts.map((p) => `${p.x},${p.y}`).join(" ")} className="fill-indigo-200/40 stroke-indigo-500 dark:fill-indigo-400/15" strokeWidth="1.4" />
        {/* radii + points */}
        {pts.map((p, i) => (
          <g key={i}>
            <line x1={cx} y1={cy} x2={p.x} y2={p.y} className="stroke-indigo-600 dark:stroke-indigo-300" strokeWidth="1.2" />
            <circle cx={p.x} cy={p.y} r={4} className="fill-indigo-600 dark:fill-indigo-300" />
            <text x={p.x + (p.x >= cx ? 7 : -16)} y={p.y + (p.y > cy ? 14 : -6)} className="fill-indigo-900 dark:fill-indigo-100" fontSize="12" fontWeight="600">{labels[i]}</text>
          </g>
        ))}
        <text x={cx + 6} y={cy - 6} className="fill-slate-500" fontSize="9">120°</text>
        <text x={cx} y={H - 2} className="fill-slate-500" fontSize="8.5" textAnchor="middle">1 + ω + ω² = 0</text>
      </svg>
    </div>
  );
}
