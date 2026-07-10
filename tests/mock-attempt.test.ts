import { describe, it, expect } from "vitest";
import {
  remainingSecs,
  paletteState,
  gradeMock,
  type MockGradeQuestion,
} from "@/lib/mocks/attempt";

describe("remainingSecs", () => {
  const expires = "2026-01-01T10:00:00.000Z";
  it("returns whole seconds left until expiry", () => {
    expect(remainingSecs(expires, Date.parse("2026-01-01T09:30:00.000Z"))).toBe(1800);
  });
  it("floors partial seconds", () => {
    expect(remainingSecs(expires, Date.parse("2026-01-01T09:59:59.500Z"))).toBe(0);
  });
  it("never goes negative once expired", () => {
    expect(remainingSecs(expires, Date.parse("2026-01-01T10:05:00.000Z"))).toBe(0);
  });
});

describe("paletteState", () => {
  it("is not_visited when there is no answer row", () => {
    expect(paletteState(undefined)).toBe("not_visited");
  });
  it("is not_answered when visited with no selection", () => {
    expect(paletteState({ selectedLabel: null, isFlagged: false })).toBe("not_answered");
  });
  it("is answered when a selection exists", () => {
    expect(paletteState({ selectedLabel: "B", isFlagged: false })).toBe("answered");
  });
  it("flagged overrides answered/not_answered", () => {
    expect(paletteState({ selectedLabel: "C", isFlagged: true })).toBe("flagged");
    expect(paletteState({ selectedLabel: null, isFlagged: true })).toBe("flagged");
  });
});

describe("gradeMock", () => {
  const marking = { correct: 2.5, wrong: -0.83 };
  const questions: MockGradeQuestion[] = [
    { questionId: "q1", sectionKey: "mathematics", marks: 2.5, negMarks: -0.83, answer: "A" },
    { questionId: "q2", sectionKey: "mathematics", marks: 2.5, negMarks: -0.83, answer: "B" },
    { questionId: "q3", sectionKey: "mathematics", marks: 2.5, negMarks: -0.83, answer: "C" },
    { questionId: "q4", sectionKey: "mathematics", marks: 2.5, negMarks: -0.83, answer: "D" },
  ];

  it("scores correct / wrong / skipped with negative marking", () => {
    const r = gradeMock(questions, {
      q1: "A", // correct
      q2: "A", // wrong
      q3: null, // skipped
      // q4 absent → skipped
    });
    expect(r.correct).toBe(1);
    expect(r.wrong).toBe(1);
    expect(r.skipped).toBe(2);
    // 2.5 - 0.83 = 1.67
    expect(r.score).toBeCloseTo(1.67, 2);
    expect(r.maxScore).toBe(10);
  });

  it("is case-insensitive on the chosen letter", () => {
    const r = gradeMock(questions, { q1: "a", q2: "b", q3: "c", q4: "d" });
    expect(r.correct).toBe(4);
    expect(r.score).toBe(10);
    expect(r.wrong).toBe(0);
    expect(r.skipped).toBe(0);
  });

  it("breaks the score down per section", () => {
    const mixed: MockGradeQuestion[] = [
      { questionId: "e1", sectionKey: "english", marks: 4, negMarks: -1.33, answer: "A" },
      { questionId: "g1", sectionKey: "gk", marks: 4, negMarks: -1.33, answer: "B" },
    ];
    const r = gradeMock(mixed, { e1: "A", g1: "X" });
    expect(r.sectionScores.english).toMatchObject({ correct: 1, wrong: 0, skipped: 0, score: 4 });
    expect(r.sectionScores.gk).toMatchObject({ correct: 0, wrong: 1, skipped: 0 });
    expect(r.sectionScores.gk.score).toBeCloseTo(-1.33, 2);
  });

  it("a full-blank paper scores zero, not negative", () => {
    const r = gradeMock(questions, {});
    expect(r.score).toBe(0);
    expect(r.skipped).toBe(4);
  });
});
