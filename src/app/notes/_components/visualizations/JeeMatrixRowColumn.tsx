"use client";

/**
 * Animation: the row-by-column rule (concept jmat-matrix-multiplication),
 * drawn with the concept's worked example: A = (2 1; 0 3), B = (1 4; 2 1).
 * The inner sizes match (2 = 2), so AB is 2 × 2. Each step lights one row of
 * A and one column of B and fills one entry: 2·1 + 1·2 = 4, 2·4 + 1·1 = 9,
 * 0·1 + 3·2 = 6, 0·4 + 3·1 = 3, so AB = (4 9; 6 3). The row band and the
 * column band move by style.transform. Pinned by tests/notes-w2-04.test.ts.
 */
import StepFigure, { MOTION, svgTransform, type FigureStep } from "./StepFigure";

export const MAT_A = [
  [2, 1],
  [0, 3],
] as const;
export const MAT_B = [
  [1, 4],
  [2, 1],
] as const;

/** (AB)ij = Σk aik·bkj. */
export function matMul(a: readonly (readonly number[])[], b: readonly (readonly number[])[]): number[][] {
  return a.map((row) => b[0].map((_, j) => row.reduce((s, aik, k) => s + aik * b[k][j], 0)));
}

/** The working for one entry, as the concept writes it: "2·1 + 1·2 = 4". */
export function entryWork(i: number, j: number): string {
  const terms = MAT_A[i].map((aik, k) => `${aik}·${MAT_B[k][j]}`);
  return `${terms.join(" + ")} = ${matMul(MAT_A, MAT_B)[i][j]}`;
}

/** The entries in the order the steps fill them (row, column; 0-based). */
export const ENTRY_ORDER = [
  [0, 0],
  [0, 1],
  [1, 0],
  [1, 1],
] as const;

export const MATRIX_STEPS: readonly FigureStep[] = [
  {
    title: "Check the sizes",
    caption: "A is 2 × 2 and B is 2 × 2. The inner sizes match (2 = 2), so AB exists and is 2 × 2.",
  },
  { title: "Row 1 with column 1", caption: "Row 1 of A against column 1 of B, pair by pair, then add: 2·1 + 1·2 = 4." },
  { title: "Row 1 with column 2", caption: "The same row against column 2: 2·4 + 1·1 = 9." },
  { title: "Row 2 with column 1", caption: "Row 2 of A against column 1 of B: 0·1 + 3·2 = 6." },
  { title: "Row 2 with column 2", caption: "Row 2 against column 2: 0·4 + 3·1 = 3." },
  {
    title: "The product",
    caption: "AB = (4 9; 6 3). Every entry is a row of A times a column of B, so the order matters: AB and BA are generally different.",
  },
];

// Geometry (viewBox units).
export const COL_A = [42, 70] as const;
export const COL_B = [136, 164] as const;
export const COL_P = [246, 274] as const;
export const ROW_Y = [56, 80] as const;
const r2 = (n: number) => Math.round(n * 100) / 100;

/** Which entry a step lights (null: none, on the first and last steps). */
export function litEntry(step: number): readonly [number, number] | null {
  if (step < 1 || step > ENTRY_ORDER.length) return null;
  return ENTRY_ORDER[step - 1];
}

function Brackets({ x0, x1 }: { x0: number; x1: number }) {
  const top = ROW_Y[0] - 16;
  const bottom = ROW_Y[1] + 10;
  return (
    <g fill="none" strokeWidth={1.5} className="stroke-foreground">
      <path d={`M ${x0 + 6} ${top} L ${x0} ${top} L ${x0} ${bottom} L ${x0 + 6} ${bottom}`} />
      <path d={`M ${x1 - 6} ${top} L ${x1} ${top} L ${x1} ${bottom} L ${x1 - 6} ${bottom}`} />
    </g>
  );
}

function Entries({ m, cols, className }: { m: readonly (readonly number[])[]; cols: readonly number[]; className: string }) {
  return (
    <g className={className}>
      {m.map((row, i) =>
        row.map((v, j) => (
          <text key={`${i}-${j}`} x={cols[j]} y={ROW_Y[i]} textAnchor="middle" className="text-[13px] tabular-nums">
            {v}
          </text>
        )),
      )}
    </g>
  );
}

