import { describe, expect, it } from "vitest";
import {
  PANELS,
  classify,
  delta,
  eliminated,
  linePoint,
  satisfies,
  system,
} from "../src/app/notes/_components/visualizations/JeeThreePlanes";
import {
  FLAG,
  alphaDeg,
  betaDeg,
  subtendedDeg,
  tanAlpha,
  tanBeta,
  tanSubtended,
} from "../src/app/notes/_components/visualizations/JeeFlagpoleSubtended";
import {
  ORTHO_A,
  ORTHO_STEPS,
  THETA_DEG,
  apply,
  armTips,
  column,
  det2,
  dot as dot2,
  mulM,
  transpose,
} from "../src/app/notes/_components/visualizations/JeeOrthogonalRotation";
import {
  ANTENNAS,
  C as EARTH_C,
  H as MEET,
  RP,
  R_TOP,
  T_TOP,
  identicalHeightKm,
  maxDistanceKm,
  rangeKm,
  towerFoot,
} from "../src/app/notes/_components/visualizations/JeeTwoAntennas";

describe("JeeThreePlanes (jdet-statements)", () => {
  it("Δ of the concept's system is λ − 2", () => {
    for (const lam of [-1, 0, 2, 3, 5.5]) expect(delta(lam)).toBeCloseTo(lam - 2, 12);
  });

  it("③ − ② leaves (λ − 2)z = μ − 5, as the concept eliminates", () => {
    const e = eliminated(7, 9);
    expect(e.a).toBe(0);
    expect(e.b).toBe(0);
    expect(e.coeff).toBe(5);
    expect(e.rhs).toBe(4);
  });

  it("classifies the concept's three cases", () => {
    expect(classify(3, 5)).toBe("unique");
    expect(classify(-4, 100)).toBe("unique");
    expect(classify(2, 5)).toBe("infinite");
    // The self-check: λ = 2, μ = 4 gives 0·z = −1, no solution.
    expect(classify(2, 4)).toBe("none");
    expect(eliminated(2, 4)).toMatchObject({ coeff: 0, rhs: -1 });
  });

  it("each panel's sample falls in its own case, in the order point, line, none", () => {
    expect(PANELS.map((p) => p.outcome)).toEqual(["unique", "infinite", "none"]);
    for (const p of PANELS) expect(classify(p.sample.lam, p.sample.mu)).toBe(p.outcome);
    expect(PANELS[1].lines.map((l) => l.text)).toContain("x = 1, y + z = 2");
  });

  it("the line x = 1, y + z = 2 lies on all three planes when λ = 2, μ = 5, and on none of the μ = 4 system", () => {
    for (const t of [0, 1, -3, 2.5]) {
      expect(satisfies(system(2, 5), linePoint(t))).toBe(true);
      expect(satisfies(system(2, 4), linePoint(t))).toBe(false);
    }
  });

  it("λ = 3, μ = 5 has the single point (1, 2, 0)", () => {
    expect(satisfies(system(3, 5), { x: 1, y: 2, z: 0 })).toBe(true);
  });
});

describe("JeeFlagpoleSubtended (jhd-subtended)", () => {
  it("uses the worked example: 10 m flagpole on a 10 m building, 10 m away", () => {
    expect(FLAG.d as number).toBe(10);
    expect(FLAG.h1 as number).toBe(10);
    expect(FLAG.h2 as number).toBe(20);
  });

  it("the roof is at 45° and the top at tan⁻¹2", () => {
    expect(tanAlpha()).toBe(1);
    expect(alphaDeg()).toBeCloseTo(45, 10);
    expect(tanBeta()).toBe(2);
    expect(betaDeg()).toBeCloseTo((Math.atan(2) * 180) / Math.PI, 10);
  });

  it("tan(β − α) = (2 − 1)/(1 + 2) = 1/3, and β − α = tan⁻¹(1/3), about 18.4°", () => {
    expect(tanSubtended()).toBeCloseTo(1 / 3, 12);
    expect(subtendedDeg()).toBeCloseTo((Math.atan(1 / 3) * 180) / Math.PI, 10);
    expect(subtendedDeg()).toBeCloseTo(18.435, 2);
    expect(subtendedDeg()).toBeLessThan(betaDeg());
  });
});

