import { describe, expect, it } from "vitest";
import {
  CYCLIC,
  CYCLIC_PATH,
  NADP,
  NON_CYCLIC,
  PHOTOSYSTEMS,
  WATER_SPLIT,
  Z_SCHEME_STEPS,
  cyclicElectronPose,
  cyclicPoint,
  electronPose,
  waterElectronPose,
} from "../src/app/notes/_components/visualizations/NeetZScheme";
import {
  CALVIN_STEPS,
  NODES,
  STAGES,
  TURNS_PER_GLUCOSE,
  costAfter,
  markerAt,
  nodePoint,
} from "../src/app/notes/_components/visualizations/NeetCalvinCycle";
import {
  ANATOMY,
  C4_FLOW,
  CELL_ENZYMES,
  VEIN_R,
  ringCells,
} from "../src/app/notes/_components/visualizations/NeetKranzAnatomy";
import {
  CYCLE,
  CYCLE_YIELDS,
  GLYCOLYSIS,
  LINK_STEP,
  MITOCHONDRION_TOP,
  RESPIRATION_STEPS,
  perPyruvicAcid,
  sumYields,
  tokenAt,
} from "../src/app/notes/_components/visualizations/NeetRespirationPathway";
import {
  GENES,
  INDUCERS,
  LAC_STEPS,
  PRODUCTS,
  inducerPose,
  operatorBlocked,
  polymerasePose,
  repressorPose,
} from "../src/app/notes/_components/visualizations/NeetLacOperon";
import {
  ANTIPODALS,
  ANTIPODAL_R,
  CELLS,
  EGG,
  EGG_APPARATUS_BOX,
  POLAR_NUCLEI,
  SAC,
  SYNERGIDS,
  SYNERGID_SIZE,
  insideSac,
  totals,
} from "../src/app/notes/_components/visualizations/NeetEmbryoSac";

// Six NEET Biology figures (scripts/notes/CET_VISUALS_BRIEF.md, NEET task "bio-a").
// Each is only worth having if it says what its NCERT-based concept says, so
// the concept's own counts, names and orders are pinned here.

const dist = (a: { x: number; y: number }, b: { x: number; y: number }) => Math.hypot(a.x - b.x, a.y - b.y);

describe("Z scheme (nbops-light-reaction)", () => {
  it("names the reaction centres as the concept does: PS II is P680, PS I is P700", () => {
    expect([PHOTOSYSTEMS.psII.centre, PHOTOSYSTEMS.psII.nm]).toEqual(["P680", 680]);
    expect([PHOTOSYSTEMS.psI.centre, PHOTOSYSTEMS.psI.nm]).toEqual(["P700", 700]);
  });

  it("lifts the electron at each photosystem (the two upstrokes of the Z)", () => {
    expect(PHOTOSYSTEMS.psII.acceptor.y).toBeLessThan(PHOTOSYSTEMS.psII.rc.y);
    expect(PHOTOSYSTEMS.psI.acceptor.y).toBeLessThan(PHOTOSYSTEMS.psI.rc.y);
  });

  it("walks the electron PS II acceptor, PS I, PS I acceptor, NADP⁺, left to right", () => {
    expect(electronPose(0)).toMatchObject(PHOTOSYSTEMS.psII.acceptor);
    expect(dist(electronPose(1), PHOTOSYSTEMS.psI.rc)).toBeLessThan(20);
    expect(electronPose(2)).toMatchObject(PHOTOSYSTEMS.psI.acceptor);
    expect(electronPose(3)).toMatchObject(NADP);
    const xs = [0, 1, 2, 3].map((s) => electronPose(s).x);
    expect([...xs].sort((a, b) => a - b)).toEqual(xs);
    expect(electronPose(4).opacity).toBe(0);
  });

  it("balances the splitting of water: 2H₂O gives 4H⁺ + O₂ + 4e⁻", () => {
    expect(WATER_SPLIT.text).toBe("2H₂O → 4H⁺ + O₂ + 4e⁻");
    expect(WATER_SPLIT.water * 2).toBe(WATER_SPLIT.protons); // hydrogen
    expect(WATER_SPLIT.water * 1).toBe(WATER_SPLIT.oxygen * 2); // oxygen
    expect(WATER_SPLIT.electrons).toBe(WATER_SPLIT.protons); // charge
  });

  it("puts water splitting at PS II, never PS I (the concept's trap)", () => {
    expect(Math.abs(WATER_SPLIT.at.x - PHOTOSYSTEMS.psII.rc.x)).toBeLessThan(10);
    expect(dist(WATER_SPLIT.at, PHOTOSYSTEMS.psI.rc)).toBeGreaterThan(100);
    expect(waterElectronPose(3).opacity).toBe(0);
    expect(dist(waterElectronPose(4), PHOTOSYSTEMS.psII.rc)).toBeLessThan(40);
  });

  it("makes ATP, NADPH + H⁺ and O₂ by the non-cyclic route, ATP only by the cyclic one (PS I alone)", () => {
    expect(NON_CYCLIC.photosystems).toEqual(["PS II", "PS I"]);
    expect(NON_CYCLIC.products).toEqual(["ATP", "NADPH + H⁺", "O₂"]);
    expect(CYCLIC.photosystems).toEqual(["PS I"]);
    expect(CYCLIC.products).toEqual(["ATP"]);
  });

  it("brings the cyclic loop from PS I's acceptor back into the cytochrome chain", () => {
    expect(cyclicPoint(0)).toEqual(CYCLIC_PATH.from);
    expect(cyclicPoint(1)).toEqual(CYCLIC_PATH.to);
    expect(dist(CYCLIC_PATH.from, PHOTOSYSTEMS.psI.acceptor)).toBeLessThan(6);
    // The cytochrome chain runs from PS II's acceptor (88, 50) to (190, 132).
    const yOnChain = 50 + ((CYCLIC_PATH.to.x - 88) / (190 - 88)) * (132 - 50);
    expect(Math.abs(CYCLIC_PATH.to.y - yOnChain)).toBeLessThan(1);
    expect(cyclicElectronPose(4).opacity).toBe(0);
    expect(cyclicElectronPose(5).opacity).toBe(1);
  });

  it("never brings CO₂ into the light reaction", () => {
    for (const s of Z_SCHEME_STEPS) expect(`${s.title} ${s.caption}`).not.toMatch(/CO₂/);
    expect(Z_SCHEME_STEPS).toHaveLength(6);
  });
});

