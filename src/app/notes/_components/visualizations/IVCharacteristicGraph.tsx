/**
 * I–V characteristics — a straight line through the origin (ohmic, constant R,
 * slope = 1/R) versus a curved trace (non-ohmic, e.g. a diode). Reinforces
 * "steeper line ⟹ smaller resistance" and "curved ⟹ non-ohmic".
 *
 * Server component — static.
 */
export default function IVCharacteristicGraph() {
  // axes box
  const ox = 70; // origin x
  const oy = 200; // origin y
  const w = 460;
  const top = 30;

  return (
    <div className="mx-auto max-w-md rounded-xl border bg-indigo-50/40 p-4 dark:bg-indigo-950/20">
      <svg
        viewBox="0 0 580 240"
        className="w-full"
        role="img"
        aria-label="Current versus voltage graph showing a straight ohmic line and a curved non-ohmic trace"
      >
        <defs>
          <marker id="iv-ax" markerWidth="9" markerHeight="9" refX="7" refY="3" orient="auto">
            <path d="M0,0 L0,6 L8,3 z" className="fill-slate-500 dark:fill-slate-400" />
          </marker>
        </defs>

        {/* axes */}
        <line x1={ox} y1={oy} x2={ox + w} y2={oy} className="stroke-slate-500" strokeWidth="1.5" markerEnd="url(#iv-ax)" />
        <line x1={ox} y1={oy} x2={ox} y2={top} className="stroke-slate-500" strokeWidth="1.5" markerEnd="url(#iv-ax)" />
        <text x={ox + w} y={oy + 20} textAnchor="end" fontSize="13" className="fill-slate-700 dark:fill-slate-300">V (voltage) →</text>
        <text x={ox - 12} y={top + 4} textAnchor="end" fontSize="13" className="fill-slate-700 dark:fill-slate-300">I</text>

        {/* ohmic straight line through origin (steeper) */}
        <line x1={ox} y1={oy} x2={ox + 300} y2={top + 20} className="stroke-indigo-600 dark:stroke-indigo-400" strokeWidth="2.5" />
        <text x={ox + 250} y={top + 30} fontSize="13" fontWeight="600" className="fill-indigo-700 dark:fill-indigo-300">ohmic: I ∝ V</text>

        {/* a second, shallower ohmic line (larger R) */}
        <line x1={ox} y1={oy} x2={ox + w - 30} y2={oy - 70} className="stroke-emerald-600/80 dark:stroke-emerald-400/80" strokeWidth="2" strokeDasharray="5 4" />
        <text x={ox + w - 150} y={oy - 60} fontSize="12" className="fill-emerald-700 dark:fill-emerald-300">larger R (shallower)</text>

        {/* non-ohmic curved trace */}
        <path d={`M ${ox} ${oy} Q ${ox + 220} ${oy - 10}, ${ox + 360} ${top + 70}`} className="fill-none stroke-rose-600 dark:stroke-rose-400" strokeWidth="2.5" />
        <text x={ox + 300} y={top + 95} fontSize="13" fontWeight="600" className="fill-rose-700 dark:fill-rose-300">non-ohmic (curved)</text>
      </svg>
      <p className="mt-2 text-center text-xs text-muted-foreground">
        An ohmic conductor is a straight line through the origin with slope 1/R —
        a steeper line means a smaller resistance. A curved trace is non-ohmic.
      </p>
    </div>
  );
}
