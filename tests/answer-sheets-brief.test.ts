/**
 * What the grading session reads (answer-sheet grading): the brief for one
 * submission and the grade file it fills in. The template must never pass the
 * checker as it stands, so an unfilled question cannot slip through as
 * "not attempted".
 */
import { describe, it, expect } from "vitest";
import { buildBrief, gradeTemplate } from "@/lib/answerSheets/brief";
import { validateGrade } from "@/lib/answerSheets/grade";
import type { PaperItemRow } from "@/lib/questionPapers/listing";
import type { BoardQuestion } from "@/lib/board/query";

const item = (position: number, marks: number | null, over: Partial<PaperItemRow> = {}): PaperItemRow => ({
  position,
  printedNumber: String(position),
  section: "A",
  marks,
  alternativeTo: null,
  partOf: null,
  caseKey: null,
  questionId: `q-${position}`,
  ...over,
});

const ITEMS: PaperItemRow[] = [
  item(1, 2),
  item(2, 2, { alternativeTo: 1, printedNumber: "1 OR" }),
  item(3, 4, { section: "B", printedNumber: "3" }),
  item(4, null, { section: "B", partOf: 3, printedNumber: "3 (ii)" }),
];

const q = (id: string, text: string, solution: string | null): BoardQuestion => ({
  id,
  questionNumber: null,
  text,
  context: null,
  solution,
  imageUrl: null,
  solutionImageUrl: null,
  format: "subjective",
  setId: null,
  options: [],
});

const QUESTIONS = [
  q("q-1", "Define current.", "Rate of flow of charge."),
  q("q-2", "State Ohm's law.", "V = IR at constant temperature."),
  q("q-3", "Derive the lens formula.", "Using similar triangles..."),
  q("q-4", "Find f for u = -20 cm, v = 30 cm.", "f = 12 cm"),
];

const PAPER = {
  title: "CBSE Class 12 Physics 2025 (55/1/1)",
  totalMarks: 70,
  durationMinutes: 180,
  sections: [
    { key: "A", title: "Section A", note: "2 marks each" },
    { key: "B", title: "Section B", note: "4 marks each" },
  ],
};

describe("gradeTemplate", () => {
  it("has one row per question that carries marks, none for parts", () => {
    const t = gradeTemplate("s-1", ITEMS);
    expect(t.grades.map((g) => g.position)).toEqual([1, 2, 3]);
    expect(t.grades.map((g) => g.max)).toEqual([2, 2, 4]);
    expect(t.submissionId).toBe("s-1");
  });

  it("starts every row with an empty cause and topic, and an empty marks list", () => {
    const t = gradeTemplate("s-1", ITEMS);
    expect(t.grades.every((g) => g.cause === "" && g.topic === "")).toBe(true);
    expect(t.marks).toEqual([]);
  });

  it("does not pass the checker until it is filled in", () => {
    const r = validateGrade({ items: ITEMS, totalMarks: 70, file: gradeTemplate("s-1", ITEMS) });
    expect(r.ok).toBe(false);
  });
});

describe("buildBrief", () => {
  const brief = buildBrief({ submissionId: "s-1", paper: PAPER, items: ITEMS, questions: QUESTIONS, fileCount: 12, pageCount: 14 });

  it("heads with the paper, its maximum and how many pages to read", () => {
    expect(brief).toContain("CBSE Class 12 Physics 2025 (55/1/1)");
    expect(brief).toMatch(/Maximum marks: 70/);
    expect(brief).toMatch(/12 files/);
    expect(brief).toMatch(/14 pages in pages\//);
    expect(brief).toMatch(/grid\//);
  });

  it("prints every question with its marks, its model answer, and its section note", () => {
    expect(brief).toMatch(/Q\.1 \[2 marks\]/);
    expect(brief).toContain("Rate of flow of charge.");
    expect(brief).toContain("2 marks each");
    expect(brief).toMatch(/Q\.3 \[4 marks\]/);
  });

  it("marks an OR alternative and a part so they are graded the paper's way", () => {
    expect(brief).toMatch(/OR \(alternative to Q\.1\)/);
    expect(brief).toMatch(/Q\.3 \(ii\).*part of Q\.3/);
  });

  it("says when a model answer is missing rather than printing nothing", () => {
    const b = buildBrief({
      submissionId: "s-1",
      paper: PAPER,
      items: [item(1, 2)],
      questions: [q("q-1", "Define current.", null)],
      fileCount: 1,
      pageCount: 1,
    });
    expect(b).toMatch(/no model answer/i);
  });
});
