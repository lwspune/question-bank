/**
 * Each inverse trig function returns an angle in ONE restricted range — its
 * principal-value branch. Shown as intervals on an angle axis marked in units of
 * π/2: sin⁻¹ ∈ [−π/2, π/2], cos⁻¹ ∈ [0, π], tan⁻¹ ∈ (−π/2, π/2). Static SVG.
 * Tailwind classes written out in full so the JIT emits them.
 */
export default function ItPrincipalRanges() {
  const W = 300, H = 168;
  const x0 = 50, x1 = 280;
  const X = (t: number) => x0 + ((t + 1) / 2) * (x1 - x0); // t in units of π/2
  const ticks = [-2, -1, 0, 1, 2];
  const tickLabel = ["−π", "−π/2", "0", "π/2", "π"];
  const rows = [
    { name: "sin⁻¹", lo: -1, hi: 1, line: "stroke-indigo-500", dot: "fill-indigo-500", open: false, y: 60 },
    { name: "cos⁻¹", lo: 0, hi: 2, line: "stroke-emerald-500", dot: "fill-emerald-500", open: false, y: 95 },
    { name: "tan⁻¹", lo: -1, hi: 1, line: "stroke-rose-500", dot: "fill-rose-500", open: true, y: 130 },
  ];
  return (
    <div className="mx-auto max-w-sm rounded-xl border bg-indigo-50/40 p-4 dark:bg-indigo-950/20">
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full" role="img" aria-label="Principal-value ranges: arcsine from minus pi over 2 to pi over 2, arccosine from 0 to pi, and arctangent strictly between minus pi over 2 and pi over 2.">
        <line x1={x0 - 8} y1={28} x2={x1 + 6} y2={28} className="stroke-slate-300 dark:stroke-slate-600" strokeWidth="0.8" />
        {ticks.map((t, i) => (
          <g key={t}>
            <line x1={X(t)} y1={25} x2={X(t)} y2={31} className="stroke-slate-400" strokeWidth="0.8" />
            <text x={X(t)} y={18} className="fill-slate-500" fontSize="8.5" textAnchor="middle">{tickLabel[i]}</text>
          </g>
        ))}
        {rows.map((r) => (
          <g key={r.name}>
            <text x={x0 - 12} y={r.y + 4} className="fill-slate-600 dark:fill-slate-300" fontSize="10" textAnchor="end">{r.name}</text>
            <line x1={X(r.lo)} y1={r.y} x2={X(r.hi)} y2={r.y} className={r.line} strokeWidth="3.5" strokeLinecap="round" />
            <circle cx={X(r.lo)} cy={r.y} r={3} className={r.open ? "fill-white stroke-rose-500" : r.dot} strokeWidth="1.2" />
            <circle cx={X(r.hi)} cy={r.y} r={3} className={r.open ? "fill-white stroke-rose-500" : r.dot} strokeWidth="1.2" />
          </g>
        ))}
        <text x={x0 - 40} y={158} className="fill-slate-500" fontSize="8">open ends on tan⁻¹ — value never reaches ±π/2</text>
      </svg>
    </div>
  );
}
