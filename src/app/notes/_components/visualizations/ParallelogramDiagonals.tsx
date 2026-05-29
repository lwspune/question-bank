/**
 * Static figure: a parallelogram on sides a and b, with the two diagonals
 * a + b (corner to opposite corner) and a − b (between the side tips).
 *
 * Pedagogical aim: the sum of the side vectors is one diagonal and their
 * difference is the other — the identity behind most parallelogram problems.
 * Server component — no client state.
 */

const O: [number, number] = [70, 196];
const A: [number, number] = [250, 168]; // O + a
const B: [number, number] = [128, 70]; // O + b
const C: [number, number] = [A[0] + B[0] - O[0], A[1] + B[1] - O[1]]; // O + a + b

export default function ParallelogramDiagonals() {
  return (
    <div className="rounded-lg border border-indigo-200 bg-indigo-50/30 dark:border-indigo-900/60 dark:bg-indigo-950/15 p-4 max-w-md mx-auto">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-indigo-700 dark:text-indigo-300">
        Diagram · parallelogram diagonals = a + b and a − b
      </p>

      <svg viewBox="0 0 360 240" className="block w-full h-auto" role="img" aria-label="Parallelogram on vectors a and b with its two diagonals">
        <defs>
          <marker id="pd-sky" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M0,0 L10,5 L0,10 z" className="fill-sky-600 dark:fill-sky-400" />
          </marker>
          <marker id="pd-amber" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M0,0 L10,5 L0,10 z" className="fill-amber-600 dark:fill-amber-400" />
          </marker>
          <marker id="pd-indigo" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M0,0 L10,5 L0,10 z" className="fill-indigo-600 dark:fill-indigo-400" />
          </marker>
          <marker id="pd-emerald" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M0,0 L10,5 L0,10 z" className="fill-emerald-600 dark:fill-emerald-400" />
          </marker>
        </defs>

        <polygon points={`${O[0]},${O[1]} ${A[0]},${A[1]} ${C[0]},${C[1]} ${B[0]},${B[1]}`} className="fill-indigo-500/10 stroke-indigo-400/40" strokeWidth={1} />

        {/* opposite sides (faint, to complete the parallelogram) */}
        <line x1={A[0]} y1={A[1]} x2={C[0]} y2={C[1]} stroke="currentColor" className="text-amber-500/40" strokeWidth={1.5} />
        <line x1={B[0]} y1={B[1]} x2={C[0]} y2={C[1]} stroke="currentColor" className="text-sky-500/40" strokeWidth={1.5} />

        {/* diagonals */}
        <line x1={O[0]} y1={O[1]} x2={C[0]} y2={C[1]} stroke="currentColor" className="text-indigo-600 dark:text-indigo-400" strokeWidth={2.5} markerEnd="url(#pd-indigo)" />
        <line x1={B[0]} y1={B[1]} x2={A[0]} y2={A[1]} stroke="currentColor" className="text-emerald-600 dark:text-emerald-400" strokeWidth={2.5} markerEnd="url(#pd-emerald)" />

        {/* side vectors a, b from O */}
        <line x1={O[0]} y1={O[1]} x2={A[0]} y2={A[1]} stroke="currentColor" className="text-sky-600 dark:text-sky-400" strokeWidth={2} markerEnd="url(#pd-sky)" />
        <line x1={O[0]} y1={O[1]} x2={B[0]} y2={B[1]} stroke="currentColor" className="text-amber-600 dark:text-amber-400" strokeWidth={2} markerEnd="url(#pd-amber)" />

        <text x={(O[0] + A[0]) / 2} y={(O[1] + A[1]) / 2 + 16} textAnchor="middle" className="fill-sky-700 dark:fill-sky-300 text-[12px] font-semibold">a</text>
        <text x={(O[0] + B[0]) / 2 - 12} y={(O[1] + B[1]) / 2} textAnchor="middle" className="fill-amber-700 dark:fill-amber-300 text-[12px] font-semibold">b</text>
        <text x={C[0] + 6} y={C[1] - 4} className="fill-indigo-700 dark:fill-indigo-300 text-[12px] font-semibold">a + b</text>
        <text x={(B[0] + A[0]) / 2} y={(B[1] + A[1]) / 2 - 8} textAnchor="middle" className="fill-emerald-700 dark:fill-emerald-300 text-[12px] font-semibold">a − b</text>
      </svg>

      <p className="mt-2 text-xs text-muted-foreground">
        From a shared corner, sides a and b span the parallelogram. The diagonal from that corner is{" "}
        <span className="font-medium text-indigo-700 dark:text-indigo-300">a + b</span>; the diagonal between
        the side tips is <span className="font-medium text-emerald-700 dark:text-emerald-300">a − b</span>.
        They bisect each other, and |a + b|² + |a − b|² = 2(|a|² + |b|²).
      </p>
    </div>
  );
}
