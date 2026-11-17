import { describe, expect, it } from "vitest";
import { VSEPR_SHAPES, drawnAngle } from "../src/app/notes/_components/visualizations/ImatVseprShapes";
import {
  EQUIVALENCE_ML,
  INDICATORS,
  KA_WEAK,
  TITRATION,
  phAt,
  sampleVolumes,
} from "../src/app/notes/_components/visualizations/ImatTitrationCurve";
import { ENDO, EXO, deltaH, ea, eaReverse, signed } from "../src/app/notes/_components/visualizations/ImatEnergyProfile";
import { LEVELS, PEAKS, routeNumbers } from "../src/app/notes/_components/visualizations/ImatCatalystProfile";
import { LC_STEPS, STATES, quotient } from "../src/app/notes/_components/visualizations/ImatLeChatelier";
import {
  AUFBAU_STEPS,
  BOXES,
  ELECTRONS,
  configAfter,
  placedBy,
  unpairedAfter,
} from "../src/app/notes/_components/visualizations/ImatAufbauFilling";
import { DECAY, GUIDES, T_RANGE, amountLeft, grams } from "../src/app/notes/_components/visualizations/ImatHalfLifeDecay";

// Seven IMAT chemistry figures (task chem1). Each draws its concept's own
// numbers and example, so those are pinned here against the concept's text.

describe("imat-vsepr-shapes (concept imat-bnd-shapes-table)", () => {
  const find = (d: number, lp: number) => {
    const s = VSEPR_SHAPES.find((x) => x.domains === d && x.lonePairs === lp);
    if (!s) throw new Error(`no shape ${d}/${lp}`);
    return s;
  };

  it("draws every row of the concept's table, with its name and angle as worded there", () => {
    expect(VSEPR_SHAPES.map((s) => [s.domains, s.lonePairs, s.name.join(" "), s.angle])).toEqual([
      [2, 0, "Linear", "180°"],
      [3, 0, "Trigonal planar", "120°"],
      [3, 1, "Bent", "just under 120°"],
      [4, 0, "Tetrahedral", "109.5°"],
      [4, 1, "Trigonal pyramidal", "about 107°"],
      [4, 2, "Bent", "about 104.5°"],
      [5, 0, "Trigonal bipyramidal", "120° and 90°"],
      [5, 1, "Seesaw", "below 120° and 90°"],
      [5, 2, "T-shaped", "about 90°"],
      [6, 0, "Octahedral", "90°"],
      [6, 2, "Square planar", "90°"],
    ]);
  });

  it("draws as many domains as the row says, with the right number of lone pairs", () => {
    for (const s of VSEPR_SHAPES) {
      expect(s.dirs).toHaveLength(s.domains);
      expect(s.dirs.filter((d) => d.lone)).toHaveLength(s.lonePairs);
    }
  });

  it("uses the table's example molecules", () => {
    expect(find(2, 0).examples).toBe("BeCl₂, CO₂, C₂H₂");
    expect(find(3, 0).examples).toBe("BF₃, SO₃, CO₃²⁻");
    expect(find(4, 0).examples).toBe("CH₄, NH₄⁺, SO₄²⁻");
    expect(find(4, 1).examples).toBe("NH₃, PCl₃, H₃O⁺");
    expect(find(4, 2).examples).toBe("H₂O, H₂S");
    expect(find(6, 2).examples).toBe("XeF₄");
  });

  it("names ammonia's shape from its atoms: pyramidal, not tetrahedral (the trap)", () => {
    const nh3 = VSEPR_SHAPES.find((s) => s.examples.includes("NH₃,"));
    expect(nh3?.name.join(" ")).toBe("Trigonal pyramidal");
  });

  it("draws the planar angles true: 180° linear, 120° trigonal, 104.5° for water, under 120° for SO₂", () => {
    const atoms = (d: number, lp: number) => find(d, lp).dirs.filter((x) => !x.lone);
    const [l1, l2] = atoms(2, 0);
    expect(drawnAngle(l1, l2)).toBeCloseTo(180, 6);
    const tp = atoms(3, 0);
    expect(drawnAngle(tp[0], tp[1])).toBeCloseTo(120, 6);
    expect(drawnAngle(tp[1], tp[2])).toBeCloseTo(120, 6);
    const [w1, w2] = atoms(4, 2);
    expect(drawnAngle(w1, w2)).toBeCloseTo(104.5, 6);
    const [s1, s2] = atoms(3, 1);
    const so2 = drawnAngle(s1, s2);
    expect(so2).toBeLessThan(120);
    expect(so2).toBeGreaterThan(110);
  });

  it("puts the two lone pairs of the square planar shape opposite each other", () => {
    const [a, b] = find(6, 2).dirs.filter((d) => d.lone);
    expect(drawnAngle(a, b)).toBeCloseTo(180, 6);
  });
});

