import { describe, expect, it } from "vitest";
import {
  DEFAULT_I,
  I_RANGE,
  PRISM,
  deviationCurve,
  grazingIncidence,
  minDeviation,
  nFromMinDeviation,
  rayGeometry,
  thinPrismDeviation,
  trace,
} from "../src/app/notes/_components/visualizations/NeetPrismDeviation";
import { LEVELS, LINE_ANGLES, PLANES, fieldBetween, lineDotTangent, radiusAt } from "../src/app/notes/_components/visualizations/NeetEquipotentials";
import {
  DEFAULTS,
  GAP_MM,
  K_RANGE,
  LINES,
  capacitanceRatio,
  effectiveGap,
  layeredRatio,
  linesThroughSlab,
  throughIndices,
} from "../src/app/notes/_components/visualizations/NeetCapacitorDielectric";
import { ENERGY_GAP, MARKS, dihedralAngle, energyCurve, formAt, torsionalEnergy } from "../src/app/notes/_components/visualizations/NeetEthaneConformations";
import { LADDER, alkylGroups, alphaHydrogens } from "../src/app/notes/_components/visualizations/NeetCarbocationStability";
import {
  ISOTHERM_PV,
  L_ATM_IN_J,
  SELF_CHECK,
  isothermP,
  isothermWorkLatm,
  reversibleIsothermalWork,
  workAgainstConstant,
} from "../src/app/notes/_components/visualizations/NeetChemPvWork";

// NEET Physics + Chemistry notes figures, task pc (scripts/notes/CET_VISUALS_BRIEF.md,
// run for NEET). Each figure draws its concept's own numbers, so those numbers are pinned here.

describe("prism deviation (nphro-deviation)", () => {
  it("uses the worked example: A = 60°, D_m = 30°, so n = sin 45°/sin 30° = √2, opening at i = 45°", () => {
    expect(PRISM.A).toBe(60);
    expect(PRISM.n).toBeCloseTo(Math.SQRT2, 12);
    expect(nFromMinDeviation(60, 30)).toBeCloseTo(Math.SQRT2, 12);
    expect(DEFAULT_I).toBe(45);
  });

  it("at i = 45° the ray passes symmetrically: r₁ = r₂ = 30°, e = 45°, δ = 30°, parallel to the base", () => {
    const t = trace(45)!;
    expect(t.r1).toBeCloseTo(30, 9);
    expect(t.r2).toBeCloseTo(30, 9);
    expect(t.e).toBeCloseTo(45, 9);
    expect(t.delta).toBeCloseTo(30, 9);
    const g = rayGeometry(t);
    expect(Math.abs(g.insideAngle)).toBeLessThan(1e-9);
    expect(g.exit.y).toBeCloseTo(g.entry.y, 1);
  });

  it("finds D_m = 2i − A = 30° at i = (A + D_m)/2 = 45°, and the curve's lowest point agrees", () => {
    const m = minDeviation();
    expect(m.i).toBeCloseTo(45, 9);
    expect(m.Dm).toBeCloseTo(30, 9);
    const low = deviationCurve().reduce((a, b) => (b.delta < a.delta ? b : a));
    expect(Math.abs(low.i - 45)).toBeLessThanOrEqual(0.5);
    expect(low.delta).toBeGreaterThanOrEqual(m.Dm - 1e-9);
  });

  it("keeps r₁ + r₂ = A and δ = i + e − A for every i on the slider, never below D_m", () => {
    for (let i: number = I_RANGE.min; i <= I_RANGE.max; i += 4) {
      const t = trace(i)!;
      expect(t.r1 + t.r2).toBeCloseTo(60, 9);
      expect(t.delta).toBeCloseTo(t.i + t.e - 60, 9);
      expect(t.delta).toBeGreaterThanOrEqual(30 - 1e-9);
    }
  });

  it("reaches each larger deviation at two values of i, which swap roles as i and e", () => {
    const t = trace(30)!;
    const back = trace(t.e)!;
    expect(back.e).toBeCloseTo(30, 6);
    expect(back.delta).toBeCloseTo(t.delta, 6);
  });

  it("starts the slider just above grazing emergence, about 21.5° (r₁ = 60° − 45° = 15°)", () => {
    expect(grazingIncidence()).toBeCloseTo(21.47, 1);
    expect(I_RANGE.min).toBeGreaterThan(grazingIncidence());
    expect(trace(21)).toBeNull();
    expect(trace(I_RANGE.min)).not.toBeNull();
  });

  it("agrees with the practice set and the self-check", () => {
    expect(minDeviation(60, Math.sqrt(3)).Dm).toBeCloseTo(60, 9); // n = √3 gives D_m = 60°
    const i35 = (Math.asin(Math.SQRT2 * Math.sin((35 * Math.PI) / 180)) * 180) / Math.PI;
    expect(trace(i35)!.r2).toBeCloseTo(25, 9); // r₁ = 35° gives r₂ = 25°
    expect(thinPrismDeviation(5, 1.6)).toBeCloseTo(3, 12); // self-check: 0.6 × 5° = 3°
    expect(thinPrismDeviation(4, 1.5)).toBeCloseTo(2, 12); // practice: n = 1.5
  });
});

