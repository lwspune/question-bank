import { describe, expect, it } from "vitest";
import {
  ARROWS,
  HESS,
  HESS_STEPS,
  LEVELS,
  STEP2,
  arrowLength,
  levelY,
  partOpacity,
  secondStep,
} from "../src/app/notes/_components/visualizations/CetHessCycle";
import {
  DEFAULT_T,
  GIBBS_EXAMPLE,
  SIGN_TABLE,
  T_RANGE,
  crossoverT,
  deltaG,
  signed,
  verdict,
} from "../src/app/notes/_components/visualizations/CetGibbsSign";
import { DEFAULT_XA, PURE, XA_RANGE, raoult, snapX } from "../src/app/notes/_components/visualizations/CetRaoultTwoLiquids";
import {
  STRONG,
  STRONG_SLOPE,
  WEAK,
  WEAK_KA,
  alpha,
  strongLambda,
  weakCurve,
  weakLambda,
} from "../src/app/notes/_components/visualizations/CetMolarConductivityDilution";
import {
  FIRST_ORDER,
  HALF_LIFE_TIMES,
  K,
  LOG_SLOPE,
  logRemaining,
  remaining,
} from "../src/app/notes/_components/visualizations/CetFirstOrderPlot";
import {
  BOIL,
  BP_EXAMPLE,
  SOLVENT_FRACTION,
  kbFrom,
  molality,
  pSolution,
  pSolvent,
} from "../src/app/notes/_components/visualizations/CetBoilingPointElevation";

// MHT-CET Chemistry notes figures, task chem-c (scripts/notes/CET_VISUALS_BRIEF.md).
// Each figure draws its concept's own numbers, so those numbers are pinned here.

describe("Hess cycle (cetth-hess-law-and-enthalpy-of-solution)", () => {
  it("uses the worked example: −396 direct, −297 to SO₂, so SO₂ → SO₃ is −99 kJ", () => {
    expect(HESS).toEqual({ direct: -396, step1: -297 });
    expect(secondStep(-396, -297)).toBe(-99);
    expect(STEP2).toBe(-99);
    expect(HESS.step1 + STEP2).toBe(HESS.direct); // both routes add to the same total
  });

  it("orders the levels reactants, SO₂, SO₃ from top to bottom", () => {
    expect(LEVELS.map((l) => l.H)).toEqual([0, -297, -396]);
    expect(levelY(0)).toBeLessThan(levelY(-297));
    expect(levelY(-297)).toBeLessThan(levelY(-396));
  });

  it("draws the arrows to scale: the two steps together are as long as the direct arrow", () => {
    const sum = arrowLength(ARROWS.step1) + arrowLength(ARROWS.step2);
    expect(sum).toBeCloseTo(arrowLength(ARROWS.direct), 1);
    expect(arrowLength(ARROWS.direct)).toBeCloseTo(150, 1);
    for (const a of Object.values(ARROWS)) expect(arrowLength(a)).toBeGreaterThan(0); // all point down: heat released
  });

  it("walks the steps in order and ends on the full picture with the answer", () => {
    expect(HESS_STEPS.map((s) => s.title)).toEqual([
      "The direct route",
      "Route 2, step 1",
      "Route 2, step 2",
      "Same start, same end",
      "Solve for x",
    ]);
    expect(HESS_STEPS[4].caption).toContain("−99 kJ");
    const last = HESS_STEPS.length - 1;
    for (const p of ["direct", "step1", "mid", "step2", "answer", "sum"] as const) expect(partOpacity(p, last)).toBe(1);
    expect(partOpacity("unknown", last)).toBe(0);
    expect(partOpacity("answer", 2)).toBe(0); // the answer is not shown before it is found
  });
});

