import { describe, expect, it } from "vitest";
import {
  DELTA_O,
  DELTA_T,
  SETS,
  barycentreShift,
  energyY,
  setEnergy,
  tetrahedralDelta,
} from "../src/app/notes/_components/visualizations/JeeCrystalFieldSplitting";
import {
  HEAVY_ORDER,
  LIGHT_ORDER,
  MOLECULES,
  electronCounts,
  fill,
  orderFor,
} from "../src/app/notes/_components/visualizations/JeeMoDiagram";
import {
  MIXTURES,
  PURE,
  azeotropeX,
  curve as vpCurve,
  totalPressure,
} from "../src/app/notes/_components/visualizations/JeeRaoultDeviations";
import { FIRST, PLOTS, ROWS, ZERO, plotPoints } from "../src/app/notes/_components/visualizations/JeeReactionOrderPlots";
import {
  ARRHENIUS,
  MEASURED,
  TRIANGLE,
  activationEnergy,
  kelvin,
  logK,
  preExponential,
} from "../src/app/notes/_components/visualizations/JeeArrheniusPlot";
import {
  NODES,
  ORBITALS,
  radial,
  radialNodes,
  radialProbability,
  type OrbitalId,
} from "../src/app/notes/_components/visualizations/JeeRadialProbability";
import {
  ARROWS as BH_ARROWS,
  BORN_HABER_STEPS,
  LEVELS as BH_LEVELS,
  NACL,
  arrowFrom,
  ionsLevel,
  latticeEnthalpy,
  levelY as bhLevelY,
  markerPose,
  runningTotal,
} from "../src/app/notes/_components/visualizations/JeeBornHaber";
import {
  ALL_VERTICES,
  EN_RINGS,
  ISOMERS,
  VECTORS,
  bAngles,
  bondAngle,
  type Vertex,
} from "../src/app/notes/_components/visualizations/JeeComplexIsomers";

// JEE Mains Chemistry notes figures (scripts/notes/CET_VISUALS_BRIEF.md, JEE task).
// Each figure draws its concept's own example, so those numbers are pinned here.

describe("crystal field splitting (jccoord-splitting)", () => {
  it("uses the worked example: Δo = 18 000 cm⁻¹, eg +10 800, t₂g −7200, Δt = 8000", () => {
    expect(DELTA_O).toBe(18000);
    expect(DELTA_T).toBeCloseTo(8000, 9);
    const [eg, t2g, t2, e] = SETS;
    expect([eg.id, t2g.id, t2.id, e.id]).toEqual(["eg", "t2g", "t2", "e"]);
    expect(setEnergy(eg)).toBe(10800);
    expect(setEnergy(t2g)).toBe(-7200);
    expect(setEnergy(eg) - setEnergy(t2g)).toBe(18000);
    expect(setEnergy(t2)).toBe(3200); // +0.4 × 8000
    expect(setEnergy(e)).toBe(-4800); // −0.6 × 8000
    expect(setEnergy(t2) - setEnergy(e)).toBe(8000);
  });

  it("matches the self-check: Δo = 13 500 gives Δt = 6000 and t₂ at +2400", () => {
    expect(tetrahedralDelta(13500)).toBeCloseTo(6000, 9);
    expect(setEnergy(SETS[2], 13500)).toBe(2400);
  });

  it("keeps the barycentre: 2(+0.6) + 3(−0.4) = 0 in both fields", () => {
    expect(barycentreShift("octahedral")).toBe(0);
    expect(barycentreShift("tetrahedral")).toBe(0);
  });

  it("puts the right orbitals in each set, with the tetrahedral pattern upside down", () => {
    const by = Object.fromEntries(SETS.map((s) => [s.id, s]));
    expect(by.eg.orbitals).toEqual(["x2y2", "z2"]);
    expect(by.t2g.orbitals).toEqual(["xy", "xz", "yz"]);
    expect(by.t2.orbitals).toEqual(by.t2g.orbitals);
    expect(by.e.orbitals).toEqual(by.eg.orbitals);
    expect(energyY(setEnergy(by.eg))).toBeLessThan(energyY(setEnergy(by.t2g))); // eg drawn higher
    expect(energyY(setEnergy(by.t2))).toBeLessThan(energyY(setEnergy(by.e))); // t₂ drawn higher
    expect(energyY(setEnergy(by.t2g)) - energyY(setEnergy(by.eg))).toBeGreaterThan(
      energyY(setEnergy(by.e)) - energyY(setEnergy(by.t2)),
    ); // Δt is the smaller gap
  });
});

