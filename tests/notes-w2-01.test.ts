import { describe, expect, it } from "vitest";
import {
  AMMONIA,
  AVOGADRO,
  MOLAR_VOLUME,
  UREA,
  ammoniaChain,
  sci,
  ureaChain,
} from "../src/app/notes/_components/visualizations/CetMoleChain";
import {
  MELTING_POINTS,
  ORTHO,
  PARA_ROW,
  POSITIONS,
  ringSeparation,
} from "../src/app/notes/_components/visualizations/CetNitrophenolHBonds";
import { AMINES, acylation, carbylamine, hinsberg } from "../src/app/notes/_components/visualizations/CetAmineNHTests";
import {
  DEFAULT_D,
  IONS_BY_D,
  boxFilling,
  spinOnly,
  unpairedFromD,
} from "../src/app/notes/_components/visualizations/CetSpinOnlyMoment";
import { XENON_COMPOUNDS, xenonLonePairs } from "../src/app/notes/_components/visualizations/CetXenonShapes";
import { AXIS, ON_PAIRS, onChange, verdict, xOf } from "../src/app/notes/_components/visualizations/CetOxidationLadder";
import {
  DEFAULT_N,
  FREUNDLICH_K,
  N_RANGE,
  adsorbed,
  logAdsorbed,
  slopeOf,
} from "../src/app/notes/_components/visualizations/CetFreundlichPlots";
import {
  CARBONATION,
  RECOVERY,
  SOLVAY_STEPS,
  STAGE_FROM,
  atomTotals,
  stageOpacity,
} from "../src/app/notes/_components/visualizations/CetSolvayLoop";
import { C5_ISOMERS, carbonTypes, typeCounts } from "../src/app/notes/_components/visualizations/CetPentaneCarbonTypes";
import { NANO_CLASSES, nanoscaleDirections } from "../src/app/notes/_components/visualizations/CetNanoDimensions";
import { ROUTES, isCis } from "../src/app/notes/_components/visualizations/CetAlkyneReduction";

// MHT-CET Chemistry notes figures, group w2-01 (scripts/notes/CET_VISUALS_BRIEF.md).
// Each figure draws its concept's own numbers, so those numbers are pinned here.

describe("the particle bridge (cetsbcc-particles-from-moles)", () => {
  it("uses the concept's constants", () => {
    expect(AVOGADRO).toBe(6.022e23);
    expect(MOLAR_VOLUME).toBe(22.4);
  });

  it("matches the urea example: 5.4 g / 60 = 0.09 mol = 5.42 × 10²² molecules", () => {
    expect(UREA).toEqual({ mass: 5.4, M: 60 });
    const u = ureaChain();
    expect(u.n).toBeCloseTo(0.09, 12);
    expect(u.molecules).toBeCloseTo(0.09 * 6.022e23, -15);
    expect(sci(u.molecules, 2)).toBe("5.42 × 10²²");
  });

  it("matches the NH₃ trap: 2.24 dm³ is 0.1 mol, 6.022 × 10²² molecules but 2.4088 × 10²³ atoms", () => {
    expect(AMMONIA).toEqual({ volume: 2.24, atomsPerMolecule: 4 });
    const a = ammoniaChain();
    expect(a.n).toBeCloseTo(0.1, 12);
    expect(sci(a.molecules, 3)).toBe("6.022 × 10²²");
    expect(sci(a.atoms, 4)).toBe("2.4088 × 10²³");
    expect(a.atoms / a.molecules).toBeCloseTo(4, 12);
  });
});

describe("nitrophenol hydrogen bonds (cetalc-nitrophenol-melting-points)", () => {
  it("uses the concept's melting points, p-nitrophenol highest", () => {
    expect(MELTING_POINTS).toEqual({ paraNitrophenol: 114, orthoNitrophenol: 45, phenol: 41, paraCresol: 35 });
    const order = [MELTING_POINTS.paraNitrophenol, MELTING_POINTS.orthoNitrophenol, MELTING_POINTS.phenol, MELTING_POINTS.paraCresol] as number[];
    expect([...order].sort((x, y) => y - x)).toEqual(order);
    expect(MELTING_POINTS.paraNitrophenol - MELTING_POINTS.orthoNitrophenol).toBe(69); // "almost 70 °C higher"
  });

  it("puts OH and NO₂ next to each other in ortho and opposite in para", () => {
    expect(ringSeparation(POSITIONS.ortho.oh, POSITIONS.ortho.no2)).toBe(1);
    expect(ringSeparation(POSITIONS.para.oh, POSITIONS.para.no2)).toBe(3);
  });

  it("draws the ortho H-bond inside one molecule and the para one between neighbours", () => {
    const dist = (p: { x: number; y: number }, q: { x: number; y: number }) => Math.hypot(p.x - q.x, p.y - q.y);
    // ortho: the OH hydrogen sits close to its own nitro oxygen
    expect(dist(ORTHO.H, ORTHO.Ominus)).toBeLessThan(30);
    // para: its own nitro group is far away, the neighbour's is close
    expect(dist(PARA_ROW[0].H, PARA_ROW[0].Ominus)).toBeGreaterThan(90);
    expect(dist(PARA_ROW[1].H, PARA_ROW[0].Ominus)).toBeLessThan(40);
  });
});

