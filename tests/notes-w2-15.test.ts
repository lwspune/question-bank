import { describe, expect, it } from "vitest";
import {
  DEFAULT_R,
  MARKS,
  R_KM,
  R_RANGE,
  SURFACE_WEIGHT,
  curvePoints,
  gAtDepth,
  gAtHeight,
  gRatio,
} from "../src/app/notes/_components/visualizations/JeeGravityInsideOutside";
import { BANDS, V_EQ, phWeakAcid, phWeakBase } from "../src/app/notes/_components/visualizations/JeeIndicatorChoice";
import {
  EXAMPLE,
  LIMITING,
  LIMITING_STEPS,
  MGO_GRAMS,
  MOLES,
  O2_LEFT_GRAMS,
  QUOTIENT,
  RESULT,
  barMoles,
} from "../src/app/notes/_components/visualizations/JeeLimitingReagent";
import {
  OXOACIDS,
  basicity,
  hydrogens,
  isReducing,
  naohVolume,
  oxygens,
  phBonds,
} from "../src/app/notes/_components/visualizations/JeePhosphorusOxoacids";
import { METALS, allStates, highestState, mostStates } from "../src/app/notes/_components/visualizations/JeeOxidationStates3d";
import { ROWS, dissolvesInAlkali, nhInProduct } from "../src/app/notes/_components/visualizations/JeeHinsbergTest";
import { BAR_X, FACTORS, PER_PCT, contribution, maxPercentError, stackStarts } from "../src/app/notes/_components/visualizations/JeeErrorPowers";
import {
  EQUATION,
  HALOFORM_STEPS,
  KETONE,
  LEAVE,
  PRODUCTS,
  groupOffset,
  iodineBalance,
  sodiumBalance,
} from "../src/app/notes/_components/visualizations/JeeHaloform";

describe("JeeGravityInsideOutside (jpgrav-g-depth)", () => {
  it("opens at the worked example: depth 1280 km gives 0.8g", () => {
    expect(DEFAULT_R).toBe(0.8);
    expect(Math.round((1 - DEFAULT_R) * R_KM)).toBe(1280);
    expect(gRatio(DEFAULT_R)).toBeCloseTo(0.8, 10);
    expect(gAtDepth(1280)).toBeCloseTo(0.8, 10);
  });

  it("inside, g falls in a straight line: R/2 gives g/2, R/4 gives 3g/4, zero at the centre", () => {
    expect(gRatio(0)).toBe(0);
    expect(gAtDepth(R_KM / 2)).toBeCloseTo(0.5, 10);
    expect(gAtDepth(R_KM / 4)).toBeCloseTo(0.75, 10);
    for (const m of MARKS) expect(gRatio(m.r)).toBeCloseTo(m.g, 10);
    expect(gRatio(1 - 0.5)).toBeCloseTo(gAtDepth(0.5 * R_KM), 10);
  });

  it("outside, g falls as 1/r², the same as 1/(1 + h/R)²", () => {
    expect(gRatio(2)).toBeCloseTo(0.25, 10);
    expect(gRatio(1.5)).toBeCloseTo(gAtHeight(0.5 * R_KM), 10);
    expect(gRatio(1.5)).toBeCloseTo(4 / 9, 10);
  });

  it("g is largest at the surface", () => {
    const pts = curvePoints();
    const peak = pts.reduce((a, b) => (b.g > a.g ? b : a));
    expect(peak.r).toBeCloseTo(1, 10);
    expect(peak.g).toBeCloseTo(1, 10);
  });

  it("the self-check: 480 N at depth 3R/4 weighs 120 N, and the slider reaches it", () => {
    expect(SURFACE_WEIGHT).toBe(480);
    expect(SURFACE_WEIGHT * gRatio(0.25)).toBeCloseTo(120, 10);
    for (const r of [0.25, 0.5, 0.75, 0.8, 1]) {
      const k = (r - R_RANGE.min) / R_RANGE.step;
      expect(Math.abs(k - Math.round(k))).toBeLessThan(1e-9);
    }
  });
});

