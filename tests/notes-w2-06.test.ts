import { describe, expect, it } from "vitest";
import { ASCENDING, LADDER, band, descending } from "../src/app/notes/_components/visualizations/NeetTaxonHierarchy";
import { ROWS, boxArea } from "../src/app/notes/_components/visualizations/NeetLifeCyclePatterns";
import {
  DIHYBRID_STEPS,
  GAMETES,
  cross,
  f1,
  phenotype,
  punnett,
  tally,
} from "../src/app/notes/_components/visualizations/NeetDihybridCross";
import {
  BUNDLE_ANGLES,
  CAMBIUM_STEPS,
  OLD,
  RING_R,
  STEM_R,
  YOUNG,
  width,
} from "../src/app/notes/_components/visualizations/NeetCambiumRing";
import {
  ARITH,
  ARITH_CELLS,
  GEO_CELLS,
  MARKS,
  PHASES,
  lengthAt,
  sigmoid,
} from "../src/app/notes/_components/visualizations/NeetGrowthCurves";
import { DRINKS, RAW, YEAST } from "../src/app/notes/_components/visualizations/NeetBrewedDrinks";
import {
  CONTINENT_Z,
  FRUGIVORE_Z,
  LOG_C,
  REGION_Z,
  Z_RANGE,
  fmtCount,
  logS,
  richnessFactor,
  zLabel,
} from "../src/app/notes/_components/visualizations/NeetSpeciesArea";

// Seven NEET Botany figures (scripts/notes/CET_VISUALS_BRIEF.md, wave 2 group 06).
// Each is only worth having if it says what its NCERT-based concept says, so
// the concept's own orders, names and numbers are pinned here.

describe("taxonomic hierarchy (nbolw-hierarchy)", () => {
  it("lists the seven categories in ascending order, starting at species", () => {
    expect([...ASCENDING]).toEqual(["Species", "Genus", "Family", "Order", "Class", "Phylum or division", "Kingdom"]);
    expect(descending()).toEqual(["Kingdom", "Phylum or division", "Class", "Order", "Family", "Genus", "Species"]);
  });

  it("draws each band wider than the one below it (more organisms going up)", () => {
    for (let i = 0; i < ASCENDING.length - 1; i++) {
      expect(band(i).wTop).toBeGreaterThan(band(i + 1).wTop);
      expect(band(i).wBottom).toBeCloseTo(band(i + 1).wTop, 6);
    }
    expect(band(0).wTop).toBe(LADDER.topWidth);
    expect(band(ASCENDING.length - 1).wBottom).toBeCloseTo(LADDER.bottomWidth, 6);
  });
});

describe("three patterns of life cycle (nbopk-life-cycles)", () => {
  const by = (p: string) => {
    const row = ROWS.find((r) => r.pattern === p);
    if (!row) throw new Error(p);
    return row;
  };

  it("has the three NCERT patterns", () => {
    expect(ROWS.map((r) => r.pattern)).toEqual(["Haplontic", "Diplontic", "Haplo-diplontic"]);
  });

  it("haplontic: a dominant gametophyte, the zygote the only diploid stage", () => {
    const r = by("Haplontic");
    expect(boxArea(r.gametophyte.size)).toBeGreaterThan(boxArea(r.sporophyte.size));
    expect(r.sporophyte.lines[0]).toMatch(/zygote/);
    expect(r.meiosisNote).toMatch(/zygote/);
    expect(r.examples.join(" ")).toMatch(/Volvox.*Spirogyra.*Chlamydomonas/);
  });

  it("diplontic: a dominant sporophyte, a gametophyte of one or a few cells; Fucus is diplontic", () => {
    const r = by("Diplontic");
    expect(boxArea(r.sporophyte.size)).toBeGreaterThan(boxArea(r.gametophyte.size));
    expect(r.gametophyte.lines[1]).toBe("one or a few cells");
    expect(r.examples.join(" ")).toMatch(/gymnosperms.*angiosperms.*Fucus/);
    expect(by("Haplontic").examples.join(" ")).not.toMatch(/Fucus/);
  });

  it("haplo-diplontic: both multicellular, bryophytes gametophyte-dominant and pteridophytes sporophyte-dominant", () => {
    const r = by("Haplo-diplontic");
    expect(r.gametophyte.size).toBe(r.sporophyte.size);
    expect([r.gametophyte.lines[1], r.sporophyte.lines[1]]).toEqual(["multicellular", "multicellular"]);
    const ex = r.examples.join(" ");
    expect(ex).toMatch(/Bryophytes: gametophyte dominant/);
    expect(ex).toMatch(/Pteridophytes: sporophyte dominant/);
    expect(ex).toMatch(/Ectocarpus, Polysiphonia, kelps/);
  });
});

