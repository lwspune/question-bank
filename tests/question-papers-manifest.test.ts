import { describe, it, expect } from "vitest";
import { cbseManifest, marksTotal, type SourceQuestion } from "@/lib/questionPapers/manifest";
import { contentHash, subjectiveContentHash } from "@/lib/upload/hash";

const opts = [
  { label: "A", text: "1" },
  { label: "B", text: "2" },
  { label: "C", text: "3" },
  { label: "D", text: "4" },
];

function mcq(ref: string, num: string, section: string, marks: number, extra: Partial<SourceQuestion> = {}): SourceQuestion {
  return { ref, questionNumber: num, section, marks, format: "mcq", stem: `stem ${ref}`, options: opts, answer: "B", ...extra };
}
function written(ref: string, num: string, section: string, marks: number, extra: Partial<SourceQuestion> = {}): SourceQuestion {
  return { ref, questionNumber: num, section, marks, format: "subjective", stem: `stem ${ref}`, ...extra };
}

/** A 10-mark paper shaped like CBSE's: an OR pair, a case study with an OR part. */
const PAPER = {
  paper: "55/1/2",
  year: 2025,
  pattern: "test10",
  questions: [
    mcq("Q1", "1", "A", 1),
    mcq("Q2", "2", "A", 1),
    written("Q3a", "3 (a)", "B", 2),
    written("Q3b", "3 (b)", "B", 2, { _alternativeTo: "Q3a" }),
    mcq("Q4i", "4 (i)", "C", 1, { setId: "CS1", context: "case text" }),
    mcq("Q4iia", "4 (ii) (a)", "C", 1, { setId: "CS1", context: "case text" }),
    mcq("Q4iib", "4 (ii) (b)", "C", 1, { setId: "CS1", context: "case text", _alternativeTo: "Q4iia" }),
    written("Q5", "5", "D", 4),
  ],
};
const TOTALS = { test10: { marks: 10, minutes: 60 } };

describe("cbseManifest — one transcribed CBSE paper as a printable paper", () => {
  const r = cbseManifest(PAPER, { subjectName: "Physics", totals: TOTALS });

  it("accepts a paper whose marks add up to its printed total", () => {
    expect(r.ok).toBe(true);
  });

  it("names the paper, its set group and its slug from the paper code", () => {
    if (!r.ok) throw new Error(r.reason);
    expect(r.manifest.slug).toBe("2025-55-1-2");
    expect(r.manifest.groupSlug).toBe("2025-55-1");
    expect(r.manifest.setNumber).toBe(2);
    expect(r.manifest.paperCode).toBe("55/1/2");
    expect(r.manifest.title).toBe("CBSE Class 12 Physics 2025 (55/1/2)");
    expect(r.manifest.totalMarks).toBe(10);
    expect(r.manifest.durationMinutes).toBe(60);
  });

  it("keeps every question in printed order with its printed number and marks", () => {
    if (!r.ok) throw new Error(r.reason);
    expect(r.manifest.items.map((i) => i.printedNumber)).toEqual([
      "1", "2", "3 (a)", "3 (b)", "4 (i)", "4 (ii) (a)", "4 (ii) (b)", "5",
    ]);
    expect(r.manifest.items.map((i) => i.position)).toEqual([1, 2, 3, 4, 5, 6, 7, 8]);
    expect(r.manifest.items.map((i) => i.marks)).toEqual([1, 1, 2, 2, 1, 1, 1, 4]);
  });

  it("links an OR alternative to the position it replaces", () => {
    if (!r.ok) throw new Error(r.reason);
    const byNum = new Map(r.manifest.items.map((i) => [i.printedNumber, i]));
    expect(byNum.get("3 (b)")!.alternativeTo).toBe(3);
    expect(byNum.get("4 (ii) (b)")!.alternativeTo).toBe(6);
    expect(byNum.get("3 (a)")!.alternativeTo).toBeNull();
  });

  it("groups a case study's parts under one key", () => {
    if (!r.ok) throw new Error(r.reason);
    const keys = r.manifest.items.map((i) => i.caseKey);
    expect(keys).toEqual([null, null, null, null, "CS1", "CS1", "CS1", null]);
  });

  it("fingerprints each question exactly as the CBSE commit did", () => {
    if (!r.ok) throw new Error(r.reason);
    expect(r.manifest.items[0].contentHash).toBe(contentHash("stem Q1", ["1", "2", "3", "4"], "B"));
    expect(r.manifest.items[2].contentHash).toBe(subjectiveContentHash("stem Q3a", null));
    // A case-study part that is an MCQ is fingerprinted like any MCQ: the
    // commit's MCQ hash leaves the context out.
    expect(r.manifest.items[4].contentHash).toBe(contentHash("stem Q4i", ["1", "2", "3", "4"], "B"));
    // A written case-study part keeps its context in the fingerprint.
    const cs = cbseManifest(
      { ...PAPER, questions: PAPER.questions.map((q) => (q.ref === "Q5" ? { ...q, setId: "CS2", context: "ctx" } : q)) },
      { subjectName: "Physics", totals: TOTALS }
    );
    if (!cs.ok) throw new Error(cs.reason);
    expect(cs.manifest.items[7].contentHash).toBe(subjectiveContentHash("stem Q5", "ctx"));
  });

  it("describes each section by its marks", () => {
    if (!r.ok) throw new Error(r.reason);
    expect(r.manifest.sections).toEqual([
      { key: "A", title: "Section A", note: "1 mark each" },
      { key: "B", title: "Section B", note: "2 marks each" },
      { key: "C", title: "Section C", note: "1 mark each" },
      { key: "D", title: "Section D", note: "4 marks each" },
    ]);
  });

  it("refuses a paper whose marks do not add up to its printed total", () => {
    const short = { ...PAPER, questions: PAPER.questions.filter((q) => q.ref !== "Q5") };
    const bad = cbseManifest(short, { subjectName: "Physics", totals: TOTALS });
    expect(bad.ok).toBe(false);
    if (!bad.ok) expect(bad.reason).toMatch(/6.*10/);
  });

  it("refuses an unknown paper pattern rather than guessing its total", () => {
    const bad = cbseManifest({ ...PAPER, pattern: "nope" }, { subjectName: "Physics", totals: TOTALS });
    expect(bad.ok).toBe(false);
  });

  it("refuses an OR that points at a question that is not before it", () => {
    const broken = {
      ...PAPER,
      questions: PAPER.questions.map((q) => (q.ref === "Q3b" ? { ...q, _alternativeTo: "Q9" } : q)),
    };
    expect(cbseManifest(broken, { subjectName: "Physics", totals: TOTALS }).ok).toBe(false);
  });
});

describe("marksTotal — what a student can score", () => {
  it("counts an OR pair once and every case-study part", () => {
    const r = cbseManifest(PAPER, { subjectName: "Physics", totals: TOTALS });
    if (!r.ok) throw new Error(r.reason);
    expect(marksTotal(r.manifest.items)).toBe(10);
  });
});
