import { describe, expect, it } from "vitest";
import {
  CELL_KINDS,
  COORDINATION,
  COUNT_STEPS,
  SHARE,
  atomsPerCell,
  cellAtoms,
  cellLit,
  project,
} from "../src/app/notes/_components/visualizations/CetUnitCellCounting";
import {
  EXAMPLE_N,
  FCC_ATOMS,
  OCTA_SPHERES,
  RADIUS_RATIO,
  SPHERES_AROUND,
  TETRA_SPHERES,
  VOIDS_PER_ATOM,
  centroid,
  sci,
  voidCounts,
} from "../src/app/notes/_components/visualizations/CetTetraOctaVoids";
import {
  BCC_EXAMPLE,
  CONTACT_LINE,
  FCC_SELF_CHECK,
  PANELS,
  RADII_ON_LINE,
  contactLine,
  edgeFromRadius,
  panelAtoms,
  radiusFromEdge,
} from "../src/app/notes/_components/visualizations/CetEdgeLengthRadius";
import {
  FREE_ION,
  LIGAND_BOXES,
  ORBITALS,
  PAIRED,
  PAIRING_STEPS,
  D_ELECTRONS,
  electronPose,
  hybridName,
  spinOnlyMoment,
  strongElectrons,
  unpaired,
} from "../src/app/notes/_components/visualizations/CetDElectronPairing";
import {
  ANOMER_OH,
  FORM_X,
  GLUCOSE_STEPS,
  OPEN_CHAIN,
  RING_ATOMS,
  RING_CLOSURE,
  arrowHead,
  c1Sides,
  chiralCarbons,
  formPose,
  ohCount,
} from "../src/app/notes/_components/visualizations/CetGlucoseRingClosure";
import {
  END_GROUP,
  LEFT_STRAND,
  PARTNER,
  RIGHT_STRAND,
  STRAND_ENDS,
  SUGAR_Y,
  chargaff,
  hBonds,
  phosphateYs,
  threePrimeOhY,
} from "../src/app/notes/_components/visualizations/CetDnaBasePairing";

// MHT-CET Chemistry notes figures, task chem-a (scripts/notes/CET_VISUALS_BRIEF.md).
// Each figure must say what its concept says; the numbers are worked out here.

describe("unit cell counting (cetss-particles-per-cell-and-coordination)", () => {
  it("shares a corner by 8 cells, a face by 2, a body centre by none", () => {
    expect(SHARE).toEqual({ corner: 1 / 8, face: 1 / 2, body: 1 });
  });

  it("draws 8 corners in every cell, plus 1 body centre (bcc) or 6 face centres (fcc)", () => {
    const count = (k: (typeof CELL_KINDS)[number], s: string) => cellAtoms(k).filter((a) => a.site === s).length;
    expect([count("sc", "corner"), count("sc", "face"), count("sc", "body")]).toEqual([8, 0, 0]);
    expect([count("bcc", "corner"), count("bcc", "face"), count("bcc", "body")]).toEqual([8, 0, 1]);
    expect([count("fcc", "corner"), count("fcc", "face"), count("fcc", "body")]).toEqual([8, 6, 0]);
  });

  it("puts each face atom at the centre of a different face", () => {
    const faces = cellAtoms("fcc").filter((a) => a.site === "face");
    const keys = new Set(faces.map((a) => `${a.p.x},${a.p.y},${a.p.z}`));
    expect(keys.size).toBe(6);
    for (const a of faces) expect([a.p.x, a.p.y, a.p.z].filter((v) => v === 0.5).length).toBe(2);
  });

  it("holds 1, 2 and 4 particles with coordination numbers 6, 8 and 12", () => {
    expect(CELL_KINDS.map(atomsPerCell)).toEqual([1, 2, 4]);
    expect(CELL_KINDS.map((k) => COORDINATION[k])).toEqual([6, 8, 12]);
  });

  it("lights one cell per step, then all three on the overview", () => {
    expect(COUNT_STEPS.map((s) => s.title)).toEqual(["Simple cubic", "Body-centred cubic", "Face-centred cubic", "The three cells"]);
    expect(CELL_KINDS.filter((k) => cellLit(0, k))).toEqual(["sc"]);
    expect(CELL_KINDS.filter((k) => cellLit(1, k))).toEqual(["bcc"]);
    expect(CELL_KINDS.filter((k) => cellLit(2, k))).toEqual(["fcc"]);
    expect(CELL_KINDS.filter((k) => cellLit(3, k))).toEqual(["sc", "bcc", "fcc"]);
  });

  it("projects the back of the cube up and to the right", () => {
    const front = project({ x: 0, y: 0, z: 0 }, 0);
    const back = project({ x: 0, y: 0, z: 1 }, 0);
    expect(back.x).toBeGreaterThan(front.x);
    expect(back.y).toBeLessThan(front.y);
  });
});

