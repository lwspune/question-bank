/**
 * Magnetic field of a straight current-carrying wire — wire pointing OUT of the
 * page (dot), concentric circular field lines circling anticlockwise (right-hand
 * grip rule), weakening with distance (B ∝ I/r).
 *
 * Server component — static.
 */
export default function MagneticFieldAroundWire() {
  const cx = 220;
  const cy = 120;
  const radii = [34, 64, 94];

  return (
    <div className="mx-auto max-w-md rounded-xl border bg-indigo-50/40 p-4 dark:bg-indigo-950/20">
      <svg
        viewBox="0 0 520 240"
        className="w-full"
        role="img"
        aria-label="Concentric circular magnetic field lines around a wire carrying current out of the page, circulating anticlockwise"
      >
        <defs>
          <marker id="bfield-arrow" markerWidth="10" markerHeight="10" refX="5" refY="3" orient="auto">
            <path d="M0,0 L0,6 L8,3 z" className="fill-indigo-600 dark:fill-indigo-400" />
          </marker>
        </defs>

        {/* concentric field circles */}
        {radii.map((r) => (
          <circle key={r} cx={cx} cy={cy} r={r} className="fill-none stroke-indigo-500/70" strokeWidth="1.6" />
        ))}
        {/* arrowheads on the top of each circle, pointing left (anticlockwise for current out) */}
        {radii.map((r) => (
          <line
            key={`a${r}`}
            x1={cx + 1}
            y1={cy - r}
            x2={cx - 1}
            y2={cy - r}
            className="stroke-indigo-600 dark:stroke-indigo-400"
            strokeWidth="2"
            markerEnd="url(#bfield-arrow)"
          />
        ))}

        {/* wire — current out of page */}
        <circle cx={cx} cy={cy} r={10} className="fill-amber-400/40 stroke-amber-600 dark:stroke-amber-400" strokeWidth="2" />
        <circle cx={cx} cy={cy} r={2.5} className="fill-amber-700 dark:fill-amber-300" />
        <text x={cx} y={cy + 34} textAnchor="middle" fontSize="11" className="fill-amber-700 dark:fill-amber-300">I out of page</text>

        {/* labels */}
        <text x={400} y={70} textAnchor="middle" fontSize="13" fontWeight="600" className="fill-indigo-700 dark:fill-indigo-300">B = μ₀I / 2πr</text>
        <text x={400} y={92} textAnchor="middle" fontSize="11" className="fill-slate-500">stronger near the wire</text>
        <text x={400} y={160} textAnchor="middle" fontSize="12" className="fill-slate-600 dark:fill-slate-300">Right-hand grip:</text>
        <text x={400} y={177} textAnchor="middle" fontSize="11" className="fill-slate-500">thumb = current,</text>
        <text x={400} y={192} textAnchor="middle" fontSize="11" className="fill-slate-500">fingers curl = field</text>
      </svg>
      <p className="mt-2 text-center text-xs text-muted-foreground">
        Field lines circle the wire; point your right thumb along the current
        (out of the page) and your fingers curl the way the field circulates.
      </p>
    </div>
  );
}
