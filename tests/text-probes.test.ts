import { describe, expect, it } from "vitest";
import { hasDroppedSymbol, leakedOptionValues } from "../scripts/lib/textProbes";

describe("hasDroppedSymbol", () => {
  // Real defects found on 2026-07-28 (the named object was lost in the OCR/pandoc step,
  // leaving a math zone that opens with a bare '=').
  it.each([
    ["Let \\(A =\\begin{bmatrix}1&2\\end{bmatrix}\\) and \\(= I + adj(A)\\). …matrix B is:", "JEE24 Apr04 Q156"],
    ["Let \\(=\\begin{bmatrix} 2 & a & 0 \\end{bmatrix}\\). If \\(A^{3}= 4A^{2}\\)", "JEE24 Apr08 Q68"],
    ["…\\(b = P(X \\geq 3)\\) and \\(=\\) \\(P(X \\geq 6 \\mid X > 3)\\).", "JEE24 Jan27 Q86"],
    ["…\\(2\\theta\\right)\\) and \\(=\\left\\{ \\theta \\in \\lbrack 0,\\pi\\rbrack\\right\\}\\)", "JEE23 Jan29 Q71"],
    ["equation \\(y =kt^{2}\\) where \\(= 1\\text{ }m/s^{2}\\). If new time period", "CET25 Apr21 Q38"],
  ])("flags %s (%s)", (stem) => {
    expect(hasDroppedSymbol(stem)).toBe(true);
  });

  // The common LEGITIMATE shape: a named quantity sits OUTSIDE the math zone and
  // pandoc split the '=' into the zone. Flagging these would drown the real signal.
  it.each([
    ["…least count \\(= 0.001\\text{ }cm\\) ) and length", "least count"],
    ["rate law equation is rate \\(= k[A]^2[B]\\). If rate of reaction", "rate law"],
    ["(specific heat of water \\(= 4200 \\text{J}\\))", "specific heat"],
    ["[Use \\(g =\\frac{GM}{R^{2}}= 9.8\\)]", "Use g ="],
    ["\\(\\left\\lbrack K_{f} \\right.\\) for water, \\(= 1.86\\text{ }K\\)", "comma-preceded"],
    ["if \\(x\\neq2\\), \\(=k\\) if \\(x=2\\) is continuous", "piecewise second branch"],
  ])("does not flag %s (%s)", (stem) => {
    expect(hasDroppedSymbol(stem)).toBe(false);
  });
});

describe("leakedOptionValues", () => {
  it("flags a stem carrying its own option run", () => {
    const stem = "…the A.P. is :\\ (a) 10220 (b) 12860 (c) 15220 (b) 19780";
    expect(leakedOptionValues(stem, ["10220", "12860", "15220", "19780"])).toBe(true);
  });

  it("sees through LaTeX-delimited options (the shape that hid JEE 2026 Jan21 Q70)", () => {
    const stem =
      "…is: (a) \\(5x - y - 3 = 0\\) (b) \\(4x - 5y + 6 = 0\\) (d) \\(x - 2y + 3 = 0\\) (d) \\(5x - 4y + 3 = 0\\)";
    const opts = ["(5x - y - 3 = 0)", "(4x - 5y + 6 = 0)", "(x - 2y + 3 = 0)", "(5x - 4y + 3 = 0)"];
    expect(leakedOptionValues(stem, opts)).toBe(true);
  });

  // The dominant false positive: NDA GAT "spot the error" stems, whose options ARE the
  // sentence segments, so the values genuinely do appear in the stem. What separates
  // them from a real leak is that the labels are INLINE mid-sentence, whereas a leaked
  // option block always starts after the question terminates (': ' / '?' / a newline).
  it("does NOT flag a spot-the-error stem, where (a)/(b)/(c) segment the sentence", () => {
    const stem =
      "Spot the part containing the error: What is the function (a) / of the kidney (b) / in the body? (c) / no error (d)";
    expect(
      leakedOptionValues(stem, ["What is the function", "of the kidney", "in the body?", "no error"])
    ).toBe(false);
  });

  it("does NOT flag a spot-the-error stem whose labels follow a semicolon mid-sentence", () => {
    const stem = "Everything is going well; (a) we didn't have (b) any problem. (c) No error. (d)";
    expect(leakedOptionValues(stem, ["Everything is going well", "we didn't have", "any problem.", "No error."])).toBe(
      false
    );
  });

  it("flags a leak introduced by a newline rather than a colon (NDA GAT match-pairs)", () => {
    const stem =
      "Which one of the following pairs is correctly matched?\r\n\r\nBhakti Saint\r\n(a) Shankara : Avadhuta\r\n(b) Ramananda : Kevaladvaita\r\n(c) Ramanuja : Vishishtadvaita\r\n(d) Chaitanya : Advaita";
    const opts = [
      "Shankara : Avadhuta",
      "Ramananda : Kevaladvaita",
      "Ramanuja : Vishishtadvaita",
      "Chaitanya : Advaita",
    ];
    expect(leakedOptionValues(stem, opts)).toBe(true);
  });

  it("does NOT flag when only one option value happens to appear", () => {
    const stem = "If the value of \\(x\\) is 15220, find …";
    expect(leakedOptionValues(stem, ["10220", "12860", "15220", "19780"])).toBe(false);
  });

  it("ignores option values too short to be distinctive", () => {
    const stem = "A body of mass 2 kg travels 4 m in 3 s along a line of length 5 m.";
    expect(leakedOptionValues(stem, ["2", "3", "4", "5"])).toBe(false);
  });

  it("needs a label run — echoed values alone are not a leak", () => {
    const stem = "The readings were 10220, 12860 and 15220 across three trials.";
    expect(leakedOptionValues(stem, ["10220", "12860", "15220", "19780"])).toBe(false);
  });
});
