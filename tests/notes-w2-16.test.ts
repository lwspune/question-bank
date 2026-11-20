import { describe, expect, it } from "vitest";
import {
  AREA,
  CS_STEPS,
  INSIDE,
  K,
  UNDER_ROOT,
  completeSquare,
  stripB,
} from "../src/app/notes/_components/visualizations/CetCompleteSquare";
import {
  GP_A,
  K_RANGE,
  N_TERMS,
  PLOT as GP_PLOT,
  fmt,
  partialSum,
  rOf,
  sumOfSquares,
  sumToInfinity,
} from "../src/app/notes/_components/visualizations/JeeInfiniteGpSum";
import {
  BARS_A,
  BARS_B,
  LEFT,
  PLACES,
  SB_STEPS,
  SWEETS,
  nCr,
  placeX,
  shareFromBars,
  sweetAt,
} from "../src/app/notes/_components/visualizations/JeeStarsAndBars";
import {
  BOYS,
  GAP_DEG,
  GIRLS,
  GIRL_GAPS,
  RT_STEPS,
  factorial,
  gapsRound,
  gapsRow,
  nPr,
  seatAt,
  seatings,
} from "../src/app/notes/_components/visualizations/CetRoundTableGaps";
import { C, N_MAX, N_INITIAL, ROWS, R_RANGE, columnTerms } from "../src/app/notes/_components/visualizations/JeeHockeyStick";
import { TRI_A, TRI_B, hypA, oppB, sinSum } from "../src/app/notes/_components/visualizations/JeeInverseTrigTriangles";
import {
  FEET,
  LINE_KS,
  PAIR,
  gapByFactors,
  gapByFormula,
  pairValue,
} from "../src/app/notes/_components/visualizations/CetParallelPairDistance";

const close = (a: number, b: number, eps = 1e-9) => Math.abs(a - b) < eps;

describe("cet-complete-square (completing-the-square)", () => {
  it("completes the worked example's squares: x² + 4x − 5 = (x + 2)² − 9 and 5 − 4x − x² = 9 − (x + 2)²", () => {
    expect(completeSquare(INSIDE.a, INSIDE.b, INSIDE.c)).toEqual({ p: 2, q: -9 });
    expect(completeSquare(UNDER_ROOT.a, UNDER_ROOT.b, UNDER_ROOT.c)).toEqual({ p: 2, q: 9 });
    expect(K * K).toBe(9);
    for (const x of [-3, -1.5, 0, 0.7, 2]) {
      expect(close(x * x + 4 * x - 5, (x + 2) ** 2 - 9)).toBe(true);
      expect(close(5 - 4 * x - x * x, 9 - (x + 2) ** 2)).toBe(true);
      // x² + 4x = (x + 2)² − 4: the missing corner is 2 × 2.
      expect(close(x * x + 4 * x, (x + 2) ** 2 - 4)).toBe(true);
    }
  });

  it("sin⁻¹((x + 2)/3) differentiates back to 1/√(5 − 4x − x²)", () => {
    const F = (x: number) => Math.asin((x + 2) / 3);
    for (const x of [-4, -2, 0, 0.5]) {
      const h = 1e-6;
      const d = (F(x + h) - F(x - h)) / (2 * h);
      expect(Math.abs(d - 1 / Math.sqrt(5 - 4 * x - x * x))).toBeLessThan(1e-5);
    }
  });

  it("moves the half strip to lie exactly under the square, leaving the 2 by 2 corner", () => {
    const { x0, y0, side, half } = AREA;
    const t = stripB(1);
    const th = (t.angle * Math.PI) / 180;
    const corners = [
      [0, 0],
      [half, 0],
      [half, side],
      [0, side],
    ].map(([u, v]) => [t.x + u * Math.cos(th) - v * Math.sin(th), t.y + u * Math.sin(th) + v * Math.cos(th)]);
    const xs = corners.map((c) => Math.round(c[0]));
    const ys = corners.map((c) => Math.round(c[1]));
    expect([Math.min(...xs), Math.max(...xs)]).toEqual([x0, x0 + side]);
    expect([Math.min(...ys), Math.max(...ys)]).toEqual([y0 + side, y0 + side + half]);
    expect(stripB(0)).toEqual({ x: x0 + side + half, y: y0, angle: 0 });
    expect(CS_STEPS).toHaveLength(5);
  });
});

