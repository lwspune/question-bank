/**
 * Static figure: a letter-cluster series read column by column (concept
 * sscrsecl-own). The concept's worked example: BZM, EXN, HVO, ? The first
 * column B, E, H (2, 5, 8) goes +3, the second Z, X, V (26, 24, 22) goes −2,
 * the third M, N, O goes +1, so the next cluster is K, T, P = KTP.
 * Server component. Pinned by tests/notes-w2-18.test.ts.
 */

/** The worked example's clusters, then the answer. */
export const CLUSTERS = ["BZM", "EXN", "HVO"] as const;
export const ANSWER = "KTP";

/** A1 to Z26. */
export const pos = (letter: string) => letter.charCodeAt(0) - 64;
export const letterAt = (n: number) => String.fromCharCode(64 + (((n - 1) % 26) + 26) % 26 + 1);

/** The step of column c, read from the first two clusters. */
export const columnStep = (rows: readonly string[], c: number) => pos(rows[1][c]) - pos(rows[0][c]);
/** The next cluster: every column moves on by its own step. */
export const nextCluster = (rows: readonly string[]) =>
  Array.from(rows[0], (_, c) => letterAt(pos(rows[rows.length - 1][c]) + columnStep(rows, c))).join("");

export const STEPS = [0, 1, 2].map((c) => columnStep(CLUSTERS, c));
export const ROWS = [...CLUSTERS, ANSWER];

// Geometry (viewBox units).
export const COL_X = [118, 188, 258] as const;
export const ROW_Y = [62, 100, 138, 186] as const;

const COL_TEXT = [
  "fill-sky-700 dark:fill-sky-300",
  "fill-rose-700 dark:fill-rose-300",
  "fill-emerald-700 dark:fill-emerald-300",
] as const;

const stepText = (s: number) => (s > 0 ? `+${s}` : `−${-s}`);

export default function SscClusterColumns() {
  return (
    <div className="mx-auto max-w-md rounded-lg border border-indigo-200 bg-indigo-50/30 p-4 dark:border-indigo-900/60 dark:bg-indigo-950/15">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-indigo-700 dark:text-indigo-300">
        Diagram · each column has its own step
      </p>
      <svg
        viewBox="0 0 320 236"
        className="block h-auto w-full"
        role="img"
        aria-label="The clusters BZM, EXN and HVO written one under another, with each letter's position under it. The first column B, E, H is 2, 5, 8 and goes up by 3. The second column Z, X, V is 26, 24, 22 and goes down by 2. The third column M, N, O goes up by 1. So the next cluster is K, T, P: KTP."
      >
        {/* Step written above each column */}
        {STEPS.map((s, c) => (
          <text key={c} x={COL_X[c]} y={26} textAnchor="middle" className={`text-[12px] font-semibold ${COL_TEXT[c]}`}>
            {stepText(s)}
          </text>
        ))}
        <text x={30} y={26} className="fill-muted-foreground text-[10px]">
          step
        </text>
        <line x1={30} y1={36} x2={290} y2={36} strokeWidth={1} className="stroke-border" />

        {/* The answer row */}
        <rect x={26} y={ROW_Y[3] - 18} width={268} height={36} rx={6} className="fill-emerald-100/80 dark:fill-emerald-950/60" />

        {ROWS.map((word, r) => (
          <g key={word}>
            <text x={30} y={ROW_Y[r]} className={r === 3 ? "fill-emerald-800 text-[11px] font-semibold dark:fill-emerald-200" : "fill-muted-foreground text-[11px]"}>
              {r === 3 ? "next" : word}
            </text>
            {Array.from(word, (ch, c) => (
              <g key={c}>
                <text x={COL_X[c]} y={ROW_Y[r]} textAnchor="middle" className="fill-foreground text-[12px] font-bold">
                  {ch}
                </text>
                <text x={COL_X[c]} y={ROW_Y[r] + 12} textAnchor="middle" className="fill-muted-foreground text-[10px]">
                  {pos(ch)}
                </text>
              </g>
            ))}
          </g>
        ))}

        {/* The step between rows, in each column */}
        {[0, 1, 2].map((gapRow) =>
          STEPS.map((s, c) => (
            <text
              key={`${gapRow}-${c}`}
              x={COL_X[c] + 22}
              y={(ROW_Y[gapRow] + ROW_Y[gapRow + 1]) / 2 + 2}
              className={`text-[10px] ${COL_TEXT[c]}`}
            >
              {stepText(s)}
            </text>
          )),
        )}

        <text x={160} y={222} textAnchor="middle" className="fill-foreground text-[10.5px] font-semibold">
          11 = K, 20 = T, 16 = P, so the answer is KTP
        </text>
      </svg>
      <p className="mt-2 text-xs text-muted-foreground">
        Write the step above each column before any letter of the answer. The first column goes forward 3, the second goes back
        2 and the third forward 1: copying the first column&apos;s step to the others is the usual wrong option.
      </p>
    </div>
  );
}
