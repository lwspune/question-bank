/**
 * The 36 ordered outcomes of two dice, drawn as a 6 by 6 grid with each cell's sum.
 *
 * Rows are the first die and columns the second, so (2, 5) and (5, 2) are two
 * different cells. Cells whose sum is prime (2, 3, 5, 7 or 11) are shaded: there
 * are 15 of them, which is the worked example of the concept it sits on (AFCAT
 * Probability, "Sums on two dice"), so the picture and the arithmetic match.
 *
 * Why this concept earns the chapter's only diagram: every two-dice question is a
 * count of cells in this grid, and equal sums run along the diagonals, which is
 * where the pattern of 1, 2, 3, 4, 5, 6, 5, 4, 3, 2, 1 ways comes from.
 *
 * Server component, static 2-D.
 */
const PRIMES = new Set([2, 3, 5, 7, 11]);
const FACES = [1, 2, 3, 4, 5, 6];

export default function AfDiceSumGrid() {
  const x0 = 70;
  const y0 = 50;
  const cell = 40;

  return (
    <div className="mx-auto max-w-md rounded-xl border bg-indigo-50/40 p-4 dark:bg-indigo-950/20">
      <svg
        viewBox="0 0 340 330"
        className="w-full"
        role="img"
        aria-label="A six by six grid of the 36 outcomes of two dice. Rows are the first die from 1 to 6 and columns the second die from 1 to 6. Each cell shows the sum of the two numbers. The 15 cells whose sum is a prime number, 2, 3, 5, 7 or 11, are shaded."
      >
        <text x={x0 + 3 * cell} y={22} textAnchor="middle" fontSize="13" className="fill-slate-700 dark:fill-slate-200">
          Second die
        </text>
        <text
          x={20}
          y={y0 + 3 * cell}
          textAnchor="middle"
          fontSize="13"
          transform={`rotate(-90 20 ${y0 + 3 * cell})`}
          className="fill-slate-700 dark:fill-slate-200"
        >
          First die
        </text>

        {FACES.map((f, i) => (
          <g key={`head-${f}`}>
            <text x={x0 + (i + 0.5) * cell} y={y0 - 10} textAnchor="middle" fontSize="12" className="fill-slate-600 dark:fill-slate-300">
              {f}
            </text>
            <text x={x0 - 12} y={y0 + (i + 0.5) * cell + 4} textAnchor="middle" fontSize="12" className="fill-slate-600 dark:fill-slate-300">
              {f}
            </text>
          </g>
        ))}

        {FACES.flatMap((a, r) =>
          FACES.map((b, c) => {
            const sum = a + b;
            const prime = PRIMES.has(sum);
            return (
              <g key={`${a}-${b}`}>
                <rect
                  x={x0 + c * cell}
                  y={y0 + r * cell}
                  width={cell}
                  height={cell}
                  className={
                    prime
                      ? "fill-indigo-500 stroke-white dark:fill-indigo-400 dark:stroke-slate-900"
                      : "fill-white stroke-slate-300 dark:fill-slate-800 dark:stroke-slate-600"
                  }
                  strokeWidth="1.5"
                  fillOpacity={prime ? 0.85 : 1}
                />
                <text
                  x={x0 + (c + 0.5) * cell}
                  y={y0 + (r + 0.5) * cell + 5}
                  textAnchor="middle"
                  fontSize="13"
                  className={prime ? "fill-white" : "fill-slate-700 dark:fill-slate-200"}
                >
                  {sum}
                </text>
              </g>
            );
          })
        )}

        <text x={x0 + 3 * cell} y={y0 + 6 * cell + 24} textAnchor="middle" fontSize="12" className="fill-slate-700 dark:fill-slate-200">
          Shaded: prime sums, 15 of 36 cells
        </text>
      </svg>
    </div>
  );
}
