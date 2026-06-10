/**
 * Velocity-time graph for uniform acceleration — a straight line with positive
 * intercept. The SLOPE of the line equals the acceleration; the shaded AREA
 * under the line equals the displacement. Reinforces the two graph-reading
 * rules the NDA tests: slope = acceleration, area = displacement.
 *
 * Server component — static 2-D.
 */
export default function KinVelocityTimeGraph() {
  const ox = 70; // origin x
  const oy = 210; // origin y
  const w = 440;
  const top = 30;

  // line from (t=0, v=u) up to (t=tmax, v=v) — positive intercept u
  const x0 = ox;
  const y0 = oy - 50; // v = u at t = 0 (intercept above origin)
  const x1 = ox + 340;
  const y1 = top + 20; // v at end

  return (
    <div className="mx-auto max-w-md rounded-xl border bg-indigo-50/40 p-4 dark:bg-indigo-950/20">
      <svg
        viewBox="0 0 560 250"
        className="w-full"
        role="img"
        aria-label="Velocity versus time straight line with positive intercept; the slope is the acceleration and the shaded area under the line is the displacement"
      >
        <defs>
          <marker id="kvt-ax" markerWidth="9" markerHeight="9" refX="7" refY="3" orient="auto">
            <path d="M0,0 L0,6 L8,3 z" className="fill-slate-500 dark:fill-slate-400" />
          </marker>
        </defs>

        {/* axes */}
        <line x1={ox} y1={oy} x2={ox + w} y2={oy} className="stroke-slate-500" strokeWidth="1.5" markerEnd="url(#kvt-ax)" />
        <line x1={ox} y1={oy} x2={ox} y2={top} className="stroke-slate-500" strokeWidth="1.5" markerEnd="url(#kvt-ax)" />
        <text x={ox + w} y={oy + 20} textAnchor="end" fontSize="13" className="fill-slate-700 dark:fill-slate-300">time t</text>
        <text x={ox - 12} y={top + 4} textAnchor="end" fontSize="13" className="fill-slate-700 dark:fill-slate-300">v</text>

        {/* shaded area under the line = displacement */}
        <path
          d={`M ${x0} ${oy} L ${x0} ${y0} L ${x1} ${y1} L ${x1} ${oy} Z`}
          className="fill-indigo-400/25 stroke-none"
        />
        <text x={(x0 + x1) / 2 - 20} y={oy - 35} fontSize="12" fontWeight="600" className="fill-indigo-700 dark:fill-indigo-300">area = displacement</text>

        {/* the v-t line */}
        <line x1={x0} y1={y0} x2={x1} y2={y1} className="stroke-indigo-600 dark:stroke-indigo-400" strokeWidth="2.5" />

        {/* intercept marker u */}
        <circle cx={x0} cy={y0} r="4" className="fill-indigo-600 dark:fill-indigo-400" />
        <text x={ox - 12} y={y0 + 4} textAnchor="end" fontSize="13" fontWeight="600" className="fill-indigo-700 dark:fill-indigo-300">u</text>

        {/* slope annotation */}
        <text x={x1 - 90} y={y1 - 8} fontSize="12" fontWeight="600" className="fill-rose-700 dark:fill-rose-300">slope = a</text>
      </svg>
      <p className="mt-2 text-center text-xs text-muted-foreground">
        On a velocity-time graph the slope of the line is the acceleration, and
        the area under the line is the displacement.
      </p>
    </div>
  );
}
