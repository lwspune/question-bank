import { describe, expect, it } from "vitest";
import { LEGS, NET_WORK, PV_POINTS, legWork, loopSignedArea } from "../src/app/notes/_components/visualizations/JeePvWorkArea";
import {
  EXAMPLE_RANGE,
  EXAMPLE_WORK,
  STEP_AREAS,
  STEP_WORK,
  exampleAntiderivative,
  exampleForce,
} from "../src/app/notes/_components/visualizations/JeeForceDisplacementArea";
import {
  MATERIALS,
  WORKED_POINT,
  strainAt,
  strainStressSlope,
  stressAt,
  stressStrainSlope,
} from "../src/app/notes/_components/visualizations/JeeStressStrain";
import {
  DISC,
  I_DIAMETER,
  I_NORMAL,
  I_TANGENT,
  discDiameter,
  discNormal,
  gyrationSquared,
  parallelAxis,
} from "../src/app/notes/_components/visualizations/JeeParallelAxis";
import { EQUAL_X, SHM, equalTimes, kOfT, kOfX, periodAverage, uOfT, uOfX } from "../src/app/notes/_components/visualizations/JeeShmEnergyGraphs";
import {
  DEFAULT_I,
  I_RANGE,
  PRISM,
  deviationCurve,
  grazingIncidence,
  minDeviation,
  muFromMinDeviation,
  rayGeometry,
  trace,
} from "../src/app/notes/_components/visualizations/JeePrismMinDeviation";
import { BE_POINTS, beAt, fissionRelease, peak } from "../src/app/notes/_components/visualizations/JeeBindingEnergyCurve";
import { DEFAULT_T, F_MAX, GAS, T_RANGE, V_MAX, curvePoints, maxwell, speeds } from "../src/app/notes/_components/visualizations/JeeMaxwellSpeeds";

// JEE Mains Physics notes figures, task phys-a (scripts/notes/CET_VISUALS_BRIEF.md,
// run for JEE). Each figure draws its concept's own numbers, so those numbers are pinned here.

describe("work as the area under a P–V path (jpthermo-work-area)", () => {
  it("uses the worked example: A (1 L, 500 kPa), B (5 L, 200 kPa), C (1 L, 200 kPa)", () => {
    expect(PV_POINTS).toEqual({ A: { V: 1, P: 500 }, B: { V: 5, P: 200 }, C: { V: 1, P: 200 } });
  });

  it("gives +1400 J for the sloping expansion, −800 J for the leftward isobar and 0 for the isochore", () => {
    expect(legWork(PV_POINTS.A, PV_POINTS.B)).toBe(1400); // ½(500 + 200)(5 − 1)
    expect(legWork(PV_POINTS.B, PV_POINTS.C)).toBe(-800); // 200 × (1 − 5)
    expect(legWork(PV_POINTS.C, PV_POINTS.A)).toBe(0);
    expect(LEGS.map((l) => `${l.from}${l.to}`)).toEqual(["AB", "BC", "CA"]);
    expect(LEGS.map((l) => l.work)).toEqual([1400, -800, 0]);
    // The practice item: 2 L to 6 L at a steady 150 kPa is 600 J.
    expect(legWork({ V: 2, P: 150 }, { V: 6, P: 150 })).toBe(600);
  });

  it("makes the loop's net work the enclosed triangle, positive because it runs clockwise", () => {
    expect(NET_WORK).toBe(600);
    expect(0.5 * 4 * 300).toBe(600);
    const signed = loopSignedArea([PV_POINTS.A, PV_POINTS.B, PV_POINTS.C]);
    expect(signed).toBe(-600); // clockwise with V across and P up
    expect(-signed).toBe(NET_WORK);
  });

  it("counts any leftward leg as negative, however high the pressure", () => {
    expect(legWork({ V: 5, P: 900 }, { V: 1, P: 900 })).toBeLessThan(0);
  });
});

