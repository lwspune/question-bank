import { describe, expect, it } from "vitest";
import { assembleQuestions, checkShift, parseTranscript, type Cell, type Geometry, type Marker } from "../scripts/ssc-cgl/lib";

// A question as SSC's challenge module prints it: a stem cell holding the "Q.No"
// label, then four option cells. The key is the FILL of an option's left cell:
// G = correct option the candidate chose, Y = correct option they did not choose,
// R = a wrong option they chose. Exactly one option is G or Y.
function question(page: number, top: number, keyIndex: number, chosenWrong?: number): { cells: Cell[]; marker: Marker } {
  const cells: Cell[] = [{ page, y0: top, y1: top + 40, fill: null, images: [`p${page}-${top}-stem-en`, `p${page}-${top}-stem-hi`] }];
  for (let i = 0; i < 4; i++) {
    const y0 = top + 40 + i * 40;
    const fill = i === keyIndex ? (chosenWrong === undefined ? "G" : "Y") : i === chosenWrong ? "R" : null;
    cells.push({ page, y0, y1: y0 + 40, fill, images: [`p${page}-${y0}-en`, `p${page}-${y0}-hi`] });
  }
  return { cells, marker: { kind: "q", page, y: top + 3, n: 0 } };
}

/** A shift of `count` questions laid out 2 per page, numbered 1..count, one part per 25. */
function shift(shiftNo: number, firstPage: number, count: number, keyOf: (n: number) => number): Geometry {
  const cells: Cell[] = [];
  const markers: Marker[] = [{ kind: "shift", page: firstPage, y: 10, shift: shiftNo }];
  for (let n = 1; n <= count; n++) {
    const page = firstPage + Math.floor((n - 1) / 2);
    const top = (n - 1) % 2 === 0 ? 50 : 300;
    if ((n - 1) % 25 === 0) markers.push({ kind: "part", page, y: top - 10, part: "ABCD"[(n - 1) / 25] as "A" });
    const q = question(page, top, keyOf(n));
    cells.push(...q.cells);
    markers.push({ ...q.marker, n } as Marker);
  }
  return { cells, markers };
}

