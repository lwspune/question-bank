import { describe, it, expect } from "vitest";
import { planAnswerFigures } from "../scripts/lib/figures/answerFigures";

const box = [0.1, 0.2, 0.9, 0.6] as [number, number, number, number];

describe("planAnswerFigures", () => {
  it("makes one crop job per question, in the order the answers name them", () => {
    const plan = planAnswerFigures([
      { ref: "Ex Q3(A)", figure: "Fig. 4.4", page: 48, bbox: box },
      { ref: "Ex Q3(B)", figure: "Fig. 4.6", page: 49, bbox: box },
    ]);
    expect(plan.errors).toEqual([]);
    expect(plan.jobs.map((j) => j.ref)).toEqual(["Ex Q3(A)", "Ex Q3(B)"]);
    expect(plan.jobs[0].parts).toEqual([{ page: 48, bbox: box }]);
  });

  it("stacks the parts of one question by part letter, whatever order they were written in", () => {
    const plan = planAnswerFigures([
      { ref: "Ex Q7(2)", part: "b", figure: "Fig. 9.19", page: 20, bbox: box },
      { ref: "Ex Q7(2)", part: "a", figure: "Fig. 9.21", page: 23, bbox: box },
    ]);
    expect(plan.errors).toEqual([]);
    expect(plan.jobs).toHaveLength(1);
    expect(plan.jobs[0].parts.map((p) => p.page)).toEqual([23, 20]);
  });

  it("records a question with no book figure as a decision, not a crop", () => {
    const plan = planAnswerFigures([{ ref: "Ex Q5(B)", part: "b", figure: null, page: null }]);
    expect(plan.errors).toEqual([]);
    expect(plan.jobs).toEqual([]);
    expect(plan.none).toEqual(["Ex Q5(B) (b)"]);
  });

  it("keeps the other parts of a question when one part has no figure", () => {
    const plan = planAnswerFigures([
      { ref: "Ex Q5(B)", part: "a", figure: "Fig. 16.37", page: 218, bbox: box },
      { ref: "Ex Q5(B)", part: "b", figure: null, page: null },
    ]);
    expect(plan.jobs[0].parts).toHaveLength(1);
    expect(plan.none).toEqual(["Ex Q5(B) (b)"]);
  });

  it("refuses a named figure with no box", () => {
    const plan = planAnswerFigures([{ ref: "Ex Q3(A)", figure: "Fig. 4.4", page: 48 }]);
    expect(plan.errors[0]).toMatch(/Ex Q3\(A\).*no bbox/);
    expect(plan.jobs).toEqual([]);
  });

  it("refuses a box outside the page or drawn backwards", () => {
    const outside = planAnswerFigures([{ ref: "A", figure: "F", page: 1, bbox: [0.1, 0.2, 1.2, 0.5] }]);
    const backwards = planAnswerFigures([{ ref: "B", figure: "F", page: 1, bbox: [0.6, 0.2, 0.4, 0.5] }]);
    expect(outside.errors[0]).toMatch(/A.*bbox/);
    expect(backwards.errors[0]).toMatch(/B.*bbox/);
  });

  it("refuses the same part twice and a question mixing parted and unparted entries", () => {
    const dup = planAnswerFigures([
      { ref: "Q", part: "a", figure: "F", page: 1, bbox: box },
      { ref: "Q", part: "a", figure: "G", page: 2, bbox: box },
    ]);
    const mixed = planAnswerFigures([
      { ref: "R", figure: "F", page: 1, bbox: box },
      { ref: "R", part: "b", figure: "G", page: 2, bbox: box },
    ]);
    expect(dup.errors[0]).toMatch(/Q.*part "a" twice/);
    expect(mixed.errors[0]).toMatch(/R.*mixes/);
  });
});
