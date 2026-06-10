/**
 * Resultant of two forces by the parallelogram law. Two forces P and Q act from
 * a common point at angle θ; the diagonal of the parallelogram they span is the
 * resultant R, with magnitude R = sqrt(P^2 + Q^2 + 2PQ cos θ). The chapter's
 * HARD favourite: two EQUAL forces whose resultant equals each one (θ = 120°).
 *
 * Server component — static 2-D.
 */
export default function LmfResultantParallelogram() {
  const ox = 150;
  const oy = 220;
  // P along +x, Q at 60 degrees above, scaled
  const P = 150;
  const Qmag = 150;
  const ang = (60 * Math.PI) / 180;
  const px = ox + P;
  const py = oy;
  const qx = ox + Qmag * Math.cos(ang);
  const qy = oy - Qmag * Math.sin(ang);
  // resultant = P + Q (vector sum), tip of parallelogram
  const rx = px + (qx - ox);
  const ry = py + (qy - oy);

  return (
    <div className="mx-auto max-w-md rounded-xl border bg-indigo-50/40 p-4 dark:bg-indigo-950/20">
      <svg
        viewBox="0 0 560 300"
        className="w-full"
        role="img"
        aria-label="Parallelogram law: two forces P and Q from a point combine into a resultant R along the diagonal"
      >
        <defs>
          <marker id="rp-p" markerWidth="10" markerHeight="10" refX="5" refY="3" orient="auto">
            <path d="M0,0 L0,6 L8,3 z" className="fill-sky-600 dark:fill-sky-400" />
          </marker>
          <marker id="rp-q" markerWidth="10" markerHeight="10" refX="5" refY="3" orient="auto">
            <path d="M0,0 L0,6 L8,3 z" className="fill-emerald-600 dark:fill-emerald-400" />
          </marker>
          <marker id="rp-r" markerWidth="10" markerHeight="10" refX="5" refY="3" orient="auto">
            <path d="M0,0 L0,6 L8,3 z" className="fill-rose-600 dark:fill-rose-400" />
          </marker>
        </defs>

        {/* parallelogram sides (dashed completion) */}
        <line x1={px} y1={py} x2={rx} y2={ry} className="stroke-muted-foreground/50" strokeWidth="1.5" strokeDasharray="4 3" />
        <line x1={qx} y1={qy} x2={rx} y2={ry} className="stroke-muted-foreground/50" strokeWidth="1.5" strokeDasharray="4 3" />

        {/* P */}
        <line x1={ox} y1={oy} x2={px} y2={py} className="stroke-sky-600 dark:stroke-sky-400" strokeWidth="2.5" markerEnd="url(#rp-p)" />
        <text x={(ox + px) / 2} y={oy + 22} textAnchor="middle" fontSize="13" fontWeight="600" className="fill-sky-700 dark:fill-sky-300">P</text>

        {/* Q */}
        <line x1={ox} y1={oy} x2={qx} y2={qy} className="stroke-emerald-600 dark:stroke-emerald-400" strokeWidth="2.5" markerEnd="url(#rp-q)" />
        <text x={qx - 18} y={qy - 4} textAnchor="middle" fontSize="13" fontWeight="600" className="fill-emerald-700 dark:fill-emerald-300">Q</text>

        {/* resultant R */}
        <line x1={ox} y1={oy} x2={rx} y2={ry} className="stroke-rose-600 dark:stroke-rose-400" strokeWidth="3" markerEnd="url(#rp-r)" />
        <text x={rx + 8} y={ry - 4} fontSize="14" fontWeight="700" className="fill-rose-700 dark:fill-rose-300">R</text>

        {/* angle marker */}
        <path d={`M ${ox + 34} ${oy} A 34 34 0 0 0 ${ox + 34 * Math.cos(ang)} ${oy - 34 * Math.sin(ang)}`} className="fill-none stroke-foreground" strokeWidth="1.2" />
        <text x={ox + 44} y={oy - 18} fontSize="12" className="fill-foreground">θ</text>

        <circle cx={ox} cy={oy} r="3" className="fill-foreground" />

        <text x={280} y={285} textAnchor="middle" fontSize="12" className="fill-indigo-900 dark:fill-indigo-100">
          R = sqrt(P² + Q² + 2PQ cos θ) — the diagonal of the parallelogram.
        </text>
      </svg>
      <p className="mt-2 text-center text-xs text-muted-foreground">
        Two forces from a common point combine along the diagonal of the
        parallelogram they span. The magnitude is R = sqrt(P² + Q² + 2PQ cos θ);
        the resultant is largest at θ = 0 (P + Q) and smallest at θ = 180 (P - Q).
      </p>
    </div>
  );
}
