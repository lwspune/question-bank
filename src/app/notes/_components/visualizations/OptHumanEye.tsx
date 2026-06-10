/**
 * Human eye cross-section — the converging optical system: light enters
 * through the cornea, passes the pupil (aperture controlled by the iris),
 * is focused by the variable-focus crystalline lens (accommodation), and
 * forms a real, inverted, diminished image on the retina. Labels the parts
 * NDA tests: cornea, iris, pupil, lens, retina, optic nerve.
 *
 * Server component — static 2-D.
 */
export default function OptHumanEye() {
  const cx = 300;
  const cy = 150;
  const r = 95; // eyeball radius

  return (
    <div className="mx-auto max-w-md rounded-xl border bg-indigo-50/40 p-4 dark:bg-indigo-950/20">
      <svg
        viewBox="0 0 560 300"
        className="w-full"
        role="img"
        aria-label="Cross-section of the human eye showing cornea, iris, pupil, lens, retina and optic nerve focusing light to a real inverted image on the retina"
      >
        <defs>
          <marker id="eye-arrow" markerWidth="9" markerHeight="9" refX="7" refY="3" orient="auto">
            <path d="M0,0 L0,6 L8,3 z" className="fill-indigo-600 dark:fill-indigo-400" />
          </marker>
        </defs>

        {/* eyeball */}
        <circle cx={cx} cy={cy} r={r} className="fill-sky-50 stroke-slate-500 dark:fill-slate-800/40 dark:stroke-slate-300" strokeWidth="2" />

        {/* cornea — bulge at the front (left) */}
        <path d={`M ${cx - r + 6} ${cy - 36} A 44 44 0 0 0 ${cx - r + 6} ${cy + 36}`} className="fill-sky-200/50 stroke-sky-700 dark:stroke-sky-300" strokeWidth="2" />
        <text x={cx - r - 4} y={cy - 44} textAnchor="end" fontSize="10" className="fill-sky-800 dark:fill-sky-200">cornea</text>

        {/* iris + pupil aperture */}
        <line x1={cx - r + 26} y1={cy - 38} x2={cx - r + 26} y2={cy - 14} className="stroke-amber-700 dark:stroke-amber-400" strokeWidth="4" />
        <line x1={cx - r + 26} y1={cy + 14} x2={cx - r + 26} y2={cy + 38} className="stroke-amber-700 dark:stroke-amber-400" strokeWidth="4" />
        <text x={cx - r + 26} y={cy - 48} textAnchor="middle" fontSize="10" className="fill-amber-800 dark:fill-amber-300">iris</text>
        <text x={cx - r + 26} y={cy + 56} textAnchor="middle" fontSize="10" className="fill-amber-800 dark:fill-amber-300">pupil</text>

        {/* crystalline lens (biconvex) */}
        <ellipse cx={cx - 40} cy={cy} rx={12} ry={34} className="fill-indigo-200/50 stroke-indigo-700 dark:stroke-indigo-300" strokeWidth="2" />
        <text x={cx - 40} y={cy - 44} textAnchor="middle" fontSize="10" className="fill-indigo-800 dark:fill-indigo-200">lens</text>

        {/* retina — back inner surface (right) */}
        <path d={`M ${cx + r - 8} ${cy - 60} A 70 70 0 0 1 ${cx + r - 8} ${cy + 60}`} className="fill-none stroke-rose-500 dark:stroke-rose-400" strokeWidth="3" />
        <text x={cx + r + 4} y={cy - 56} textAnchor="start" fontSize="10" className="fill-rose-700 dark:fill-rose-300">retina</text>

        {/* optic nerve */}
        <line x1={cx + r - 2} y1={cy + 30} x2={cx + r + 30} y2={cy + 52} className="stroke-slate-500 dark:stroke-slate-300" strokeWidth="4" />
        <text x={cx + r + 32} y={cy + 60} textAnchor="start" fontSize="10" className="fill-slate-700 dark:fill-slate-200">optic nerve</text>

        {/* incoming rays from a distant object (top), focused to a point on retina */}
        <line x1={70} y1={cy - 50} x2={cx - 40} y2={cy - 14} className="stroke-emerald-600 dark:stroke-emerald-400" strokeWidth="1.6" markerEnd="url(#eye-arrow)" />
        <line x1={cx - 40} y1={cy - 14} x2={cx + r - 12} y2={cy + 22} className="stroke-emerald-600 dark:stroke-emerald-400" strokeWidth="1.6" />
        <line x1={70} y1={cy + 50} x2={cx - 40} y2={cy + 14} className="stroke-emerald-600 dark:stroke-emerald-400" strokeWidth="1.6" markerEnd="url(#eye-arrow)" />
        <line x1={cx - 40} y1={cy + 14} x2={cx + r - 12} y2={cy + 22} className="stroke-emerald-600 dark:stroke-emerald-400" strokeWidth="1.6" />
        <circle cx={cx + r - 12} cy={cy + 22} r={3} className="fill-rose-600 dark:fill-rose-400" />

        <text x={300} y={285} textAnchor="middle" fontSize="11" className="fill-indigo-900 dark:fill-indigo-100">The lens changes shape (accommodation) to focus a real, inverted image on the retina</text>
      </svg>
      <p className="mt-2 text-center text-xs text-muted-foreground">
        The eye is a variable-focus converging system. Ciliary muscles change the
        lens shape (accommodation) so objects at different distances all focus
        sharply on the retina.
      </p>
    </div>
  );
}
