import { describe, expect, it } from "vitest";
import { PLANT_GROUPS, ROW_H, ROW_W, ROW_X, rowTop } from "../src/app/notes/_components/visualizations/SscPlantGroups";
import { CHAMBER_COUNTS, LINKS, STOPS, labelY } from "../src/app/notes/_components/visualizations/SscBloodFlow";
import {
  BACTERIAL_SHAPES,
  SHAPE_Y,
  SPIRAL_AMPLITUDE,
  SPIRAL_LENGTH,
  cellCenter,
  spiralPoints,
} from "../src/app/notes/_components/visualizations/SscBacterialShapes";
import {
  BODY_PLANS,
  ECTO_IN,
  ENDO_OUT,
  POUCH_R,
  POUCH_SIZE,
  cavityNeighbours,
  pouchCenter,
} from "../src/app/notes/_components/visualizations/NeetCoelomTypes";
import { CILIA_PER_CELL, EPITHELIA, PANEL_W, panelOrigin } from "../src/app/notes/_components/visualizations/NeetSimpleEpithelium";
import { BIND, CELL_TOP, ROUTES, SECOND_MESSENGERS, insideNucleus } from "../src/app/notes/_components/visualizations/NeetHormoneAction";
import { BLASTOMERE_LINE, TAGS, TRANSFERS, transferFor } from "../src/app/notes/_components/visualizations/NeetArtTransfers";
import { MEAL, STAGES, STATIONS, STEPS, markerAt } from "../src/app/notes/_components/visualizations/NeetPlasmodiumCycle";
import {
  BOUND_CELLS,
  BT_STEPS,
  CELL_BOTTOM,
  CELL_H,
  CELL_X,
  IN_BACTERIUM,
  IN_GUT,
  LAST,
  S,
  SWELL,
  cellScale,
  crystalPose,
  shownFrom,
  toxinPose,
} from "../src/app/notes/_components/visualizations/NeetBtToxin";

// Group 07 of the notes-figure fill: SSC CGL Biology and NEET Zoology
// (scripts/notes/CET_VISUALS_BRIEF.md). Each figure says what its concept says,
// in its words, and nothing more; the facts below are the concepts' own.

type Box = { x: number; y: number; w: number; h: number };
const distToBox = (p: readonly [number, number], b: Box) => {
  const dx = Math.max(b.x - p[0], 0, p[0] - (b.x + b.w));
  const dy = Math.max(b.y - p[1], 0, p[1] - (b.y + b.h));
  return Math.hypot(dx, dy);
};

describe("ssc-plant-groups (sscbbcpl-groups)", () => {
  it("climbs the concept's ladder, bryophytes at the bottom", () => {
    expect(PLANT_GROUPS.map((g) => g.name)).toEqual(["Bryophytes", "Pteridophytes", "Gymnosperms", "Angiosperms"]);
    expect(rowTop(0)).toBe(174);
    expect(rowTop(3)).toBe(6);
    for (let i = 1; i < PLANT_GROUPS.length; i++) expect(rowTop(i)).toBeLessThan(rowTop(i - 1));
    expect(rowTop(0) + ROW_H).toBeLessThanOrEqual(232);
    expect(ROW_X + ROW_W).toBeLessThan(220);
  });
  it("says only what the concept says of each group", () => {
    expect(PLANT_GROUPS.map((g) => g.fact)).toEqual([
      "no vascular tissue",
      "first vascular plants, no seeds",
      "naked seeds in cones, no flowers",
      "flowers; seeds inside fruits",
    ]);
    expect(PLANT_GROUPS.map((g) => g.examples)).toEqual(["mosses, liverworts", "ferns, horsetails, lycophytes", "Cycas, Pinus", "rose"]);
  });
  it("puts the gametophyte as the main plant of bryophytes only; the sporophyte in vascular plants", () => {
    expect(PLANT_GROUPS.filter((g) => g.mainPlant === "gametophyte").map((g) => g.name)).toEqual(["Bryophytes"]);
    expect(PLANT_GROUPS.filter((g) => g.mainPlant === "sporophyte")).toHaveLength(3);
  });
});