describe("imat-titration-curve (concept imat-abp-indicators)", () => {
  const weak = (v: number) => phAt(v, KA_WEAK);

  it("uses the concept's indicator ranges and ethanoic acid's pKa of 4.7", () => {
    expect(INDICATORS).toEqual({ methylOrange: { low: 3.1, high: 4.4 }, phenolphthalein: { low: 8.2, high: 10 } });
    expect(TITRATION.pKa).toBe(4.7);
  });

  it("reaches equivalence at 25.0 mL: 25.0 mL × 0.100 mol/L of acid needs 25.0 mL of 0.100 mol/L NaOH", () => {
    expect(EQUIVALENCE_ML).toBeCloseTo(25, 9);
  });

  it("strong acid with strong base: starts at pH 1 and is neutral, pH 7, at equivalence", () => {
    expect(phAt(0)).toBeCloseTo(1, 3);
    expect(phAt(EQUIVALENCE_ML)).toBeCloseTo(7, 3);
  });

  it("weak acid with strong base: starts higher and is basic at equivalence, about 8.7 (table: about 8 to 9)", () => {
    // pH of 0.100 mol/L ethanoic acid: ½(4.7 + 1) = 2.85
    expect(weak(0)).toBeCloseTo(2.85, 1);
    // 0.050 mol/L ethanoate: Kb = 10^-9.3, [OH⁻] = √(0.05 × 10^-9.3) ≈ 5.0 × 10⁻⁶, pOH 5.3, pH 8.7
    const eq = weak(EQUIVALENCE_ML);
    expect(eq).toBeCloseTo(8.7, 1);
    expect(eq).toBeGreaterThan(8);
    expect(eq).toBeLessThan(9);
  });

  it("has pH = pKa at the half-way point (half-neutralised weak acid = buffer)", () => {
    expect(weak(EQUIVALENCE_ML / 2)).toBeCloseTo(4.7, 2);
  });

  it("phenolphthalein's range sits on the steep part of the weak-acid curve; methyl orange changes long before", () => {
    const eq = weak(EQUIVALENCE_ML);
    expect(eq).toBeGreaterThan(INDICATORS.phenolphthalein.low);
    expect(eq).toBeLessThan(INDICATORS.phenolphthalein.high);
    expect(weak(24.9)).toBeLessThan(INDICATORS.phenolphthalein.low);
    expect(weak(25.5)).toBeGreaterThan(INDICATORS.phenolphthalein.high);
    // methyl orange has finished changing by 10 mL, far from 25 mL
    expect(weak(10)).toBeGreaterThan(INDICATORS.methylOrange.high);
  });

  it("strong acid: the jump is so large that both indicators change within half a millilitre of 25 mL", () => {
    expect(phAt(24.5)).toBeLessThan(INDICATORS.methylOrange.low);
    expect(phAt(25.5)).toBeGreaterThan(INDICATORS.phenolphthalein.high);
  });

  it("draws both curves rising all the way", () => {
    const vs = sampleVolumes();
    for (let i = 1; i < vs.length; i++) {
      expect(phAt(vs[i])).toBeGreaterThan(phAt(vs[i - 1]));
      expect(weak(vs[i])).toBeGreaterThan(weak(vs[i - 1]));
    }
  });
});

