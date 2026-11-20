import { describe, expect, it } from "vitest";
import {
  ENTRY_ORDER,
  MATRIX_STEPS,
  MAT_A,
  MAT_B,
  entryWork,
  litEntry,
  matMul,
} from "../src/app/notes/_components/visualizations/JeeMatrixRowColumn";
import {
  K_RANGE,
  clipLine,
  crossing,
  dets,
  eqText,
  verdictAt,
} from "../src/app/notes/_components/visualizations/JeeTwoLinesParameter";
import {
  FALSE_ROWS,
  IMPLICATION_STEPS,
  ROWS,
  TRUE_COUNT,
  falseShown,
  focusRows,
  whole,
} from "../src/app/notes/_components/visualizations/JeeImplicationFalseRows";
import {
  DIFF_COL,
  PARTS_STEPS,
  SIGNS,
  derivative,
  resultPoly,
} from "../src/app/notes/_components/visualizations/JeeRepeatedParts";
import {
  FILL_HOURS,
  NET_RATE,
  PIPES,
  PIPE_STEPS,
  STEP_HOURS,
  TANK_UNITS,
  levelAt,
  unitsPerHour,
  waterScale,
} from "../src/app/notes/_components/visualizations/SscPipesNetFill";
import { PIECES, SIDE_A, SIDE_B, pieceArea } from "../src/app/notes/_components/visualizations/SscSquareOfSum";
import { ANSWER, BRACKET_ROWS, BRACKET_STEPS, rowValue } from "../src/app/notes/_components/visualizations/SscNestedBrackets";
import { CIVSI, ciInYear, gap2, h as ciH, siPerYear } from "../src/app/notes/_components/visualizations/SscCiVsSi";
import { CASES, clip, meet as lineMeet, solutionCount } from "../src/app/notes/_components/visualizations/SscLinesSolutionCount";
import { O, P, Q, R, S, TRAP, dist, triArea } from "../src/app/notes/_components/visualizations/SscTrapeziumDiagonals";

describe("JeeMatrixRowColumn (jmat-matrix-multiplication)", () => {
  it("multiplies the worked example to (4 9; 6 3)", () => {
    expect(MAT_A).toEqual([
      [2, 1],
      [0, 3],
    ]);
    expect(MAT_B).toEqual([
      [1, 4],
      [2, 1],
    ]);
    expect(matMul(MAT_A, MAT_B)).toEqual([
      [4, 9],
      [6, 3],
    ]);
  });

  it("writes each entry's working as the concept does", () => {
    expect(entryWork(0, 0)).toBe("2·1 + 1·2 = 4");
    expect(entryWork(0, 1)).toBe("2·4 + 1·1 = 9");
    expect(entryWork(1, 0)).toBe("0·1 + 3·2 = 6");
    expect(entryWork(1, 1)).toBe("0·4 + 3·1 = 3");
  });

  it("fills the entries row by row, one per step, and says AB is not BA", () => {
    expect(MATRIX_STEPS).toHaveLength(6);
    ENTRY_ORDER.forEach(([i, j], k) => {
      expect(litEntry(k + 1)).toEqual([i, j]);
      expect(MATRIX_STEPS[k + 1].caption).toContain(entryWork(i, j));
    });
    expect(litEntry(0)).toBeNull();
    expect(litEntry(5)).toBeNull();
    expect(matMul(MAT_B, MAT_A)).toEqual([
      [2, 13],
      [4, 5],
    ]);
    expect(MATRIX_STEPS[5].caption).toContain("(4 9; 6 3)");
  });
});