describe("ssc-blood-flow (sscbhpsy-circulation)", () => {
  it("numbers the six stops in the concept's order", () => {
    expect(STOPS.map((s) => s.name)).toEqual(["Right atrium", "Right ventricle", "Lungs", "Left atrium", "Left ventricle", "Body"]);
    expect(STOPS.map((s) => s.n)).toEqual([1, 2, 3, 4, 5, 6]);
  });
  it("joins each stop to the next, and only to the next", () => {
    expect(LINKS).toHaveLength(5);
    for (const l of LINKS) {
      expect(l.to).toBe(l.from + 1);
      const from = STOPS[l.from - 1].box;
      const to = STOPS[l.to - 1].box;
      expect(distToBox(l.points[0], from)).toBe(0);
      expect(distToBox(l.points[l.points.length - 1], to)).toBeLessThanOrEqual(4);
    }
  });
  it("draws the heart from the front: its right side on the reader's left", () => {
    const ra = STOPS[0].box;
    const la = STOPS[3].box;
    expect(ra.x).toBeLessThan(la.x);
    expect(labelY(STOPS[0])).toBe(76);
    expect(labelY(STOPS[1])).toBe(154);
  });
  it("counts heart chambers as the concept does", () => {
    expect(CHAMBER_COUNTS.map((c) => [c.chambers, c.animals.join(" ")])).toEqual([
      [2, "fish"],
      [3, "amphibians, most reptiles"],
      [4, "birds and mammals"],
    ]);
  });
});

describe("ssc-bacterial-shapes (sscbmdmi-pathogens)", () => {
  it("names the four shapes in the concept's words", () => {
    expect(BACTERIAL_SHAPES.map((s) => `${s.name} ${s.shape}`)).toEqual(["Bacillus rod", "Coccus sphere", "Vibrio comma", "Spirillum spiral"]);
    expect(cellCenter(3) + 40).toBe(320);
  });
  it("draws the spirillum as a spiral of whole waves", () => {
    const pts = spiralPoints(280);
    expect(pts).toHaveLength(41);
    expect(pts[0].y).toBe(SHAPE_Y);
    expect(pts[pts.length - 1].x - pts[0].x).toBe(SPIRAL_LENGTH);
    const peaks = pts.filter((p, k) => k > 0 && k < pts.length - 1 && p.y > pts[k - 1].y && p.y >= pts[k + 1].y);
    expect(peaks).toHaveLength(3);
    for (const p of peaks) expect(p.y).toBe(SHAPE_Y + SPIRAL_AMPLITUDE);
  });
});

describe("neet-coelom-types (nzoak-coelom)", () => {
  it("pairs each body plan with the concept's phylum", () => {
    expect(BODY_PLANS.map((p) => [p.name, p.phylum, p.cavity])).toEqual([
      ["Acoelomate", "Platyhelminthes", "no body cavity"],
      ["Pseudocoelomate", "Aschelminthes", "pseudocoelom"],
      ["Coelomate", "e.g. Annelida", "true coelom"],
    ]);
  });
  it("has no cavity in the acoelomate, a cavity without a mesoderm lining in the pseudocoelomate, and one lined by mesoderm in the coelomate", () => {
    expect(cavityNeighbours(BODY_PLANS[0])).toBeNull();
    expect(cavityNeighbours(BODY_PLANS[1])).toEqual({ outer: "ectoderm", inner: "endoderm" });
    expect(cavityNeighbours(BODY_PLANS[2])).toEqual({ outer: "mesoderm", inner: "mesoderm" });
  });
  it("draws rings from the outside in, all three germ layers in each", () => {
    for (const p of BODY_PLANS) {
      for (let i = 1; i < p.rings.length; i++) expect(p.rings[i].r).toBeLessThan(p.rings[i - 1].r);
      const layers = new Set(p.rings.map((r) => r.layer as string));
      if (p.pouches.length) layers.add("mesoderm");
      for (const l of ["ectoderm", "mesoderm", "endoderm"]) expect(layers.has(l)).toBe(true);
    }
  });
  it("puts the pseudocoelomate's mesoderm in scattered pouches inside the cavity, none round the gut", () => {
    expect(BODY_PLANS.map((p) => p.pouches.length)).toEqual([0, 4, 0]);
    for (const d of BODY_PLANS[1].pouches) {
      const c = pouchCenter(0, 0, d);
      expect(Math.hypot(c.x, c.y)).toBeCloseTo(POUCH_R, 1);
    }
    expect(POUCH_R + POUCH_SIZE).toBeLessThanOrEqual(ECTO_IN);
    expect(POUCH_R - POUCH_SIZE).toBeGreaterThan(ENDO_OUT + 5);
  });
});

