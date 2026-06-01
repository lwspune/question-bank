/**
 * A plane with its normal vector, the origin O off the plane, and the foot of
 * the perpendicular N. The length ON is the perpendicular distance from the
 * origin to the plane — the picture behind |d|/√(a²+b²+c²). Static SVG.
 */
export default function PlaneWithNormal() {
  const width = 520;
  const height = 300;

  const plane = "120,120 400,90 440,210 160,240";
  // Foot of perpendicular on the plane
  const nx = 300;
  const ny = 165;
  // Origin (off the plane)
  const ox = 150;
  const oy = 60;

  return (
    <div className="mx-auto max-w-md rounded-xl border bg-indigo-50/40 p-4 dark:bg-indigo-950/20">
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="w-full"
        role="img"
        aria-label="A plane, its normal vector, and the perpendicular distance from the origin to the plane"
      >
        <defs>
          <marker id="pwn-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
            <path d="M0,0 L0,6 L9,3 z" className="fill-emerald-700 dark:fill-emerald-300" />
          </marker>
        </defs>

        <text x={width / 2} y={22} className="fill-indigo-900 dark:fill-indigo-100" fontSize="14" fontWeight="600" textAnchor="middle">
          Distance from origin to a plane
        </text>

        {/* Plane */}
        <polygon points={plane} className="fill-indigo-400/15 stroke-indigo-500/60" strokeWidth="1.5" />
        <text x={405} y={120} className="fill-indigo-700 dark:fill-indigo-300" fontSize="12" fontWeight="700">
          ax + by + cz = d
        </text>

        {/* Normal vector at N */}
        <line x1={nx} y1={ny} x2={nx - 60} y2={ny - 95} className="stroke-emerald-700 dark:stroke-emerald-300" strokeWidth="2.5" markerEnd="url(#pwn-arrow)" />
        <text x={nx - 92} y={ny - 92} className="fill-emerald-700 dark:fill-emerald-300" fontSize="13" fontWeight="700">
          n⃗ = ⟨a, b, c⟩
        </text>

        {/* Perpendicular O -> N */}
        <line x1={ox} y1={oy} x2={nx} y2={ny} className="stroke-rose-700 dark:stroke-rose-300" strokeWidth="2" strokeDasharray="6 4" />
        {/* right-angle tick at N */}
        <rect x={nx - 10} y={ny - 10} width={10} height={10} className="fill-none stroke-rose-600 dark:stroke-rose-400" strokeWidth="1" transform={`rotate(-20 ${nx} ${ny})`} />

        {/* Origin */}
        <circle cx={ox} cy={oy} r={5} className="fill-indigo-800 dark:fill-indigo-200" />
        <text x={ox - 16} y={oy + 4} className="fill-indigo-800 dark:fill-indigo-200" fontSize="14" fontWeight="700">
          O
        </text>
        {/* Foot N */}
        <circle cx={nx} cy={ny} r={5} className="fill-amber-500 stroke-amber-700" strokeWidth="1.5" />
        <text x={nx + 10} y={ny + 16} className="fill-amber-700 dark:fill-amber-300" fontSize="14" fontWeight="700">
          N
        </text>

        {/* distance label */}
        <text x={(ox + nx) / 2 - 30} y={(oy + ny) / 2} className="fill-rose-700 dark:fill-rose-300" fontSize="12" fontWeight="700">
          distance = |d| / √(a²+b²+c²)
        </text>

        <text x={width / 2} y={height - 6} className="fill-indigo-700 dark:fill-indigo-300" fontSize="11" textAnchor="middle">
          The shortest distance is along the normal; N is the foot of the perpendicular from O.
        </text>
      </svg>
    </div>
  );
}