describe("MO diagram (jcbond-bond-order)", () => {
  it("uses the light order up to 14 electrons and the O₂ order from 15", () => {
    expect(orderFor(14)).toBe(LIGHT_ORDER);
    expect(orderFor(15)).toBe(HEAVY_ORDER);
    const ids = (o: typeof LIGHT_ORDER) => o.map((l) => l.id);
    expect(ids(LIGHT_ORDER)).toEqual(["s1s", "s1s*", "s2s", "s2s*", "p2p", "s2pz", "p2p*", "s2p*"]);
    expect(ids(HEAVY_ORDER)).toEqual(["s1s", "s1s*", "s2s", "s2s*", "s2pz", "p2p", "p2p*", "s2p*"]);
  });

  it("draws N₂ (14) and O₂ (16) with the concept's counts", () => {
    expect(MOLECULES.map((m) => [m.name, m.electrons])).toEqual([
      ["N₂", 14],
      ["O₂", 16],
    ]);
    expect(electronCounts(14)).toEqual({ nb: 10, na: 4, bondOrder: 3, unpaired: 0 });
    expect(electronCounts(16)).toEqual({ nb: 10, na: 6, bondOrder: 2, unpaired: 2 });
    const piStar = fill(16).find((r) => r.level.id === "p2p*");
    expect(piStar?.orbitals).toEqual([1, 1]); // Hund: one in each π* orbital
    expect(fill(16).reduce((s, r) => s + r.orbitals.reduce((a, b) => a + b, 0), 0)).toBe(16);
  });

  it("agrees with the concept's other bond orders", () => {
    expect(electronCounts(10)).toMatchObject({ nb: 6, na: 4, bondOrder: 1, unpaired: 2 }); // B₂, paramagnetic
    expect(electronCounts(12)).toMatchObject({ nb: 8, na: 4, bondOrder: 2 }); // C₂
    expect(electronCounts(18).bondOrder).toBe(1); // F₂
    expect(electronCounts(15).bondOrder).toBe(2.5); // NO
    expect(electronCounts(4).bondOrder).toBe(0); // He₂
    expect(electronCounts(3).bondOrder).toBe(0.5); // He₂⁺
  });
});

describe("Raoult deviations (jcsol-deviations)", () => {
  it("shares the pure-liquid ends and keeps the ideal line straight", () => {
    for (const k of ["ideal", "positive", "negative"] as const) {
      expect(totalPressure(0, k)).toBe(PURE.B);
      expect(totalPressure(1, k)).toBe(PURE.A);
    }
    expect(totalPressure(0.5, "ideal")).toBe(80);
    expect(azeotropeX("ideal")).toBeNull();
  });

  it("bulges up for a positive deviation to a maximum above both pure liquids (minimum-boiling azeotrope)", () => {
    for (let x = 0.05; x < 1; x += 0.05) expect(totalPressure(x, "positive")).toBeGreaterThan(totalPressure(x, "ideal"));
    expect(azeotropeX("positive")).toBeCloseTo(0.7, 9);
    const top = totalPressure(0.7, "positive");
    expect(top).toBeCloseTo(109, 9);
    expect(top).toBeGreaterThan(Math.max(PURE.A, PURE.B));
    expect(Math.max(...vpCurve("positive", 1000).map((p) => p.p))).toBeCloseTo(top, 3);
  });

  it("sags for a negative deviation to a minimum below both pure liquids (maximum-boiling azeotrope)", () => {
    for (let x = 0.05; x < 1; x += 0.05) expect(totalPressure(x, "negative")).toBeLessThan(totalPressure(x, "ideal"));
    expect(azeotropeX("negative")).toBeCloseTo(0.3, 9);
    const bottom = totalPressure(0.3, "negative");
    expect(bottom).toBeCloseTo(51, 9);
    expect(bottom).toBeLessThan(Math.min(PURE.A, PURE.B));
    expect(Math.min(...vpCurve("negative", 1000).map((p) => p.p))).toBeCloseTo(bottom, 3);
  });

  it("names the concept's example pairs", () => {
    expect(MIXTURES).toEqual({ ideal: "benzene + toluene", positive: "ethanol + water", negative: "chloroform + acetone" });
  });
});

