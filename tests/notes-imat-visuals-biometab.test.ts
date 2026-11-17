import { describe, expect, it } from "vitest";
import {
  ATP_SYNTHASE,
  CHEMIOSMOSIS_STEPS,
  COMPLEXES,
  MEMBRANE,
  electronPose,
  protonPose,
} from "../src/app/notes/_components/visualizations/ImatChemiosmosis";
import {
  EQUATION,
  FLOWS,
  NOTE_TEXT,
  STAGES,
  atomTotals,
  equationText,
} from "../src/app/notes/_components/visualizations/ImatChloroplastReactions";
import { OPTIMUM_T, PH_ENZYMES, phRate, tempRate } from "../src/app/notes/_components/visualizations/ImatEnzymeTempPh";
import {
  EXAMPLE as MM_EXAMPLE,
  KM_RANGE,
  S_MAX as MM_S_MAX,
  VMAX_RANGE,
  mmRate,
} from "../src/app/notes/_components/visualizations/ImatMichaelisMenten";
import { CURVES, S_MAX as INH_S_MAX, rate } from "../src/app/notes/_components/visualizations/ImatEnzymeInhibition";
import {
  EXAMPLE as CROSS_EXAMPLE,
  GENOTYPES,
  cross,
  genotypeOf,
  genotypeRatio,
  phenotypeRatio,
  tally,
} from "../src/app/notes/_components/visualizations/ImatPunnettSquare";
import { FAMILY, ROMAN } from "../src/app/notes/_components/visualizations/ImatPedigreeSymbols";

// IMAT notes figures, task "biometab" (scripts/imat/NOTES_VISUALS_BRIEF.md).
// Each block pins what makes its figure TRUE against the concept it draws.

const inMatrix = (p: { y: number }) => p.y > MEMBRANE.bottom;
const inIms = (p: { y: number }) => p.y < MEMBRANE.top;
const midY = (MEMBRANE.top + MEMBRANE.bottom) / 2;
/** x where the straight line a→b crosses the middle of the membrane. */
const crossX = (a: { x: number; y: number }, b: { x: number; y: number }) => a.x + ((b.x - a.x) * (midY - a.y)) / (b.y - a.y);

describe("chemiosmosis animation (imat-bem-chemiosmosis)", () => {
  it("walks the process in order: NADH, chain, oxygen, gradient, ATP synthase", () => {
    expect(CHEMIOSMOSIS_STEPS.map((s) => s.title)).toEqual([
      "NADH gives up its electrons",
      "Along the chain",
      "Oxygen takes the electrons",
      "A proton gradient",
      "ATP synthase",
    ]);
  });

  it("pumps protons at complexes I, III and IV (not II)", () => {
    expect(COMPLEXES.map((c) => c.id)).toEqual(["I", "III", "IV"]);
  });

  it("passes the electrons I, then III, then IV to oxygen in the matrix, then they are gone", () => {
    expect(electronPose(0).x).toBe(COMPLEXES[0].x);
    expect(electronPose(1).x).toBe(COMPLEXES[1].x);
    expect(electronPose(2).x).toBe(COMPLEXES[2].x);
    expect(inMatrix(electronPose(2))).toBe(true);
    for (const s of [0, 1, 2]) expect(electronPose(s).opacity).toBe(1);
    for (const s of [3, 4]) expect(electronPose(s).opacity).toBe(0);
  });

  it("never sends electrons through ATP synthase (the concept's trap)", () => {
    for (let s = 0; s < CHEMIOSMOSIS_STEPS.length; s++) expect(electronPose(s).x).toBeLessThan(ATP_SYNTHASE.left);
    for (const step of CHEMIOSMOSIS_STEPS) expect(step.caption).not.toMatch(/electrons? (pass|flow|move)s? through ATP synthase/i);
  });

  it("pumps each proton from the matrix to the intermembrane space through its own complex", () => {
    for (const k of [0, 1, 2] as const) {
      const before = protonPose(k, k - 1);
      const after = protonPose(k, k);
      if (k > 0) expect(inMatrix(before)).toBe(true);
      expect(inMatrix(protonPose(k, -1))).toBe(true);
      expect(inIms(after)).toBe(true);
      const x = crossX(protonPose(k, -1), after);
      expect(Math.abs(x - COMPLEXES[k].x)).toBeLessThanOrEqual(14);
      for (const s of [k, 2, 3]) expect(inIms(protonPose(k, s))).toBe(true);
    }
  });

  it("returns protons to the matrix only through the ATP synthase channel, in the last step", () => {
    for (const k of [0, 1] as const) {
      const a = protonPose(k, 3);
      const b = protonPose(k, 4);
      expect(inIms(a)).toBe(true);
      expect(inMatrix(b)).toBe(true);
      const x = crossX(a, b);
      expect(x).toBeGreaterThanOrEqual(ATP_SYNTHASE.left);
      expect(x).toBeLessThanOrEqual(ATP_SYNTHASE.right);
    }
    expect(inIms(protonPose(2, 4))).toBe(true); // the gradient is not used up
  });
});

