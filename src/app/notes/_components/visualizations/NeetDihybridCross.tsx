"use client";

/**
 * Animation: Mendel's dihybrid cross, in the NEET concept's own terms
 * (nbopi-dihybrid).
 *
 * Round yellow (RRYY) crossed with wrinkled green (rryy) gives an F1 that is
 * all round yellow (RrYy). Selfing the F1: the two pairs of alleles separate
 * independently, so RrYy makes four kinds of gamete, RY, Ry, rY and ry, one
 * quarter each, and the 4 x 4 Punnett square gives 9 round yellow, 3 round
 * green, 3 wrinkled yellow and 1 wrinkled green. Counted one character at a
 * time the F2 is still 3 : 1.
 *
 * Both traps of the concept are kept: the 9 : 3 : 3 : 1 appears only in the
 * F2 (the F1 row says all round yellow), and there are four gametes, not two.
 * The cross is computed, not typed, and pinned by tests/notes-w2-06.test.ts.
 * Nothing moves except by opacity.
 */
import StepFigure, { MOTION, type FigureStep } from "./StepFigure";

export const DIHYBRID_STEPS: readonly FigureStep[] = [
  {
    title: "The parents",
    caption: "Mendel crossed true-breeding round yellow peas (RRYY) with wrinkled green peas (rryy).",
  },
  {
    title: "F1: all round yellow",
    caption: "Every F1 plant is RrYy, and round yellow. The F1 plants are then selfed.",
  },
  {
    title: "Four kinds of gamete",
    caption:
      "Segregation of one pair of alleles is independent of the other pair, so RrYy makes four kinds of gamete, RY, Ry, rY and ry, each one quarter.",
  },
  {
    title: "Sixteen equal boxes",
    caption: "Each of the four gametes of one parent can meet each of the four of the other: a Punnett square of 16 equally likely boxes.",
  },
  {
    title: "The F2 ratio",
    caption:
      "Round yellow, round green, wrinkled yellow and wrinkled green come out 9 : 3 : 3 : 1. Seed shape alone is 12 round to 4 wrinkled, still 3 : 1.",
  },
];

export const PARENTS = { round: "RRYY", wrinkled: "rryy" } as const;

/** The four gametes of RrYy, in the concept's order. */
export const GAMETES = ["RY", "Ry", "rY", "ry"] as const;

export type Phenotype = "round yellow" | "round green" | "wrinkled yellow" | "wrinkled green";

/** Join two gametes into a genotype, dominant allele first in each pair: RY + ry is RrYy. */
export function cross(a: string, b: string): string {
  const pair = (x: string, y: string) => [x, y].sort((p, q) => (p === p.toUpperCase() ? -1 : 0) - (q === q.toUpperCase() ? -1 : 0)).join("");
  return pair(a[0], b[0]) + pair(a[1], b[1]);
}

export function phenotype(genotype: string): Phenotype {
  const shape = genotype.includes("R") ? "round" : "wrinkled";
  const colour = genotype.includes("Y") ? "yellow" : "green";
  return `${shape} ${colour}` as Phenotype;
}

/** The F1 of the parents' cross: each parent makes one kind of gamete. */
export function f1(): string {
  return cross(PARENTS.round[0] + PARENTS.round[2], PARENTS.wrinkled[0] + PARENTS.wrinkled[2]);
}

/** The 16 boxes, row gamete by column gamete. */
export function punnett(): string[][] {
  return GAMETES.map((r) => GAMETES.map((c) => cross(r, c)));
}

export function tally(): Record<Phenotype, number> {
  const t: Record<Phenotype, number> = { "round yellow": 0, "round green": 0, "wrinkled yellow": 0, "wrinkled green": 0 };
  for (const row of punnett()) for (const g of row) t[phenotype(g)] += 1;
  return t;
}

export const GRID = { x0: 72, y0: 96, w: 56, h: 28 } as const;

const FILL: Record<Phenotype, string> = {
  "round yellow": "fill-yellow-300 dark:fill-yellow-600/60",
  "wrinkled yellow": "fill-yellow-100 dark:fill-yellow-900/40",
  "round green": "fill-green-400 dark:fill-green-600/60",
  "wrinkled green": "fill-green-100 dark:fill-green-900/40",
};

const LEGEND: readonly { p: Phenotype; x: number; y: number }[] = [
  { p: "round yellow", x: 24, y: 232 },
  { p: "round green", x: 172, y: 232 },
  { p: "wrinkled yellow", x: 24, y: 250 },
  { p: "wrinkled green", x: 172, y: 250 },
];

