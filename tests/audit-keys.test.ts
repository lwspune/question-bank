import { describe, it, expect } from "vitest";
import { concludedLetter, auditRow } from "../scripts/practice/audit-keys";

const opts = (correct: string, texts = ["p", "q", "r", "s"]) =>
  ["A", "B", "C", "D"].map((label, i) => ({ label, text: texts[i], is_correct: label === correct }));

describe("concludedLetter", () => {
  it("reads a letter conclusion in each supported phrasing", () => {
    expect(concludedLetter("... so Hence (B)")).toBe("B");
    expect(concludedLetter("... therefore option C is right")).toBe("C");
    expect(concludedLetter("... the answer is d.")).toBe("D");
    expect(concludedLetter("... and we get (A)")).toBe("A");
  });

  it("returns null when the solution names no option letter", () => {
    expect(concludedLetter("x = 5 so the speed doubles")).toBeNull();
    expect(concludedLetter(null)).toBeNull();
  });

  it("does not read the first letter of a following WORD as a conclusion", () => {
    // Regression: `Hence c|ontinuous` / `option b|akelite` used to match.
    expect(concludedLetter("Hence continuous at x = 0")).toBeNull();
    expect(concludedLetter("the option carbonyl is formed")).toBeNull();
  });

  it("does not read Assertion/Reason labels as option letters", () => {
    // An A-R solution restates the option verbatim and ENDS with `of (A)`, where
    // (A) is the Assertion label, not option A. `(R)` can't be an option letter
    // (options are A-D), so its presence marks these as A-R labels.
    const ar = "Both (A) and (R) are true but (R) is not the correct explanation of (A)";
    expect(concludedLetter(ar)).toBeNull();
    expect(concludedLetter("(A) is true but (R) is false")).toBeNull();
  });

  it("does not read an ENUMERATING solution's last option mention as its conclusion", () => {
    // Multi-statement questions are solved by walking every choice in turn:
    // "For option (A) ... For option (B) ... For option (C) ... For option (D)".
    // The last `option (X)` is the last thing EXAMINED, not the answer — the
    // real conclusion here is the trailing "A, B & D only", i.e. option A.
    const enumerated =
      "For option (A) it can be 1D motion. For option (B) yes 1D. " +
      "For option (C) time can't be negative, not possible. For option (D) possible. A, B & D only";
    expect(concludedLetter(enumerated)).toBeNull();
    expect(auditRow(opts("A"), enumerated)).toBeNull();
  });

  it("still reads a real conclusion in a solution that happens to mention (R)", () => {
    // Guard against over-suppressing: a genuine "answer is (C)" wins.
    expect(concludedLetter("Using (R) = 8.314, we get ... Hence the answer is (C)")).toBe("C");
  });
});

describe("auditRow", () => {
  it("passes a well-formed row whose solution agrees with the key", () => {
    expect(auditRow(opts("B"), "... Hence (B)")).toBeNull();
  });

  it("flags a solution that concludes a different letter than the key", () => {
    expect(auditRow(opts("B"), "... Hence (A)")).toBe("SOLN_A!=KEY_B");
  });

  it("flags duplicate option text", () => {
    expect(auditRow(opts("B", ["p", "q", "q", "s"]), null)).toBe("DUP_OPT");
  });

  it("flags a row that isn't exactly 4 options with one correct", () => {
    expect(auditRow(opts("B").slice(0, 3), null)).toBe("STRUCT(3opt,1corr)");
    expect(auditRow(["A", "B", "C", "D"].map((label) => ({ label, text: label, is_correct: true })), null))
      .toBe("STRUCT(4opt,4corr)");
  });

  it("does not flag an Assertion-Reason row whose solution restates the key option", () => {
    const ar = "Both (A) and (R) are true but (R) is not the correct explanation of (A)";
    expect(auditRow(opts("B", ["(A) is true but (R) is false", ar, "both true, R explains A", "A false, R true"]), ar))
      .toBeNull();
  });
});
