/**
 * Cross-section of a sphere and a plane (shown edge-on as a line). The
 * perpendicular distance p from the centre C to the plane decides everything:
 * p > r misses, p = r touches (tangent), p < r cuts a circle. The picture
 * behind "sphere touches plane ⇔ perpendicular distance = radius". Static SVG.
 */
export default function SpherePlaneTangency() {
  const width = 540;
  const height = 260;
  const cx = 170;
  const cy = 130;
  const r = 70;
  // Tangent plane (edge-on): vertical line tangent on the right of the sphere
  const tangentX = cx + r;

  return (
    <div className="mx-auto max-w-md rounded-xl border bg-indigo-50/40 p-4 dark:bg-indigo-950/20">
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="w-full"
        role="img"
        aria-label="A sphere tangent to a plane, with the perpendicular distance from the centre equal to the radius"
      >
        <text x={width / 2} y={22} className="fill-indigo-900 dark:fill-indigo-100" fontSize="14" fontWeight="600" textAnchor="middle">
          Sphere tangent to a plane: distance from centre = radius
        </text>

        {/* Sphere (great circle cross-section) */}
        <circle cx={cx} cy={cy} r={r} className="fill-indigo-400/15 stroke-indigo-600 dark:stroke-indigo-300" strokeWidth="2" />
        <circle cx={cx} cy={cy} r={3.5} className="fill-indigo-800 dark:fill-indigo-200" />
        <text x={cx - 6} y={cy - 8} className="fill-indigo-800 dark:fill-indigo-200" fontSize="14" fontWeight="700">
          C
        </text>

        {/* radius / perpendicular distance to plane */}
        <line x1={cx} y1={cy} x2={tangentX} y2={cy} className="stroke-rose-700 dark:stroke-rose-300" strokeWidth="2" />
        <text x={cx + 18} y={cy - 8} className="fill-rose-700 dark:fill-rose-300" fontSize="13" fontWeight="700">
          p = r
        </text>

        {/* Tangent plane edge-on */}
        <line x1={tangentX} y1={30} x2={tangentX} y2={height - 30} className="stroke-emerald-700 dark:stroke-emerald-300" strokeWidth="2.5" />
        <text x={tangentX + 8} y={50} className="fill-emerald-700 dark:fill-emerald-300" fontSize="12" fontWeight="700">
          plane
        </text>
        {/* contact point */}
        <circle cx={tangentX} cy={cy} r={5} className="fill-amber-500 stroke-amber-700" strokeWidth="1.5" />
        <text x={tangentX + 8} y={cy + 20} className="fill-amber-700 dark:fill-amber-300" fontSize="12" fontWeight="700">
          point of contact
        </text>

        {/* legend of cases */}
        <text x={360} y={cy + 60} className="fill-indigo-700 dark:fill-indigo-300" fontSize="11" textAnchor="middle">
          p &gt; r : miss
        </text>
        <text x={360} y={cy + 78} className="fill-emerald-700 dark:fill-emerald-300" fontSize="11" textAnchor="middle" fontWeight="700">
          p = r : tangent
        </text>
        <text x={360} y={cy + 96} className="fill-indigo-700 dark:fill-indigo-300" fontSize="11" textAnchor="middle">
          p &lt; r : cuts a circle
        </text>
      </svg>
    </div>
  );
}
