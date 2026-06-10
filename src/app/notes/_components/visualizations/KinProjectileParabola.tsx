/**
 * Projectile trajectory — a parabola showing the horizontal velocity component
 * (constant) and the vertical velocity component (changes with gravity). At the
 * top the vertical component is zero and only the horizontal component remains.
 * Reinforces "horizontal and vertical motions are independent".
 *
 * Server component — static 2-D.
 */
export default function KinProjectileParabola() {
  const ox = 60; // launch x
  const oy = 220; // ground y
  const w = 480;
  const peakX = ox + 240;
  const peakY = 50;
  const landX = ox + 470;

  // parabola points
  const pts: string[] = [];
  for (let i = 0; i <= 24; i++) {
    const tt = i / 24; // 0..1 along the flight
    const px = ox + tt * 470;
    // symmetric parabola peaking at tt = 0.5
    const h = 1 - Math.pow(2 * tt - 1, 2); // 0..1..0
    const py = oy - h * (oy - peakY);
    pts.push(`${px.toFixed(1)},${py.toFixed(1)}`);
  }

  return (
    <div className="mx-auto max-w-md rounded-xl border bg-indigo-50/40 p-4 dark:bg-indigo-950/20">
      <svg
        viewBox="0 0 560 260"
        className="w-full"
        role="img"
        aria-label="Projectile parabola with constant horizontal velocity arrows and changing vertical velocity arrows; at the peak the vertical velocity is zero"
      >
        <defs>
          <marker id="kpp-h" markerWidth="9" markerHeight="9" refX="7" refY="3" orient="auto">
            <path d="M0,0 L0,6 L8,3 z" className="fill-indigo-600 dark:fill-indigo-400" />
          </marker>
          <marker id="kpp-v" markerWidth="9" markerHeight="9" refX="7" refY="3" orient="auto">
            <path d="M0,0 L0,6 L8,3 z" className="fill-rose-600 dark:fill-rose-400" />
          </marker>
        </defs>

        {/* ground */}
        <line x1={ox - 10} y1={oy} x2={ox + w} y2={oy} className="stroke-slate-500" strokeWidth="1.5" />

        {/* trajectory */}
        <polyline points={pts.join(" ")} className="fill-none stroke-indigo-600 dark:stroke-indigo-400" strokeWidth="2.5" />

        {/* horizontal velocity arrows (constant length) at launch, peak, landing */}
        <line x1={ox} y1={oy - 4} x2={ox + 46} y2={oy - 4} className="stroke-indigo-600 dark:stroke-indigo-400" strokeWidth="2" markerEnd="url(#kpp-h)" />
        <line x1={peakX} y1={peakY} x2={peakX + 46} y2={peakY} className="stroke-indigo-600 dark:stroke-indigo-400" strokeWidth="2" markerEnd="url(#kpp-h)" />

        {/* vertical velocity arrows (shrink to zero at peak) */}
        <line x1={ox} y1={oy} x2={ox} y2={oy - 56} className="stroke-rose-600 dark:stroke-rose-400" strokeWidth="2" markerEnd="url(#kpp-v)" />
        <line x1={landX} y1={oy - 56} x2={landX} y2={oy} className="stroke-rose-600 dark:stroke-rose-400" strokeWidth="2" markerEnd="url(#kpp-v)" />

        {/* peak marker */}
        <circle cx={peakX} cy={peakY} r="4" className="fill-indigo-600 dark:fill-indigo-400" />
        <text x={peakX + 8} y={peakY + 18} fontSize="11" fontWeight="600" className="fill-indigo-700 dark:fill-indigo-300">peak: vertical v = 0</text>

        {/* legend */}
        <text x={ox + 6} y={oy - 64} fontSize="11" fontWeight="600" className="fill-rose-700 dark:fill-rose-300">vertical (changes)</text>
        <text x={ox + 6} y={oy + 18} fontSize="11" fontWeight="600" className="fill-indigo-700 dark:fill-indigo-300">horizontal (constant)</text>
      </svg>
      <p className="mt-2 text-center text-xs text-muted-foreground">
        Horizontal velocity stays constant; vertical velocity falls to zero at
        the peak then reverses. The two motions are independent.
      </p>
    </div>
  );
}