describe("dihybrid cross (nbopi-dihybrid)", () => {
  it("gives an F1 of RrYy, all round yellow", () => {
    expect(f1()).toBe("RrYy");
    expect(phenotype(f1())).toBe("round yellow");
  });

  it("makes four gametes, RY, Ry, rY and ry", () => {
    expect([...GAMETES]).toEqual(["RY", "Ry", "rY", "ry"]);
  });

  it("joins gametes dominant allele first, whichever parent gives it", () => {
    expect(cross("RY", "ry")).toBe("RrYy");
    expect(cross("ry", "RY")).toBe("RrYy");
    expect(cross("rY", "Ry")).toBe("RrYy");
    expect(cross("ry", "ry")).toBe("rryy");
  });

  it("fills a 16-box square that counts 9 : 3 : 3 : 1, and 3 : 1 for shape alone", () => {
    const grid = punnett();
    expect(grid.length).toBe(4);
    expect(grid.every((row) => row.length === 4)).toBe(true);
    expect(new Set(grid.flat()).size).toBe(9);
    const t = tally();
    expect(t).toEqual({ "round yellow": 9, "round green": 3, "wrinkled yellow": 3, "wrinkled green": 1 });
    expect(t["round yellow"] + t["round green"]).toBe(12);
    expect(t["wrinkled yellow"] + t["wrinkled green"]).toBe(4);
  });

  it("keeps the 9 : 3 : 3 : 1 out of the F1 step (the concept's trap)", () => {
    expect(DIHYBRID_STEPS.length).toBe(5);
    expect(DIHYBRID_STEPS[1].caption).not.toMatch(/9/);
    expect(DIHYBRID_STEPS[4].caption).toMatch(/9 : 3 : 3 : 1/);
  });
});

describe("vascular cambium ring (nboan-cambium)", () => {
  it("steps from strips to a ring to secondary growth", () => {
    expect(CAMBIUM_STEPS.map((s) => s.title)).toEqual([
      "A young stem",
      "Interfascicular cambium",
      "A continuous ring",
      "Secondary growth",
    ]);
  });

  it("makes the interfascicular cambium from medullary ray cells, not the pericycle", () => {
    expect(CAMBIUM_STEPS[1].caption).toMatch(/medullary ray cells/);
    expect(CAMBIUM_STEPS.map((s) => s.caption).join(" ")).not.toMatch(/pericycle/);
  });

  it("puts xylem inside the cambium and phloem outside, with far more secondary xylem", () => {
    expect(YOUNG.xylem[1]).toBeLessThan(RING_R);
    expect(YOUNG.phloem[0]).toBeGreaterThan(RING_R);
    expect(OLD.primaryXylem[1]).toBeLessThanOrEqual(OLD.secondaryXylem[0]);
    expect(OLD.secondaryXylem[1]).toBeLessThan(RING_R);
    expect(OLD.secondaryPhloem[0]).toBeGreaterThan(RING_R);
    expect(OLD.primaryPhloemCrushed[0]).toBeGreaterThanOrEqual(OLD.secondaryPhloem[1]);
    expect(OLD.primaryPhloemCrushed[1]).toBeLessThan(STEM_R);
    expect(width(OLD.secondaryXylem)).toBeGreaterThan(3 * width(OLD.secondaryPhloem));
  });

  it("spaces the bundles evenly round the stem", () => {
    expect(BUNDLE_ANGLES.length).toBe(6);
    BUNDLE_ANGLES.forEach((a, i) => expect(a as number).toBe(i * 60));
  });
});

