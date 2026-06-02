/**
 * Bar-magnet field lines — closed loops that leave the N pole, curve around
 * OUTSIDE to the S pole, and continue S→N THROUGH the magnet (so lines exist
 * inside it). Arrows show the external N→S direction; lines never cross.
 *
 * Server component — static 2-D.
 */
export default function BarMagnetFieldLines() {
  const cx = 280;
  const cy = 150;
  const magW = 150;
  const magH = 44;
  const left = cx - magW / 2; // S end
  const right = cx + magW / 2; // N end
  const top = cy - magH / 2;
  const bot = cy + magH / 2;

  // external field-line loops at increasing reach (top + mirrored bottom)
  const reaches = [34, 66, 100];

  return (
    <div className="mx-auto max-w-md rounded-xl border bg-indigo-50/40 p-4 dark:bg-indigo-950/20">
      <svg
        viewBox="0 0 560 300"
        className="w-full"
        role="img"
        aria-label="Bar magnet with closed magnetic field lines leaving the north pole and curving outside to the south pole"
      >
        <defs>
          <marker id="bm-arrow" markerWidth="10" markerHeight="10" refX="5" refY="3" orient="auto">
            <path d="M0,0 L0,6 L8,3 z" className="fill-indigo-600 dark:fill-indigo-400" />
          </marker>
        </defs>

        {/* external loops — emerge at N (right), return to S (left) */}
        {reaches.map((r) => (
          <g key={r}>
            {/* top arc: N end up and over to S end */}
            <path
              d={`M ${right - 6} ${top + 6} C ${right + r} ${cy - r}, ${left - r} ${cy - r}, ${left + 6} ${top + 6}`}
              className="fill-none stroke-indigo-500/70"
              strokeWidth="1.6"
              markerMid="url(#bm-arrow)"
            />
            {/* arrowhead near the top of the arc, pointing N→S (leftward) */}
            <line x1={cx + 2} y1={cy - r + 2} x2={cx - 2} y2={cy - r + 2} className="stroke-indigo-600 dark:stroke-indigo-400" strokeWidth="2" markerEnd="url(#bm-arrow)" />
            {/* bottom arc (mirror) */}
            <path
              d={`M ${right - 6} ${bot - 6} C ${right + r} ${cy + r}, ${left - r} ${cy + r}, ${left + 6} ${bot - 6}`}
              className="fill-none stroke-indigo-500/70"
              strokeWidth="1.6"
            />
            <line x1={cx + 2} y1={cy + r - 2} x2={cx - 2} y2={cy + r - 2} className="stroke-indigo-600 dark:stroke-indigo-400" strokeWidth="2" markerEnd="url(#bm-arrow)" />
          </g>
        ))}

        {/* the magnet: S (left, blue) + N (right, red) */}
        <rect x={left} y={top} width={magW / 2} height={magH} className="fill-sky-500/30 stroke-sky-700 dark:stroke-sky-300" strokeWidth="2" />
        <rect x={cx} y={top} width={magW / 2} height={magH} className="fill-rose-500/30 stroke-rose-700 dark:stroke-rose-300" strokeWidth="2" />
        <text x={(left + cx) / 2} y={cy + 6} textAnchor="middle" fontSize="20" fontWeight="700" className="fill-sky-700 dark:fill-sky-300">S</text>
        <text x={(cx + right) / 2} y={cy + 6} textAnchor="middle" fontSize="20" fontWeight="700" className="fill-rose-700 dark:fill-rose-300">N</text>

        {/* internal line (S→N through the magnet) */}
        <line x1={left + 14} y1={cy} x2={right - 14} y2={cy} className="stroke-indigo-400/70" strokeWidth="1.6" strokeDasharray="5 3" markerEnd="url(#bm-arrow)" />

        <text x={cx} y={290} textAnchor="middle" fontSize="12" className="fill-indigo-900 dark:fill-indigo-100">Lines run N → S outside, S → N inside — closed loops</text>
      </svg>
      <p className="mt-2 text-center text-xs text-muted-foreground">
        Field lines are closed curves: outside the magnet they point from N to S;
        inside they continue from S back to N. They never cross.
      </p>
    </div>
  );
}
