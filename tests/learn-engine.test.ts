/**
 * The Learn tab's engine, copied from Concept Ladder (src/engine/*.test.ts at afca8bf) with its
 * tests. Dropped: `gateFor` and MASTERY_GATE (roles are Concept Ladder's; here the caller
 * passes `gate`), and the cases that read Concept Ladder's content files (replaced by
 * synthetic graphs and items that test the same property).
 */
import { describe, expect, it } from "vitest";
import { ancestorsOf, type GraphNode } from "@/lib/learn/engine/graph";
import { conceptStates, inScope, nextConceptAfter } from "@/lib/learn/engine/unlock";
import { nextItem } from "@/lib/learn/engine/nextItem";
import { daysUntil, isReviewDue } from "@/lib/learn/engine/review";
import { displayOrder } from "@/lib/learn/engine/optionOrder";

function node(id: string, prereqs: string[] = []): GraphNode {
  return { id, prereqs };
}

// A ← B ← C ← D  (D needs C needs B needs A)
const chain = [node("A"), node("B", ["A"]), node("C", ["B"]), node("D", ["C"])];

describe("ancestorsOf", () => {
  it("follows prerequisites all the way up, without the concept itself", () => {
    expect(ancestorsOf(chain, "D")).toEqual(new Set(["C", "B", "A"]));
    expect(ancestorsOf(chain, "A")).toEqual(new Set());
  });
});

describe("nextConceptAfter", () => {
  const all = new Set(["A", "B", "C", "D"]);

  it("is the concept that mastering this one opens", () => {
    expect(nextConceptAfter(chain, all, new Map(), "A", true)).toBe("B");
  });

  it("prefers a concept already in progress, then new ones in chapter order", () => {
    const fan = [node("A"), node("B", ["A"]), node("C", ["A"]), node("D")];
    expect(nextConceptAfter(fan, all, new Map([["C", "learning"]]), "A", true)).toBe("C");
    expect(nextConceptAfter(fan, all, new Map(), "A", true)).toBe("B");
  });

  it("never offers the concept just mastered, and is null when nothing open remains", () => {
    expect(nextConceptAfter(chain, all, new Map([["A", "mastered"], ["B", "mastered"], ["C", "mastered"]]), "D", true)).toBeNull();
    expect(nextConceptAfter([node("A")], new Set(["A"]), new Map(), "A", true)).toBeNull();
  });

  it("skips unpublished and still-locked concepts", () => {
    expect(nextConceptAfter(chain, new Set(["A", "C"]), new Map(), "A", true)).toBe("C");
    const twoRoots = [node("A"), node("B"), node("C", ["A", "B"])];
    expect(nextConceptAfter(twoRoots, new Set(["A", "B", "C"]), new Map(), "A", true)).toBe("B");
  });
});

describe("inScope", () => {
  it("keeps only the published concepts a course covers", () => {
    expect(inScope(new Set(["A", "B", "C"]), new Set(["A", "C", "D"]))).toEqual(new Set(["A", "C"]));
  });

  it("is everything published when there is no course", () => {
    expect(inScope(new Set(["A", "B"]))).toEqual(new Set(["A", "B"]));
  });
});

describe("conceptStates", () => {
  it("with the gate off, opens every published concept whatever the learner has mastered", () => {
    const s = conceptStates(chain, new Set(["A", "C", "D"]), new Map(), false);
    expect([s.get("A"), s.get("C"), s.get("D")]).toEqual(["available", "available", "available"]);
  });

  it("with the gate off, still keeps progress and still hides unpublished concepts", () => {
    const s = conceptStates(chain, new Set(["A", "B", "C"]), new Map([["A", "mastered"], ["B", "learning"]]), false);
    expect([s.get("A"), s.get("B"), s.get("C"), s.get("D")]).toEqual(["mastered", "learning", "available", "unpublished"]);
  });

  it("marks concepts without published content as unpublished", () => {
    const s = conceptStates(chain, new Set(["A"]), new Map(), true);
    expect(s.get("B")).toBe("unpublished");
  });

  it("opens a published concept whose published ancestors are all mastered", () => {
    const published = new Set(["A", "C"]);
    expect(conceptStates(chain, published, new Map(), true).get("C")).toBe("locked");
    expect(conceptStates(chain, published, new Map([["A", "mastered"]]), true).get("C")).toBe("available");
  });

  it("looks through unpublished concepts to published ancestors", () => {
    // D's nearest published ancestor is A, two steps up through unpublished B and C.
    const published = new Set(["A", "D"]);
    expect(conceptStates(chain, published, new Map(), true).get("D")).toBe("locked");
    expect(conceptStates(chain, published, new Map([["A", "mastered"]]), true).get("D")).toBe("available");
  });

  it("treats an unpublished prerequisite as known", () => {
    expect(conceptStates(chain, new Set(["B"]), new Map(), true).get("B")).toBe("available");
  });

  it("keeps the learner's own progress", () => {
    const s = conceptStates(chain, new Set(["A", "B"]), new Map([["A", "mastered"], ["B", "learning"]]), true);
    expect(s.get("A")).toBe("mastered");
    expect(s.get("B")).toBe("learning");
  });

  it("opens every root for a new learner, and what mastering them unlocks", () => {
    // Two roots (R1, R2); X needs R1; Y needs R1 and R2; Z needs Y.
    const g = [node("R1"), node("R2"), node("X", ["R1"]), node("Y", ["R1", "R2"]), node("Z", ["Y"])];
    const published = new Set(["R1", "R2", "X", "Y", "Z"]);
    const open = (learner: Map<string, "learning" | "mastered">) =>
      [...published].filter((id) => conceptStates(g, published, learner, true).get(id) === "available").sort();
    expect(open(new Map())).toEqual(["R1", "R2"]);
    expect(open(new Map([["R1", "mastered"]]))).toEqual(["R2", "X"]);
    expect(open(new Map([["R1", "mastered"], ["R2", "mastered"]]))).toEqual(["X", "Y"]);
  });
});

