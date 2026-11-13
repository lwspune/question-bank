import { describe, expect, it } from "vitest";
import { CHSL_LAYOUT } from "../scripts/ssc-cgl/config";
import { assembleChallenge, type ChallengePage } from "../scripts/ssc-cgl/challenge";

// The challenge-module response sheet scanned to page pictures (CHSL 2025, hosted by PW): each
// question opens with a blue "Click Here to Challenge Question No." marker; a framed page then
// has pale rules between rows (stem row, then options A-D), a frameless page only text lines.
// The key is the option row whose left cell is green (correct, chosen) or yellow (correct, not
// chosen); red marks a wrong choice. Synthetic geometry, in page pixels.

const page = (n: number, extra: Partial<ChallengePage> = {}): ChallengePage => ({
  page: n,
  height: 1754,
  marks: [],
  labels: [],
  cells: [],
  rules: [],
  lines: [],
  breaks: [],
  vector: false,
  ...extra,
});

/** A framed question at `top`: marker, label, stem row, four 40-px option rows; key row `k`. */
function framed(top: number, k: number, red?: number) {
  const marks = [{ y0: top, y1: top + 38 }];
  const labels = [{ y0: top + 60, y1: top + 73 }];
  const rules = [top + 50, top + 110, top + 150, top + 190, top + 230, top + 270];
  const cells = [{ kind: "green" as const, y0: top + 111 + 40 * k, y1: top + 149 + 40 * k }];
  if (red !== undefined) cells.push({ kind: "red" as any, y0: top + 111 + 40 * red, y1: top + 149 + 40 * red });
  return { marks, labels, rules, cells };
}

function merge(...qs: ReturnType<typeof framed>[]) {
  return {
    marks: qs.flatMap((q) => q.marks),
    labels: qs.flatMap((q) => q.labels),
    rules: qs.flatMap((q) => q.rules),
    cells: qs.flatMap((q) => q.cells),
  };
}

/** n framed questions, `per` to a page, keys cycling A-D. */
function paper(n: number, per = 5) {
  const pages: ChallengePage[] = [];
  for (let i = 0; i < n; i += per) {
    const qs = Array.from({ length: Math.min(per, n - i) }, (_, j) => framed(100 + 300 * j, (i + j) % 4));
    pages.push(page(pages.length + 2, merge(...qs)));
  }
  return pages;
}

