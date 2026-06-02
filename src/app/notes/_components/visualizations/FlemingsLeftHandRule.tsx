/**
 * Fleming's left-hand rule — three mutually perpendicular directions:
 * Forefinger = Field (B), Centre finger = Current (I), Thumb = Thrust (force F).
 * Drawn as three orthogonal labelled arrows from a common origin.
 *
 * Server component — static.
 */
export default function FlemingsLeftHandRule() {
  const ox = 220;
  const oy = 150;

  return (
    <div className="mx-auto max-w-md rounded-xl border bg-indigo-50/40 p-4 dark:bg-indigo-950/20">
      <svg
        viewBox="0 0 520 250"
        className="w-full"
        role="img"
        aria-label="Fleming's left-hand rule: thumb force, forefinger field, centre finger current, mutually perpendicular"
      >
        <defs>
          <marker id="flh-f" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
            <path d="M0,0 L0,6 L9,3 z" className="fill-rose-600 dark:fill-rose-400" />
          </marker>
          <marker id="flh-b" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
            <path d="M0,0 L0,6 L9,3 z" className="fill-indigo-600 dark:fill-indigo-400" />
          </marker>
          <marker id="flh-i" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
            <path d="M0,0 L0,6 L9,3 z" className="fill-emerald-600 dark:fill-emerald-400" />
          </marker>
        </defs>

        {/* Thumb = Force (up) */}
        <line x1={ox} y1={oy} x2={ox} y2={oy - 100} className="stroke-rose-600 dark:stroke-rose-400" strokeWidth="3" markerEnd="url(#flh-f)" />
        <text x={ox} y={oy - 110} textAnchor="middle" fontSize="13" fontWeight="700" className="fill-rose-700 dark:fill-rose-300">Thumb = Force (F)</text>

        {/* Forefinger = Field (right) */}
        <line x1={ox} y1={oy} x2={ox + 150} y2={oy} className="stroke-indigo-600 dark:stroke-indigo-400" strokeWidth="3" markerEnd="url(#flh-b)" />
        <text x={ox + 158} y={oy + 5} fontSize="13" fontWeight="700" className="fill-indigo-700 dark:fill-indigo-300">Fore = Field (B)</text>

        {/* Centre = Current (into-the-page direction, drawn down-left for 3D feel) */}
        <line x1={ox} y1={oy} x2={ox - 110} y2={oy + 70} className="stroke-emerald-600 dark:stroke-emerald-400" strokeWidth="3" markerEnd="url(#flh-i)" />
        <text x={ox - 120} y={oy + 90} textAnchor="middle" fontSize="13" fontWeight="700" className="fill-emerald-700 dark:fill-emerald-300">Centre = Current (I)</text>

        {/* right-angle ticks */}
        <path d={`M ${ox + 18} ${oy} L ${ox + 18} ${oy - 18} L ${ox} ${oy - 18}`} className="fill-none stroke-slate-400" strokeWidth="1" />

        <circle cx={ox} cy={oy} r={3.5} className="fill-slate-700 dark:fill-slate-200" />
      </svg>
      <p className="mt-2 text-center text-xs text-muted-foreground">
        Left hand, three fingers at right angles: Fore-finger = Field,
        Centre-finger = Current, Thumb = Thrust (force). This is the motor rule.
      </p>
    </div>
  );
}
