/**
 * |x| as a V with a corner at the origin: slope −1 on the left, +1 on the
 * right. The slopes disagree, so the derivative does not exist at 0
 * (continuous but not differentiable). Static SVG.
 */
export default function DiffModulusCorner() {
  const W = 300;
  const H = 200;
  const cx = 150;
  const oy = 150;
  const u = 34;

  // |x| for x in [-3.5, 3.5]
  const left = `${cx - 3.5 * u},${oy - 3.5 * u} ${cx},${oy}`;
  const right = `${cx},${oy} ${cx + 3.5 * u},${oy - 3.5 * u}`;

  return (
    <div className="mx-auto max-w-sm rounded-xl border bg-indigo-50/40 p-4 dark:bg-indigo-950/20">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="w-full"
        role="img"
        aria-label="The graph of the absolute value function forms a V with a sharp corner at the origin; the left slope is minus one and the right slope is plus one, so the derivative does not exist there."
      >
        {/* axes */}
        <line x1={20} y1={oy} x2={W - 20} y2={oy} className="stroke-slate-400" strokeWidth="0.8" />
        <line x1={cx} y1={20} x2={cx} y2={H - 12} className="stroke-slate-400" strokeWidth="0.8" />
        {/* the V */}
        <polyline points={left} className="fill-none stroke-indigo-600 dark:stroke-indigo-300" strokeWidth="2.4" />
        <polyline points={right} className="fill-none stroke-indigo-600 dark:stroke-indigo-300" strokeWidth="2.4" />
        {/* corner */}
        <circle cx={cx} cy={oy} r={3.5} className="fill-rose-500" />
        {/* slope labels */}
        <text x={cx - 70} y={oy - 58} className="fill-slate-600 dark:fill-slate-300" fontSize="11">slope −1</text>
        <text x={cx + 30} y={oy - 58} className="fill-slate-600 dark:fill-slate-300" fontSize="11">slope +1</text>
        <text x={cx} y={oy + 22} className="fill-rose-600 dark:fill-rose-300" fontSize="10.5" fontWeight="600" textAnchor="middle">corner: LHD ≠ RHD</text>
        <text x={cx} y={H - 2} className="fill-slate-500" fontSize="9.5" textAnchor="middle">continuous, NOT differentiable at 0</text>
      </svg>
    </div>
  );
}
