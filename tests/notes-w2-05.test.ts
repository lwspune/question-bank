import { describe, expect, it } from "vitest";
import {
  A as CH_A,
  B as CH_B,
  CHORD_CM,
  DIST_CM,
  M as CH_M,
  O as CH_O,
  PX_PER_CM as CH_PX,
  RADIUS_CM,
  R_PX,
  dist as chDist,
  radiusFrom,
} from "../src/app/notes/_components/visualizations/SscT2ChordDistance";
import {
  AREA as TRAP_AREA,
  BL,
  BR,
  END_BASE,
  HEIGHT as TRAP_H,
  PX_PER_M as TRAP_PX,
  TL,
  TR,
  TRAP,
  dist as trapDist,
  trapArea,
} from "../src/app/notes/_components/visualizations/SscT2Trapezium";
import {
  A as BI_A,
  A_ALONG,
  B as BI_B,
  BD,
  C as BI_C,
  D as BI_D,
  DC,
  SCALE as BI_SCALE,
  SIDES,
  angleAt,
  bdFrom,
  dist as biDist,
} from "../src/app/notes/_components/visualizations/SscT2AngleBisector";
import { SIDE_PX, SQ, UNIT as SQ_UNIT, pieces, squareOfSum } from "../src/app/notes/_components/visualizations/SscT2SquareOfSum";
import {
  LOAN,
  ciMinusSi2,
  interestOnInterest,
  yearOneInterest,
  yearTwoCompound,
} from "../src/app/notes/_components/visualizations/SscT2CiMinusSi";
import {
  A_RATE,
  B_ALONE_DAYS,
  B_RATE,
  CELL_W,
  DONE_TOGETHER,
  LEFT_FOR_B,
  TOTAL as JOB_TOTAL,
  dayEnds,
  lcm,
  unitWorkers,
} from "../src/app/notes/_components/visualizations/SscT2WorkUnits";
import {
  GROUPS,
  combinedAverage,
  combinedCount,
  combinedTotal,
  middleOfAverages,
  vx,
} from "../src/app/notes/_components/visualizations/SscT2CombinedAverage";
import { PANELS, classify, meet } from "../src/app/notes/_components/visualizations/SscT2PairOfLines";
import {
  CAN,
  KEEP,
  REPLACE_STEPS,
  STATES,
  canText,
  milkLeft,
} from "../src/app/notes/_components/visualizations/SscT2MilkReplacement";

// SSC CGL Tier II Maths notes figures, group 05 (scripts/notes/CET_VISUALS_BRIEF.md).
// Each figure draws its concept's own example, so those numbers are pinned here.

describe("ssc-t2-chord-distance (ssc2cich-chords)", () => {
  it("a 16 cm chord 6 cm from the centre gives r = 10 cm", () => {
    expect(CHORD_CM).toBe(16);
    expect(DIST_CM).toBe(6);
    expect(RADIUS_CM).toBe(10);
    // Practice: radius 13, chord 24, distance 5.
    expect(radiusFrom(24, 5)).toBe(13);
  });

  it("is drawn to scale, with the chord's ends on the circle and M its middle", () => {
    expect(R_PX).toBe(10 * CH_PX);
    expect(chDist(CH_O, CH_A)).toBeCloseTo(R_PX, 9);
    expect(chDist(CH_O, CH_B)).toBeCloseTo(R_PX, 9);
    expect(chDist(CH_O, CH_M)).toBe(6 * CH_PX);
    expect(chDist(CH_A, CH_M)).toBe(8 * CH_PX);
    expect(chDist(CH_M, CH_B)).toBe(8 * CH_PX);
    expect(CH_M.x).toBe(CH_O.x); // OM is perpendicular to the horizontal chord
    expect(CH_A.y).toBe(CH_B.y);
  });
});