describe("assembleQuestions", () => {
  it("groups cells into questions with four options and reads the key from the fill", () => {
    const qs = assembleQuestions(shift(1, 1, 100, (n) => n % 4));
    expect(qs).toHaveLength(100);
    expect(qs[0]).toMatchObject({ shift: 1, number: 1, part: "A", key: "B" });
    expect(qs[0].stemImages).toEqual(["p1-50-stem-en", "p1-50-stem-hi"]);
    expect(qs[0].options).toHaveLength(4);
    expect(qs[3]).toMatchObject({ number: 4, key: "A" });
    expect(qs[25]).toMatchObject({ number: 26, part: "B" });
    expect(qs[99]).toMatchObject({ number: 100, part: "D" });
  });

  it("counts YELLOW (correct, not chosen) as the key and ignores RED (wrong, chosen)", () => {
    const g = shift(1, 1, 100, () => 0);
    const q1 = question(1, 50, 2, 0); // key C, candidate chose A
    g.cells.splice(0, 5, ...q1.cells);
    const [first] = assembleQuestions(g);
    expect(first.key).toBe("C");
  });

  it("orders a stem cell AFTER its own label even though the cell starts above it", () => {
    // The label sits a few points inside the stem cell. Sorting cells by their top edge
    // would hand the stem to the previous question; the midpoint keeps it with its own.
    const qs = assembleQuestions(shift(1, 1, 100, () => 1));
    expect(qs[1].stemImages[0]).toBe("p1-300-stem-en");
  });

  it("re-joins an option row that a page break split into two cells", () => {
    const g = shift(1, 1, 100, () => 3);
    // Q2 sits at y=300 on page 1; split its last option (key D) across pages 1 and 2.
    const idx = g.cells.findIndex((c) => c.images[0] === "p1-460-en");
    const last = g.cells[idx];
    g.cells.splice(idx, 1, { ...last, y1: 480, images: [last.images[0]] }, { page: 2, y0: 5, y1: 25, fill: "G", images: [last.images[1]] });
    // keep page 2's own questions below the continuation
    const qs = assembleQuestions(g);
    expect(qs[1].options[3]).toEqual(["p1-460-en", "p1-460-hi"]);
    expect(qs[1].key).toBe("D");
  });

  it("refuses a question that does not resolve to exactly four options", () => {
    const g = shift(1, 1, 100, () => 0);
    g.cells.splice(4, 1); // drop Q1's last option
    expect(() => assembleQuestions(g)).toThrow(/shift 1 Q1.*4 options/);
  });

  it("refuses a question with no key colour or with two", () => {
    const none = shift(1, 1, 100, () => 0);
    none.cells[1] = { ...none.cells[1], fill: null };
    expect(() => assembleQuestions(none)).toThrow(/shift 1 Q1.*exactly one/);
    const two = shift(1, 1, 100, () => 0);
    two.cells[2] = { ...two.cells[2], fill: "Y" };
    expect(() => assembleQuestions(two)).toThrow(/shift 1 Q1.*exactly one/);
  });

  it("reads a clipped label as the number it is a prefix of, in its place, and reports the repair", () => {
    const g = shift(1, 1, 100, () => 0);
    // 16 Sep 2025 S1: the label of Q48 prints as "Q.No: 4" (its last digit clipped).
    const m = g.markers.find((x) => x.kind === "q" && x.n === 48) as Extract<Marker, { kind: "q" }>;
    m.n = 4;
    const repairs: string[] = [];
    const qs = assembleQuestions(g, { onRepair: (s) => repairs.push(s) });
    expect(qs.map((q) => q.number)).toEqual(Array.from({ length: 100 }, (_, i) => i + 1));
    expect(repairs).toEqual(["shift 1: label 4 on page 24 read as Q48 (clipped label)"]);
  });

  it("does not repair a label that is not a prefix of the expected number, and names the gap and the duplicate", () => {
    const g = shift(1, 1, 100, () => 0);
    const m = g.markers.find((x) => x.kind === "q" && x.n === 48) as Extract<Marker, { kind: "q" }>;
    m.n = 7;
    expect(() => assembleQuestions(g)).toThrow(/shift 1.*missing 48.*duplicate 7/);
  });

  it("accepts questions a shift's source is declared to lack, and only those", () => {
    const g = shift(3, 1, 100, () => 0);
    // 16 Sep 2025 S3: the hosted file has no PART-C at all. Drop Q51-75 the way shift() lays
    // them out: question n on page 1 + floor((n-1)/2), at top 50 or 300, cells top..top+200.
    const range = Array.from({ length: 25 }, (_, i) => 51 + i);
    const at = (n: number) => ({ page: 1 + Math.floor((n - 1) / 2), top: (n - 1) % 2 === 0 ? 50 : 300 });
    g.markers = g.markers.filter((x) => !(x.kind === "q" && range.includes(x.n)));
    g.cells = g.cells.filter((c) => !range.some((n) => c.page === at(n).page && c.y0 >= at(n).top && c.y0 < at(n).top + 200));
    expect(assembleQuestions(g, { missing: { 3: range } })).toHaveLength(75);
    expect(() => assembleQuestions(g)).toThrow(/shift 3.*missing 51/);
    expect(() => assembleQuestions(g, { missing: { 3: range.slice(1) } })).toThrow(/shift 3.*missing 51/);
  });

  it("keeps shifts apart and refuses a shift that is not numbered 1..100", () => {
    const a = shift(1, 1, 100, () => 0);
    const b = shift(2, 60, 100, () => 1);
    const qs = assembleQuestions({ cells: [...a.cells, ...b.cells], markers: [...a.markers, ...b.markers] });
    expect(qs.filter((q) => q.shift === 2)).toHaveLength(100);
    expect(qs.find((q) => q.shift === 2 && q.number === 1)?.key).toBe("B");

    const short = shift(1, 1, 99, () => 0);
    expect(() => assembleQuestions(short)).toThrow(/shift 1.*missing 100/);
  });
});

const BLOCK = String.raw`
=== 26
subject: History
chapter: Modern India
subtopic: Freedom Movement — INC, Gandhi and Independence
difficulty: EASY
answer: C
stem:
In which year was the Indian National Congress founded?
A: 1857
B: 1875
C: 1885
D: 1905
solution:
The INC was founded in \(1885\) in Bombay.
`;

const PASSAGE = String.raw`
=== 94
chapter: Reading Comprehension
subtopic: Locating the Answer Line
difficulty: MODERATE
answer: B
context:
Read the following passage and answer the questions based on the passage:
The accelerating depletion of fossil fuels has propelled renewable energy.

Geothermal energy is used for space heating.
stem:
Why is geothermal energy cited in the passage?
A: To highlight a rare solution
B: To show renewables reach beyond electricity
C: To criticise fossil fuels
D: To praise oil-rich nations
solution:
The passage lists heating among non-electric uses.

=== 95
chapter: Reading Comprehension
subtopic: Main Idea, Author's View and Tone
difficulty: MODERATE
answer: A
context_from: 94
stem:
What is the main idea of the passage?
A: Renewables can reshape economies
B: Coal is cheap
C: Dams are harmful
D: Oil will last
solution:
The passage argues renewables transform economies.
`;

