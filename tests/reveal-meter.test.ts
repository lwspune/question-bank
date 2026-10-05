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

/**
 * The signed-in daily limit (2026-10-05, owner): 50 answers a day free, on the
 * bank, the board reader and guides. `daily` is null while it is off, while
 * the student holds a pass, and before the count has loaded: in all three a
 * signed-in student is never walled (a pass holder must never see a lock
 * flash while the count is on its way).
 */
describe("revealDecision: signed-in daily limit", () => {
  const today = (n: number) => Array.from({ length: n }, (_, i) => `d${i}`);
  const signedIn = (n: number, questionId: string, limit = 50) =>
    revealDecision({ signedIn: true, revealedIds: [], questionId, daily: { limit, todayIds: today(n) } });

  it("is unlimited with no daily quota (off, pass, or not loaded yet)", () => {
    const d = revealDecision({ signedIn: true, revealedIds: [], questionId: "x", daily: null });
    expect(d.allow).toBe(true);
    expect(d.remaining).toBe(Infinity);
  });

  it("allows the 50th new answer of the day and adds it to today's list", () => {
    const d = signedIn(49, "new");
    expect(d.allow).toBe(true);
    expect(d.nextIds).toEqual([...today(49), "new"]);
    expect(d.remaining).toBe(0);
  });

  it("refuses the 51st with the daily wall, not the sign-in wall", () => {
    const d = signedIn(50, "new");
    expect(d.allow).toBe(false);
    expect(d.wall).toBe("daily");
    expect(d.nextIds).toEqual(today(50));
  });

  it("lets a question already answered today be opened again at the limit", () => {
    expect(signedIn(50, "d7").allow).toBe(true);
  });

  it("a signed-out refusal names the sign-in wall", () => {
    const d = revealDecision({ signedIn: false, revealedIds: ["a", "b", "c"], questionId: "z", limit: 3 });
    expect(d.wall).toBe("signin");
  });

  it("an allowed reveal names no wall", () => {
    expect(signedIn(3, "new").wall).toBeUndefined();
  });
});

describe("isRevealLocked: signed-in daily limit", () => {
  const daily = { limit: 2, todayIds: ["a", "b"] };

  it("locks a new question once today's answers are used", () => {
    expect(isRevealLocked({ signedIn: true, loading: false, revealedIds: [], questionId: "c", daily })).toBe(true);
  });
  it("never locks a question already answered today", () => {
    expect(isRevealLocked({ signedIn: true, loading: false, revealedIds: [], questionId: "a", daily })).toBe(false);
  });
  it("never locks a signed-in student with no daily quota", () => {
    expect(isRevealLocked({ signedIn: true, loading: false, revealedIds: [], questionId: "c", daily: null })).toBe(false);
  });
});