describe("JeeIndicatorChoice (jceq-indicators)", () => {
  it("uses the concept's working ranges", () => {
    expect(BANDS.phenolphthalein).toEqual({ lo: 8.3, hi: 10 });
    expect(BANDS.methylOrange).toEqual({ lo: 3.1, hi: 4.4 });
  });

  it("weak acid with strong base: equivalence above 7, the jump runs through phenolphthalein", () => {
    expect(V_EQ).toBe(25);
    expect(phWeakAcid(V_EQ)).toBeCloseTo(8.72, 1);
    expect(phWeakAcid(V_EQ) as number).toBeGreaterThan(7);
    expect(phWeakAcid(24.9)).toBeLessThan(BANDS.phenolphthalein.lo);
    expect(phWeakAcid(25.25)).toBeGreaterThan(BANDS.phenolphthalein.hi);
    expect(phWeakAcid(12.5)).toBeCloseTo(4.74, 1);
  });

  it("strong acid into weak base: falls slowly through the buffer region to an acidic equivalence point", () => {
    expect(phWeakBase(V_EQ)).toBeCloseTo(5.28, 1);
    expect(phWeakBase(V_EQ) as number).toBeLessThan(7);
    expect(phWeakBase(24.9)).toBeGreaterThan(BANDS.methylOrange.hi);
    expect(phWeakBase(25.5)).toBeLessThan(BANDS.methylOrange.lo);
    // Phenolphthalein's band lies in the slow buffer region: crossing it takes more than 19 mL.
    expect(phWeakBase(3)).toBeGreaterThan(BANDS.phenolphthalein.hi);
    expect(phWeakBase(22)).toBeGreaterThan(BANDS.phenolphthalein.lo);
    expect(phWeakBase(12.5)).toBeCloseTo(9.26, 1);
  });
});

describe("JeeLimitingReagent (jcsbc-limiting)", () => {
  it("the worked example's moles and quotients", () => {
    expect(EXAMPLE.mg.coeff).toBe(2);
    expect(EXAMPLE.o2.coeff).toBe(1);
    expect(MOLES.mg).toBeCloseTo(0.2, 10);
    expect(MOLES.o2).toBeCloseTo(0.125, 10);
    expect(QUOTIENT.mg).toBeCloseTo(0.1, 10);
    expect(QUOTIENT.o2).toBeCloseTo(0.125, 10);
  });

  it("Mg is limiting although O₂ has fewer moles", () => {
    expect(LIMITING).toBe("mg");
    expect(MOLES.o2).toBeLessThan(MOLES.mg);
  });

  it("8.0 g of MgO forms and 0.8 g of O₂ is left", () => {
    expect(RESULT.mg).toBeCloseTo(0, 10);
    expect(RESULT.o2Used).toBeCloseTo(0.1, 10);
    expect(RESULT.o2).toBeCloseTo(0.025, 10);
    expect(RESULT.mgo).toBeCloseTo(0.2, 10);
    expect(MGO_GRAMS).toBe(8);
    expect(O2_LEFT_GRAMS).toBe(0.8);
  });

  it("bars change only after the reaction step, and the last step is the outcome", () => {
    expect(LIMITING_STEPS).toHaveLength(4);
    expect(barMoles(0)).toEqual({ mg: MOLES.mg, o2: MOLES.o2, mgo: 0 });
    expect(barMoles(1)).toEqual(barMoles(0));
    expect(barMoles(3)).toEqual({ mg: RESULT.mg, o2: RESULT.o2, mgo: RESULT.mgo });
  });
});

describe("JeePhosphorusOxoacids (jcpb-p-oxoacid-basicity)", () => {
  it("draws H₃PO₂, H₃PO₃, H₃PO₄ with the right atoms", () => {
    expect(OXOACIDS.map((a) => a.formula)).toEqual(["H₃PO₂", "H₃PO₃", "H₃PO₄"]);
    expect(OXOACIDS.map(hydrogens)).toEqual([3, 3, 3]);
    expect(OXOACIDS.map(oxygens)).toEqual([2, 3, 4]);
  });

  it("basicity = P–OH count; non-ionisable H = P–H count; P–H makes it reducing", () => {
    expect(OXOACIDS.map(basicity)).toEqual([1, 2, 3]);
    expect(OXOACIDS.map(phBonds)).toEqual([2, 1, 0]);
    expect(OXOACIDS.map(isReducing)).toEqual([true, true, false]);
  });

  it("the worked example: 25 mL of 0.1 M acid with 0.2 M NaOH", () => {
    expect(naohVolume(OXOACIDS[1], 25, 0.1, 0.2)).toBeCloseTo(25, 10);
    expect(naohVolume(OXOACIDS[0], 25, 0.1, 0.2)).toBeCloseTo(12.5, 10);
  });
});

