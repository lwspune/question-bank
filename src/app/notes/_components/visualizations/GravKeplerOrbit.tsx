/**
 * Kepler's third law — an elliptical planetary orbit with the Sun at one focus,
 * the semi-major axis a marked, illustrating T² ∝ a³. Reinforces that the orbit
 * size is measured by the semi-major axis and that a larger a means a longer
 * period.
 *
 * Server component — static 2-D.
 */
export default function GravKeplerOrbit() {
  const cx = 280; // ellipse centre x
  const cy = 130; // ellipse centre y
  const rx = 190; // semi-major axis (visual)
  const ry = 120; // semi-minor axis (visual)
  const c = Math.sqrt(rx * rx - ry * ry); // focal distance
  const focusX = cx - c; // Sun at the left focus
  const planetX = cx + rx; // planet drawn at aphelion (far vertex)

  return (
    <div className="mx-auto max-w-md rounded-xl border bg-indigo-50/40 p-4 dark:bg-indigo-950/20">
      <svg
        viewBox="0 0 560 270"
        className="w-full"
        role="img"
        aria-label="An elliptical planetary orbit with the Sun at one focus; the semi-major axis a is marked from the centre to the far vertex, and the square of the orbital period is proportional to the cube of a"
      >
        {/* the elliptical orbit */}
        <ellipse
          cx={cx}
          cy={cy}
          rx={rx}
          ry={ry}
          className="fill-indigo-400/10 stroke-indigo-600 dark:stroke-indigo-400"
          strokeWidth="2"
        />

        {/* major axis line */}
        <line
          x1={cx - rx}
          y1={cy}
          x2={cx + rx}
          y2={cy}
          className="stroke-slate-400 dark:stroke-slate-500"
          strokeWidth="1"
          strokeDasharray="4 4"
        />

        {/* semi-major axis a: centre → far vertex */}
        <line x1={cx} y1={cy} x2={cx + rx} y2={cy} className="stroke-rose-600 dark:stroke-rose-400" strokeWidth="2.5" />
        <text x={cx + rx / 2} y={cy - 10} textAnchor="middle" fontSize="14" fontWeight="700" className="fill-rose-700 dark:fill-rose-300">a</text>

        {/* centre marker */}
        <circle cx={cx} cy={cy} r="2.5" className="fill-slate-500 dark:fill-slate-400" />
        <text x={cx} y={cy + 18} textAnchor="middle" fontSize="11" className="fill-slate-600 dark:fill-slate-400">centre</text>

        {/* the Sun at the focus */}
        <circle cx={focusX} cy={cy} r="11" className="fill-amber-400 stroke-amber-600" strokeWidth="1.5" />
        <text x={focusX} y={cy + 30} textAnchor="middle" fontSize="12" fontWeight="600" className="fill-amber-700 dark:fill-amber-300">Sun (focus)</text>

        {/* the planet */}
        <circle cx={planetX} cy={cy} r="6" className="fill-indigo-600 dark:fill-indigo-400" />
        <text x={planetX - 6} y={cy - 12} textAnchor="end" fontSize="12" fontWeight="600" className="fill-indigo-700 dark:fill-indigo-300">planet</text>

        {/* law caption inside the figure */}
        <text x={cx} y={250} textAnchor="middle" fontSize="15" fontWeight="700" className="fill-slate-700 dark:fill-slate-200">T² ∝ a³</text>
      </svg>
      <p className="mt-2 text-center text-xs text-muted-foreground">
        The Sun sits at one focus of the elliptical orbit. The orbit&apos;s size
        is its semi-major axis a, and the square of the period grows as the cube
        of a: T² ∝ a³.
      </p>
    </div>
  );
}
