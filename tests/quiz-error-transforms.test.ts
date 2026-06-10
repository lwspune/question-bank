import { describe, it, expect } from "vitest";
import { errorTransforms } from "@/lib/quiz/atoms";

describe("errorTransforms", () => {
  it("transforms a wrapped LaTeX fraction (swap, sign, off-by-one)", () => {
    expect(errorTransforms("\\(\\dfrac{3}{5}\\)")).toEqual([
      "\\(\\dfrac{5}{3}\\)",
      "\\(\\dfrac{-3}{5}\\)",
      "\\(\\dfrac{4}{5}\\)",
    ]);
  });

  it("preserves the fraction command (\\tfrac stays \\tfrac)", () => {
    expect(errorTransforms("\\(\\tfrac{1}{2}\\)")).toEqual([
      "\\(\\tfrac{2}{1}\\)",
      "\\(\\tfrac{-1}{2}\\)",
      "\\(\\tfrac{2}{2}\\)",
    ]);
  });

  it("transforms a wrapped integer (sign flip, double, off-by-one)", () => {
    expect(errorTransforms("\\(12\\)")).toEqual(["\\(-12\\)", "\\(24\\)", "\\(13\\)"]);
  });

  it("transforms a bare integer (unwrapped stays unwrapped)", () => {
    expect(errorTransforms("5")).toEqual(["-5", "10", "6"]);
  });

  it("transforms a plain a/b fraction", () => {
    expect(errorTransforms("3/4")).toEqual(["4/3", "-3/4", "4/4"]);
  });

  it("returns [] for non-numeric answers (expressions, vectors, words)", () => {
    expect(errorTransforms("\\(\\vec{a}\\times\\vec{b}\\)")).toEqual([]);
    expect(errorTransforms("\\(x^2 + 1\\)")).toEqual([]);
    expect(errorTransforms("Yes")).toEqual([]);
    expect(errorTransforms("\\(\\sin(A+B)\\)")).toEqual([]);
  });

  it("drops variants equal to the correct answer (e.g. 0 → no -0/2·0 dups)", () => {
    // -0 === 0 (correct) and 2·0 === 0 → both dropped; only 0+1=1 survives
    expect(errorTransforms("0")).toEqual(["1"]);
  });

  it("guards against a zero denominator", () => {
    expect(errorTransforms("\\(\\dfrac{3}{0}\\)")).toEqual([]);
  });
});
