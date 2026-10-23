import { describe, expect, it } from "vitest";
import { IMAT_PAPER, getBlueprint, totalMarks, totalQuestions } from "../src/lib/mocks/blueprints";
import { buildMockPaper, type PaperQuestionRow } from "../src/lib/mocks/reconstruct";
import { gradeMock } from "../src/lib/mocks/attempt";
import type { OptionLabel, SavedResponse } from "../src/lib/mocks/answers";
import { deriveImatSittings } from "../scripts/mocks/imatSittings";
import { PAPER_SHAPES, SUBJECTS } from "../scripts/imat/lib";

describe("IMAT_PAPER", () => {
  it("is the ministry's paper: 60 questions, 100 minutes, +1.5 / -0.4, 90 marks", () => {
    expect(totalQuestions(IMAT_PAPER)).toBe(60);
    expect(IMAT_PAPER.durationSecs).toBe(100 * 60);
    expect(IMAT_PAPER.marking).toEqual({ correct: 1.5, wrong: -0.4 });
    expect(totalMarks(IMAT_PAPER)).toBe(90);
  });

  it("keeps the printed section order and counts: 4 · 5 · 23 · 15 · 13", () => {
    expect(IMAT_PAPER.sections.map((s) => s.count)).toEqual([4, 5, 23, 15, 13]);
    expect(IMAT_PAPER.sections.at(-1)?.subjects).toEqual(["Physics", "Mathematics"]);
  });

  it("files every IMAT bank subject under exactly one section", () => {
    const all = IMAT_PAPER.sections.flatMap((s) => s.subjects);
    expect(new Set(all).size).toBe(all.length);
    expect([...all].sort()).toEqual([...SUBJECTS].sort());
  });

  it("is registered", () => {
    expect(getBlueprint("imat", "paper")).toBe(IMAT_PAPER);
  });
});

describe("deriveImatSittings", () => {
  it("makes one sitting per ministry paper (2023 on), never a Cambridge year", () => {
    const sittings = deriveImatSittings(Object.keys(PAPER_SHAPES).map(Number));
    expect(sittings.map((s) => s.year)).toEqual([2023, 2024, 2025, 2026]);
    expect(sittings[0]).toEqual({
      key: "2023",
      sourceFile: "CompitoInglese2023.pdf",
      year: 2023,
      slug: "imat-2023",
      title: "IMAT 2023",
    });
  });
});

describe("an IMAT mock, built and graded", () => {
  // One row per printed question, in the ministry's order, keys spread over A-E.
  const SUBJECT_AT = (n: number): string =>
    n <= 4
      ? "Reading Skills and General Knowledge"
      : n <= 9
        ? "Logical Reasoning and Problem Solving"
        : n <= 32
          ? "Biology"
          : n <= 47
            ? "Chemistry"
            : n % 2 === 0
              ? "Physics"
              : "Mathematics";
  const LETTERS: OptionLabel[] = ["A", "B", "C", "D", "E"];
  const rows: PaperQuestionRow[] = Array.from({ length: 60 }, (_, i) => ({
    id: `q${i + 1}`,
    sourceRow: i + 1,
    questionNumber: String(i + 1),
    subjectName: SUBJECT_AT(i + 1),
    answer: { kind: "mcq", label: LETTERS[i % 5] },
  }));
  const paper = buildMockPaper(IMAT_PAPER, rows, { year: 2025, month: null, slug: "imat-2025", title: "IMAT 2025" });

  it("places all 60 questions in printed order", () => {
    expect(paper.questions.map((q) => q.questionId)).toEqual(rows.map((r) => r.id));
  });

  it("gives the official score: 40 right, 10 wrong, 10 blank = 56 of 90", () => {
    const keyOf = new Map(rows.map((r) => [r.id, r.answer!]));
    const responses: Record<string, SavedResponse> = {};
    rows.forEach((r, i) => {
      const key = (r.answer as { label: OptionLabel }).label;
      if (i < 40) responses[r.id] = { selectedLabel: key, numericResponse: null };
      else if (i < 50) responses[r.id] = { selectedLabel: key === "E" ? "A" : "E", numericResponse: null };
    });
    const result = gradeMock(
      paper.questions.map((q) => ({ ...q, answer: keyOf.get(q.questionId)! })),
      responses
    );
    expect(result.correct).toBe(40);
    expect(result.wrong).toBe(10);
    expect(result.skipped).toBe(10);
    expect(result.score).toBe(56); // 40 x 1.5 - 10 x 0.4
    expect(result.maxScore).toBe(90);
  });
});
