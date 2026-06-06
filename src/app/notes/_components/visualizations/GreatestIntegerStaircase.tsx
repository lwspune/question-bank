/**
 * The floor function y = [x] as a staircase: flat on each [n, n+1) with a
 * closed dot on the left, open dot on the right, jumping up by 1 at each
 * integer. Static server-component SVG.
 */
export default function GreatestIntegerStaircase() {
  const W = 300;
  const H = 280;
  const ox = 150;
  const oy = 150;
  const u = 34; // px per unit

  const sx = (x: number) => ox + x * u;
  const sy = (y: number) => oy - y * u;

  const steps = [-3, -2, -1, 0, 1, 2]; // floor value n on [n, n+1)

  return (
    <div className="mx-auto max-w-xs rounded-xl border bg-indigo-50/40 p-4 dark:bg-indigo-950/20">
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full" role="img" aria-label="Staircase graph of the greatest integer function: flat segments with a filled dot on the left and an open dot on the right of each step">
        {/* axes */}
        <line x1={10} y1={oy} x2={W - 10} y2={oy} className="stroke-slate-400" strokeWidth="0.9" />
        <line x1={ox} y1={10} x2={ox} y2={H - 16} className="stroke-slate-400" strokeWidth="0.9" />
        <text x={W - 12} y={oy - 5} className="fill-slate-500" fontSize="10" textAnchor="end">x</text>
        <text x={ox + 5} y={16} className="fill-slate-500" fontSize="10">y</text>

        {steps.map((n) => (
          <g key={n}>
            {/* flat tread from x=n to x=n+1 at height y=n */}
            <line x1={sx(n)} y1={sy(n)} x2={sx(n + 1)} y2={sy(n)} className="stroke-indigo-600 dark:stroke-indigo-300" strokeWidth="2.4" />
            {/* closed left endpoint (included) */}
            <circle cx={sx(n)} cy={sy(n)} r={3.6} className="fill-indigo-600 dark:fill-indigo-300" />
            {/* open right endpoint (excluded) */}
            <circle cx={sx(n + 1)} cy={sy(n)} r={3.6} className="fill-white stroke-indigo-600 dark:fill-indigo-950 dark:stroke-indigo-300" strokeWidth="1.6" />
          </g>
        ))}

        <text x={W / 2} y={H - 2} className="fill-indigo-700 dark:fill-indigo-300" fontSize="10" textAnchor="middle">[x] = n on [n, n+1) · jumps up by 1 at each integer</text>
      </svg>
    </div>
  );
}