describe("neet-simple-epithelium (nzoso-epithelium)", () => {
  it("shows the simple epithelia with the concept's places and jobs", () => {
    expect(EPITHELIA.map((e) => e.name)).toEqual(["Squamous", "Cuboidal", "Columnar", "Ciliated"]);
    expect(EPITHELIA.map((e) => e.where.join(" "))).toEqual([
      "walls of blood vessels, air sacs of lungs",
      "ducts of glands, tubular parts of nephrons",
      "lines the stomach and intestine",
      "bronchioles, Fallopian tubes",
    ]);
    expect(EPITHELIA.map((e) => e.job)).toEqual(["diffusion boundary", "secretion, absorption", "secretion, absorption", "move mucus in one direction"]);
  });
  it("draws flattened, cube-like and tall cells, with columnar nuclei at the base", () => {
    const [sq, cu, co, ci] = EPITHELIA;
    expect(sq.cellH).toBeLessThan(sq.cellW / 2);
    expect(cu.cellH).toBe(cu.cellW);
    expect(co.cellH).toBeGreaterThan(co.cellW * 1.5);
    expect(co.nucleusUp).toBeLessThan(co.cellH / 3);
    expect(ci.cellH).toBeGreaterThan(ci.cellW);
  });
  it("gives cilia to the ciliated epithelium only", () => {
    expect(EPITHELIA.filter((e) => e.cilia).map((e) => e.name)).toEqual(["Ciliated"]);
    expect(CILIA_PER_CELL).toBeGreaterThan(1);
  });
  it("fits each panel's row of cells inside its panel and the panels inside the frame", () => {
    for (const e of EPITHELIA) expect(e.cells * e.cellW).toBeLessThanOrEqual(PANEL_W - 20);
    expect(panelOrigin(3)).toEqual({ x: 162, y: 122 });
    expect(panelOrigin(3).x + PANEL_W).toBeLessThanOrEqual(320);
  });
});

describe("neet-hormone-action (nzocc-mechanism)", () => {
  it("keeps the protein hormone outside on a membrane-bound receptor, with second messengers", () => {
    expect(ROUTES[0]).toMatchObject({ title: "Protein hormone", receptor: "membrane-bound receptor", entersCell: false });
    expect(ROUTES[0].chain).toEqual(["second messenger", "regulates cell metabolism"]);
    expect([...SECOND_MESSENGERS]).toEqual(["cyclic AMP", "IP₃", "Ca²⁺"]);
    expect(BIND[0].y).toBeLessThan(CELL_TOP);
    expect(insideNucleus(BIND[0])).toBe(false);
  });
  it("brings the steroid hormone inside to an intracellular receptor, acting on the genes", () => {
    expect(ROUTES[1]).toMatchObject({ title: "Steroid hormone", receptor: "intracellular receptor", entersCell: true });
    expect(ROUTES[1].chain).toEqual(["hormone-receptor complex", "genome", "gene expression"]);
    expect(insideNucleus(BIND[1])).toBe(true);
  });
});

describe("neet-art-transfers (nzorh-transfers)", () => {
  it("sends each method's cargo where the concept says", () => {
    expect(TRANSFERS.map((t) => [t.method, t.place])).toEqual([
      ["ZIFT", "fallopian tube"],
      ["GIFT", "fallopian tube"],
      ["IUT", "uterus"],
      ["IUI", "uterus"],
      ["AI", "vagina or uterus"],
      ["ICSI", "laboratory"],
    ]);
  });
  it("draws the line at 8 blastomeres, as the trap says", () => {
    expect(BLASTOMERE_LINE).toBe(8);
    expect(transferFor(8)).toEqual({ method: "ZIFT", place: "fallopian tube" });
    expect(transferFor(9)).toEqual({ method: "IUT", place: "uterus" });
    // The concept's self-check: an embryo of 16 blastomeres goes to the uterus.
    expect(transferFor(16)).toEqual({ method: "IUT", place: "uterus" });
  });
  it("tags every transfer into the body, and leaves ICSI to the laboratory box", () => {
    expect(TAGS.map((t) => t.method)).toEqual(["ZIFT", "GIFT", "IUT", "IUI", "AI"]);
    for (const t of TAGS) expect(t.x + t.w).toBeLessThanOrEqual(320);
  });
  it("names GIFT's cargo as a donor ovum, not an embryo", () => {
    expect(TRANSFERS[1].lines.join(" ")).toContain("ovum from a donor");
    expect(TRANSFERS[1].lines.join(" ")).not.toMatch(/embryo|zygote/);
  });
});

