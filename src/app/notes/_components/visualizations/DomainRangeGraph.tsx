/**
 * Reading domain (shadow on the x-axis) and range (shadow on the y-axis) off a
 * curve — here the upper semicircle of radius 2. Static server-component SVG.
 */
export default function DomainRangeGraph() {
  const W = 320;
  const H = 280;
  const ox = 160; // origin x
  const oy = 200; // origin y (x-axis line)
  const u = 42; // pixels per unit
  const r = 2;

  // Upper semicircle points x in [-2,2], y = sqrt(4 - x^2) >= 0
  const pts: string[] = [];
  for (let i = 0; i <= 40; i++) {
    const x = -r + (2 * r * i) / 40;
    const y = Math.sqrt(Math.max(0, r * r - x * x));
    pts.push(`${ox + x * u},${oy - y * u}`);
  }

  return (
    <div className="mx-auto max-w-sm rounded-xl border bg-indigo-50/40 p-4 dark:bg-indigo-950/20">
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full" role="img" aria-label="Upper semicircle of radius 2, with domain shaded on the x-axis from -2 to 2 and range shaded on the y-axis from 0 to 2">
        {/* axes */}
        <line x1={20} y1={oy} x2={W - 12} y2={oy} className="stroke-slate-400" strokeWidth="1" />
        <line x1={ox} y1={20} x2={ox} y2={H - 30} className="stroke-slate-400" strokeWidth="1" />
        <text x={W - 14} y={oy - 6} className="fill-slate-500" fontSize="10" textAnchor="end">x</text>
        <text x={ox + 6} y={26} className="fill-slate-500" fontSize="10">y</text>

        {/* domain shadow on x-axis (emerald), [-2,2] */}
        <line x1={ox - r * u} y1={oy} x2={ox + r * u} y2={oy} className="stroke-emerald-500" strokeWidth="5" strokeLinecap="round" opacity="0.55" />
        {/* range shadow on y-axis (violet), [0,2] */}
        <line x1={ox} y1={oy} x2={ox} y2={oy - r * u} className="stroke-violet-500" strokeWidth="5" strokeLinecap="round" opacity="0.6" />

        {/* curve */}
        <polyline points={pts.join(" ")} className="fill-none stroke-indigo-600 dark:stroke-indigo-300" strokeWidth="2.4" />

        {/* endpoint ticks */}
        <text x={ox - r * u} y={oy + 16} className="fill-emerald-700 dark:fill-emerald-300" fontSize="10" textAnchor="middle">−2</text>
        <text x={ox + r * u} y={oy + 16} className="fill-emerald-700 dark:fill-emerald-300" fontSize="10" textAnchor="middle">2</text>
        <text x={ox - 12} y={oy - r * u + 4} className="fill-violet-700 dark:fill-violet-300" fontSize="10" textAnchor="end">2</text>

        <text x={W / 2} y={H - 8} className="fill-indigo-700 dark:fill-indigo-300" fontSize="10.5" textAnchor="middle">
          Domain [−2, 2] (x-shadow) · Range [0, 2] (y-shadow)
        </text>
      </svg>
    </div>
  );
}