describe("tetrahedral and octahedral voids (cetss-counting-voids)", () => {
  it("has 4 spheres around a tetrahedral void and 6 around an octahedral one", () => {
    expect(SPHERES_AROUND).toEqual({ tetrahedral: 4, octahedral: 6 });
    expect(TETRA_SPHERES).toHaveLength(4);
    expect(OCTA_SPHERES).toHaveLength(6);
  });

  it("gives 2N tetrahedral, N octahedral, 3N in all", () => {
    expect(VOIDS_PER_ATOM).toEqual({ tetrahedral: 2, octahedral: 1 });
    expect(voidCounts(10)).toEqual({ tetrahedral: 20, octahedral: 10, total: 30 });
    expect(voidCounts(FCC_ATOMS)).toEqual({ tetrahedral: 8, octahedral: 4, total: 12 });
  });

  it("works the concept's example: 0.5 mol hcp", () => {
    expect(EXAMPLE_N).toBeCloseTo(3.011e23, -19);
    expect(sci(EXAMPLE_N)).toBe("3.011 × 10²³");
    expect(sci(voidCounts(EXAMPLE_N).tetrahedral)).toBe("6.022 × 10²³");
    expect(sci(voidCounts(EXAMPLE_N).octahedral)).toBe("3.011 × 10²³");
  });

  it("makes the tetrahedral void the smaller one (0.225 against 0.414)", () => {
    expect(RADIUS_RATIO.tetrahedral).toBeCloseTo(0.225, 3);
    expect(RADIUS_RATIO.octahedral).toBeCloseTo(0.414, 3);
    expect(RADIUS_RATIO.tetrahedral).toBeLessThan(RADIUS_RATIO.octahedral);
  });

  it("puts the octahedral hole at the centre of its six spheres", () => {
    expect(centroid(OCTA_SPHERES)).toEqual({ x: 0, y: 0 });
  });
});

describe("edge length and radius (cetss-edge-length-and-radius)", () => {
  it("uses a = 2r, a = 4r/√3 and a = 2√2 r", () => {
    expect(edgeFromRadius("sc", 1)).toBe(2);
    expect(edgeFromRadius("bcc", 1)).toBeCloseTo(2.309, 3);
    expect(edgeFromRadius("fcc", 1)).toBeCloseTo(2.828, 3);
    expect(radiusFromEdge("bcc", 1)).toBeCloseTo(0.433, 3);
    expect(radiusFromEdge("fcc", 1)).toBeCloseTo(0.3535, 3);
  });

  it("works the worked example and the self-check", () => {
    const a = edgeFromRadius("bcc", BCC_EXAMPLE.r);
    expect(Math.round(a * 10) / 10).toBe(369.5);
    expect(a * 1e-10).toBeCloseTo(3.695e-8, 10);
    expect(Math.round(radiusFromEdge("fcc", FCC_SELF_CHECK.a) * 10) / 10).toBe(127.6);
  });

  it("matches the practice answers", () => {
    expect(radiusFromEdge("sc", 380)).toBe(190);
    expect(edgeFromRadius("bcc", 227) * 1e-10).toBeCloseTo(5.24e-8, 10);
    expect(Math.round(radiusFromEdge("fcc", 405) * 10) / 10).toBe(143.2);
  });

  it("always makes a larger than r (the trap)", () => {
    for (const k of ["sc", "bcc", "fcc"] as const) expect(edgeFromRadius(k, 100)).toBeGreaterThan(100);
  });

  it("draws the atoms touching along the marked line: radii laid end to end fill it exactly", () => {
    for (const p of PANELS) {
      const l = contactLine(p);
      const len = Math.hypot(l.x2 - l.x1, l.y2 - l.y1);
      expect(len).toBeCloseTo(RADII_ON_LINE[p.kind] * p.r, 6);
    }
  });

  it("draws the contact line as the edge, body diagonal and face diagonal", () => {
    const [sc, bcc, fcc] = PANELS;
    expect(CONTACT_LINE.sc.factor * sc.w).toBeCloseTo(2 * sc.r, 6);
    // bcc is the cut a by √2 a; its diagonal is the body diagonal √3 a.
    expect(Math.hypot(bcc.w, bcc.h)).toBeCloseTo(CONTACT_LINE.bcc.factor * bcc.h, 6);
    expect(Math.hypot(fcc.w, fcc.h)).toBeCloseTo(CONTACT_LINE.fcc.factor * fcc.w, 6);
    expect(panelAtoms(bcc)).toHaveLength(5);
    expect(panelAtoms(fcc)).toHaveLength(5);
    expect(panelAtoms(sc)).toHaveLength(4);
  });
});

