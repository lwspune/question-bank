/**
 * The derivative as the slope of the tangent line: a curve with a secant
 * (through two points) and the tangent it approaches as the points merge.
 * Static SVG.
 */
export default function DiffTangentSlope() {
  const W = 320;
  const H = 220;
  const ox = 40;
  const oy = 180;
  const u = 30;

  // curve y = 0.35 x^2 on x in [0, 4.2]
  const curve: string[] = [];
  for (let i = 0; i <= 60; i++) {
    const x = (4.2 * i) / 60;
    const y = 0.35 * x * x;
    curve.push(`${ox + x * u},${oy - y * u}`);
  }

  const px = (x: number) => ox + x * u;
  const py = (x: number) => oy - 0.35 * x * x * u;

  const a = 1.2; // tangent point
  const b = 3.1; // secant second point
  const slopeT = 2 * 0.35 * a; // f'(a)
  const tx1 = 0.2,
    tx2 = 3.0;
  const fa = 0.35 * a * a;
  const tanY = (x: number) => oy - (fa + slopeT * (x - a)) * u;

  return (
    <div className="mx-auto max-w-sm rounded-xl border bg-indigo-50/40 p-4 dark:bg-indigo-950/20">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="w-full"
        role="img"
        aria-label="A curve with a secant line through two points and the tangent line it approaches as the two points merge; the tangent's slope is the derivative."
      >
        {/* axes */}
        <line x1={ox} y1={oy} x2={W - 10} y2={oy} className="stroke-slate-400" strokeWidth="0.8" />
        <line x1={ox} y1={20} x2={ox} y2={oy} className="stroke-slate-400" strokeWidth="0.8" />
        {/* curve */}
        <polyline points={curve.join(" ")} className="fill-none stroke-indigo-600 dark:stroke-indigo-300" strokeWidth="2.2" />
        {/* secant through a and b */}
        <line x1={px(0.4)} y1={oy - (fa + (0.35 * b * b - fa) / (b - a) * (0.4 - a)) * u} x2={px(3.9)} y2={oy - (fa + (0.35 * b * b - fa) / (b - a) * (3.9 - a)) * u} className="stroke-slate-400" strokeWidth="1.3" strokeDasharray="4 3" />
        {/* tangent at a */}
        <line x1={px(tx1)} y1={tanY(tx1)} x2={px(tx2)} y2={tanY(tx2)} className="stroke-rose-500" strokeWidth="2" />
        {/* points */}
        <circle cx={px(a)} cy={py(a)} r={3} className="fill-rose-500" />
        <circle cx={px(b)} cy={py(b)} r={3} className="fill-slate-500" />
        <text x={px(a) - 4} y={py(a) - 8} className="fill-rose-600 dark:fill-rose-300" fontSize="10" textAnchor="end">P</text>
        <text x={px(b) + 6} y={py(b) - 2} className="fill-slate-600 dark:fill-slate-300" fontSize="10">Q</text>
        {/* labels */}
        <text x={px(tx2)} y={tanY(tx2) + 14} className="fill-rose-600 dark:fill-rose-300" fontSize="9.5">tangent: slope = f′(x)</text>
        <text x={W - 12} y={oy + 14} className="fill-slate-500" fontSize="9.5" textAnchor="end">secant → tangent as Q→P</text>
      </svg>
    </div>
  );
}
