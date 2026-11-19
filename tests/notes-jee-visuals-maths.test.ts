import { describe, expect, it } from "vitest";
import { FOOT, IMAGE, MIRROR, POINT, footOf, imageOf } from "../src/app/notes/_components/visualizations/JeePointImageLine";
import {
  CHORD_CIRCLE,
  CHORD_LINE,
  centreDistance,
  chordEnds,
  chordLength,
  chordMidpoint,
} from "../src/app/notes/_components/visualizations/JeeChordLength";
import { CASES, R1, R2, classify, commonTangents } from "../src/app/notes/_components/visualizations/JeeTwoCircles";
import {
  HYP,
  HYP_P,
  branchPoints,
  dist as hypDist,
  focalByFormula,
  hypE,
  hypFoci,
} from "../src/app/notes/_components/visualizations/JeeHyperbolaFocal";
import {
  ELL,
  ELL_P,
  dist as ellDist,
  ellDirectrix,
  ellE,
  ellFocalByFormula,
  ellFoci,
} from "../src/app/notes/_components/visualizations/JeeEllipseFocal";
import {
  A1,
  A2,
  D1,
  D2,
  RANGE1,
  RANGE2,
  cross,
  dot,
  norm,
  perpendicularFeet,
  pointOn,
  project,
  shortestDistance,
  sub as sub3,
  type V3,
} from "../src/app/notes/_components/visualizations/JeeSkewLinesDistance";
import {
  ROTATION_STEPS,
  THETA,
  Z1,
  Z2,
  Z3,
  Z4,
  argDeg,
  armAngle,
  div,
  modulus,
  rotateAbout,
  sub as subC,
} from "../src/app/notes/_components/visualizations/JeeComplexRotation";
import { MVT_PANEL, ROLLE_PANEL, chordSlope, mvtPoint } from "../src/app/notes/_components/visualizations/JeeMeanValueTheorem";
import { DEFAULT_N, EXACT, N_RANGE, exampleSum, f as riemannF, riemannSum } from "../src/app/notes/_components/visualizations/JeeRiemannSum";

// JEE Mains Mathematics notes figures, task maths (scripts/notes/CET_VISUALS_BRIEF.md,
// JEE variant). Each figure draws its concept's own example, so those numbers are pinned here.

const close = (p: { x: number; y: number }, q: { x: number; y: number }) => {
  expect(p.x).toBeCloseTo(q.x, 9);
  expect(p.y).toBeCloseTo(q.y, 9);
};

describe("image of a point in a line (jsl-image)", () => {
  it("uses the worked example: (4, 1) in 2x + y = 4", () => {
    expect(MIRROR).toEqual({ a: 2, b: 1, c: -4 });
    expect(POINT).toEqual({ x: 4, y: 1 });
  });

  it("foot (2, 0), image (0, −1): ratio −1 for the foot, −2 for the image", () => {
    close(FOOT, { x: 2, y: 0 });
    close(IMAGE, { x: 0, y: -1 });
    // 2(4) + 1 − 4 = 5 and a² + b² = 5.
    expect(MIRROR.a * POINT.x + MIRROR.b * POINT.y + MIRROR.c).toBe(5);
  });

  it("the foot is the midpoint of P and its image, on the line, √5 from each", () => {
    close(FOOT, { x: (POINT.x + IMAGE.x) / 2, y: (POINT.y + IMAGE.y) / 2 });
    expect(MIRROR.a * FOOT.x + MIRROR.b * FOOT.y + MIRROR.c).toBeCloseTo(0, 9);
    const pm = Math.hypot(POINT.x - FOOT.x, POINT.y - FOOT.y);
    const mi = Math.hypot(IMAGE.x - FOOT.x, IMAGE.y - FOOT.y);
    expect(pm).toBeCloseTo(Math.sqrt(5), 9);
    expect(mi).toBeCloseTo(Math.sqrt(5), 9);
    expect(pm).toBeCloseTo(Math.abs(5) / Math.hypot(2, 1), 9); // distance from P to the line
    // PP′ runs along the normal (2, 1).
    expect((POINT.x - IMAGE.x) * MIRROR.b - (POINT.y - IMAGE.y) * MIRROR.a).toBeCloseTo(0, 9);
  });

  it("agrees with the self-check and the practice items", () => {
    close(imageOf({ x: 2, y: -1 }, { a: 1, b: 1, c: -5 }), { x: 6, y: 3 });
    close(imageOf({ x: 3, y: 7 }, { a: 1, b: -1, c: 0 }), { x: 7, y: 3 });
    close(imageOf({ x: 2, y: 5 }, { a: 0, b: 1, c: 0 }), { x: 2, y: -5 });
    close(imageOf({ x: 0, y: 0 }, { a: 1, b: 1, c: -2 }), { x: 2, y: 2 });
    close(imageOf({ x: 1, y: 1 }, { a: 1, b: 0, c: -4 }), { x: 7, y: 1 });
    close(footOf({ x: 0, y: 0 }, { a: 1, b: 1, c: -2 }), { x: 1, y: 1 });
  });
});