describe("chloroplast diagram (imat-bem-chloroplast-equation)", () => {
  it("prints the concept's balanced equation", () => {
    expect(equationText()).toBe("6CO₂ + 6H₂O → C₆H₁₂O₆ + 6O₂");
    expect(atomTotals(EQUATION.reactants)).toEqual({ C: 6, H: 12, O: 18 });
    expect(atomTotals(EQUATION.products)).toEqual(atomTotals(EQUATION.reactants));
  });

  it("puts the light-dependent reactions in the thylakoids and the Calvin cycle in the stroma", () => {
    expect(STAGES[0]).toEqual({ name: "light-dependent reactions", site: "thylakoid" });
    expect(STAGES[1]).toEqual({ name: "light-independent reactions (Calvin cycle)", site: "stroma" });
  });

  it("draws the flows the concept describes", () => {
    const flow = (label: string) => FLOWS.find((f) => f.label === label);
    expect(flow("light")).toMatchObject({ to: "thylakoid" });
    expect(flow("H₂O")).toMatchObject({ from: "outside", to: "thylakoid" });
    expect(flow("O₂")).toMatchObject({ from: "thylakoid", to: "outside" }); // oxygen comes from split water
    expect(flow("ATP + NADPH")).toMatchObject({ from: "thylakoid", to: "stroma" });
    expect(flow("CO₂")).toMatchObject({ from: "outside", to: "stroma" });
    expect(flow("sugar (C₆H₁₂O₆)")).toMatchObject({ from: "stroma", to: "outside" });
  });

  it("never calls the Calvin cycle a dark reaction or says it needs no light", () => {
    const words = [...STAGES.map((s) => s.name), ...FLOWS.map((f) => f.label), NOTE_TEXT].join(" ");
    expect(words).not.toMatch(/dark (reaction|phase|stage)|no light|without light|at night/i);
  });
});

describe("enzyme temperature and pH (imat-bmo-temperature-ph)", () => {
  const argmax = (f: (x: number) => number, lo: number, hi: number, step: number) => {
    let best = lo;
    for (let x = lo; x <= hi; x += step) if (f(x) > f(best)) best = x;
    return best;
  };

  it("peaks at about 37 °C for a human enzyme", () => {
    expect(OPTIMUM_T).toBe(37);
    expect(tempRate(37)).toBeCloseTo(1, 10);
    expect(Math.abs(argmax(tempRate, 0, 60, 0.05) - 37)).toBeLessThanOrEqual(0.1);
  });

  it("roughly doubles for every 10 °C below the optimum", () => {
    expect(tempRate(30) / tempRate(20)).toBeGreaterThan(1.9);
    expect(tempRate(30) / tempRate(20)).toBeLessThan(2.1);
    expect(tempRate(20) / tempRate(10)).toBeCloseTo(2, 1);
  });

  it("falls steeply above the optimum (denaturation) but cold only slows it", () => {
    expect(tempRate(47)).toBeLessThan(0.15);
    expect(1 - tempRate(47)).toBeGreaterThan(1 - tempRate(27)); // the fall is steeper than the rise
    expect(tempRate(5)).toBeGreaterThan(0.1);
    expect(tempRate(5)).toBeLessThan(tempRate(15));
  });

  it("puts each enzyme's peak at the concept's optimum pH", () => {
    expect(PH_ENZYMES.map((e) => [e.name, e.optimum])).toEqual([
      ["pepsin", 2],
      ["amylase", 7],
      ["trypsin", 8],
    ]);
    for (const e of PH_ENZYMES) expect(argmax((p) => phRate(e.optimum, p), 0, 12, 0.05)).toBeCloseTo(e.optimum, 1);
  });
});

describe("Michaelis-Menten slider (imat-bmo-substrate-concentration)", () => {
  it("opens on the worked example: Vmax 40, Km 2.0 gives 20 at [S] = 2.0 and 30 at 6.0", () => {
    expect(MM_EXAMPLE).toEqual({ vmax: 40, km: 2, probeS: 6 });
    expect(mmRate(40, 2, 2)).toBe(20);
    expect(mmRate(40, 2, 6)).toBe(30);
  });

  it("gives v = Vmax/2 at [S] = Km for every slider setting", () => {
    for (let v = VMAX_RANGE.min; v <= VMAX_RANGE.max; v += VMAX_RANGE.step) {
      for (let km = KM_RANGE.min; km <= KM_RANGE.max; km += KM_RANGE.step) {
        expect(mmRate(v, km, km)).toBeCloseTo(v / 2, 10);
        expect(mmRate(v, km, MM_S_MAX)).toBeLessThan(v); // never above Vmax
      }
    }
  });

  it("matches the practice answers", () => {
    expect(mmRate(50, 4, 12)).toBe(37.5);
    expect(mmRate(80, 0.5, 0.5)).toBe(40);
    expect(mmRate(1, 3, 27)).toBeCloseTo(0.9, 10); // [S] = 9Km gives 90%
  });

  it("lets the sliders land exactly on the example values", () => {
    expect((MM_EXAMPLE.vmax - VMAX_RANGE.min) % VMAX_RANGE.step).toBe(0);
    expect((MM_EXAMPLE.km - KM_RANGE.min) % KM_RANGE.step).toBe(0);
  });
});