export default function JeeMatrixRowColumn() {
  const product = matMul(MAT_A, MAT_B);
  const last = MATRIX_STEPS.length - 1;

  return (
    <StepFigure
      title="Animation · the row by column rule, entry by entry"
      label="A equals 2, 1 over 0, 3 and B equals 1, 4 over 2, 1. Each entry of AB is a row of A times a column of B: 2 times 1 plus 1 times 2 is 4, 2 times 4 plus 1 times 1 is 9, 0 times 1 plus 3 times 2 is 6, 0 times 4 plus 3 times 1 is 3. So AB is 4, 9 over 6, 3."
      viewBox="0 0 320 200"
      steps={MATRIX_STEPS}
      note="(AB)ij is row i of A times column j of B: multiply pair by pair, then add."
    >
      {(step) => {
        const lit = litEntry(step);
        const on = lit ? 1 : 0;
        const [li, lj] = lit ?? [0, 0];
        return (
          <g>
            {/* Row band over A and column band over B */}
            <rect
              x={-14}
              y={-14}
              width={COL_A[1] - COL_A[0] + 28}
              height={20}
              rx={4}
              className={`fill-sky-500/25 dark:fill-sky-400/25 ${MOTION}`}
              style={{ opacity: on, transform: svgTransform({ x: COL_A[0], y: ROW_Y[li] }) }}
            />
            <rect
              x={-12}
              y={ROW_Y[0] - 18}
              width={24}
              height={ROW_Y[1] - ROW_Y[0] + 26}
              rx={4}
              className={`fill-amber-400/30 dark:fill-amber-300/25 ${MOTION}`}
              style={{ opacity: on, transform: svgTransform({ x: COL_B[lj], y: 0 }) }}
            />
            <rect
              x={-13}
              y={-15}
              width={26}
              height={22}
              rx={4}
              className={`fill-emerald-500/25 dark:fill-emerald-400/25 ${MOTION}`}
              style={{ opacity: on, transform: svgTransform({ x: COL_P[lj], y: ROW_Y[li] }) }}
            />

            {/* Names and sizes */}
            <g className="fill-muted-foreground text-[11px]">
              <text x={(COL_A[0] + COL_A[1]) / 2} y={22} textAnchor="middle" className="fill-foreground font-semibold">
                A
              </text>
              <text x={(COL_B[0] + COL_B[1]) / 2} y={22} textAnchor="middle" className="fill-foreground font-semibold">
                B
              </text>
              <text x={(COL_P[0] + COL_P[1]) / 2} y={22} textAnchor="middle" className="fill-foreground font-semibold">
                AB
              </text>
              <text x={(COL_A[0] + COL_A[1]) / 2} y={110} textAnchor="middle">
                2 × 2
              </text>
              <text x={(COL_B[0] + COL_B[1]) / 2} y={110} textAnchor="middle">
                2 × 2
              </text>
              <text x={(COL_P[0] + COL_P[1]) / 2} y={110} textAnchor="middle">
                2 × 2
              </text>
            </g>

            <Brackets x0={COL_A[0] - 18} x1={COL_A[1] + 18} />
            <Brackets x0={COL_B[0] - 18} x1={COL_B[1] + 18} />
            <Brackets x0={COL_P[0] - 18} x1={COL_P[1] + 18} />
            <Entries m={MAT_A} cols={COL_A} className="fill-foreground" />
            <Entries m={MAT_B} cols={COL_B} className="fill-foreground" />
            <text x={(COL_A[1] + COL_B[0]) / 2} y={r2((ROW_Y[0] + ROW_Y[1]) / 2)} textAnchor="middle" className="fill-foreground text-[13px]">
              ×
            </text>
            <text x={(COL_B[1] + COL_P[0]) / 2} y={r2((ROW_Y[0] + ROW_Y[1]) / 2)} textAnchor="middle" className="fill-foreground text-[13px]">
              =
            </text>

            {/* The product's entries, filled one per step */}
            {ENTRY_ORDER.map(([i, j], k) => (
              <text
                key={`p-${i}-${j}`}
                x={COL_P[j]}
                y={ROW_Y[i]}
                textAnchor="middle"
                className={`fill-emerald-700 text-[13px] font-semibold tabular-nums dark:fill-emerald-300 ${MOTION}`}
                style={{ opacity: step > k ? 1 : 0 }}
              >
                {product[i][j]}
              </text>
            ))}

            {/* The working, one line per entry */}
            {ENTRY_ORDER.map(([i, j], k) => (
              <text
                key={`w-${i}-${j}`}
                x={60}
                y={132 + k * 16}
                className={`text-[11px] tabular-nums ${lit && lit[0] === i && lit[1] === j ? "fill-foreground font-semibold" : "fill-muted-foreground"} ${MOTION}`}
                style={{ opacity: step > k ? 1 : 0 }}
              >
                {`row ${i + 1}, column ${j + 1}:  ${entryWork(i, j)}`}
              </text>
            ))}
            <text
              x={60}
              y={196}
              className={`fill-foreground text-[10px] ${MOTION}`}
              style={{ opacity: step === 0 || step === last ? 1 : 0 }}
            >
              inner sizes match: 2 = 2, so AB is 2 × 2
            </text>
          </g>
        );
      }}
    </StepFigure>
  );
}