describe("work as the area under an F–x graph (jpwep-force-integral)", () => {
  it("uses the worked example F = 6x² − 4x from x = 1 m to 3 m: 36 J", () => {
    expect(EXAMPLE_RANGE).toEqual({ from: 1, to: 3 });
    expect(exampleForce(1)).toBe(2);
    expect(exampleForce(3)).toBe(42);
    expect(exampleAntiderivative(3)).toBe(36); // 54 − 18
    expect(exampleAntiderivative(1)).toBe(0); // 2 − 2
    expect(EXAMPLE_WORK).toBe(36);
  });

  it("matches the shaded area found by adding thin strips", () => {
    let s = 0;
    const n = 20000;
    for (let k = 0; k < n; k++) s += exampleForce(1 + ((k + 0.5) * 2) / n) * (2 / n);
    expect(s).toBeCloseTo(36, 5);
  });

  it("subtracts the area below the axis: +20 J − 10 J = 10 J, not 30 J", () => {
    expect(STEP_AREAS).toEqual([20, -10]);
    expect(STEP_WORK).toBe(10);
    expect(STEP_AREAS.reduce((s, a) => s + Math.abs(a), 0)).toBe(30);
  });
});

describe("reading Young's modulus off a graph (jpsolid-material-graphs)", () => {
  const [steel, copper] = MATERIALS;

  it("uses steel 2 × 10¹¹ and copper 1 × 10¹¹ N/m², and the worked example's steel point", () => {
    expect(steel).toEqual({ name: "steel", Y: 2e11 });
    expect(copper).toEqual({ name: "copper", Y: 1e11 });
    expect(WORKED_POINT.stress / WORKED_POINT.strain).toBeCloseTo(2e11, -6); // 8 × 10⁷ / 4 × 10⁻⁴
    expect(stressAt(4, steel.Y)).toBeCloseTo(8, 9); // strain 4 × 10⁻⁴ gives 8 × 10⁷ N/m²
  });

  it("makes steel steeper on stress against strain (slope Y)", () => {
    expect(stressStrainSlope(steel.Y)).toBeGreaterThan(stressStrainSlope(copper.Y));
    expect(stressAt(5, steel.Y)).toBeCloseTo(10, 9);
    expect(stressAt(5, copper.Y)).toBeCloseTo(5, 9);
  });

  it("reverses the order on strain against stress (slope 1/Y): copper is steeper", () => {
    expect(strainStressSlope(copper.Y)).toBeGreaterThan(strainStressSlope(steel.Y));
    expect(strainAt(10, copper.Y)).toBeCloseTo(10, 9);
    expect(strainAt(10, steel.Y)).toBeCloseTo(5, 9);
  });

  it("agrees with the self-check: slope 10⁻⁵ m/N on a 2 m, 1 mm² wire gives 2 × 10¹¹ N/m²", () => {
    expect(2 / (1e-6 * 1e-5)).toBeCloseTo(2e11, -6);
  });
});

describe("parallel and perpendicular axes (jprot-parallel-axis)", () => {
  it("uses the worked example's disc, 2 kg and 0.3 m", () => {
    expect(DISC).toEqual({ M: 2, R: 0.3 });
  });

  it("gives ¼MR² = 0.045 about a diameter and ½MR² = 0.09 about the normal axis, the sum of two diameters", () => {
    expect(I_DIAMETER).toBeCloseTo(0.045, 12);
    expect(I_NORMAL).toBeCloseTo(0.09, 12);
    expect(I_NORMAL).toBeCloseTo(2 * I_DIAMETER, 12); // Iz = Ix + Iy
    expect(discNormal(1, 1)).toBe(0.5);
    expect(discDiameter(1, 1)).toBe(0.25);
  });

  it("moves to the tangent: 0.045 + 2 × 0.3² = 0.225 kg m² = (5/4)MR²", () => {
    expect(I_TANGENT).toBeCloseTo(0.225, 12);
    expect(I_TANGENT).toBeCloseTo(1.25 * DISC.M * DISC.R ** 2, 12);
    expect(parallelAxis(0, 3, 2)).toBe(12);
  });

  it("agrees with the self-check: k² = 300 + 10² = 400 cm², k = 20 cm", () => {
    expect(gyrationSquared(3600 / 12, 10)).toBe(400);
    expect(Math.sqrt(gyrationSquared(300, 10))).toBe(20);
  });
});