describe("JeeTwoLinesParameter (jdet-nosol-find)", () => {
  it("opens on k = −1, the value with no solution", () => {
    expect(K_RANGE.start).toBe(-1);
    expect(dets(-1)).toEqual({ d: 0, dx: -2, dy: -2 });
    expect(verdictAt(-1)).toBe("none");
  });

  it("k = 1 makes every determinant zero: one line, infinitely many", () => {
    expect(dets(1)).toEqual({ d: 0, dx: 0, dy: 0 });
    expect(verdictAt(1)).toBe("infinite");
  });

  it("every other slider value gives one crossing at x = y = 1/(k + 1)", () => {
    for (let k = K_RANGE.min; k <= K_RANGE.max; k += K_RANGE.step) {
      if (k === 1 || k === -1) continue;
      expect(verdictAt(k)).toBe("unique");
      const p = crossing(k)!;
      expect(p.x).toBeCloseTo(1 / (k + 1), 12);
      expect(p.y).toBeCloseTo(1 / (k + 1), 12);
      expect(k * p.x + p.y).toBeCloseTo(1, 12);
      expect(p.x + k * p.y).toBeCloseTo(1, 12);
      // The crossing stays inside the plotted square.
      expect(Math.abs(p.x)).toBeLessThanOrEqual(3);
    }
    expect(crossing(0)).toEqual({ x: 1, y: 1 });
    expect(crossing(-0.5)).toEqual({ x: 2, y: 2 });
  });

  it("writes the equations for a given k", () => {
    expect(eqText(-1, 1, 1)).toBe("−x + y = 1");
    expect(eqText(1, -1, 1)).toBe("x − y = 1");
    expect(eqText(0, 1, 1)).toBe("y = 1");
    expect(eqText(1, 0, 1)).toBe("x = 1");
    expect(eqText(1, 0.5, 1)).toBe("x + 0.5y = 1");
    expect(eqText(-1.5, 1, 1)).toBe("−1.5x + y = 1");
  });

  it("clips each line to two points on it inside the square", () => {
    for (const [a, b] of [
      [-1, 1],
      [1, -1],
      [0, 1],
      [1, 0],
      [2, 1],
      [1, 2],
    ] as const) {
      const seg = clipLine(a, b, 1, 3)!;
      expect(seg).not.toBeNull();
      for (const p of seg) {
        expect(a * p.x + b * p.y).toBeCloseTo(1, 9);
        expect(Math.abs(p.x)).toBeLessThanOrEqual(3 + 1e-9);
        expect(Math.abs(p.y)).toBeLessThanOrEqual(3 + 1e-9);
      }
    }
  });
});

describe("JeeImplicationFalseRows (jmr-false-case)", () => {
  it("has 8 rows with 5 false and 3 true, as the worked example counts", () => {
    expect(ROWS).toHaveLength(8);
    expect(ROWS[0]).toEqual({ p: true, q: true, r: true });
    expect(ROWS[7]).toEqual({ p: false, q: false, r: false });
    expect(FALSE_ROWS).toEqual([1, 4, 5, 6, 7]);
    expect(TRUE_COUNT).toBe(3);
    expect(ROWS[1]).toEqual({ p: true, q: true, r: false });
    expect(whole(ROWS[1])).toBe(false);
  });

  it("step 1 marks the 4 rows with p false, step 2 adds the one with p true", () => {
    const shown = (step: number) => ROWS.map((_, i) => i).filter((i) => falseShown(step, i));
    expect(shown(0)).toEqual([]);
    expect(shown(1)).toEqual([4, 5, 6, 7]);
    expect(shown(2)).toEqual([1, 4, 5, 6, 7]);
    expect(shown(3)).toEqual([1, 4, 5, 6, 7]);
    expect(focusRows(1)).toEqual([4, 5, 6, 7]);
    expect(focusRows(2)).toEqual([0, 1, 2, 3]);
  });

  it("captions carry the concept's counts", () => {
    expect(IMPLICATION_STEPS).toHaveLength(4);
    expect(IMPLICATION_STEPS[1].caption).toContain("4 false rows");
    expect(IMPLICATION_STEPS[3].caption).toContain("8 − 5 = 3");
  });
});

