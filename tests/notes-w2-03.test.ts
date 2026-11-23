import { describe, expect, it } from "vitest";
import {
  NAMES,
  SHIFT_STEPS,
  bondCount,
  carbonNeighbours,
  shiftState,
} from "../src/app/notes/_components/visualizations/JeeCarbocationShift";
import {
  B1,
  B2,
  DIBORANE,
  HB_BOTTOM,
  HB_TOP,
  RING,
  angleAt,
  borazineFormula,
} from "../src/app/notes/_components/visualizations/JeeDiboraneBorazine";
import { DEFAULT_D, IONS as D_IONS, boxes, spinOnly, unpaired } from "../src/app/notes/_components/visualizations/JeeSpinOnlyMoment";
import {
  PHENOXIDE_STEPS,
  PKA,
  STRUCTURES,
  oxygenBonds,
  position,
  ringBonds,
} from "../src/app/notes/_components/visualizations/JeePhenoxideResonance";
import { ETHYL_ROWS, barLength, isAscending } from "../src/app/notes/_components/visualizations/JeeAmineBasicity";
import { METHYL_ROWS } from "../src/app/notes/_components/visualizations/NeetAmineBasicity";
import { PHENOL_ROWS } from "../src/app/notes/_components/visualizations/NeetPhenolAcidity";
import { XENON, hybridFor, lonePairsByCount } from "../src/app/notes/_components/visualizations/NeetXenonShapes";
import { GROUP, IONS as LN_IONS, atomRadius, ionRadius } from "../src/app/notes/_components/visualizations/NeetLanthanoidContraction";
import { AFTER, BEFORE, atoms, limiting } from "../src/app/notes/_components/visualizations/NeetLimitingReagent";
import {
  CHANGES,
  EQUATION,
  electronsGained,
  electronsLostEach,
  ironMultiplier,
  totalAtoms,
  totalCharge,
} from "../src/app/notes/_components/visualizations/NeetRedoxBalance";

// Group 03 notes figures: JEE Mains and NEET Chemistry chapters that had none
// (scripts/notes/CET_VISUALS_BRIEF.md). Each figure draws its concept's own
// example, so those numbers and the chemistry of each frame are pinned here.

describe("1,2-methyl shift (jcorm-carbocation-shifts)", () => {
  it("walks the worked example in five steps, alcohol to alkene", () => {
    expect(SHIFT_STEPS).toHaveLength(5);
    expect(NAMES.start).toBe("3,3-dimethylbutan-2-ol");
    expect(NAMES.product).toBe("2,3-dimethylbut-2-ene");
  });

  it("gives every neutral carbon four bonds and the cation carbon three", () => {
    for (let step = 0; step < SHIFT_STEPS.length; step++) {
      const s = shiftState(step);
      for (const c of ["C2", "C3"] as const) {
        expect(bondCount(s, c)).toBe(s.charge === c ? 3 : 4);
      }
    }
  });

  it("moves the charge from a secondary to a tertiary carbon by moving the CH₃", () => {
    const before = shiftState(2);
    const after = shiftState(3);
    expect(before.arrow).toBe(true);
    expect(before.charge).toBe("C2");
    expect(carbonNeighbours(before, "C2")).toBe(2);
    expect(after.movedOn).toBe("C2");
    expect(after.charge).toBe("C3");
    expect(carbonNeighbours(after, "C3")).toBe(3);
  });

  it("ends neutral, with the double bond and C-2's H gone (C₆H₁₂)", () => {
    const end = shiftState(4);
    expect(end.charge).toBeNull();
    expect(end.double).toBe(true);
    expect(end.c2H).toBe(false);
    expect(shiftState(0).oh).toBe(true);
    expect(shiftState(1).oh).toBe(false);
  });
});

describe("diborane and borazine (jcpb-diborane-borazine)", () => {
  it("uses the concept table's numbers", () => {
    expect(DIBORANE.valenceElectrons).toBe(12);
    expect(DIBORANE.terminalBonds).toBe(4);
    expect(DIBORANE.bridges * DIBORANE.electronsPerBridge).toBe(4);
    expect(DIBORANE.terminalAngle).toBe(122);
    expect(DIBORANE.bridgeAngle).toBe(97);
    expect(DIBORANE.terminalPm).toBe(119);
    expect(DIBORANE.bridgePm).toBe(134);
    expect(DIBORANE.terminalAngle).toBeGreaterThan(DIBORANE.bridgeAngle);
  });

  it("draws the bridge H–B–H angle at 97° at both borons, one H above and one below", () => {
    expect(angleAt(B1, HB_TOP, HB_BOTTOM)).toBeCloseTo(97, 6);
    expect(angleAt(B2, HB_TOP, HB_BOTTOM)).toBeCloseTo(97, 6);
    expect(HB_TOP.y).toBeLessThan(B1.y);
    expect(HB_BOTTOM.y).toBeGreaterThan(B1.y);
  });

  it("draws borazine as B₃N₃H₆, B and N alternating, six equal ring bonds", () => {
    expect(borazineFormula()).toEqual({ B: 3, N: 3, H: 6 });
    RING.forEach((a, i) => expect(a.el).not.toBe(RING[(i + 1) % 6].el));
    const lengths = RING.map((a, i) => Math.hypot(RING[(i + 1) % 6].x - a.x, RING[(i + 1) % 6].y - a.y));
    for (const l of lengths) expect(l).toBeCloseTo(lengths[0], 6);
  });
});

