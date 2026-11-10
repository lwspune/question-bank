import { describe, it, expect } from "vitest";
import { showsCheckLine } from "@/lib/visuals/checkLine";

/**
 * The "Checked: ... Answer key: ..." line under an animated solution
 * (owner, 2026-11-09): it reports OUR verification of the animation ("the
 * rewrites agree with the line before, equations hold at the roots") and
 * repeats the answer, so it means nothing to a student. Staff keep it: it is
 * how a teacher knows an animation was checked before using it in class.
 */
describe("showsCheckLine", () => {
  it("shows staff the line when the animation's own check passed", () => {
    expect(showsCheckLine({ checkOk: true, isStaff: true })).toBe(true);
  });

  it("never shows it to a student or a signed-out visitor", () => {
    expect(showsCheckLine({ checkOk: true, isStaff: false })).toBe(false);
  });

  it("shows nobody a check that did not pass", () => {
    expect(showsCheckLine({ checkOk: false, isStaff: true })).toBe(false);
    expect(showsCheckLine({ checkOk: false, isStaff: false })).toBe(false);
  });
});