describe("chord length (jcon-chord-length)", () => {
  it("uses the worked example: 3x + 4y = 10 on x² + y² = 25", () => {
    expect(CHORD_CIRCLE).toEqual({ cx: 0, cy: 0, r: 5 });
    expect(CHORD_LINE).toEqual({ a: 3, b: 4, k: 10 });
  });

  it("d = 10/5 = 2 and the chord is 2√21", () => {
    expect(centreDistance()).toBeCloseTo(2, 12);
    expect(chordLength(5, 2)).toBeCloseTo(2 * Math.sqrt(21), 12);
    expect(chordLength(5, 2)).toBeCloseTo(9.17, 2);
  });

  it("the foot N = (6/5, 8/5) bisects the chord, and the ends lie on both curves", () => {
    const m = chordMidpoint();
    close(m, { x: 1.2, y: 1.6 });
    const [a, b] = chordEnds();
    for (const p of [a, b]) {
      expect(p.x * p.x + p.y * p.y).toBeCloseTo(25, 9);
      expect(3 * p.x + 4 * p.y).toBeCloseTo(10, 9);
    }
    close({ x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 }, m);
    expect(Math.hypot(a.x - b.x, a.y - b.y)).toBeCloseTo(2 * Math.sqrt(21), 9);
    // Right triangle at N: d² + (half chord)² = r².
    expect(Math.hypot(m.x, m.y) ** 2 + 21).toBeCloseTo(25, 9);
  });

  it("agrees with the practice items", () => {
    expect(chordLength(3, 1)).toBeCloseTo(4 * Math.sqrt(2), 12); // x = 1 on x² + y² = 9
    expect(chordLength(5, 3)).toBe(8); // shortest chord through (3, 0)
    expect(chordLength(Math.sqrt(13), 2)).toBeCloseTo(6, 12); // x = 3 on (x − 1)² + y² = 13
  });
});

