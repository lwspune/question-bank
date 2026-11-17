import { describe, expect, it } from "vitest";
import {
  HW_EXAMPLES,
  allelesFromRecessiveShare,
  fmt as hwFmt,
  hwGenotypes,
} from "../src/app/notes/_components/visualizations/ImatHardyWeinberg";
import { SELECTION_PANELS, density, meanOf } from "../src/app/notes/_components/visualizations/ImatSelectionTypes";
import { GROWTH, exponential, logistic, logisticMidpoint } from "../src/app/notes/_components/visualizations/ImatPopulationGrowth";
import {
  CULTURE,
  EXAMPLE_POINTS,
  PHASES,
  cellsAfter,
  logCells,
} from "../src/app/notes/_components/visualizations/ImatBacterialGrowthCurve";
import {
  CELL,
  NEW_PHAGE_COUNT,
  PHAGE_STEPS,
  STEP,
  burstPose,
  daughterPose,
  insideCell,
  lysogenicCellPose,
  newPhagePose,
  phagePose,
  viralDnaPose,
} from "../src/app/notes/_components/visualizations/ImatLyticLysogenic";
import { BAR_SIDES, START_L, cubeSurface, cubeVolume, saToV } from "../src/app/notes/_components/visualizations/ImatSaVolume";

// IMAT notes figures, task "bioevo" (scripts/imat/NOTES_VISUALS_BRIEF.md).
// Each figure is pinned to the numbers and terms of its own concept.

describe("Hardy-Weinberg slider (imat-evo-hardy-weinberg)", () => {
  it("p² + 2pq + q² = 1 for every p the slider can reach", () => {
    for (let i = 0; i <= 100; i++) {
      const g = hwGenotypes(i / 100);
      expect(g.AA + g.Aa + g.aa).toBeCloseTo(1, 12);
    }
  });

  it("works the albinism example: q² = 1/10 000, q = 0.01, p = 0.99, carriers 2pq = 0.0198", () => {
    const { q, p } = allelesFromRecessiveShare(HW_EXAMPLES.albinism.recessiveShare);
    expect(q).toBeCloseTo(0.01, 12);
    expect(p).toBeCloseTo(0.99, 12);
    expect(hwGenotypes(p).Aa).toBeCloseTo(0.0198, 12);
    expect(hwFmt(hwGenotypes(0.99).Aa)).toBe("0.0198");
    expect(hwFmt(hwGenotypes(0.99).aa)).toBe("0.0001");
  });

  it("works the self-check: 16% recessive gives q = 0.4, p = 0.6 and 48% heterozygous", () => {
    const { q, p } = allelesFromRecessiveShare(HW_EXAMPLES.selfCheck.recessiveShare);
    expect(q).toBeCloseTo(0.4, 12);
    expect(p).toBeCloseTo(0.6, 12);
    const g = hwGenotypes(0.6);
    expect(hwFmt(g.AA)).toBe("0.36");
    expect(hwFmt(g.Aa)).toBe("0.48");
    expect(hwFmt(g.aa)).toBe("0.16");
  });

  it("agrees with the practice set: q = 0.3 gives p² = 0.49; p = 0.8 gives 2pq = 0.32", () => {
    expect(hwGenotypes(0.7).AA).toBeCloseTo(0.49, 12);
    expect(hwGenotypes(0.8).Aa).toBeCloseTo(0.32, 12);
  });
});

