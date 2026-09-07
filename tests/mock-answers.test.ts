import { describe, expect, it } from "vitest";
import {
  NUMERIC_TOLERANCE,
  isAnswered,
  matchesNumericAnswer,
  responseMatchesKey,
  verdictFor,
  type MockAnswerKey,
  type SavedResponse,
} from "@/lib/mocks/answers";

const mcq = (label: "A" | "B" | "C" | "D"): MockAnswerKey => ({ kind: "mcq", label });
const nat = (value: number): MockAnswerKey => ({ kind: "numeric", value });
const pick = (label: "A" | "B" | "C" | "D"): SavedResponse => ({
  selectedLabel: label,
  numericResponse: null,
});
const typed = (numericResponse: number): SavedResponse => ({
  selectedLabel: null,
  numericResponse,
});
const blank: SavedResponse = { selectedLabel: null, numericResponse: null };

describe("matchesNumericAnswer", () => {
  it("matches an exact value", () => {
    expect(matchesNumericAnswer(17280, 17280)).toBe(true);
    expect(matchesNumericAnswer(0, 0)).toBe(true);
    expect(matchesNumericAnswer(-125, -125)).toBe(true);
  });

  it("rejects a different value", () => {
    expect(matchesNumericAnswer(17280, 17281)).toBe(false);
    expect(matchesNumericAnswer(0, 1)).toBe(false);
    // Sign matters: 2021/2024 carry genuinely negative NAT answers.
    expect(matchesNumericAnswer(125, -125)).toBe(false);
  });

  /**
   * NTA accepts a value that agrees with the key at two decimal places. Every
   * case here is SYNTHETIC: all 546 NAT answers in the shipped 2025+2026 corpus
   * are non-negative integers at scale 0, so this rule cannot be exercised by
   * real data — see the note in answers.ts.
   */
  it("accepts agreement to two decimal places", () => {
    expect(matchesNumericAnswer(4.33, 4.33)).toBe(true);
    expect(matchesNumericAnswer(4.33, 4.334)).toBe(true);
    expect(matchesNumericAnswer(4.334, 4.33)).toBe(true);
    expect(matchesNumericAnswer(4.3, 4.3)).toBe(true);
  });

  it("rejects a value that differs beyond the third decimal place", () => {
    expect(matchesNumericAnswer(4.33, 4.34)).toBe(false);
    expect(matchesNumericAnswer(4.33, 4.4)).toBe(false);
  });

  it("resolves the boundary in the student's favour", () => {
    // Exactly half of the last place. Rounding is ambiguous there (4.005 → 4.00
    // or 4.01 depending on the rule), so the tie is given to the student.
    expect(matchesNumericAnswer(4.335, 4.33)).toBe(true);
    expect(NUMERIC_TOLERANCE).toBe(0.005);
  });

  it("is immune to binary floating-point drift", () => {
    // 0.1 + 0.2 === 0.30000000000000004 — a naive === comparison fails this.
    expect(matchesNumericAnswer(0.1 + 0.2, 0.3)).toBe(true);
    expect(matchesNumericAnswer(1.005 * 100, 100.5)).toBe(true);
  });

  it("rejects a non-finite response rather than treating it as a match", () => {
    expect(matchesNumericAnswer(Number.NaN, 5)).toBe(false);
    expect(matchesNumericAnswer(Number.POSITIVE_INFINITY, 5)).toBe(false);
  });
});

describe("isAnswered", () => {
  it("is false for a missing or blank row", () => {
    expect(isAnswered(undefined)).toBe(false);
    expect(isAnswered(blank)).toBe(false);
  });

  it("is true for a chosen option", () => {
    expect(isAnswered(pick("C"))).toBe(true);
  });

  /** The palette bug this guards: a NAT answer lives in numericResponse, so a
   *  selectedLabel-only check renders every answered NAT as "not answered". */
  it("is true for a typed numeric response", () => {
    expect(isAnswered(typed(17280))).toBe(true);
  });

  it("is true for a numeric response of ZERO", () => {
    // 0 is a legitimate NAT answer and is falsy — a truthiness check drops it.
    expect(isAnswered(typed(0))).toBe(true);
  });
});

describe("responseMatchesKey", () => {
  it("compares option labels case-insensitively", () => {
    expect(responseMatchesKey(mcq("B"), pick("B"))).toBe(true);
    expect(responseMatchesKey(mcq("B"), { selectedLabel: "b" as "B", numericResponse: null })).toBe(true);
    expect(responseMatchesKey(mcq("B"), pick("C"))).toBe(false);
  });

  it("compares numeric responses through the tolerance", () => {
    expect(responseMatchesKey(nat(17280), typed(17280))).toBe(true);
    expect(responseMatchesKey(nat(17280), typed(17279))).toBe(false);
    expect(responseMatchesKey(nat(0), typed(0))).toBe(true);
  });

  it("never matches when the response kind disagrees with the key", () => {
    // A letter cannot answer a NAT question, and a number cannot answer an MCQ.
    expect(responseMatchesKey(nat(4), pick("A"))).toBe(false);
    expect(responseMatchesKey(mcq("A"), typed(4))).toBe(false);
  });

  it("never matches a blank or a missing key", () => {
    expect(responseMatchesKey(mcq("A"), blank)).toBe(false);
    expect(responseMatchesKey(nat(4), blank)).toBe(false);
    expect(responseMatchesKey(null, pick("A"))).toBe(false);
    expect(responseMatchesKey(mcq("A"), undefined)).toBe(false);
  });
});

describe("verdictFor", () => {
  it("awards a grace question to everyone, answered or not", () => {
    expect(verdictFor(mcq("A"), pick("C"), true)).toBe(1);
    expect(verdictFor(mcq("A"), blank, true)).toBe(1);
    expect(verdictFor(null, undefined, true)).toBe(1);
  });

  it("scores a blank as skipped, never wrong", () => {
    expect(verdictFor(mcq("A"), blank, false)).toBe(0);
    expect(verdictFor(nat(4), undefined, false)).toBe(0);
  });

  it("scores a match right and a mismatch wrong", () => {
    expect(verdictFor(mcq("A"), pick("A"), false)).toBe(1);
    expect(verdictFor(mcq("A"), pick("B"), false)).toBe(-1);
    expect(verdictFor(nat(9), typed(9), false)).toBe(1);
    expect(verdictFor(nat(9), typed(8), false)).toBe(-1);
  });

  /**
   * A key that is missing at grade time cannot occur — validatePaperRows refuses
   * to build a paper with one — but if it ever did, the student must not be
   * PENALISED for our defect. This is deliberately safer than the previous
   * `key ?? "A"` fallback, which silently marked every A-picker correct.
   */
  it("never penalises an attempt when the key is missing", () => {
    expect(verdictFor(null, pick("A"), false)).toBe(0);
    expect(verdictFor(null, typed(4), false)).toBe(0);
  });
});
