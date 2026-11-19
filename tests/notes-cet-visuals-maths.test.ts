import { describe, expect, it } from "vitest";
import {
  LPP_CONSTRAINTS,
  LPP_CORNERS,
  LPP_STEPS,
  bestCorner,
  isFeasible,
  ringAt,
  zAt,
} from "../src/app/notes/_components/visualizations/CetLppCornerPoints";
import { HALF_PLANES, WINDOW, keptPolygon, lineEnds, onLine, satisfies } from "../src/app/notes/_components/visualizations/CetLppHalfPlane";
import {
  B_RANGE,
  H_RANGE,
  PAIR_EXAMPLE,
  angleBetween,
  angleFromFormula,
  lineDirections,
  pairKind,
} from "../src/app/notes/_components/visualizations/CetPairOfLinesAngle";
import {
  ALPHA,
  CENTRE,
  RADIUS,
  SIN_K,
  SOLUTIONS,
  UC_STEPS,
  armAt,
  generalSolution,
  pointAt,
} from "../src/app/notes/_components/visualizations/CetUnitCircleSolutions";
import {
  ARGAND_STEPS,
  POWERS,
  Z0,
  argDeg,
  armDeg,
  complexLabel,
  modulus,
  timesI,
} from "../src/app/notes/_components/visualizations/CetArgandRotation";
import { CIRCLE, COMPASS_POINTS, cartesian, distanceFromCentre } from "../src/app/notes/_components/visualizations/CetModulusCircle";
import {
  ASK_X,
  DEFAULT_K,
  FAMILY_K,
  IC,
  K_RANGE,
  PLOT as DE_PLOT,
  cFromCondition,
  curvePoints,
  member,
} from "../src/app/notes/_components/visualizations/CetDeSolutionFamily";
import { COOLING, HALVING_MIN, K_PER_MIN, MARKS, excessAt, temperatureAt } from "../src/app/notes/_components/visualizations/CetCoolingCurve";

// MHT-CET Mathematics notes figures, task maths (scripts/notes/CET_VISUALS_BRIEF.md).
// Each figure draws its concept's own example, so those numbers are pinned here.

const noUnderscore = (steps: readonly { title: string; caption: string }[]) => {
  for (const s of steps) expect(`${s.title} ${s.caption}`).not.toMatch(/_/);
};

describe("corner points (cetlpp-corner-point-theorem)", () => {
  it("uses the worked example: Z = 2x + 3y, x + y ≤ 6, x ≤ 4, y ≤ 5", () => {
    expect(LPP_CONSTRAINTS.map((k) => [k.a, k.b, k.c])).toEqual([
      [1, 1, 6],
      [1, 0, 4],
      [0, 1, 5],
    ]);
    expect(zAt(1, 0)).toBe(2);
    expect(zAt(0, 1)).toBe(3);
  });

  it("visits the five vertices of the example and evaluates Z = 0, 8, 14, 17, 15", () => {
    expect(LPP_CORNERS.map((p) => [p.x, p.y])).toEqual([
      [0, 0],
      [4, 0],
      [4, 2],
      [1, 5],
      [0, 5],
    ]);
    expect(LPP_CORNERS.map((p) => zAt(p.x, p.y))).toEqual([0, 8, 14, 17, 15]);
  });

  it("each corner is feasible and sits on two boundaries (axes included)", () => {
    const boundaries = [
      (x: number) => x === 0,
      (_x: number, y: number) => y === 0,
      ...LPP_CONSTRAINTS.map((k) => (x: number, y: number) => k.a * x + k.b * y === k.c),
    ];
    for (const p of LPP_CORNERS) {
      expect(isFeasible(p.x, p.y)).toBe(true);
      expect(boundaries.filter((on) => on(p.x, p.y)).length).toBeGreaterThanOrEqual(2);
    }
    expect(isFeasible(5, 0)).toBe(false);
    expect(isFeasible(2, 5)).toBe(false);
  });

  it("the maximum is 17 at (1, 5), and no feasible point beats it", () => {
    expect(bestCorner()).toEqual({ x: 1, y: 5, z: 17 });
    let best = -Infinity;
    for (let i = 0; i <= 70; i++)
      for (let j = 0; j <= 70; j++) {
        const x = i / 10;
        const y = j / 10;
        if (isFeasible(x, y)) best = Math.max(best, zAt(x, y));
      }
    expect(best).toBeCloseTo(17, 9);
  });

  it("steps: draw the region, one corner each, then read the largest", () => {
    expect(LPP_STEPS.map((s) => s.title)).toEqual([
      "Draw the constraints and shade the region",
      "Corner (0, 0)",
      "Corner (4, 0)",
      "Corner (4, 2)",
      "Corner (1, 5)",
      "Corner (0, 5)",
      "Read the largest",
    ]);
    noUnderscore(LPP_STEPS);
    expect(LPP_STEPS[6].caption).toContain("17, at (1, 5)");
  });

  it("the ring walks the corners in order and ends on the maximum", () => {
    expect(ringAt(0).opacity).toBe(0);
    LPP_CORNERS.forEach((p, i) => expect(ringAt(i + 1)).toEqual({ x: p.x, y: p.y, opacity: 1 }));
    expect(ringAt(LPP_STEPS.length - 1)).toEqual({ x: 1, y: 5, opacity: 1 });
  });
});

