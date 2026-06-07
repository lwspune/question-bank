/**
 * One-sided limits at a jump: the left branch approaches one height, the right
 * branch another, so LHL ≠ RHL and the two-sided limit does not exist. Static SVG.
 */
export default function LimOneSidedApproach() {
  const W = 260;
  const H = 190;
  const oy = 110;
  const cx = W / 2;

  return (
    <div className="mx-auto max-w-xs rounded-xl border bg-indigo-50/40 p-4 dark:bg-indigo-950/20">
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full" role="img" aria-label="At x = a the left branch rises to one value (the left-hand limit) and the right branch starts at a higher value (the right-hand limit); the two differ, so the limit does not exist.">
        <line x1={20} y1={oy} x2={W - 14} y2={oy} className="stroke-slate-400" strokeWidth="0.8" />
        <line x1={cx} y1={20} x2={cx} y2={H - 14} className="stroke-slate-400" strokeWidth="0.8" />
        {/* left branch rising to (a, L1) */}
        <line x1={cx - 90} y1={oy + 30} x2={cx} y2={oy + 6} className="stroke-indigo-600 dark:stroke-indigo-300" strokeWidth="2.2" />
        <circle cx={cx} cy={oy + 6} r={3.5} className="fill-white stroke-indigo-600 dark:stroke-indigo-300" strokeWidth="2" />
        {/* right branch from (a, L2) higher */}
        <line x1={cx} y1={oy - 40} x2={cx + 90} y2={oy - 58} className="stroke-indigo-600 dark:stroke-indigo-300" strokeWidth="2.2" />
        <circle cx={cx} cy={oy - 40} r={3.5} className="fill-white stroke-indigo-600 dark:stroke-indigo-300" strokeWidth="2" />
        {/* dashed guides */}
        <line x1={20} y1={oy + 6} x2={cx} y2={oy + 6} className="stroke-rose-400" strokeWidth="0.7" strokeDasharray="3 3" />
        <line x1={20} y1={oy - 40} x2={cx} y2={oy - 40} className="stroke-rose-400" strokeWidth="0.7" strokeDasharray="3 3" />
        <text x={24} y={oy + 2} className="fill-rose-600 dark:fill-rose-300" fontSize="9.5">LHL</text>
        <text x={24} y={oy - 44} className="fill-rose-600 dark:fill-rose-300" fontSize="9.5">RHL</text>
        <text x={cx} y={H - 2} className="fill-slate-500" fontSize="9" textAnchor="middle">x = a : LHL ≠ RHL → limit DNE</text>
      </svg>
    </div>
  );
}
