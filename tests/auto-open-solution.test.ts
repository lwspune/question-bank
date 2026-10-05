/**
 * A wrong pick on a bank card opens the solution at once (UX_ACTION_PLAN.md
 * A12, confirmed 2026-10-02, built 2026-10-05). The student who has just got it
 * wrong is the one who most needs the explanation, and it saves them a tap. A
 * right pick keeps the "Show solution" button. Pure core:
 * src/lib/questions/autoOpen.ts.
 */
import { describe, it, expect } from "vitest";
import { shouldAutoOpenSolution } from "@/lib/questions/autoOpen";

const base = { picked: true, isCorrect: false, hasSolution: true, cancelled: false };

describe("shouldAutoOpenSolution", () => {
  it("opens after a wrong pick on a question with a solution", () => {
    expect(shouldAutoOpenSolution(base)).toBe(true);
  });

  it("leaves a right pick to the Show solution button", () => {
    expect(shouldAutoOpenSolution({ ...base, isCorrect: true })).toBe(false);
  });

  it("does nothing when the pick could not be graded (no single key)", () => {
    expect(shouldAutoOpenSolution({ ...base, isCorrect: null })).toBe(false);
  });

  it("does nothing without a solution to show, or on a cancelled question", () => {
    expect(shouldAutoOpenSolution({ ...base, hasSolution: false })).toBe(false);
    expect(shouldAutoOpenSolution({ ...base, cancelled: true })).toBe(false);
  });

  it("does nothing when the tap was refused (the reveal wall)", () => {
    expect(shouldAutoOpenSolution({ ...base, picked: false })).toBe(false);
  });
});
