/**
 * The 3D coordinate frame — three mutually perpendicular axes meeting at the
 * origin, the three coordinate planes (XY, YZ, ZX), and a callout that the
 * planes carve space into 8 octants. Drawn in a fixed orthographic
 * (turntable) projection — server component, no animation.
 */
export default function OctantsCoordinatePlanes() {
  const width = 520;
  const height = 300;
  const ox = 250;
  const oy = 190;

  // Simple oblique projection of unit axes.
  const xAxis = { x: ox + 150, y: oy + 70 }; // toward viewer-right
  const yAxis = { x: ox + 170, y: oy - 30 }; // to the right-back
  const zAxis = { x: ox, y: oy - 150 }; // up

  return (
    <div className="mx-auto max-w-md rounded-xl border bg-indigo-50/40 p-4 dark:bg-indigo-950/20">
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="w-full"
        role="img"
        aria-label="Three perpendicular coordinate axes and the three coordinate planes dividing space into eight octants"
      >
        <defs>
          <marker id="oct-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
            <path d="M0,0 L0,6 L9,3 z" className="fill-indigo-700 dark:fill-indigo-300" />
          </marker>
        </defs>

        {/* XY plane (floor) */}
        <polygon
          points={`${ox},${oy} ${xAxis.x},${xAxis.y} ${xAxis.x + (yAxis.x - ox)},${xAxis.y + (yAxis.y - oy)} ${yAxis.x},${yAxis.y}`}
          className="fill-indigo-400/15 stroke-indigo-400/50"
          strokeWidth="1"
        />
        {/* ZX plane */}
        <polygon
          points={`${ox},${oy} ${xAxis.x},${xAxis.y} ${xAxis.x},${xAxis.y - 150} ${zAxis.x},${zAxis.y}`}
          className="fill-sky-400/10 stroke-sky-400/40"
          strokeWidth="1"
        />
        {/* YZ plane */}
        <polygon
          points={`${ox},${oy} ${yAxis.x},${yAxis.y} ${yAxis.x},${yAxis.y - 150} ${zAxis.x},${zAxis.y}`}
          className="fill-emerald-400/10 stroke-emerald-400/40"
          strokeWidth="1"
        />

        {/* Axes */}
        {[
          { p: xAxis, label: "x", lx: xAxis.x + 12, ly: xAxis.y + 4 },
          { p: yAxis, label: "y", lx: yAxis.x + 12, ly: yAxis.y },
          { p: zAxis, label: "z", lx: zAxis.x, ly: zAxis.y - 8 },
        ].map((a) => (
          <g key={a.label}>
            <line
              x1={ox}
              y1={oy}
              x2={a.p.x}
              y2={a.p.y}
              className="stroke-indigo-700 dark:stroke-indigo-300"
              strokeWidth="2"
              markerEnd="url(#oct-arrow)"
            />
            <text
              x={a.lx}
              y={a.ly}
              className="fill-indigo-900 dark:fill-indigo-100"
              fontSize="15"
              fontWeight="700"
              textAnchor="middle"
            >
              {a.label}
            </text>
          </g>
        ))}

        {/* Origin */}
        <circle cx={ox} cy={oy} r={4} className="fill-indigo-800 dark:fill-indigo-200" />
        <text x={ox - 14} y={oy + 16} className="fill-indigo-800 dark:fill-indigo-200" fontSize="13">
          O
        </text>

        {/* Plane labels */}
        <text x={ox + 95} y={oy + 48} className="fill-indigo-700 dark:fill-indigo-300" fontSize="11" textAnchor="middle">
          XY-plane (z = 0)
        </text>
        <text x={ox - 70} y={oy - 70} className="fill-emerald-700 dark:fill-emerald-300" fontSize="11" textAnchor="middle">
          YZ (x = 0)
        </text>
        <text x={ox + 130} y={oy - 70} className="fill-sky-700 dark:fill-sky-300" fontSize="11" textAnchor="middle">
          ZX (y = 0)
        </text>

        <text x={width / 2} y={height - 8} className="fill-indigo-700 dark:fill-indigo-300" fontSize="12" textAnchor="middle" fontWeight="600">
          3 coordinate planes → space splits into 8 octants
        </text>
      </svg>
    </div>
  );
}