describe("half-plane test (cetlpp-half-plane-test)", () => {
  const [first, second] = HALF_PLANES;

  it("uses the worked example: 3x + 2y ≥ 12 and x − y ≤ 0", () => {
    expect(first).toMatchObject({ a: 3, b: 2, c: 12, sense: "ge", test: { x: 0, y: 0 } });
    expect(second).toMatchObject({ a: 1, b: -1, c: 0, sense: "le", test: { x: 1, y: 0 } });
  });

  it("3x + 2y = 12 has intercepts (4, 0) and (0, 6); the origin fails, so the far side is kept", () => {
    expect(onLine(first, { x: 4, y: 0 })).toBe(true);
    expect(onLine(first, { x: 0, y: 6 })).toBe(true);
    expect(onLine(first, { x: 0, y: 0 })).toBe(false);
    expect(satisfies(first, { x: 0, y: 0 })).toBe(false); // 0 ≥ 12 is false
    expect(satisfies(first, { x: 4, y: 4 })).toBe(true); // a far point
  });

  it("x − y = 0 passes through the origin, so (1, 0) is tested; it fails, so the side above y = x is kept", () => {
    expect(onLine(second, { x: 0, y: 0 })).toBe(true); // 0 ≤ 0 tells nothing
    expect(onLine(second, second.test)).toBe(false);
    expect(satisfies(second, { x: 1, y: 0 })).toBe(false); // 1 ≤ 0 is false
    expect(satisfies(second, { x: 0, y: 1 })).toBe(true); // above y = x
  });

  it("shades exactly the kept side inside the window", () => {
    const poly = keptPolygon(first);
    const expected = [
      { x: 14 / 3, y: -1 },
      { x: 6, y: -1 },
      { x: 6, y: 7 },
      { x: -2 / 3, y: 7 },
    ];
    expect(poly.length).toBe(expected.length);
    poly.forEach((p, i) => {
      expect(p.x).toBeCloseTo(expected[i].x, 9);
      expect(p.y).toBeCloseTo(expected[i].y, 9);
    });
    for (const h of HALF_PLANES) {
      for (const p of keptPolygon(h)) expect(satisfies(h, p)).toBe(true);
      const [e1, e2] = lineEnds(h);
      expect(onLine(h, e1)).toBe(true);
      expect(onLine(h, e2)).toBe(true);
      for (const e of [e1, e2]) {
        expect(e.x).toBeGreaterThanOrEqual(WINDOW.xMin - 1e-9);
        expect(e.x).toBeLessThanOrEqual(WINDOW.xMax + 1e-9);
        expect(e.y).toBeGreaterThanOrEqual(WINDOW.yMin - 1e-9);
        expect(e.y).toBeLessThanOrEqual(WINDOW.yMax + 1e-9);
      }
    }
  });
});