describe("nextItem", () => {
  const items = ["Q1", "Q2", "Q3", "Q4", "Q5"];
  const a = (itemId: string, correct: boolean) => ({ itemId, correct });
  const fresh = (itemId: string) => ({ itemId, retry: false });
  const retry = (itemId: string) => ({ itemId, retry: true });

  it("starts with the first item", () => {
    expect(nextItem(items, [])).toEqual(fresh("Q1"));
  });

  it("offers a question not yet answered right, never one whose last answer was right", () => {
    expect(nextItem(items, [a("Q1", true)])).toEqual(fresh("Q2"));
    expect(nextItem(items, [a("Q1", true), a("Q2", true), a("Q3", true)])).toEqual(fresh("Q4"));
  });

  it("brings a missed question back after one other question", () => {
    expect(nextItem(items, [a("Q1", false)])).toEqual(fresh("Q2"));
    expect(nextItem(items, [a("Q1", false), a("Q2", true)])).toEqual(retry("Q1"));
  });

  it("keeps bringing it back until it is answered right", () => {
    expect(nextItem(items, [a("Q1", false), a("Q2", true), a("Q1", false), a("Q3", true)])).toEqual(retry("Q1"));
    expect(nextItem(items, [a("Q1", false), a("Q2", true), a("Q1", true)])).toEqual(fresh("Q3"));
  });

  it("brings the oldest miss back first", () => {
    expect(nextItem(items, [a("Q1", false), a("Q2", false), a("Q3", true)])).toEqual(retry("Q1"));
  });

  it("brings a miss straight back when there is no other question to ask", () => {
    expect(nextItem(["Q1", "Q2"], [a("Q2", true), a("Q1", false)])).toEqual(retry("Q1"));
  });

  it("once every question is right, practises the one answered longest ago", () => {
    expect(nextItem(["Q1", "Q2"], [a("Q1", true), a("Q2", true)])).toEqual(fresh("Q1"));
  });

  it("refuses a concept with no questions", () => {
    expect(() => nextItem([], [])).toThrow();
  });
});

const NOW = Date.parse("2026-10-13T10:00:00Z");

describe("isReviewDue", () => {
  it("is due when mastered and the review time has passed", () => {
    expect(isReviewDue("mastered", "2026-10-13T09:59:00Z", NOW)).toBe(true);
    expect(isReviewDue("mastered", "2026-10-13T10:00:00Z", NOW)).toBe(true);
  });

  it("is not due before the review time", () => {
    expect(isReviewDue("mastered", "2026-10-14T10:00:00Z", NOW)).toBe(false);
  });

  it("is never due for a concept that isn't mastered or has no schedule", () => {
    expect(isReviewDue("learning", "2026-10-01T00:00:00Z", NOW)).toBe(false);
    expect(isReviewDue("mastered", null, NOW)).toBe(false);
  });
});

describe("daysUntil", () => {
  it("rounds to whole days, at least 1 for any future time", () => {
    expect(daysUntil("2026-10-16T10:00:00Z", NOW)).toBe(3);
    expect(daysUntil("2026-10-14T09:00:00Z", NOW)).toBe(1);
    expect(daysUntil("2026-10-13T10:30:00Z", NOW)).toBe(1);
  });

  it("is 0 for a time that has passed", () => {
    expect(daysUntil("2026-10-12T10:00:00Z", NOW)).toBe(0);
  });
});

describe("displayOrder", () => {
  const opts = ["A", "B", "C", "D"].map((key) => ({ key }));
  const USER = "00000000-0000-4000-8000-000000000001";
  // 120 items authored with the correct answer first, as many of Concept Ladder's were.
  const authoredA = Array.from({ length: 120 }, (_, i) => ({
    id: `C01-Q${i + 1}`,
    options: ["A", "B", "C", "D"].map((key) => ({ key, correct: key === "A" })),
  }));

  it("keeps every option exactly once", () => {
    const shown = displayOrder(opts, `${USER}:item-1`);
    expect(shown.map((o) => o.key).sort()).toEqual(["A", "B", "C", "D"]);
  });

  it("labels options A, B, C, D by display position", () => {
    expect(displayOrder(opts, `${USER}:item-1`).map((o) => o.label)).toEqual(["A", "B", "C", "D"]);
  });

  it("gives the same order for the same seed, so a reload doesn't reshuffle", () => {
    expect(displayOrder(opts, `${USER}:item-1`)).toEqual(displayOrder(opts, `${USER}:item-1`));
  });

  it("does not mutate its input", () => {
    const input = opts.map((o) => ({ ...o }));
    displayOrder(input, "seed");
    expect(input.map((o) => o.key)).toEqual(["A", "B", "C", "D"]);
  });

  it("spreads the correct answer over all positions", () => {
    const counts = [0, 0, 0, 0];
    for (const item of authoredA) counts[displayOrder(item.options, `${USER}:${item.id}`).findIndex((o) => o.correct)]++;
    for (const n of counts) {
      expect(n).toBeGreaterThan(0);
      expect(n).toBeLessThan(authoredA.length / 2);
    }
  });
});