describe("ssc-t2-trapezium (ssc2qupr-trapezium)", () => {
  it("parallel sides 10 and 22, slant 10: base 6, height 8, area 128", () => {
    expect(TRAP).toEqual({ a: 10, b: 22, slant: 10 });
    expect(END_BASE).toBe(6);
    expect(TRAP_H).toBe(8);
    expect(TRAP_AREA).toBe(128);
    // Practice: parallel sides 9 and 15, 6 apart.
    expect(trapArea(9, 15, 6)).toBe(72);
  });

  it("is drawn to scale", () => {
    expect(trapDist(TL, TR)).toBe(10 * TRAP_PX);
    expect(trapDist(BL, BR)).toBe(22 * TRAP_PX);
    expect(trapDist(BL, TL)).toBeCloseTo(10 * TRAP_PX, 9);
    expect(trapDist(TR, BR)).toBeCloseTo(10 * TRAP_PX, 9);
    expect(BL.y - TL.y).toBe(8 * TRAP_PX);
    expect(TL.x - BL.x).toBe(6 * TRAP_PX);
    expect(BR.x - TR.x).toBe(6 * TRAP_PX);
  });
});

describe("ssc-t2-angle-bisector (ssc2trsi-bisector)", () => {
  it("AB = 9, AC = 6, BC = 10 gives BD = 6 and DC = 4", () => {
    expect(SIDES).toEqual({ AB: 9, AC: 6, BC: 10 });
    expect(BD).toBe(6);
    expect(DC).toBe(4);
    expect(BD / DC).toBeCloseTo(SIDES.AB / SIDES.AC, 9);
    // Practice: AB = 6, AC = 9, BC = 10 gives DC = 6.
    expect(10 - bdFrom(6, 9, 10)).toBe(6);
  });

  it("is drawn to scale, and AD truly halves angle A", () => {
    expect(A_ALONG).toBe(7.25);
    expect(biDist(BI_A, BI_B)).toBeCloseTo(9 * BI_SCALE, 9);
    expect(biDist(BI_A, BI_C)).toBeCloseTo(6 * BI_SCALE, 9);
    expect(biDist(BI_B, BI_C)).toBe(10 * BI_SCALE);
    expect(biDist(BI_B, BI_D)).toBe(6 * BI_SCALE);
    expect(angleAt(BI_A, BI_B, BI_D)).toBeCloseTo(angleAt(BI_A, BI_D, BI_C), 6);
  });
});

describe("ssc-t2-square-of-sum (ssc2aiid-squares)", () => {
  it("a = 3, b = 4: the four pieces make 49, term by term only 25", () => {
    expect(SQ).toEqual({ a: 3, b: 4 });
    const p = pieces(SQ.a, SQ.b);
    expect(p).toEqual({ aa: 9, ab: 12, bb: 16 });
    expect(squareOfSum(SQ.a, SQ.b)).toBe(49);
    expect(p.aa + 2 * p.ab + p.bb).toBe(49);
    expect(p.aa + p.bb).toBe(25);
    expect(squareOfSum(SQ.a, SQ.b) - 2 * p.ab).toBe(25);
    expect(SIDE_PX).toBe(7 * SQ_UNIT);
  });
});

describe("ssc-t2-ci-minus-si (ssc2inci-annual)", () => {
  it("6000 at 10% for 2 years: compound earns 60 more", () => {
    expect(LOAN).toEqual({ P: 6000, R: 10, years: 2 });
    expect(yearOneInterest(6000, 10)).toBe(600);
    expect(yearTwoCompound(6000, 10)).toBe(660);
    expect(interestOnInterest(6000, 10)).toBe(60);
    expect(ciMinusSi2(6000, 10)).toBeCloseTo(60, 9);
    // The trap: 1000 at 10% earns 100, then 110.
    expect(yearTwoCompound(1000, 10)).toBe(110);
  });
});

