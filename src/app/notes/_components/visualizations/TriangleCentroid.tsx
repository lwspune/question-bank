/**
 * Static figure: triangle ABC with the directed loop A→B→C→A (closed loop = 0),
 * its three medians, and the centroid G = (a + b + c)/3 where they meet.
 *
 * Pedagogical aim: tie the closed-loop identity AB + BC + CA = 0 and the
 * centroid-as-average-of-position-vectors fact to one picture.
 * Server component — no client state.
 */

const A: [number, number] = [78, 54];
const B: [number, number] = [44, 198];
const C: [number, number] = [286, 176];
const G: [number, number] = [(A[0] + B[0] + C[0]) / 3, (A[1] + B[1] + C[1]) / 3];
const mid = (p: [number, number], q: [number, number]): [number, number] => [(p[0] + q[0]) / 2, (p[1] + q[1]) / 2];
const Mbc = mid(B, C);
const Mca = mid(C, A);
const Mab = mid(A, B);

export default function TriangleCentroid() {
  return (
    <div className="rounded-lg border border-indigo-200 bg-indigo-50/30 dark:border-indigo-900/60 dark:bg-indigo-950/15 p-4 max-w-md mx-auto">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-indigo-700 dark:text-indigo-300">
        Diagram · closed loop &amp; centroid
      </p>

      <svg viewBox="0 0 360 230" className="block w-full h-auto" role="img" aria-label="Triangle with directed edges forming a closed loop and its centroid at the intersection of the medians">
        <defs>
          <marker id="tc-loop" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto">
            <path d="M0,0 L10,5 L0,10 z" className="fill-sky-600 dark:fill-sky-400" />
          </marker>
        </defs>

        {/* medians (faint) */}
        <line x1={A[0]} y1={A[1]} x2={Mbc[0]} y2={Mbc[1]} stroke="currentColor" className="text-muted-foreground/40" strokeWidth={1} strokeDasharray="3 2" />
        <line x1={B[0]} y1={B[1]} x2={Mca[0]} y2={Mca[1]} stroke="currentColor" className="text-muted-foreground/40" strokeWidth={1} strokeDasharray="3 2" />
        <line x1={C[0]} y1={C[1]} x2={Mab[0]} y2={Mab[1]} stroke="currentColor" className="text-muted-foreground/40" strokeWidth={1} strokeDasharray="3 2" />

        {/* directed edges A->B->C->A */}
        <line x1={A[0]} y1={A[1]} x2={B[0]} y2={B[1]} stroke="currentColor" className="text-sky-600 dark:text-sky-400" strokeWidth={2} markerEnd="url(#tc-loop)" />
        <line x1={B[0]} y1={B[1]} x2={C[0]} y2={C[1]} stroke="currentColor" className="text-sky-600 dark:text-sky-400" strokeWidth={2} markerEnd="url(#tc-loop)" />
        <line x1={C[0]} y1={C[1]} x2={A[0]} y2={A[1]} stroke="currentColor" className="text-sky-600 dark:text-sky-400" strokeWidth={2} markerEnd="url(#tc-loop)" />

        {/* centroid */}
        <circle cx={G[0]} cy={G[1]} r={4.5} className="fill-indigo-600 dark:fill-indigo-400" />
        <text x={G[0] + 8} y={G[1] + 4} className="fill-indigo-700 dark:fill-indigo-300 text-[12px] font-semibold">G</text>

        {/* vertices */}
        <circle cx={A[0]} cy={A[1]} r={3.5} className="fill-foreground" />
        <circle cx={B[0]} cy={B[1]} r={3.5} className="fill-foreground" />
        <circle cx={C[0]} cy={C[1]} r={3.5} className="fill-foreground" />
        <text x={A[0] - 4} y={A[1] - 8} textAnchor="middle" className="fill-foreground text-[12px] font-semibold">A</text>
        <text x={B[0] - 10} y={B[1] + 6} textAnchor="middle" className="fill-foreground text-[12px] font-semibold">B</text>
        <text x={C[0] + 12} y={C[1] + 4} textAnchor="middle" className="fill-foreground text-[12px] font-semibold">C</text>
      </svg>

      <p className="mt-2 text-xs text-muted-foreground">
        Walking the edges A→B→C→A returns you to the start, so{" "}
        <span className="font-medium text-foreground">AB + BC + CA = 0</span>. The three medians meet at the
        centroid <span className="font-medium text-indigo-700 dark:text-indigo-300">G = (a + b + c)/3</span>,
        the average of the vertices&apos; position vectors.
      </p>
    </div>
  );
}
