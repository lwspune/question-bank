/**
 * What V's practice-test builder says about the free daily practice tests
 * (migration 0156; the number is paywall_settings.free_practice_tests_per_day,
 * edited at /dashboard/pricing). The copy carries the live number, so raising
 * the limit there changes what students read without a deploy.
 *
 * Three places read it: the line under V's first question (before building,
 * so a student who has used today's tests learns it BEFORE walking the steps,
 * 2026-10-17), the built-test card, and the error when Start is refused.
 */
import { describe, it, expect } from "vitest";
import type { MockStartState } from "@/lib/mocks/quota";
import { practiceBuilderNote, practiceCardLine, practiceUsedUpLine } from "@/lib/practiceTests/quotaCopy";

const free = (left: number, limit: number): MockStartState => ({ kind: "free", left, limit, unit: "practice_test" });
const locked = (limit: number): MockStartState => ({ kind: "locked", limit, unit: "practice_test" });
const open: MockStartState = { kind: "open" };

describe("practiceUsedUpLine", () => {
  it("names the number of free tests used", () => {
    expect(practiceUsedUpLine(3)).toBe("You've used your 3 free practice tests for today.");
  });
  it("is singular for a limit of one", () => {
    expect(practiceUsedUpLine(1)).toBe("You've used today's free practice test.");
  });
  it("does not claim a test was used when the limit is zero", () => {
    expect(practiceUsedUpLine(0)).toBe("Practice tests need the Premium Pass today.");
  });
});

describe("practiceCardLine: the built-test card", () => {
  it("says how many are left and that starting uses one", () => {
    expect(practiceCardLine(free(3, 3))).toBe("You have 3 free practice tests left today. Starting this one uses 1.");
  });
  it("calls the last of several the last one", () => {
    expect(practiceCardLine(free(1, 3))).toBe("This is your last free practice test today.");
  });
  it("keeps the one-a-day wording when the limit is one", () => {
    expect(practiceCardLine(free(1, 1))).toBe("Starting it uses today's free practice test.");
  });
  it("says the used-up line when locked", () => {
    expect(practiceCardLine(locked(3))).toBe("You've used your 3 free practice tests for today.");
  });
  it("says nothing for a pass holder, a retake or the limit off", () => {
    expect(practiceCardLine(open)).toBeNull();
    expect(practiceCardLine(null)).toBeNull();
  });
});

describe("practiceBuilderNote: before building", () => {
  it("is a quiet count while tests are left", () => {
    expect(practiceBuilderNote(free(2, 3))).toEqual({ kind: "count", text: "2 of 3 free practice tests left today." });
    expect(practiceBuilderNote(free(1, 1))).toEqual({ kind: "count", text: "1 of 1 free practice test left today." });
  });
  it("warns before the steps once today's tests are used, and keeps building open", () => {
    expect(practiceBuilderNote(locked(3))).toEqual({
      kind: "usedUp",
      text: "You've used your 3 free practice tests for today. More tomorrow, or get the Premium Pass for unlimited tests. You can still build one to send to a friend.",
    });
  });
  it("promises no tomorrow when the limit is zero", () => {
    expect(practiceBuilderNote(locked(0))?.text).toBe(
      "Practice tests need the Premium Pass today. You can still build one to send to a friend."
    );
  });
  it("says nothing when the state is open or unknown (signed out, pass, limit off)", () => {
    expect(practiceBuilderNote(open)).toBeNull();
    expect(practiceBuilderNote(null)).toBeNull();
  });
});
