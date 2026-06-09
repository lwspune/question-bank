/**
 * Counting solutions of sin x = k on an interval is reading off where the sine
 * curve crosses the horizontal line y = k. Shown for sin x = 1/2 on [0, 2π]:
 * two crossings (π/6 and 5π/6). Outside one period the pattern repeats, which is
 * why the general solution is an infinite family. Static SVG.
 */
export default function TeSolutionCounting() {
  const ox = 36, oy = 80, ux = 34, uy = 42; // origin + units (x: per unit angle ~ scaled, y: per 1)
  // map angle t (radians) to pixel; show 0..2π
  const W = 300, H = 150;
  const X = (t: number) => ox + (t / (2 * Math.PI)) * (W - ox - 20);
  const Y = (v: number) => oy - v * uy;
  const pts: string[] = [];
  for (let i = 0; i <= 80; i++) {
    const t = (2 * Math.PI * i) / 80;
    pts.push(`${X(t)},${Y(Math.sin(t))}`);
  }
  const k = 0.5;
  const sols = [Math.PI / 6, (5 * Math.PI) / 6]; // sin = 1/2 in [0,2π]
  return (
    <div className="mx-auto max-w-md rounded-xl border bg-indigo-50/40 p-4 dark:bg-indigo-950/20">
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full" role="img" aria-label="The sine curve over 0 to 2 pi crosses the line y = one half at two points, x = pi over 6 and x = 5 pi over 6 — the two solutions in this interval.">
        {/* axes */}
        <line x1={ox} y1={oy} x2={W - 14} y2={oy} className="stroke-slate-300 dark:stroke-slate-600" strokeWidth="0.8" />
        <line x1={ox} y1={20} x2={ox} y2={H - 20} className="stroke-slate-300 dark:stroke-slate-600" strokeWidth="0.8" />
        {/* y = k line */}
        <line x1={ox} y1={Y(k)} x2={W - 14} y2={Y(k)} className="stroke-rose-400" strokeWidth="1.2" strokeDasharray="4 3" />
        <text x={W - 12} y={Y(k) - 3} className="fill-rose-600 dark:fill-rose-300" fontSize="8.5" textAnchor="end">y = ½</text>
        {/* sine curve */}
        <polyline points={pts.join(" ")} className="fill-none stroke-indigo-600 dark:stroke-indigo-300" strokeWidth="2" />
        {/* solution markers */}
        {sols.map((t, i) => (
          <g key={i}>
            <line x1={X(t)} y1={oy} x2={X(t)} y2={Y(k)} className="stroke-emerald-500" strokeWidth="0.9" strokeDasharray="2 2" />
            <circle cx={X(t)} cy={Y(k)} r={3.4} className="fill-emerald-500" />
            <text x={X(t)} y={oy + 13} className="fill-emerald-700 dark:fill-emerald-300" fontSize="8" textAnchor="middle">{i === 0 ? "π/6" : "5π/6"}</text>
          </g>
        ))}
        {/* x ticks */}
        {[{ t: Math.PI, l: "π" }, { t: 2 * Math.PI, l: "2π" }].map((m) => (
          <text key={m.l} x={X(m.t)} y={oy + 13} className="fill-slate-500" fontSize="8" textAnchor="middle">{m.l}</text>
        ))}
        <text x={ox} y={16} className="fill-slate-500" fontSize="8">sin x = ½ on [0, 2π] → 2 solutions</text>
      </svg>
    </div>
  );
}