describe("energy graphs in SHM (jposc-energy-graphs)", () => {
  it("uses E = 8 J (practice item) and T = 0.2 s (self-check)", () => {
    expect(SHM).toEqual({ E: 8, T: 0.2 });
  });

  it("against x: two parabolas that add to E, equal only at ±A/√2, each then E/2 = 4 J", () => {
    for (const u of [-1, -0.6, 0, 0.3, 1]) expect(kOfX(u) + uOfX(u)).toBeCloseTo(8, 12);
    expect(uOfX(0)).toBe(0);
    expect(kOfX(0)).toBe(8);
    expect(kOfX(1)).toBeCloseTo(0, 12);
    for (const u of EQUAL_X) {
      expect(uOfX(u)).toBeCloseTo(4, 12);
      expect(kOfX(u)).toBeCloseTo(4, 12);
    }
    expect(EQUAL_X[1]).toBeCloseTo(1 / Math.SQRT2, 12);
  });

  it("against t: K starts at E, U at 0, and each repeats every T/2 = 0.1 s", () => {
    expect(kOfT(0)).toBeCloseTo(8, 12);
    expect(uOfT(0)).toBeCloseTo(0, 12);
    expect(kOfT(SHM.T / 4)).toBeCloseTo(0, 12);
    expect(uOfT(SHM.T / 4)).toBeCloseTo(8, 12);
    for (const t of [0.013, 0.04, 0.07]) {
      expect(kOfT(t + SHM.T / 2)).toBeCloseTo(kOfT(t), 9);
      expect(uOfT(t + SHM.T / 2)).toBeCloseTo(uOfT(t), 9);
    }
    // never negative
    for (let k = 0; k <= 200; k++) expect(uOfT((k * SHM.T) / 200)).toBeGreaterThanOrEqual(-1e-12);
  });

  it("has K = U at four instants per period, T/8, 3T/8, 5T/8, 7T/8", () => {
    const ts = equalTimes();
    expect(ts).toHaveLength(4);
    [0.025, 0.075, 0.125, 0.175].forEach((t, k) => expect(ts[k]).toBeCloseTo(t, 12));
    for (const t of ts) expect(kOfT(t)).toBeCloseTo(uOfT(t), 9);
  });

  it("averages each energy to E/2 = 4 J over a period", () => {
    expect(periodAverage((t) => kOfT(t))).toBeCloseTo(4, 6);
    expect(periodAverage((t) => uOfT(t))).toBeCloseTo(4, 6);
  });
});

describe("prism and minimum deviation (jpray-min-deviation)", () => {
  it("uses the worked example: A = 60°, μ = sin 50°/sin 30° = 0.766/0.5 ≈ 1.53, opening at i = 50°", () => {
    expect(PRISM.A).toBe(60);
    expect(PRISM.mu).toBeCloseTo(1.532, 9);
    expect(muFromMinDeviation(60, 40)).toBeCloseTo(1.532, 3);
    expect(DEFAULT_I).toBe(50);
  });

  it("at i = 50° the ray passes symmetrically: r₁ = r₂ = 30°, e = 50°, δ = 40°", () => {
    const t = trace(50)!;
    expect(t.r1.toFixed(1)).toBe("30.0");
    expect(t.r2.toFixed(1)).toBe("30.0");
    expect(t.e.toFixed(1)).toBe("50.0");
    expect(t.delta.toFixed(1)).toBe("40.0");
    // parallel to the base inside
    expect(Math.abs(rayGeometry(t).insideAngle)).toBeLessThan(0.01);
    const g = rayGeometry(t);
    expect(g.exit.y).toBeCloseTo(g.entry.y, 1);
  });

  it("finds the minimum at i = (A + δm)/2 = 50°, δm = 40°, and the curve's lowest point agrees", () => {
    const m = minDeviation();
    expect(m.i.toFixed(0)).toBe("50");
    expect(m.delta.toFixed(1)).toBe("40.0");
    const curve = deviationCurve();
    const low = curve.reduce((a, b) => (b.delta < a.delta ? b : a));
    expect(Math.abs(low.i - 50)).toBeLessThanOrEqual(0.5);
    expect(low.delta).toBeGreaterThanOrEqual(m.delta - 1e-9);
  });

  it("keeps r₁ + r₂ = A and δ = i + e − A for every i on the slider", () => {
    for (let i = I_RANGE.min; i <= I_RANGE.max; i += 7) {
      const t = trace(i)!;
      expect(t.r1 + t.r2).toBeCloseTo(60, 9);
      expect(t.delta).toBeCloseTo(t.i + t.e - 60, 9);
      expect(t.delta).toBeGreaterThanOrEqual(minDeviation().delta - 1e-9);
    }
  });

  it("reaches each larger deviation at two values of i, which swap roles as i and e", () => {
    const t = trace(40)!;
    const back = trace(t.e)!;
    expect(back.e).toBeCloseTo(40, 6);
    expect(back.delta).toBeCloseTo(t.delta, 6);
  });

  it("starts the slider just above grazing emergence (about 30.3°), where the ray can still leave", () => {
    expect(grazingIncidence()).toBeCloseTo(30.34, 1);
    expect(I_RANGE.min).toBeGreaterThan(grazingIncidence());
    expect(trace(30)).toBeNull();
    expect(trace(I_RANGE.min)).not.toBeNull();
  });

  it("agrees with the self-check: μ = 1.2 in an equilateral prism gives δm ≈ 13.7°", () => {
    expect(minDeviation(60, 1.2).delta).toBeCloseTo(13.7, 1);
  });
});

