/**
 * "3 of your last 4 on <subtopic> were wrong. Want help with the idea behind
 * it?" (owner, 2026-11-10): the offer under a bank answer. Pure core
 * src/lib/questions/stuckOffer.ts.
 */
import { describe, it, expect } from "vitest";
import { isStuck, newlyStuck, parseStuckOffer, pickEasier, stuckOfferLine } from "@/lib/questions/stuckOffer";

// true = right, oldest first
const R = true;
const W = false;

describe("isStuck: 3 wrong among the last 4 answers on the subtopic (fewer if fewer)", () => {
  it("is true for 3 of 3, 3 in a row after a right one, and 3 of 4 with a right between", () => {
    expect(isStuck([W, W, W])).toBe(true);
    expect(isStuck([R, W, W, W])).toBe(true);
    expect(isStuck([W, R, W, W])).toBe(true);
  });

  it("is false while they are getting it, or with fewer than 3 answers", () => {
    expect(isStuck([W, W, R, R])).toBe(false);
    expect(isStuck([W, W])).toBe(false);
    expect(isStuck([])).toBe(false);
  });

  it("looks only at the last 4", () => {
    expect(isStuck([W, W, W, R, R, W, R])).toBe(false);
  });
});

describe("newlyStuck: only the answer that makes it true", () => {
  it("fires on the 3rd wrong", () => {
    expect(newlyStuck([W, W, W])).toBe(true);
    expect(newlyStuck([R, W, W, W])).toBe(true);
    expect(newlyStuck([W, R, W, W])).toBe(true);
  });

  it("does not fire again on the next wrong answer of the same streak", () => {
    expect(newlyStuck([W, W, W, W])).toBe(false);
  });

  it("fires again only when a new 3 of 4 forms after they got some right", () => {
    expect(newlyStuck([W, W, W, R, R, W, W, W])).toBe(true);
  });

  it("never fires on a right answer", () => {
    expect(newlyStuck([W, W, W, R])).toBe(false);
  });
});

describe("stuckOfferLine", () => {
  it("says 3 of 4, or 'your last 3' when all of them were wrong", () => {
    expect(stuckOfferLine("Coulomb's Law", [R, W, W, W])).toBe("Your last 3 on Coulomb's Law were wrong. Want help with the idea behind it?");
    expect(stuckOfferLine("Coulomb's Law", [W, W, W])).toBe("Your last 3 on Coulomb's Law were wrong. Want help with the idea behind it?");
    expect(stuckOfferLine("Coulomb's Law", [W, R, W, W])).toBe("3 of your last 4 on Coulomb's Law were wrong. Want help with the idea behind it?");
  });
});

describe("pickEasier: an easy question from the subtopic they have not answered", () => {
  const answered = new Set(["a"]);

  it("takes an EASY one they have not answered", () => {
    const c = [
      { id: "a", difficulty: "EASY", peerPct: null },
      { id: "b", difficulty: "HARD", peerPct: null },
      { id: "c", difficulty: "EASY", peerPct: null },
    ];
    expect(pickEasier(c, answered)).toBe("c");
  });

  it("when the subtopic's labels are all the same, takes one 60%+ of other students got right", () => {
    const c = [
      { id: "b", difficulty: "MODERATE", peerPct: 40 },
      { id: "c", difficulty: "MODERATE", peerPct: 72 },
    ];
    expect(pickEasier(c, answered)).toBe("c");
  });

  it("is null when there is nothing easier to offer", () => {
    expect(pickEasier([{ id: "a", difficulty: "EASY", peerPct: null }], answered)).toBeNull();
    expect(pickEasier([{ id: "b", difficulty: "MODERATE", peerPct: null }], answered)).toBeNull();
    expect(pickEasier([{ id: "b", difficulty: "HARD", peerPct: 90 }, { id: "c", difficulty: "MODERATE", peerPct: 90 }], answered)).toBeNull();
  });
});

describe("parseStuckOffer: the reply the page reads", () => {
  const ok = { questionId: "11111111-1111-4111-8111-111111111111", subtopic: "Coulomb's Law", history: [R, W, W, W], easierId: null };

  it("reads a valid offer", () => {
    expect(parseStuckOffer(ok)).toEqual(ok);
    expect(parseStuckOffer({ ...ok, easierId: "22222222-2222-4222-8222-222222222222" })?.easierId).toBe("22222222-2222-4222-8222-222222222222");
  });

  it("refuses anything else", () => {
    expect(parseStuckOffer(null)).toBeNull();
    expect(parseStuckOffer({ ...ok, questionId: "x" })).toBeNull();
    expect(parseStuckOffer({ ...ok, history: [R, R] })).toBeNull();
    expect(parseStuckOffer({ ...ok, subtopic: "" })).toBeNull();
  });
});