describe("two circles (jcon-two-circle-position)", () => {
  it("uses the worked example's radii: r₁ = 2, r₂ = 3, touching externally at d = 5", () => {
    expect([R1, R2]).toEqual([2, 3]);
    // Second circle x² + y² − 6x − 8y + 16 = 0: centre (3, 4), r² = 9 + 16 − 16.
    expect(Math.sqrt(9 + 16 - 16)).toBe(3);
    expect(Math.hypot(3, 4)).toBe(5);
    expect(classify(2, 3, 5)).toBe("touch externally");
    expect(commonTangents(2, 3, 5)).toHaveLength(3);
  });

  it("five cases, d = 7, 5, 3, 1, 0.5, with 4, 3, 2, 1, 0 common tangents", () => {
    expect(CASES.map((c) => c.d)).toEqual([7, 5, 3, 1, 0.5]);
    expect(CASES.map((c) => c.tangents)).toEqual([4, 3, 2, 1, 0]);
    for (const c of CASES) {
      expect(classify(R1, R2, c.d)).toBe(c.kind);
      expect(commonTangents(R1, R2, c.d)).toHaveLength(c.tangents);
    }
  });

  it("every drawn tangent really touches both circles", () => {
    for (const c of CASES) {
      for (const t of commonTangents(R1, R2, c.d)) {
        expect(Math.hypot(t.nx, t.ny)).toBeCloseTo(1, 12);
        // Line nₓx + nᵧy + r₁ = 0 is r₁ from (0, 0) by construction; it must be r₂ from (d, 0).
        expect(Math.abs(t.nx * c.d + R1)).toBeCloseTo(R2, 9);
      }
    }
  });

  it("agrees with the self-check (3 < r < 7 for d = 5, r₁ = 2) and the practice items", () => {
    expect(classify(2, 3, 5)).not.toBe("two points");
    expect(classify(2, 3.5, 5)).toBe("two points");
    expect(classify(2, 6.9, 5)).toBe("two points");
    expect(classify(2, 7, 5)).toBe("touch internally");
    expect(classify(1, 3, 0)).toBe("one inside");
    expect(commonTangents(1, 3, 0)).toHaveLength(0);
    expect(classify(5, 1, 4)).toBe("touch internally");
  });
});

describe("hyperbola focal distances (jcon-hyperbola-focal)", () => {
  it("uses the worked example: x²/16 − y²/9 = 1, e = 5/4, foci (±5, 0)", () => {
    expect(HYP).toEqual({ a: 4, b: 3 });
    expect(hypE()).toBeCloseTo(1.25, 12);
    expect(hypE()).toBeGreaterThan(1);
    const { S, S2 } = hypFoci();
    close(S, { x: 5, y: 0 });
    close(S2, { x: -5, y: 0 });
  });

  it("P(8, 3√3): SP = 6, S′P = 14, difference 8 = 2a", () => {
    expect(HYP_P.x).toBe(8);
    expect(HYP_P.y).toBeCloseTo(3 * Math.sqrt(3), 12);
    expect(HYP_P.x ** 2 / 16 - HYP_P.y ** 2 / 9).toBeCloseTo(1, 12);
    const { S, S2 } = hypFoci();
    expect(hypDist(HYP_P, S)).toBeCloseTo(6, 12);
    expect(hypDist(HYP_P, S2)).toBeCloseTo(14, 12);
    expect(hypDist(HYP_P, S2) - hypDist(HYP_P, S)).toBeCloseTo(2 * HYP.a, 12);
    const byFormula = focalByFormula(8);
    expect(byFormula.SP).toBeCloseTo(6, 12);
    expect(byFormula.S2P).toBeCloseTo(14, 12);
  });

  it("the drawn branches lie on the hyperbola, and the difference holds all along them", () => {
    const { S, S2 } = hypFoci();
    for (const side of [1, -1] as const) {
      for (const p of branchPoints(side)) {
        expect(p.x ** 2 / 16 - p.y ** 2 / 9).toBeCloseTo(1, 9);
        expect(Math.abs(p.x)).toBeLessThanOrEqual(9 + 1e-9);
        expect(Math.abs(hypDist(p, S) - hypDist(p, S2))).toBeCloseTo(8, 9);
      }
    }
    expect(HYP.b / HYP.a).toBe(0.75); // asymptotes y = ±3x/4
  });
});