describe("jee-infinite-gp-sum (jseq-igp-sum)", () => {
  it("defaults to the worked example's GP: a = 3, r = 1/2, sum 6, squares 12", () => {
    const r = rOf(K_RANGE.initial);
    expect(GP_A).toBe(3);
    expect(r).toBe(0.5);
    expect(sumToInfinity(GP_A, r)).toBe(6);
    expect(sumOfSquares(GP_A, r)).toBe(12);
    // squares ÷ S∞ = a/(1 + r) = 2, and with a/(1 − r) = 6 that gives r = 1/2.
    expect(sumOfSquares(GP_A, r) / sumToInfinity(GP_A, r)).toBe(GP_A / (1 + r));
    expect(GP_A / (1 + r)).toBe(2);
  });

  it("keeps |r| below 1 and every bar inside the plot", () => {
    for (let k = K_RANGE.min; k <= K_RANGE.max; k++) {
      const r = rOf(k);
      expect(Math.abs(r)).toBeLessThan(1);
      expect(sumToInfinity(GP_A, r)).toBeLessThanOrEqual(GP_PLOT.yMax);
      for (let n = 1; n <= N_TERMS; n++) {
        const s = partialSum(GP_A, r, n);
        expect(s).toBeGreaterThanOrEqual(0);
        expect(s).toBeLessThanOrEqual(GP_PLOT.yMax);
      }
    }
  });

  it("matches the concept's numbers and formats them plainly", () => {
    expect(close(sumToInfinity(1, 1 / 3), 3 / 2)).toBe(true);
    expect(close(sumToInfinity(8, -1 / 2), 16 / 3)).toBe(true);
    expect(close(partialSum(3, 0.5, 10), 6 * (1 - 1 / 1024))).toBe(true);
    expect(fmt(6)).toBe("6");
    expect(fmt(12)).toBe("12");
    expect(fmt(-0.5)).toBe("−0.5");
    expect(fmt(0)).toBe("0");
  });
});

describe("jee-stars-and-bars (jpnc-identical)", () => {
  it("12 sweets, 3 children, at least 2 each: 6 left, 8 places, C(8, 2) = 28", () => {
    expect(SWEETS).toBe(12);
    expect(LEFT).toBe(6);
    expect(PLACES).toBe(8);
    expect(nCr(PLACES, 2)).toBe(28);
    expect(nCr(9, 2)).toBe(36);
    expect(nCr(5, 2)).toBe(10);
  });

  it("reads the drawn shares off the bars", () => {
    expect(shareFromBars(BARS_A)).toEqual([2, 1, 3]);
    expect(shareFromBars(BARS_B)).toEqual([0, 0, 6]);
  });

  it("each pair of bar places is one share, and every share appears once", () => {
    const seen = new Set<string>();
    for (let i = 0; i < PLACES; i++)
      for (let j = i + 1; j < PLACES; j++) {
        const y = shareFromBars([i, j]);
        expect(y.reduce((s, v) => s + v, 0)).toBe(LEFT);
        seen.add(y.join(","));
      }
    let solutions = 0;
    for (let a = 0; a <= LEFT; a++) for (let b = 0; a + b <= LEFT; b++) solutions++;
    expect(seen.size).toBe(28);
    expect(solutions).toBe(28);
  });

  it("puts the 6 free sweets on the places the bars leave", () => {
    for (let step = 2; step < SB_STEPS.length; step++) {
      const xs = Array.from({ length: LEFT }, (_, j) => sweetAt(6 + j, step).x).sort((p, q) => p - q);
      const bars = step === 3 ? BARS_B : BARS_A;
      const free = Array.from({ length: PLACES }, (_, p) => p).filter((p) => !(bars as readonly number[]).includes(p));
      expect(xs).toEqual(free.map(placeX));
    }
  });
});