describe("angle between a pair of lines (cetpsl-angle-formula-perpendicular-and-parallel)", () => {
  const slope = (phi: number) => Math.tan(phi);

  it("opens on the worked example x² + 4xy + y² = 0: θ = 60°", () => {
    expect(PAIR_EXAMPLE).toEqual({ a: 1, h: 2, b: 1 });
    expect(angleFromFormula(1, 2, 1)).toBeCloseTo(60, 9); // tan θ = 2√3/2 = √3
    const dirs = lineDirections(1, 2, 1)!;
    expect(angleBetween(dirs[0], dirs[1])).toBeCloseTo(60, 9);
    const [m1, m2] = dirs.map(slope).sort((p, q) => p - q);
    expect(m1).toBeCloseTo(-2 - Math.sqrt(3), 9);
    expect(m2).toBeCloseTo(-2 + Math.sqrt(3), 9);
    expect(m1 + m2).toBeCloseTo(-4, 9); // −2h/b
    expect(m1 * m2).toBeCloseTo(1, 9); // a/b
  });

  it("agrees with the practice items: 3x² − 4xy + y² gives tan θ = 1/2, x² − y² gives 90°", () => {
    expect(Math.tan((angleFromFormula(3, -2, 1)! * Math.PI) / 180)).toBeCloseTo(0.5, 9);
    expect(angleFromFormula(1, 0, -1)).toBe(90);
    expect(pairKind(1, 1, 1)).toBe("coincident"); // x² + 2xy + y²: h² = ab
  });

  it("for every slider setting, the drawn lines satisfy the equation and meet at the formula's angle", () => {
    for (let h = H_RANGE.min; h <= H_RANGE.max + 1e-9; h += H_RANGE.step) {
      for (let b = B_RANGE.min; b <= B_RANGE.max; b += B_RANGE.step) {
        const a = PAIR_EXAMPLE.a;
        const dirs = lineDirections(a, h, b);
        const formula = angleFromFormula(a, h, b);
        if (h * h < a * b) {
          expect(dirs).toBeNull();
          expect(formula).toBeNull();
          expect(pairKind(a, h, b)).toBe("none");
          continue;
        }
        expect(dirs).not.toBeNull();
        for (const phi of dirs!) {
          const c = Math.cos(phi);
          const s = Math.sin(phi);
          expect(a * c * c + 2 * h * s * c + b * s * s).toBeCloseTo(0, 9);
        }
        expect(angleBetween(dirs![0], dirs![1])).toBeCloseTo(formula!, 6);
        if ((b as number) !== 0 && dirs!.every((p) => Math.abs(Math.cos(p)) > 1e-6) && pairKind(a, h, b) !== "coincident") {
          const [m1, m2] = dirs!.map(slope);
          expect(m1 + m2).toBeCloseTo((-2 * h) / b, 6);
          expect(m1 * m2).toBeCloseTo(a / b, 6);
        }
      }
    }
  });

  it("marks the cases: a + b = 0 perpendicular, h² = ab coincident, h² < ab no lines", () => {
    for (const h of [-3, -1, 0, 0.5, 2]) {
      expect(pairKind(1, h, -1)).toBe("perpendicular");
      expect(angleBetween(...lineDirections(1, h, -1)!)).toBeCloseTo(90, 9);
    }
    for (const h of [-1, 1]) {
      expect(pairKind(1, h, 1)).toBe("coincident");
      const [p, q] = lineDirections(1, h, 1)!;
      expect(angleBetween(p, q)).toBeCloseTo(0, 6);
    }
    expect(pairKind(1, 0.5, 1)).toBe("none");
    expect(lineDirections(1, 0.5, 1)).toBeNull();
    // b = 0: x² + 4xy = 0 is x = 0 and y = −x/4.
    const [p, q] = lineDirections(1, 2, 0)!;
    const vertical = [p, q].find((d) => Math.abs(Math.cos(d)) < 1e-9);
    const other = [p, q].find((d) => Math.abs(Math.cos(d)) >= 1e-9)!;
    expect(vertical).toBeDefined();
    expect(Math.tan(other)).toBeCloseTo(-0.25, 9);
    // The sliders reach every marked case.
    expect([B_RANGE.min, B_RANGE.max]).toEqual([-3, 3]);
    expect(Number.isInteger((1 - H_RANGE.min) / H_RANGE.step)).toBe(true);
  });
});

