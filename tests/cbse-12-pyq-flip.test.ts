import { describe, expect, it } from "vitest";
import { holdReason } from "../scripts/cbse-12-pyq/flip-public";

/**
 * The ship rule for the CBSE board-PYQ corpus: a row goes PUBLIC iff a student
 * can get a trustworthy answer out of it.
 *
 * The case that makes this worth testing rather than eyeballing is the KEYLESS
 * MCQ. CBSE printed five questions with no correct option and said so in the
 * marking scheme; they are preserved as printed, so they carry 0 correct options
 * BY DESIGN. A plain "exactly one correct option" rule would hold them back
 * forever, and a plain "skip the check if keyless" rule would let a row that
 * lost its assertion slip through unnoticed. Both directions are asserted below.
 */
const sub = (solution: string | null) => ({ question_format: "subjective", solution, options: [] });
const mcq = (solution: string | null, correct: number) => ({
  question_format: "mcq",
  solution,
  options: ["A", "B", "C", "D"].map((label, i) => ({ label, is_correct: i < correct })),
});

describe("holdReason — the CBSE board-PYQ ship rule", () => {
  it("ships a subjective row that carries a solution", () => {
    expect(holdReason(sub("Separating variables, ..."), false)).toBeNull();
  });

  it("holds a subjective row with no solution — the solution IS the answer", () => {
    expect(holdReason(sub(null), false)).toBe("no solution");
    expect(holdReason(sub("   "), false)).toBe("no solution");
  });

  it("ships an MCQ with a solution and exactly one correct option", () => {
    expect(holdReason(mcq("Substituting gives 6, which is option (A) 6.", 1), false)).toBeNull();
  });

  it("holds an MCQ that has a key but no working — a bare letter teaches nothing", () => {
    expect(holdReason(mcq(null, 1), false)).toBe("no solution");
  });

  it("holds an MCQ with no correct option unless the keyless defect was asserted", () => {
    expect(holdReason(mcq("...", 0), false)).toBe("0 correct option(s), need exactly 1");
  });

  it("holds an MCQ with two correct options", () => {
    expect(holdReason(mcq("...", 2), false)).toBe("2 correct option(s), need exactly 1");
  });

  it("SHIPS an asserted-keyless MCQ, because the defect note is the only answer there is", () => {
    expect(holdReason(mcq("[CBSE printed no correct option; the true value is 7.]", 0), true)).toBeNull();
  });

  it("still requires a solution on a keyless row — otherwise the card reveals nothing", () => {
    expect(holdReason(mcq(null, 0), true)).toBe("no solution");
  });

  it("flags a row asserted keyless that in fact HAS a key — the assertion has gone stale", () => {
    // Not merely 'ship it anyway': if the transcription says CBSE printed no
    // correct option and the row disagrees, one of the two is wrong and a human
    // has to look. Silently shipping would bury the contradiction.
    expect(holdReason(mcq("...", 1), true)).toBe("asserted keyless but has 1 correct option(s)");
  });

  it("does not apply the one-correct rule to subjective rows, which carry no options", () => {
    expect(holdReason({ question_format: "subjective", solution: "x = 3", options: [] }, false)).toBeNull();
  });

  it("treats a null format as non-MCQ — a subjective row may carry no explicit format", () => {
    expect(holdReason({ question_format: null, solution: "x = 3", options: [] }, false)).toBeNull();
  });
});
