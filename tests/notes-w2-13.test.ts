import { describe, expect, it } from "vitest";
import {
  EXAMPLE_PS,
  P as PC_P,
  PQ_CM,
  PR_CM,
  PS_RANGE,
  Q as PC_Q,
  R as PC_R,
  cutPoints,
  lowest,
  ptFor,
  sqFor,
  trFor,
} from "../src/app/notes/_components/visualizations/SscParallelCut";
import {
  A as TG_A,
  ANGLE_APB,
  B as TG_B,
  O as TG_O,
  P as TG_P,
  RADIUS as TG_R,
  angleAt as tgAngle,
  aobFor,
  dist as tgDist,
  opaFor,
} from "../src/app/notes/_components/visualizations/SscTangentPair";
import { BASE, BY_SIZE, LINES, fanCount, listTriangles, partsOf } from "../src/app/notes/_components/visualizations/SscTriangleCount";
import {
  A as CA_A,
  B as CA_B,
  C as CA_C,
  CENTRE_ANGLE,
  D as CA_D,
  O as CA_O,
  RADIUS as CA_R,
  angleAt as caAngle,
  majorArcAngle,
  minorArcAngle,
} from "../src/app/notes/_components/visualizations/SscCentreAngle";
import { CORNERS, G as CG_G, M as CG_M, UNIT, centroidOf, midpointOf, toPx } from "../src/app/notes/_components/visualizations/SscCoordCentroid";
import {
  A as CH_A,
  B as CH_B,
  C as CH_C,
  CENTRE as CH_CENTRE,
  D as CH_D,
  K,
  P as CH_P,
  PD_CM,
  PIECES,
  RADIUS as CH_R,
  dist as chDist,
  pdFor,
} from "../src/app/notes/_components/visualizations/SscChordsCrossing";

// SSC CGL Maths + Reasoning notes figures, group 13
// (scripts/notes/CET_VISUALS_BRIEF.md). Each figure draws its concept's own
// worked example, so those numbers are pinned here.

const close = (a: number, b: number, eps = 1e-9) => expect(Math.abs(a - b)).toBeLessThanOrEqual(eps);

describe("a line parallel to one side (ssctrpl-bpt)", () => {
  it("opens on the worked example: PS = 4, SQ = 10, PR = 21 gives PT = 6, TR = 15", () => {
    expect(EXAMPLE_PS).toBe(4);
    expect(PQ_CM).toBe(14);
    expect(PR_CM).toBe(21);
    expect(sqFor(4)).toBe(10);
    close(ptFor(4), 6);
    close(trFor(4), 15);
    close(4 / 10, 6 / 15); // the step's check
    expect(lowest(4, 10)).toEqual([2, 5]);
    expect(lowest(4, 14)).toEqual([2, 7]); // ST : QR = PS : PQ, not PS : SQ
  });

  it("every slider position cuts both sides in the same ratio, with ST parallel to QR", () => {
    expect(PC_Q.y).toBe(PC_R.y); // QR is horizontal
    for (let ps: number = PS_RANGE.min; ps <= PS_RANGE.max; ps += PS_RANGE.step) {
      close(ps / sqFor(ps), ptFor(ps) / trFor(ps), 1e-12);
      const { S, T } = cutPoints(ps);
      expect(S.y).toBe(T.y); // parallel to QR
      const fS = Math.hypot(S.x - PC_P.x, S.y - PC_P.y) / Math.hypot(PC_Q.x - PC_P.x, PC_Q.y - PC_P.y);
      const fT = Math.hypot(T.x - PC_P.x, T.y - PC_P.y) / Math.hypot(PC_R.x - PC_P.x, PC_R.y - PC_P.y);
      close(fS, ps / 14, 1e-3);
      close(fT, ps / 14, 1e-3);
    }
  });

  it("PS = 7 is the midpoint case: 1 : 1", () => {
    expect(lowest(7, sqFor(7))).toEqual([1, 1]);
    close(ptFor(7), 10.5);
    close(trFor(7), 10.5);
  });
});

describe("two tangents from one outside point (sscitg-pair)", () => {
  it("the worked example: 50° at P gives 130° at O and 25° for angle OPA", () => {
    expect(ANGLE_APB).toBe(50);
    expect(aobFor(50)).toBe(130);
    expect(opaFor(50)).toBe(25);
    expect(aobFor(70)).toBe(110); // practice
  });

  it("the drawing is true to it: equal tangents, right angles at A and B", () => {
    close(tgDist(TG_O, TG_A), TG_R, 0.02);
    close(tgDist(TG_O, TG_B), TG_R, 0.02);
    close(tgDist(TG_P, TG_A), tgDist(TG_P, TG_B), 1e-9);
    close(tgAngle(TG_A, TG_O, TG_P), 90, 0.05);
    close(tgAngle(TG_B, TG_O, TG_P), 90, 0.05);
    close(tgAngle(TG_P, TG_A, TG_B), 50, 0.05);
    close(tgAngle(TG_O, TG_A, TG_B), 130, 0.05);
    close(tgAngle(TG_P, TG_O, TG_A), 25, 0.05);
    close(tgAngle(TG_P, TG_O, TG_B), 25, 0.05);
    expect(TG_P.x).toBeLessThan(310);
  });
});