describe("neet-plasmodium-cycle (nzohh-malaria)", () => {
  it("follows the concept's seven stages in order", () => {
    expect(STEPS.map((s) => s.title)).toEqual([
      "Sporozoites enter",
      "Liver cells",
      "Red blood cells",
      "Gametocytes",
      "Blood meal",
      "Fertilisation",
      "Salivary glands",
    ]);
    expect(STAGES.map((s) => s.at)).toEqual(["blood", "liver", "rbc", "rbc", "meal", "stomach", "salivary"]);
  });
  it("keeps the human stages asexual and fertilisation in the mosquito's stomach", () => {
    const host = (id: string) => STATIONS.find((s) => s.id === id)?.host;
    expect(["blood", "liver", "rbc"].map(host)).toEqual(["human", "human", "human"]);
    expect(host("stomach")).toBe("mosquito");
    expect(host("salivary")).toBe("mosquito");
    expect(STATIONS.find((s) => s.id === "stomach")?.lines.join(" ")).toContain("fertilisation");
  });
  it("forms gametocytes in the human red blood cells and carries them in the blood meal only", () => {
    expect(STAGES.map((s) => s.gametocyte)).toEqual([false, false, false, true, true, false, false]);
    expect(STAGES[3].caption).toContain("red blood cells");
  });
  it("moves the marker stop to stop, crossing at the blood meal", () => {
    expect(markerAt(0)).toEqual({ x: 6, y: 61 });
    expect(markerAt(2)).toEqual(markerAt(3));
    expect(markerAt(4)).toEqual(MEAL);
    expect(markerAt(6)).toEqual({ x: 314, y: 61 });
    for (let s = 0; s < STAGES.length; s++) {
      const p = markerAt(s);
      expect(p.x - 6).toBeGreaterThanOrEqual(0);
      expect(p.x + 6).toBeLessThanOrEqual(320);
    }
  });
});

describe("neet-bt-toxin (nzoba-bt-action)", () => {
  it("walks the concept's five steps in order", () => {
    expect(BT_STEPS.map((s) => s.title)).toEqual(["Protein crystals", "Inactive protoxin", "Alkaline gut", "Active toxin", "Pores in the midgut"]);
    expect(LAST).toBe(4);
    expect(BT_STEPS[2].caption).toContain("alkaline pH");
    expect(BT_STEPS.map((s) => s.caption).join(" ")).not.toMatch(/acidic|protease|nuclease/);
  });
  it("dissolves the crystal before the toxin is active", () => {
    expect(crystalPose(0)).toEqual({ ...IN_BACTERIUM, opacity: 1 });
    expect(crystalPose(S.protoxin)).toEqual({ ...IN_BACTERIUM, opacity: 1 });
    expect(crystalPose(S.dissolve)).toMatchObject(IN_GUT);
    for (let step = 0; step <= LAST; step++) {
      const active = [0, 1, 2].some((k) => toxinPose(step, k).opacity > 0);
      expect(active).toBe(step >= S.active);
      if (active) expect(crystalPose(step).opacity).toBe(0);
    }
  });
  it("binds the toxin to the midgut cells and swells only those cells, in the last step", () => {
    for (let step = 0; step < S.pores; step++) for (let i = 0; i < CELL_X.length; i++) expect(cellScale(step, i)).toBe(1);
    expect(CELL_X.map((_, i) => cellScale(S.pores, i))).toEqual([1, SWELL, SWELL, SWELL, 1]);
    BOUND_CELLS.forEach((cell, k) => {
      const t = toxinPose(S.pores, k);
      expect(t.x).toBe(CELL_X[cell]);
      expect(t.y).toBe(CELL_BOTTOM - CELL_H * SWELL - 5);
    });
    expect(shownFrom(S.pores, S.active)).toBe(0);
    expect(shownFrom(S.pores, S.pores)).toBe(1);
  });
});
