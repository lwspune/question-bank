import { describe, it, expect } from "vitest";
import { numberMultiset, reusesPyqNumbers } from "@/lib/notes/pyqDuplication";

// Pure helpers behind notes-lint check #5 (worked-example == featured-PYQ
// duplication WARN). Locks the two behaviours that took a session to tune:
// (a) subscripts are indices, not magnitudes, so they're stripped; superscript
// powers are real data, so they're kept; (b) the overlap thresholds separate a
// genuine "same problem" from two unrelated problems that merely share small
// structural integers (1,2,3,4 exponents/coefficients).

describe("numberMultiset", () => {
  it("strips subscripts (indices) but keeps superscripts (powers)", () => {
    // I_2 subscript dropped; A^2 superscript kept.
    expect(numberMultiset("I_2 + A^2")).toEqual(["2"]);
    // braced subscripts (C_{11}, a_{ij}) fully dropped.
    expect(numberMultiset("C_{11} a_{23} M_{100}")).toEqual([]);
    // a power is often the distinguishing datum — keep it.
    expect(numberMultiset("A^4 = I")).toEqual(["4"]);
  });

  it("captures negatives and decimals", () => {
    expect(numberMultiset("the point (-1, 3, 4)")).toEqual(["-1", "3", "4"]);
    expect(numberMultiset("probabilities 0.5 and 2.25")).toEqual(["0.5", "2.25"]);
  });
});

describe("reusesPyqNumbers", () => {
  it("returns false when the PYQ has fewer than 3 numbers (not distinctive)", () => {
    expect(reusesPyqNumbers("answer is x + 5", "what is y when y = 7?")).toBe(false);
  });

  it("flags a verbatim coordinate-geometry duplicate (≥5 shared numbers)", () => {
    const pyq = "The xy-plane divides the segment joining (-1, 3, 4) and (2, -5, 6)";
    const example = "In what ratio does the XY-plane divide (-1, 3, 4) and (2, -5, 6)?";
    expect(reusesPyqNumbers(example, pyq)).toBe(true);
  });

  it("flags a duplicate sharing distinctive (large/multi-digit) numbers", () => {
    const pyq = "Find the radius of x^2 + y^2 + z^2 - 6x + 8y - 10z + 1 = 0";
    const example = "Radius of the sphere x^2 + y^2 + z^2 - 6x + 8y - 10z + 1 = 0?";
    expect(reusesPyqNumbers(example, pyq)).toBe(true);
  });

  it("does NOT flag two unrelated polynomial integrals sharing only small integers", () => {
    const pyq = "Evaluate the integral of (x^4 + x^2 + 1)/(x^2 - x + 1)";
    const example = "Evaluate the integral of (x^4 - 1)/(x^2 + 1)";
    expect(reusesPyqNumbers(example, pyq)).toBe(false);
  });

  it("does NOT flag matrix problems that overlap only via subscript notation", () => {
    // Different matrices/constants; the shared 2s are I_2 / A^2 notation.
    const pyq = "If A = [[1,2],[2,3]] and A^2 - kA - I_2 = O, find k";
    const example = "If A = [[3,1],[2,4]] and A^2 - kA + 10 I_2 = O, find k";
    expect(reusesPyqNumbers(example, pyq)).toBe(false);
  });

  it("does not flag a genuinely different worked example", () => {
    const pyq = "Find the centroid of A(2,-3,3), B(5,-3,-4), C(2,-3,-2)";
    const example = "Find the centroid of A(1,2,3), B(4,-1,0), C(7,2,3)";
    expect(reusesPyqNumbers(example, pyq)).toBe(false);
  });
});