describe("equipotential surfaces (nphep-equipotential)", () => {
  it("draws the point charge's circles at equal steps of V (V ∝ 1/r), crowding near the charge", () => {
    expect([...LEVELS]).toEqual([4, 3, 2, 1]);
    const radii = LEVELS.map((v) => radiusAt(v));
    expect(radii).toEqual([18, 24, 36, 72]);
    for (let k = 1; k < LEVELS.length; k++) expect((LEVELS[k - 1] as number) - (LEVELS[k] as number)).toBe(1);
    const gaps = radii.slice(1).map((r, k) => r - radii[k]);
    expect(gaps).toEqual([6, 12, 36]);
    for (let k = 1; k < gaps.length; k++) expect(gaps[k]).toBeGreaterThan(gaps[k - 1]);
  });

  it("makes every radial field line cross its circle at right angles", () => {
    for (const a of LINE_ANGLES) expect(lineDotTangent(a)).toBeCloseTo(0, 12);
  });

  it("uses the worked example: 30 V and 10 V planes 5 cm apart give 400 V/m, pointing to lower V", () => {
    expect(PLANES.map((p) => p.V)).toEqual([30, 20, 10]);
    expect(PLANES.map((p) => p.xCm)).toEqual([0, 2.5, 5]);
    expect(fieldBetween(30, 10, 0.05)).toBeCloseTo(400, 9);
    expect(fieldBetween(30, 20, 0.025)).toBeCloseTo(400, 9); // equal steps at equal gaps
    for (let k = 1; k < PLANES.length; k++) expect(PLANES[k].V).toBeLessThan(PLANES[k - 1].V);
    expect(fieldBetween(2, 0, 0.01)).toBeCloseTo(200, 9); // practice: 2 V per 1 cm
  });
});

describe("dielectric slab in a capacitor (nphep-dielectric)", () => {
  it("opens on the worked example: d = 4 mm, t = 2 mm, K = 2 gives d − t + t/K = 3 mm and C/C₀ = 4/3", () => {
    expect(GAP_MM).toBe(4);
    expect(DEFAULTS).toEqual({ t: 2, K: 2 });
    expect(effectiveGap(4, 2, 2)).toBe(3);
    expect(capacitanceRatio(4, 2, 2)).toBeCloseTo(4 / 3, 12);
  });

  it("gives C = KC₀ with the gap full and C₀ with no slab", () => {
    for (let K: number = K_RANGE.min; K <= K_RANGE.max; K += K_RANGE.step) {
      expect(capacitanceRatio(4, 4, K)).toBeCloseTo(K, 12);
      expect(capacitanceRatio(4, 0, K)).toBe(1);
    }
    expect(capacitanceRatio(4, 4, 3)).toBeCloseTo(3, 12); // practice: K = 3, gap full
    expect(4 * 5 * 10).toBe(200); // self-check: 20 μF on 10 V holds 200 μC
  });

  it("matches the layered formula with the air left over counted as K = 1", () => {
    expect(layeredRatio(4, [{ t: 2, K: 2 }, { t: 2, K: 1 }])).toBeCloseTo(capacitanceRatio(4, 2, 2), 12);
  });

  it("draws about 1/K of the lines through the slab, spread across distinct places", () => {
    expect(LINES).toBe(12);
    expect(linesThroughSlab(1)).toBe(12);
    expect(linesThroughSlab(2)).toBe(6);
    expect(linesThroughSlab(4)).toBe(3);
    for (let K: number = K_RANGE.min; K <= K_RANGE.max; K += K_RANGE.step) {
      const idx = throughIndices(linesThroughSlab(K));
      expect(new Set(idx).size).toBe(idx.length);
      for (const k of idx) {
        expect(k).toBeGreaterThanOrEqual(0);
        expect(k).toBeLessThan(LINES);
      }
    }
  });
});

