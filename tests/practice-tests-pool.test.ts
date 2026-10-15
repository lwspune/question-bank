/**
 * Which bank rows a practice test may use, and the per-chapter summary V
 * shows. The rules are the chapter tests' (scripts/mocks/build-sectional.ts):
 * the grader must be able to mark the question, and it must stand alone.
 */
import { describe, it, expect } from "vitest";
import { buildPool, toCandidate, type PoolRow } from "@/lib/practiceTests/pool";
import { getPracticeExam } from "@/lib/practiceTests/config";

const nda = getPracticeExam("nda")!;
const mhtcet = getPracticeExam("mht-cet")!;
const cbse12 = getPracticeExam("cbse-12")!;

function row(over: Partial<PoolRow> = {}): PoolRow {
  return {
    id: "q1",
    chapterId: "c1",
    kind: "pyq",
    format: "mcq",
    hasNumericAnswer: false,
    difficulty: "EASY",
    setId: null,
    context: null,
    pyqYear: 2024,
    subtopic: "Kinematics",
    optionCount: 4,
    correctCount: 1,
    ...over,
  };
}

describe("toCandidate", () => {
  it("takes a four-option MCQ with one correct option", () => {
    expect(toCandidate(row(), nda)).toEqual({
      id: "q1",
      chapterId: "c1",
      subtopic: "Kinematics",
      difficulty: "EASY",
      format: "mcq",
      kind: "pyq",
    });
  });

  it.each([
    ["two correct options", { correctCount: 2 }],
    ["five options", { optionCount: 5 }],
    ["a written answer", { format: "subjective" }],
    ["a set member", { setId: "s1" }],
    ["a shared passage", { context: "Read the passage below and answer." }],
    ["a numeric question without its answer", { format: "numeric", optionCount: 0, correctCount: 0 }],
  ])("refuses %s", (_label, over) => {
    expect(toCandidate(row(over as Partial<PoolRow>), nda)).toBeNull();
  });

  it("takes a numeric question that carries its answer", () => {
    const c = toCandidate(row({ format: "numeric", optionCount: 0, correctCount: 0, hasNumericAnswer: true }), nda);
    expect(c?.format).toBe("numeric");
  });

  it("counts an unrated question as moderate where the exam's chapter tests do, and drops it on MHT-CET", () => {
    expect(toCandidate(row({ difficulty: null }), nda)?.difficulty).toBe("MODERATE");
    expect(toCandidate(row({ difficulty: null }), mhtcet)).toBeNull();
  });

  it("lets a board question whose context is only an instruction stand alone", () => {
    const r = row({ context: "Choose the correct option." });
    expect(toCandidate(r, cbse12)).not.toBeNull();
    expect(toCandidate(r, nda)).toBeNull();
  });
});

describe("buildPool", () => {
  const chapters = [
    { id: "c1", name: "Kinematics", orderIndex: 2 },
    { id: "c2", name: "Optics", orderIndex: 1 },
    { id: "c3", name: "Empty", orderIndex: 3 },
  ];

  it("lists a board's chapters in textbook order", () => {
    const pool = buildPool(
      chapters,
      [row({ id: "a", chapterId: "c1", pyqYear: 2025 }), row({ id: "b", chapterId: "c2", pyqYear: 2010 })],
      cbse12,
      2026
    );
    expect(pool.chapters.map((c) => c.id)).toEqual(["c2", "c1"]);
  });

  it("lists a competitive exam's chapters most-asked first, then by name", () => {
    const pool = buildPool(
      [...chapters, { id: "c4", name: "Atoms", orderIndex: 4 }],
      [
        row({ id: "a", chapterId: "c2", pyqYear: 2025 }),
        row({ id: "b", chapterId: "c1", pyqYear: 2025 }),
        row({ id: "c", chapterId: "c1", pyqYear: 2024 }),
        row({ id: "d", chapterId: "c4", pyqYear: 2025 }),
      ],
      nda,
      2026
    );
    expect(pool.chapters.map((c) => c.id)).toEqual(["c1", "c4", "c2"]);
  });

  it("summarises each chapter: questions available and recent past-year questions", () => {
    const pool = buildPool(
      chapters,
      [
        row({ id: "a", chapterId: "c1", pyqYear: 2025 }),
        row({ id: "b", chapterId: "c1", pyqYear: 2015 }),
        row({ id: "c", chapterId: "c1", pyqYear: 2024, correctCount: 2 }),
        row({ id: "d", chapterId: "c2", kind: "practice", pyqYear: null }),
      ],
      nda,
      2026
    );
    expect(pool.chapters.map((c) => [c.id, c.available, c.recentPyq])).toEqual([
      ["c1", 2, 2],
      ["c2", 1, 0],
    ]);
  });

  it("counts a past-year question as recent for five years, whether or not it can be used", () => {
    const pool = buildPool(
      chapters,
      [row({ id: "a", pyqYear: 2022 }), row({ id: "b", pyqYear: 2021 }), row({ id: "c", pyqYear: 2026, setId: "s" })],
      nda,
      2026
    );
    expect(pool.chapters[0].recentPyq).toBe(2);
  });

  it("leaves out a chapter with nothing a test can use", () => {
    const pool = buildPool(chapters, [row({ id: "a", chapterId: "c3", setId: "s" })], nda, 2026);
    expect(pool.chapters).toEqual([]);
  });
});
