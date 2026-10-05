/**
 * What the mock start page shows, from my_mock_quota() (migrations 0120 +
 * 0134) and whether the student has started THIS mock before. The trigger is
 * the real gate; this only decides the copy, so it must agree with the
 * trigger's rules — including that a chapter test (scope 'sectional') and a
 * full mock are counted against two SEPARATE limits (owner, 2026-10-05).
 */
import { describe, it, expect } from "vitest";
import { mockStartState, type MockQuota } from "@/lib/mocks/quota";

const q = (used: number, limit: number | null = 3, hasPass = false): MockQuota => ({
  limit,
  used,
  hasPass,
  chapterLimit: null,
  chapterUsed: 0,
});

describe("mockStartState: full mocks", () => {
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
    expect(mockStartState(q(0), false)).toEqual({ kind: "free", left: 3, limit: 3, unit: "mock" });
    expect(mockStartState(q(2), false)).toEqual({ kind: "free", left: 1, limit: 3, unit: "mock" });
  });
  it("is locked once every free slot is used", () => {
    expect(mockStartState(q(3), false)).toEqual({ kind: "locked", limit: 3, unit: "mock" });
    expect(mockStartState(q(5), false)).toEqual({ kind: "locked", limit: 3, unit: "mock" });
  });
  it("is locked with a zero limit", () => {
    expect(mockStartState(q(0, 0), false)).toEqual({ kind: "locked", limit: 0, unit: "mock" });
  });
  it("defaults to a full mock when no scope is given", () => {
    expect(mockStartState(q(3), false, "full")).toEqual(mockStartState(q(3), false));
  });
});

describe("mockStartState: chapter tests have their own limit", () => {
  const cq = (chapterUsed: number, chapterLimit: number | null = 5, used = 3): MockQuota => ({
    limit: 3,
    used,
    hasPass: false,
    chapterLimit,
    chapterUsed,
  });

  it("ignores the full-mock count: 3 of 3 mocks used, chapter tests still free", () => {
    expect(mockStartState(cq(0), false, "sectional")).toEqual({
      kind: "free",
      left: 5,
      limit: 5,
      unit: "chapter_test",
    });
  });
  it("locks the 6th chapter test", () => {
    expect(mockStartState(cq(5), false, "sectional")).toEqual({
      kind: "locked",
      limit: 5,
      unit: "chapter_test",
    });
  });
  it("is open when the chapter-test limit is off, whatever the mock count", () => {
    expect(mockStartState(cq(40, null), false, "sectional")).toEqual({ kind: "open" });
  });
  it("is open for a pass holder and for a retake", () => {
    expect(mockStartState({ ...cq(5), hasPass: true }, false, "sectional")).toEqual({ kind: "open" });
    expect(mockStartState(cq(5), true, "sectional")).toEqual({ kind: "open" });
  });
  it("a full mock is not affected by the chapter-test count", () => {
    expect(mockStartState(cq(5, 5, 0), false, "full")).toEqual({
      kind: "free",
      left: 3,
      limit: 3,
      unit: "mock",
    });
  });
});