describe("JeeOxidationStates3d (jcdfb-ox-states)", () => {
  const by = (s: string) => METALS.find((m) => m.symbol === s)!;

  it("lists Sc to Zn with the table's states", () => {
    expect(METALS.map((m) => m.symbol)).toEqual(["Sc", "Ti", "V", "Cr", "Mn", "Fe", "Co", "Ni", "Cu", "Zn"]);
    expect(allStates(by("Sc"))).toEqual([3]);
    expect(allStates(by("Mn"))).toEqual([2, 3, 4, 5, 6, 7]);
    expect(by("Fe").states).toEqual([2, 3]);
    expect(by("Fe").rare).toEqual([4, 6]);
    expect(allStates(by("Cu"))).toEqual([1, 2]);
    expect(allStates(by("Zn"))).toEqual([2]);
    expect(allStates(by("Co"))).toEqual([2, 3, 4]);
    expect(allStates(by("Ni"))).toEqual([2, 3, 4]);
  });

  it("Mn has the most states and reaches +7", () => {
    expect(mostStates().symbol).toBe("Mn");
    expect(highestState(by("Mn"))).toBe(7);
  });

  it("Ti to Mn reach their group number; after Mn the highest state falls", () => {
    for (const s of ["Ti", "V", "Cr", "Mn"]) expect(highestState(by(s))).toBe(by(s).group);
    for (const s of ["Fe", "Co", "Ni", "Cu", "Zn"]) expect(highestState(by(s))).toBeLessThan(7);
  });

  it("common states differ in steps of one", () => {
    for (const m of METALS) {
      for (let i = 1; i < m.states.length; i++) expect(m.states[i] - m.states[i - 1]).toBe(1);
    }
  });
});

describe("JeeHinsbergTest (jcamine-hinsberg)", () => {
  it("uses the table's examples and products", () => {
    expect(ROWS.map((r) => r.amine)).toEqual(["C₂H₅NH₂", "(C₂H₅)₂NH", "(C₂H₅)₃N"]);
    expect(ROWS.map((r) => r.product)).toEqual(["C₆H₅SO₂NHC₂H₅", "C₆H₅SO₂N(C₂H₅)₂", null]);
  });

  it("primary keeps an N–H and dissolves; secondary has none; tertiary does not react", () => {
    expect(ROWS.map(nhInProduct)).toEqual([1, 0, null]);
    expect(ROWS.map(dissolvesInAlkali)).toEqual([true, false, false]);
  });
});

describe("JeeErrorPowers (jpunit-power-rule)", () => {
  it("the worked example: 1.5 + 3 + 1 = 5.5%", () => {
    expect(FACTORS.map((f) => f.percent)).toEqual([0.5, 1.5, 2]);
    expect(FACTORS.map((f) => f.power)).toEqual([3, 2, 0.5]);
    expect(FACTORS.map(contribution)).toEqual([1.5, 3, 1]);
    expect(maxPercentError()).toBeCloseTo(5.5, 10);
  });

  it("the total bar joins the three contributions end to end, to scale", () => {
    expect(stackStarts()).toEqual([BAR_X, BAR_X + 1.5 * PER_PCT, BAR_X + 4.5 * PER_PCT]);
  });

  it("the denominator's error is added, not subtracted", () => {
    expect(FACTORS[2].inDenominator).toBe(true);
    expect(maxPercentError()).toBeGreaterThan(1.5 + 3 - 1);
  });

  it("the self-check: kinetic energy with 2% in m and 3% in v gives 8%", () => {
    expect(
      maxPercentError([
        { symbol: "m", power: 1, percent: 2, inDenominator: false, powerText: "1" },
        { symbol: "v", power: 2, percent: 3, inDenominator: false, powerText: "2" },
      ]),
    ).toBeCloseTo(8, 10);
  });
});

describe("JeeHaloform (jcald-haloform)", () => {
  it("draws a positive from the worked example: CH₃ on a C=O joined to C", () => {
    expect(KETONE.formula).toBe("CH₃COCH(CH₃)₂");
    expect(KETONE.methylOnCarbonyl).toBe(true);
    expect(KETONE.otherSideOfCarbonyl).toBe("C");
  });

  it("one carbon fewer: 5 = 4 + 1", () => {
    expect(PRODUCTS.carboxylate).toBe("(CH₃)₂CHCOO⁻");
    expect(PRODUCTS.carboxylateCarbons).toBe(KETONE.carbons - 1);
    expect((PRODUCTS.carboxylateCarbons as number) + (PRODUCTS.iodoformCarbons as number)).toBe(KETONE.carbons);
  });

  it("the concept's equation balances iodine and sodium", () => {
    expect(EQUATION.reactants.I2).toBe(3);
    expect(EQUATION.reactants.NaOH).toBe(4);
    const i = iodineBalance();
    expect(i.left).toBe(i.right);
    const na = sodiumBalance();
    expect(na.left).toBe(na.right);
  });

  it("CI₃ stays in place until it leaves, and the last step shows the products", () => {
    expect(HALOFORM_STEPS).toHaveLength(4);
    expect(groupOffset(0)).toEqual({ x: 0, y: 0 });
    expect(groupOffset(1)).toEqual({ x: 0, y: 0 });
    expect(groupOffset(3)).toEqual(LEAVE);
  });
});
