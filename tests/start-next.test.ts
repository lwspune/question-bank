/**
 * "Start next" on Home (2026-11-09, step 4): the highest-value chapters of the
 * student's exam they have not answered a single question in, with what each
 * is worth in a real paper ("about 10 questions a paper · 24 of 300 marks
 * (8%)", the owner's format). Pure core src/lib/me/startNext.ts.
 *
 * The weights come from the published past papers (get_chapter_paper_weights,
 * migration 0242): a chapter's questions and their own marks, averaged over the
 * papers, out of the paper's total. Measured, never estimated.
 */
import { describe, it, expect } from "vitest";
import { marksLine, pickStartNext, questionsLine, startNextExam, weightLine, type ChapterWeight } from "@/lib/me/startNext";

const w = (over: Partial<ChapterWeight>): ChapterWeight => ({
  chapterId: "c1",
  chapter: "Matrices & Determinants",
  subject: "Mathematics",
  exam: "NDA",
  paperCode: "maths",
  papers: 19,
  qPerPaper: 9.5,
  marksPerPaper: 23.8,
  paperMarks: 300,
  ...over,
});

describe("weightLine: what a chapter is worth in a paper", () => {
  it("reads in whole questions and marks, with the share of the paper", () => {
    expect(weightLine(w({}))).toBe("about 10 questions a paper · 24 of 300 marks (8%)");
  });

  it("says one question in the singular", () => {
    expect(weightLine(w({ qPerPaper: 1.2, marksPerPaper: 4 }))).toBe("about 1 question a paper · 4 of 300 marks (1%)");
  });

  it("never prints 0%: a small share says under 1%", () => {
    expect(weightLine(w({ qPerPaper: 1, marksPerPaper: 1, paperMarks: 600 }))).toBe("about 1 question a paper · 1 of 600 marks (under 1%)");
  });
});

describe("the card's two lines: marks first, in bold, then the questions", () => {
  it("marks a paper with the share", () => {
    expect(marksLine(w({}))).toBe("24 of 300 marks a paper (8%)");
    expect(marksLine(w({ marksPerPaper: 1, paperMarks: 600 }))).toBe("1 of 600 marks a paper (under 1%)");
  });
  it("questions a paper", () => {
    expect(questionsLine(w({}))).toBe("about 10 questions");
    expect(questionsLine(w({ qPerPaper: 1.2 }))).toBe("about 1 question");
  });
});

describe("pickStartNext: the chapters to start", () => {
  const weights = [
    w({ chapterId: "a", chapter: "Probability", marksPerPaper: 23.2, qPerPaper: 9.3 }),
    w({ chapterId: "b", chapter: "Matrices & Determinants", marksPerPaper: 23.8 }),
    w({ chapterId: "c", chapter: "Statistics", marksPerPaper: 21.7, qPerPaper: 8.7 }),
    w({ chapterId: "d", chapter: "Rare", marksPerPaper: 1.5, qPerPaper: 0.6 }),
  ];

  it("ranks by marks a paper and leaves out chapters already started", () => {
    expect(pickStartNext(weights, new Set(["b"])).map((c) => c.chapter)).toEqual(["Probability", "Statistics"]);
  });

  it("shows at most two", () => {
    expect(pickStartNext(weights, new Set())).toHaveLength(2);
  });

  it("leaves out a chapter a paper asks less than once on average: it is not high value", () => {
    expect(pickStartNext(weights, new Set(["a", "b", "c"]))).toEqual([]);
  });
});

describe("startNextExam: whose papers to rank", () => {
  it("the exam in focus", () => {
    expect(startNextExam({ focusSlug: "cds", targets: ["nda", "cds"] })).toBe("cds");
  });
  it("else the student's first exam", () => {
    expect(startNextExam({ focusSlug: null, targets: ["nda", "cds"] })).toBe("nda");
  });
  it("none without an exam", () => {
    expect(startNextExam({ focusSlug: null, targets: [] })).toBeNull();
  });
});
