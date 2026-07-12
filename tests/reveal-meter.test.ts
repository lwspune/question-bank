import { describe, it, expect } from "vitest";
import { revealDecision, FREE_REVEAL_LIMIT } from "@/lib/questions/revealMeter";

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
});