describe("ssc-t2-work-units (ssc2twwr-units)", () => {
  it("12 and 18 days: 36 units, 3 and 2 a day, B finishes in 8 days", () => {
    expect(lcm(12, 18)).toBe(36);
    expect(JOB_TOTAL).toBe(36);
    expect(A_RATE).toBe(3);
    expect(B_RATE).toBe(2);
    expect(DONE_TOGETHER).toBe(20);
    expect(LEFT_FOR_B).toBe(16);
    expect(B_ALONE_DAYS).toBe(8);
  });

  it("the bar has one cell per unit and a line at the end of each day", () => {
    const w = unitWorkers();
    expect(w).toHaveLength(36);
    expect(w.filter((x) => x === "A")).toHaveLength(12);
    expect(dayEnds()).toEqual([5, 10, 15, 20, 22, 24, 26, 28, 30, 32, 34, 36]);
    expect(36 * CELL_W).toBe(270);
  });
});

describe("ssc-t2-combined-average (ssc2avcc-combined)", () => {
  it("30 at 60 and 20 at 70 average 64, not 65", () => {
    expect(GROUPS.map((g) => [g.n, g.avg])).toEqual([
      [30, 60],
      [20, 70],
    ]);
    expect(combinedTotal(GROUPS)).toBe(3200);
    expect(combinedCount(GROUPS)).toBe(50);
    expect(combinedAverage(GROUPS)).toBe(64);
    expect(middleOfAverages(GROUPS)).toBe(65);
    // Nearer the bigger group's average.
    expect(Math.abs(vx(64) - vx(60))).toBeLessThan(Math.abs(vx(64) - vx(70)));
  });
});

describe("ssc-t2-pair-of-lines (ssc2lesy-number)", () => {
  it("the three panels are one, none and infinitely many", () => {
    expect(PANELS.map((p) => classify(p.l1, p.l2))).toEqual(["one", "none", "infinite"]);
    expect(meet(PANELS[0].l1, PANELS[0].l2)).toEqual({ x: 2, y: 4 });
  });

  it("the panels use the concept's own pairs", () => {
    expect(PANELS[1].l1).toEqual({ a: 4, b: 5, c: -7 }); // k = 5
    expect(PANELS[1].l2).toEqual({ a: 12, b: 15, c: -9 });
    expect(PANELS[2].l2).toEqual({ a: 6, b: 9, c: -15 }); // m = 9
    // Practice pairs.
    expect(classify({ a: 1, b: 2, c: -3 }, { a: 2, b: 4, c: -7 })).toBe("none");
    expect(classify({ a: 4, b: 6, c: -4 }, { a: 2, b: 3, c: -2 })).toBe("infinite");
  });

  it("each panel's window shows the crossing point", () => {
    const p = PANELS[0];
    const pt = meet(p.l1, p.l2);
    expect(pt.x).toBeGreaterThan(p.xMin);
    expect(pt.x).toBeLessThan(p.xMax);
    expect(pt.y).toBeGreaterThan(p.yMin);
    expect(pt.y).toBeLessThan(p.yMax);
  });
});

describe("ssc-t2-milk-replacement (ssc2ramx-replace)", () => {
  it("50 litres, 5 drawn off twice: 40.5 litres of milk left", () => {
    expect(CAN).toEqual({ V: 50, x: 5, rounds: 2 });
    expect(KEEP).toBe(0.9);
    expect(milkLeft(50, 5, 50, 2)).toBeCloseTo(40.5, 9);
  });

  it("the steps follow the milk 50, 45, 45, 40.5, 40.5 and refill to 50", () => {
    expect(REPLACE_STEPS).toHaveLength(STATES.length);
    expect(STATES.map((s) => s.milk)).toEqual([50, 45, 45, 40.5, 40.5]);
    expect(STATES.map((s) => (s.milk as number) + (s.water as number))).toEqual([50, 45, 50, 45, 50]);
    expect(45 * KEEP).toBeCloseTo(STATES[3].milk, 9);
    expect(STATES[4].water).toBe(50 - 40.5);
    expect(canText(4)).toBe("In the can: milk 40.5 L, water 9.5 L");
    expect(canText(0)).toBe("In the can: 50 L, all milk");
  });
});