describe("spin-only moment (jcdfb-spin-only)", () => {
  it("gives the concept's moments for n = 0 to 5", () => {
    expect([0, 1, 2, 3, 4, 5].map(spinOnly)).toEqual([0, 1.73, 2.83, 3.87, 4.9, 5.92]);
  });

  it("counts unpaired electrons as x to d⁵, then 10 − x", () => {
    expect(Array.from({ length: 11 }, (_, x) => unpaired(x))).toEqual([0, 1, 2, 3, 4, 5, 4, 3, 2, 1, 0]);
    for (let x = 0; x <= 10; x++) {
      const b = boxes(x);
      expect(b.reduce((s, e) => s + e, 0)).toBe(x);
      expect(b.filter((e) => e === 1)).toHaveLength(unpaired(x));
    }
  });

  it("opens on the worked example: Co²⁺, d⁷, 3.87 BM", () => {
    expect(DEFAULT_D).toBe(7);
    expect(D_IONS[7]).toBe("Co²⁺");
    expect(spinOnly(unpaired(7))).toBe(3.87);
    expect(D_IONS[1]).toBe("Ti³⁺");
    expect(spinOnly(unpaired(1))).toBe(1.73);
    expect(D_IONS[5]).toBe("Mn²⁺, Fe³⁺");
    expect(spinOnly(unpaired(5))).toBe(5.92);
    expect(spinOnly(unpaired(8))).toBe(2.83); // Ni²⁺
    expect(spinOnly(unpaired(0))).toBe(0); // Sc³⁺
  });
});

describe("phenoxide resonance (jcalc-phenol-vs-alcohol)", () => {
  it("has four structures then the hybrid", () => {
    expect(PHENOXIDE_STEPS).toHaveLength(5);
    expect(STRUCTURES).toHaveLength(4);
  });

  it("moves the charge O, ortho, para, ortho", () => {
    expect(STRUCTURES[0].charge).toBe("O");
    expect(STRUCTURES.slice(1).map((s) => position(s.charge as number))).toEqual(["ortho", "para", "ortho"]);
  });

  it("draws valid structures: neutral carbons four bonds, the charged one three", () => {
    for (const s of STRUCTURES) {
      expect(s.doubles.length + (s.co ? 1 : 0)).toBe(3);
      for (let i = 0; i < 6; i++) expect(ringBonds(s, i)).toBe(s.charge === i ? 3 : 4);
      expect(oxygenBonds(s)).toBe(s.charge === "O" ? 1 : 2);
    }
  });

  it("prints the concept's pKa values, phenol far below water and ethanol", () => {
    expect(PKA.map((p) => [p.name, p.value])).toEqual([
      ["phenol", 10.0],
      ["water", 15.7],
      ["ethanol", 15.9],
    ]);
  });
});

describe("amine basicity bars (jcamine-basicity-aliphatic, ncham-basicity)", () => {
  it("uses the ethyl series pKb values, strongest first", () => {
    expect(ETHYL_ROWS.map((r) => [r.label, r.value])).toEqual([
      ["(C₂H₅)₂NH", 3.0],
      ["(C₂H₅)₃N", 3.25],
      ["C₂H₅NH₂", 3.29],
      ["NH₃", 4.75],
      ["aniline", 9.38],
    ]);
    expect(isAscending(ETHYL_ROWS)).toBe(true);
  });

  it("uses the methyl series pKb values, strongest first", () => {
    expect(METHYL_ROWS.map((r) => [r.label, r.value])).toEqual([
      ["(CH₃)₂NH", 3.27],
      ["CH₃NH₂", 3.38],
      ["(CH₃)₃N", 4.22],
      ["NH₃", 4.75],
      ["aniline", 9.38],
    ]);
    expect(isAscending(METHYL_ROWS)).toBe(true);
  });

  it("scales bars linearly, so a larger value is a longer bar", () => {
    expect(barLength(10, 10)).toBe(180);
    expect(barLength(5, 10)).toBe(90);
    expect(barLength(9.38, 10)).toBeGreaterThan(barLength(4.75, 10));
  });
});