describe("ellipse focal distances (jcon-ellipse-focal)", () => {
  it("uses the worked example: x²/25 + y²/16 = 1, e = 3/5, foci (±3, 0), directrix x = 25/3", () => {
    expect(ELL).toEqual({ a: 5, b: 4 });
    expect(ellE()).toBeCloseTo(0.6, 12);
    // b² = a²(1 − e²).
    expect(25 * (1 - ellE() ** 2)).toBeCloseTo(16, 12);
    const { S, S2 } = ellFoci();
    close(S, { x: 3, y: 0 });
    close(S2, { x: -3, y: 0 });
    expect(ellDirectrix()).toBeCloseTo(25 / 3, 12);
  });

  it("P(3, 16/5): SP = 16/5, S′P = 34/5, sum 10 = 2a", () => {
    expect(ELL_P.x).toBe(3);
    expect(ELL_P.y).toBeCloseTo(16 / 5, 12);
    expect(ELL_P.x ** 2 / 25 + ELL_P.y ** 2 / 16).toBeCloseTo(1, 12);
    const { S, S2 } = ellFoci();
    expect(ellDist(ELL_P, S)).toBeCloseTo(16 / 5, 12);
    expect(ellDist(ELL_P, S2)).toBeCloseTo(34 / 5, 12);
    expect(ellDist(ELL_P, S) + ellDist(ELL_P, S2)).toBeCloseTo(2 * ELL.a, 12);
    const byFormula = ellFocalByFormula(3);
    expect(byFormula.SP).toBeCloseTo(16 / 5, 12);
    expect(byFormula.S2P).toBeCloseTo(34 / 5, 12);
  });

  it("directrix property: PM = 16/3 and e·PM = SP", () => {
    const pm = ellDirectrix() - ELL_P.x;
    expect(pm).toBeCloseTo(16 / 3, 12);
    expect(ellE() * pm).toBeCloseTo(16 / 5, 12);
  });
});

describe("skew lines (j3d-shortest-distance)", () => {
  it("uses the worked example's points and directions", () => {
    expect([A1, D1, A2, D2]).toEqual([
      [1, 0, 0],
      [1, 1, 0],
      [0, 0, 2],
      [0, 1, 1],
    ]);
  });

  it("d₁ × d₂ = (1, −1, 1), |d₁ × d₂| = √3, dot product 1, SD = 1/√3", () => {
    expect(cross(D1, D2)).toEqual([1, -1, 1]);
    expect(norm(cross(D1, D2))).toBeCloseTo(Math.sqrt(3), 12);
    expect(sub3(A2, A1)).toEqual([-1, 0, 2]);
    expect(dot(sub3(A2, A1), cross(D1, D2))).toBe(1);
    expect(shortestDistance(A1, D1, A2, D2)).toBeCloseTo(1 / Math.sqrt(3), 12);
  });

  it("the common perpendicular is drawn where it really is", () => {
    const { lambda, mu } = perpendicularFeet(A1, D1, A2, D2);
    expect(lambda).toBeCloseTo(-4 / 3, 12);
    expect(mu).toBeCloseTo(-5 / 3, 12);
    const pq = sub3(pointOn(A2, D2, mu), pointOn(A1, D1, lambda));
    pq.forEach((v, i) => expect(v).toBeCloseTo([1 / 3, -1 / 3, 1 / 3][i], 12));
    expect(dot(pq, D1)).toBeCloseTo(0, 12);
    expect(dot(pq, D2)).toBeCloseTo(0, 12);
    expect(norm(pq)).toBeCloseTo(shortestDistance(A1, D1, A2, D2), 12);
    // Both feet are inside the drawn stretches.
    expect(lambda).toBeGreaterThan(RANGE1[0]);
    expect(lambda).toBeLessThan(RANGE1[1]);
    expect(mu).toBeGreaterThan(RANGE2[0]);
    expect(mu).toBeLessThan(RANGE2[1]);
  });

  it("the two drawn lines do not cross on the page", () => {
    const p = [project(pointOn(A1, D1, RANGE1[0])), project(pointOn(A1, D1, RANGE1[1]))];
    const q = [project(pointOn(A2, D2, RANGE2[0])), project(pointOn(A2, D2, RANGE2[1]))];
    const side = (a: { x: number; y: number }, b: { x: number; y: number }, c: { x: number; y: number }) =>
      Math.sign((b.x - a.x) * (c.y - a.y) - (b.y - a.y) * (c.x - a.x));
    const crosses = side(p[0], p[1], q[0]) !== side(p[0], p[1], q[1]) && side(q[0], q[1], p[0]) !== side(q[0], q[1], p[1]);
    expect(crosses).toBe(false);
  });

  it("agrees with the self-check: the x-axis and the line through (0, k, 1) along (1, 0, 1) are |k| apart", () => {
    const o: V3 = [0, 0, 0];
    expect(cross([1, 0, 0], [1, 0, 1])).toEqual([0, -1, 0]);
    expect(shortestDistance(o, [1, 0, 0], [0, 3, 1], [1, 0, 1])).toBeCloseTo(3, 12);
    expect(shortestDistance(o, [1, 0, 0], [0, -3, 1], [1, 0, 1])).toBeCloseTo(3, 12);
  });
});