describe("listing triangles by size (sscrfctr-label)", () => {
  it("finds exactly the worked example's 6 triangles from the drawn lines", () => {
    const listed = listTriangles();
    const byName = BY_SIZE.flatMap((r) => r.names);
    expect([...listed].sort()).toEqual([...byName].sort());
    expect(listed).toHaveLength(6);
    expect(fanCount(3)).toBe(6);
    expect(LINES).toContainEqual(["B", "D", "E", "C"]);
    expect(BASE).toEqual(["B", "D", "E", "C"]);
  });

  it("each row holds the triangles of that many base parts: 3, 2, 1", () => {
    expect(BY_SIZE.map((r) => [r.parts, r.names.length])).toEqual([
      [1, 3],
      [2, 2],
      [3, 1],
    ]);
    for (const row of BY_SIZE) for (const n of row.names) expect(partsOf(n[1], n[2])).toBe(row.parts);
    // Practice: one line gives 3, five parts give 15.
    expect(fanCount(2)).toBe(3);
    expect(fanCount(5)).toBe(15);
  });
});

describe("angle at the centre and at the circumference (sscian-centre)", () => {
  it("the worked example: 124° at O gives 62° on the major arc and 118° on the minor arc", () => {
    expect(CENTRE_ANGLE).toBe(124);
    expect(majorArcAngle(124)).toBe(62);
    expect(minorArcAngle(124)).toBe(118);
    expect(majorArcAngle(124) + minorArcAngle(124)).toBe(180);
  });

  it("the drawing measures those angles, with C on the major arc and D on the minor arc", () => {
    for (const p of [CA_A, CA_B, CA_C, CA_D]) close(Math.hypot(p.x - CA_O.x, p.y - CA_O.y), CA_R, 0.02);
    close(caAngle(CA_O, CA_A, CA_B), 124, 0.05);
    close(caAngle(CA_C, CA_A, CA_B), 62, 0.05);
    close(caAngle(CA_D, CA_A, CA_B), 118, 0.05);
    // AB is horizontal: O and C above it (major arc side), D below (minor arc).
    expect(CA_A.y).toBe(CA_B.y);
    expect(CA_C.y).toBeLessThan(CA_O.y);
    expect(CA_O.y).toBeLessThan(CA_A.y);
    expect(CA_D.y).toBeGreaterThan(CA_A.y);
  });
});

describe("midpoint and centroid on a grid (ssccgpt-midpoint)", () => {
  it("the worked example: M = (3, 3), G = (2, 3)", () => {
    expect(CORNERS).toEqual({ A: [0, 3], B: [-3, 8], C: [9, -2] });
    expect(CG_M).toEqual([3, 3]);
    expect(CG_G).toEqual([2, 3]);
    expect(midpointOf(CORNERS.B, CORNERS.C)).toEqual([3, 3]);
    expect(centroidOf(CORNERS.A, CORNERS.B, CORNERS.C)).toEqual([2, 3]);
    // The median check: G = (A + 2M) / 3.
    expect([(CORNERS.A[0] + 2 * CG_M[0]) / 3, (CORNERS.A[1] + 2 * CG_M[1]) / 3]).toEqual([2, 3]);
  });

  it("on the grid, AG is 2 units and GM is 1 unit along y = 3", () => {
    const a = toPx(CORNERS.A);
    const g = toPx(CG_G);
    const m = toPx(CG_M);
    expect(a.y).toBe(g.y);
    expect(g.y).toBe(m.y);
    expect(g.x - a.x).toBe(2 * UNIT);
    expect(m.x - g.x).toBe(UNIT);
    for (const p of [CORNERS.A, CORNERS.B, CORNERS.C]) {
      const q = toPx(p);
      expect(q.x).toBeGreaterThan(0);
      expect(q.x).toBeLessThan(320);
    }
  });
});

describe("two chords crossing inside a circle (sscipw-inside)", () => {
  it("the worked example: 15 × 4 = 6 × PD gives PD = 10 and CD = 16", () => {
    expect(PIECES).toEqual({ pa: 15, pb: 4, pc: 6 });
    expect(pdFor(15, 4, 6)).toBe(10);
    expect(PD_CM).toBe(10);
    expect(PIECES.pc + PD_CM).toBe(16);
    expect(pdFor(4, 9, 6)).toBe(6); // self-check: CD = 6 + 6 = 12
  });

  it("is drawn to scale, and D lands on the circle through A, B and C", () => {
    close(chDist(CH_P, CH_A) / K, 15, 1e-9);
    close(chDist(CH_P, CH_B) / K, 4, 1e-9);
    close(chDist(CH_P, CH_C) / K, 6, 1e-9);
    close(chDist(CH_P, CH_D) / K, 10, 1e-9);
    for (const p of [CH_A, CH_B, CH_C, CH_D]) close(chDist(CH_CENTRE, p), CH_R, 1e-6);
    // A wrong PD (9 cm) would miss the circle, so the check has teeth.
    const ux = (CH_D.x - CH_P.x) / chDist(CH_P, CH_D);
    const uy = (CH_D.y - CH_P.y) / chDist(CH_P, CH_D);
    const wrong = { x: CH_P.x + 9 * K * ux, y: CH_P.y + 9 * K * uy };
    expect(Math.abs(chDist(CH_CENTRE, wrong) - CH_R)).toBeGreaterThan(1);
    // The circle fits above the three text lines.
    expect(CH_CENTRE.y - CH_R).toBeGreaterThan(0);
    expect(CH_CENTRE.y + CH_R).toBeLessThan(200);
    expect(CH_CENTRE.x - CH_R).toBeGreaterThan(0);
    expect(CH_CENTRE.x + CH_R).toBeLessThan(320);
  });
});