describe("d electron pairing and magnetism (cetcc-unpaired-electrons-and-magnetism)", () => {
  it("starts from Co³⁺, 3d⁶, with 4 unpaired electrons", () => {
    expect(D_ELECTRONS).toBe(6);
    expect(FREE_ION).toHaveLength(6);
    expect(FREE_ION.every((e) => ORBITALS[e.box] === "3d")).toBe(true);
    expect(unpaired(FREE_ION)).toBe(4);
  });

  it("pairs all six into three 3d orbitals with a strong-field ligand", () => {
    expect(PAIRED).toHaveLength(6);
    expect(unpaired(PAIRED)).toBe(0);
    expect(new Set(PAIRED.map((e) => e.box))).toEqual(new Set([0, 1, 2]));
  });

  it("never puts two same-spin electrons in one box", () => {
    for (const arr of [FREE_ION, PAIRED]) {
      const seen = new Set(arr.map((e) => `${e.box}${e.spin}`));
      expect(seen.size).toBe(arr.length);
    }
  });

  it("names the hybrid orbitals: sp³d² outer for F⁻, d²sp³ inner for NH₃", () => {
    expect(hybridName(LIGAND_BOXES.weak)).toBe("sp³d²");
    expect(hybridName(LIGAND_BOXES.strong)).toBe("d²sp³");
    expect(LIGAND_BOXES.weak.some((b) => ORBITALS[b] === "4d")).toBe(true);
    expect(LIGAND_BOXES.strong.some((b) => (ORBITALS[b] as string) === "4d")).toBe(false);
    for (const boxes of [LIGAND_BOXES.weak, LIGAND_BOXES.strong]) expect(boxes).toHaveLength(6);
  });

  it("puts ligand pairs only into empty boxes", () => {
    const used = (arr: readonly { box: number }[]) => new Set(arr.map((e) => e.box));
    for (const b of LIGAND_BOXES.weak) expect(used(FREE_ION).has(b)).toBe(false);
    for (const b of LIGAND_BOXES.strong) expect(used(PAIRED).has(b)).toBe(false);
  });

  it("gives μ = √(n(n+2)): 4.90 BM high spin, 0 low spin, and the concept's table", () => {
    expect(spinOnlyMoment(4).toFixed(2)).toBe("4.90");
    expect(spinOnlyMoment(0)).toBe(0);
    expect([1, 2, 3, 4, 5].map((n) => spinOnlyMoment(n).toFixed(2))).toEqual(["1.73", "2.83", "3.87", "4.90", "5.92"]);
  });

  it("moves the NH₃ electrons only at the pairing step, turning each arrow over", () => {
    expect(PAIRING_STEPS.map((s) => s.title)).toEqual([
      "Free Co³⁺ ion",
      "Weak field: F⁻",
      "Strong field: NH₃",
      "Electrons pair up",
      "Inner-orbital complex",
    ]);
    expect(strongElectrons(2)).toBe(FREE_ION);
    expect(strongElectrons(3)).toBe(PAIRED);
    expect(strongElectrons(PAIRING_STEPS.length - 1)).toBe(PAIRED);
    expect(electronPose(FREE_ION[4], 0).angle).toBe(0);
    expect(electronPose(PAIRED[4], 0).angle).toBe(180);
    expect(electronPose(PAIRED[4], 0).x).toBeLessThan(electronPose(FREE_ION[4], 0).x);
  });
});