describe("arithmetic and geometric growth (nbopg-growth-rate)", () => {
  it("draws the worked example: 15 cm growing 5 cm a day", () => {
    expect(ARITH).toEqual({ L0: 15, r: 5 });
    expect(lengthAt(0)).toBe(15);
    expect(lengthAt(8)).toBe(55);
    expect(lengthAt(12)).toBe(75);
    expect(MARKS).toEqual([
      { t: 8, L: 55 },
      { t: 12, L: 75 },
    ]);
    expect((55 - 15) / 8).toBe(ARITH.r);
  });

  it("adds one cell a round in arithmetic growth and doubles in geometric growth", () => {
    expect(ARITH_CELLS[1] - ARITH_CELLS[0]).toBe(ARITH_CELLS[2] - ARITH_CELLS[1]);
    expect(GEO_CELLS[1] / GEO_CELLS[0]).toBe(2);
    expect(GEO_CELLS[2] / GEO_CELLS[1]).toBe(2);
  });

  it("has a sigmoid that is slow in the lag phase, fastest in the log phase and flat in the stationary phase", () => {
    expect(PHASES.map((p) => p.name)).toEqual(["lag", "log", "stationary"]);
    const slope = (t: number) => (sigmoid(t + 0.01) - sigmoid(t - 0.01)) / 0.02;
    const mid = PHASES.map((p) => slope((p.from + p.to) / 2));
    expect(mid[1]).toBeGreaterThan(5 * mid[0]);
    expect(mid[1]).toBeGreaterThan(5 * mid[2]);
    for (let t = 0; t < 10; t += 0.5) expect(sigmoid(t + 0.5)).toBeGreaterThan(sigmoid(t));
  });
});

describe("distilled or not (nbomi-beverages)", () => {
  it("names the yeast and what it ferments", () => {
    expect(YEAST).toEqual({ name: "Saccharomyces cerevisiae", common: "brewer's yeast" });
    expect(RAW).toBe("malted cereals and fruit juices");
  });

  it("puts wine and beer on the not-distilled side, whisky, brandy and rum on the distilled side", () => {
    expect([...DRINKS.notDistilled]).toEqual(["wine", "beer"]);
    expect([...DRINKS.distilled]).toEqual(["whisky", "brandy", "rum"]);
    const distilled: readonly string[] = DRINKS.distilled;
    expect(DRINKS.notDistilled.some((d) => distilled.includes(d))).toBe(false);
  });
});

describe("species-area line (nbobd-species-area)", () => {
  it("opens on Z = 0.2 with log C = 1, the self-check: log A = 5 gives 100 species", () => {
    expect(Z_RANGE.start).toBe(0.2);
    expect(LOG_C).toBe(1);
    expect(logS(0.2, 5)).toBeCloseTo(2, 10);
    expect(fmtCount(10 ** logS(0.2, 5))).toBe("100");
  });

  it("matches the worked example: 100 times the area gives about 2.5 times the species at Z = 0.2", () => {
    expect(richnessFactor(0.2, 100)).toBeCloseTo(10 ** 0.4, 10);
    expect(fmtCount(richnessFactor(0.2, 100))).toBe("2.5");
  });

  it("uses the concept's ranges of Z", () => {
    expect([...REGION_Z]).toEqual([0.1, 0.2]);
    expect([...CONTINENT_Z]).toEqual([0.6, 1.2]);
    expect(FRUGIVORE_Z).toBe(1.15);
    expect([Z_RANGE.min, Z_RANGE.max]).toEqual([0.1, 1.2]);
    expect(zLabel(0.15)).toMatch(/most regions/);
    expect(zLabel(0.8)).toMatch(/continents/);
    expect(zLabel(1.15)).toMatch(/frugivorous/);
    expect(zLabel(0.4)).toBe("between the two ranges");
  });

  it("formats large counts with commas", () => {
    expect(fmtCount(10 ** 7)).toBe("10,000,000");
  });
});