describe("unit-circle solutions (cettf-general-solutions)", () => {
  it("uses the concept's example sin θ = 1/2, α = π/6", () => {
    expect(SIN_K).toBe(0.5);
    expect(Math.sin(ALPHA)).toBeCloseTo(0.5, 12);
  });

  it("θ = nπ + (−1)ⁿα gives π/6, 5π/6, 13π/6, 17π/6 for n = 0 to 3", () => {
    expect(SOLUTIONS.map((s) => s.label)).toEqual(["π/6", "5π/6", "13π/6", "17π/6"]);
    for (const s of SOLUTIONS) expect(generalSolution(s.n)).toBeCloseTo((s.sixths * Math.PI) / 6, 12);
    for (let n = -4; n <= 6; n++) expect(Math.sin(generalSolution(n))).toBeCloseTo(0.5, 12);
    // 5π/6 = π − α; 13π/6 = 2π + α; 17π/6 = 2π + 5π/6.
    expect(generalSolution(1)).toBeCloseTo(Math.PI - ALPHA, 12);
    expect(generalSolution(2) - generalSolution(0)).toBeCloseTo(2 * Math.PI, 12);
    expect(generalSolution(3) - generalSolution(1)).toBeCloseTo(2 * Math.PI, 12);
  });

  it("both points sit on the line y = 1/2, mirror images in the y-axis; a full turn lands on the same point", () => {
    const p1 = pointAt(ALPHA);
    const p2 = pointAt(Math.PI - ALPHA);
    expect(p1.y).toBeCloseTo(CENTRE.y - RADIUS * 0.5, 1);
    expect(p2.y).toBeCloseTo(p1.y, 6);
    expect(p1.x - CENTRE.x).toBeCloseTo(CENTRE.x - p2.x, 1);
    expect(pointAt(generalSolution(2))).toEqual(p1);
    expect(pointAt(generalSolution(3))).toEqual(p2);
  });

  it("the arm turns anticlockwise to each solution in turn, the overview on 17π/6", () => {
    expect(armAt(0).opacity).toBe(0);
    expect([1, 2, 3, 4, 5].map((s) => armAt(s).deg)).toEqual([30, 150, 390, 510, 510]);
    expect(UC_STEPS).toHaveLength(6);
    noUnderscore(UC_STEPS);
    expect(UC_STEPS[5].caption).toContain("θ = nπ + (−1)ⁿα");
  });
});

describe("Argand rotation (cetcn-polar-form-and-de-moivre)", () => {
  it("uses the concept's point: i(2 + 3i) = −3 + 2i", () => {
    expect(Z0).toEqual({ re: 2, im: 3 });
    // (0 + 1i)(2 + 3i) = 2i + 3i² = −3 + 2i
    expect(timesI(Z0)).toEqual({ re: -3, im: 2 });
  });

  it("z, iz, i²z, i³z are 2 + 3i, −3 + 2i, −2 − 3i, 3 − 2i, and i⁴z = z", () => {
    expect(POWERS.map(complexLabel)).toEqual(["2 + 3i", "−3 + 2i", "−2 − 3i", "3 − 2i"]);
    expect(POWERS[2]).toEqual({ re: -Z0.re, im: -Z0.im });
    expect(timesI(POWERS[3])).toEqual(Z0);
  });

  it("each multiplication by i is a quarter turn: same modulus √13, at right angles", () => {
    for (const z of POWERS) expect(modulus(z)).toBeCloseTo(Math.sqrt(13), 12);
    for (let i = 0; i < 3; i++) {
      const p = POWERS[i];
      const q = POWERS[i + 1];
      expect(p.re * q.re + p.im * q.im).toBe(0);
      expect(p.re * q.im - p.im * q.re).toBeGreaterThan(0); // anticlockwise
    }
  });

  it("the arm starts at arg z and turns 90° a step, ending back on z", () => {
    expect(argDeg(Z0)).toBeCloseTo((Math.atan(3 / 2) * 180) / Math.PI, 9);
    for (let s = 0; s < ARGAND_STEPS.length; s++) expect(armDeg(s)).toBeCloseTo(argDeg(Z0) + 90 * s, 9);
    expect(armDeg(ARGAND_STEPS.length - 1) - 360).toBeCloseTo(argDeg(Z0), 9);
    POWERS.forEach((z, i) => expect(((armDeg(i) % 360) + 360) % 360).toBeCloseTo(argDeg(z), 9));
    noUnderscore(ARGAND_STEPS);
  });
});

describe("modulus circle (cetcn-circle-from-modulus-condition)", () => {
  it("|z − 2 − 3i| = 4 is the circle with centre (2, 3) and radius 4", () => {
    expect(CIRCLE).toEqual({ cx: 2, cy: 3, r: 4 });
    for (const p of COMPASS_POINTS) {
      expect(distanceFromCentre(p.x, p.y)).toBeCloseTo(4, 12);
      expect(cartesian(p.x, p.y)).toBeCloseTo(0, 12);
    }
    expect(COMPASS_POINTS.map((p) => p.label)).toEqual(["6 + 3i", "2 + 7i", "−2 + 3i", "2 − i"]);
    // The origin is √13 < 4 from the centre: inside.
    expect(distanceFromCentre(0, 0)).toBeCloseTo(Math.sqrt(13), 12);
    // The trap: the centre is +2 + 3i, so (−2, −3) is not on the circle.
    expect(distanceFromCentre(-2, -3)).not.toBeCloseTo(4, 3);
  });
});