describe("JeeRepeatedParts (jii-by-parts)", () => {
  it("differentiates x² down to 0", () => {
    expect(derivative([1, 0, 0])).toEqual([2, 0]);
    expect(derivative([2, 0])).toEqual([2]);
    expect(derivative([2])).toEqual([]);
    expect(DIFF_COL).toEqual(["x²", "2x", "2", "0"]);
  });

  it("alternating signs give e^x(x² − 2x + 2)", () => {
    expect(SIGNS).toEqual([1, -1, 1]);
    expect(resultPoly()).toEqual([1, -2, 2]);
    expect(PARTS_STEPS[PARTS_STEPS.length - 1].caption).toContain("eˣ(x² − 2x + 2) + C");
  });

  it("the answer differentiates back to x²eˣ", () => {
    const [a, b, c] = resultPoly();
    const F = (x: number) => Math.exp(x) * (a * x * x + b * x + c);
    for (const x of [-1, 0.5, 2]) {
      const d = (F(x + 1e-5) - F(x - 1e-5)) / 2e-5;
      expect(d).toBeCloseTo(x * x * Math.exp(x), 5);
    }
  });
});

describe("SscPipesNetFill (ssctwpc-net)", () => {
  it("takes the tank as 60 units, a multiple of every pipe's time", () => {
    expect(TANK_UNITS).toBe(60);
    for (const p of PIPES) expect(TANK_UNITS % p.hours).toBe(0);
    expect(PIPES.map((p) => p.hours)).toEqual([12, 15, 20]);
  });

  it("A adds 5, B adds 4, C takes away 3: net 6 an hour, full in 10 hours", () => {
    expect(PIPES.map(unitsPerHour)).toEqual([5, 4, -3]);
    expect(NET_RATE).toBe(6);
    expect(FILL_HOURS).toBe(10);
    expect(1 / 12 + 1 / 15 - 1 / 20).toBeCloseTo(1 / 10, 12);
  });

  it("the level at each step", () => {
    expect(STEP_HOURS).toEqual([0, 1, 5, 10]);
    expect(STEP_HOURS.map(levelAt)).toEqual([0, 6, 30, 60]);
    expect(waterScale(30)).toBe(0.5);
    expect(waterScale(levelAt(10))).toBe(1);
    expect(PIPE_STEPS).toHaveLength(STEP_HOURS.length);
    expect(PIPE_STEPS[3].caption).toContain("60 ÷ 6 = 10 hours");
  });
});

describe("SscSquareOfSum (sscaisq-expand)", () => {
  it("the four pieces fill the square of side a + b exactly", () => {
    const side = SIDE_A + SIDE_B;
    const total = PIECES.reduce((s, p) => s + pieceArea(p), 0);
    expect(total).toBe(side * side);
    for (const p of PIECES) {
      expect(p.x + p.w).toBeLessThanOrEqual(side);
      expect(p.y + p.h).toBeLessThanOrEqual(side);
    }
  });

  it("the two strips are a by b each, together 2ab", () => {
    const strips = PIECES.filter((p) => p.strip);
    expect(strips.map((p) => p.name)).toEqual(["ab", "ab"]);
    expect(strips.reduce((s, p) => s + pieceArea(p), 0)).toBe(2 * SIDE_A * SIDE_B);
    expect(PIECES.filter((p) => !p.strip).map((p) => [p.name, pieceArea(p)])).toEqual([
      ["a²", SIDE_A * SIDE_A],
      ["b²", SIDE_B * SIDE_B],
    ]);
  });
});

describe("SscNestedBrackets (sscsibo-brackets)", () => {
  const full = (r: { before: string; work: string; after: string }) => `${r.before}${r.work}${r.after}`;

  it("starts from the worked example and ends at 15", () => {
    expect(full(BRACKET_ROWS[0])).toBe("40 − [12 + {18 − (9 − 4)}]");
    expect(BRACKET_ROWS.map(rowValue)).toEqual([5, 13, 25, 15]);
    expect(ANSWER).toBe(15);
  });

  it("each row is the one above with its bracket replaced by its value", () => {
    for (let i = 0; i < BRACKET_ROWS.length - 1; i++) {
      const r = BRACKET_ROWS[i];
      expect(`${r.before}${rowValue(r)}${r.after}`).toBe(full(BRACKET_ROWS[i + 1]));
      // The worked part is exactly a op b, with or without its bracket.
      expect(r.work.replace(/^[({[]|[)}\]]$/g, "")).toBe(`${r.a} ${r.op} ${r.b}`);
    }
    expect(BRACKET_STEPS).toHaveLength(BRACKET_ROWS.length);
    expect(BRACKET_STEPS[3].caption).toContain("40 − 25 = 15");
  });
});

