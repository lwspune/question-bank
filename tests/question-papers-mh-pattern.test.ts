import { describe, it, expect } from "vitest";
import { mhManifest, parseRef, printedNumber, type MarksPattern } from "@/lib/questionPapers/mhPattern";
import type { SourceQuestion } from "@/lib/questionPapers/manifest";

const q = (ref: string, extra: Partial<SourceQuestion> = {}): SourceQuestion => ({
  ref,
  questionNumber: ref,
  section: "",
  marks: 0,
  format: "subjective",
  stem: `stem ${ref}`,
  ...extra,
});
const fp = (x: SourceQuestion) => `hash:${x.ref}`;
const META = { slug: "physics-2026-june", groupSlug: "2026-june", title: "Physics June 2026", year: 2026, sitting: "June", paperCode: "J-229" };

describe("parseRef / printedNumber — the board's own question numbers", () => {
  it("reads every numbering style the transcriptions use", () => {
    expect(parseRef("Q. 31(ii)")).toEqual(["31", "ii"]);
    expect(parseRef("Q. 1. (vi)")).toEqual(["1", "vi"]);
    expect(parseRef("Q1(A)(i)")).toEqual(["1", "A", "i"]);
    expect(parseRef("Q4(1)(ii)")).toEqual(["4", "1", "ii"]);
    expect(parseRef("Q. 3")).toEqual(["3"]);
    expect(parseRef("Q6(A)")).toEqual(["6", "A"]);
    expect(parseRef("nonsense")).toBeNull();
    // HSC Chemistry's transcription dots the parts instead of bracketing them.
    expect(parseRef("Q.1.i")).toEqual(["1", "i"]);
    expect(parseRef("Q.2.viii")).toEqual(["2", "viii"]);
  });
  it("prints them as the paper does", () => {
    expect(printedNumber(["31", "ii"])).toBe("31 (ii)");
    expect(printedNumber(["2", "A", "1"])).toBe("2 (A) (1)");
    expect(printedNumber(["3"])).toBe("3");
  });
});

// An HSC-shaped paper: Section A of separate one-markers, a section of
// "attempt any" two-markers, and a long question set in two parts.
const HSC: MarksPattern = {
  maxMarks: 10,
  minutes: 180,
  sections: [
    { key: "A", title: "Section A", from: 1, to: 1 },
    { key: "B", title: "Section B", from: 2, to: 4 },
    { key: "C", title: "Section C", from: 5, to: 5 },
  ],
  blocks: [
    { ref: "Q1", each: 1 },
    { from: 2, to: 4, each: 2, attempt: 2 },
    { from: 5, to: 5, each: 4 },
  ],
};
const HSC_QS = [q("Q. 1(i)"), q("Q. 1(ii)"), q("Q. 2"), q("Q. 3"), q("Q. 4"), q("Q. 5(i)"), q("Q. 5(ii)")];

describe("mhManifest — an HSC paper", () => {
  const r = mhManifest({ ...META, questions: HSC_QS }, HSC, fp);

  it("accepts a paper whose most-a-student-can-score matches the printed maximum", () => {
    if (!r.ok) throw new Error(r.reason);
    expect(r.manifest.totalMarks).toBe(10);
    expect(r.manifest.durationMinutes).toBe(180);
  });

  it("gives each separate question its marks and prints its own number", () => {
    if (!r.ok) throw new Error(r.reason);
    expect(r.manifest.items.map((i) => [i.printedNumber, i.marks])).toEqual([
      ["1 (i)", 1],
      ["1 (ii)", 1],
      ["2", 2],
      ["3", 2],
      ["4", 2],
      ["5 (i)", 4],
      ["5 (ii)", null],
    ]);
  });

  it("makes a question's later parts point at it, carrying no marks", () => {
    if (!r.ok) throw new Error(r.reason);
    const [head, part] = r.manifest.items.slice(5);
    expect(head.partOf).toBeNull();
    expect(part.partOf).toBe(head.position);
  });

  it("sections the paper and says how each is marked", () => {
    if (!r.ok) throw new Error(r.reason);
    expect(r.manifest.sections).toEqual([
      { key: "A", title: "Section A", note: "1 mark each" },
      { key: "B", title: "Section B", note: "2 marks each · attempt any 2" },
      { key: "C", title: "Section C", note: "4 marks" },
    ]);
    expect(r.manifest.items.map((i) => i.section)).toEqual(["A", "A", "B", "B", "B", "C", "C"]);
  });

  it("fingerprints each question with the lane's own helper", () => {
    if (!r.ok) throw new Error(r.reason);
    expect(r.manifest.items[0].contentHash).toBe("hash:Q. 1(i)");
  });
});