describe("conformations of ethane (nchhc-conformations)", () => {
  it("puts eclipsed 12.5 kJ/mol above staggered", () => {
    expect(ENERGY_GAP).toBe(12.5);
    expect(torsionalEnergy(0)).toBeCloseTo(0, 12);
    expect(torsionalEnergy(60)).toBeCloseTo(12.5, 12);
  });

  it("follows the worked example: staggered (60°), turn 60° to eclipsed (0°), a further 60° to staggered", () => {
    expect(formAt(0)).toBe("staggered");
    expect(dihedralAngle(0)).toBe(60);
    expect(formAt(60)).toBe("eclipsed");
    expect(dihedralAngle(60)).toBe(0);
    expect(formAt(120)).toBe("staggered");
    expect(dihedralAngle(120)).toBe(60);
    expect(formAt(30)).toBe("between");
  });

  it("has minima at staggered and maxima at eclipsed, alternating every 60°", () => {
    expect([...MARKS]).toEqual([0, 60, 120, 180, 240, 300, 360]);
    MARKS.forEach((m, k) => {
      expect(formAt(m)).toBe(k % 2 === 0 ? "staggered" : "eclipsed");
      expect(torsionalEnergy(m)).toBeCloseTo(k % 2 === 0 ? 0 : 12.5, 9);
    });
    for (const p of energyCurve(1)) {
      expect(p.e).toBeGreaterThanOrEqual(-1e-9);
      expect(p.e).toBeLessThanOrEqual(12.5 + 1e-9);
    }
  });
});

describe("carbocation stability (nchoc-carbocation)", () => {
  it("counts the concept's α-hydrogens: 9, 6, 3, 0 for 3°, 2°, 1°, methyl", () => {
    expect(LADDER.map((i) => i.cls)).toEqual(["3°", "2°", "1°", "methyl"]);
    expect(LADDER.map((i) => i.formula)).toEqual(["(CH₃)₃C⁺", "(CH₃)₂CH⁺", "CH₃CH₂⁺", "CH₃⁺"]);
    expect(LADDER.map((i) => alphaHydrogens(i.alphaCarbonH))).toEqual([9, 6, 3, 0]);
    expect(LADDER.map((i) => alkylGroups(i))).toEqual([3, 2, 1, 0]);
  });

  it("orders the ladder by falling α-H count, most stable first", () => {
    const n = LADDER.map((i) => alphaHydrogens(i.alphaCarbonH));
    for (let k = 1; k < n.length; k++) expect(n[k]).toBeLessThan(n[k - 1]);
  });

  it("never counts the H on the positive carbon, and agrees with the practice item", () => {
    expect(alphaHydrogens([3, 3])).toBe(6); // (CH₃)₂CH⁺: 6, not 7
    expect(alphaHydrogens([3, 3, 2])).toBe(8); // (CH₃)₂C⁺-CH₂CH₃
  });
});

describe("work of expansion (ncht-work)", () => {
  it("uses the self-check: 2 L to 5 L against 1 atm gives w = −3 L atm = −303.9 J", () => {
    expect(SELF_CHECK).toEqual({ Vi: 2, Vf: 5, pex: 1 });
    expect(workAgainstConstant(1, 2, 5)).toBe(-3);
    expect(L_ATM_IN_J).toBe(101.3);
    expect(workAgainstConstant(1, 2, 5) * L_ATM_IN_J).toBeCloseTo(-303.9, 9);
  });

  it("keeps the chemistry sign: compression positive, free expansion zero", () => {
    expect(workAgainstConstant(2, 6, 2)).toBe(8); // practice: +8 L atm
    expect(workAgainstConstant(0, 2, 5)).toBe(0);
  });

  it("gives the worked example: 2 mol, 300 K, 1 L to 10 L reversibly, about −11488 J", () => {
    expect(reversibleIsothermalWork(2, 8.314, 300, 1, 10)).toBeCloseTo(-11488, 0);
  });

  it("draws the reversible isotherm at higher pressure, enclosing more area than pₑₓΔV", () => {
    expect(ISOTHERM_PV).toBe(5);
    expect(isothermP(5)).toBe(1);
    expect(isothermP(2)).toBe(2.5);
    for (let V = 2; V < 5; V += 0.25) expect(isothermP(V)).toBeGreaterThanOrEqual(1);
    let area = 0;
    const n = 20000;
    for (let k = 0; k < n; k++) area += isothermP(2 + ((k + 0.5) * 3) / n) * (3 / n);
    expect(area).toBeCloseTo(-isothermWorkLatm(), 5);
    expect(-isothermWorkLatm()).toBeCloseTo(5 * Math.log(2.5), 12);
    expect(-isothermWorkLatm()).toBeGreaterThan(-workAgainstConstant(1, 2, 5));
  });
});