describe("Gibbs energy and temperature (cetth-gibbs-energy-and-spontaneity)", () => {
  it("uses the worked example: ΔH = +40 kJ, ΔS = +125 J/K = 0.125 kJ/K", () => {
    expect(GIBBS_EXAMPLE).toEqual({ dH: 40, dS: 0.125 });
    expect(DEFAULT_T).toBe(300);
    expect(deltaG(300)).toBeCloseTo(2.5, 9); // 40 − 37.5: not spontaneous
    expect(verdict(deltaG(300))).toBe("not spontaneous");
  });

  it("crosses zero at T = ΔH/ΔS = 320 K, and the slider can land on it", () => {
    expect(crossoverT()).toBeCloseTo(320, 9);
    expect(deltaG(320)).toBe(0);
    expect(verdict(deltaG(320))).toBe("at equilibrium");
    expect(Number.isInteger((320 - T_RANGE.min) / T_RANGE.step)).toBe(true);
    expect(verdict(deltaG(350))).toBe("spontaneous");
    expect(deltaG(350)).toBeCloseTo(-3.75, 9);
  });

  it("agrees with the concept's other numbers", () => {
    expect(deltaG(350, -60, -0.15)).toBeCloseTo(-7.5, 9); // self-check
    expect(crossoverT(-60, -0.15)).toBeCloseTo(400, 9);
    expect(crossoverT(-84.2, -0.2)).toBeCloseTo(421, 9);
    expect(deltaG(300, 7, 0.0248)).toBeCloseTo(-0.44, 9); // ice melting, units matched
  });

  it("keeps the sign table as the concept states it, with the drawn case marked", () => {
    expect(SIGN_TABLE.map((r) => [r.dH, r.dS])).toEqual([
      ["< 0", "> 0"],
      ["> 0", "< 0"],
      ["> 0", "> 0"],
      ["< 0", "< 0"],
    ]);
    expect(SIGN_TABLE.filter((r) => r.drawn).map((r) => r.when)).toEqual(["high T only (T > ΔH/ΔS)"]);
  });

  it("writes signs with a true minus", () => {
    expect(signed(2.5)).toBe("+2.5");
    expect(signed(-3.75)).toBe("−3.75");
    expect(signed(0)).toBe("0");
  });
});

describe("Raoult's law, two volatile liquids (cetsol-raoults-law-two-volatile-liquids)", () => {
  it("uses the worked example: 300 and 500 mm Hg in ratio 1 : 3 give 75 + 375 = 450", () => {
    expect(PURE).toEqual({ A: 300, B: 500 });
    expect(DEFAULT_XA).toBe(0.25);
    const r = raoult(DEFAULT_XA);
    expect(r.pA).toBeCloseTo(75, 9);
    expect(r.pB).toBeCloseTo(375, 9);
    expect(r.P).toBeCloseTo(450, 9);
    expect(r.yA).toBeCloseTo(1 / 6, 9);
  });

  it("agrees with the concept's other numbers", () => {
    expect(raoult(0.4, 420, 610).P).toBeCloseTo(534, 9);
    expect(raoult(0.3, 350, 650).P).toBeCloseTo(560, 9); // self-check, P_A° = 350
  });

  it("draws straight lines between the pure pressures", () => {
    for (let k = 0; k <= 20; k++) {
      const x = k / 20;
      expect(raoult(x).P).toBeCloseTo(500 - 200 * x, 9);
    }
    expect(raoult(0).P).toBe(500);
    expect(raoult(1).P).toBe(300);
  });

  it("keeps A, the less volatile liquid, poorer in the vapour than in the liquid", () => {
    for (const x of [0.1, 0.25, 0.5, 0.9]) expect(raoult(x).yA).toBeLessThan(x);
  });

  it("snaps slider float noise and covers 0 to 1", () => {
    expect(snapX(0.15000000000000002)).toBe(0.15);
    expect(XA_RANGE).toEqual({ min: 0, max: 1, step: 0.05 });
  });
});

describe("molar conductivity on dilution (cetec-kohlrausch-law)", () => {
  it("draws NaCl through the page's numbers: Λ₀ = 126, 110 at 0.05 M", () => {
    expect(STRONG.L0).toBe(126);
    expect(strongLambda(0)).toBe(126);
    expect(strongLambda(Math.sqrt(0.05))).toBeCloseTo(110, 9);
    expect(STRONG_SLOPE).toBeCloseTo(16 / Math.sqrt(0.05), 9);
  });

  it("draws acetic acid through Λ₀ = 390.7 and 16.5 at 0.01 M (α = 0.0422)", () => {
    expect(WEAK.L0).toBe(390.7);
    expect(alpha(16.5, 390.7).toFixed(4)).toBe("0.0422");
    expect(weakLambda(0.1)).toBeCloseTo(16.5, 6);
    expect(WEAK_KA).toBeCloseTo(1.86e-5, 7); // Ostwald: cα²/(1 − α)
  });

  it("shows the weak electrolyte rising steeply only at high dilution, below its Λ₀", () => {
    const pts = weakCurve();
    for (let i = 1; i < pts.length; i++) expect(pts[i].L).toBeLessThan(pts[i - 1].L);
    for (const p of pts) expect(p.L).toBeLessThan(WEAK.L0);
    expect(weakLambda(0.005)).toBeGreaterThan(200);
    expect(weakLambda(0.05)).toBeLessThan(40);
    expect(weakLambda(1e-6)).toBeCloseTo(WEAK.L0, 0);
  });

  it("keeps the strong electrolyte's change small beside the weak one's", () => {
    const strongChange = strongLambda(0) - strongLambda(0.25);
    const weakChange = weakLambda(0.0025) - weakLambda(0.25);
    expect(strongChange).toBeLessThan(20);
    expect(weakChange).toBeGreaterThan(250);
  });
});

