/**
 * The free drill allowance (2026-10-05, owner): 15 drill questions a day for a
 * free account (three sets of five), unlimited with a pass.
 *
 * It counts QUESTIONS ANSWERED in the drill today, never drill opens: the page
 * logs `drill_started` on every load, so counting opens would charge a student
 * for pressing refresh. A question answered once today can be answered again
 * without spending anything.
 */
import { describe, it, expect } from "vitest";
import { canAnswerDrillQuestion, drillAllowance, servedCount } from "@/lib/drill/allowance";

const ids = (n: number) => Array.from({ length: n }, (_, i) => `q${i}`);

describe("drillAllowance", () => {
  it("is open when the limit is off", () => {
    expect(drillAllowance({ limit: null, hasPass: false, answeredToday: ids(40) })).toEqual({ kind: "open" });
  });
  it("is open for a pass holder", () => {
    expect(drillAllowance({ limit: 15, hasPass: true, answeredToday: ids(40) })).toEqual({ kind: "open" });
  });
  it("counts the questions left today", () => {
    expect(drillAllowance({ limit: 15, hasPass: false, answeredToday: [] })).toEqual({
      kind: "free",
      left: 15,
      limit: 15,
    });
    expect(drillAllowance({ limit: 15, hasPass: false, answeredToday: ids(12) })).toEqual({
      kind: "free",
      left: 3,
      limit: 15,
    });
  });
  it("counts a question answered twice today once", () => {
    expect(drillAllowance({ limit: 15, hasPass: false, answeredToday: ["a", "a", "b"] })).toEqual({
      kind: "free",
      left: 13,
      limit: 15,
    });
  });
  it("is locked once 15 are answered", () => {
    expect(drillAllowance({ limit: 15, hasPass: false, answeredToday: ids(15) })).toEqual({
      kind: "locked",
      limit: 15,
    });
  });
});

describe("servedCount", () => {
  it("serves a full set while there is room", () => {
    expect(servedCount({ kind: "open" })).toBe(5);
    expect(servedCount({ kind: "free", left: 15, limit: 15 })).toBe(5);
  });
  it("serves only what is left of today's allowance", () => {
    expect(servedCount({ kind: "free", left: 3, limit: 15 })).toBe(3);
  });
  it("serves nothing when locked", () => {
    expect(servedCount({ kind: "locked", limit: 15 })).toBe(0);
  });
});

describe("canAnswerDrillQuestion", () => {
  const input = (n: number) => ({ limit: 15, hasPass: false, answeredToday: ids(n) });

  it("allows a new question while there is room", () => {
    expect(canAnswerDrillQuestion(input(14), "new")).toBe(true);
  });
  it("refuses a 16th new question", () => {
    expect(canAnswerDrillQuestion(input(15), "new")).toBe(false);
  });
  it("allows a question already answered today, even at the limit", () => {
    expect(canAnswerDrillQuestion(input(15), "q3")).toBe(true);
  });
  it("always allows a pass holder or an unlimited setting", () => {
    expect(canAnswerDrillQuestion({ ...input(40), hasPass: true }, "new")).toBe(true);
    expect(canAnswerDrillQuestion({ ...input(40), limit: null }, "new")).toBe(true);
  });
});
