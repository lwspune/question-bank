/**
 * Field lines versus equipotential surfaces around a point mass. Concentric
 * dashed circles are equipotentials (same potential everywhere on each ring);
 * radial arrows are the field lines (the local pull, perpendicular to the
 * equipotentials). Reinforces that two points on the SAME equipotential can have
 * different field magnitudes, and moving along an equipotential does zero work.
 *
 * Server component — static 2-D.
 */
export default function GravFieldVsPotential() {
  const cx = 200;
  const cy = 150;
  const rings = [45, 80, 115]; // equipotential radii
  // field-line directions (radially inward toward the mass)
  const angles = [0, 45, 90, 135, 180, 225, 270, 315];

  // two points A and B on the SAME (outer) equipotential
  const Rab = 80;
  const aAng = (200 * Math.PI) / 180;
  const bAng = (-20 * Math.PI) / 180;
  const ax = cx + Rab * Math.cos(aAng);
  const ay = cy + Rab * Math.sin(aAng);
  const bx = cx + Rab * Math.cos(bAng);
  const by = cy + Rab * Math.sin(bAng);

  return (
    <div className="mx-auto max-w-md rounded-xl border bg-indigo-50/40 p-4 dark:bg-indigo-950/20">
      <svg
        viewBox="0 0 400 320"
        className="w-full"
        role="img"
        aria-label="A central mass with radial field-line arrows pointing inward and concentric dashed equipotential circles; points A and B lie on the same equipotential, so moving between them does zero work even though the field differs"
      >
        <defs>
          <marker id="grav-fp-arrow" markerWidth="9" markerHeight="9" refX="7" refY="3" orient="auto">
            <path d="M0,0 L0,6 L8,3 z" className="fill-rose-600 dark:fill-rose-400" />
          </marker>
        </defs>

        {/* equipotential rings (dashed) */}
        {rings.map((r) => (
          <circle
            key={r}
            cx={cx}
            cy={cy}
            r={r}
            fill="none"
            className="stroke-indigo-500 dark:stroke-indigo-400"
            strokeWidth="1.5"
            strokeDasharray="5 4"
          />
        ))}

        {/* field lines: arrow from just outside the outer ring pointing inward */}
        {angles.map((deg) => {
          const a = (deg * Math.PI) / 180;
          const r1 = 135;
          const r2 = 20;
          return (
            <line
              key={deg}
              x1={cx + r1 * Math.cos(a)}
              y1={cy + r1 * Math.sin(a)}
              x2={cx + r2 * Math.cos(a)}
              y2={cy + r2 * Math.sin(a)}
              className="stroke-rose-600 dark:stroke-rose-400"
              strokeWidth="1.5"
              markerEnd="url(#grav-fp-arrow)"
            />
          );
        })}

        {/* central mass */}
        <circle cx={cx} cy={cy} r="9" className="fill-slate-700 dark:fill-slate-200" />

        {/* A and B on the same equipotential */}
        <circle cx={ax} cy={ay} r="5" className="fill-emerald-600 dark:fill-emerald-400" />
        <text x={ax - 8} y={ay - 8} textAnchor="end" fontSize="13" fontWeight="700" className="fill-emerald-700 dark:fill-emerald-300">A</text>
        <circle cx={bx} cy={by} r="5" className="fill-emerald-600 dark:fill-emerald-400" />
        <text x={bx + 8} y={by - 8} fontSize="13" fontWeight="700" className="fill-emerald-700 dark:fill-emerald-300">B</text>

        {/* legend */}
        <text x={cx} y={300} textAnchor="middle" fontSize="12" className="fill-slate-600 dark:fill-slate-300">
          dashed = equipotential · arrows = field
        </text>
      </svg>
      <p className="mt-2 text-center text-xs text-muted-foreground">
        Field lines (red) give the local pull; dashed circles are equipotentials.
        A and B sit on the same equipotential, so gravity does zero work moving a
        mass between them — even though the field strength differs.
      </p>
    </div>
  );
}
