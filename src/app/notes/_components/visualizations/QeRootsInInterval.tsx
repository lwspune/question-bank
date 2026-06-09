/**
 * Both roots of an upward quadratic lie inside an interval (p, q) exactly when
 * three things hold together: D ≥ 0 (real roots), a·f(p) > 0 and a·f(q) > 0
 * (the curve is above the axis at both ends), and the vertex x = −b/2a sits
 * between p and q. Static SVG: y = (x−2)(x−4), interval (1, 5).
 */
export default function QeRootsInInterval() {
  const W = 300;
  const H = 188;
  const oy = 112; // x-axis
  const X = (x: number) => 30 + (x - 0.5) * 48;
  const Y = (y: number) => oy - y * 15;
  const f = (x: number) => (x - 2) * (x - 4);

  const pts: string[] = [];
  for (let i = 0; i <= 80; i++) {
    const x = 0.5 + (5 * i) / 80;
    pts.push(`${X(x)},${Y(f(x))}`);
  }

  return (
    <div className="mx-auto max-w-sm rounded-xl border bg-indigo-50/40 p-4 dark:bg-indigo-950/20">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="w-full"
        role="img"
        aria-label="An upward parabola crossing the x-axis at x = 2 and x = 4, both lying between the interval endpoints p = 1 and q = 5. At both endpoints the curve is above the axis, and the vertex sits between the roots."
      >
        <line x1={16} y1={oy} x2={W - 8} y2={oy} className="stroke-slate-400" strokeWidth="0.8" />
        {/* interval endpoints p, q */}
        <line x1={X(1)} y1={20} x2={X(1)} y2={H - 22} className="stroke-slate-300 dark:stroke-slate-600" strokeWidth="1" strokeDasharray="3 3" />
        <line x1={X(5)} y1={20} x2={X(5)} y2={H - 22} className="stroke-slate-300 dark:stroke-slate-600" strokeWidth="1" strokeDasharray="3 3" />
        <polyline points={pts.join(" ")} className="fill-none stroke-indigo-600 dark:stroke-indigo-300" strokeWidth="2.2" />
        {/* roots */}
        <circle cx={X(2)} cy={oy} r={3.6} className="fill-emerald-500" />
        <circle cx={X(4)} cy={oy} r={3.6} className="fill-emerald-500" />
        {/* f(p), f(q) > 0 points on the curve */}
        <circle cx={X(1)} cy={Y(f(1))} r={3} className="fill-amber-500" />
        <circle cx={X(5)} cy={Y(f(5))} r={3} className="fill-amber-500" />
        {/* vertex */}
        <circle cx={X(3)} cy={Y(f(3))} r={3} className="fill-rose-500" />
        {/* labels */}
        <text x={X(1)} y={Y(f(1)) - 6} className="fill-amber-700 dark:fill-amber-300" fontSize="8.5" textAnchor="middle">a·f(p)&gt;0</text>
        <text x={X(5)} y={Y(f(5)) - 6} className="fill-amber-700 dark:fill-amber-300" fontSize="8.5" textAnchor="middle">a·f(q)&gt;0</text>
        <text x={X(2)} y={oy + 14} className="fill-emerald-700 dark:fill-emerald-300" fontSize="8.5" textAnchor="middle">root</text>
        <text x={X(4)} y={oy + 14} className="fill-emerald-700 dark:fill-emerald-300" fontSize="8.5" textAnchor="middle">root</text>
        <text x={X(3)} y={Y(f(3)) + 14} className="fill-rose-600 dark:fill-rose-300" fontSize="8" textAnchor="middle">vertex in (p,q)</text>
        <text x={X(1)} y={H - 8} className="fill-slate-500" fontSize="9" textAnchor="middle">p</text>
        <text x={X(5)} y={H - 8} className="fill-slate-500" fontSize="9" textAnchor="middle">q</text>
      </svg>
    </div>
  );
}
