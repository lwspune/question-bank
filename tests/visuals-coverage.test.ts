import { describe, expect, it } from "vitest";
import { coverageState, summarise, type CoverageQuestion } from "@/lib/visuals/coverage";
import { ARC_SOLUTION, ARC_VISUAL } from "./fixtures/visuals";

const q = (over: Partial<CoverageQuestion>): CoverageQuestion => ({
  id: "q",
  exam: "JEE Mains",
  subject: "Maths",
  chapter: "Circles",
  solution: ARC_SOLUTION,
  visual: null,
  answers: 0,
  ...over,
});

describe("coverageState", () => {
  it("is animated for a usable visual whose steps fit the stored solution", () => {
    expect(coverageState(q({ visual: ARC_VISUAL }), undefined)).toBe("animated");
  });
  it("is stale when the solution changed after the visual was made, or the visual no longer checks", () => {
    expect(coverageState(q({ visual: ARC_VISUAL, solution: ARC_SOLUTION + " Edited." }), undefined)).toBe("stale");
    expect(coverageState(q({ visual: { ...ARC_VISUAL, answer: { value: 9, label: "9" } } }), undefined)).toBe("stale");
  });
  it("uses the recorded verdict for a question without a visual", () => {
    expect(coverageState(q({}), "none")).toBe("none");
    expect(coverageState(q({}), "still")).toBe("still");
    expect(coverageState(q({}), "noFit")).toBe("noFit");
  });
  it("lets a live visual win over an older verdict, and is notReviewed with neither", () => {
    expect(coverageState(q({ visual: ARC_VISUAL }), "noFit")).toBe("animated");
    expect(coverageState(q({}), undefined)).toBe("notReviewed");
  });
});

describe("summarise", () => {
  it("counts states per chapter and weights coverage by mock answers", () => {
    const qs = [
      q({ id: "a", visual: ARC_VISUAL, answers: 30 }),
      q({ id: "b", answers: 10 }),
      q({ id: "c", answers: 0 }),
      q({ id: "d", chapter: "Vectors", answers: 60 }),
    ];
    const verdicts = new Map([["b", "none" as const]]);
    const s = summarise(qs, verdicts);
    const circles = s.rows.find((r) => r.chapter === "Circles")!;
    expect(circles.counts).toMatchObject({ animated: 1, none: 1, notReviewed: 1 });
    expect(circles.total).toBe(3);
    expect(s.total.counts.notReviewed).toBe(2);
    // 30 of 100 mock answers fall on animated questions.
    expect(s.total.answersCoveredShare).toBeCloseTo(0.3, 9);
    // Reviewed = everything except notReviewed and stale.
    expect(s.total.reviewedShare).toBeCloseTo(2 / 4, 9);
  });
  it("orders chapters by mock answers, busiest first", () => {
    const s = summarise([q({ id: "a", chapter: "Quiet", answers: 1 }), q({ id: "b", chapter: "Busy", answers: 50 })], new Map());
    expect(s.rows.map((r) => r.chapter)).toEqual(["Busy", "Quiet"]);
  });
});
