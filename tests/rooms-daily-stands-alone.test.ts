/**
 * A circle's daily question is read on its own, not inside its paper, so the
 * picker skips two kinds (owner, 2026-11-28, after "Functional region –" and
 * an Assertion-Reason pin whose instruction said "For Questions number 13 to 16"):
 * - an instruction that names the paper's question numbers;
 * - a stem with under 25 characters of words once maths is taken out
 *   ("Insulin:", "Functional region –"), which leans on its instruction.
 * Pure: lib/rooms/daily standsAlone.
 */
import { describe, it, expect } from "vitest";
import { standsAlone } from "@/lib/rooms/daily";

const LONG = "Which of the following organelles have their own DNA and ribosomes?";

describe("standsAlone", () => {
  it("keeps an ordinary question, with or without an instruction", () => {
    expect(standsAlone({ text: LONG, context: null })).toBe(true);
    expect(standsAlone({ text: LONG, context: "Choose the correct option." })).toBe(true);
  });

  it("skips an instruction naming the paper's question numbers", () => {
    for (const context of [
      "For Questions number 13 to 16, two statements are given",
      "For questions number 13 to 16, two statements are given",
      "In the question number 19 and 20, a statement of Assertion (A) is followed",
      "Read the passage given below carefully and answer the questions no. 96 to 100.",
      "Q. Nos. 41 to 45 are based on the passage below.",
    ]) {
      expect(standsAlone({ text: LONG, context })).toBe(false);
    }
  });

  it("skips a stem with under 25 characters of words, maths not counted", () => {
    expect(standsAlone({ text: "Functional region –", context: "Choose the correct option and complete the sentences :" })).toBe(false);
    expect(standsAlone({ text: "Insulin:", context: null })).toBe(false);
    expect(standsAlone({ text: "Evaluate \\(\\int_0^1 x^2\\,dx\\) here", context: null })).toBe(false);
    expect(standsAlone({ text: "Aspirin is obtained by acetylation of", context: null })).toBe(true);
  });
});
