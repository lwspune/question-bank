/**
 * Position-time graph contrasting uniform motion (a straight line — constant
 * velocity) with uniformly accelerated motion (a curve that gets steeper — a
 * parabola). Reinforces "on an x-t graph the slope is the velocity; a curve
 * means changing velocity, i.e. acceleration".
 *
 * Server component — static 2-D.
 */
export default function KinPositionTimeGraph() {
  const ox = 70; // origin x
  const oy = 210; // origin y
  const w = 440;
  const top = 30;

  // straight uniform-motion line
  const sx1 = ox;
  const sy1 = oy;
  const sx2 = ox + 340;
  const sy2 = oy - 110;

  // accelerated parabola: x = k t^2, getting steeper
  const parPts: string[] = [];
  for (let i = 0; i <= 20; i++) {
    const tt = i / 20; // 0..1
    const px = ox + tt * 340;
    const py = oy - tt * tt * 165;
    parPts.push(`${px.toFixed(1)},${py.toFixed(1)}`);
  }

  return (
    <div className="mx-auto max-w-md rounded-xl border bg-indigo-50/40 p-4 dark:bg-indigo-950/20">
      <svg
        viewBox="0 0 560 250"
        className="w-full"
        role="img"
        aria-label="Position versus time graph showing a straight line for uniform motion and a steepening parabola for accelerated motion"
      >
        <defs>
          <marker id="kpt-ax" markerWidth="9" markerHeight="9" refX="7" refY="3" orient="auto">
            <path d="M0,0 L0,6 L8,3 z" className="fill-slate-500 dark:fill-slate-400" />
          </marker>
        </defs>

        {/* axes */}
        <line x1={ox} y1={oy} x2={ox + w} y2={oy} className="stroke-slate-500" strokeWidth="1.5" markerEnd="url(#kpt-ax)" />
        <line x1={ox} y1={oy} x2={ox} y2={top} className="stroke-slate-500" strokeWidth="1.5" markerEnd="url(#kpt-ax)" />
        <text x={ox + w} y={oy + 20} textAnchor="end" fontSize="13" className="fill-slate-700 dark:fill-slate-300">time t</text>
        <text x={ox - 12} y={top + 4} textAnchor="end" fontSize="13" className="fill-slate-700 dark:fill-slate-300">x</text>

        {/* uniform motion straight line */}
        <line x1={sx1} y1={sy1} x2={sx2} y2={sy2} className="stroke-emerald-600 dark:stroke-emerald-400" strokeWidth="2.5" />
        <text x={sx2 - 70} y={sy2 + 22} fontSize="12" fontWeight="600" className="fill-emerald-700 dark:fill-emerald-300">uniform (constant v)</text>

        {/* accelerated parabola */}
        <polyline points={parPts.join(" ")} className="fill-none stroke-indigo-600 dark:stroke-indigo-400" strokeWidth="2.5" />
        <text x={ox + 200} y={top + 40} fontSize="12" fontWeight="600" className="fill-indigo-700 dark:fill-indigo-300">accelerated (curve)</text>
      </svg>
      <p className="mt-2 text-center text-xs text-muted-foreground">
        On a position-time graph the slope is the velocity. A straight line means
        constant velocity; a steepening curve means the velocity is rising, i.e.
        acceleration.
      </p>
    </div>
  );
}