describe("solution family (cetde-particular-ic)", () => {
  it("every member y = k·e^(2x) solves dy/dx = 2y", () => {
    for (const k of [0.5, 1, 3, 6]) {
      for (const x of [-1, 0, 0.3]) {
        const h = 1e-6;
        const slope = (member(k, x + h) - member(k, x - h)) / (2 * h);
        expect(slope).toBeCloseTo(2 * member(k, x), 4);
      }
    }
  });

  it("y(0) = 3 gives c = log 3, y = 3e^(2x), and y(½ log 2) = 6", () => {
    expect(IC).toEqual({ x0: 0, y0: 3 });
    expect(cFromCondition(0, 3)).toBeCloseTo(Math.log(3), 12);
    expect(member(Math.exp(cFromCondition(0, 3)), 0)).toBeCloseTo(3, 12);
    expect(ASK_X).toBeCloseTo(Math.log(2) / 2, 12);
    expect(member(3, ASK_X)).toBeCloseTo(6, 12);
  });

  it("the slider opens on the particular solution, reaches it on its grid, and only k = 3 passes through (0, 3)", () => {
    expect(DEFAULT_K).toBe(3);
    expect(Number.isInteger((3 - K_RANGE.min) / K_RANGE.step)).toBe(true);
    expect(FAMILY_K).not.toContain(3);
    for (const k of FAMILY_K) expect(member(k, 0)).not.toBe(3);
  });

  it("curves stay inside the plot and end where they leave the top", () => {
    for (const k of [K_RANGE.min, 1, 3, K_RANGE.max]) {
      const pts = curvePoints(k);
      for (const p of pts) expect(p.y).toBeLessThanOrEqual(DE_PLOT.yMax + 1e-9);
      expect(pts[0].x).toBe(DE_PLOT.xMin);
      const end = pts[pts.length - 1];
      expect(end.x === DE_PLOT.xMax || Math.abs(end.y - DE_PLOT.yMax) < 1e-9).toBe(true);
    }
  });
});

describe("cooling curve (cetde-cooling-model)", () => {
  it("uses the worked example: 90 °C in a 20 °C room, initial excess 70", () => {
    expect(COOLING).toEqual({ theta0: 90, surround: 20 });
    expect(temperatureAt(0)).toBe(90);
    expect(excessAt(0)).toBe(70);
  });

  it("obeys dθ/dt = −k(θ − 20) with k > 0", () => {
    expect(K_PER_MIN).toBeGreaterThan(0);
    for (const t of [0, 5, 17, 33]) {
      const h = 1e-5;
      const rate = (temperatureAt(t + h) - temperatureAt(t - h)) / (2 * h);
      expect(rate).toBeCloseTo(-K_PER_MIN * (temperatureAt(t) - 20), 6);
    }
  });

  it("equal 10-minute steps halve the excess: 70, 35, 17.5, 8.75 (θ = 90, 55, 37.5, 28.75)", () => {
    expect(HALVING_MIN).toBe(10);
    expect(MARKS).toEqual([0, 10, 20, 30]);
    const ex = MARKS.map(excessAt);
    [70, 35, 17.5, 8.75].forEach((v, i) => expect(ex[i]).toBeCloseTo(v, 9));
    [90, 55, 37.5, 28.75].forEach((v, i) => expect(temperatureAt(MARKS[i])).toBeCloseTo(v, 9));
    for (let i = 1; i < ex.length; i++) expect(ex[i] / ex[i - 1]).toBeCloseTo(0.5, 12);
    // The temperatures themselves do NOT keep a ratio: 55/90 ≠ 37.5/55.
    expect(55 / 90).not.toBeCloseTo(37.5 / 55, 2);
  });

  it("falls towards 20 °C, never below it, not towards 0", () => {
    for (const t of [0, 40, 100, 400]) expect(temperatureAt(t)).toBeGreaterThan(20);
    expect(temperatureAt(400) - 20).toBeLessThan(1e-6);
  });
});
