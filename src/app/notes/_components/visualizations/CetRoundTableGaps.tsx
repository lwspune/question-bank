"use client";

/**
 * Animation: girls apart at a round table (concept cetpc-round-table-and-gaps),
 * drawn with the concept's worked example: 4 boys and 3 girls round a table,
 * no two girls side by side.
 *
 * Fix B₁ to remove the rotations; the other 3 boys sit in 3! = 6 ways. Four
 * boys round a table make 4 gaps (in a row they would make 5). The 3 girls go
 * into 3 of the 4 gaps, in order: ⁴P₃ = 24. Total 6 × 24 = 144. Each person
 * moves from the waiting line to a seat by style.transform. Pinned by
 * tests/notes-w2-16.test.ts.
 */
import StepFigure, { MOTION, svgTransform, type FigureStep } from "./StepFigure";

export const BOYS = 4;
export const GIRLS = 3;

export const factorial = (n: number): number => (n <= 1 ? 1 : n * factorial(n - 1));
export const nPr = (n: number, r: number) => factorial(n) / factorial(n - r);

/** Gaps between n people: n round a table, n + 1 in a row. */
export const gapsRound = (n: number) => n;
export const gapsRow = (n: number) => n + 1;

/** (b − 1)! × ᵇPg: 3! × ⁴P₃ = 6 × 24 = 144. */
export const seatings = (b: number, g: number) => factorial(b - 1) * nPr(gapsRound(b), g);

export const RT_STEPS: readonly FigureStep[] = [
  {
    title: "Fix one boy",
    caption: "Turning everyone round the table gives the same seating, so fix B₁ at the top. That removes the rotations.",
  },
  {
    title: "Seat the other boys",
    caption: "B₂, B₃ and B₄ fill the other three boy seats in 3! = 6 ways. This is (n − 1)! for the 4 boys.",
  },
  {
    title: "Count the gaps",
    caption: "Round a table, 4 boys make 4 gaps, not 5: the two end gaps of a row join into one.",
  },
  {
    title: "Girls into different gaps",
    caption: "Each girl takes her own gap, so no two girls sit together. 3 girls into 4 gaps, order counted: ⁴P₃ = 24.",
  },
  {
    title: "Multiply",
    caption: "Boys 6 ways, then girls 24 ways for each: 6 × 24 = 144 seatings.",
  },
];

// Drawing (viewBox units): the table centre and the seat circle's radius.
export const TABLE = { cx: 96, cy: 108, seat: 64, top: 44 } as const;

/** A seat at angle θ (degrees, clockwise from the top). */
export function seatAt(deg: number): { x: number; y: number } {
  const t = (deg * Math.PI) / 180;
  return { x: Math.round((TABLE.cx + TABLE.seat * Math.sin(t)) * 100) / 100, y: Math.round((TABLE.cy - TABLE.seat * Math.cos(t)) * 100) / 100 };
}

/** Boys sit at 0°, 90°, 180°, 270°; the gaps are halfway between. */
export const BOY_DEG = [0, 90, 180, 270] as const;
export const GAP_DEG = [45, 135, 225, 315] as const;
/** The gaps the girls take in the seating drawn (one of the 24 ways). */
export const GIRL_GAPS = [0, 1, 2] as const;

const SUB = ["₁", "₂", "₃", "₄"];

/** Where boy i (0 = B₁) is at a step: B₁ is fixed; the others wait until step 1. */
export function boyAt(i: number, step: number): { x: number; y: number } {
  if (i === 0 || step >= 1) return seatAt(BOY_DEG[i]);
  return { x: 186 + i * 28, y: 30 };
}

/** Where girl j is at a step: waiting until step 3, then in her gap. */
export function girlAt(j: number, step: number): { x: number; y: number } {
  if (step >= 3) return seatAt(GAP_DEG[GIRL_GAPS[j]]);
  return { x: 214 + j * 28, y: 62 };
}

