import { describe, expect, it } from "vitest";
import {
  LEFT,
  RATE_LAW,
  RIGHT,
  SN_STEPS,
  STRUCTURES,
  configOf,
  configuration,
  groupVectors,
  sn1HasBr,
  sn1Lean,
  sn2HasBr,
  sn2Lean,
} from "../src/app/notes/_components/visualizations/CetSn1VsSn2";
import {
  EAS_STEPS,
  NITRONIUM_EQUATION,
  NITRONIUM_SIDES,
  groupsOnCarbon as easGroups,
  ringState,
  ringVertices,
  RING,
} from "../src/app/notes/_components/visualizations/CetEasMechanism";
import {
  M_GROUPS,
  OP_GROUPS,
  PANELS,
  directedPositions,
  positionName,
} from "../src/app/notes/_components/visualizations/CetDirectingEffects";
import {
  ADDITION_STEPS,
  EQUATION,
  FORMULAS,
  coBondOrder,
  groupsOnCarbon as carbonylGroups,
  oxygenCharge,
} from "../src/app/notes/_components/visualizations/CetCarbonylAddition";
import {
  PRODUCTS,
  alkylGroupsOnDoubleBond,
  betaCarbons,
  eliminate,
} from "../src/app/notes/_components/visualizations/CetSaytzeffElimination";
import {
  BY_PRODUCT,
  CHAIN_STEPS,
  MONOMER,
  MONOMER_COUNT,
  REPEAT_UNIT,
  chainRadicals,
  dotX,
  joinedCount,
  terminated,
  unitX,
} from "../src/app/notes/_components/visualizations/CetChainGrowth";

// MHT-CET Chemistry notes figures, task chem-b (scripts/notes/CET_VISUALS_BRIEF.md).
// Organic mechanisms: every charge, product and configuration is worked out here.

describe("SN1 against SN2 (cethal-sn1-vs-sn2)", () => {
  it("reads R for a known R arrangement (lowest away, a → b → c clockwise)", () => {
    // Viewed from +z with d along −z: a at 12 o'clock, b at 4, c at 8.
    const a = [0, 0.94, 0.33] as const;
    const b = [0.82, -0.47, 0.33] as const;
    const c = [-0.82, -0.47, 0.33] as const;
    expect(configuration(a, b, c)).toBe("R");
    expect(configuration(a, c, b)).toBe("S");
  });

  it("draws the concept's substrate as (R)-2-bromooctane", () => {
    expect(STRUCTURES.substrate.label).toBe("(R)-2-bromooctane");
    expect(configOf(STRUCTURES.substrate)).toBe("R");
  });

  it("SN2 inverts it: OH on the far side, umbrella flipped, (S)-octan-2-ol", () => {
    expect(STRUCTURES.sn2Product.top).toEqual(LEFT);
    expect(STRUCTURES.substrate.top).toEqual(RIGHT);
    expect(configOf(STRUCTURES.sn2Product)).toBe("S");
    expect(STRUCTURES.sn2Product.label).toBe("(S)-octan-2-ol");
  });

  it("SN1 gives both: (S) from the left face, (R) from the right face", () => {
    expect(configOf(STRUCTURES.sn1FromLeft)).toBe("S");
    expect(configOf(STRUCTURES.sn1FromRight)).toBe("R");
    expect(STRUCTURES.sn1FromLeft.label).toBe("(S)-octan-2-ol");
    expect(STRUCTURES.sn1FromRight.label).toBe("(R)-octan-2-ol");
  });

  it("flattens the three groups in the transition state and the carbocation", () => {
    for (const v of Object.values(groupVectors(0))) expect(v[0]).toBeCloseTo(0);
    expect(sn2Lean(1)).toBe(0);
    expect(sn1Lean(4)).toBe(0);
  });

  it("SN2 is one step: the umbrella goes start → flat → flipped while Br leaves", () => {
    expect([0, 1, 2].map(sn2Lean)).toEqual([1, 0, -1]);
    expect([0, 1, 2].map(sn2HasBr)).toEqual([true, true, false]);
  });

  it("SN1 breaks C–Br first (slow step), then the cation stays planar for the attack", () => {
    expect(sn1HasBr(3)).toBe(true);
    expect(sn1HasBr(4)).toBe(false);
    expect(sn1Lean(5)).toBe(0);
  });

  it("prints the rate laws: second order for SN2, first order for SN1", () => {
    expect(RATE_LAW.sn2).toBe("rate = k[RBr][OH⁻]");
    expect(RATE_LAW.sn1).toBe("rate = k[RBr]");
  });

  it("walks SN2 then SN1, in order", () => {
    expect(SN_STEPS.map((s) => s.title)).toEqual([
      "SN2: backside attack",
      "SN2: transition state",
      "SN2: inversion",
      "SN1: the slow step",
      "SN1: planar carbocation",
      "SN1: attack from either face",
    ]);
  });
});

