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

  it("reads the 2023 print's tick, a 23x23 picture, as a tick", () => {
    const g = paper(keys);
    for (const ic of g.icons) if (ic.w === 84) Object.assign(ic, { w: 23, h: 23 });
    expect(assembleVector(g).map((q) => q.key).join("")).toBe(keys.map((k) => "ABCD"[k]).join(""));
  });
});

// The 2023 scans (17-24 Jul, 14 Jul from 2:30): each sheet's FIRST page is one raster picture
// with an OCR text layer, holding Q.1-Q.3; the rest of the sheet is the vector print. The
// raster page has no frames, panels or icon pictures: its questions are found by their OCR
// "Q.n" labels and keyed by the green tick and red crosses read off its pixels (marks).
describe("assembleVector, a raster first page", () => {
  const keys = Array.from({ length: 100 }, (_, i) => i % 4);

  function scanned(rasterKeys: number[]): VectorGeometry {
    const rest = paper(keys.slice(rasterKeys.length));
    const g: VectorGeometry = {
      frames: rest.frames.map((b) => ({ ...b, page: b.page + 1 })),
      panels: rest.panels.map((b) => ({ ...b, page: b.page + 1 })),
      icons: rest.icons.map((b) => ({ ...b, page: b.page + 1 })),
      images: [{ page: 1, name: "scan", x0: 0, y0: 0, x1: 612, y1: 792 }],
      marks: [],
      spans: [
        { page: 1, x0: 45, y0: 60, x1: 300, y1: 70, text: "Combined Graduate level Examination 2023 Tier I" },
        { page: 1, x0: 16, y0: 775, x1: 60, y1: 785, text: "aglasem.com" },
      ],
    };
    rasterKeys.forEach((key, i) => {
      const top = 200 + i * 170;
      g.spans!.push({ page: 1, x0: 50, y0: top, x1: 70, y1: top + 10, text: `Q.${i + 1} Select the option` });
      for (let k = 0; k < 4; k++) {
        const y = top + 40 + k * 17;
        g.marks!.push({ page: 1, x0: 80, y0: y, x1: 92, y1: y + 7, kind: k === key ? "tick" : "cross" });
      }
    });
    return g;
  }

  it("reads the raster page's questions first, keyed from the marks, then the vector ones", () => {
    const qs = assembleVector(scanned([3, 3, 0]));
    expect(qs).toHaveLength(100);
    expect(qs.slice(0, 4).map((q) => q.key).join("")).toBe("DDAD");
    expect(qs[0]).toMatchObject({ number: 1, part: "A", stemImages: [], optionImages: [[], [], [], []] });
    expect(qs[3].number).toBe(4);
    expect(qs[99].key).toBe("ABCD"[keys[99]]);
  });

  it("gives a raster question the page from its label to the next label, marked raster", () => {
    const qs = assembleVector(scanned([3, 3, 0]));
    expect(qs[0].regions).toEqual([{ page: 1, y0: 196, y1: 366, raster: true }]);
    // the last one on the page runs to the footer
    expect(qs[2].regions).toEqual([{ page: 1, y0: 536, y1: 771, raster: true }]);
  });

  it("refuses a raster question without four marks and one tick", () => {
    const g = scanned([3, 3, 0]);
    g.marks = g.marks!.filter((m, i) => i !== 5);
    expect(() => assembleVector(g)).toThrow(/raster Q\.2: 3 marks, 1 ticks/);
  });
});