describe("order from the shape of a graph (jckin-order-graphs)", () => {
  const maxSecondDiff = (pts: { y: number }[]) =>
    Math.max(...pts.slice(1, -1).map((p, i) => Math.abs(pts[i].y - 2 * p.y + pts[i + 2].y)));

  it("draws the concept's four rows, zero and first order each", () => {
    expect(ROWS.map((r) => r.id)).toEqual(["conc", "lnConc", "rate", "halfLife"]);
    expect(PLOTS.length).toBe(8);
  });

  it("marks a plot straight exactly when its points lie on a line", () => {
    for (const p of PLOTS) {
      const straight = maxSecondDiff(plotPoints(p.id, p.order)) < 1e-9;
      expect(straight, `${p.id} ${p.order}`).toBe(p.straight);
    }
    expect(PLOTS.filter((p) => !p.straight).map((p) => `${p.id} ${p.order}`)).toEqual(["conc first", "lnConc zero"]);
  });

  it("gives the slopes and intercepts the table states", () => {
    const slope = (pts: { x: number; y: number }[]) => (pts[pts.length - 1].y - pts[0].y) / (pts[pts.length - 1].x - pts[0].x);
    expect(slope(plotPoints("conc", "zero"))).toBeCloseTo(-ZERO.k, 9); // slope −k
    expect(slope(plotPoints("lnConc", "first"))).toBeCloseTo(-FIRST.k, 9); // slope −k
    const rate1 = plotPoints("rate", "first");
    expect(rate1[0]).toEqual({ x: 0, y: 0 }); // through the origin
    expect(slope(rate1)).toBeCloseTo(FIRST.k, 9); // slope k
    expect(new Set(plotPoints("rate", "zero").map((p) => p.y))).toEqual(new Set([ZERO.k])); // rate = k, flat
    const half0 = plotPoints("halfLife", "zero");
    expect(half0[0]).toEqual({ x: 0, y: 0 });
    expect(slope(half0)).toBeCloseTo(1 / (2 * ZERO.k), 9); // t½ = [A]₀/2k
    expect(new Set(plotPoints("halfLife", "first").map((p) => p.y))).toEqual(new Set([0.693 / FIRST.k])); // flat
  });

  it("first order never reaches zero; the zero-order ln[A] curve bends downward", () => {
    const c1 = plotPoints("conc", "first");
    expect(c1[c1.length - 1].y).toBeGreaterThan(0);
    expect(c1[c1.length - 1].y).toBeCloseTo(Math.exp(-1.6), 9);
    const c0 = plotPoints("conc", "zero");
    expect(c0[c0.length - 1].y).toBeCloseTo(0.2, 9);
    const ln0 = plotPoints("lnConc", "zero");
    for (let i = 1; i < ln0.length - 1; i++) expect(ln0[i - 1].y - 2 * ln0[i].y + ln0[i + 1].y).toBeLessThan(0);
  });
});

describe("Arrhenius plot (jckin-arrhenius-read)", () => {
  it("draws the worked example log k = 12.5 − 9000 K/T", () => {
    expect(ARRHENIUS).toEqual({ logA: 12.5, slopeK: 9000 });
    expect(logK(0)).toBe(12.5); // intercept log A
    expect(logK(2.5)).toBeCloseTo(-10, 9); // 400 K
    expect(kelvin(MEASURED.from)).toBeCloseTo(400, 9);
    expect(Math.round(kelvin(MEASURED.to))).toBe(303);
  });

  it("reads the slope from the triangle: −5.4 over 0.6 × 10⁻³ is −9000 K", () => {
    const dLog = logK(TRIANGLE.to) - logK(TRIANGLE.from);
    expect(dLog).toBeCloseTo(-5.4, 9);
    expect(dLog / ((TRIANGLE.to - TRIANGLE.from) / 1000)).toBeCloseTo(-9000, 4);
  });

  it("gives Ea ≈ 172 kJ mol⁻¹ and A = 3.16 × 10¹² s⁻¹", () => {
    expect(activationEnergy()).toBeCloseTo(2.303 * 8.314 * 9000, 6);
    expect(Math.round(activationEnergy() / 1000)).toBe(172);
    expect(preExponential() / 1e12).toBeCloseTo(3.16, 2);
  });
});