describe("Selection types (imat-evo-selection-types)", () => {
  const byId = Object.fromEntries(SELECTION_PANELS.map((p) => [p.id, p]));

  it("draws the concept's three patterns in its order, with its examples", () => {
    expect(SELECTION_PANELS.map((p) => p.title)).toEqual(["Directional", "Stabilising", "Disruptive"]);
    expect(byId.directional.example).toMatch(/peppered moths/);
    expect(byId.stabilising.example).toMatch(/birth weight/);
    expect(byId.disruptive.example).toMatch(/beaks/);
  });

  it("directional: the mean shifts towards the favoured extreme, which the arrow points at", () => {
    const p = byId.directional;
    expect(meanOf(p.after)).toBeGreaterThan(meanOf(p.before));
    const [[from, to]] = p.arrows;
    expect(to).toBeGreaterThan(from);
  });

  it("stabilising: same mean, narrower curve, arrows pointing at the middle", () => {
    const p = byId.stabilising;
    expect(meanOf(p.after)).toBeCloseTo(meanOf(p.before), 12);
    expect(p.after[0].sd).toBeLessThan(p.before[0].sd);
    const mid = meanOf(p.before);
    for (const [from, to] of p.arrows) expect(Math.abs(to - mid)).toBeLessThan(Math.abs(from - mid));
  });

  it("disruptive: two peaks, the middle now rarer than before, arrows pointing outwards", () => {
    const p = byId.disruptive;
    const mid = meanOf(p.before);
    expect(density(p.after, mid)).toBeLessThan(density(p.before, mid));
    for (const peak of p.after.map((b) => b.mean)) {
      expect(density(p.after, peak)).toBeGreaterThan(density(p.after, mid));
      expect(density(p.after, peak)).toBeGreaterThan(density(p.after, peak - 1));
      expect(density(p.after, peak)).toBeGreaterThan(density(p.after, peak + 1));
    }
    for (const [from, to] of p.arrows) expect(Math.abs(to - mid)).toBeGreaterThan(Math.abs(from - mid));
  });
});

describe("Population growth (imat-evo-interactions)", () => {
  it("both curves start from the same population and agree early on", () => {
    expect(exponential(0)).toBeCloseTo(GROWTH.n0, 12);
    expect(logistic(0)).toBeCloseTo(GROWTH.n0, 12);
    expect(logistic(1) / exponential(1)).toBeGreaterThan(0.97);
  });

  it("exponential (J) passes the carrying capacity; logistic (S) never does and levels off near K", () => {
    expect(exponential(GROWTH.tMax)).toBeGreaterThan(GROWTH.K);
    for (let t = 0; t <= GROWTH.tMax; t += 0.5) expect(logistic(t)).toBeLessThan(GROWTH.K);
    expect(logistic(GROWTH.tMax)).toBeGreaterThan(0.99 * GROWTH.K);
  });

  it("the S curve bends at half of K", () => {
    expect(logistic(logisticMidpoint())).toBeCloseTo(GROWTH.K / 2, 9);
  });
});

describe("Bacterial growth curve (imat-mbt-growth)", () => {
  it("names the concept's four phases in order", () => {
    expect(PHASES.map((p) => p.name)).toEqual(["Lag", "Log (exponential)", "Stationary", "Death"]);
  });

  it("works the example: 500 cells, doubling time 20 min, 2 hours = 6 doublings = 32 000", () => {
    expect(CULTURE.n0).toBe(500);
    expect(CULTURE.doublingMin).toBe(20);
    expect(cellsAfter(500, 120, 20)).toBe(32000);
    const [a, b] = EXAMPLE_POINTS;
    expect(b.t - a.t).toBe(120);
    expect(10 ** logCells(a.t)).toBeCloseTo(500, 6);
    expect(10 ** logCells(b.t)).toBeCloseTo(32000, 3);
    expect(b.label).toBe("32 000");
  });

  it("matches the self-check too: 8 doublings multiply by 256", () => {
    expect(cellsAfter(1000, 240, 30)).toBe(256000);
  });

  it("is flat in lag and stationary, a straight rise in log, and falls in death", () => {
    expect(logCells(0)).toBeCloseTo(logCells(CULTURE.lagEnd), 12);
    const slope = (t0: number, t1: number) => (logCells(t1) - logCells(t0)) / (t1 - t0);
    expect(slope(150, 200)).toBeCloseTo(Math.log10(2) / 20, 12);
    expect(slope(250, 340)).toBeCloseTo(Math.log10(2) / 20, 12);
    expect(logCells(CULTURE.logEnd + 1)).toBeCloseTo(logCells(CULTURE.stationaryEnd), 12);
    expect(logCells(CULTURE.end)).toBeLessThan(logCells(CULTURE.stationaryEnd));
  });
});