describe("Electrophilic substitution: nitration (cetarom-eas-reactions)", () => {
  it("balances the nitronium equation in atoms and charge", () => {
    expect(NITRONIUM_EQUATION).toBe("HNO₃ + 2H₂SO₄ ⇌ NO₂⁺ + H₃O⁺ + 2HSO₄⁻");
    expect(NITRONIUM_SIDES.left).toEqual(NITRONIUM_SIDES.right);
    expect(NITRONIUM_SIDES.left).toEqual({ H: 5, N: 1, O: 11, S: 2, charge: 0 });
  });

  it("makes the electrophile, attacks, forms the σ-complex, loses H⁺, restores the ring", () => {
    expect(EAS_STEPS.map((s) => s.title)).toEqual([
      "Making the electrophile",
      "Attack on the ring",
      "The σ-complex",
      "Loss of H⁺",
      "Ring restored",
    ]);
  });

  it("is aromatic only before attack and after H⁺ is lost", () => {
    expect([0, 1, 2, 3, 4].map(ringState)).toEqual([
      "aromatic",
      "aromatic",
      "sigma-complex",
      "sigma-complex",
      "aromatic",
    ]);
  });

  it("puts H and NO₂ on the same (sp³) carbon only in the σ-complex", () => {
    expect(easGroups(0)).toEqual(["H"]);
    expect(easGroups(2)).toEqual(["H", "NO₂"]);
    expect(easGroups(4)).toEqual(["NO₂"]);
  });

  it("draws a regular hexagon with the reacting carbon on top", () => {
    const v = ringVertices();
    expect(v).toHaveLength(6);
    expect(v[0]).toEqual({ x: RING.x, y: RING.y - RING.r });
    for (const p of v) expect(Math.hypot(p.x - RING.x, p.y - RING.y)).toBeCloseTo(RING.r, 0);
  });
});

describe("Directing effects (cetarom-directing-effects)", () => {
  it("names the ring positions from the carbon holding the group", () => {
    expect([1, 2, 3, 4, 5].map(positionName)).toEqual(["o", "m", "p", "m", "o"]);
  });

  it("sends an o/p director's group to 2, 4, 6 and a meta director's to 3, 5", () => {
    expect(directedPositions("o/p")).toEqual([1, 3, 5]);
    expect(directedPositions("m")).toEqual([2, 4]);
  });

  it("classifies the three drawn groups as the concept does (halogen: o/p but deactivating)", () => {
    expect(PANELS.map((p) => [p.group, p.director, p.activates])).toEqual([
      ["OH", "o/p", true],
      ["Cl", "o/p", false],
      ["NO₂", "m", false],
    ]);
    expect(OP_GROUPS).toContain("–X");
    expect(M_GROUPS).toEqual(["–NO₂", "–CHO", "–COOH", "–COR", "–CN", "–SO₃H"]);
  });
});