describe("Calvin cycle (nbops-calvin-stages)", () => {
  it("walks the three stages in the concept's order, then the cost", () => {
    expect(CALVIN_STEPS.map((s) => s.title)).toEqual(["Carboxylation", "Reduction", "Regeneration", "The cost"]);
    expect(STAGES.map((s) => s.name)).toEqual(["Carboxylation", "Reduction", "Regeneration"]);
  });

  it("charges each stage as the concept's table does: 0, then 2 ATP + 2 NADPH, then 1 ATP", () => {
    expect(STAGES.map((s) => [s.atp, s.nadph])).toEqual([
      [0, 0],
      [2, 2],
      [1, 0],
    ]);
    expect([0, 1, 2, 3].map(costAfter)).toEqual([
      { atp: 0, nadph: 0 },
      { atp: 2, nadph: 2 },
      { atp: 3, nadph: 2 },
      { atp: 3, nadph: 2 },
    ]);
  });

  it("costs 18 ATP and 12 NADPH for one glucose (6 turns)", () => {
    expect(TURNS_PER_GLUCOSE).toBe(6);
    expect(TURNS_PER_GLUCOSE * costAfter(2).atp).toBe(18);
    expect(TURNS_PER_GLUCOSE * costAfter(2).nadph).toBe(12);
  });

  it("balances the carbons of carboxylation: RuBP (5) + CO₂ (1) = two 3-PGA (3 each)", () => {
    expect(NODES.rubp.carbons + 1).toBe(NODES.pga.count * NODES.pga.carbons);
    expect(NODES.rubp.carbons).toBe(5);
    expect(NODES.pga.carbons).toBe(3);
  });

  it("moves the marker round the ring: 3-PGA, then sugar, then RuBP again", () => {
    expect(markerAt(0)).toEqual(nodePoint(NODES.pga.angle));
    expect(markerAt(1)).toEqual(nodePoint(NODES.sugar.angle));
    expect(markerAt(2)).toEqual(nodePoint(NODES.rubp.angle));
  });

  it("gives carboxylation to RuBisCO, never PEP carboxylase (the concept's trap)", () => {
    expect(CALVIN_STEPS[0].caption).toMatch(/RuBisCO/);
    for (const s of CALVIN_STEPS) expect(s.caption).not.toMatch(/PEP/);
  });
});