export default function NeetDihybridCross() {
  const grid = punnett();
  const t = tally();
  return (
    <StepFigure
      title="Animation · the dihybrid cross"
      label="Round yellow RRYY crossed with wrinkled green rryy gives an F1 of round yellow RrYy. Its four gametes RY, Ry, rY and ry fill a 16-box Punnett square: 9 round yellow, 3 round green, 3 wrinkled yellow and 1 wrinkled green"
      viewBox="0 0 320 296"
      steps={DIHYBRID_STEPS}
      note="R: round, r: wrinkled. Y: yellow, y: green. Any box with an R is round; any box with a Y is yellow."
    >
      {(step) => (
        <g>
          <text x={160} y={18} textAnchor="middle" className="fill-foreground text-[11px] font-semibold">
            P: RRYY round yellow × rryy wrinkled green
          </text>
          <text
            x={160}
            y={38}
            textAnchor="middle"
            className={`fill-foreground text-[11px] font-semibold ${MOTION}`}
            style={{ opacity: step >= 1 ? 1 : 0 }}
          >
            {`F1: ${f1()}, all round yellow; selfed`}
          </text>

          <g className={MOTION} style={{ opacity: step >= 2 ? 1 : 0 }}>
            <text x={160} y={66} textAnchor="middle" className="fill-muted-foreground text-[10px]">
              F1 gametes, one quarter each
            </text>
            {GAMETES.map((g, i) => (
              <text
                key={`c-${g}`}
                x={GRID.x0 + GRID.w * (i + 0.5)}
                y={GRID.y0 - 8}
                textAnchor="middle"
                className="fill-violet-700 text-[11px] font-bold dark:fill-violet-300"
              >
                {g}
              </text>
            ))}
            {GAMETES.map((g, i) => (
              <text
                key={`r-${g}`}
                x={GRID.x0 - 16}
                y={GRID.y0 + GRID.h * (i + 0.5) + 4}
                textAnchor="middle"
                className="fill-violet-700 text-[11px] font-bold dark:fill-violet-300"
              >
                {g}
              </text>
            ))}
            {grid.map((row, r) =>
              row.map((_, c) => (
                <rect
                  key={`o-${r}-${c}`}
                  x={GRID.x0 + c * GRID.w}
                  y={GRID.y0 + r * GRID.h}
                  width={GRID.w}
                  height={GRID.h}
                  className="fill-background stroke-border"
                  strokeWidth={1}
                />
              )),
            )}
          </g>

          {grid.map((row, r) =>
            row.map((g, c) => (
              <g key={`g-${r}-${c}`}>
                <rect
                  x={GRID.x0 + c * GRID.w + 1}
                  y={GRID.y0 + r * GRID.h + 1}
                  width={GRID.w - 2}
                  height={GRID.h - 2}
                  className={`${FILL[phenotype(g)]} ${MOTION}`}
                  style={{ opacity: step >= 4 ? 1 : 0 }}
                />
                <text
                  x={GRID.x0 + c * GRID.w + GRID.w / 2}
                  y={GRID.y0 + r * GRID.h + 18}
                  textAnchor="middle"
                  className={`fill-foreground text-[11px] font-semibold ${MOTION}`}
                  style={{ opacity: step >= 3 ? 1 : 0 }}
                >
                  {g}
                </text>
              </g>
            )),
          )}

          <g className={MOTION} style={{ opacity: step >= 4 ? 1 : 0 }}>
            {LEGEND.map((l) => (
              <g key={l.p}>
                <rect x={l.x} y={l.y - 10} width={14} height={12} className={`${FILL[l.p]} stroke-border`} strokeWidth={1} />
                <text x={l.x + 20} y={l.y} className="fill-foreground text-[10.5px]">
                  {`${t[l.p]} ${l.p}`}
                </text>
              </g>
            ))}
            <text x={160} y={276} textAnchor="middle" className="fill-foreground text-[11px] font-bold">
              {`F2: ${t["round yellow"]} : ${t["round green"]} : ${t["wrinkled yellow"]} : ${t["wrinkled green"]}`}
            </text>
            <text x={160} y={292} textAnchor="middle" className="fill-muted-foreground text-[10px]">
              {`Shape alone: ${t["round yellow"] + t["round green"]} round to ${t["wrinkled yellow"] + t["wrinkled green"]} wrinkled, 3 : 1`}
            </text>
          </g>
        </g>
      )}
    </StepFigure>
  );
}
