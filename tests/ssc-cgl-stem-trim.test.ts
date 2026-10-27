import { describe, expect, it } from "vitest";
import { stemTrimBox, type Gray } from "../scripts/ssc-cgl/stemTrim";

// SSC often printed a whole question as ONE picture: the sentence, then the figure, sometimes the
// question line again below it. The bank already stores that sentence as text, so the picture
// should carry the figure alone. These are synthetic pictures: a "glyph" is a small black block.

function blank(w: number, h: number): Gray {
  return { width: w, height: h, data: new Uint8Array(w * h).fill(255) };
}
function fill(g: Gray, x0: number, y0: number, x1: number, y1: number) {
  for (let y = y0; y < y1; y++) for (let x = x0; x < x1; x++) g.data[y * g.width + x] = 0;
}
/** A line of words: glyphs 6 px wide, 2 px apart, an 8 px space after every 5 glyphs. */
function words(g: Gray, x: number, y: number, h: number, glyphs: number) {
  for (let i = 0; i < glyphs; i++) {
    fill(g, x, y, x + 6, y + h);
    x += 8 + ((i + 1) % 5 === 0 ? 8 : 0);
  }
  return x;
}
/** A framed figure: a box outline with a diagonal inside. */
function figure(g: Gray, x0: number, y0: number, x1: number, y1: number) {
  fill(g, x0, y0, x1, y0 + 2);
  fill(g, x0, y1 - 2, x1, y1);
  fill(g, x0, y0, x0 + 2, y1);
  fill(g, x1 - 2, y0, x1, y1);
  for (let i = 0; i < Math.min(x1 - x0, y1 - y0); i++) fill(g, x0 + i, y0 + i, x0 + i + 1, y0 + i + 1);
}

