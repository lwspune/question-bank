import { describe, it, expect } from "vitest";
import {
  remainingSecs,
  paletteState,
  gradeMock,
  type MockGradeQuestion,
} from "@/lib/mocks/attempt";
import type { OptionLabel, SavedResponse } from "@/lib/mocks/answers";

/** An MCQ answer key. */
const key = (label: OptionLabel) => ({ kind: "mcq" as const, label });
/** A JEE Section-B (NAT) answer key. */
const natKey = (value: number) => ({ kind: "numeric" as const, value });
/** A student picking an option. */
const pick = (label: string): SavedResponse => ({
  selectedLabel: label as OptionLabel,
  numericResponse: null,
});
/** A student typing a numeric answer. */
const typed = (numericResponse: number): SavedResponse => ({
  selectedLabel: null,
  numericResponse,
});
/** Visited, nothing entered. */
const blank: SavedResponse = { selectedLabel: null, numericResponse: null };

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
    expect(paletteState({ ...blank, isFlagged: false })).toBe("not_answered");
  });
  it("is answered when a selection exists", () => {
    expect(paletteState({ ...pick("B"), isFlagged: false })).toBe("answered");
  });
  it("flagged overrides answered/not_answered", () => {
    expect(paletteState({ ...pick("C"), isFlagged: true })).toBe("flagged");
    expect(paletteState({ ...blank, isFlagged: true })).toBe("flagged");
  });
});

