/**
 * Anatomy of a circle: the centre C, a radius r out to the rim, a full
 * diameter (= 2r) through the centre, and a chord that does NOT pass through
 * the centre. Static SVG.
 *
 * Tailwind classes are written out in full (no string interpolation) so the
 * JIT compiler emits them.
 */
export default function CircCircleAnatomy() {
  const W = 300;
  const H = 220;
  const cx = 150;
  const cy = 110;
  const r = 80;

  // Radius endpoint (up-right, 35° above horizontal).
  const ang = (-35 * Math.PI) / 180;
  const rx = cx + r * Math.cos(ang);
  const ry = cy + r * Math.sin(ang);

  // Diameter: horizontal through centre.
  const d1x = cx - r;
  const d2x = cx + r;

  // Chord: a non-central horizontal-ish chord near the bottom.
  const chordY = cy + 52;
  const half = Math.sqrt(r * r - 52 * 52); // half-chord length
  const ch1x = cx - half;
  const ch2x = cx + half;

  return (
    <div className="mx-auto max-w-sm rounded-xl border bg-indigo-50/40 p-4 dark:bg-indigo-950/20">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="w-full"
        role="img"
        aria-label="A circle showing its centre, a radius from the centre to the rim, a diameter passing through the centre (twice the radius), and a chord that joins two points on the circle without passing through the centre."
      >
        {/* the circle */}
        <circle
          cx={cx}
          cy={cy}
          r={r}
          className="fill-indigo-100/40 stroke-indigo-600 dark:fill-indigo-900/30 dark:stroke-indigo-300"
          strokeWidth="2"
        />

        {/* diameter through centre */}
        <line x1={d1x} y1={cy} x2={d2x} y2={cy} className="stroke-rose-500" strokeWidth="2" />
        {/* radius */}
        <line x1={cx} y1={cy} x2={rx} y2={ry} className="stroke-emerald-600 dark:stroke-emerald-400" strokeWidth="2.5" />
        {/* chord (not through centre) */}
        <line x1={ch1x} y1={chordY} x2={ch2x} y2={chordY} className="stroke-amber-500" strokeWidth="2" />

        {/* centre dot */}
        <circle cx={cx} cy={cy} r={3.5} className="fill-slate-700 dark:fill-slate-200" />

        {/* labels */}
        <text x={cx + 6} y={cy + 14} className="fill-slate-600 dark:fill-slate-300" fontSize="11" fontWeight="600">
          C
        </text>
        <text x={(cx + rx) / 2 + 2} y={(cy + ry) / 2 - 4} className="fill-emerald-700 dark:fill-emerald-300" fontSize="11" fontWeight="600">
          r
        </text>
        <text x={cx} y={cy - 8} className="fill-rose-600 dark:fill-rose-300" fontSize="10.5" fontWeight="600" textAnchor="middle">
          diameter = 2r
        </text>
        <text x={cx} y={chordY + 16} className="fill-amber-600 dark:fill-amber-300" fontSize="10.5" fontWeight="600" textAnchor="middle">
          chord
        </text>
      </svg>
    </div>
  );
}
