import { describe, expect, it } from "vitest";
import {
  CORNERS,
  ORIGINAL,
  RELATIVES,
  formText,
  negateBoth,
  swap,
  truthColumn,
} from "../src/app/notes/_components/visualizations/CetConditionalRelatives";
import {
  AXIS,
  DEFAULT_INDEX,
  KSP_AGCL,
  NACL_STEPS,
  axisX,
  exactSolubility,
  sci,
  solubility,
  valueText,
} from "../src/app/notes/_components/visualizations/CetCommonIonSolubility";
import {
  GAP_MM,
  K_RANGE,
  T_RANGE,
  capacitanceRatio,
  effectiveGap,
} from "../src/app/notes/_components/visualizations/NeetCapacitorDielectric";

describe("CetConditionalRelatives (mlog-the-three-relatives)", () => {
  it("builds the four forms the concept's table prints", () => {
    expect(formText(RELATIVES.original)).toBe("p → q");
    expect(formText(RELATIVES.converse)).toBe("q → p");
    expect(formText(RELATIVES.inverse)).toBe("∼p → ∼q");
    expect(formText(RELATIVES.contrapositive)).toBe("∼q → ∼p");
  });

  it("the square's moves: across swaps, down negates, a diagonal does both", () => {
    expect(swap(ORIGINAL)).toEqual(RELATIVES.converse);
    expect(negateBoth(ORIGINAL)).toEqual(RELATIVES.inverse);
    expect(swap(RELATIVES.inverse)).toEqual(RELATIVES.contrapositive);
    expect(negateBoth(RELATIVES.converse)).toEqual(RELATIVES.contrapositive);
    // Converse and inverse are each the contrapositive of the other.
    expect(swap(negateBoth(RELATIVES.converse))).toEqual(RELATIVES.inverse);
    expect(swap(negateBoth(RELATIVES.inverse))).toEqual(RELATIVES.converse);
  });

  it("only the contrapositive shares the original's truth value; converse and inverse match each other", () => {
    // Rows TT, TF, FT, FF.
    expect(truthColumn(RELATIVES.original)).toBe("TFTT");
    expect(truthColumn(RELATIVES.contrapositive)).toBe("TFTT");
    expect(truthColumn(RELATIVES.converse)).toBe("TTFT");
    expect(truthColumn(RELATIVES.inverse)).toBe("TTFT");
  });

  it("colours corners by the pair whose truth columns agree, original top left", () => {
    expect(CORNERS.map((c) => c.name)).toEqual(["original", "converse", "inverse", "contrapositive"]);
    for (const a of CORNERS) {
      for (const b of CORNERS) {
        const same = truthColumn(RELATIVES[a.name]) === truthColumn(RELATIVES[b.name]);
        expect(a.pair === b.pair).toBe(same);
      }
    }
    // Converse across from the original, inverse below it, contrapositive on the diagonal.
    const pos = Object.fromEntries(CORNERS.map((c) => [c.name, c]));
    expect(pos.converse.y).toBe(pos.original.y);
    expect(pos.inverse.x).toBe(pos.original.x);
    expect(pos.contrapositive.x).toBe(pos.converse.x);
    expect(pos.contrapositive.y).toBe(pos.inverse.y);
  });
});

describe("CetCommonIonSolubility (cetie-ksp-common-ion-effect)", () => {
  it("uses the worked example: AgCl Ksp 1.8 × 10⁻¹⁰, opening in 0.1 M NaCl", () => {
    expect(KSP_AGCL).toBe(1.8e-10);
    expect(NACL_STEPS[DEFAULT_INDEX]).toBe(0.1);
    expect(solubility(KSP_AGCL, 0.1)).toBeCloseTo(1.8e-9, 20);
    expect(valueText(0.1)).toBe("1.8 × 10⁻⁹");
  });

  it("pure water gives √Ksp = 1.34 × 10⁻⁵ M, as the concept's answer says", () => {
    expect(solubility(KSP_AGCL, 0)).toBeCloseTo(1.3416e-5, 9);
    expect(valueText(0)).toBe("1.34 × 10⁻⁵");
  });

  it("the other slider steps follow S = Ksp ÷ C", () => {
    expect(valueText(0.01)).toBe("1.8 × 10⁻⁸");
    expect(valueText(0.001)).toBe("1.8 × 10⁻⁷");
    expect(sci(1e-10, 0)).toBe("1 × 10⁻¹⁰");
  });

  it("[Cl⁻] ≈ C is fair at every step: the exact root agrees within 1%", () => {
    for (const c of NACL_STEPS) {
      if ((c as number) === 0) continue;
      const approx = solubility(KSP_AGCL, c);
      expect(Math.abs(exactSolubility(KSP_AGCL, c) - approx) / approx).toBeLessThan(0.01);
    }
  });

  it("a common ion always lowers solubility, and the log axis puts lower S further right", () => {
    const values = NACL_STEPS.map((c) => solubility(KSP_AGCL, c));
    for (let i = 1; i < values.length; i++) {
      expect(values[i]).toBeLessThan(values[i - 1]);
      expect(axisX(values[i])).toBeGreaterThan(axisX(values[i - 1]));
    }
    for (const v of values) {
      expect(axisX(v)).toBeGreaterThan(AXIS.x0);
      expect(axisX(v)).toBeLessThan(AXIS.x1);
    }
  });
});

describe("neet-capacitor-dielectric borrowed for cetp-dielectric-slab", () => {
  it("matches the concept's worked example: 4 mm gap, 2 mm slab, K = 4 gives 2.5 mm and 1.6 times", () => {
    expect(GAP_MM).toBe(4);
    expect(effectiveGap(4, 2, 4)).toBe(2.5);
    expect(capacitanceRatio(4, 2, 4)).toBeCloseTo(1.6, 10);
    // The sliders can reach t = 2 mm and K = 4.
    expect((2 - T_RANGE.min) % T_RANGE.step).toBe(0);
    expect((4 - K_RANGE.min) % K_RANGE.step).toBe(0);
    expect(4).toBeLessThanOrEqual(K_RANGE.max);
  });

  it("d − t + t/K equals the concept's d − t(1 − 1/K), and a practice item's 20/7", () => {
    for (const [d, t, K] of [
      [4, 2, 4],
      [4, 1, 2],
      [4, 3, 5.5],
    ]) {
      expect(effectiveGap(d, t, K)).toBeCloseTo(d - t * (1 - 1 / K), 12);
    }
    // 100 cm² plates, 4 mm gap, 1 mm slab of K = 2: C = ε₀A/(3.5 mm) = (20/7)ε₀.
    expect(0.01 / (effectiveGap(4, 1, 2) / 1000)).toBeCloseTo(20 / 7, 10);
  });
});
