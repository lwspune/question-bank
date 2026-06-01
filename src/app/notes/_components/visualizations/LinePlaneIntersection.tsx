/**
 * A straight line piercing a plane at a single point P. Shows the plane as a
 * parallelogram, the line crossing it, and the pierce point — the geometric
 * picture behind "substitute the parametric point into the plane equation."
 * Server component, static.
 */
export default function LinePlaneIntersection() {
  const width = 520;
  const height = 280;

  // Plane parallelogram
  const plane = "120,110 400,80 440,190 160,220";
  // Pierce point P (on the plane)
  const px = 290;
  const py = 150;

  return (
    <div className="mx-auto max-w-md rounded-xl border bg-indigo-50/40 p-4 dark:bg-indigo-950/20">
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="w-full"
        role="img"
        aria-label="A line piercing a plane at a single intersection point P"
      >
        <defs>
          <marker id="lpi-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
            <path d="M0,0 L0,6 L9,3 z" className="fill-rose-700 dark:fill-rose-300" />
          </marker>
        </defs>

        <text x={width / 2} y={22} className="fill-indigo-900 dark:fill-indigo-100" fontSize="14" fontWeight="600" textAnchor="middle">
          Line meets plane at one point
        </text>

        {/* Plane */}
        <polygon points={plane} className="fill-indigo-400/15 stroke-indigo-500/60" strokeWidth="1.5" />
        <text x={410} y={205} className="fill-indigo-700 dark:fill-indigo-300" fontSize="13" fontWeight="700">
          P (plane)
        </text>

        {/* Line, drawn through P, part behind plane dashed */}
        <line x1={170} y1={250} x2={px} y2={py} className="stroke-rose-700 dark:stroke-rose-300" strokeWidth="2.5" />
        <line
          x1={px}
          y1={py}
          x2={400}
          y2={60}
          className="stroke-rose-700 dark:stroke-rose-300"
          strokeWidth="2.5"
          strokeDasharray="5 4"
          markerEnd="url(#lpi-arrow)"
        />
        <text x={150} y={262} className="fill-rose-700 dark:fill-rose-300" fontSize="13" fontWeight="700">
          L (line)
        </text>

        {/* Pierce point */}
        <circle cx={px} cy={py} r={6} className="fill-amber-500 stroke-amber-700" strokeWidth="2" />
        <text x={px + 12} y={py - 8} className="fill-amber-700 dark:fill-amber-300" fontSize="14" fontWeight="700">
          P
        </text>

        <text x={width / 2} y={height - 6} className="fill-indigo-700 dark:fill-indigo-300" fontSize="11" textAnchor="middle">
          Put the line&apos;s point (x₀+at, y₀+bt, z₀+ct) into the plane → solve for t → back-substitute.
        </text>
      </svg>
    </div>
  );
}