describe("radial probability (jcatom-probability-plots)", () => {
  const grid = Array.from({ length: 40001 }, (_, i) => 0.0007 + i * 0.001); // ρ to 40, never exactly on a node
  const signChanges = (id: OrbitalId) => {
    let n = 0;
    for (let i = 1; i < grid.length; i++) if (Math.sign(radial(id, grid[i])) !== Math.sign(radial(id, grid[i - 1]))) n++;
    return n;
  };
  const peaks = (id: OrbitalId) => {
    const out: number[] = [];
    for (let i = 1; i < grid.length - 1; i++) {
      const p = radialProbability(id, grid[i]);
      if (p > radialProbability(id, grid[i - 1]) && p > radialProbability(id, grid[i + 1])) out.push(grid[i]);
    }
    return out;
  };

  it("has n − l − 1 radial nodes: 1s 0, 2s 1, 2p 0, 3s 2", () => {
    expect(ORBITALS.map((o) => radialNodes(o.n, o.l))).toEqual([0, 1, 0, 2]);
    for (const o of ORBITALS) {
      expect(signChanges(o.id), o.id).toBe(radialNodes(o.n, o.l));
      expect(NODES[o.id].length).toBe(radialNodes(o.n, o.l));
      for (const rho of NODES[o.id]) expect(Math.abs(radial(o.id, rho))).toBeLessThan(1e-9);
    }
    expect(NODES["2s"]).toEqual([2]); // the concept's "1, at 2a₀ for H"
  });

  it("has n − l peaks, the 1s at a₀ and the 2p at 4a₀, the outer 2s peak larger", () => {
    expect(ORBITALS.map((o) => peaks(o.id).length)).toEqual([1, 2, 1, 3]);
    expect(peaks("1s")[0]).toBeCloseTo(1, 2);
    expect(peaks("2p")[0]).toBeCloseTo(4, 2);
    const [inner, outer] = peaks("2s");
    expect(radialProbability("2s", outer)).toBeGreaterThan(radialProbability("2s", inner));
  });
});

describe("Born-Haber cycle (jcbond-born-haber)", () => {
  it("uses the worked example and closes the cycle on −411", () => {
    expect(NACL).toEqual({ sublimation: 108, ionisation: 496, bondCl2: 242, electronGain: -349, formation: -411 });
    expect(NACL.bondCl2 / 2).toBe(121); // half the bond, not all of it
    expect(ionsLevel()).toBe(376); // 108 + 496 + 121 − 349
    expect(latticeEnthalpy()).toBe(-787);
    const steps = BH_ARROWS.slice(1).reduce((s, a) => s + a.value, 0);
    expect(steps).toBe(NACL.formation); // the long road equals the direct one
  });

  it("chains the arrows level to level, from the elements back to NaCl(s)", () => {
    expect(BH_LEVELS).toEqual({ elements: 0, naGas: 108, naIon: 604, clAtom: 725, ions: 376, solid: -411 });
    expect(BH_ARROWS.map((a) => a.id)).toEqual(["formation", "sublimation", "ionisation", "halfBond", "electronGain", "lattice"]);
    for (let i = 2; i < BH_ARROWS.length; i++) expect(BH_ARROWS[i].from).toBe(BH_ARROWS[i - 1].to);
    expect(BH_ARROWS[1].from).toBe(BH_ARROWS[0].from);
    expect(BH_ARROWS[5].to).toBe(BH_ARROWS[0].to);
    for (const a of BH_ARROWS) expect(a.to - a.from).toBe(a.value);
  });

  it("draws the levels to scale: up for the first three steps, down for the last two", () => {
    expect(bhLevelY(0) - bhLevelY(-411)).toBeCloseTo(-82.2, 6);
    for (const id of ["sublimation", "ionisation", "halfBond"]) {
      const a = BH_ARROWS[arrowFrom(id)];
      expect(bhLevelY(a.to)).toBeLessThan(bhLevelY(a.from));
    }
    for (const id of ["electronGain", "lattice", "formation"]) {
      const a = BH_ARROWS[arrowFrom(id)];
      expect(bhLevelY(a.to)).toBeGreaterThan(bhLevelY(a.from));
    }
  });

  it("walks the steps in order with a running total, ending on the full cycle", () => {
    expect(BORN_HABER_STEPS.map((s) => s.title)).toEqual([
      "Formation in one step",
      "Sublimation of Na",
      "Ionisation of Na",
      "Half the Cl–Cl bond",
      "Electron gain by Cl",
      "Ions form the lattice",
    ]);
    expect([0, 1, 2, 3, 4, 5].map(runningTotal)).toEqual([null, 108, 604, 725, 376, null]);
    expect(BORN_HABER_STEPS[5].caption).toContain("−787 kJ mol⁻¹");
    expect(arrowFrom("lattice")).toBe(BORN_HABER_STEPS.length - 1); // the answer appears only at the end
    expect(markerPose(5)).toEqual({ x: 286, y: bhLevelY(-411) });
  });
});