describe("rotation (jcx-rotation)", () => {
  it("uses the worked example: square on 0 and 3 + i, other vertices −1 + 3i and 2 + 4i", () => {
    expect(Z1).toEqual({ re: 0, im: 0 });
    expect(Z2).toEqual({ re: 3, im: 1 });
    expect(THETA).toBeCloseTo(Math.PI / 2, 15);
    expect(Z3).toEqual({ re: -1, im: 3 });
    expect(Z4).toEqual({ re: 2, im: 4 });
  });

  it("(z₃ − z₁)/(z₂ − z₁) = i: modulus 1, argument π/2", () => {
    const ratio = div(subC(Z3, Z1), subC(Z2, Z1));
    expect(ratio.re).toBeCloseTo(0, 12);
    expect(ratio.im).toBeCloseTo(1, 12);
    expect(modulus(subC(Z2, Z1))).toBeCloseTo(Math.sqrt(10), 12);
    expect(modulus(subC(Z3, Z1))).toBeCloseTo(Math.sqrt(10), 12);
    expect(argDeg(ratio)).toBeCloseTo(90, 9);
  });

  it("the four vertices make a square", () => {
    const v = [Z1, Z2, Z4, Z3];
    for (let i = 0; i < 4; i++) expect(modulus(subC(v[(i + 1) % 4], v[i]))).toBeCloseTo(Math.sqrt(10), 12);
    expect(modulus(subC(Z4, Z1))).toBeCloseTo(Math.sqrt(20), 12); // diagonal √2 × side
  });

  it("the arm starts along z₂ − z₁ and ends a quarter turn later", () => {
    expect(armAngle(0)).toBeCloseTo((Math.atan(1 / 3) * 180) / Math.PI, 9);
    const last = ROTATION_STEPS.length - 1;
    expect(armAngle(last) - armAngle(0)).toBeCloseTo(90, 9);
  });

  it("steps: two vertices, turn, read the ratio, complete the square", () => {
    expect(ROTATION_STEPS.map((s) => s.title)).toEqual([
      "Two vertices of the square",
      "Turn the side a quarter turn about z₁",
      "Read the ratio",
      "Complete the square",
    ]);
    for (const s of ROTATION_STEPS) expect(`${s.title} ${s.caption}`).not.toMatch(/_/);
    expect(ROTATION_STEPS[1].caption).toContain("−1 + 3i");
    expect(ROTATION_STEPS[3].caption).toContain("2 + 4i");
  });

  it("agrees with the practice items", () => {
    const a = rotateAbout({ re: 2, im: 1 }, Z1, -Math.PI / 2);
    expect(a.re).toBeCloseTo(1, 12);
    expect(a.im).toBeCloseTo(-2, 12);
    const b = rotateAbout({ re: 1, im: 0 }, { re: 1, im: 1 }, Math.PI / 2);
    expect(b.re).toBeCloseTo(2, 12);
    expect(b.im).toBeCloseTo(1, 12);
    const c = rotateAbout({ re: 1, im: 0 }, Z1, Math.PI / 3);
    expect(c.re).toBeCloseTo(0.5, 12);
    expect(c.im).toBeCloseTo(Math.sqrt(3) / 2, 12);
  });
});

