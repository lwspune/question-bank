/**
 * Local maximum vs local minimum: at a peak f′ goes + → − (and f″ < 0); at a
 * valley f′ goes − → + (and f″ > 0). The tangent is flat at both. Static SVG.
 */
export default function AodExtremaCurve() {
  const W = 300;
  const H = 190;
  const ox = 30;
  const oy = 100;
  const u = 32;

  // same cubic y = x^3 - 3x, peak at x=-1, valley at x=1
  const pts: string[] = [];
  for (let i = 0; i <= 80; i++) {
    const x = -2.1 + (4.2 * i) / 80;
    const y = (x * x * x - 3 * x) / 2.2;
    pts.push(`${ox + (x + 2.1) * u},${oy - y * u}`);
  }
  const X = (x: number) => ox + (x + 2.1) * u;
  const Y = (x: number) => oy - (x * x * x - 3 * x) / 2.2 * u;

  return (
    <div className="mx-auto max-w-sm rounded-xl border bg-indigo-50/40 p-4 dark:bg-indigo-950/20">
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full" role="img" aria-label="A curve with a local maximum (a peak, where the second derivative is negative) and a local minimum (a valley, where the second derivative is positive); the tangent is horizontal at both.">
        <line x1={ox} y1={oy} x2={W - 8} y2={oy} className="stroke-slate-400" strokeWidth="0.8" />
        <polyline points={pts.join(" ")} className="fill-none stroke-indigo-600 dark:stroke-indigo-300" strokeWidth="2.2" />
        {/* peak */}
        <circle cx={X(-1)} cy={Y(-1)} r={3.5} className="fill-rose-500" />
        <line x1={X(-1) - 20} y1={Y(-1)} x2={X(-1) + 20} y2={Y(-1)} className="stroke-rose-400" strokeWidth="1.2" strokeDasharray="3 2" />
        <text x={X(-1)} y={Y(-1) - 8} className="fill-rose-600 dark:fill-rose-300" fontSize="9.5" textAnchor="middle">local max (f″&lt;0)</text>
        {/* valley */}
        <circle cx={X(1)} cy={Y(1)} r={3.5} className="fill-emerald-600" />
        <line x1={X(1) - 20} y1={Y(1)} x2={X(1) + 20} y2={Y(1)} className="stroke-emerald-500" strokeWidth="1.2" strokeDasharray="3 2" />
        <text x={X(1)} y={Y(1) + 16} className="fill-emerald-700 dark:fill-emerald-300" fontSize="9.5" textAnchor="middle">local min (f″&gt;0)</text>
        <text x={W - 10} y={oy - 4} className="fill-slate-500" fontSize="8.5" textAnchor="end">tangent flat at both</text>
      </svg>
    </div>
  );
}