describe("isomers of octahedral complexes (jccoord-geometrical, jccoord-optical)", () => {
  /** A complex as groups of positions, each tagged by what sits there (B = Cl, en = one chelate ring). */
  type Config = readonly { tag: string; v: readonly Vertex[] }[];
  const bGroup = (v: readonly Vertex[]): Config => [{ tag: "B", v }];
  const enRings = (rings: readonly (readonly Vertex[])[]): Config => rings.map((v) => ({ tag: "en", v }));

  /** The 24 rotations of an octahedron: signed permutation matrices with determinant +1. */
  const rotations: number[][][] = [];
  const perms = [
    [0, 1, 2],
    [0, 2, 1],
    [1, 0, 2],
    [1, 2, 0],
    [2, 0, 1],
    [2, 1, 0],
  ];
  const det = (m: number[][]) =>
    m[0][0] * (m[1][1] * m[2][2] - m[1][2] * m[2][1]) -
    m[0][1] * (m[1][0] * m[2][2] - m[1][2] * m[2][0]) +
    m[0][2] * (m[1][0] * m[2][1] - m[1][1] * m[2][0]);
  for (const p of perms)
    for (const sx of [1, -1])
      for (const sy of [1, -1])
        for (const sz of [1, -1]) {
          const s = [sx, sy, sz];
          const m = [0, 1, 2].map((r) => [0, 1, 2].map((c) => (c === p[r] ? s[r] : 0)));
          if (det(m) === 1) rotations.push(m);
        }

  const apply = (m: number[][], v: Vertex): Vertex => {
    const x = VECTORS[v];
    const y = m.map((row) => row[0] * x[0] + row[1] * x[1] + row[2] * x[2]);
    return ALL_VERTICES.find((w) => VECTORS[w].every((c, i) => c === y[i])) as Vertex;
  };
  const key = (c: Config) =>
    c
      .map((g) => `${g.tag}:${[...g.v].sort().join(",")}`)
      .sort()
      .join("|");
  const canonical = (c: Config) =>
    rotations.map((m) => key(c.map((g) => ({ tag: g.tag, v: g.v.map((v) => apply(m, v)) })))).sort()[0];
  const mirrorX = (c: Config): Config =>
    c.map((g) => ({ tag: g.tag, v: g.v.map((v) => (v === "+x" ? "-x" : v === "-x" ? "+x" : v) as Vertex) }));
  const chiral = (c: Config) => canonical(c) !== canonical(mirrorX(c));

  it("has 24 rotations", () => {
    expect(rotations.length).toBe(24);
  });

  it("draws cis and trans MA₄B₂: Cl–Co–Cl 90° and 180°", () => {
    expect(bAngles(ISOMERS.cis)).toEqual([90]);
    expect(bAngles(ISOMERS.trans)).toEqual([180]);
  });

  it("draws fac and mer MA₃B₃: all 90°, and 90° with 180°", () => {
    expect(bAngles(ISOMERS.fac)).toEqual([90, 90, 90]);
    expect(bAngles(ISOMERS.mer)).toEqual([90, 90, 180]);
  });

  it("counts 2 geometrical isomers for MA₄B₂ and for MA₃B₃, none of them chiral", () => {
    const subsets = (k: number): Vertex[][] => {
      const out: Vertex[][] = [];
      const go = (start: number, acc: Vertex[]) => {
        if (acc.length === k) return void out.push(acc);
        for (let i = start; i < ALL_VERTICES.length; i++) go(i + 1, [...acc, ALL_VERTICES[i]]);
      };
      go(0, []);
      return out;
    };
    expect(new Set(subsets(2).map((s) => canonical(bGroup(s)))).size).toBe(2);
    expect(new Set(subsets(3).map((s) => canonical(bGroup(s)))).size).toBe(2);
    for (const bs of Object.values(ISOMERS)) expect(chiral(bGroup(bs))).toBe(false);
    expect(canonical(bGroup(ISOMERS.cis))).not.toBe(canonical(bGroup(ISOMERS.trans)));
    expect(canonical(bGroup(ISOMERS.fac))).not.toBe(canonical(bGroup(ISOMERS.mer)));
  });

  it("spans cis positions with every en ring, and [Co(en)₃]³⁺ is chiral", () => {
    for (const [a, b] of EN_RINGS) expect(bondAngle(a, b)).toBe(90);
    expect(EN_RINGS.flat().sort()).toEqual([...ALL_VERTICES].sort()); // six donor atoms, one per vertex
    expect(chiral(enRings(EN_RINGS))).toBe(true);
  });

  it("agrees with the concept on [Co(en)₂Cl₂]⁺: cis chiral, trans not", () => {
    const cisEn: Config = [...bGroup(["-y", "-z"]), ...enRings([["+x", "+y"], ["-x", "+z"]])];
    const transEn: Config = [...bGroup(["+z", "-z"]), ...enRings([["+x", "+y"], ["-x", "-y"]])];
    expect(chiral(cisEn)).toBe(true);
    expect(chiral(transEn)).toBe(false);
  });
});