describe("glucose ring closure (cetbio-classification-and-glucose-structure)", () => {
  it("draws D-glucose in the Fischer projection: OH right, left, right, right on C-2 to C-5", () => {
    expect(OPEN_CHAIN[2].right).toBe("OH");
    expect(OPEN_CHAIN[3].left).toBe("HO");
    expect(OPEN_CHAIN[4].right).toBe("OH");
    expect(OPEN_CHAIN[5].right).toBe("OH");
  });

  it("closes C-5 OH onto C-1 into a six-membered ring of five carbons and one oxygen", () => {
    expect(RING_CLOSURE).toEqual({ ohOn: 5, addsTo: 1 });
    expect(RING_ATOMS).toHaveLength(6);
    expect(RING_ATOMS.filter((a) => a.startsWith("C"))).toHaveLength(5);
  });

  it("has 4 chiral carbons open (C-2 to C-5) and C-1 becomes the new one in the ring", () => {
    expect(chiralCarbons("open")).toEqual([2, 3, 4, 5]);
    expect(chiralCarbons("alpha")).toEqual([1, 2, 3, 4, 5]);
  });

  it("keeps 5 OH groups in both forms", () => {
    expect(ohCount("open")).toBe(5);
    expect(ohCount("alpha")).toBe(5);
  });

  it("puts the alpha OH on the ring oxygen's side (right) and beta on the other", () => {
    expect(ANOMER_OH).toEqual({ alpha: "right", beta: "left" });
    expect(c1Sides("alpha")).toEqual({ left: "H", right: "OH" });
    expect(c1Sides("beta")).toEqual({ left: "HO", right: "H" });
  });

  it("slides alpha out at the ring step and beta at the anomer step, ending alpha, chain, beta", () => {
    expect(GLUCOSE_STEPS.map((s) => s.title)).toEqual(["Open chain", "C-5 OH reaches C-1", "The ring closes", "Alpha and beta anomers"]);
    expect(formPose(1, "alpha").opacity).toBe(0);
    expect(formPose(2, "alpha")).toEqual({ x: FORM_X.alpha, opacity: 1 });
    expect(formPose(2, "beta").opacity).toBe(0);
    const last = GLUCOSE_STEPS.length - 1;
    expect(formPose(last, "alpha").x).toBeLessThan(formPose(last, "open").x);
    expect(formPose(last, "beta").x).toBeGreaterThan(formPose(last, "open").x);
  });

  it("points the arrow head along the line it ends", () => {
    const pts = arrowHead({ x: 10, y: 0 }, { x: 0, y: 0 }).split(" ");
    expect(pts[0]).toBe("10,0");
    expect(pts[1]).toBe("3,3.5");
    expect(pts[2]).toBe("3,-3.5");
  });
});

describe("DNA base pairing (cetbio-dna-double-helix-and-backbone)", () => {
  it("pairs A with T by 2 hydrogen bonds and G with C by 3", () => {
    expect(PARTNER).toEqual({ A: "T", T: "A", G: "C", C: "G" });
    expect(hBonds("A")).toBe(2);
    expect(hBonds("T")).toBe(2);
    expect(hBonds("G")).toBe(3);
    expect(hBonds("C")).toBe(3);
    LEFT_STRAND.forEach((b, i) => expect(RIGHT_STRAND[i]).toBe(PARTNER[b]));
    expect(new Set(LEFT_STRAND)).toEqual(new Set(["A", "T", "G", "C"]));
  });

  it("runs the strands antiparallel, with a phosphate at each 5′ end and an OH at each 3′ end", () => {
    expect(STRAND_ENDS.left).toEqual({ top: "5′", bottom: "3′" });
    expect(STRAND_ENDS.right).toEqual({ top: "3′", bottom: "5′" });
    expect(END_GROUP).toEqual({ "5′": "phosphate", "3′": "OH" });
    // Left strand: 5′ phosphate above the first sugar, 3′ OH below the last.
    expect(Math.min(...phosphateYs("left"))).toBeLessThan(SUGAR_Y[0]);
    expect(threePrimeOhY("left")).toBeGreaterThan(SUGAR_Y[SUGAR_Y.length - 1]);
    // Right strand: the reverse.
    expect(Math.max(...phosphateYs("right"))).toBeGreaterThan(SUGAR_Y[SUGAR_Y.length - 1]);
    expect(threePrimeOhY("right")).toBeLessThan(SUGAR_Y[0]);
  });

  it("works the Chargaff example: 22% A gives T 22%, G 28%, C 28%", () => {
    expect(chargaff(22)).toEqual({ A: 22, T: 22, G: 28, C: 28 });
  });
});
