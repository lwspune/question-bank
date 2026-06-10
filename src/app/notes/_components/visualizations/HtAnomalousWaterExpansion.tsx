/**
 * The anomalous expansion of water: density rises from 0 degrees C, peaks at
 * 4 degrees C (maximum density, minimum volume), then falls as water warms
 * further. Explains why ice forms on top and aquatic life survives a frozen
 * surface. A density-vs-temperature curve with the 4 degree C peak marked.
 *
 * Server component — static 2-D.
 */
export default function HtAnomalousWaterExpansion() {
  const ox = 64; // origin x
  const oy = 190; // origin y
  const w = 470;
  const top = 36;
  const peakX = 150; // x for 4 degrees C
  const peakY = top + 6; // highest density (top of curve)

  return (
    <div className="mx-auto max-w-md rounded-xl border bg-indigo-50/40 p-4 dark:bg-indigo-950/20">
      <svg
        viewBox="0 0 560 230"
        className="w-full"
        role="img"
        aria-label="Density of water versus temperature, rising to a peak at 4 degrees Celsius then falling — the anomalous expansion of water"
      >
        <defs>
          <marker id="aw-ax" markerWidth="9" markerHeight="9" refX="7" refY="3" orient="auto">
            <path d="M0,0 L0,6 L8,3 z" className="fill-slate-500 dark:fill-slate-400" />
          </marker>
        </defs>

        {/* axes */}
        <line x1={ox} y1={oy} x2={ox + w} y2={oy} className="stroke-slate-500" strokeWidth="1.5" markerEnd="url(#aw-ax)" />
        <line x1={ox} y1={oy} x2={ox} y2={top} className="stroke-slate-500" strokeWidth="1.5" markerEnd="url(#aw-ax)" />
        <text x={ox + w} y={oy + 20} textAnchor="end" fontSize="13" className="fill-slate-700 dark:fill-slate-300">Temperature (degrees C)</text>
        <text x={ox - 8} y={top + 2} textAnchor="end" fontSize="13" className="fill-slate-700 dark:fill-slate-300">Density</text>

        {/* curve: rises 0 to 4 C, falls after */}
        <path
          d={`M ${ox} ${oy - 40} C ${ox + 50} ${peakY + 6}, ${peakX - 20} ${peakY}, ${peakX} ${peakY} C ${peakX + 90} ${peakY + 2}, ${ox + w - 90} ${oy - 70}, ${ox + w - 30} ${oy - 50}`}
          className="fill-none stroke-indigo-600 dark:stroke-indigo-400"
          strokeWidth="2.5"
        />

        {/* peak marker at 4 degrees C */}
        <line x1={peakX} y1={peakY} x2={peakX} y2={oy} className="stroke-rose-500/70" strokeWidth="1.2" strokeDasharray="4 3" />
        <circle cx={peakX} cy={peakY} r="4.5" className="fill-rose-600 dark:fill-rose-400" />
        <text x={peakX} y={oy + 18} textAnchor="middle" fontSize="12" className="fill-rose-700 dark:fill-rose-300">4 C</text>
        <text x={peakX + 10} y={peakY + 4} fontSize="11" fontWeight="600" className="fill-rose-700 dark:fill-rose-300">max density</text>

        {/* 0 C label */}
        <text x={ox} y={oy + 18} textAnchor="middle" fontSize="12" className="fill-slate-600 dark:fill-slate-300">0 C</text>
      </svg>
      <p className="mt-2 text-center text-xs text-muted-foreground">
        Water is densest at 4 degrees C: between 0 and 4 degrees C it contracts
        on heating (anomalous), so colder water and ice float — which is why
        ponds freeze top-down and fish survive below.
      </p>
    </div>
  );
}