describe("JeeOrthogonalRotation (jmat-orthogonal-matrices)", () => {
  const close = (a: number[][], b: number[][]) =>
    a.forEach((row, i) => row.forEach((v, j) => expect(v).toBeCloseTo(b[i][j], 12)));

  it("A = [[3/5, 4/5], [−4/5, 3/5]] satisfies AAᵀ = AᵀA = I and det A = 1", () => {
    expect(ORTHO_A).toEqual([
      [0.6, 0.8],
      [-0.8, 0.6],
    ]);
    close(mulM(ORTHO_A, transpose(ORTHO_A)), [
      [1, 0],
      [0, 1],
    ]);
    close(mulM(transpose(ORTHO_A), ORTHO_A), [
      [1, 0],
      [0, 1],
    ]);
    expect(det2(ORTHO_A)).toBeCloseTo(1, 12);
  });

  it("A⁻¹ = Aᵀ is the concept's answer [[3/5, −4/5], [4/5, 3/5]]", () => {
    expect(transpose(ORTHO_A)).toEqual([
      [0.6, -0.8],
      [0.8, 0.6],
    ]);
  });

  it("A sends (1, 0) and (0, 1) to its columns (3/5, −4/5) and (4/5, 3/5)", () => {
    expect(apply(ORTHO_A, { x: 1, y: 0 })).toEqual(column(ORTHO_A, 0));
    expect(apply(ORTHO_A, { x: 0, y: 1 })).toEqual(column(ORTHO_A, 1));
    expect(column(ORTHO_A, 0)).toEqual({ x: 0.6, y: -0.8 });
    expect(column(ORTHO_A, 1)).toEqual({ x: 0.8, y: 0.6 });
  });

  it("the columns are an orthonormal pair, and so are the rows", () => {
    const c1 = column(ORTHO_A, 0);
    const c2 = column(ORTHO_A, 1);
    expect(dot2(c1, c1)).toBeCloseTo(1, 12);
    expect(dot2(c2, c2)).toBeCloseTo(1, 12);
    expect(dot2(c1, c2)).toBeCloseTo(0, 12);
    const r1 = { x: ORTHO_A[0][0], y: ORTHO_A[0][1] };
    const r2 = { x: ORTHO_A[1][0], y: ORTHO_A[1][1] };
    expect(dot2(r1, r2)).toBeCloseTo(0, 12);
  });

  it("θ has cos θ = 3/5 and sin θ = 4/5 (about 53.13°)", () => {
    const t = (THETA_DEG * Math.PI) / 180;
    expect(Math.cos(t)).toBeCloseTo(0.6, 12);
    expect(Math.sin(t)).toBeCloseTo(0.8, 12);
    expect(THETA_DEG).toBeCloseTo(53.13, 2);
  });

  it("the drawn arms start on the axes and end on A's columns", () => {
    const start = armTips(0);
    expect(start.first.x).toBeCloseTo(1, 12);
    expect(start.first.y).toBeCloseTo(0, 12);
    expect(start.second.x).toBeCloseTo(0, 12);
    expect(start.second.y).toBeCloseTo(1, 12);
    const end = armTips(ORTHO_STEPS.length - 1);
    expect(end.first.x).toBeCloseTo(0.6, 12);
    expect(end.first.y).toBeCloseTo(-0.8, 12);
    expect(end.second.x).toBeCloseTo(0.8, 12);
    expect(end.second.y).toBeCloseTo(0.6, 12);
  });

  it("has 3 to 7 steps, ending on the orthogonal summary", () => {
    expect(ORTHO_STEPS.length).toBe(5);
    expect(ORTHO_STEPS[ORTHO_STEPS.length - 1].title).toBe("Orthogonal");
  });
});

describe("JeeTwoAntennas (jpcomm-two-towers)", () => {
  it("the worked example: 405 m gives 72 km, 5 m gives 8 km, d_M = 80 km", () => {
    expect(ANTENNAS.hT as number).toBe(405);
    expect(ANTENNAS.hR as number).toBe(5);
    expect(rangeKm(405)).toBeCloseTo(72, 9);
    expect(rangeKm(5)).toBeCloseTo(8, 9);
    expect(maxDistanceKm(405, 5)).toBeCloseTo(80, 9);
  });

  it("adding the heights first gives the wrong 72.4 km", () => {
    expect(rangeKm(410)).toBeCloseTo(72.44, 2);
    expect(Math.round(rangeKm(410) * 10) / 10).toBe(72.4);
  });

  it("matches the concept's other numbers", () => {
    expect(rangeKm(20)).toBeCloseTo(16, 9);
    expect(rangeKm(45)).toBeCloseTo(24, 9);
    expect(maxDistanceKm(20, 20)).toBeCloseTo(32, 9);
    expect(maxDistanceKm(5, 20)).toBeCloseTo(24, 9);
    expect(maxDistanceKm(45, 45)).toBeCloseTo(48, 9);
    expect(identicalHeightKm(160)).toBeCloseTo(0.5, 12);
  });

  it("the schematic: the horizons meet on the circle, the line of sight is level there, each tower stands on the circle", () => {
    expect(Math.hypot(MEET.x - EARTH_C.x, MEET.y - EARTH_C.y)).toBeCloseTo(RP, 9);
    expect(T_TOP.y as number).toBe(MEET.y);
    expect(R_TOP.y as number).toBe(MEET.y);
    for (const top of [T_TOP, R_TOP]) {
      const f = towerFoot(top);
      expect(Math.hypot(f.x - EARTH_C.x, f.y - EARTH_C.y)).toBeCloseTo(RP, 1);
      expect(f.y).toBeGreaterThan(top.y);
    }
    // The taller tower is drawn taller.
    const hT = Math.hypot(T_TOP.x - towerFoot(T_TOP).x, T_TOP.y - towerFoot(T_TOP).y);
    const hR = Math.hypot(R_TOP.x - towerFoot(R_TOP).x, R_TOP.y - towerFoot(R_TOP).y);
    expect(hT).toBeGreaterThan(hR);
  });
});