describe("parseTranscript", () => {
  it("parses a block with the optional subject header", () => {
    const [q] = parseTranscript(BLOCK);
    expect(q).toMatchObject({ number: 26, subject: "History", chapter: "Modern India", difficulty: "EASY", answer: "C", figure: "none", flawed: false });
    expect(q.options).toEqual(["1857", "1875", "1885", "1905"]);
    expect(q.solution).toBe("The INC was founded in \\(1885\\) in Bombay.");
    expect(q.context).toBeUndefined();
  });

  it("reads a context section and resolves context_from to the earlier block's passage", () => {
    const [a, b] = parseTranscript(PASSAGE);
    expect(a.context).toBe(
      "Read the following passage and answer the questions based on the passage:\nThe accelerating depletion of fossil fuels has propelled renewable energy.\n\nGeothermal energy is used for space heating."
    );
    expect(a.stem).toBe("Why is geothermal energy cited in the passage?");
    expect(b.context).toBe(a.context);
    expect(b.subject).toBeUndefined();
  });

  it("refuses context_from that names a block with no passage, or a missing block", () => {
    expect(() => parseTranscript(PASSAGE.replace("context_from: 94", "context_from: 26") + BLOCK)).toThrow(/Q95.*context_from 26/);
    expect(() => parseTranscript(PASSAGE.replace("context_from: 94", "context_from: 7"))).toThrow(/Q95.*context_from 7/);
  });

  it("refuses a block with both a context section and context_from", () => {
    const both = PASSAGE.replace("context_from: 94\nstem:", "context_from: 94\ncontext:\nAnother passage.\nstem:");
    expect(() => parseTranscript(both)).toThrow(/Q95.*both/);
  });

  it("reads figure, note and flawed, and rejects bad values", () => {
    const [q] = parseTranscript(BLOCK.replace("answer: C", "answer: C\nfigure: options\nnote: the key says D\nflawed: yes"));
    expect(q).toMatchObject({ figure: "options", note: "the key says D", flawed: true });
    expect(() => parseTranscript(BLOCK.replace("answer: C", "answer: E"))).toThrow(/Q26.*answer/);
    expect(() => parseTranscript(BLOCK.replace("EASY", "MEDIUM"))).toThrow(/Q26.*difficulty/);
    expect(() => parseTranscript(BLOCK.replace("answer: C", "answer: C\nfigure: chart"))).toThrow(/Q26.*figure/);
    expect(() => parseTranscript(BLOCK.replace("answer: C", "answer: C\ncolour: red"))).toThrow(/Q26.*unexpected/);
  });

  it("rejects missing options, an empty stem or solution, and a duplicate number", () => {
    expect(() => parseTranscript(BLOCK.replace("D: 1905\n", ""))).toThrow(/Q26.*options/);
    expect(() => parseTranscript(BLOCK.replace(/stem:\n[\s\S]*?\nA:/, "stem:\nA:"))).toThrow(/Q26.*stem/);
    expect(() => parseTranscript(BLOCK.replace(/solution:[\s\S]*$/, "solution:\n"))).toThrow(/Q26.*solution/);
    expect(() => parseTranscript(BLOCK + BLOCK)).toThrow(/duplicate.*26/);
  });
});

