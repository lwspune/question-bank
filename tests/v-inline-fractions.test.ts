/**
 * V's inline fractions (2026-11-27, the owner's screenshot): V wrote
 * \(f_0 = \dfrac{1}{2\pi\sqrt{LC}}\) inside a sentence. \dfrac forces a
 * full-size fraction, so the line grew tall and broke after "f0 =", leaving the
 * fraction and its full stop on a line of their own. 249 of 1,882 V replies in
 * 30 days used it. In V's narrow bubble an inline fraction is drawn at text
 * size; display maths \[ \] keeps \dfrac. Pure core: src/lib/chat/inlineMath.ts.
 */
import { describe, it, expect } from "vitest";
import { inlineFractions } from "@/lib/chat/inlineMath";

describe("inlineFractions", () => {
  it("draws an inline \\dfrac at text size", () => {
    expect(inlineFractions("so \\(f_0 = \\dfrac{1}{2\\pi\\sqrt{LC}}\\).")).toBe("so \\(f_0 = \\frac{1}{2\\pi\\sqrt{LC}}\\).");
  });

  it("changes every inline \\dfrac, in every inline zone", () => {
    expect(inlineFractions("\\(\\dfrac{a}{b} + \\dfrac{c}{d}\\) and \\(\\dfrac{1}{2}\\)")).toBe("\\(\\frac{a}{b} + \\frac{c}{d}\\) and \\(\\frac{1}{2}\\)");
  });

  it("leaves display maths alone: a fraction on its own line has the room", () => {
    const text = "The frequency is\n\\[f_0 = \\dfrac{1}{2\\pi\\sqrt{LC}}\\]\nand inline \\(\\dfrac{1}{2}\\).";
    expect(inlineFractions(text)).toBe("The frequency is\n\\[f_0 = \\dfrac{1}{2\\pi\\sqrt{LC}}\\]\nand inline \\(\\frac{1}{2}\\).");
  });

  it("leaves prose, \\frac, \\tfrac and longer command names alone", () => {
    expect(inlineFractions("no maths here: dfrac")).toBe("no maths here: dfrac");
    expect(inlineFractions("\\(\\frac{1}{2} + \\tfrac{1}{3}\\)")).toBe("\\(\\frac{1}{2} + \\tfrac{1}{3}\\)");
    expect(inlineFractions("\\(\\dfracx\\)")).toBe("\\(\\dfracx\\)");
  });

  it("an unclosed zone is left as it is", () => {
    expect(inlineFractions("broken \\(\\dfrac{1}{2}")).toBe("broken \\(\\dfrac{1}{2}");
  });
});
