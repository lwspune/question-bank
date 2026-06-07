/**
 * a·sin x + b·cos x is a single sinusoid of amplitude R = √(a²+b²). Shows the
 * combined wave with its peak at +R and trough at −R (here a=3, b=4 → R=5).
 * Static SVG.
 */
export default function TrigAmplitudePhase() {
  const W = 320;
  const H = 200;
  const oy = H / 2;
  const a = 3,
    b = 4;
  const R = Math.sqrt(a * a + b * b); // 5
  const yscale = 14; // px per unit
  const xspan = 2 * Math.PI;

  const pts: string[] = [];
  for (let i = 0; i <= 120; i++) {
    const x = (xspan * i) / 120;
    const y = a * Math.sin(x) + b * Math.cos(x);
    pts.push(`${30 + (x / xspan) * (W - 50)},${oy - y * yscale}`);
  }

  return (
    <div className="mx-auto max-w-sm rounded-xl border bg-indigo-50/40 p-4 dark:bg-indigo-950/20">
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full" role="img" aria-label="The wave 3 sin x plus 4 cos x is a single sinusoid oscillating between plus 5 and minus 5; its amplitude is the square root of 3 squared plus 4 squared.">
        {/* axis */}
        <line x1={30} y1={oy} x2={W - 12} y2={oy} className="stroke-slate-400" strokeWidth="0.8" />
        {/* +R and -R guides */}
        <line x1={30} y1={oy - R * yscale} x2={W - 12} y2={oy - R * yscale} className="stroke-rose-400" strokeWidth="0.8" strokeDasharray="4 3" />
        <line x1={30} y1={oy + R * yscale} x2={W - 12} y2={oy + R * yscale} className="stroke-rose-400" strokeWidth="0.8" strokeDasharray="4 3" />
        {/* wave */}
        <polyline points={pts.join(" ")} className="fill-none stroke-indigo-600 dark:stroke-indigo-300" strokeWidth="2.2" />
        <text x={32} y={oy - R * yscale - 4} className="fill-rose-600 dark:fill-rose-300" fontSize="10" fontWeight="600">max = +√(a²+b²) = 5</text>
        <text x={32} y={oy + R * yscale + 12} className="fill-rose-600 dark:fill-rose-300" fontSize="10" fontWeight="600">min = −√(a²+b²) = −5</text>
        <text x={W - 14} y={oy - 4} className="fill-slate-500" fontSize="9.5" textAnchor="end">3 sin x + 4 cos x</text>
      </svg>
    </div>
  );
}