describe("Kranz anatomy (nbops-c4)", () => {
  it("gives each cell one enzyme and not the other", () => {
    expect(CELL_ENZYMES.mesophyll).toEqual({ has: "PEPcase", lacks: "RuBisCO" });
    expect(CELL_ENZYMES.bundleSheath).toEqual({ has: "RuBisCO", lacks: "PEPcase" });
  });

  it("balances the carbons at every step: PEP (3) + CO₂ (1) = OAA (4), and the C₄ acid splits into CO₂ + a 3-carbon molecule", () => {
    for (const s of C4_FLOW) {
      const sum = (side: readonly (readonly [string, number])[]) => side.reduce((a, [, c]) => a + c, 0);
      expect(sum(s.in as readonly (readonly [string, number])[])).toBe(sum(s.out as readonly (readonly [string, number])[]));
    }
    expect(C4_FLOW.map((s) => s.cell)).toEqual(["mesophyll", "mesophyll", "bundleSheath"]);
  });

  it("draws the bundle sheath as a closed wreath of large cells, richer in chloroplasts", () => {
    const bs = ANATOMY.bundleSheath;
    const m = ANATOMY.mesophyll;
    expect(2 * bs.r * bs.count).toBeGreaterThanOrEqual(2 * Math.PI * bs.ring); // no spaces between them
    expect(bs.r).toBeGreaterThan(m.r);
    expect(bs.chloroplasts).toBeGreaterThan(m.chloroplasts);
    expect(bs.ring - bs.r).toBeGreaterThan(VEIN_R); // round the vein, not over it
    expect(m.ring - m.r).toBeGreaterThanOrEqual(bs.ring + bs.r); // mesophyll outside the sheath
    expect(ringCells(bs.ring, bs.count)).toHaveLength(10);
  });
});

describe("Respiration pathway (nbors-glycolysis-steps, nbors-krebs-cycle)", () => {
  it("gives glycolysis the concept's count: 2 pyruvic acid, 4 ATP made, 2 used, 2 NADH + H⁺", () => {
    expect(GLYCOLYSIS.pyruvicAcid * GLYCOLYSIS.pyruvicCarbons).toBe(GLYCOLYSIS.glucoseCarbons);
    expect(GLYCOLYSIS.atpMade - GLYCOLYSIS.atpUsed).toBe(2);
    expect(GLYCOLYSIS.nadh).toBe(2);
  });

  it("drops one carbon as CO₂ from pyruvic acid to acetyl CoA, with one NADH + H⁺", () => {
    expect(GLYCOLYSIS.pyruvicCarbons - LINK_STEP.co2).toBe(LINK_STEP.acetylCarbons);
    expect(LINK_STEP.nadh).toBe(1);
  });

  it("follows the carbons round the cycle: 2 + 4 = 6, then 5, then 4, one CO₂ per carbon lost", () => {
    expect(CYCLE.map((c) => c.name)).toEqual([
      "citric acid",
      "α-ketoglutaric acid",
      "succinyl-CoA",
      "succinic acid",
      "malic acid",
      "OAA",
    ]);
    expect(LINK_STEP.acetylCarbons + CYCLE[5].carbons).toBe(CYCLE[0].carbons);
    for (let k = 0; k < CYCLE.length - 1; k++) {
      expect((CYCLE[k].carbons as number) - CYCLE[k + 1].carbons).toBe(CYCLE_YIELDS[k].co2);
    }
  });

  it("makes 3 NADH + H⁺, 1 FADH₂, 1 ATP and 2 CO₂ per turn", () => {
    expect(sumYields(CYCLE_YIELDS)).toEqual({ co2: 2, nadh: 3, fadh2: 1, atp: 1 });
  });

  it("matches the self-check for one pyruvic acid: 4 NADH + H⁺, 1 FADH₂, 1 ATP, 3 CO₂", () => {
    expect(perPyruvicAcid()).toEqual({ co2: 3, nadh: 4, fadh2: 1, atp: 1 });
  });

  it("keeps glycolysis in the cytoplasm and the rest in the matrix, and labels the token with its carbons", () => {
    expect(tokenAt(0).y).toBeLessThan(MITOCHONDRION_TOP);
    for (const s of [1, 2, 3, 4, 5]) expect(tokenAt(s).y).toBeGreaterThan(MITOCHONDRION_TOP);
    expect([0, 1, 2, 3, 4, 5].map((s) => tokenAt(s).carbons)).toEqual([3, 2, 6, 4, 4, 4]);
    expect(RESPIRATION_STEPS).toHaveLength(6);
  });
});

