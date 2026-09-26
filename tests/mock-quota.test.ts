/**
 * What the mock start page shows, from my_mock_quota() (migration 0120) and
 * whether the student has started THIS mock before. The trigger is the real
 * gate; this only decides the copy, so it must agree with the trigger's rules.
 */
import { describe, it, expect } from "vitest";
import { mockStartState } from "@/lib/mocks/quota";

const q = (used: number, limit: number | null = 3, hasPass = false) => ({ limit, used, hasPass });

describe("mockStartState", () => {
  it("is open when the limit is off", () => {
    expect(mockStartState(q(9, null), false)).toEqual({ kind: "open" });
  });
  it("is open for a pass holder or staff", () => {
    expect(mockStartState(q(9, 3, true), false)).toEqual({ kind: "open" });
  });
  it("is open when the quota could not be read (the trigger still guards)", () => {
    expect(mockStartState(null, false)).toEqual({ kind: "open" });
  });
  it("is open for a retake, even at the limit", () => {
    expect(mockStartState(q(3), true)).toEqual({ kind: "open" });
  });
  it("counts the free mocks left before this one", () => {
    expect(mockStartState(q(0), false)).toEqual({ kind: "free", left: 3, limit: 3 });
    expect(mockStartState(q(2), false)).toEqual({ kind: "free", left: 1, limit: 3 });
  });
  it("is locked once every free slot is used", () => {
    expect(mockStartState(q(3), false)).toEqual({ kind: "locked", limit: 3 });
    expect(mockStartState(q(5), false)).toEqual({ kind: "locked", limit: 3 });
  });
  it("is locked with a zero limit", () => {
    expect(mockStartState(q(0, 0), false)).toEqual({ kind: "locked", limit: 0 });
  });
});