describe("checkShift", () => {
  const CATALOG = {
    Reasoning: [{ chapter: "Series", subtopics: ["Letter Series"] }],
    History: [{ chapter: "Modern India", subtopics: ["Freedom Movement — INC, Gandhi and Independence"] }],
    Polity: [{ chapter: "Indian Constitution", subtopics: ["Citizenship"] }],
  };
  const SECTIONS = { A: ["Reasoning"], B: ["History", "Polity"], C: ["Quantitative Aptitude"], D: ["English"] };
  const series = (n: number, answer = "B") =>
    parseTranscript(`=== ${n}\nchapter: Series\nsubtopic: Letter Series\ndifficulty: EASY\nanswer: ${answer}\nstem:\nNext?\nA: a\nB: b\nC: c\nD: d\nsolution:\nIt is b.\n`)[0];
  const sheet = (n: number, part: "A" | "B", key: "A" | "B" | "C" | "D") => ({ number: n, part, key });

  it("accepts a question filed inside its part's catalog and agreeing with the key", () => {
    const r = checkShift([series(1)], [sheet(1, "A", "B")], CATALOG, SECTIONS);
    expect(r.problems).toEqual([]);
    expect(r.disagreements).toEqual([]);
    expect(r.subjects.get(1)).toBe("Reasoning");
    expect(r.missing).toEqual([]);
  });

  it("needs a General Awareness question to name a subject of that part", () => {
    const ga = parseTranscript(BLOCK)[0]; // Q26 History
    expect(checkShift([ga], [sheet(26, "B", "C")], CATALOG, SECTIONS).problems).toEqual([]);
    const unnamed = { ...ga, subject: undefined };
    expect(checkShift([unnamed], [sheet(26, "B", "C")], CATALOG, SECTIONS).problems.join()).toMatch(/Q26.*subject/);
  });

  it("reports a chapter or subtopic outside the catalog", () => {
    const badChapter = { ...series(1), chapter: "Analogy" };
    expect(checkShift([badChapter], [sheet(1, "A", "B")], CATALOG, SECTIONS).problems.join()).toMatch(/Q1.*chapter "Analogy"/);
    const badSub = { ...series(1), subtopic: "Number Series" };
    expect(checkShift([badSub], [sheet(1, "A", "B")], CATALOG, SECTIONS).problems.join()).toMatch(/Q1.*subtopic "Number Series"/);
  });

  it("lists every disagreement with the key, and refuses one that carries no note", () => {
    const r = checkShift([series(1, "C")], [sheet(1, "A", "B")], CATALOG, SECTIONS);
    expect(r.disagreements).toEqual(["Q1 ours C vs key B"]);
    expect(r.problems.join()).toMatch(/Q1.*no note/);
    const noted = { ...series(1, "C"), note: "the key's option is not in the series" };
    const r2 = checkShift([noted], [sheet(1, "A", "B")], CATALOG, SECTIONS);
    expect(r2.problems).toEqual([]);
    expect(r2.disagreements[0]).toMatch(/Q1 ours C vs key B :: the key's option/);
  });

  it("measures blind accuracy from the blind: answer when the key was adopted after comparison", () => {
    const adopted = parseTranscript(`=== 1
chapter: Series
subtopic: Letter Series
difficulty: EASY
answer: B
blind: C
note: judgement item, SSC's convention
stem:
Next?
A: a
B: b
C: c
D: d
solution:
It is b.
`)[0];
    expect(adopted.blind).toBe("C");
    const r = checkShift([adopted, series(2)], [sheet(1, "A", "B"), sheet(2, "A", "B")], CATALOG, SECTIONS);
    expect(r.problems).toEqual([]);
    expect(r.blindAgreement).toEqual({ agree: 1, of: 2 });
    expect(r.adopted).toEqual(["Q1 blind C, adopted key B :: judgement item, SSC's convention"]);
  });

  it("refuses a blind: answer that equals the final answer, or one with no note", () => {
    const same = parseTranscript(`=== 1
chapter: Series
subtopic: Letter Series
difficulty: EASY
answer: B
blind: B
note: x
stem:
Next?
A: a
B: b
C: c
D: d
solution:
It is b.
`)[0];
    expect(checkShift([same], [sheet(1, "A", "B")], CATALOG, SECTIONS).problems.join()).toMatch(/Q1.*blind.*same/);
    const bare = { ...same, blind: "C" as const, note: undefined };
    expect(checkShift([bare], [sheet(1, "A", "B")], CATALOG, SECTIONS).problems.join()).toMatch(/Q1.*blind.*note/);
  });

  it("in blind mode says nothing about the key, so a drafting agent can check its work without seeing it", () => {
    const wrong = { ...series(1, "C"), blind: "D" as const };
    const r = checkShift([wrong, series(2, "A")], [sheet(1, "A", "B"), sheet(2, "A", "B")], CATALOG, SECTIONS, { compareKey: false });
    expect(r.problems).toEqual([]);
    expect(r.disagreements).toEqual([]);
    expect(r.adopted).toEqual([]);
    expect(r.blindAgreement).toEqual({ agree: 0, of: 0 });
    const bad = { ...series(3), chapter: "Analogy" };
    expect(checkShift([bad], [sheet(3, "A", "B")], CATALOG, SECTIONS, { compareKey: false }).problems.join()).toMatch(/Q3.*chapter/);
  });

  it("reports a transcript number the sheet does not have, and every sheet question not yet transcribed", () => {
    const r = checkShift([series(101)], [sheet(1, "A", "B"), sheet(2, "A", "A")], CATALOG, SECTIONS);
    expect(r.problems.join()).toMatch(/Q101.*not in the paper/);
    expect(r.missing).toEqual([1, 2]);
  });
});
