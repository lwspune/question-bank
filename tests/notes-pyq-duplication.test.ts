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

  // Enumeration labels are indices, exactly like subscripts: a statement-list
  // question ("1. ... 2. ... 3. ...") and a note that discusses "(1), (2), (3)"
  // have NO numbers in common as problems, only as list markers. Leaving them
  // in made every statement-evaluation concept in NDA Geography look like a
  // verbatim duplicate of its own PYQ.
  it("strips enumeration labels at line start and in parentheses", () => {
    expect(numberMultiset("correct?\n1. north\n2. south\n3. east")).toEqual([]);
    expect(numberMultiset("Three claims: (1) north; (2) south; (3) east")).toEqual([]);
    expect(numberMultiset("options\n1) alpha\n2) beta")).toEqual([]);
  });

  it("does NOT mistake a decimal or a coordinate for a label", () => {
    // "0.5" has no whitespace after the dot, so it is not a "1. " marker.
    expect(numberMultiset("0.5 of the class")).toEqual(["0.5"]);
    // a parenthesised PAIR is a coordinate, not a list marker.
    expect(numberMultiset("the point (4,5)")).toEqual(["4", "5"]);
    // a magnitude mid-sentence survives even when it precedes a full stop.
    expect(numberMultiset("the radius is 7. the centre is (1,2)")).toEqual(["7", "1", "2"]);
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

// ---------------------------------------------------------------------------
// The identical-multiset branch (added 2026-09-22).
//
// WHY IT EXISTS. The `distinctive` guard above requires a shared number to be
// >=5, decimal, or multi-digit, so that two unrelated problems sharing small
// structural integers don't warn. That guard is correct for algebra and BLIND
// for coordinate geometry, where every number in the problem is a small
// single-digit coordinate. Measured 2026-09-22: check #5 fired on 0 of 2,455
// authored-example/self-check <-> PYQ pairs across the whole shipped /notes
// corpus, while /notes/nda-maths/lines carried two self-checks that ARE their
// own featured PYQ, verbatim, with the bank's own solution as their steps.
//
// The two fixtures below are those real pairs, quoted from the shipped chapter
// and from the `questions` rows they feature. They share 100% of the PYQ's
// numbers and are dismissed by the old rule for having none >= 5.
//
// The branch is deliberately narrow: EXACT multiset equality, both directions.
// Number counts alone cannot separate these from the two negatives above -- all
// four share exactly 4 small numbers -- but the negatives have UNEQUAL
// multisets (the example is a different, usually simpler, problem), and these
// have identical ones. Anything looser re-flags the polynomial-integral and
// matrix-notation cases, which is why the obvious "lower the count threshold"
// fix is not available.
describe("reusesPyqNumbers — identical-multiset branch", () => {
  it("flags the nda-maths/lines image-reflection self-check (real, verbatim)", () => {
    const pyq =
      "If the image of the point \\((-4, 2)\\) by a line mirror is \\((4, -2)\\), " +
      "then what is the equation of the line mirror?";
    const selfCheck =
      "The image of \\((-4,2)\\) in a line is \\((4,-2)\\). What line is the mirror?";
    expect(reusesPyqNumbers(selfCheck, pyq)).toBe(true);
  });

  it("flags the nda-maths/lines angle-between self-check (real, verbatim)", () => {
    const pyq =
      "What is the obtuse angle between the lines whose slopes are " +
      "\\(2-\\sqrt{3}\\) and \\(2+\\sqrt{3}\\)?";
    const selfCheck =
      "Find the obtuse angle between lines with slopes \\(2-\\sqrt3\\) and \\(2+\\sqrt3\\).";
    expect(reusesPyqNumbers(selfCheck, pyq)).toBe(true);
  });

  it("still needs 3+ numbers — two identical trivial multisets do not warn", () => {
    // Equality alone is too weak below the existing distinctiveness floor:
    // "the value of x is 2" vs "find x when x = 2" share one number by chance.
    expect(reusesPyqNumbers("the value of x is 2", "find x when x = 2")).toBe(false);
  });

  it("does not flag a statement-list PYQ that shares only its list labels", () => {
    // Real pair, nda-geography/climatology > "Tropical vs temperate cyclones".
    // The PYQ's only numbers are its three statement markers; the worked
    // example's only numbers are its three parenthesised claim markers. As
    // problems they have nothing numeric in common.
    const pyq =
      "Which of the following statements regarding cyclones and anti-cyclones is/are correct ?\n" +
      "1. In the Northern Hemisphere, cyclones rotate counter clockwise and anticyclones rotate clockwise.\n" +
      "2. Cyclones are often associated with cloudy or rainy weather, whereas anticyclones are often associated with fair weather.\n" +
      "3. In the Southern Hemisphere, the cyclonic spiral will be clockwise because the Coriolis force acts to the left.\n" +
      "Select the answer using the code given below :";
    const example =
      "Three claims: (1) in the Northern Hemisphere cyclones rotate anticlockwise and " +
      "anticyclones clockwise; (2) cyclones bring rainy weather, anticyclones fair weather; " +
      "(3) in the Southern Hemisphere the cyclonic spiral is clockwise because Coriolis acts " +
      "to the left. How many are correct?";
    expect(reusesPyqNumbers(example, pyq)).toBe(false);
  });

  it("does not flag when the example drops one of the PYQ's numbers", () => {
    // Guards the branch against the polynomial-integral shape: a simpler
    // example built from a subset of the PYQ's numbers is NOT the same problem.
    const pyq = "Find the area of the triangle with vertices (1,2), (3,4), (5,6)";
    const example = "Find the area of the triangle with vertices (1,2), (3,4)";
    expect(reusesPyqNumbers(example, pyq)).toBe(false);
  });
});