describe("assembleChallenge", () => {
  it("reads 100 questions in CHSL's order, the key from the green cell's option row", () => {
    const qs = assembleChallenge(paper(100), CHSL_LAYOUT);
    expect(qs).toHaveLength(100);
    expect(qs.map((q) => q.key).slice(0, 5).join("")).toBe("ABCDA");
    expect(qs[0]).toMatchObject({ number: 1, part: "A" });
    expect(qs[25]).toMatchObject({ number: 26, part: "B" });
    expect(qs[99]).toMatchObject({ number: 100, part: "D" });
  });

  it("gives each question its crop (marker to the next marker) and its four option rows", () => {
    const [q1] = assembleChallenge(paper(100), CHSL_LAYOUT);
    expect(q1.regions).toEqual([{ page: 2, y0: 100, y1: 398 }]);
    // framed(100): rules at 150 (under the marker row), 210 (under the stem), then every 40 px
    expect(q1.optionRows).toEqual([
      { page: 2, y0: 210, y1: 250 },
      { page: 2, y0: 250, y1: 290 },
      { page: 2, y0: 290, y1: 330 },
      { page: 2, y0: 330, y1: 370 },
    ]);
  });

  it("takes a yellow cell (correct, not chosen) as the key and ignores a red one (wrong choice)", () => {
    const pages = paper(100);
    pages[0].cells = pages[0].cells.map((c, i) => (i === 0 ? { ...c, kind: "yellow" } : c));
    pages[0].cells.push({ kind: "red", y0: 100 + 111 + 80, y1: 100 + 149 + 80 });
    const [q1] = assembleChallenge(pages, CHSL_LAYOUT);
    expect(q1.key).toBe("A");
  });

  it("ignores rules inside a stem: the options are the LAST four rows before the next question", () => {
    const pages = paper(100);
    // a table drawn in Q1's stem adds two rules above its options
    pages[0].rules.push(100 + 70, 100 + 90);
    pages[0].rules.sort((a, b) => a - b);
    expect(assembleChallenge(pages, CHSL_LAYOUT)[0].optionRows[0]).toEqual({ page: 2, y0: 210, y1: 250 });
  });

  it("reads a doubled rule (two lines a few pixels apart) as one row boundary", () => {
    const pages = paper(100);
    pages[0].rules.push(100 + 257); // a second line 7 px under the B/C rule at 250
    pages[0].rules.sort((a, b) => a - b);
    const [q1] = assembleChallenge(pages, CHSL_LAYOUT);
    expect(q1.optionRows.map((r) => r.y0)).toEqual([210, 250, 290, 330]);
    expect(q1.key).toBe("A");
  });

  it("ignores a coloured legend printed before the first question", () => {
    const pages = paper(100);
    pages.unshift(page(1, { cells: [{ kind: "green", y0: 240, y1: 260 }, { kind: "red", y0: 240, y1: 260 }] }));
    expect(assembleChallenge(pages, CHSL_LAYOUT)).toHaveLength(100);
  });

  it("reads a frameless question by its last four text lines", () => {
    const pages = paper(100);
    const top = 1300;
    // shift page 2's fifth question to a frameless print: no rules, four option lines
    pages[0].rules = pages[0].rules.filter((y) => y < 1300);
    pages[0].cells = pages[0].cells.filter((c) => c.y0 < 1300);
    pages[0].lines = [
      { y0: top + 60, y1: top + 75 },
      { y0: top + 80, y1: top + 95 },
      { y0: top + 120, y1: top + 135 },
      { y0: top + 160, y1: top + 175 },
      { y0: top + 200, y1: top + 215 },
      { y0: top + 240, y1: top + 255 },
    ];
    pages[0].cells.push({ kind: "green", y0: top + 195, y1: top + 220 });
    expect(assembleChallenge(pages, CHSL_LAYOUT)[4].key).toBe("C");
  });

  it("follows a question whose options run onto the next page", () => {
    const pages = paper(99);
    // Q100 starts at the foot of the last page; its options continue overleaf
    const last = pages[pages.length - 1];
    last.marks.push({ y0: 1500, y1: 1538 });
    last.labels.push({ y0: 1560, y1: 1573 });
    last.rules.push(1550, 1610, 1650, 1690);
    pages.push(page(last.page + 1, { rules: [120, 160], cells: [{ kind: "green", y0: 121, y1: 159 }] }));
    const q100 = assembleChallenge(pages, CHSL_LAYOUT)[99];
    expect(q100.regions.map((r) => r.page)).toEqual([last.page, last.page + 1]);
    expect(q100.key).toBe("D");
  });

  it("stops a question at a new capture: a page that opens with the PART buttons' header", () => {
    const pages = paper(99);
    // Q100 ends its page; the next page starts a new capture whose header boxes carry rules
    const last = pages[pages.length - 1];
    const q = framed(1300, 2);
    last.marks.push(...q.marks);
    last.labels.push(...q.labels);
    last.rules.push(...q.rules);
    last.cells.push(...q.cells);
    pages.push(page(last.page + 1, { rules: [300, 640, 840, 1060], breaks: [1111] }));
    const q100 = assembleChallenge(pages, CHSL_LAYOUT)[99];
    expect(q100.key).toBe("C");
    expect(q100.regions.map((r) => r.page)).toEqual([last.page]);
  });

  it("leaves the key unknown on a capture's first page (a vector page) when nothing marks the right option", () => {
    // that page colours only the candidate's own choice: red when wrong, nothing when unanswered
    const pages = paper(100);
    pages[0].vector = true;
    const top = 1300;
    pages[0].rules = pages[0].rules.filter((y) => y < 1300);
    pages[0].cells = pages[0].cells.filter((c) => c.y0 < 1300);
    pages[0].lines = [0, 1, 2, 3, 4].map((i) => ({ y0: top + 80 + 40 * i, y1: top + 95 + 40 * i }));
    pages[0].cells.push({ kind: "red", y0: top + 155, y1: top + 180 });
    expect(assembleChallenge(pages, CHSL_LAYOUT)[4].key).toBeNull();
  });

  it("numbers each capture by its part when PW stitched the parts out of order (15 Nov 2025 S1: A, D, C, B)", () => {
    // four captures of 25, each opening on a fresh page under its PART buttons
    const pages = paper(100);
    for (const k of [1, 2, 3]) pages[k * 5].breaks = [50];
    const qs = assembleChallenge(pages, CHSL_LAYOUT, ["A", "D", "C", "B"]);
    expect(qs.map((q) => q.number).slice(0, 27)).toEqual([...Array.from({ length: 25 }, (_, i) => i + 1), 76, 77]);
    expect(qs.find((q) => q.number === 76)!.part).toBe("D");
    expect(qs.find((q) => q.number === 26)!.part).toBe("B");
    expect([...qs.map((q) => q.number)].sort((x, y) => x - y)).toEqual(Array.from({ length: 100 }, (_, i) => i + 1));
  });

  it("ignores a blue mark in a capture's header, above its PART buttons on the same page", () => {
    const pages = paper(100);
    for (const k of [1, 2, 3]) pages[k * 5].breaks = [50];
    // the capture opening on pages[5] prints a blue bar in its header box, above the buttons
    pages[5].marks.unshift({ y0: 20, y1: 40 });
    expect(assembleChallenge(pages, CHSL_LAYOUT)).toHaveLength(100);
  });

  it("refuses a capture that does not hold its part's 25 questions", () => {
    const pages = paper(100);
    pages[5].breaks = [50];
    pages[12].breaks = [50]; // a capture boundary in the wrong place (should be pages[10])
    pages[15].breaks = [50];
    expect(() => assembleChallenge(pages, CHSL_LAYOUT, ["A", "B", "C", "D"])).toThrow(/capture 2 \(PART-B\) holds 35 questions, expected 25/);
  });

  it("reads one option row split across a page break, its key cell printed on both pages, as one key", () => {
    const pages = paper(99);
    const last = pages[pages.length - 1];
    last.marks.push({ y0: 1500, y1: 1538 });
    last.labels.push({ y0: 1560, y1: 1573 });
    last.rules.push(1550, 1600, 1640, 1680);
    last.cells.push({ kind: "yellow", y0: 1681, y1: 1754 });
    pages.push(page(last.page + 1, { rules: [60, 100], cells: [{ kind: "yellow", y0: 0, y1: 59 }] }));
    // rows: A 1600-1640, B 1640-1680, C 1680 -> overleaf 60, D 60-100
    expect(assembleChallenge(pages, CHSL_LAYOUT)[99].key).toBe("C");
  });

  it("takes the page break as the missing boundary when an option row simply ends at the page foot (17 Nov S1 Q51)", () => {
    const pages = paper(99);
    const last = pages[pages.length - 1];
    last.marks.push({ y0: 1500, y1: 1538 });
    last.labels.push({ y0: 1560, y1: 1573 });
    // rules under the stem, A/B and B/C on this page; C runs to the foot; D starts overleaf, its
    // bottom rule the only one there
    last.rules.push(1600, 1640, 1680);
    last.cells.push({ kind: "yellow", y0: 1681, y1: 1750 });
    pages.push(page(last.page + 1, { rules: [60], lines: [{ y0: 20, y1: 35 }] }));
    const q100 = assembleChallenge(pages, CHSL_LAYOUT)[99];
    expect(q100.key).toBe("C");
    expect(q100.optionRows[3]).toEqual({ page: last.page + 1, y0: 0, y1: 60 });
  });

  it("refuses a question with no key cell or two", () => {
    const none = paper(100);
    none[0].cells.shift();
    expect(() => assembleChallenge(none, CHSL_LAYOUT)).toThrow(/Q1: 0 key cells/);
    const two = paper(100);
    two[0].cells.push({ kind: "green", y0: 100 + 191, y1: 100 + 229 });
    expect(() => assembleChallenge(two, CHSL_LAYOUT)).toThrow(/Q1: 2 key cells/);
  });

  it("refuses a sheet that does not hold exactly the layout's 100 questions", () => {
    expect(() => assembleChallenge(paper(99), CHSL_LAYOUT)).toThrow(/99 questions, expected 100/);
  });
});