// An SSC-shaped paper: lettered groups, printed per-question marks, an OR pair.
const SSC: MarksPattern = {
  // 3 one-markers + printed 1 and 2 + one side of a 4-mark OR.
  maxMarks: 10,
  minutes: 120,
  blocks: [
    { ref: "Q1(A)", each: 1 },
    { ref: "Q2", marks: [1, 2] },
    { ref: "Q3", each: 4, or: true },
  ],
};
const SSC_QS = [
  q("Q1(A)(1)"),
  q("Q1(A)(2)"),
  q("Q1(A)(3)"),
  q("Q2(1)"),
  q("Q2(2)"),
  q("Q3(A)"),
  q("Q3(A)(1)"),
  q("Q3(B)"),
];

describe("mhManifest — an SSC paper", () => {
  const r = mhManifest({ ...META, questions: SSC_QS }, SSC, fp);

  it("uses marks printed per question and links an OR pair", () => {
    if (!r.ok) throw new Error(r.reason);
    expect(r.manifest.items.map((i) => [i.printedNumber, i.marks, i.partOf, i.alternativeTo])).toEqual([
      ["1 (A) (1)", 1, null, null],
      ["1 (A) (2)", 1, null, null],
      ["1 (A) (3)", 1, null, null],
      ["2 (1)", 1, null, null],
      ["2 (2)", 2, null, null],
      ["3 (A)", 4, null, null],
      ["3 (A) (1)", null, 6, null],
      ["3 (B)", 4, null, 6],
    ]);
  });

  it("heads each lettered group by its question and rule", () => {
    if (!r.ok) throw new Error(r.reason);
    expect(r.manifest.sections).toEqual([
      { key: "1 (A)", title: "Q.1 (A)", note: "1 mark each" },
      { key: "2", title: "Q.2", note: "marks as printed" },
      { key: "3", title: "Q.3", note: "4 marks · answer one" },
    ]);
  });
});

describe("mhManifest — refuses a paper rather than guess", () => {
  it("when a question matches no block", () => {
    const bad = mhManifest({ ...META, questions: [...HSC_QS, q("Q. 9")] }, HSC, fp);
    expect(bad.ok).toBe(false);
  });
  it("when the most a student can score is not the printed maximum", () => {
    const bad = mhManifest({ ...META, questions: HSC_QS }, { ...HSC, maxMarks: 12 }, fp);
    expect(bad.ok).toBe(false);
    if (!bad.ok) expect(bad.reason).toMatch(/10.*12/);
  });
  it("when a block asks for more answers than it has questions", () => {
    const bad = mhManifest(
      { ...META, questions: HSC_QS.filter((x) => x.ref !== "Q. 3" && x.ref !== "Q. 4") },
      HSC,
      fp
    );
    expect(bad.ok).toBe(false);
  });
  it("when a printed-marks list does not match its questions", () => {
    const bad = mhManifest({ ...META, questions: SSC_QS.filter((x) => x.ref !== "Q2(2)") }, SSC, fp);
    expect(bad.ok).toBe(false);
  });
  it("when a reference cannot be read", () => {
    const bad = mhManifest({ ...META, questions: [...SSC_QS, q("Question 4")] }, SSC, fp);
    expect(bad.ok).toBe(false);
  });
});

describe("mhManifest — a block whose every item is its own question", () => {
  // Older SSC Science: Q.1 (A) holds sub-groups, (1) fill in, (2) true/false,
  // each item worth one mark, not parts of one question.
  const pattern: MarksPattern = { maxMarks: 3, minutes: 120, blocks: [{ ref: "Q1(A)", each: 1, leaf: true }] };
  const r = mhManifest({ ...META, questions: [q("Q1(A)(1)(i)"), q("Q1(A)(1)(ii)"), q("Q1(A)(2)")] }, pattern, fp);

  it("gives every item its marks", () => {
    if (!r.ok) throw new Error(r.reason);
    expect(r.manifest.items.map((i) => [i.printedNumber, i.marks, i.partOf])).toEqual([
      ["1 (A) (1) (i)", 1, null],
      ["1 (A) (1) (ii)", 1, null],
      ["1 (A) (2)", 1, null],
    ]);
  });
});