describe("SscCiVsSi (sscinco-vs-si)", () => {
  it("uses the worked example: 5000 at 10% for 2 years", () => {
    expect(CIVSI).toEqual({ P: 5000, r: 10, years: 2 });
  });

  it("SI is 500 a year; CI is 500 then 550; totals 1000 and 1050, gap 50", () => {
    const { P, r } = CIVSI;
    expect(siPerYear(P, r)).toBe(500);
    expect(ciInYear(P, r, 1)).toBeCloseTo(500, 9);
    expect(ciInYear(P, r, 2)).toBeCloseTo(550, 9);
    expect(ciInYear(P, r, 1) + ciInYear(P, r, 2)).toBeCloseTo(1050, 9);
    expect(P * (1.1 ** 2 - 1)).toBeCloseTo(1050, 9);
    expect(gap2(P, r)).toBeCloseTo(50, 9);
    expect(ciInYear(P, r, 2) - siPerYear(P, r)).toBeCloseTo(siPerYear(siPerYear(P, r), r), 9);
  });

  it("bars are drawn to scale", () => {
    expect(ciH(500)).toBe(70);
    expect(ciH(50)).toBe(7);
  });
});

describe("SscLinesSolutionCount (ssclens-ratios)", () => {
  it("reads the three cases from the coefficients", () => {
    expect(CASES.map((c) => solutionCount(c.e1, c.e2))).toEqual(["one", "none", "infinite"]);
    expect(lineMeet(CASES[0].e1, CASES[0].e2)).toEqual({ x: 2, y: 1 });
    expect(lineMeet(CASES[1].e1, CASES[1].e2)).toBeNull();
  });

  it("each drawn segment lies on its line inside its window", () => {
    for (const c of CASES) {
      for (const e of [c.e1, c.e2]) {
        const seg = clip(e, c.win)!;
        expect(seg).not.toBeNull();
        for (const p of seg) {
          expect(e.a * p.x + e.b * p.y).toBeCloseTo(e.c, 9);
          expect(p.x).toBeGreaterThanOrEqual(c.win.x0 - 1e-9);
          expect(p.x).toBeLessThanOrEqual(c.win.x1 + 1e-9);
          expect(p.y).toBeGreaterThanOrEqual(c.win.y0 - 1e-9);
          expect(p.y).toBeLessThanOrEqual(c.win.y1 + 1e-9);
        }
      }
    }
  });

  it("the parallel pair is zoomed enough to show a gap", () => {
    // 6x − 4y = 10 is 3x − 2y = 5; 9x − 6y = 12 is 3x − 2y = 4: 1/√13 apart.
    const gapUnits = 1 / Math.sqrt(13);
    expect(gapUnits * CASES[1].unit).toBeGreaterThan(8);
  });
});

describe("SscTrapeziumDiagonals (sscqupr-trapezium)", () => {
  it("uses the self-check sides, PQ = 6 and SR = 9, with PQ parallel to SR", () => {
    expect(TRAP.PQ).toBe(6);
    expect(TRAP.SR).toBe(9);
    expect(dist(P, Q)).toBe(6);
    expect(dist(S, R)).toBe(9);
    expect(P.y).toBe(Q.y);
    expect(S.y).toBe(R.y);
  });

  it("the diagonals cut each other 2 : 3 and the triangles' areas are 4 : 9", () => {
    expect(O.x).toBeCloseTo(4.5, 9);
    expect(O.y).toBeCloseTo(3, 9);
    expect(dist(P, O) / dist(O, R)).toBeCloseTo(2 / 3, 9);
    expect(dist(Q, O) / dist(O, S)).toBeCloseTo(2 / 3, 9);
    expect(triArea(P, O, Q) / triArea(R, O, S)).toBeCloseTo(4 / 9, 9);
  });
});
