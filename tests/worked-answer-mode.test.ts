/**
 * How a notes/guide question card reveals its answer (2026-11-23, board notes).
 * Board banks are mostly written-answer rows, so the card must not assume options:
 * an MCQ is answered by a tap on an option, a written question opens its model answer
 * in ONE tap, and a numeric question prints its value, the way the bank card does.
 */
import { describe, expect, it } from "vitest";
import { workedAnswerMode } from "../src/lib/guide/workedAnswer";

const opt = (label: "A" | "B", isCorrect: boolean) => ({ label, text: label, isCorrect, imageUrl: null });

describe("workedAnswerMode", () => {
  it("answers an MCQ by its options", () => {
    expect(workedAnswerMode({ format: "mcq", options: [opt("A", true), opt("B", false)], numericAnswer: null, numericAnswerMax: null })).toEqual({ kind: "options" });
  });

  it("treats a row with no format as an MCQ (rows written before the format column)", () => {
    expect(workedAnswerMode({ format: null, options: [opt("A", true)], numericAnswer: null, numericAnswerMax: null })).toEqual({ kind: "options" });
  });

  it("opens a written question's model answer", () => {
    expect(workedAnswerMode({ format: "subjective", options: [], numericAnswer: null, numericAnswerMax: null })).toEqual({ kind: "model" });
  });

  it("prints a numeric answer as the bank does, range included", () => {
    expect(workedAnswerMode({ format: "numeric", options: [], numericAnswer: 4.5, numericAnswerMax: null })).toEqual({ kind: "numeric", answer: "4.5" });
    expect(workedAnswerMode({ format: "numeric", options: [], numericAnswer: 132.8, numericAnswerMax: 133.1 })).toEqual({ kind: "numeric", answer: "132.8 to 133.1" });
  });

  it("never invents a numeric answer that was not keyed", () => {
    expect(workedAnswerMode({ format: "numeric", options: [], numericAnswer: null, numericAnswerMax: null })).toEqual({ kind: "numeric", answer: null });
  });
});