describe("Lytic and lysogenic animation (imat-mbt-lytic-lysogenic)", () => {
  it("follows the concept's order, ending on the overview of both routes", () => {
    expect(PHAGE_STEPS.map((s) => s.title)).toEqual([
      "Attachment",
      "Injection",
      "Lytic: copy and assemble",
      "Lytic: lysis",
      "Lysogenic: prophage",
      "Lysogenic: cell division",
      "Two routes",
    ]);
    expect(PHAGE_STEPS[STEP.overview].caption).toMatch(/UV light/);
    expect(PHAGE_STEPS[STEP.overview].caption).toMatch(/induces/);
  });

  it("keeps the capsid outside the cell; only the DNA goes in", () => {
    for (const step of [STEP.attach, STEP.inject]) {
      const p = phagePose(step);
      expect(p.o).toBe(1);
      expect(p.y).toBeLessThanOrEqual(CELL.y - CELL.ry + 1);
      expect(insideCell(p)).toBe(false);
    }
    expect(insideCell(viralDnaPose(STEP.attach))).toBe(false);
    expect(insideCell(viralDnaPose(STEP.inject))).toBe(true);
    expect(viralDnaPose(STEP.inject).o).toBe(1);
  });

  it("assembles new phages inside the cell, then releases them by lysis", () => {
    for (let i = 0; i < NEW_PHAGE_COUNT; i++) {
      const made = newPhagePose(STEP.copy, i);
      const freed = newPhagePose(STEP.lysis, i);
      expect(made.o).toBe(1);
      expect(insideCell(made)).toBe(true);
      expect(freed.o).toBe(1);
      expect(insideCell(freed)).toBe(false);
    }
    expect(burstPose(STEP.lysis).o).toBe(1);
    expect(burstPose(STEP.copy).o).toBe(0);
  });

  it("makes no new phages in the lysogenic route", () => {
    for (const step of [STEP.prophage, STEP.division]) for (let i = 0; i < NEW_PHAGE_COUNT; i++) expect(newPhagePose(step, i).o).toBe(0);
    expect(lysogenicCellPose(STEP.prophage).o).toBe(1);
  });

  it("gives both daughter cells the prophage, side by side", () => {
    const a = daughterPose(STEP.division, 0);
    const b = daughterPose(STEP.division, 1);
    expect(a.o).toBe(1);
    expect(b.o).toBe(1);
    expect(b.x - a.x).toBeGreaterThan(2 * CELL.rx * a.s);
  });

  it("shows both routes in the overview: burst cell with new phages, and the daughters", () => {
    const o = STEP.overview;
    expect(burstPose(o).o).toBe(1);
    for (let i = 0; i < NEW_PHAGE_COUNT; i++) expect(newPhagePose(o, i).o).toBe(1);
    expect(daughterPose(o, 0).o).toBe(1);
    expect(daughterPose(o, 1).o).toBe(1);
    expect(burstPose(o).x).toBeLessThan(160);
    expect(daughterPose(o, 0).x).toBeGreaterThan(160);
  });
});

describe("Surface area to volume slider (imat-csm-sav)", () => {
  it("SA:V of a cube is 6/L for every side", () => {
    for (let L = 1; L <= 6; L += 0.5) expect(saToV(L)).toBeCloseTo(6 / L, 12);
  });

  it("works the example: sides 1, 2, 4 µm give surfaces 6, 24, 96, volumes 1, 8, 64 and ratios 6, 3, 1.5", () => {
    expect([1, 2, 4].map(cubeSurface)).toEqual([6, 24, 96]);
    expect([1, 2, 4].map(cubeVolume)).toEqual([1, 8, 64]);
    expect([1, 2, 4].map(saToV)).toEqual([6, 3, 1.5]);
  });

  it("opens on L = 2 µm, and 2 to 6 µm cuts the ratio to one third (self-check)", () => {
    expect(START_L).toBe(2);
    expect(saToV(6) / saToV(2)).toBeCloseTo(1 / 3, 12);
    expect(saToV(3)).toBe(2); // practice: 54 / 27
  });

  it("draws the bars falling as the cell grows", () => {
    const r = BAR_SIDES.map(saToV);
    for (let i = 1; i < r.length; i++) expect(r[i]).toBeLessThan(r[i - 1]);
  });
});
