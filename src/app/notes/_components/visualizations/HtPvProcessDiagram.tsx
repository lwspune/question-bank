/**
 * A pressure–volume (P–V) diagram comparing the four named processes from one
 * starting state: isobaric (horizontal, P fixed), isochoric (vertical, V fixed),
 * isothermal (a gentle PV = const hyperbola), and adiabatic (a steeper curve,
 * Q = 0). Reinforces that an adiabatic curve is steeper than an isothermal one.
 *
 * Server component — static 2-D.
 */
export default function HtPvProcessDiagram() {
  const ox = 70; // origin x
  const oy = 210; // origin y (V axis)
  const w = 480;
  const top = 30;
  const sx = 250; // start x
  const sy = 80; // start y (high P, small V)

  return (
    <div className="mx-auto max-w-md rounded-xl border bg-indigo-50/40 p-4 dark:bg-indigo-950/20">
      <svg
        viewBox="0 0 580 250"
        className="w-full"
        role="img"
        aria-label="Pressure versus volume diagram showing isobaric, isochoric, isothermal, and adiabatic processes from a common starting point"
      >
        <defs>
          <marker id="pv-ax" markerWidth="9" markerHeight="9" refX="7" refY="3" orient="auto">
            <path d="M0,0 L0,6 L8,3 z" className="fill-slate-500 dark:fill-slate-400" />
          </marker>
        </defs>

        {/* axes */}
        <line x1={ox} y1={oy} x2={ox + w} y2={oy} className="stroke-slate-500" strokeWidth="1.5" markerEnd="url(#pv-ax)" />
        <line x1={ox} y1={oy} x2={ox} y2={top} className="stroke-slate-500" strokeWidth="1.5" markerEnd="url(#pv-ax)" />
        <text x={ox + w} y={oy + 20} textAnchor="end" fontSize="13" className="fill-slate-700 dark:fill-slate-300">V (volume)</text>
        <text x={ox - 10} y={top + 2} textAnchor="end" fontSize="13" className="fill-slate-700 dark:fill-slate-300">P</text>

        {/* common start point */}
        <circle cx={sx} cy={sy} r="4" className="fill-slate-700 dark:fill-slate-200" />
        <text x={sx - 8} y={sy - 8} textAnchor="end" fontSize="11" className="fill-slate-600 dark:fill-slate-300">start</text>

        {/* isobaric — horizontal (P constant), V grows */}
        <line x1={sx} y1={sy} x2={sx + 200} y2={sy} className="stroke-emerald-600 dark:stroke-emerald-400" strokeWidth="2.5" />
        <text x={sx + 205} y={sy + 4} fontSize="12" fontWeight="600" className="fill-emerald-700 dark:fill-emerald-300">isobaric (P fixed)</text>

        {/* isochoric — vertical (V constant), P drops */}
        <line x1={sx} y1={sy} x2={sx} y2={oy - 20} className="stroke-sky-600 dark:stroke-sky-400" strokeWidth="2.5" />
        <text x={sx + 6} y={oy - 24} fontSize="12" fontWeight="600" className="fill-sky-700 dark:fill-sky-300">isochoric (V fixed)</text>

        {/* isothermal — PV = const hyperbola (gentle) */}
        <path d={`M ${sx} ${sy} Q ${sx + 90} ${sy + 70}, ${ox + w - 60} ${oy - 40}`} className="fill-none stroke-indigo-600 dark:stroke-indigo-400" strokeWidth="2.5" />
        <text x={ox + w - 60} y={oy - 46} textAnchor="end" fontSize="12" fontWeight="600" className="fill-indigo-700 dark:fill-indigo-300">isothermal (T fixed)</text>

        {/* adiabatic — steeper curve (Q = 0) */}
        <path d={`M ${sx} ${sy} Q ${sx + 55} ${sy + 80}, ${sx + 150} ${oy - 25}`} className="fill-none stroke-rose-600 dark:stroke-rose-400" strokeWidth="2.5" strokeDasharray="6 4" />
        <text x={sx + 150} y={oy - 8} textAnchor="middle" fontSize="12" fontWeight="600" className="fill-rose-700 dark:fill-rose-300">adiabatic (Q = 0)</text>
      </svg>
      <p className="mt-2 text-center text-xs text-muted-foreground">
        From one start: isobaric holds P, isochoric holds V, isothermal follows
        PV = const, and the adiabatic curve (no heat exchange) is steeper than
        the isothermal one.
      </p>
    </div>
  );
}
