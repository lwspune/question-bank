/**
 * Free-body diagram of a block resting on a horizontal surface with an applied
 * horizontal pull. Four force arrows from the block's centre: weight (mg) down,
 * normal (N) up, applied (F) right, friction (f) left. Shows that vertical
 * forces balance (N = mg) while the net horizontal force F - f drives motion.
 *
 * Server component — static 2-D.
 */
export default function LmfFreeBodyDiagram() {
  const cx = 280;
  const cy = 150;
  const half = 34; // half block size

  return (
    <div className="mx-auto max-w-md rounded-xl border bg-indigo-50/40 p-4 dark:bg-indigo-950/20">
      <svg
        viewBox="0 0 560 300"
        className="w-full"
        role="img"
        aria-label="Free-body diagram of a block on a surface: weight down, normal force up, applied force right, friction left"
      >
        <defs>
          <marker id="fbd-arrow" markerWidth="10" markerHeight="10" refX="5" refY="3" orient="auto">
            <path d="M0,0 L0,6 L8,3 z" className="fill-indigo-600 dark:fill-indigo-400" />
          </marker>
        </defs>

        {/* ground */}
        <line x1={60} y1={cy + half} x2={500} y2={cy + half} className="stroke-foreground" strokeWidth="2" />
        {[80, 130, 180, 230, 380, 430, 480].map((x) => (
          <line key={x} x1={x} y1={cy + half} x2={x - 12} y2={cy + half + 12} className="stroke-muted-foreground" strokeWidth="1.5" />
        ))}

        {/* the block */}
        <rect
          x={cx - half}
          y={cy - half}
          width={half * 2}
          height={half * 2}
          rx="4"
          className="fill-indigo-500/25 stroke-indigo-700 dark:stroke-indigo-300"
          strokeWidth="2"
        />
        <text x={cx} y={cy - half - 8} textAnchor="middle" fontSize="12" className="fill-indigo-900 dark:fill-indigo-100">mass m</text>

        {/* weight mg — down */}
        <line x1={cx} y1={cy} x2={cx} y2={cy + 95} className="stroke-rose-600 dark:stroke-rose-400" strokeWidth="2.5" markerEnd="url(#fbd-arrow)" />
        <text x={cx + 8} y={cy + 95} fontSize="13" fontWeight="600" className="fill-rose-700 dark:fill-rose-300">mg (weight)</text>

        {/* normal N — up */}
        <line x1={cx} y1={cy} x2={cx} y2={cy - 95} className="stroke-emerald-600 dark:stroke-emerald-400" strokeWidth="2.5" markerEnd="url(#fbd-arrow)" />
        <text x={cx + 8} y={cy - 90} fontSize="13" fontWeight="600" className="fill-emerald-700 dark:fill-emerald-300">N (normal)</text>

        {/* applied F — right */}
        <line x1={cx} y1={cy} x2={cx + 110} y2={cy} className="stroke-sky-600 dark:stroke-sky-400" strokeWidth="2.5" markerEnd="url(#fbd-arrow)" />
        <text x={cx + 60} y={cy - 8} fontSize="13" fontWeight="600" className="fill-sky-700 dark:fill-sky-300">F (applied)</text>

        {/* friction f — left */}
        <line x1={cx} y1={cy} x2={cx - 80} y2={cy} className="stroke-amber-600 dark:stroke-amber-400" strokeWidth="2.5" markerEnd="url(#fbd-arrow)" />
        <text x={cx - 150} y={cy - 8} fontSize="13" fontWeight="600" className="fill-amber-700 dark:fill-amber-300">f (friction)</text>

        <circle cx={cx} cy={cy} r="3" className="fill-foreground" />

        <text x={cx} y={290} textAnchor="middle" fontSize="12" className="fill-indigo-900 dark:fill-indigo-100">
          Vertical: N = mg. Horizontal net: F minus f drives the block.
        </text>
      </svg>
      <p className="mt-2 text-center text-xs text-muted-foreground">
        Draw every force acting ON the block as an arrow from its centre. The
        vertical pair (N up, mg down) cancels on flat ground; the net horizontal
        force F minus f gives the acceleration via F-net = ma.
      </p>
    </div>
  );
}