describe("Nucleophilic addition of HCN (cetald-addition-derivatives)", () => {
  it("is the concept's example and balances", () => {
    expect(EQUATION).toBe("CH₃CHO + HCN → CH₃CH(OH)CN");
    const sum = (k: "C" | "H" | "N" | "O") => FORMULAS.acetaldehyde[k] + FORMULAS.HCN[k];
    for (const k of ["C", "H", "N", "O"] as const) expect(FORMULAS.cyanohydrin[k]).toBe(sum(k));
  });

  it("turns C=O into C–O⁻ on attack, then O⁻ into OH", () => {
    expect([0, 1, 2, 3].map(coBondOrder)).toEqual([2, 2, 1, 1]);
    expect([0, 1, 2, 3].map(oxygenCharge)).toEqual([0, 0, -1, 0]);
  });

  it("ends with CN and the new OH on the old carbonyl carbon", () => {
    expect(carbonylGroups(0)).toEqual(["CH₃", "H", "=O"]);
    expect(carbonylGroups(3)).toEqual(["CH₃", "H", "CN", "OH"]);
    expect(ADDITION_STEPS.map((s) => s.title)).toEqual([
      "A polar C=O",
      "The nucleophile attacks",
      "Alkoxide ion",
      "Protonation",
    ]);
  });
});

describe("Dehydrohalogenation of 2-bromobutane (cethal-dehydrohalogenation)", () => {
  it("has β-hydrogens on C1 and C3", () => {
    expect(betaCarbons()).toEqual([1, 3]);
  });

  it("gives but-1-ene from C1 and but-2-ene from C3", () => {
    expect(eliminate(1).name).toBe("but-1-ene");
    expect(eliminate(3).name).toBe("but-2-ene");
    expect(eliminate(PRODUCTS.minor.fromBeta).name).toBe(PRODUCTS.minor.name);
    expect(eliminate(PRODUCTS.major.fromBeta).name).toBe(PRODUCTS.major.name);
  });

  it("makes the more substituted alkene (Saytzeff) the major one", () => {
    const a1 = alkylGroupsOnDoubleBond(eliminate(1));
    const a3 = alkylGroupsOnDoubleBond(eliminate(3));
    expect([a1, a3]).toEqual([1, 2]);
    expect(PRODUCTS.major.alkyl).toBe(a3);
    expect(PRODUCTS.minor.alkyl).toBe(a1);
    expect(PRODUCTS.major.formula).toBe("CH₃–CH=CH–CH₃");
    expect(PRODUCTS.minor.formula).toBe("CH₂=CH–CH₂–CH₃");
  });
});

describe("Free-radical chain growth of ethene (cetpol-addition-condensation-ring-opening)", () => {
  it("walks initiation, propagation, termination", () => {
    expect(CHAIN_STEPS.map((s) => s.title)).toEqual([
      "Initiation: radicals",
      "Initiation: first monomer",
      "Propagation",
      "Chain growth",
      "Termination",
    ]);
  });

  it("adds monomers one after another and never removes one", () => {
    const counts = [0, 1, 2, 3, 4].map(joinedCount);
    expect(counts).toEqual([0, 1, 2, MONOMER_COUNT, MONOMER_COUNT]);
    for (let i = 1; i < counts.length; i++) expect(counts[i]).toBeGreaterThanOrEqual(counts[i - 1]);
  });

  it("keeps one radical at the chain end until termination pairs it", () => {
    expect([0, 1, 2, 3, 4].map(chainRadicals)).toEqual([1, 1, 1, 1, 0]);
    expect(terminated(4)).toBe(true);
    for (const s of [1, 2, 3]) expect(dotX(s)).toBeGreaterThan(unitX(joinedCount(s) - 1));
  });

  it("loses nothing: the repeat unit has the monomer's formula; condensation loses H₂O or HCl", () => {
    expect(REPEAT_UNIT).toEqual(MONOMER);
    expect(BY_PRODUCT.addition).toBeNull();
    expect(BY_PRODUCT.condensation).toBe("H₂O or HCl");
  });
});