describe("imat-energy-profile (concept imat-eqk-energy-profile)", () => {
  it("draws the worked example: Ea 120, ΔH -80, so the reverse Ea is 200 kJ/mol", () => {
    expect(EXO).toEqual({ reactants: 0, peak: 120, products: -80 });
    expect(ea(EXO)).toBe(120);
    expect(deltaH(EXO)).toBe(-80);
    expect(eaReverse(EXO)).toBe(200);
  });

  it("draws the self-check's endothermic profile: Ea 110, ΔH +50, reverse Ea 60", () => {
    expect(ENDO).toEqual({ reactants: 40, peak: 150, products: 90 });
    expect(ea(ENDO)).toBe(110);
    expect(deltaH(ENDO)).toBe(50);
    expect(eaReverse(ENDO)).toBe(60);
  });

  it("keeps the concept's relation Ea(reverse) = Ea(forward) - ΔH and its sign convention", () => {
    for (const p of [EXO, ENDO]) expect(eaReverse(p)).toBe(ea(p) - deltaH(p));
    expect(signed(deltaH(EXO))).toBe("−80");
    expect(signed(deltaH(ENDO))).toBe("+50");
  });
});

describe("imat-catalyst-profile (concept imat-eqk-catalyst)", () => {
  it("starts from the energy-profile example: Ea 120, ΔH -80", () => {
    expect(routeNumbers("uncatalysed")).toEqual({ ea: 120, eaReverse: 200, deltaH: -80 });
  });

  it("lowers the activation energy, forward and reverse by the same amount", () => {
    const off = routeNumbers("uncatalysed");
    const on = routeNumbers("catalysed");
    expect(on.ea).toBeLessThan(off.ea);
    expect(off.ea - on.ea).toBe(off.eaReverse - on.eaReverse);
    expect(PEAKS.catalysed).toBeGreaterThan(LEVELS.reactants); // still a barrier
  });

  it("does NOT change ΔH or the reactant and product levels (the concept's trap)", () => {
    expect(routeNumbers("catalysed").deltaH).toBe(routeNumbers("uncatalysed").deltaH);
    expect(LEVELS).toEqual({ reactants: 0, products: -80 });
  });
});

describe("imat-le-chatelier (concept imat-eqk-lc-concentration)", () => {
  it("has one state per step", () => {
    expect(LC_STEPS.map((s) => s.title)).toEqual(["At equilibrium", "SCN⁻ added", "Shift to the right", "New equilibrium"]);
    expect(STATES).toHaveLength(LC_STEPS.length);
  });

  it("gives the same Kc before and after: 3/(3 × 1) = 1 and 5/(1 × 5) = 1", () => {
    expect(quotient(STATES[0])).toBe(1);
    expect(quotient(STATES[STATES.length - 1])).toBe(1);
  });

  it("adding SCN⁻ changes only SCN⁻ and makes Q less than Kc (1/7), so the shift is to the right", () => {
    expect(STATES[1]).toEqual({ ...STATES[0], scn: 7 });
    expect(quotient(STATES[1])).toBeCloseTo(1 / 7, 12);
    expect(quotient(STATES[2])).toBeLessThan(1);
    expect(STATES[3].fescn).toBeGreaterThan(STATES[1].fescn);
  });

  it("moves every species by the same amount (1 : 1 : 1 in the equation)", () => {
    for (const s of STATES.slice(2)) {
      const used = STATES[1].fe - s.fe;
      expect(STATES[1].scn - s.scn).toBe(used);
      expect(s.fescn - STATES[1].fescn).toBe(used);
    }
  });

  it("only partly undoes the change: SCN⁻ falls from 7, but not back to 1", () => {
    const end = STATES[STATES.length - 1].scn;
    expect(end).toBeLessThan(STATES[1].scn);
    expect(end).toBeGreaterThan(STATES[0].scn);
  });
});

