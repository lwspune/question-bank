import { describe, it, expect } from "vitest";
import { revealDecision, isRevealLocked, FREE_REVEAL_LIMIT } from "@/lib/questions/revealMeter";

describe("revealDecision", () => {
  it("signed-in viewers are unlimited (no tracking, Infinity remaining)", () => {
    const d = revealDecision({ signedIn: true, revealedIds: ["a", "b", "c", "d"], questionId: "e" });
    expect(d.allow).toBe(true);
    expect(d.remaining).toBe(Infinity);
    expect(d.nextIds).not.toContain("e"); // signed-in reveals aren't tracked
  });

  it("allows a new question while under the limit and consumes one", () => {
    const d = revealDecision({ signedIn: false, revealedIds: [], questionId: "q1", limit: 3 });
    expect(d.allow).toBe(true);
    expect(d.nextIds).toEqual(["q1"]);
    expect(d.remaining).toBe(2);
  });

  it("re-revealing an already-counted question is free (no double-charge)", () => {
    const d = revealDecision({ signedIn: false, revealedIds: ["q1", "q2"], questionId: "q1", limit: 3 });
    expect(d.allow).toBe(true);
    expect(d.nextIds).toEqual(["q1", "q2"]);
    expect(d.remaining).toBe(1);
  });

  it("denies a NEW question once the budget is spent", () => {
    const d = revealDecision({ signedIn: false, revealedIds: ["q1", "q2", "q3"], questionId: "q4", limit: 3 });
    expect(d.allow).toBe(false);
    expect(d.nextIds).toEqual(["q1", "q2", "q3"]);
    expect(d.remaining).toBe(0);
  });

  it("still allows an already-seen question even after the budget is spent", () => {
    const d = revealDecision({ signedIn: false, revealedIds: ["q1", "q2", "q3"], questionId: "q2", limit: 3 });
    expect(d.allow).toBe(true);
  });

  it("defaults to FREE_REVEAL_LIMIT when no limit passed", () => {
    const ids = Array.from({ length: FREE_REVEAL_LIMIT }, (_, i) => `q${i}`);
    expect(revealDecision({ signedIn: false, revealedIds: ids, questionId: "new" }).allow).toBe(false);
  });

  // Product decision 2026-10-01: Clarity showed anon visitors walled at the 4th
  // reveal (3 was the limit) and almost none signed in. Ten is the new budget.
  it("lets an anon viewer reveal 10 new questions and walls the 11th", () => {
    const nine = Array.from({ length: 9 }, (_, i) => `q${i}`);
    expect(revealDecision({ signedIn: false, revealedIds: nine, questionId: "q9" }).allow).toBe(true);
    const ten = Array.from({ length: 10 }, (_, i) => `q${i}`);
    expect(revealDecision({ signedIn: false, revealedIds: ten, questionId: "q10" }).allow).toBe(false);
  });
});

describe("isRevealLocked", () => {
  const spent = ["q1", "q2", "q3"];

  it("locks a NEW question once the budget is spent", () => {
    expect(isRevealLocked({ signedIn: false, loading: false, revealedIds: spent, questionId: "q4", limit: 3 })).toBe(true);
  });

  it("never locks a question the viewer already revealed", () => {
    expect(isRevealLocked({ signedIn: false, loading: false, revealedIds: spent, questionId: "q2", limit: 3 })).toBe(false);
  });

  it("does not lock while budget remains", () => {
    expect(isRevealLocked({ signedIn: false, loading: false, revealedIds: ["q1"], questionId: "q4", limit: 3 })).toBe(false);
  });

  it("never locks a signed-in viewer", () => {
    expect(isRevealLocked({ signedIn: true, loading: false, revealedIds: spent, questionId: "q4", limit: 3 })).toBe(false);
  });

  // A signed-in user must never see a lock flash while auth resolves — the same
  // rule attemptReveal follows by allowing every reveal during loading.
  it("never locks while auth is still loading", () => {
    expect(isRevealLocked({ signedIn: false, loading: true, revealedIds: spent, questionId: "q4", limit: 3 })).toBe(false);
  });

  it("agrees with revealDecision on every input (one rule, not two)", () => {
    for (const questionId of ["q1", "q4"]) {
      for (const revealedIds of [[], ["q1"], spent]) {
        const allow = revealDecision({ signedIn: false, revealedIds, questionId, limit: 3 }).allow;
        expect(isRevealLocked({ signedIn: false, loading: false, revealedIds, questionId, limit: 3 })).toBe(!allow);
      }
    }
  });
});