describe("inhibition curves (imat-bmo-inhibition)", () => {
  const none = CURVES.find((c) => c.id === "none")!;
  const comp = CURVES.find((c) => c.id === "competitive")!;
  const nonc = CURVES.find((c) => c.id === "noncompetitive")!;

  it("competitive: same Vmax, higher Km; overcome by more substrate", () => {
    expect(comp.vmax).toBe(none.vmax);
    expect(comp.km).toBeGreaterThan(none.km);
    expect(rate(comp, 1e7) / rate(none, 1e7)).toBeCloseTo(1, 5);
  });

  it("non-competitive: lower Vmax, same Km; more substrate does not help", () => {
    expect(nonc.vmax).toBeLessThan(none.vmax);
    expect(nonc.km).toBe(none.km);
    expect(rate(nonc, 1e7) / rate(none, 1e7)).toBeCloseTo(nonc.vmax / none.vmax, 5);
    expect(rate(nonc, nonc.km)).toBe(nonc.vmax / 2);
  });

  it("every inhibitor lowers the rate at every substrate concentration", () => {
    for (let s = 0.5; s <= INH_S_MAX; s += 0.5) {
      expect(rate(comp, s)).toBeLessThan(rate(none, s));
      expect(rate(nonc, s)).toBeLessThan(rate(none, s));
    }
  });
});

describe("Punnett square (imat-gen-monohybrid)", () => {
  it("opens on the worked example: Bb × Bb, 64 guinea pigs: 16 BB, 32 Bb, 16 bb; 48 black, 16 white", () => {
    expect([CROSS_EXAMPLE.p1, CROSS_EXAMPLE.p2, CROSS_EXAMPLE.offspring]).toEqual(["Bb", "Bb", 64]);
    const t = tally("Bb", "Bb");
    expect(t.genotypes.map((n) => (n * 64) / 4)).toEqual([16, 32, 16]);
    expect(t.phenotypes.map((n) => (n * 64) / 4)).toEqual([48, 16]);
    expect(genotypeRatio("Bb", "Bb")).toBe("1 BB : 2 Bb : 1 bb");
    expect(phenotypeRatio("Bb", "Bb")).toBe("3 black : 1 white");
  });

  const expected: Record<string, [string, string]> = {
    "BB×BB": ["all BB", "all black"],
    "BB×Bb": ["1 BB : 1 Bb", "all black"],
    "BB×bb": ["all Bb", "all black"],
    "Bb×Bb": ["1 BB : 2 Bb : 1 bb", "3 black : 1 white"],
    "Bb×bb": ["1 Bb : 1 bb", "1 black : 1 white"],
    "bb×bb": ["all bb", "all white"],
  };

  it("gives the right ratios for every pair of parents, either way round", () => {
    for (const a of GENOTYPES) {
      for (const b of GENOTYPES) {
        const key = expected[`${a}×${b}`] ?? expected[`${b}×${a}`];
        expect(genotypeRatio(a, b)).toBe(key[0]);
        expect(phenotypeRatio(a, b)).toBe(key[1]);
        expect(cross(a, b).flat()).toHaveLength(4);
      }
    }
  });

  it("writes the dominant allele first", () => {
    expect(genotypeOf("b", "B")).toBe("Bb");
    expect(cross("bb", "BB").flat()).toEqual(["Bb", "Bb", "Bb", "Bb"]);
  });
});

describe("pedigree (imat-gen-pedigree-patterns)", () => {
  const parents = FAMILY.filter((p) => p.generation === 1);
  const children = FAMILY.filter((p) => p.generation === 2);

  it("draws the worked example: unaffected parents, an affected daughter, two unaffected sons", () => {
    expect(parents.map((p) => [p.sex, p.affected])).toEqual([
      ["male", false],
      ["female", false],
    ]);
    expect(children.map((c) => [c.sex, c.affected])).toEqual([
      ["male", false],
      ["female", true],
      ["male", false],
    ]);
    expect([ROMAN[1], ROMAN[2]]).toEqual(["I", "II"]);
  });

  it("is consistent with autosomal recessive and with no other pattern the concept lists", () => {
    // Recessive: unaffected parents have an affected child, so no dominant pattern.
    expect(parents.every((p) => !p.affected) && children.some((c) => c.affected)).toBe(true);
    // Not X-linked recessive: the father is unaffected but a daughter is affected.
    const father = parents.find((p) => p.sex === "male")!;
    expect(!father.affected && children.some((c) => c.sex === "female" && c.affected)).toBe(true);
    // Not Y-linked: a daughter is affected.
    expect(children.some((c) => c.sex === "female" && c.affected)).toBe(true);
  });

  it("labels genotypes the parents can actually produce", () => {
    expect(parents.map((p) => p.genotype)).toEqual(["Aa", "Aa"]);
    for (const c of children) expect(c.genotype).toBe(c.affected ? "aa" : "AA or Aa");
  });
});
