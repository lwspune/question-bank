import { describe, expect, it } from "vitest";
import { assembleVector, type VectorGeometry } from "../scripts/ssc-cgl/vector";

// The 2022 vector print (5-13 Dec): no text layer. Each question sits in a grey frame (one
// per page it covers); its last frame holds the right-hand panel box; its four options carry
// tick/cross icons, the TICK drawn 84x84 (or 84x83) and the CROSS 31x21, so size is the key.
type Box = { page: number; x0: number; y0: number; x1: number; y1: number };

function paper(keys: number[], opts: { split?: number } = {}): VectorGeometry {
  const g: VectorGeometry = { frames: [], panels: [], icons: [], images: [] };
  let page = 1;
  keys.forEach((key, i) => {
    const top = i % 2 === 0 ? 40 : 400;
    if (opts.split === i) {
      // this question runs over a page break: a frame on each page, icons on the second
      g.frames.push({ page, x0: 9, y0: top, x1: 487, y1: 740 });
      page++;
      g.frames.push({ page, x0: 9, y0: 6, x1: 487, y1: 300 });
      for (let k = 0; k < 4; k++) g.icons.push(icon(page, 100 + k * 16, k === key));
      g.panels.push({ page, x0: 274, y0: 240, x1: 479, y1: 282 });
      return;
    }
    g.frames.push({ page, x0: 9, y0: top, x1: 487, y1: top + 300 });
    for (let k = 0; k < 4; k++) g.icons.push(icon(page, top + 120 + k * 16, k === key));
    g.panels.push({ page, x0: 274, y0: top + 240, x1: 479, y1: top + 282 });
    if (i % 2 === 1) page++;
  });
  return g;
}

function icon(page: number, y: number, tick: boolean) {
  return { page, x0: 34, y0: y, x1: 49, y1: y + 10, w: tick ? 84 : 31, h: tick ? 84 : 21 };
}

describe("assembleVector", () => {
  const keys = Array.from({ length: 100 }, (_, i) => i % 4);

  it("reads 100 questions, A-D by 25, the key from the tick icon", () => {
    const qs = assembleVector(paper(keys));
    expect(qs).toHaveLength(100);
    expect(qs[0]).toMatchObject({ number: 1, part: "A", key: "A" });
    expect(qs[26]).toMatchObject({ number: 27, part: "B", key: "C" });
    expect(qs[99]).toMatchObject({ number: 100, part: "D", key: "D" });
  });

  it("joins the frames of a question that runs over a page break into its regions", () => {
    const qs = assembleVector(paper(keys, { split: 4 }));
    expect(qs[4].regions).toEqual([
      { page: 3, y0: 40, y1: 740 },
      { page: 4, y0: 6, y1: 300 },
    ]);
    expect(qs[4].key).toBe("A");
    expect(qs[5].regions[0].page).toBe(4);
  });

  it("files a picture beside an option under that option, and the rest under the stem", () => {
    const g = paper(keys);
    g.images.push({ page: 1, name: "fig", x0: 60, y0: 60, x1: 200, y1: 150 });
    g.images.push({ page: 1, name: "optB", x0: 60, y0: 174, x1: 200, y1: 182 });
    const [q] = assembleVector(g);
    expect(q.stemImages).toEqual(["fig"]);
    expect(q.optionImages).toEqual([[], ["optB"], [], []]);
  });

  it("refuses a question without exactly one tick among four icons", () => {
    const g = paper(keys);
    g.icons[0] = { ...g.icons[0], w: 31, h: 21 };
    expect(() => assembleVector(g)).toThrow(/Q1: 4 icons, 0 ticks/);
  });

  it("keeps the first of several identical copies of the paper in one file (5 Dec S4: three)", () => {
    const one = paper(keys);
    const shiftPages = (g: VectorGeometry, by: number): VectorGeometry => ({
      frames: g.frames.map((b) => ({ ...b, page: b.page + by })),
      panels: g.panels.map((b) => ({ ...b, page: b.page + by })),
      icons: g.icons.map((b) => ({ ...b, page: b.page + by })),
      images: g.images.map((b) => ({ ...b, page: b.page + by })),
    });
    const merge = (...gs: VectorGeometry[]): VectorGeometry => ({
      frames: gs.flatMap((g) => g.frames), panels: gs.flatMap((g) => g.panels),
      icons: gs.flatMap((g) => g.icons), images: gs.flatMap((g) => g.images),
    });
    const qs = assembleVector(merge(one, shiftPages(one, 60), shiftPages(one, 120)));
    expect(qs).toHaveLength(100);
    expect(qs[0].regions[0].page).toBe(1);
    const other = paper(keys.map((k) => (k + 1) % 4));
    expect(() => assembleVector(merge(one, shiftPages(other, 60)))).toThrow(/copies differ/);
  });

  it("counts only tick and cross pictures as icons, not a small picture of maths beside them", () => {
    const g = paper(keys);
    g.icons.push({ page: 1, x0: 70, y0: 60, x1: 80, y1: 68, w: 40, h: 34 });
    // ...nor a cross-sized picture out in the stem (6 Dec 2022 S1 Q63: 32x22 at x 60)
    g.icons.push({ page: 1, x0: 60, y0: 90, x1: 75, y1: 100, w: 32, h: 22 });
    expect(assembleVector(g)[0].key).toBe("A");
  });

  it("refuses a sheet that is not 100 questions", () => {
    expect(() => assembleVector(paper(keys.slice(0, 99)))).toThrow(/99 questions/);
  });
});
