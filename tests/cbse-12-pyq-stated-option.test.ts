import { describe, it, expect } from "vitest";
import { statedOption } from "../scripts/cbse-12-pyq/statedOption";

// `concludedLetter` reads an option LETTER a solution concludes with. The
// shipped CBSE 12 Chemistry, most Maths and half the Physics MCQ solutions
// state their answer in words and name no letter, so the key screen read
// "(none)" on 1,617 of them and checked nothing. `statedOption` reads the two
// word forms that are unambiguous. Measured on all 1,617 (2026-10-07): it reads
// 177 and all 177 agree with the stored key. A looser third rule ("the first
// sentence names exactly one option") read 240 and was wrong on 18, because an
// opening sentence often names a distractor; it was dropped. Every fixture
// below is a real solution from the bank.

const AR = [
  { label: "A", text: "Both Assertion (A) and Reason (R) are true and Reason (R) is the correct explanation of the Assertion (A)." },
  { label: "B", text: "Both Assertion (A) and Reason (R) are true, but Reason (R) is not the correct explanation of the Assertion (A)." },
  { label: "C", text: "Assertion (A) is true, but Reason (R) is false." },
  { label: "D", text: "Assertion (A) is false, but Reason (R) is true." },
];

describe("statedOption: 'which is option <text>'", () => {
  it("matches the option whose text the closing phrase names (Maths 2024 65/4/1 Q7)", () => {
    const sol = "Letting \\(x \\to 0\\) gives \\(\\dfrac{1}{2 + 2} = \\dfrac{1}{4}\\). Hence \\(k = \\dfrac{1}{4}\\), which is option \\(\\dfrac{1}{4}\\).";
    const opts = [
      { label: "A", text: "0" },
      { label: "B", text: "\\(\\dfrac{1}{4}\\)" },
      { label: "C", text: "1" },
      { label: "D", text: "4" },
    ];
    expect(statedOption(sol, opts)).toBe("B");
  });

  it("reads a longer option text (Maths 2025 65/7/1 Q12)", () => {
    const sol = "Hence \\(\\displaystyle\\int x^{3}\\,dx = \\dfrac{x^{4}}{4} + C\\), which is option \\(\\dfrac{x^{4}}{4} + C\\).";
    const opts = [
      { label: "A", text: "\\(x + C\\)" },
      { label: "B", text: "\\(\\dfrac{x^2}{2} + C\\)" },
      { label: "C", text: "\\(\\dfrac{x^4}{4} + C\\)" },
      { label: "D", text: "\\(\\dfrac{x^3}{3} + C\\)" },
    ];
    expect(statedOption(sol, opts)).toBe("C");
  });

  it("returns null when the phrase names no option", () => {
    expect(statedOption("So the degree is not defined.", [
      { label: "A", text: "2" }, { label: "B", text: "1" }, { label: "C", text: "not defined" }, { label: "D", text: "0" },
    ])).toBeNull();
  });
});

describe("statedOption: an assertion-reason verdict in the FIRST sentence", () => {
  it("reads 'both true, but NOT the correct explanation' as the second code (Chemistry 2024 56/2/3 Q13)", () => {
    expect(statedOption("Both statements are true, but the Reason is NOT the correct explanation of the Assertion.  Aniline IS the weaker base.", AR)).toBe("B");
  });

  it("reads 'both true and the correct explanation' as the first code", () => {
    expect(statedOption("Both statements are true, and the Reason is the correct explanation of the Assertion. Linked genes stay together.", AR)).toBe("A");
  });

  it("reads 'Assertion true, Reason false' and 'Assertion false, Reason true'", () => {
    expect(statedOption("The Assertion is true but the Reason is false. Adoption is legal in India.", AR)).toBe("C");
    expect(statedOption("The Assertion is false while the Reason is true. Agrobacterium infects dicots.", AR)).toBe("D");
  });

  it("does not read a verdict out of a first sentence that only sets up the method (Maths 2025 65/2/1 Q19)", () => {
    expect(statedOption("Test the two statements separately. A scalar matrix is a diagonal matrix whose diagonal entries are ALL EQUAL. Both are true.", AR)).toBeNull();
  });
});

describe("statedOption: everything else stays unread", () => {
  it("does not guess from an opening sentence that names one option (Chemistry 2026 56/5/1 Q11)", () => {
    const opts = [
      { label: "A", text: "Fructose" }, { label: "B", text: "Maltose" }, { label: "C", text: "Glucose" }, { label: "D", text: "Cellulose" },
    ];
    expect(statedOption("Cellulose is the polysaccharide: it is a long chain of glucose units.", opts)).toBeNull();
  });

  it("returns null for an empty solution", () => {
    expect(statedOption("", AR)).toBeNull();
    expect(statedOption(null, AR)).toBeNull();
  });
});