describe("Lac operon (nbomb-lac-switch)", () => {
  it("lays out i, p, o, z, y, a in order, with the concept's products", () => {
    expect(GENES.map((g) => g.id)).toEqual(["i", "p", "o", "z", "y", "a"]);
    for (let k = 1; k < GENES.length; k++) expect(GENES[k].x0).toBeGreaterThanOrEqual(GENES[k - 1].x1);
    expect(PRODUCTS).toEqual({ z: "beta-galactosidase", y: "permease", a: "transacetylase" });
  });

  it("has lactose and allolactose as inducers, never glucose or galactose", () => {
    expect(INDUCERS).toEqual(["lactose", "allolactose"]);
    for (const s of LAC_STEPS) expect(`${s.title} ${s.caption}`).not.toMatch(/\bglucose\b|\bgalactose\b/i);
  });

  it("blocks the operator only while there is no inducer", () => {
    expect([0, 1, 2, 3, 4].map(operatorBlocked)).toEqual([false, true, true, false, false]);
    expect(inducerPose(1).opacity).toBe(0);
    expect(dist(inducerPose(3), repressorPose(3))).toBeLessThan(25);
    expect(dist(inducerPose(4), repressorPose(4))).toBeLessThan(25);
  });

  it("lets RNA polymerase past the operator only once the operator is free", () => {
    const o = GENES[2];
    for (const s of [0, 1, 2, 3, 4]) {
      if (polymerasePose(s).x > o.x1) expect(operatorBlocked(s)).toBe(false);
    }
    expect(polymerasePose(4).x).toBeGreaterThan(GENES[5].x0);
  });

  it("shows the repressor in every step: it is made all the time, lactose only inactivates it", () => {
    for (const s of [0, 1, 2, 3, 4]) expect(repressorPose(s).opacity).toBe(1);
    expect(LAC_STEPS[3].caption).toMatch(/inactivates/);
  });
});

describe("Embryo sac (nbosr-embryo-sac)", () => {
  it("is 7-celled and 8-nucleate", () => {
    expect(totals()).toEqual({ cells: 7, nuclei: 8 });
    expect(SYNERGIDS).toHaveLength(2);
    expect(ANTIPODALS).toHaveLength(3);
    expect(POLAR_NUCLEI).toHaveLength(2);
  });

  it("makes the egg apparatus two synergids and one egg, without the polar nuclei (the concept's trap)", () => {
    const apparatus = CELLS.filter((c) => c.inEggApparatus);
    expect(apparatus.map((c) => [c.name, c.count])).toEqual([
      ["synergid", 2],
      ["egg cell", 1],
    ]);
    for (const p of POLAR_NUCLEI) expect(p.x).toBeGreaterThan(EGG_APPARATUS_BOX.x1);
    const b = EGG_APPARATUS_BOX;
    for (const s of SYNERGIDS) {
      expect(s.x - SYNERGID_SIZE.rx).toBeGreaterThanOrEqual(b.x0);
      expect(s.x + SYNERGID_SIZE.rx).toBeLessThanOrEqual(b.x1);
      expect(s.y - SYNERGID_SIZE.ry).toBeGreaterThanOrEqual(b.y0);
      expect(s.y + SYNERGID_SIZE.ry).toBeLessThanOrEqual(b.y1);
    }
    expect(EGG.x - EGG.r).toBeGreaterThanOrEqual(b.x0);
    expect(EGG.x + EGG.r).toBeLessThanOrEqual(b.x1);
  });

  it("puts the egg apparatus at the micropylar end (left), the polar nuclei in the middle, the antipodals at the chalazal end", () => {
    expect(EGG.x + EGG.r).toBeLessThan(Math.min(...POLAR_NUCLEI.map((p) => p.x)));
    expect(Math.max(...POLAR_NUCLEI.map((p) => p.x))).toBeLessThan(Math.min(...ANTIPODALS.map((a) => a.x - ANTIPODAL_R)));
    expect(CELLS.find((c) => c.name === "antipodal")?.end).toBe("chalazal");
  });

  it("keeps every cell inside the sac, with the filiform apparatus at the synergids' micropylar tip", () => {
    for (const p of [...SYNERGIDS, EGG, ...POLAR_NUCLEI, ...ANTIPODALS]) expect(insideSac(p)).toBe(true);
    for (const a of ANTIPODALS) expect(insideSac({ x: a.x + ANTIPODAL_R, y: a.y })).toBe(true);
    for (const s of SYNERGIDS) {
      const tip = { x: s.x - SYNERGID_SIZE.rx, y: s.y };
      expect(insideSac(tip)).toBe(true);
      expect(tip.x).toBeLessThan(SAC.cx);
    }
  });
});