describe("stemTrimBox", () => {
  it("cuts a left-aligned sentence off the top and crops to the figure", () => {
    const g = blank(400, 200);
    words(g, 4, 6, 14, 40); // "Select the figure that ..." (spans most of the width)
    words(g, 4, 26, 14, 10); // "series." (a short last line)
    figure(g, 10, 70, 130, 180);
    const box = stemTrimBox(g)!;
    expect(box).not.toBeNull();
    expect(box.top).toBeGreaterThan(40); // both sentence lines are gone
    expect(box.top).toBeLessThanOrEqual(70);
    expect(box.bottom).toBeGreaterThanOrEqual(180);
    expect(box.left).toBeLessThanOrEqual(10);
    expect(box.right).toBeGreaterThanOrEqual(130);
    expect(box.right).toBeLessThan(200); // the empty right half went with the sentence
    expect(box.removedTop).toBe(2);
    expect(box.removedBottom).toBe(0);
  });

  it("also cuts the question line printed under the figure", () => {
    const g = blank(400, 220);
    words(g, 4, 6, 14, 40);
    figure(g, 10, 50, 130, 160);
    words(g, 4, 190, 14, 30); // "How many women entrepreneurs are NOT Indian?"
    const box = stemTrimBox(g)!;
    expect(box.top).toBeGreaterThan(20);
    expect(box.bottom).toBeLessThan(190);
    expect(box.bottom).toBeGreaterThanOrEqual(160);
    expect(box.removedBottom).toBe(1);
  });

  it("keeps a centred chart title: it belongs to the chart", () => {
    const g = blank(400, 200);
    words(g, 120, 6, 14, 16); // centred title
    figure(g, 40, 40, 360, 190);
    expect(stemTrimBox(g)).toBeNull();
  });

  it("stops at the title when a sentence sits above it", () => {
    const g = blank(400, 220);
    words(g, 4, 6, 14, 40); // the question sentence
    words(g, 120, 40, 14, 16); // the chart's own title
    figure(g, 40, 70, 360, 210);
    const box = stemTrimBox(g)!;
    expect(box.removedTop).toBe(1);
    expect(box.top).toBeGreaterThan(20);
    expect(box.top).toBeLessThanOrEqual(40);
  });

  // 17 Jul 2023 S1 Q67: a bar chart at the left edge, its axis labels just under it, then the
  // question line. The labels start a little in from the sentence's margin, which is what tells them apart.
  it("keeps a chart's axis labels and its title: they start in from the sentence's margin", () => {
    const g = blank(400, 260);
    words(g, 4, 6, 14, 40); // the question sentence, at the margin
    words(g, 40, 30, 14, 30); // the chart title, left-ish but indented
    figure(g, 30, 60, 300, 180);
    words(g, 36, 186, 10, 30); // axis labels, close words, indented
    words(g, 4, 220, 14, 40); // the question line again, at the margin
    const box = stemTrimBox(g)!;
    expect(box.removedTop).toBe(1);
    expect(box.removedBottom).toBe(1);
    expect(box.top).toBeLessThanOrEqual(30);
    expect(box.bottom).toBeGreaterThanOrEqual(196);
  });

  // 19 Jul 2023 S2 Q59: the month names sit right under the bars, set close like words.
  it("never cuts lines that hug the figure from below", () => {
    const g = blank(400, 200);
    figure(g, 4, 6, 380, 150);
    words(g, 4, 154, 12, 40); // labels 4 px under the chart
    const box = stemTrimBox(g);
    expect(box).toBeNull();
  });

  // 19 Sep 2024 S2 Q60: "S1   S2   S3 ..." under the bars, joined into one band by the rotated axis
  // title at the left edge. Spaced labels are mostly white: not a line of text.
  it("does not take spaced axis labels for a sentence, and cuts the question below them", () => {
    const g = blank(400, 240);
    // A rotated axis title down the left edge; the white between two of its words splits the
    // label row off the chart, so the row starts at the sentence's margin.
    fill(g, 4, 10, 8, 150);
    fill(g, 4, 156, 8, 175);
    figure(g, 20, 10, 380, 150);
    for (let x = 30; x < 380; x += 40) fill(g, x, 156, x + 10, 170); // S1 .. S9, close enough to pass as words
    words(g, 4, 200, 14, 40); // the question line
    const box = stemTrimBox(g)!;
    expect(box.removedBottom).toBe(1);
    expect(box.bottom).toBeGreaterThanOrEqual(175);
    expect(box.left).toBeLessThanOrEqual(4); // the axis title stays whole
  });

  // 15 Nov 2020 Q53: "33 1/3%" puts the fraction's 1 in its own tiny band just above the line.
  it("takes a small fragment hugging a cut line along with it", () => {
    const g = blank(400, 240);
    figure(g, 10, 10, 380, 150);
    fill(g, 120, 186, 123, 192); // the "1" of a fraction, 3 px above the line
    words(g, 4, 195, 14, 40);
    const box = stemTrimBox(g)!;
    expect(box.removedBottom).toBe(2);
    expect(box.bottom).toBeLessThan(186);
  });

  // 27 Jul 2023 S1 Q61: the chart's top axis number and a bar's value ("66  65") form a short
  // line near the margin. Its type is half the sentence's height: chart lettering, not the question.
  it("stops at a line in much smaller type than the sentence above it", () => {
    const g = blank(600, 300);
    words(g, 5, 4, 17, 60);
    words(g, 6, 26, 17, 55);
    words(g, 13, 63, 9, 5); // "66  65"
    figure(g, 13, 77, 330, 210);
    const box = stemTrimBox(g)!;
    expect(box.removedTop).toBe(2);
    expect(box.top).toBeLessThanOrEqual(63);
  });

  // 12 Sep 2024 S1 Q58: a pie's "10%" label is pale grey, lighter than the ink test. The cut is
  // decided on dark ink; the box around what is kept must take in pale marks too.
  it("keeps pale chart labels inside the box", () => {
    const g = blank(400, 260);
    words(g, 4, 6, 14, 40);
    figure(g, 10, 50, 300, 160);
    for (let y = 166; y < 176; y++) for (let x = 250; x < 290; x++) g.data[y * 400 + x] = 190; // pale "10%"
    words(g, 4, 210, 14, 40);
    const box = stemTrimBox(g)!;
    expect(box.removedBottom).toBe(1);
    expect(box.bottom).toBeGreaterThanOrEqual(176);
    expect(box.right).toBeGreaterThanOrEqual(300);
  });

  // 24 Jul 2023 S1 Q22: a faint stray mark at the far edge must not stretch the box across the page.
  it("ignores a pale mark far from the figure", () => {
    const g = blank(600, 220);
    words(g, 4, 6, 14, 60);
    figure(g, 10, 50, 200, 200);
    for (let y = 60; y < 190; y++) g.data[y * 600 + 590] = 190; // a faint line at the right edge
    const box = stemTrimBox(g)!;
    expect(box.right).toBeLessThan(260);
  });

  // 12 Sep 2024 S2 Q73: a two-line chart title, the first line from the edge, the second centred
  // right under it in the same type. That is a title wrapping, not a question sentence.
  it("does not cut the first line of a title that wraps onto a centred line", () => {
    const g = blank(400, 260);
    words(g, 4, 6, 20, 40);
    words(g, 120, 32, 20, 18); // same type, close below, centred
    figure(g, 20, 70, 380, 250);
    expect(stemTrimBox(g)).toBeNull();
  });

  // 15 Nov 2020 Q58: a bold chart title sits at the sentence's margin in the sentence's type. No
  // rule tells it from the question; review does, and caps the cut for that one picture.
  it("cuts no more lines than a reviewed limit allows", () => {
    const g = blank(400, 260);
    words(g, 4, 6, 14, 40); // the question sentence
    words(g, 4, 26, 14, 40); // the chart's title, set the same way
    figure(g, 20, 60, 380, 250);
    expect(stemTrimBox(g)!.removedTop).toBe(2);
    const box = stemTrimBox(g, { maxTop: 1 })!;
    expect(box.removedTop).toBe(1);
    expect(box.top).toBeLessThanOrEqual(26);
    expect(stemTrimBox(g, { maxTop: 0 })).toBeNull();
  });

  it("keeps a caption row with wide gaps (Figure 1 ... Figure 2 ... Figure 3)", () => {
    const g = blank(400, 200);
    figure(g, 10, 10, 380, 150);
    let x = 4;
    for (let i = 0; i < 3; i++) x = words(g, x, 170, 14, 6) + 90;
    expect(stemTrimBox(g)).toBeNull();
  });

  it("never trims a picture that is text alone: there would be nothing left", () => {
    const g = blank(400, 80);
    words(g, 4, 6, 14, 40);
    words(g, 4, 30, 14, 40);
    words(g, 4, 54, 14, 20);
    expect(stemTrimBox(g)).toBeNull();
  });

  it("leaves a picture with no text alone", () => {
    const g = blank(200, 200);
    figure(g, 10, 10, 190, 190);
    expect(stemTrimBox(g)).toBeNull();
  });

  it("ignores faint grey (a scan's watermark) when finding ink", () => {
    const g = blank(400, 200);
    for (let i = 0; i < g.data.length; i += 7) g.data[i] = 200;
    words(g, 4, 6, 14, 40);
    figure(g, 10, 70, 130, 180);
    expect(stemTrimBox(g)!.removedTop).toBe(1);
  });
});
