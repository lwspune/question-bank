import { describe, expect, it } from "vitest";
import {
  CHROMOSOMES,
  MITOSIS_STEPS,
  POLES,
  chromatidPose,
  fibre,
} from "../src/app/notes/_components/visualizations/ImatMitosisSteps";

// The model animation for IMAT notes figures (scripts/imat/NOTES_VISUALS_BRIEF.md):
// mitosis in a 2n = 4 cell. The picture is only worth having if it shows the
// biology the IMAT concept teaches, so the poses are pinned here.

const dist = (a: { x: number; y: number }, b: { x: number; y: number }) => Math.hypot(a.x - b.x, a.y - b.y);
const idx = [0, 1, 2, 3];

describe("IMAT mitosis animation", () => {
  it("walks the concept's own five stages, in order", () => {
    expect(MITOSIS_STEPS.map((s) => s.title)).toEqual(["Prophase", "Metaphase", "Anaphase", "Telophase", "Cytokinesis"]);
  });

  it("draws 2n = 4: a long and a short homologous pair, one of each from each parent", () => {
    expect(CHROMOSOMES).toHaveLength(4);
    expect(new Set(CHROMOSOMES.map((c) => c.length)).size).toBe(2);
    expect(CHROMOSOMES.filter((c) => c.tone === "rose")).toHaveLength(2);
  });

  it("keeps sister chromatids together in prophase and metaphase", () => {
    for (const step of [0, 1]) for (const i of idx) expect(dist(chromatidPose(step, i, 0), chromatidPose(step, i, 1))).toBeLessThanOrEqual(8);
  });

  it("lines every chromosome up on the equator in metaphase", () => {
    for (const i of idx) for (const side of [0, 1] as const) expect(Math.abs(chromatidPose(1, i, side).x - 160)).toBeLessThanOrEqual(3);
  });

  it("pulls the sisters to opposite poles in anaphase", () => {
    for (const i of idx) {
      expect(chromatidPose(2, i, 0).x).toBeLessThan(160);
      expect(chromatidPose(2, i, 1).x).toBeGreaterThan(160);
    }
  });

  it("puts one chromatid of every chromosome in each new nucleus (identical daughters)", () => {
    for (const step of [3, 4]) {
      for (const i of idx) {
        expect(dist(chromatidPose(step, i, 0), { x: 92, y: 100 })).toBeLessThan(34);
        expect(dist(chromatidPose(step, i, 1), { x: 228, y: 100 })).toBeLessThan(34);
      }
    }
  });

  it("aims each spindle fibre exactly at its chromatid", () => {
    const p = chromatidPose(1, 2, 1);
    const f = fibre(POLES.right, p);
    const rad = (f.angle * Math.PI) / 180;
    expect(POLES.right.x + f.length * Math.cos(rad)).toBeCloseTo(p.x);
    expect(POLES.right.y + f.length * Math.sin(rad)).toBeCloseTo(p.y);
  });

  it("never says the chromosome number changes (the concept: 2n stays 2n)", () => {
    for (const s of MITOSIS_STEPS) expect(s.caption).not.toMatch(/\b8 chromosomes\b/);
  });
});
