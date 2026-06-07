/**
 * Two lines crossing at a point with the angle θ between them marked. Static SVG.
 */
export default function LinesAngleBetween() {
  const W = 260;
  const H = 180;
  const cx = W / 2;
  const cy = H / 2 + 10;
  const L = 110;

  // line 1 at +12°, line 2 at +58° (so θ ≈ 46°)
  const a1 = (12 * Math.PI) / 180;
  const a2 = (58 * Math.PI) / 180;
  const end = (ang: number, s: number) => `${cx + s * Math.cos(ang)},${cy - s * Math.sin(ang)}`;

  return (
    <div className="mx-auto max-w-xs rounded-xl border bg-indigo-50/40 p-4 dark:bg-indigo-950/20">
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full" role="img" aria-label="Two straight lines crossing at a point, with the angle theta between them; its tangent is the absolute value of (m1 minus m2) over (1 plus m1 m2).">
        <line x1={cx - L * Math.cos(a1)} y1={cy + L * Math.sin(a1)} x2={cx + L * Math.cos(a1)} y2={cy - L * Math.sin(a1)} className="stroke-indigo-600 dark:stroke-indigo-300" strokeWidth="2.2" />
        <line x1={cx - L * Math.cos(a2)} y1={cy + L * Math.sin(a2)} x2={cx + L * Math.cos(a2)} y2={cy - L * Math.sin(a2)} className="stroke-indigo-600 dark:stroke-indigo-300" strokeWidth="2.2" />
        {/* angle arc */}
        <path d={`M ${end(a1, 34)} A 34 34 0 0 0 ${end(a2, 34)}`} className="fill-none stroke-rose-500" strokeWidth="1.6" />
        <circle cx={cx} cy={cy} r={2.5} className="fill-slate-600 dark:fill-slate-300" />
        <text x={cx + 30} y={cy - 24} className="fill-rose-600 dark:fill-rose-300" fontSize="13" fontWeight="600">θ</text>
        <text x={cx + L * Math.cos(a1) - 6} y={cy - L * Math.sin(a1) + 4} className="fill-slate-500" fontSize="9">slope m₁</text>
        <text x={cx + L * Math.cos(a2) - 24} y={cy - L * Math.sin(a2) - 4} className="fill-slate-500" fontSize="9">slope m₂</text>
        <text x={cx} y={H - 4} className="fill-slate-500" fontSize="9" textAnchor="middle">tan θ = |(m₁−m₂)/(1+m₁m₂)|</text>
      </svg>
    </div>
  );
}