describe("mean value theorem and Rolle (jaod-rolle)", () => {
  it("worked example: x² on [1, 3], chord slope 4, c = 2", () => {
    expect([MVT_PANEL.a, MVT_PANEL.b]).toEqual([1, 3]);
    expect([MVT_PANEL.f(1), MVT_PANEL.f(3)]).toEqual([1, 9]);
    expect(chordSlope(MVT_PANEL)).toBe(4);
    const c = mvtPoint(MVT_PANEL);
    expect(c).toBeCloseTo(2, 9);
    expect(MVT_PANEL.df(2)).toBe(4);
    // Tangent y = 4x − 4 is parallel to, and below, the chord y = 4x − 3.
    expect(MVT_PANEL.f(2) - 4 * 2).toBe(-4);
    expect(MVT_PANEL.f(1) - 4 * 1).toBe(-3);
  });

  it("self-check: x² − 4x on [0, 4], level ends, c = 2 with f′(c) = 0", () => {
    expect([ROLLE_PANEL.a, ROLLE_PANEL.b]).toEqual([0, 4]);
    expect(ROLLE_PANEL.f(0)).toBe(0);
    expect(ROLLE_PANEL.f(4)).toBe(0);
    expect(chordSlope(ROLLE_PANEL)).toBe(0);
    const c = mvtPoint(ROLLE_PANEL);
    expect(c).toBeCloseTo(2, 9);
    expect(ROLLE_PANEL.df(2)).toBe(0);
    expect(ROLLE_PANEL.f(2)).toBe(-4);
  });

  it("c is strictly inside (a, b), and the practice items agree", () => {
    for (const p of [MVT_PANEL, ROLLE_PANEL]) {
      const c = mvtPoint(p);
      expect(c).toBeGreaterThan(p.a);
      expect(c).toBeLessThan(p.b);
    }
    const window = { run: 1, xMin: 0, xMax: 3, yMin: 0, yMax: 1 };
    expect(mvtPoint({ ...window, f: (x) => x ** 3, df: (x) => 3 * x * x, a: 0, b: 3 })).toBeCloseTo(Math.sqrt(3), 9);
    expect(mvtPoint({ ...window, f: Math.exp, df: Math.exp, a: 0, b: 1 })).toBeCloseTo(Math.log(Math.E - 1), 9);
  });
});

describe("Riemann sum (jdi-riemann)", () => {
  it("uses the worked example: n/(n² + k²) = (1/n)·1/(1 + (k/n)²), limit π/4", () => {
    expect(riemannF(0)).toBe(1);
    expect(riemannF(1)).toBe(0.5);
    expect(EXACT).toBeCloseTo(0.785398, 6);
    for (const n of [1, 2, 8, 37]) expect(exampleSum(n)).toBeCloseTo(riemannSum(n), 12);
  });

  it("the strip sums: n = 1 gives 1/2, n = 2 gives 0.65, n = 8 about 0.7535, n = 50 about 0.7804", () => {
    expect(riemannSum(1)).toBe(0.5);
    expect(riemannSum(2)).toBeCloseTo(0.65, 12);
    expect(riemannSum(8)).toBeCloseTo(0.753497, 6);
    expect(riemannSum(50)).toBeCloseTo(0.780381, 6);
  });

  it("f falls on [0, 1], so every sum is below π/4 and climbs towards it", () => {
    let prev = 0;
    for (let n = N_RANGE.min; n <= N_RANGE.max; n++) {
      const s = riemannSum(n);
      expect(s).toBeLessThan(EXACT);
      expect(s).toBeGreaterThan(prev);
      prev = s;
    }
    expect(EXACT - riemannSum(100000)).toBeLessThan(1e-5);
    expect(DEFAULT_N as number).toBeGreaterThanOrEqual(N_RANGE.min);
    expect(DEFAULT_N as number).toBeLessThanOrEqual(N_RANGE.max);
  });
});
