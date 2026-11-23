/**
 * Static figure: counting the squares in a 3 by 3 grid one size at a time
 * (concept sscrfcsq-grid, its worked example). 9 single cells, 4 blocks of
 * 2 by 2 (one starting in each of the top-left four cells), and 1 square the
 * size of the grid: 9 + 4 + 1 = 14, which is 1² + 2² + 3².
 * Server component. Pinned by tests/notes-w2-08.test.ts.
 */

/** The grid of the worked example. */
export const N = 3;

/** How many k by k squares an n by n grid holds. */
export const squaresOfSize = (n: number, k: number) => (n - k + 1) ** 2;

/** All squares of every size. */
export const totalSquares = (n: number) => Array.from({ length: n }, (_, i) => squaresOfSize(n, i + 1)).reduce((a, b) => a + b, 0);

/** The top-left cell (row, column) of each 2 by 2 block, as drawn. */
export const TWO_BY_TWO_STARTS: readonly (readonly [number, number])[] = [
  [0, 0],
  [0, 1],
  [1, 0],
  [1, 1],
];

const FILL = "fill-sky-200 stroke-sky-600 dark:fill-sky-900 dark:stroke-sky-400";

function Grid({ x, y, cell }: { x: number; y: number; cell: number }) {
  const lines = [];
  for (let i = 0; i <= N; i++) {
    lines.push(<line key={`h${i}`} x1={x} y1={y + i * cell} x2={x + N * cell} y2={y + i * cell} className="stroke-foreground" strokeWidth={1} />);
    lines.push(<line key={`v${i}`} x1={x + i * cell} y1={y} x2={x + i * cell} y2={y + N * cell} className="stroke-foreground" strokeWidth={1} />);
  }
  return <g>{lines}</g>;
}

export default function SscGridSquares() {
  const big = 22; // cell size of the large grids
  const small = 11; // cell size of the four small grids
  return (
    <div className="mx-auto max-w-md rounded-lg border border-indigo-200 bg-indigo-50/30 p-4 dark:border-indigo-900/60 dark:bg-indigo-950/15">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-indigo-700 dark:text-indigo-300">
        Diagram · count one size of square at a time
      </p>
      <svg
        viewBox="0 0 320 150"
        className="block h-auto w-full"
        role="img"
        aria-label="A 3 by 3 grid counted one size at a time. Left: all 9 single cells shaded, 9 squares of 1 by 1. Middle: four copies of the grid, each with a different 2 by 2 block shaded, starting in each of the top-left four cells, 4 squares of 2 by 2. Right: the whole grid outlined, 1 square of 3 by 3. Total 9 plus 4 plus 1 is 14."
      >
        {/* 1 by 1: every cell */}
        <g>
          {Array.from({ length: N * N }, (_, k) => (
            <rect key={k} x={16 + (k % N) * big + 2} y={22 + Math.floor(k / N) * big + 2} width={big - 4} height={big - 4} rx={2} className={FILL} />
          ))}
          <Grid x={16} y={22} cell={big} />
          <text x={16 + (N * big) / 2} y={108} textAnchor="middle" className="fill-foreground text-[11px] font-semibold">
            1 by 1: {squaresOfSize(N, 1)}
          </text>
        </g>

        <text x={100} y={60} textAnchor="middle" className="fill-muted-foreground text-[14px]">
          +
        </text>

        {/* 2 by 2: four small copies, one block each */}
        {TWO_BY_TWO_STARTS.map(([r, c], k) => {
          const gx = 120 + (k % 2) * (N * small + 8);
          const gy = 22 + Math.floor(k / 2) * (N * small + 8);
          return (
            <g key={k}>
              <rect x={gx + c * small} y={gy + r * small} width={2 * small} height={2 * small} className={FILL} strokeWidth={1.5} />
              <Grid x={gx} y={gy} cell={small} />
            </g>
          );
        })}
        <text x={120 + N * small + 4} y={108} textAnchor="middle" className="fill-foreground text-[11px] font-semibold">
          2 by 2: {squaresOfSize(N, 2)}
        </text>

        <text x={220} y={60} textAnchor="middle" className="fill-muted-foreground text-[14px]">
          +
        </text>

        {/* 3 by 3: the whole grid */}
        <g>
          <rect x={238} y={22} width={N * big} height={N * big} className={FILL} strokeWidth={2} />
          <Grid x={238} y={22} cell={big} />
          <text x={238 + (N * big) / 2} y={108} textAnchor="middle" className="fill-foreground text-[11px] font-semibold">
            3 by 3: {squaresOfSize(N, 3)}
          </text>
        </g>

        <text x={160} y={136} textAnchor="middle" className="fill-emerald-700 text-[12px] font-semibold dark:fill-emerald-300">
          9 + 4 + 1 = {totalSquares(N)} squares
        </text>
      </svg>
    </div>
  );
}