describe("phenol acidity bars (nchal-acidity)", () => {
  it("uses the concept's pKa values in order of acid strength", () => {
    expect(PHENOL_ROWS.map((r) => [r.label, r.value])).toEqual([
      ["p-nitrophenol", 7.1],
      ["o-nitrophenol", 7.2],
      ["m-nitrophenol", 8.3],
      ["phenol", 10.0],
      ["p-cresol", 10.2],
      ["ethanol", 15.9],
    ]);
    expect(isAscending(PHENOL_ROWS)).toBe(true);
  });
});

describe("xenon compounds (nchpb-xenon)", () => {
  it("matches the concept table", () => {
    expect(XENON.map((m) => [m.formula, m.bondPairs, m.lonePairs, m.hybrid, m.shape])).toEqual([
      ["XeF₂", 2, 3, "sp³d", "linear"],
      ["XeF₄", 4, 2, "sp³d²", "square planar"],
      ["XeF₆", 6, 1, "sp³d³", "distorted octahedral"],
      ["XeO₃", 3, 1, "sp³", "pyramidal"],
      ["XeOF₄", 5, 1, "sp³d²", "square pyramidal"],
    ]);
  });

  it("draws as many atoms and lone pairs as the table says, and the counting agrees", () => {
    for (const m of XENON) {
      expect(m.ligands).toHaveLength(m.bondPairs);
      expect(m.lobes).toHaveLength(m.lonePairs);
      expect(lonePairsByCount(m.ligands)).toBe(m.lonePairs);
      expect(hybridFor(m.bondPairs + m.lonePairs)).toBe(m.hybrid);
    }
  });

  it("puts XeF₄'s two lone pairs opposite each other", () => {
    const [a, b] = XENON[1].lobes;
    expect(a[0] + b[0]).toBe(0);
    expect(a[1] + b[1]).toBe(0);
  });
});

describe("lanthanoid contraction (nchdf-contraction)", () => {
  it("orders the named ions by atomic number and shrinks each one", () => {
    expect(LN_IONS.map((i) => i.ion)).toEqual(["La³⁺", "Nd³⁺", "Gd³⁺", "Dy³⁺", "Lu³⁺"]);
    expect(LN_IONS[1].z).toBe(60);
    expect(LN_IONS[3].z).toBe(66);
    for (let i = 1; i < LN_IONS.length; i++) expect(ionRadius(i)).toBeLessThan(ionRadius(i - 1));
  });

  it("gives Zr 160 pm and Hf 159 pm, drawn to one scale", () => {
    expect(GROUP.map((g) => [g.el, g.row, g.pm])).toEqual([
      ["Zr", "4d", 160],
      ["Hf", "5d", 159],
    ]);
    expect(atomRadius(160) - atomRadius(159)).toBeCloseTo(1 / 8, 9);
  });
});

describe("limiting reagent (nchsb-limiting)", () => {
  it("does the worked example: H₂ limits, 36 g water, 32 g O₂ left", () => {
    const r = limiting();
    expect(r.nH2).toBe(2);
    expect(r.nO2).toBe(2);
    expect(r.rH2).toBe(1);
    expect(r.rO2).toBe(2);
    expect(r.limits).toBe("H₂");
    expect(r.nWater).toBe(2);
    expect(r.waterMass).toBe(36);
    expect(r.o2Left).toBe(1);
    expect(r.o2LeftMass).toBe(32);
  });

  it("draws the moles it states, and every atom before is there after", () => {
    const r = limiting();
    expect(BEFORE.H2).toBe(r.nH2);
    expect(BEFORE.O2).toBe(r.nO2);
    expect(AFTER.H2O).toBe(r.nWater);
    expect(AFTER.O2).toBe(r.o2Left);
    expect(atoms(BEFORE)).toEqual(atoms(AFTER));
    expect(atoms(BEFORE)).toEqual({ H: 4, O: 4 });
  });
});

describe("redox balance (nchrr-balancing)", () => {
  it("matches the electrons: Mn gains 5, Fe loses 1 each, so 5 Fe²⁺", () => {
    expect(CHANGES.mn.from).toBe(7);
    expect(CHANGES.mn.to).toBe(2);
    expect(electronsGained).toBe(5);
    expect(electronsLostEach).toBe(1);
    expect(ironMultiplier).toBe(5);
    expect(EQUATION.left[1].coef).toBe(ironMultiplier);
  });

  it("balances charge (+17 each side) and every atom", () => {
    expect(totalCharge(EQUATION.left)).toBe(17);
    expect(totalCharge(EQUATION.right)).toBe(17);
    for (const el of ["Mn", "Fe", "O", "H"] as const) {
      expect(totalAtoms(EQUATION.left, el)).toBe(totalAtoms(EQUATION.right, el));
    }
  });
});
