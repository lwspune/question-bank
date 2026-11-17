/**
 * Static figure: shortest routes on a street grid, from the IMAT concept
 * imat-spa-grid-paths. Its self-check: the school is 3 blocks east and 2 blocks
 * north of Marco's house. Every corner is labelled with its number of shortest
 * routes from the house, found by adding the number from the left and the
 * number from below (Pascal style). The school's 10 equals C(5, 2), the
 * concept's formula.
 *
 * The grid numbers are exported and pinned by
 * tests/notes-imat-visuals-logic.test.ts. Server component, no client state.
 */

export const EAST = 3;
export const NORTH = 2;

/** C(a, b). */
export function choose(a: number, b: number): number {
  let r = 1;
  for (let i = 1; i <= b; i++) r = (r * (a - b + i)) / i;
  return r;
}

/**
 * Routes to every corner, indexed [north][east], built by the adding rule:
 * a corner on the bottom row or left column has 1 route; any other corner has
 * (routes from the left) + (routes from below).
 */
export function routeGrid(east: number, north: number): number[][] {
  const g: number[][] = [];
  for (let j = 0; j <= north; j++) {
    g.push([]);
    for (let i = 0; i <= east; i++) g[j].push(i === 0 || j === 0 ? 1 : g[j][i - 1] + g[j - 1][i]);
  }
  return g;
}

const BLOCK_X = 72;
const BLOCK_Y = 62;
const X0 = 58;
const Y0 = 172;
const px = (i: number) => X0 + i * BLOCK_X;
const py = (j: number) => Y0 - j * BLOCK_Y;

export default function ImatGridRoutes() {
  const g = routeGrid(EAST, NORTH);
  const total = g[NORTH][EAST];
  const fromLeft = g[NORTH][EAST - 1];
  const fromBelow = g[NORTH - 1][EAST];
  return (
    <div className="mx-auto max-w-md rounded-lg border border-indigo-200 bg-indigo-50/30 p-4 dark:border-indigo-900/60 dark:bg-indigo-950/15">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-indigo-700 dark:text-indigo-300">
        Diagram · counting shortest routes on a grid
      </p>
      <svg
        viewBox="0 0 320 215"
        className="block h-auto w-full"
        role="img"
        aria-label={`A street grid 3 blocks east and 2 blocks north. Each corner shows its number of shortest routes from the house: bottom row 1 1 1 1, middle row 1 2 3 4, top row 1 3 6 10. The school at the far corner has ${total} routes, ${fromLeft} from the left plus ${fromBelow} from below.`}
      >
        <defs>
          <marker id="imat-grid-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M0,0 L10,5 L0,10 z" className="fill-rose-600 dark:fill-rose-400" />
          </marker>
        </defs>

        {/* Streets. */}
        {Array.from({ length: NORTH + 1 }, (_, j) => (
          <line key={`h${j}`} x1={px(0)} y1={py(j)} x2={px(EAST)} y2={py(j)} className="stroke-slate-400 dark:stroke-slate-500" strokeWidth={3} strokeLinecap="round" />
        ))}
        {Array.from({ length: EAST + 1 }, (_, i) => (
          <line key={`v${i}`} x1={px(i)} y1={py(0)} x2={px(i)} y2={py(NORTH)} className="stroke-slate-400 dark:stroke-slate-500" strokeWidth={3} strokeLinecap="round" />
        ))}

        {/* The last addition: from the left and from below into the school. */}
        <line x1={px(EAST - 1) + 14} y1={py(NORTH)} x2={px(EAST) - 15} y2={py(NORTH)} className="stroke-rose-600 dark:stroke-rose-400" strokeWidth={2} markerEnd="url(#imat-grid-arrow)" />
        <line x1={px(EAST)} y1={py(NORTH - 1) - 14} x2={px(EAST)} y2={py(NORTH) + 15} className="stroke-rose-600 dark:stroke-rose-400" strokeWidth={2} markerEnd="url(#imat-grid-arrow)" />

        {/* Corners with their route counts. */}
        {g.flatMap((row, j) =>
          row.map((v, i) => {
            const end = i === EAST && j === NORTH;
            const start = i === 0 && j === 0;
            return (
              <g key={`${i}-${j}`}>
                <circle
                  cx={px(i)}
                  cy={py(j)}
                  r={end ? 14 : 12}
                  className={
                    end
                      ? "fill-rose-100 stroke-rose-600 dark:fill-rose-950 dark:stroke-rose-400"
                      : start
                        ? "fill-emerald-100 stroke-emerald-600 dark:fill-emerald-950 dark:stroke-emerald-400"
                        : "fill-background stroke-indigo-500 dark:stroke-indigo-300"
                  }
                  strokeWidth={1.5}
                />
                <text x={px(i)} y={py(j) + 4} textAnchor="middle" className="fill-foreground text-[12px] font-semibold tabular-nums">
                  {v}
                </text>
              </g>
            );
          }),
        )}

        <text x={px(0)} y={py(0) + 28} textAnchor="middle" className="fill-emerald-700 text-[11px] font-semibold dark:fill-emerald-300">
          House
        </text>
        <text x={px(EAST) + 16} y={20} textAnchor="end" className="fill-rose-700 text-[11px] font-semibold dark:fill-rose-300">
          School: {fromLeft} + {fromBelow} = {total}
        </text>
        <text x={(px(EAST - 1) + px(EAST)) / 2} y={py(NORTH) - 8} textAnchor="middle" className="fill-rose-700 text-[10px] dark:fill-rose-300">
          left
        </text>
        <text x={px(EAST) + 8} y={(py(NORTH) + py(NORTH - 1)) / 2 + 4} textAnchor="start" className="fill-rose-700 text-[10px] dark:fill-rose-300">
          below
        </text>
        <text x={px(EAST)} y={py(0) + 28} textAnchor="middle" className="fill-muted-foreground text-[10px]">
          3 blocks east →
        </text>
        <text x={22} y={py(1) - 4} textAnchor="middle" className="fill-muted-foreground text-[10px]">
          2 blocks
        </text>
        <text x={22} y={py(1) + 9} textAnchor="middle" className="fill-muted-foreground text-[10px]">
          north ↑
        </text>
      </svg>
      <p className="mt-2 text-xs text-muted-foreground">
        Each corner adds the corner to its left and the corner below it, because the last move into it is either east
        or north. Corners on the bottom row or left column have only 1 route. The school gets 6 + 4 = 10, which is
        C(5, 2): choose which 2 of the 5 moves are north.
      </p>
    </div>
  );
}
