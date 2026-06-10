/**
 * Newton's third law — two bodies A and B in contact, each pushing on the other
 * with equal-magnitude, opposite-direction forces. The pair acts on DIFFERENT
 * bodies (one on A, one on B), which is exactly why they never cancel.
 *
 * Server component — static 2-D.
 */
export default function LmfActionReactionPair() {
  const cy = 150;
  const ax = 190; // body A centre
  const bx = 370; // body B centre
  const r = 38;

  return (
    <div className="mx-auto max-w-md rounded-xl border bg-indigo-50/40 p-4 dark:bg-indigo-950/20">
      <svg
        viewBox="0 0 560 300"
        className="w-full"
        role="img"
        aria-label="Newton's third law: body A pushes body B to the right, body B pushes body A to the left, with equal force"
      >
        <defs>
          <marker id="arp-arrow" markerWidth="10" markerHeight="10" refX="5" refY="3" orient="auto">
            <path d="M0,0 L0,6 L8,3 z" className="fill-indigo-600 dark:fill-indigo-400" />
          </marker>
        </defs>

        {/* body A */}
        <circle cx={ax} cy={cy} r={r} className="fill-sky-500/25 stroke-sky-700 dark:stroke-sky-300" strokeWidth="2" />
        <text x={ax} y={cy + 6} textAnchor="middle" fontSize="22" fontWeight="700" className="fill-sky-700 dark:fill-sky-300">A</text>

        {/* body B */}
        <circle cx={bx} cy={cy} r={r} className="fill-rose-500/25 stroke-rose-700 dark:stroke-rose-300" strokeWidth="2" />
        <text x={bx} y={cy + 6} textAnchor="middle" fontSize="22" fontWeight="700" className="fill-rose-700 dark:fill-rose-300">B</text>

        {/* contact point */}
        <line x1={(ax + bx) / 2} y1={cy - 50} x2={(ax + bx) / 2} y2={cy + 50} className="stroke-muted-foreground/50" strokeWidth="1" strokeDasharray="3 3" />

        {/* action: A on B, pushing B to the right (arrow starts at contact, points right onto B) */}
        <line x1={(ax + bx) / 2 + 4} y1={cy - 70} x2={bx + r + 18} y2={cy - 70} className="stroke-sky-600 dark:stroke-sky-400" strokeWidth="2.5" markerEnd="url(#arp-arrow)" />
        <text x={bx - 6} y={cy - 78} textAnchor="middle" fontSize="12" fontWeight="600" className="fill-sky-700 dark:fill-sky-300">F (A on B)</text>

        {/* reaction: B on A, pushing A to the left */}
        <line x1={(ax + bx) / 2 - 4} y1={cy + 70} x2={ax - r - 18} y2={cy + 70} className="stroke-rose-600 dark:stroke-rose-400" strokeWidth="2.5" markerEnd="url(#arp-arrow)" />
        <text x={ax + 6} y={cy + 88} textAnchor="middle" fontSize="12" fontWeight="600" className="fill-rose-700 dark:fill-rose-300">F (B on A)</text>

        <text x={280} y={290} textAnchor="middle" fontSize="12" className="fill-indigo-900 dark:fill-indigo-100">
          Equal magnitude, opposite direction — but on DIFFERENT bodies.
        </text>
      </svg>
      <p className="mt-2 text-center text-xs text-muted-foreground">
        The action and reaction are equal and opposite, but they act on two
        different objects (one on B, one on A). That is why they do not cancel
        each other — cancellation needs both forces on the SAME body.
      </p>
    </div>
  );
}
