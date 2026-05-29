/**
 * Static figure: position vectors a = OA, b = OB from the origin, and the
 * displacement AB = b − a from A to B.
 *
 * Pedagogical aim: position vectors locate points from a chosen origin; the
 * displacement between two points is the difference of their position vectors
 * and doesn't depend on where the origin sits. Server component.
 */

const O: [number, number] = [50, 205];
const A: [number, number] = [160, 78];
const B: [number, number] = [300, 150];

export default function PositionDisplacementVectors() {
  return (
    <div className="rounded-lg border border-indigo-200 bg-indigo-50/30 dark:border-indigo-900/60 dark:bg-indigo-950/15 p-4 max-w-md mx-auto">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-indigo-700 dark:text-indigo-300">
        Diagram · position vectors &amp; displacement
      </p>

      <svg viewBox="0 0 360 230" className="block w-full h-auto" role="img" aria-label="Position vectors to two points and the displacement between them">
        <defs>
          <marker id="pv-sky" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M0,0 L10,5 L0,10 z" className="fill-sky-600 dark:fill-sky-400" />
          </marker>
          <marker id="pv-amber" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M0,0 L10,5 L0,10 z" className="fill-amber-600 dark:fill-amber-400" />
          </marker>
          <marker id="pv-indigo" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M0,0 L10,5 L0,10 z" className="fill-indigo-600 dark:fill-indigo-400" />
          </marker>
        </defs>

        <line x1={O[0]} y1={O[1]} x2={A[0]} y2={A[1]} stroke="currentColor" className="text-sky-600 dark:text-sky-400" strokeWidth={2} markerEnd="url(#pv-sky)" />
        <line x1={O[0]} y1={O[1]} x2={B[0]} y2={B[1]} stroke="currentColor" className="text-amber-600 dark:text-amber-400" strokeWidth={2} markerEnd="url(#pv-amber)" />
        <line x1={A[0]} y1={A[1]} x2={B[0]} y2={B[1]} stroke="currentColor" className="text-indigo-600 dark:text-indigo-400" strokeWidth={2.5} markerEnd="url(#pv-indigo)" />

        <circle cx={O[0]} cy={O[1]} r={3.5} className="fill-foreground" />
        <circle cx={A[0]} cy={A[1]} r={3.5} className="fill-foreground" />
        <circle cx={B[0]} cy={B[1]} r={3.5} className="fill-foreground" />
        <text x={O[0] - 6} y={O[1] + 12} textAnchor="end" className="fill-foreground text-[11px] font-semibold">O</text>
        <text x={A[0] - 4} y={A[1] - 8} textAnchor="middle" className="fill-foreground text-[11px] font-semibold">A</text>
        <text x={B[0] + 10} y={B[1] + 4} className="fill-foreground text-[11px] font-semibold">B</text>

        <text x={(O[0] + A[0]) / 2 - 10} y={(O[1] + A[1]) / 2} className="fill-sky-700 dark:fill-sky-300 text-[12px] font-semibold">a</text>
        <text x={(O[0] + B[0]) / 2} y={(O[1] + B[1]) / 2 + 16} className="fill-amber-700 dark:fill-amber-300 text-[12px] font-semibold">b</text>
        <text x={(A[0] + B[0]) / 2} y={(A[1] + B[1]) / 2 - 8} textAnchor="middle" className="fill-indigo-700 dark:fill-indigo-300 text-[12px] font-semibold">b − a</text>
      </svg>

      <p className="mt-2 text-xs text-muted-foreground">
        From the origin O, the position vectors <span className="font-medium text-sky-700 dark:text-sky-300">a</span>{" "}
        and <span className="font-medium text-amber-700 dark:text-amber-300">b</span> locate points A and B. The
        displacement from A to B is <span className="font-medium text-indigo-700 dark:text-indigo-300">AB = b − a</span>{" "}
        — move it anywhere and shift the origin: the difference, and so AB, is unchanged.
      </p>
    </div>
  );
}
