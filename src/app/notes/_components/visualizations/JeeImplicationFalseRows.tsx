"use client";

/**
 * Animation: counting the rows where an implication is true (concept
 * jmr-false-case), with the concept's worked example (p → q) → (p ∧ r).
 * It is false only where p → q is true and p ∧ r is false. The rows with
 * p = F give 4 false rows; with p = T only q = T, r = F does, 1 more. So
 * 5 of the 8 rows are false and 8 − 5 = 3 are true. Rows light up by
 * opacity. Pinned by tests/notes-w2-04.test.ts.
 */
import StepFigure, { MOTION, type FigureStep } from "./StepFigure";

export type Row = { p: boolean; q: boolean; r: boolean };

/** The 8 rows in the usual order: p, q, r each T before F. */
export const ROWS: readonly Row[] = [true, false].flatMap((p) => [true, false].flatMap((q) => [true, false].map((r) => ({ p, q, r }))));

export const implies = (a: boolean, b: boolean) => !a || b;
export const pToQ = (w: Row) => implies(w.p, w.q);
export const pAndR = (w: Row) => w.p && w.r;
export const whole = (w: Row) => implies(pToQ(w), pAndR(w));

export const FALSE_ROWS = ROWS.map((w, i) => (whole(w) ? -1 : i)).filter((i) => i >= 0);
export const TRUE_COUNT = ROWS.length - FALSE_ROWS.length;

export const IMPLICATION_STEPS: readonly FigureStep[] = [
  {
    title: "Eight rows",
    caption: "Three letters give 2³ = 8 rows. The whole statement is false only where p → q is true and p ∧ r is false.",
  },
  {
    title: "The rows with p false",
    caption: "When p = F, p → q is true and p ∧ r is false in all four rows: 4 false rows.",
  },
  {
    title: "The rows with p true",
    caption: "When p = T, p → q needs q = T and p ∧ r false needs r = F: one more false row, p = T, q = T, r = F.",
  },
  {
    title: "Count",
    caption: "False rows: 4 + 1 = 5. True rows: 8 − 5 = 3.",
  },
];

/** Which rows a step marks as false (the result column shows F there). */
export function falseShown(step: number, i: number): boolean {
  const w = ROWS[i];
  if (whole(w)) return false;
  if (step >= 2) return true;
  return step === 1 && !w.p;
}

/** The rows a step is looking at (the shaded band). */
export function focusRows(step: number): number[] {
  if (step === 1) return ROWS.map((w, i) => (w.p ? -1 : i)).filter((i) => i >= 0);
  if (step === 2) return ROWS.map((w, i) => (w.p ? i : -1)).filter((i) => i >= 0);
  return [];
}

// Geometry (viewBox units).
export const COLS = { p: 26, q: 50, r: 74, pq: 120, pr: 172, all: 254 } as const;
export const HEAD_Y = 22;
export const ROW0_Y = 44;
export const ROW_H = 17;
const tf = (b: boolean) => (b ? "T" : "F");

export default function JeeImplicationFalseRows() {
  const last = IMPLICATION_STEPS.length - 1;
  return (
    <StepFigure
      title="Animation · where an implication is false, row by row"
      label="Truth table of (p implies q) implies (p and r) over 8 rows. It is false only where p implies q is true and p and r is false: all 4 rows with p false, and the row p true, q true, r false. 5 false rows, so 3 true rows."
      viewBox="0 0 320 204"
      steps={IMPLICATION_STEPS}
      note="An implication A → B is false only at A = T, B = F."
    >
      {(step) => {
        const focus = focusRows(step);
        return (
          <g>
            {/* Row bands */}
            {ROWS.map((w, i) => {
              const y = ROW0_Y + i * ROW_H;
              const isFalse = falseShown(step, i);
              return (
                <g key={`band-${i}`}>
                  <rect
                    x={10}
                    y={y - 12}
                    width={300}
                    height={ROW_H - 1}
                    rx={3}
                    className={`fill-sky-500/15 dark:fill-sky-400/15 ${MOTION}`}
                    style={{ opacity: focus.includes(i) ? 1 : 0 }}
                  />
                  <rect
                    x={COLS.all - 26}
                    y={y - 12}
                    width={52}
                    height={ROW_H - 1}
                    rx={3}
                    className={`fill-rose-500/25 dark:fill-rose-400/25 ${MOTION}`}
                    style={{ opacity: isFalse ? 1 : 0 }}
                  />
                </g>
              );
            })}

            {/* Header */}
            <g className="fill-foreground text-[10.5px] font-semibold">
              <text x={COLS.p} y={HEAD_Y} textAnchor="middle">p</text>
              <text x={COLS.q} y={HEAD_Y} textAnchor="middle">q</text>
              <text x={COLS.r} y={HEAD_Y} textAnchor="middle">r</text>
              <text x={COLS.pq} y={HEAD_Y} textAnchor="middle">p → q</text>
              <text x={COLS.pr} y={HEAD_Y} textAnchor="middle">p ∧ r</text>
              <text x={COLS.all} y={HEAD_Y} textAnchor="middle">(p → q) → (p ∧ r)</text>
            </g>
            <line x1={10} y1={HEAD_Y + 8} x2={310} y2={HEAD_Y + 8} className="stroke-border" />
            <line x1={92} y1={HEAD_Y - 10} x2={92} y2={ROW0_Y + 7 * ROW_H + 6} className="stroke-border" />

            {/* Rows */}
            {ROWS.map((w, i) => {
              const y = ROW0_Y + i * ROW_H;
              const isFalse = falseShown(step, i);
              const trueShown = step === last && whole(w);
              return (
                <g key={`row-${i}`} className="text-[11px] tabular-nums">
                  <text x={COLS.p} y={y} textAnchor="middle" className="fill-foreground">{tf(w.p)}</text>
                  <text x={COLS.q} y={y} textAnchor="middle" className="fill-foreground">{tf(w.q)}</text>
                  <text x={COLS.r} y={y} textAnchor="middle" className="fill-foreground">{tf(w.r)}</text>
                  <text x={COLS.pq} y={y} textAnchor="middle" className="fill-muted-foreground">{tf(pToQ(w))}</text>
                  <text x={COLS.pr} y={y} textAnchor="middle" className="fill-muted-foreground">{tf(pAndR(w))}</text>
                  <text
                    x={COLS.all}
                    y={y}
                    textAnchor="middle"
                    className={`fill-rose-700 font-semibold dark:fill-rose-300 ${MOTION}`}
                    style={{ opacity: isFalse ? 1 : 0 }}
                  >
                    F
                  </text>
                  <text
                    x={COLS.all}
                    y={y}
                    textAnchor="middle"
                    className={`fill-emerald-700 font-semibold dark:fill-emerald-300 ${MOTION}`}
                    style={{ opacity: trueShown ? 1 : 0 }}
                  >
                    T
                  </text>
                </g>
              );
            })}

            <text
              x={160}
              y={ROW0_Y + 8 * ROW_H + 10}
              textAnchor="middle"
              className={`fill-indigo-700 text-[11px] font-semibold dark:fill-indigo-300 ${MOTION}`}
              style={{ opacity: step === last ? 1 : 0 }}
            >
              {`false: ${FALSE_ROWS.length} rows · true: 8 − ${FALSE_ROWS.length} = ${TRUE_COUNT} rows`}
            </text>
          </g>
        );
      }}
    </StepFigure>
  );
}
