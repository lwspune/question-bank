/**
 * Static figure: a vector's magnitude as the hypotenuse of the right triangle
 * formed by its components — |v| = √(x² + y²).
 *
 * Pedagogical aim: magnitude is just Pythagoras on the components (and the same
 * idea with three legs in 3-D). Server component — no client state.
 */

const OX = 56;
const OY = 176;
const U = 28; // px per unit
const VX = 4;
const VY = 3;

const tip: [number, number] = [OX + VX * U, OY - VY * U];
const corner: [number, number] = [OX + VX * U, OY];

export default function MagnitudeRightTriangle() {
  return (
    <div className="rounded-lg border border-indigo-200 bg-indigo-50/30 dark:border-indigo-900/60 dark:bg-indigo-950/15 p-4 max-w-md mx-auto">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-indigo-700 dark:text-indigo-300">
        Diagram · magnitude = √(x² + y²)
      </p>

      <svg viewBox="0 0 320 210" className="block w-full h-auto max-w-[320px] mx-auto" role="img" aria-label="A vector as the hypotenuse of the right triangle of its components">
        <defs>
          <marker id="mg-v" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M0,0 L10,5 L0,10 z" className="fill-indigo-600 dark:fill-indigo-400" />
          </marker>
        </defs>

        {/* axes */}
        <line x1={OX} y1={OY} x2={290} y2={OY} stroke="currentColor" className="text-muted-foreground/40" />
        <line x1={OX} y1={OY} x2={OX} y2={28} stroke="currentColor" className="text-muted-foreground/40" />

        {/* legs */}
        <line x1={OX} y1={OY} x2={corner[0]} y2={corner[1]} stroke="currentColor" className="text-sky-600 dark:text-sky-400" strokeWidth={2} />
        <line x1={corner[0]} y1={corner[1]} x2={tip[0]} y2={tip[1]} stroke="currentColor" className="text-amber-600 dark:text-amber-400" strokeWidth={2} />

        {/* right-angle marker */}
        <path d={`M${corner[0] - 10},${corner[1]} L${corner[0] - 10},${corner[1] - 10} L${corner[0]},${corner[1] - 10}`} fill="none" stroke="currentColor" className="text-muted-foreground/60" strokeWidth={1} />

        {/* vector (hypotenuse) */}
        <line x1={OX} y1={OY} x2={tip[0]} y2={tip[1]} stroke="currentColor" className="text-indigo-600 dark:text-indigo-400" strokeWidth={2.5} markerEnd="url(#mg-v)" />

        <text x={(OX + corner[0]) / 2} y={OY + 16} textAnchor="middle" className="fill-sky-700 dark:fill-sky-300 text-[11px] font-semibold">x = 4</text>
        <text x={corner[0] + 8} y={(corner[1] + tip[1]) / 2} className="fill-amber-700 dark:fill-amber-300 text-[11px] font-semibold">y = 3</text>
        <text x={(OX + tip[0]) / 2 - 16} y={(OY + tip[1]) / 2 - 6} className="fill-indigo-700 dark:fill-indigo-300 text-[11px] font-semibold">|v| = 5</text>
        <circle cx={OX} cy={OY} r={3} className="fill-foreground" />
      </svg>

      <p className="mt-2 text-xs text-muted-foreground">
        The components x and y are the legs of a right triangle; the vector is the hypotenuse, so
        |v| = √(x² + y²) = √(16 + 9) = 5. In 3-D the same idea adds a third leg: |v| = √(x² + y² + z²).
      </p>
    </div>
  );
}
