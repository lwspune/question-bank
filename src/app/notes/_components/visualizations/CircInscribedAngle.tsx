/**
 * The inscribed-angle theorem: a chord BC subtends an angle at the centre O
 * (the central angle) and a smaller angle at a point A on the circle (the
 * inscribed angle), with the inscribed angle exactly half the central angle.
 * Static SVG.
 *
 * Tailwind classes are written out in full (no string interpolation) so the
 * JIT compiler emits them.
 */
export default function CircInscribedAngle() {
  const W = 300;
  const H = 240;
  const cx = 150;
  const cy = 130;
  const r = 90;

  // Place points on the circle by angle (svg: y grows downward).
  const pt = (deg: number) => {
    const a = (deg * Math.PI) / 180;
    return { x: cx + r * Math.cos(a), y: cy - r * Math.sin(a) };
  };

  const B = pt(210); // lower-left
  const C = pt(330); // lower-right
  const A = pt(90); // top
  const O = { x: cx, y: cy };

  return (
    <div className="mx-auto max-w-sm rounded-xl border bg-indigo-50/40 p-4 dark:bg-indigo-950/20">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="w-full"
        role="img"
        aria-label="A circle with centre O and a chord BC. The chord subtends a central angle at O and an inscribed angle at a point A on the circle; the inscribed angle at A is half the central angle at O."
      >
        {/* circle */}
        <circle
          cx={cx}
          cy={cy}
          r={r}
          className="fill-indigo-100/30 stroke-indigo-600 dark:fill-indigo-900/20 dark:stroke-indigo-300"
          strokeWidth="2"
        />

        {/* central angle: O to B and O to C */}
        <line x1={O.x} y1={O.y} x2={B.x} y2={B.y} className="stroke-rose-500" strokeWidth="2" />
        <line x1={O.x} y1={O.y} x2={C.x} y2={C.y} className="stroke-rose-500" strokeWidth="2" />

        {/* inscribed angle: A to B and A to C */}
        <line x1={A.x} y1={A.y} x2={B.x} y2={B.y} className="stroke-emerald-600 dark:stroke-emerald-400" strokeWidth="2" />
        <line x1={A.x} y1={A.y} x2={C.x} y2={C.y} className="stroke-emerald-600 dark:stroke-emerald-400" strokeWidth="2" />

        {/* chord BC */}
        <line x1={B.x} y1={B.y} x2={C.x} y2={C.y} className="stroke-slate-400" strokeWidth="1.4" strokeDasharray="4 3" />

        {/* point dots */}
        <circle cx={O.x} cy={O.y} r={3.2} className="fill-slate-700 dark:fill-slate-200" />
        {[A, B, C].map((p, i) => (
          <circle key={i} cx={p.x} cy={p.y} r={3.4} className="fill-indigo-700 dark:fill-indigo-200" />
        ))}

        {/* labels */}
        <text x={A.x} y={A.y - 8} className="fill-emerald-700 dark:fill-emerald-300" fontSize="12" fontWeight="700" textAnchor="middle">
          A
        </text>
        <text x={B.x - 10} y={B.y + 6} className="fill-slate-600 dark:fill-slate-300" fontSize="12" fontWeight="700" textAnchor="middle">
          B
        </text>
        <text x={C.x + 10} y={C.y + 6} className="fill-slate-600 dark:fill-slate-300" fontSize="12" fontWeight="700" textAnchor="middle">
          C
        </text>
        <text x={O.x - 12} y={O.y + 4} className="fill-rose-600 dark:fill-rose-300" fontSize="12" fontWeight="700" textAnchor="middle">
          O
        </text>

        <text x={W / 2} y={H - 10} className="fill-slate-500" fontSize="9.5" textAnchor="middle">
          inscribed angle at A = half the central angle at O
        </text>
      </svg>
    </div>
  );
}