describe("amine tests by N–H count (cetam-acylation-carbylamine-and-hinsberg)", () => {
  it("has ethylamine 2 N–H, diethylamine 1, triethylamine 0", () => {
    expect(AMINES.map((a) => [a.name, a.degree, a.hOnN])).toEqual([
      ["Ethylamine", "1°", 2],
      ["Diethylamine", "2°", 1],
      ["Triethylamine", "3°", 0],
    ]);
    for (const a of AMINES) expect(a.groups.filter((g) => g === "H").length).toBe(a.hOnN);
  });

  it("gives the concept's results for each test", () => {
    expect(AMINES.map((a) => acylation(a.hOnN).reacts)).toEqual([true, true, false]);
    expect(AMINES.map((a) => carbylamine(a.hOnN).reacts)).toEqual([true, false, false]);
    expect(carbylamine(2).sub).toBe("isocyanide");
    expect(AMINES.map((a) => hinsberg(a.hOnN).text)).toEqual(["soluble in alkali", "insoluble", "no reaction"]);
  });
});

describe("spin-only moment (cettr-spin-only-moment)", () => {
  it("counts unpaired electrons n for d¹ to d⁵ and 10 − n beyond", () => {
    expect([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(unpairedFromD)).toEqual([0, 1, 2, 3, 4, 5, 4, 3, 2, 1, 0]);
  });

  it("fills one per box first, then pairs; the boxes agree with the count", () => {
    expect(boxFilling(5)).toEqual([1, 1, 1, 1, 1]);
    expect(boxFilling(6)).toEqual([2, 1, 1, 1, 1]);
    expect(boxFilling(10)).toEqual([2, 2, 2, 2, 2]);
    for (let d = 0; d <= 10; d++) {
      const b = boxFilling(d);
      expect(b.reduce((s, e) => s + e, 0)).toBe(d);
      expect(b.filter((e) => e === 1).length).toBe(unpairedFromD(d));
    }
  });

  it("gives the concept's moments: 0, 1.73, 2.83, 3.87, 4.90, 5.92 BM", () => {
    expect([0, 1, 2, 3, 4, 5].map((n) => spinOnly(n).toFixed(2))).toEqual(["0.00", "1.73", "2.83", "3.87", "4.90", "5.92"]);
  });

  it("opens on Fe²⁺ (d⁶): 4 unpaired, √24 = 4.90 BM", () => {
    expect(DEFAULT_D).toBe(6);
    expect(IONS_BY_D[6]).toEqual(["Fe²⁺"]);
    expect(unpairedFromD(6)).toBe(4);
    expect(spinOnly(4)).toBeCloseTo(Math.sqrt(24), 12);
  });

  it("lists the concept's ions with their unpaired counts", () => {
    const expected: Record<string, number> = {
      "Ti³⁺": 1, "V³⁺": 2, "Cr³⁺": 3, "Cr²⁺": 4, "Mn²⁺": 5, "Fe³⁺": 5, "Fe²⁺": 4, "Co²⁺": 3, "Ni²⁺": 2, "Cu²⁺": 1, "Sc³⁺": 0, "Zn²⁺": 0,
    };
    const seen: string[] = [];
    for (let d = 0; d <= 10; d++) {
      for (const ion of IONS_BY_D[d]) {
        expect(unpairedFromD(d)).toBe(expected[ion]);
        seen.push(ion);
      }
    }
    expect(seen.sort()).toEqual(Object.keys(expected).sort());
  });

  it("peaks at d⁵ and is zero at d⁰ and d¹⁰", () => {
    const mus = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((d) => spinOnly(unpairedFromD(d)));
    expect(mus.indexOf(Math.max(...mus))).toBe(5);
    expect(mus[0]).toBe(0);
    expect(mus[10]).toBe(0);
  });
});

describe("xenon lone pairs (cetg16-noble-gases-and-xenon)", () => {
  it("applies (8 − Xe–F − 2 × Xe=O) / 2 as the concept does", () => {
    const lp = Object.fromEntries(XENON_COMPOUNDS.map((m) => [m.formula, xenonLonePairs(m.nF, m.nO)]));
    expect(lp).toEqual({ "XeF₂": 3, "XeOF₂": 2, "XeF₄": 2, "XeOF₄": 1, "XeO₃": 1 });
    expect(xenonLonePairs(6, 0)).toBe(1); // XeF₆
    expect(xenonLonePairs(2, 2)).toBe(1); // XeO₂F₂, the worked example
  });

  it("names the concept's shapes", () => {
    expect(XENON_COMPOUNDS.map((m) => [m.formula, m.shape])).toEqual([
      ["XeF₂", "linear"],
      ["XeOF₂", "T-shaped"],
      ["XeF₄", "square planar"],
      ["XeOF₄", "square pyramidal"],
      ["XeO₃", "pyramidal"],
    ]);
  });

  it("draws as many F, O and lone pairs as the formula says", () => {
    for (const m of XENON_COMPOUNDS) {
      expect(m.ligands.filter((l) => l.atom === "F").length).toBe(m.nF);
      expect(m.ligands.filter((l) => l.atom === "O").length).toBe(m.nO);
      expect(m.lonePairs.length).toBe(xenonLonePairs(m.nF, m.nO));
    }
  });
});

describe("oxidation number change (cetrdx-on-change)", () => {
  it("uses the concept's pairs and numbers", () => {
    expect(ON_PAIRS.map((p) => [p.element, p.from, p.to])).toEqual([
      ["Cr", 6, 3],
      ["N", 5, -3],
      ["S", -2, 0],
      ["Mn", 7, 4],
      ["Cl", 5, -1],
      ["Cr", 6, 6],
    ]);
  });

  it("reads the worked example: Cl +5 → −1, down by 6, reduced", () => {
    const cl = ON_PAIRS.find((p) => p.element === "Cl")!;
    expect(onChange(cl)).toBe(-6);
    expect(verdict(cl)).toBe("reduced");
  });

  it("calls up oxidation, down reduction, and chromate ⇌ dichromate no change", () => {
    expect(ON_PAIRS.map(verdict)).toEqual(["reduced", "reduced", "oxidised", "reduced", "reduced", "no change"]);
    expect(ON_PAIRS.map(onChange)).toEqual([-3, -8, 2, -3, -6, 0]);
  });

  it("draws the number line from −3 to +7, rising to the right", () => {
    expect(AXIS.min).toBe(-3);
    expect(AXIS.max).toBe(7);
    expect(xOf(-3)).toBe(AXIS.x0);
    expect(xOf(7)).toBe(AXIS.x1);
    expect(xOf(0)).toBeCloseTo(170.8, 6);
    for (const p of ON_PAIRS) {
      expect(p.from).toBeGreaterThanOrEqual(AXIS.min);
      expect(p.to).toBeLessThanOrEqual(AXIS.max);
    }
  });
});

describe("Freundlich isotherm (cetsurf-freundlich)", () => {
  it("keeps n above 1", () => {
    expect(N_RANGE.min).toBeGreaterThan(1);
    expect(DEFAULT_N).toBeGreaterThan(1);
  });

  it("is x/m = k p^(1/n), less than proportional when n > 1", () => {
    expect(adsorbed(4, 2)).toBeCloseTo(FREUNDLICH_K * 2, 12);
    expect(adsorbed(10, 1)).toBeCloseTo(FREUNDLICH_K * 10, 12);
    for (let n = N_RANGE.min; n <= N_RANGE.max; n += N_RANGE.step) expect(adsorbed(10, n)).toBeLessThan(adsorbed(10, 1));
  });

  it("gives a straight log line: slope 1/n, intercept log k", () => {
    for (const n of [1.5, 2, 3, 5]) {
      expect(logAdsorbed(0, n)).toBeCloseTo(Math.log10(FREUNDLICH_K), 12);
      expect(logAdsorbed(1, n) - logAdsorbed(0, n)).toBeCloseTo(slopeOf(n), 12);
      expect(Math.log10(adsorbed(7, n))).toBeCloseTo(logAdsorbed(Math.log10(7), n), 12);
    }
    expect(slopeOf(2)).toBe(0.5);
  });
});

describe("Solvay loop (cetg12-solvay-and-lime)", () => {
  it("uses balanced equations", () => {
    expect(atomTotals(CARBONATION.left)).toEqual(atomTotals(CARBONATION.right));
    expect(atomTotals(RECOVERY.left)).toEqual(atomTotals(RECOVERY.right));
  });

  it("recovers NH₃ and leaves CaCl₂", () => {
    expect(RECOVERY.right.map((s) => s.f)).toEqual(["CaCl₂", "NH₃", "H₂O"]);
    expect(RECOVERY.right[1].n).toBe(2);
    expect(CARBONATION.right.map((s) => s.f)).toEqual(["NaHCO₃", "NH₄Cl"]);
  });

  it("walks carbonation, heating, recovery, loop, and ends on the whole picture", () => {
    expect(SOLVAY_STEPS.map((s) => s.title)).toEqual(["Carbonation", "Heating the bicarbonate", "Getting the ammonia back", "The loop closes"]);
    expect([STAGE_FROM.carbonation, STAGE_FROM.heating, STAGE_FROM.recovery, STAGE_FROM.loop]).toEqual([0, 1, 2, 3]);
    const last = SOLVAY_STEPS.length - 1;
    for (const from of Object.values(STAGE_FROM)) expect(stageOpacity(last, from)).toBe(1);
    expect(stageOpacity(0, STAGE_FROM.loop)).toBeLessThan(1);
  });
});

describe("pentane isomers and carbon types (cetalkane-isomers-and-carbon-types)", () => {
  it("draws the three isomers of C₅H₁₂, each 5 carbons in a chain without rings", () => {
    expect(C5_ISOMERS.map((s) => s.name)).toEqual(["Pentane", "Isopentane", "Neopentane"]);
    for (const s of C5_ISOMERS) {
      expect(s.atoms.length).toBe(5);
      expect(s.bonds.length).toBe(4);
    }
  });

  it("types each carbon by its carbon neighbours", () => {
    expect(C5_ISOMERS.map(carbonTypes)).toEqual([
      [1, 2, 2, 2, 1],
      [1, 3, 2, 1, 1],
      [4, 1, 1, 1, 1],
    ]);
  });

  it("gives isopentane one 2° and one 3° carbon, neopentane one 4°", () => {
    expect(typeCounts(C5_ISOMERS[0])).toEqual({ 1: 2, 2: 3, 3: 0, 4: 0 });
    expect(typeCounts(C5_ISOMERS[1])).toEqual({ 1: 3, 2: 1, 3: 1, 4: 0 });
    expect(typeCounts(C5_ISOMERS[2])).toEqual({ 1: 4, 2: 0, 3: 0, 4: 1 });
    expect(C5_ISOMERS[2].sub).toBe("2,2-dimethylpropane");
  });
});

describe("nanostructure dimensions (cetgreen-nano-dimensions)", () => {
  it("names the dimension by the directions that are not nanoscale", () => {
    expect(NANO_CLASSES.map((c) => [c.label, c.dims, nanoscaleDirections(c)])).toEqual([
      ["0-D", 0, 3],
      ["1-D", 1, 2],
      ["2-D", 2, 1],
    ]);
  });

  it("files the concept's examples, nano-rings with the 0-D ones", () => {
    expect(NANO_CLASSES[0].examples).toContain("quantum dots");
    expect(NANO_CLASSES[0].examples).toContain("nano-rings");
    expect(NANO_CLASSES[1].examples).toContain("nanotubes");
    expect(NANO_CLASSES[1].examples).not.toContain("nano-rings");
    expect(NANO_CLASSES[2].examples).toContain("thin films");
  });
});

describe("alkyne to alkene or alkane (cetalkyne-lindlar)", () => {
  it("gives cis with Lindlar's catalyst and trans with Na in liquid NH₃", () => {
    expect(ROUTES.map((r) => r.product)).toEqual(["cis-alkene", "trans-alkene", "alkane"]);
    expect(ROUTES[0].reagent.join(" ")).toContain("Pd–C, quinoline");
    expect(ROUTES[1].reagent.join(" ")).toContain("liquid NH₃");
    expect(isCis(ROUTES[0].alkene!)).toBe(true);
    expect(isCis(ROUTES[1].alkene!)).toBe(false);
    expect(ROUTES[2].alkene).toBeNull();
  });

  it("puts two R and two H on each alkene", () => {
    for (const r of ROUTES.slice(0, 2)) {
      const g = Object.values(r.alkene!);
      expect(g.filter((x) => x === "H").length).toBe(2);
      expect(g.filter((x) => x === "R").length).toBe(2);
    }
  });
});