describe("first-order plots (cetkin-first-order-integrated-law)", () => {
  it("uses the worked example: 75% done in 40 min, so t½ = 20 min and k = 0.0347 min⁻¹", () => {
    expect(FIRST_ORDER).toEqual({ tHalf: 20, A0: 100 });
    expect(K).toBeCloseTo(0.693 / 20, 12);
    expect(K.toFixed(3)).toBe("0.035");
    expect(remaining(40)).toBeCloseTo(25, 9); // 75% complete
    expect(remaining(60)).toBeCloseTo(12.5, 9); // 87.5% complete
  });

  it("halves in every equal half-life", () => {
    expect(HALF_LIFE_TIMES).toEqual([0, 20, 40, 60, 80]);
    expect(HALF_LIFE_TIMES.map((t) => remaining(t))).toEqual([100, 50, 25, 12.5, 6.25]);
    for (const t of [0, 7, 33, 51]) expect(remaining(t + 20) / remaining(t)).toBeCloseTo(0.5, 12);
  });

  it("makes log[A] a straight line from 2 with slope −k/2.303", () => {
    expect(logRemaining(0)).toBe(2);
    expect(LOG_SLOPE).toBeCloseTo(-K / 2.303, 12);
    expect(LOG_SLOPE.toFixed(3)).toBe("-0.015");
    for (const t of HALF_LIFE_TIMES) expect(logRemaining(t)).toBeCloseTo(Math.log10(remaining(t)), 2);
    const drops = [20, 40, 60, 80].map((t) => logRemaining(t - 20) - logRemaining(t));
    for (const d of drops) expect(d).toBeCloseTo(drops[0], 12);
  });
});

describe("boiling point elevation (cetsol-delta-tb-equals-kb-m)", () => {
  it("uses the worked example: m = (2/80)/0.05 = 0.5, Kb = 0.9/0.5 = 1.8", () => {
    expect(BP_EXAMPLE).toEqual({ soluteG: 2, M: 80, solventKg: 0.05, dTb: 0.9 });
    expect(molality(2, 80, 0.05)).toBeCloseTo(0.5, 12);
    expect(kbFrom(0.9, 0.5)).toBeCloseTo(1.8, 12);
    // Self-check: m = ΔTb/Kb = 0.26/0.52 = 0.5, then 0.5 × 0.25 kg × 60 g/mol = 7.5 g urea.
    expect(0.26 / 0.52).toBeCloseTo(0.5, 12);
    expect(molality(7.5, 60, 0.25)).toBeCloseTo(0.5, 12);
  });

  it("keeps the solution's vapour pressure below the solvent's at every temperature (Raoult)", () => {
    for (let u = 0; u <= 9; u += 0.5) {
      expect(pSolution(u)).toBeLessThan(pSolvent(u));
      expect(pSolution(u) / pSolvent(u)).toBeCloseTo(SOLVENT_FRACTION, 12);
    }
  });

  it("boils each liquid where its curve meets 1 atm, the solution at the higher temperature", () => {
    expect(pSolvent(BOIL.solvent)).toBeCloseTo(1, 12);
    expect(pSolution(BOIL.solution)).toBeCloseTo(1, 12);
    expect(BOIL.solution).toBeGreaterThan(BOIL.solvent);
    expect(pSolution(BOIL.solvent)).toBeLessThan(1); // not yet boiling at the solvent's boiling point
  });
});