describe("gradeMock", () => {
  const marking = { correct: 2.5, wrong: -0.83 };
  const questions: MockGradeQuestion[] = [
    { questionId: "q1", sectionKey: "mathematics", marks: 2.5, negMarks: -0.83, answer: key("A") },
    { questionId: "q2", sectionKey: "mathematics", marks: 2.5, negMarks: -0.83, answer: key("B") },
    { questionId: "q3", sectionKey: "mathematics", marks: 2.5, negMarks: -0.83, answer: key("C") },
    { questionId: "q4", sectionKey: "mathematics", marks: 2.5, negMarks: -0.83, answer: key("D") },
  ];

  it("scores correct / wrong / skipped with negative marking", () => {
    const r = gradeMock(questions, {
      q1: pick("A"), // correct
      q2: pick("A"), // wrong
      q3: blank, // skipped
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
    const r = gradeMock(questions, { q1: pick("a"), q2: pick("b"), q3: pick("c"), q4: pick("d") });
    expect(r.correct).toBe(4);
    expect(r.score).toBe(10);
    expect(r.wrong).toBe(0);
    expect(r.skipped).toBe(0);
  });

  it("breaks the score down per section", () => {
    const mixed: MockGradeQuestion[] = [
      { questionId: "e1", sectionKey: "english", marks: 4, negMarks: -1.33, answer: key("A") },
      { questionId: "g1", sectionKey: "gk", marks: 4, negMarks: -1.33, answer: key("B") },
    ];
    const r = gradeMock(mixed, { e1: pick("A"), g1: pick("X") });
    expect(r.sectionScores.english).toMatchObject({ correct: 1, wrong: 0, skipped: 0, score: 4 });
    expect(r.sectionScores.gk).toMatchObject({ correct: 0, wrong: 1, skipped: 0 });
    expect(r.sectionScores.gk.score).toBeCloseTo(-1.33, 2);
  });

  it("a full-blank paper scores zero, not negative", () => {
    const r = gradeMock(questions, {});
    expect(r.score).toBe(0);
    expect(r.skipped).toBe(4);
  });

  // Officially-dropped / bonus questions (NTA awarded full marks to everyone):
  // a grace question always scores full, never penalizes, regardless of answer.
  it("awards a grace question full marks regardless of the answer", () => {
    const grace: MockGradeQuestion[] = [
      { questionId: "g1", sectionKey: "chemistry", marks: 4, negMarks: -1, answer: key("A"), grace: true },
      { questionId: "g2", sectionKey: "botany", marks: 4, negMarks: -1, answer: key("B"), grace: true },
      { questionId: "g3", sectionKey: "physics", marks: 4, negMarks: -1, answer: key("C"), grace: true },
    ];
    // g1 answered "wrong", g2 skipped, g3 answered "right" — all award +4, none penalize.
    const r = gradeMock(grace, { g1: pick("D"), g3: pick("C") });
    expect(r.score).toBe(12);
    expect(r.correct).toBe(3);
    expect(r.wrong).toBe(0);
    expect(r.skipped).toBe(0);
    expect(r.maxScore).toBe(12);
    expect(r.verdicts).toEqual({ g1: 1, g2: 1, g3: 1 });
    expect(r.sectionScores.chemistry).toMatchObject({ correct: 1, wrong: 0, score: 4 });
  });

  /**
   * CDS marks are fractional (100 marks / 120 questions = 0.8333 each). Summing
   * 0.8333 one hundred and twenty times gives 99.99600000000001 in floating
   * point — maxScore must be rounded like `score` already is, or the results
   * page renders "/ 99.996". Applies to the per-section maxScore too.
   */
  it("rounds maxScore so a fractional-marks paper reports its true total", () => {
    const cds: MockGradeQuestion[] = Array.from({ length: 120 }, (_, i) => ({
      questionId: `c${i + 1}`,
      sectionKey: "english",
      marks: 0.8333,
      negMarks: -0.2778,
      answer: key("A"),
    }));
    const r = gradeMock(cds, {});
    expect(r.maxScore).toBe(100);
    expect(r.sectionScores.english.maxScore).toBe(100);
    expect(r.skipped).toBe(120);
    expect(r.score).toBe(0);
  });

  it("mixes grace and normal questions correctly", () => {
    const mixed: MockGradeQuestion[] = [
      { questionId: "n1", sectionKey: "physics", marks: 4, negMarks: -1, answer: key("A") },
      { questionId: "g1", sectionKey: "physics", marks: 4, negMarks: -1, answer: key("B"), grace: true },
    ];
    const r = gradeMock(mixed, { n1: pick("Z"), g1: pick("Z") }); // both wrong picks
    // n1 penalized (-1), g1 graced (+4) → 3
    expect(r.score).toBe(3);
    expect(r.correct).toBe(1); // the grace one
    expect(r.wrong).toBe(1); // the real one
  });

  /**
   * JEE Mains Section B is a NUMERIC-answer (NAT) question — no options, the key
   * a value. These grade through the same +4/-1 as Section A on a 2025+ paper.
   */
  describe("JEE Section-B (numeric) questions", () => {
    const jee: MockGradeQuestion[] = [
      { questionId: "a1", sectionKey: "physics", marks: 4, negMarks: -1, answer: key("C") },
      { questionId: "b1", sectionKey: "physics", marks: 4, negMarks: -1, answer: natKey(17280) },
      { questionId: "b2", sectionKey: "physics", marks: 4, negMarks: -1, answer: natKey(0) },
      { questionId: "b3", sectionKey: "physics", marks: 4, negMarks: -1, answer: natKey(9) },
    ];

    it("grades a mixed MCQ + NAT section", () => {
      const r = gradeMock(jee, {
        a1: pick("C"), // correct
        b1: typed(17280), // correct
        b2: typed(5), // wrong
        // b3 absent → skipped
      });
      expect(r.correct).toBe(2);
      expect(r.wrong).toBe(1);
      expect(r.skipped).toBe(1);
      expect(r.score).toBe(7); // 4 + 4 - 1
      expect(r.maxScore).toBe(16);
      expect(r.verdicts).toEqual({ a1: 1, b1: 1, b2: -1, b3: 0 });
    });

    /** 0 is a real NAT answer and is falsy — a truthiness check would score a
     *  correct 0 as "skipped" and hand the student a mark they did not lose. */
    it("scores a typed ZERO as answered, not skipped", () => {
      const r = gradeMock(jee, { b2: typed(0) });
      expect(r.correct).toBe(1);
      expect(r.skipped).toBe(3);
      expect(r.verdicts.b2).toBe(1);
    });

    /** A letter cannot answer a NAT question and a number cannot answer an MCQ:
     *  a kind mismatch is wrong, never silently right. */
    it("does not credit a response of the wrong kind", () => {
      const r = gradeMock(jee, { a1: typed(3), b3: pick("A") });
      expect(r.correct).toBe(0);
      expect(r.wrong).toBe(2);
    });
  });

  /**
   * The key cannot be missing at grade time — validatePaperRows refuses to build
   * such a paper — but if it ever were, a student must not be PENALISED for our
   * defect. This is deliberately safer than the old `key ?? "A"` fallback, which
   * silently marked every A-picker correct.
   */
  it("never penalises an attempt when the key is missing", () => {
    const orphan: MockGradeQuestion[] = [
      { questionId: "x1", sectionKey: "physics", marks: 4, negMarks: -1, answer: null },
    ];
    const r = gradeMock(orphan, { x1: pick("A") });
    expect(r.wrong).toBe(0);
    expect(r.score).toBe(0);
    expect(r.verdicts.x1).toBe(0);
  });
});
