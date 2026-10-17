import { describe, expect, it } from "vitest";
import { LAYOUTS, type Section } from "../scripts/ssc-cgl/config";
import { assembleRaster, type RasterGeometry, type RasterIcon, type RasterPage } from "../scripts/ssc-cgl/raster";

// The CGL 2025 Tier II scan as raster_extract.py dumps it: per page picture, the tick/cross
// blobs of each option row (in the icon column) and the panel blocks right of the options.
const SMALL: Section[] = [
  { part: "A", match: /x/, count: 3, subjects: ["Quantitative Aptitude"] },
  { part: "B", match: /y/, count: 2, subjects: ["Reasoning"] },
];

/** One question at `top`: four option rows 70 px apart (key = the tick), then its 7-line panel. */
function question(top: number, key: number): { icons: RasterIcon[]; panel: { y0: number; y1: number; lines: number } } {
  const icons: RasterIcon[] = [0, 1, 2, 3].map((i) => ({
    kind: i === key ? "tick" : "cross",
    y0: top + 100 + i * 70,
    y1: top + 112 + i * 70,
    x0: 157,
    x1: i === key ? 191 : 167,
    n: 50,
  }));
  return { icons, panel: { y0: top + 420, y1: top + 570, lines: 7 } };
}

/** Pages of two questions each (tops 50 and 800), plus stray stem-tail blocks. */
function geometry(keys: number[]): RasterGeometry {
  const pages: RasterPage[] = [];
  keys.forEach((k, i) => {
    if (i % 2 === 0) pages.push({ page: pages.length + 1, width: 1239, height: 1754, icons: [], panels: [{ y0: 60, y1: 70, lines: 1 }] });
    const p = pages[pages.length - 1];
    const q = question(i % 2 === 0 ? 50 : 800, k);
    p.icons.push(...q.icons);
    p.panels.push(q.panel);
  });
  return { pages };
}

describe("assembleRaster", () => {
  it("reads one question per run of four icons, the key from its tick, numbered and parted by the layout", () => {
    const qs = assembleRaster(geometry([0, 3, 1, 2, 0]), SMALL);
    expect(qs.map((q) => [q.number, q.part, q.key])).toEqual([
      [1, "A", "A"],
      [2, "A", "D"],
      [3, "A", "B"],
      [4, "B", "C"],
      [5, "B", "A"],
    ]);
    expect(qs[1].optionRows).toEqual([0, 1, 2, 3].map((i) => ({ page: 1, y0: 900 + i * 70, y1: 912 + i * 70 })));
    // the panel itself, so the sheet can paint out any edge of its box the crop still holds
    expect(qs[1].panel).toEqual({ page: 1, y0: 1220, y1: 1370 });
  });

  it("crops each question from the previous panel's end to its own panel's top, across a page break", () => {
    const qs = assembleRaster(geometry([0, 0, 0, 0, 0]), SMALL);
    expect(qs[0].regions).toEqual([{ page: 1, y0: 0, y1: 469 }]);
    expect(qs[1].regions).toEqual([{ page: 1, y0: 621, y1: 1219 }]);
    // Q3 starts after Q2's panel on page 1 and ends at its own panel on page 2
    expect(qs[2].regions).toEqual([
      { page: 1, y0: 1371, y1: 1694 },
      { page: 2, y0: 0, y1: 469 },
    ]);
  });

  it("reads the real Tier II layout: 150 questions, 600 icons", () => {
    const qs = assembleRaster(geometry(Array.from({ length: 150 }, (_, i) => i % 4)), LAYOUTS[2]);
    expect(qs).toHaveLength(150);
    expect(qs[149]).toMatchObject({ number: 150, part: "E", key: "B" });
  });

  it("refuses a question with no tick or two", () => {
    const g = geometry([0, 0, 0, 0, 0]);
    g.pages[0].icons[0].kind = "cross";
    expect(() => assembleRaster(g, SMALL)).toThrow(/Q1: expected exactly one tick, found 0/);
    g.pages[0].icons[0].kind = "tick";
    g.pages[0].icons[1].kind = "tick";
    expect(() => assembleRaster(g, SMALL)).toThrow(/Q1: expected exactly one tick, found 2/);
  });

  it("refuses an icon count that is not four per question of the layout", () => {
    const g = geometry([0, 0, 0, 0, 0]);
    g.pages[2].icons.pop();
    expect(() => assembleRaster(g, SMALL)).toThrow(/19 icons, expected 20 \(5 questions x 4\)/);
  });

  it("refuses a question whose panel is missing before the next question begins", () => {
    const g = geometry([0, 0, 0, 0, 0]);
    g.pages[0].panels = g.pages[0].panels.filter((p) => p.y0 !== 470);
    expect(() => assembleRaster(g, SMALL)).toThrow(/Q1: no panel after its options/);
  });

  it("refuses options split across pages (the region and masking assume one page)", () => {
    const g = geometry([0, 0, 0, 0, 0]);
    const moved = g.pages[0].icons.splice(7, 1)[0];
    g.pages[1].icons.unshift({ ...moved, y0: 20, y1: 32 });
    expect(() => assembleRaster(g, SMALL)).toThrow(/Q2: its options run over pages 1-2/);
  });
});