export default function CetRoundTableGaps() {
  return (
    <StepFigure
      title="Animation · a round table, with the girls in the gaps"
      label="Four boys round a table with B₁ fixed at the top and B₂, B₃, B₄ in the other seats: 3! = 6 ways. They make 4 gaps. Three girls go into 3 different gaps: ⁴P₃ = 24 ways. Total 6 × 24 = 144."
      viewBox="0 0 320 206"
      steps={RT_STEPS}
      note="4 boys and 3 girls round a table, no two girls next to each other."
    >
      {(step) => (
        <g>
          {/* The table */}
          <circle cx={TABLE.cx} cy={TABLE.cy} r={TABLE.top} className="fill-amber-500/15 stroke-amber-700 dark:fill-amber-400/15 dark:stroke-amber-300" strokeWidth={1.5} />
          <text x={TABLE.cx} y={TABLE.cy + 4} textAnchor="middle" className="fill-muted-foreground text-[10px]">
            table
          </text>

          {/* The gaps */}
          {GAP_DEG.map((d, g) => {
            const p = seatAt(d);
            return (
              <g key={d} className={MOTION} style={{ opacity: step >= 2 ? 1 : 0 }}>
                <circle cx={p.x} cy={p.y} r={10} fill="none" strokeDasharray="3 2" strokeWidth={1.2} className="stroke-emerald-600 dark:stroke-emerald-400" />
                <text
                  x={p.x + (p.x > TABLE.cx ? 14 : -14)}
                  y={p.y + (p.y > TABLE.cy ? 14 : -8)}
                  textAnchor={p.x > TABLE.cx ? "start" : "end"}
                  className="fill-emerald-700 text-[9px] font-semibold dark:fill-emerald-300"
                >
                  gap {g + 1}
                </text>
              </g>
            );
          })}

          {/* Fixed marker */}
          <text x={TABLE.cx + 16} y={TABLE.cy - TABLE.seat - 2} className="fill-sky-700 text-[9px] font-semibold dark:fill-sky-300">
            fixed
          </text>

          {/* The boys */}
          {BOY_DEG.map((_, i) => (
            <g key={`b${i}`} className={MOTION} style={{ transform: svgTransform(boyAt(i, step)) }}>
              <circle cx={0} cy={0} r={11} strokeWidth={1.2} className="fill-sky-200 stroke-sky-700 dark:fill-sky-900 dark:stroke-sky-300" />
              <text x={0} y={4} textAnchor="middle" className="fill-foreground text-[10px] font-semibold">
                B{SUB[i]}
              </text>
            </g>
          ))}

          {/* The girls */}
          {GIRL_GAPS.map((_, j) => (
            <g key={`g${j}`} className={MOTION} style={{ transform: svgTransform(girlAt(j, step)) }}>
              <circle cx={0} cy={0} r={11} strokeWidth={1.2} className="fill-rose-200 stroke-rose-700 dark:fill-rose-900 dark:stroke-rose-300" />
              <text x={0} y={4} textAnchor="middle" className="fill-foreground text-[10px] font-semibold">
                G{SUB[j]}
              </text>
            </g>
          ))}

          {/* The count */}
          <g className="text-[11px] tabular-nums">
            <text x={186} y={98} className={`fill-sky-700 font-semibold dark:fill-sky-300 ${MOTION}`} style={{ opacity: step >= 1 ? 1 : 0 }}>
              Boys: 3! = {factorial(BOYS - 1)}
            </text>
            <text x={186} y={118} className={`fill-emerald-700 font-semibold dark:fill-emerald-300 ${MOTION}`} style={{ opacity: step >= 2 ? 1 : 0 }}>
              4 boys, {gapsRound(BOYS)} gaps
            </text>
            <text x={186} y={133} className={`fill-muted-foreground text-[10px] ${MOTION}`} style={{ opacity: step >= 2 ? 1 : 0 }}>
              (in a row: {gapsRow(BOYS)} gaps)
            </text>
            <text x={186} y={154} className={`fill-rose-700 font-semibold dark:fill-rose-300 ${MOTION}`} style={{ opacity: step >= 3 ? 1 : 0 }}>
              Girls: ⁴P₃ = {nPr(gapsRound(BOYS), GIRLS)}
            </text>
            <text x={186} y={180} className={`fill-foreground font-semibold ${MOTION}`} style={{ opacity: step >= 4 ? 1 : 0 }}>
              6 × 24 = {seatings(BOYS, GIRLS)}
            </text>
          </g>
        </g>
      )}
    </StepFigure>
  );
}
