/**
 * The sign of f′ governs monotonicity: where f′ > 0 the curve rises, where
 * f′ < 0 it falls, turning at the critical points. Static SVG (a cubic).
 */
export default function AodSignOfDerivative() {
  const W = 300;
  const H = 200;
  const ox = 40;
  const oy = 110;
  const u = 34;

  // y = x^3 - 3x scaled, x in [-2.1, 2.1]; critical points at x = ±1
  const pts: string[] = [];
  for (let i = 0; i <= 80; i++) {
    const x = -2.1 + (4.2 * i) / 80;
    const y = (x * x * x - 3 * x) / 2.2;
    pts.push(`${ox + (x + 2.1) * u},${oy - y * u}`);
  }
  const X = (x: number) => ox + (x + 2.1) * u;

  return (
    <div className="mx-auto max-w-sm rounded-xl border bg-indigo-50/40 p-4 dark:bg-indigo-950/20">
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full" role="img" aria-label="A cubic curve rising where its derivative is positive, falling between the two critical points where the derivative is negative, with flat tangents at the turning points.">
        <line x1={ox} y1={oy} x2={W - 8} y2={oy} className="stroke-slate-400" strokeWidth="0.8" />
        <polyline points={pts.join(" ")} className="fill-none stroke-indigo-600 dark:stroke-indigo-300" strokeWidth="2.2" />
        {/* critical points x=-1 (local max), x=1 (local min) */}
        <circle cx={X(-1)} cy={oy - ((-1) ** 3 - 3 * -1) / 2.2 * u} r={3.5} className="fill-rose-500" />
        <circle cx={X(1)} cy={oy - (1 - 3) / 2.2 * u} r={3.5} className="fill-rose-500" />
        {/* flat tangent dashes at the turning points */}
        <line x1={X(-1) - 18} y1={oy - ((-1) ** 3 - 3 * -1) / 2.2 * u} x2={X(-1) + 18} y2={oy - ((-1) ** 3 - 3 * -1) / 2.2 * u} className="stroke-rose-400" strokeWidth="1.2" strokeDasharray="3 2" />
        <line x1={X(1) - 18} y1={oy - (1 - 3) / 2.2 * u} x2={X(1) + 18} y2={oy - (1 - 3) / 2.2 * u} className="stroke-rose-400" strokeWidth="1.2" strokeDasharray="3 2" />
        <text x={X(-1.6)} y={28} className="fill-emerald-700 dark:fill-emerald-300" fontSize="9.5" textAnchor="middle">f′ &gt; 0 ↑</text>
        <text x={X(0)} y={H - 8} className="fill-rose-600 dark:fill-rose-300" fontSize="9.5" textAnchor="middle">f′ &lt; 0 ↓</text>
        <text x={X(1.7)} y={28} className="fill-emerald-700 dark:fill-emerald-300" fontSize="9.5" textAnchor="middle">f′ &gt; 0 ↑</text>
        <text x={X(-1)} y={oy - 30} className="fill-slate-500" fontSize="8.5" textAnchor="middle">f′=0</text>
      </svg>
    </div>
  );
}
