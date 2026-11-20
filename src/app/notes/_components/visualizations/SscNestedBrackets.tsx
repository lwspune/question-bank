"use client";

/**
 * Animation: removing nested brackets from the inside out (concept
 * sscsibo-brackets), with the concept's worked example
 * 40 − [12 + {18 − (9 − 4)}]. Innermost first: 9 − 4 = 5, then the curly
 * bracket 18 − 5 = 13, then the square bracket 12 + 13 = 25, then outside
 * 40 − 25 = 15. Each finished bracket becomes one number for the bracket
 * around it. Rows fade in by opacity. Pinned by tests/notes-w2-04.test.ts.
 */
import StepFigure, { MOTION, type FigureStep } from "./StepFigure";

/** One line of working: the text before, the part worked now, the text after, and its result. */
export type BracketRow = { kind: string; before: string; work: string; after: string; a: number; op: "+" | "−"; b: number };

export const BRACKET_ROWS: readonly BracketRow[] = [
  { kind: "( )", before: "40 − [12 + {18 − ", work: "(9 − 4)", after: "}]", a: 9, op: "−", b: 4 },
  { kind: "{ }", before: "40 − [12 + ", work: "{18 − 5}", after: "]", a: 18, op: "−", b: 5 },
  { kind: "[ ]", before: "40 − ", work: "[12 + 13]", after: "", a: 12, op: "+", b: 13 },
  { kind: "outside", before: "", work: "40 − 25", after: "", a: 40, op: "−", b: 25 },
];

export const rowValue = (r: { a: number; op: "+" | "−"; b: number }) => (r.op === "+" ? r.a + r.b : r.a - r.b);
export const ANSWER = rowValue(BRACKET_ROWS[BRACKET_ROWS.length - 1]);

export const BRACKET_STEPS: readonly FigureStep[] = [
  { title: "Innermost bracket ( )", caption: "( ) sits inside the others and needs nothing else: 9 − 4 = 5." },
  { title: "Curly bracket { }", caption: "The ( ) is now the number 5: 18 − 5 = 13." },
  { title: "Square bracket [ ]", caption: "The { } is now 13: 12 + 13 = 25." },
  { title: "Outside", caption: "Only the outside is left: 40 − 25 = 15." },
];

// Geometry (viewBox units).
export const ROW_Y0 = 36;
export const ROW_GAP = 40;
export const EXPR_X = 70;

export default function SscNestedBrackets() {
  const last = BRACKET_STEPS.length - 1;
  return (
    <StepFigure
      title="Animation · nested brackets, from the inside out"
      label="40 minus square bracket 12 plus curly bracket 18 minus round bracket 9 minus 4. Innermost first: 9 minus 4 is 5, then 18 minus 5 is 13, then 12 plus 13 is 25, then 40 minus 25 is 15."
      viewBox="0 0 320 210"
      steps={BRACKET_STEPS}
      note="Open ( ) first, then { }, then [ ]. Each finished bracket becomes one number."
    >
      {(step) => (
        <g>
          {BRACKET_ROWS.map((r, i) => {
            const y = ROW_Y0 + i * ROW_GAP;
            return (
              <g key={i} className={MOTION} style={{ opacity: step >= i ? 1 : 0 }}>
                <text x={8} y={y} className="fill-muted-foreground text-[10px]">
                  {r.kind}
                </text>
                <text x={EXPR_X} y={y} className="fill-foreground text-[13px] tabular-nums">
                  {r.before}
                  <tspan className="fill-amber-700 font-bold dark:fill-amber-300">{r.work}</tspan>
                  {r.after}
                </text>
                <text x={EXPR_X + 12} y={y + 16} className="fill-emerald-700 text-[11px] font-semibold tabular-nums dark:fill-emerald-300">
                  {`${r.a} ${r.op} ${r.b} = ${rowValue(r)}`}
                </text>
              </g>
            );
          })}
          <text
            x={EXPR_X}
            y={ROW_Y0 + BRACKET_ROWS.length * ROW_GAP + 4}
            className={`fill-indigo-700 text-[14px] font-semibold dark:fill-indigo-300 ${MOTION}`}
            style={{ opacity: step === last ? 1 : 0 }}
          >
            {`= ${ANSWER}`}
          </text>
        </g>
      )}
    </StepFigure>
  );
}