describe("cet-round-table-gaps (cetpc-round-table-and-gaps)", () => {
  it("4 boys and 3 girls: 3! × ⁴P₃ = 6 × 24 = 144", () => {
    expect(factorial(BOYS - 1)).toBe(6);
    expect(gapsRound(BOYS)).toBe(4);
    expect(gapsRow(BOYS)).toBe(5);
    expect(nPr(4, 3)).toBe(24);
    expect(seatings(BOYS, GIRLS)).toBe(144);
    // The concept's 6 boys and 5 girls: 5! × ⁶P₅ = 86,400.
    expect(seatings(6, 5)).toBe(86400);
  });

  it("agrees with a brute-force count of seatings with no two girls side by side", () => {
    const people = ["B", "B", "B", "G", "G", "G"].map((k, i) => `${k}${i}`);
    let count = 0;
    const permute = (rest: string[], seq: string[]) => {
      if (rest.length === 0) {
        const ring = ["B-fixed", ...seq];
        const ok = ring.every((p, i) => !(p.startsWith("G") && ring[(i + 1) % ring.length].startsWith("G")));
        if (ok) count++;
        return;
      }
      rest.forEach((p, i) => permute([...rest.slice(0, i), ...rest.slice(i + 1)], [...seq, p]));
    };
    permute(people, []);
    expect(count).toBe(144);
  });

  it("draws the girls in three different gaps, between boys", () => {
    expect(new Set(GIRL_GAPS).size).toBe(GIRLS);
    expect(GAP_DEG).toEqual([45, 135, 225, 315]);
    expect(seatAt(0)).toEqual({ x: 96, y: 44 });
    expect(RT_STEPS).toHaveLength(5);
  });
});

describe("jee-hockey-stick (jbin-hockey)", () => {
  it("defaults to the self-check: C(2, 2) + … + C(8, 2) = 84 = C(9, 3)", () => {
    expect(R_RANGE.initial).toBe(2);
    expect(N_INITIAL).toBe(8);
    expect(columnTerms(2, 8)).toEqual([1, 3, 6, 10, 15, 21, 28]);
    expect(columnTerms(2, 8).reduce((s, t) => s + t, 0)).toBe(84);
    expect(C(9, 3)).toBe(84);
  });

  it("holds for every column and last row the sliders reach, inside the drawn rows", () => {
    for (let r = R_RANGE.min; r <= R_RANGE.max; r++)
      for (let n = r; n <= N_MAX; n++) {
        const total = columnTerms(r, n).reduce((s, t) => s + t, 0);
        expect(total).toBe(C(n + 1, r + 1));
        expect(n + 1).toBeLessThan(ROWS);
      }
  });

  it("gives the worked example and practice values", () => {
    let s = 0;
    for (let k = 10; k <= 15; k++) s += C(k, 2);
    expect(s).toBe(C(16, 3) - C(10, 3));
    expect(C(16, 3)).toBe(560);
    expect(C(10, 3)).toBe(120);
    expect(s).toBe(440);
    expect(C(2, 2) + C(3, 2) + C(4, 2)).toBe(10);
  });
});

describe("jee-inverse-trig-triangles (jitf-triangle)", () => {
  it("finds the third sides 17 and 24", () => {
    expect(TRI_A).toEqual({ opp: 8, adj: 15 });
    expect(TRI_B).toEqual({ adj: 7, hyp: 25 });
    expect(hypA()).toBe(17);
    expect(oppB()).toBe(24);
  });

  it("sin(A + B) = (8·7 + 15·24)/(17·25) = 416/425", () => {
    expect(sinSum()).toEqual({ num: 416, den: 425 });
    expect(close(Math.sin(Math.atan(8 / 15) + Math.acos(7 / 25)), 416 / 425)).toBe(true);
  });
});

describe("cet-parallel-pair-distance (cetpsl-parallel-lines-and-their-distance)", () => {
  it("is a parallel pair that factors as (x + y − 2)(x + y − 3)", () => {
    expect(PAIR.h * PAIR.h).toBe(PAIR.a * PAIR.b);
    for (const [x, y] of [
      [0, 0],
      [1, 2],
      [-1.5, 0.25],
      [3, -2],
    ]) {
      expect(close(pairValue(x, y), (x + y + LINE_KS[0]) * (x + y + LINE_KS[1]))).toBe(true);
    }
  });

  it("gives the gap 1/√2 by the factors and by the formula", () => {
    expect(close(gapByFactors(), 1 / Math.SQRT2)).toBe(true);
    expect(close(gapByFormula(), 1 / Math.SQRT2)).toBe(true);
  });

  it("draws the gap as the common perpendicular between the lines", () => {
    const [P, Q] = FEET;
    expect(P.x + P.y + LINE_KS[0]).toBe(0);
    expect(Q.x + Q.y + LINE_KS[1]).toBe(0);
    // Along the normal (1, 1), so perpendicular to both lines.
    expect(Q.x - P.x).toBe(Q.y - P.y);
    expect(close(Math.hypot(Q.x - P.x, Q.y - P.y), 1 / Math.SQRT2)).toBe(true);
  });
});
