/**
 * Composite sphere cross-section — a solid inner sphere of radius R/2 (density ρ)
 * embedded in a shell of outer radius R, inner radius R/2 (density ρ/2). A
 * cross-section is clearer than a 3-D render for the "average density = total
 * mass ÷ total volume = 9ρ/16" HARD question.
 *
 * Server component — static 2-D.
 */
export default function GravCompositeSphere() {
  const cx = 200;
  const cy = 150;
  const Router = 110; // outer radius (R)
  const Rinner = 55; // inner radius (R/2)

  return (
    <div className="mx-auto max-w-md rounded-xl border bg-indigo-50/40 p-4 dark:bg-indigo-950/20">
      <svg
        viewBox="0 0 400 320"
        className="w-full"
        role="img"
        aria-label="Cross-section of a composite sphere: a solid inner sphere of radius R over two with density rho, surrounded by a spherical shell of outer radius R and density rho over two; the average density of the whole sphere is nine rho over sixteen"
      >
        {/* shell region (outer disc) */}
        <circle cx={cx} cy={cy} r={Router} className="fill-indigo-300/40 stroke-indigo-600 dark:fill-indigo-700/30 dark:stroke-indigo-400" strokeWidth="2" />
        {/* inner solid core, drawn over the shell */}
        <circle cx={cx} cy={cy} r={Rinner} className="fill-indigo-600/70 stroke-indigo-800 dark:fill-indigo-400/70 dark:stroke-indigo-200" strokeWidth="2" />

        {/* radius markers */}
        <line x1={cx} y1={cy} x2={cx + Router} y2={cy} className="stroke-rose-600 dark:stroke-rose-400" strokeWidth="2" />
        <text x={cx + Router + 6} y={cy + 4} fontSize="13" fontWeight="700" className="fill-rose-700 dark:fill-rose-300">R</text>

        <line x1={cx} y1={cy} x2={cx} y2={cy - Rinner} className="stroke-amber-600 dark:stroke-amber-400" strokeWidth="2" />
        <text x={cx + 6} y={cy - Rinner - 6} fontSize="12" fontWeight="700" className="fill-amber-700 dark:fill-amber-300">R/2</text>

        {/* centre dot */}
        <circle cx={cx} cy={cy} r="2.5" className="fill-slate-700 dark:fill-slate-200" />

        {/* density labels */}
        <text x={cx} y={cy + 12} textAnchor="middle" fontSize="13" fontWeight="700" className="fill-white">ρ</text>
        <text x={cx} y={cy - Router + 22} textAnchor="middle" fontSize="13" fontWeight="700" className="fill-indigo-800 dark:fill-indigo-100">ρ/2 (shell)</text>

        {/* result */}
        <text x={cx} y={300} textAnchor="middle" fontSize="15" fontWeight="700" className="fill-slate-700 dark:fill-slate-200">average density = 9ρ/16</text>
      </svg>
      <p className="mt-2 text-center text-xs text-muted-foreground">
        Dense core (ρ) inside a lighter shell (ρ/2). The average density is total
        mass ÷ total volume, a volume-weighted blend — here 9ρ/16, not the
        mid-value 3ρ/4.
      </p>
    </div>
  );
}
