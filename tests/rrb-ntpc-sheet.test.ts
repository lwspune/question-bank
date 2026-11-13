import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import type { TcsGeometry, TcsSpan } from "../scripts/ssc-cgl/tcs";
import { assembleNtpc, coverIcons, normaliseNtpcGeometry, optionIcons } from "../scripts/rrb-ntpc/sheet";

const GREEN = 0x40c64b;
const RED = 0xf61818;
const INK = 0x252525;
const span = (over: Partial<TcsSpan>): TcsSpan => ({ page: 0, x0: 58, y0: 100, x1: 300, y1: 110, text: "", color: INK, bold: false, ...over });

describe("normaliseNtpcGeometry", () => {
  const norm = (spans: TcsSpan[]) => normaliseNtpcGeometry({ spans, images: [] }).spans;

  it("gives the header the labels the SSC reader knows", () => {
    const out = norm([span({ text: "Test Date" }), span({ text: "Test Time", y0: 120 })]);
    expect(out.map((s) => s.text)).toEqual(["Exam Date", "Exam Time"]);
  });

  it("renumbers a key-coloured option label A-D as 1-4", () => {
    const out = norm([
      span({ text: "A. 656 cm2", color: RED }),
      span({ text: "B. 702 cm2", color: GREEN }),
      span({ text: "C.", color: RED }),
      span({ text: "D. 698", color: RED }),
    ]);
    expect(out.map((s) => s.text)).toEqual(["1. 656 cm2", "2. 702 cm2", "3.", "4. 698"]);
  });

  it("leaves a stem line that starts with a letter label alone (it is not key-coloured)", () => {
    expect(norm([span({ text: "A. All birds can fly." })])[0].text).toBe("A. All birds can fly.");
  });

  it("lifts a Q label to the top of its line, so a stem line printed a hair higher still opens after it", () => {
    const out = norm([span({ text: "Q.29", bold: true, x0: 28, x1: 50, y0: 300 }), span({ text: "Find the", x0: 58, y0: 299.6 })]);
    expect(out[0].y0).toBeLessThan(299.6);
  });

  it("drops the host's text left of the page margin (Prepp's www.prepp.in, a stray quote)", () => {
    const out = norm([span({ text: "www.prepp.in", x0: 12, y0: -2 }), span({ text: '"', x0: 0, y0: 198 }), span({ text: "Q.1", x0: 25, bold: true })]);
    expect(out.map((s) => s.text)).toEqual(["Q.1"]);
  });
});

describe("coverIcons", () => {
  const q = (y1: number) => ({ number: 21, regions: [{ page: 3, y0: 300.3, y1 }] });
  const icon = (y0: number, y1: number) => ({ page: 3, x0: 57.7, y0, x1: 74.5, y1 });
  const four = [icon(325, 336.7), icon(343.3, 355), icon(361.6, 373.3), icon(379.8, 391.5)];

  it("stretches a region over a tick that hangs below the option text, so the masking realigns every row", () => {
    // 16 Mar S1 Q21: the keyed option's 16 pt tick ends 1.7 pt below the region, its row was left
    // out of the realignment, and the keyed option printed indented on the reading sheet.
    const [out] = coverIcons([q(389.8)], four);
    expect(out.regions[0].y1).toBe(391.5);
  });

  it("refuses a question without exactly four icons (a row the masking would not realign)", () => {
    expect(() => coverIcons([q(389.8)], four.slice(0, 3))).toThrow(/Q21: 3 option icons/);
  });

  it("does not take the next question's icons", () => {
    expect(() => coverIcons([q(389.8)], [...four, icon(420, 431)])).not.toThrow();
  });
});

describe("optionIcons", () => {
  const label = (y0: number, x0 = 77.7) => ({ page: 8, x0, y0, x1: x0 + 8, y1: y0 + 10 });
  const box = (x0: number, y0: number, x1: number, y1: number) => ({ page: 8, x0, y0, x1, y1 });

  it("keeps the tick and the crosses, which end just left of their option label", () => {
    const icons = [box(57.7, 205.9, 74.5, 217.6), box(65, 260.7, 76.7, 272.4)];
    expect(optionIcons(icons, [label(206.1), label(260.9, 79.5)])).toEqual(icons);
  });

  it("drops a small option picture right of its label that the extractor filed as an icon", () => {
    // 16 Mar S2 Q50: option C's 30x15 px picture at x 89, 22 pt wide, counted as a fifth icon.
    expect(optionIcons([box(89.1, 243.2, 111.1, 254.2)], [label(242.6)])).toEqual([]);
  });
});

// The real sheet, when this machine has it (the source PDFs are not in the repo).
const GEOMETRY = join(__dirname, "..", "scripts", "rrb-ntpc", "out", "g1-2026-03-16-s1", "geometry.json");
describe.skipIf(!existsSync(GEOMETRY))("assembleNtpc on 16 Mar 2026 Shift 1", () => {
  const qs = () => assembleNtpc(JSON.parse(readFileSync(GEOMETRY, "utf8")) as TcsGeometry);

  it("reads 100 questions, one key each, filed under the printed date and slot", () => {
    const all = qs();
    expect(all.map((q) => q.number)).toEqual(Array.from({ length: 100 }, (_, i) => i + 1));
    expect(new Set(all.map((q) => `${q.date} s${q.shift}`))).toEqual(new Set(["2026-03-16 s1"]));
  });

  it("keeps each stem's first line and lets no host text into a question", () => {
    const all = qs();
    expect(all[0].stem.startsWith("Find the area of a quadrilateral ABCD")).toBe(true);
    expect(all.filter((q) => /prepp/i.test(q.stem + q.options.join(" ")))).toEqual([]);
    expect(all[99].options).toEqual(["96", "94", "90", "92"]);
  });

  it("takes the key from the green option", () => {
    expect(qs()[0].key).toBe("B");
  });
});