describe("binding energy per nucleon (jpnuc-be-curve)", () => {
  it("peaks near A = 56 at about 8.8 MeV", () => {
    const p = peak();
    expect(p.A).toBe(56);
    expect(p.be.toFixed(1)).toBe("8.8");
  });

  it("quotes the concept's values: ²H about 1.1, ⁴He near 7, A = 120 about 8.5, uranium and A = 240 about 7.6", () => {
    expect(beAt(2).toFixed(1)).toBe("1.1");
    expect(Math.round(beAt(4))).toBe(7);
    expect(beAt(4)).toBeGreaterThan(beAt(6)); // the helium spike
    expect(beAt(120).toFixed(1)).toBe("8.5");
    expect(beAt(238).toFixed(1)).toBe("7.6");
    expect(beAt(240).toFixed(1)).toBe("7.6");
  });

  it("is nearly flat, about 8 MeV, from A = 30 to 170, and falls steadily beyond the peak", () => {
    for (const p of BE_POINTS.filter((q) => q.A >= 30 && q.A <= 170)) {
      expect(p.be).toBeGreaterThan(8.2);
      expect(p.be).toBeLessThan(8.8);
    }
    const heavy = BE_POINTS.filter((q) => q.A >= 56);
    for (let k = 1; k < heavy.length; k++) expect(heavy[k].be).toBeLessThan(heavy[k - 1].be);
  });

  it("agrees with the self-check: 240 → 2 × 120 rises on the curve, so energy is released", () => {
    expect(beAt(120) - beAt(240)).toBeCloseTo(0.94, 2);
    expect(fissionRelease(240)).toBeGreaterThan(0);
    expect(fissionRelease(240)).toBeCloseTo(2040 - 240 * 7.56, 6); // about 226 MeV, "roughly 200 MeV"
  });
});

describe("Maxwell distribution and the three speeds (jpktg-speed-types)", () => {
  it("uses the worked example: helium, M = 0.004 kg/mol, at 400 K with R = 8.3", () => {
    expect(GAS).toEqual({ R: 8.3, M: 0.004 });
    expect(DEFAULT_T).toBe(400);
    const s = speeds(400);
    expect(Math.round(s.base)).toBe(911); // √830 000
    expect(Math.round(s.vp)).toBe(1288);
    expect(Math.round(s.vavg)).toBe(1454);
    expect(Math.round(s.vrms)).toBe(1578);
  });

  it("keeps vp < average < rms in the ratio 1 : 1.128 : 1.225 at every temperature", () => {
    for (const T of [T_RANGE.min, 400, T_RANGE.max]) {
      const s = speeds(T);
      expect(s.vp).toBeLessThan(s.vavg);
      expect(s.vavg).toBeLessThan(s.vrms);
      expect((s.vavg / s.vp).toFixed(3)).toBe("1.128");
      expect((s.vrms / s.vp).toFixed(3)).toBe("1.225");
    }
  });

  it("peaks at the most probable speed √(2RT/M)", () => {
    const pts = curvePoints(400, 4000);
    const top = pts.reduce((a, b) => (b.f > a.f ? b : a));
    expect(Math.abs(top.v - speeds(400).vp)).toBeLessThan(V_MAX / 4000 + 1e-9);
  });

  it("holds all the molecules (area 1), and a hotter gas has a lower, later peak that still fits the plot", () => {
    const n = 8000;
    let area = 0;
    for (let k = 0; k < n; k++) area += maxwell(((k + 0.5) * V_MAX) / n, 400) * (V_MAX / n);
    expect(area).toBeCloseTo(1, 3);
    const cold = speeds(T_RANGE.min).vp;
    const hot = speeds(T_RANGE.max).vp;
    expect(hot).toBeGreaterThan(cold);
    expect(maxwell(hot, T_RANGE.max)).toBeLessThan(maxwell(cold, T_RANGE.min));
    expect(maxwell(cold, T_RANGE.min)).toBeLessThan(F_MAX);
  });
});
