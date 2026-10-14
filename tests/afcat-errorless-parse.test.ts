import { describe, it, expect } from "vitest";
import { errorlessPage, splitTypeSections, reorderQuestionBlocks, fixLigatures, type PdfPage, type PdfWord } from "../scripts/afcat/lib";

// Geometry taken from the real Errorless sheets (612 x 792 pt, two columns split
// at the midline, page number at y ~730, an ANSWERS heading at the foot of the
// right column on every second page).
const line = (x: number, y: number, text: string): PdfWord[] => {
  let cx = x;
  return text.split(" ").map((t) => {
    const w: PdfWord = [cx, y, cx + t.length * 5, y + 13, t];
    cx += t.length * 5 + 4;
    return w;
  });
};
const page = (...words: PdfWord[][]): PdfPage => ({ width: 612, height: 792, words: words.flat() });

describe("errorlessPage", () => {
  it("reads the left column top to bottom, then the right column", () => {
    const p = page(
      line(65, 90, "1. A mixture contains milk"),
      line(82, 104, "and water in the ratio 3:2."),
      line(311, 90, "7. A vessel holds 40 liters."),
      line(82, 118, "a) 10 liters"),
    );
    expect(errorlessPage(p).lines).toEqual(["1. A mixture contains milk", "and water in the ratio 3:2.", "a) 10 liters", "7. A vessel holds 40 liters."]);
  });

  it("puts words on one line when their tops differ by a point or two, in x order", () => {
    const p = page(line(82, 300, "a) 12 liters"), line(160, 301.5, "b) 15 liters"));
    expect(errorlessPage(p).lines).toEqual(["a) 12 liters b) 15 liters"]);
  });

  it("drops the page number in the footer band", () => {
    const p = page(line(82, 700, "d) 7 days"), [[302.8, 730.2, 308.8, 743.9, "1"]]);
    expect(errorlessPage(p).lines).toEqual(["d) 7 days"]);
  });

  it("hands everything below an ANSWERS heading in its column to keyLines, never to lines", () => {
    const p = page(
      line(311, 400, "20. How much water must be added?"),
      line(328, 414, "a) 5 liters"),
      line(402, 489, "ANSWERS"),
      line(347, 516, "1. x) 4 days"),
      line(347, 530, "2. x) 12 days"),
      line(65, 600, "6. A left-column question below the box's height"),
    );
    const out = errorlessPage(p);
    expect(out.lines).toEqual(["6. A left-column question below the box's height", "20. How much water must be added?", "a) 5 liters"]);
    expect(out.keyBlocks).toEqual([["1. x) 4 days", "2. x) 12 days"]]);
  });

  it("returns an empty key block for a heading over a picture (the key is an image)", () => {
    const p = page(line(311, 400, "15. Last question?"), line(410, 489, "ANSWERS"));
    expect(errorlessPage(p).keyBlocks).toEqual([[]]);
  });

  it("repairs the font's ligatures (ff printed as U+01AF, fi, fl)", () => {
    const p = page(line(65, 90, "Type-DiƯerent EƯiciency ﬁnd ﬂow"));
    expect(errorlessPage(p).lines).toEqual(["Type-Different Efficiency find flow"]);
    expect(fixLigatures("eƯort")).toBe("effort");
  });
});

describe("reorderQuestionBlocks", () => {
  // Average sheet, section 5: page 9 prints 1-8 then 15-18, page 10 prints 9-14 then 19-20.
  it("sorts question blocks into number order when they are a clean 1..N", () => {
    const lines = ["1. Q one", "a) 1 b) 2 c) 3 d) 4", "3. Q three", "a) 1 b) 2 c) 3 d) 4", "2. Q two", "spills over", "a) 1 b) 2 c) 3 d) 4"];
    expect(reorderQuestionBlocks(lines)).toEqual([
      "1. Q one", "a) 1 b) 2 c) 3 d) 4", "2. Q two", "spills over", "a) 1 b) 2 c) 3 d) 4", "3. Q three", "a) 1 b) 2 c) 3 d) 4",
    ]);
  });

  it("leaves the lines alone when the numbers are not a clean 1..N (a gap or a repeat)", () => {
    const gap = ["1. A", "3. B"];
    const repeat = ["1. A", "2. B", "2. C"];
    expect(reorderQuestionBlocks(gap)).toEqual(gap);
    expect(reorderQuestionBlocks(repeat)).toEqual(repeat);
  });

  it("keeps lines before the first question in front", () => {
    expect(reorderQuestionBlocks(["intro", "2. B", "1. A"])).toEqual(["intro", "1. A", "2. B"]);
  });
});

describe("splitTypeSections", () => {
  it("starts a section at each Type- heading, joining a wrapped title up to question 1", () => {
    const lines = [
      "Type-Adding One Component & Change in",
      "Ratio",
      "1. A mixture contains milk and water.",
      "a) 10 b) 12 c) 15 d) 18",
      "Type- Mixing to Mixtures",
      "1. Two vessels hold milk.",
      "a) 1:1 b) 2:1 c) 3:1 d) 4:1",
    ];
    expect(splitTypeSections(lines)).toEqual([
      { title: "Adding One Component & Change in Ratio", lines: ["1. A mixture contains milk and water.", "a) 10 b) 12 c) 15 d) 18"] },
      { title: "Mixing to Mixtures", lines: ["1. Two vessels hold milk.", "a) 1:1 b) 2:1 c) 3:1 d) 4:1"] },
    ]);
  });

  it("drops a count in the title like '(20 Question)'", () => {
    expect(splitTypeSections(["Type-Some people left the Work(20 Question)", "1. Q?"])[0].title).toBe("Some people left the Work");
  });

  it("refuses text before the first Type- heading rather than losing it", () => {
    expect(() => splitTypeSections(["1. orphan question", "Type-X", "1. Q?"])).toThrow(/before the first Type/);
  });
});