describe("imat-aufbau-filling (concept imat-ats-aufbau-hund)", () => {
  const last = AUFBAU_STEPS.length - 1;

  it("ends on oxygen, the self-check: 8 electrons, 1s² 2s² 2p⁴, 2 unpaired", () => {
    expect(ELECTRONS).toHaveLength(8);
    expect(configAfter(last)).toBe("1s² 2s² 2p⁴");
    expect(unpairedAfter(last)).toBe(2);
  });

  it("passes through nitrogen, 1s² 2s² 2p³ with 3 unpaired, on the Hund step", () => {
    expect(configAfter(3)).toBe("1s² 2s² 2p³");
    expect(unpairedAfter(3)).toBe(3);
  });

  it("adds at least one electron at every step, in step order", () => {
    for (let s = 0; s <= last; s++) expect(placedBy(s).length).toBeGreaterThan(s === 0 ? 0 : placedBy(s - 1).length);
    for (let i = 1; i < ELECTRONS.length; i++) expect(ELECTRONS[i].step).toBeGreaterThanOrEqual(ELECTRONS[i - 1].step);
  });

  it("Aufbau: fills 1s, then 2s, then 2p, and draws them at rising energy", () => {
    const level = (o: string) => (o === "1s" ? 0 : o === "2s" ? 1 : 2);
    for (let i = 1; i < ELECTRONS.length; i++) expect(level(ELECTRONS[i].orbital)).toBeGreaterThanOrEqual(level(ELECTRONS[i - 1].orbital));
    expect(BOXES["2s"].y).toBeLessThan(BOXES["1s"].y);
    expect(BOXES["2px"].y).toBeLessThan(BOXES["2s"].y);
    expect(BOXES["2py"].y).toBe(BOXES["2px"].y);
    expect(BOXES["2pz"].y).toBe(BOXES["2px"].y);
  });

  it("Pauli: at most two electrons in a box, and then with opposite spins", () => {
    const boxes = new Map<string, string[]>();
    for (const e of ELECTRONS) boxes.set(e.orbital, [...(boxes.get(e.orbital) ?? []), e.spin]);
    for (const spins of boxes.values()) {
      expect(spins.length).toBeLessThanOrEqual(2);
      if (spins.length === 2) expect(spins[0]).not.toBe(spins[1]);
    }
  });

  it("Hund: one electron in each 2p box, spins parallel, before any 2p box takes a second", () => {
    const filled = new Set<string>();
    const singles: string[] = [];
    for (const e of ELECTRONS.filter((x) => x.orbital.startsWith("2p"))) {
      if (filled.has(e.orbital)) expect(filled.size).toBe(3);
      else singles.push(e.spin);
      filled.add(e.orbital);
    }
    expect(singles).toEqual(["up", "up", "up"]);
  });
});

describe("imat-half-life-decay (concept imat-ats-half-life)", () => {
  it("opens on the worked example: 80 g, half-life 5 days, after 20 days 5 g is left", () => {
    expect(DECAY).toEqual({ n0: 80, halfLife: 5, example: 20 });
    expect(DECAY.example / DECAY.halfLife).toBe(4);
    expect(amountLeft(DECAY.example)).toBe(5); // 80 / 16
    expect(grams(amountLeft(DECAY.example))).toBe("5");
  });

  it("marks 1, 2, 3 and 4 half-lives at 40, 20, 10 and 5 g: 50%, 25%, 12.5%, 6.25%", () => {
    expect(GUIDES.map((g) => g.t)).toEqual([5, 10, 15, 20]);
    expect(GUIDES.map((g) => g.grams)).toEqual([40, 20, 10, 5]);
    expect(GUIDES.map((g) => g.percent)).toEqual([50, 25, 12.5, 6.25]);
  });

  it("halves whatever is left every 5 days and never reaches zero (two half-lives leave a quarter)", () => {
    for (const t of [0, 3, 7, 12, 18]) expect(amountLeft(t + DECAY.halfLife)).toBeCloseTo(amountLeft(t) / 2, 10);
    expect(amountLeft(2 * DECAY.halfLife)).toBe(DECAY.n0 / 4);
    expect(amountLeft(T_RANGE.max)).toBeGreaterThan(0);
  });

  it("lets the slider reach the example and beyond", () => {
    expect(T_RANGE.min).toBe(0);
    expect(T_RANGE.max).toBeGreaterThanOrEqual(DECAY.example);
    expect((DECAY.example - T_RANGE.min) % T_RANGE.step).toBe(0);
  });
});
