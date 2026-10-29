import { describe, expect, it } from "vitest";
import { planVisualBatch, type BatchRow, type VisualBatch } from "@/lib/visuals/batch";
import { ARC_SOLUTION, ARC_VISUAL, QUAD_SOLUTION, QUAD_VISUAL } from "./fixtures/visuals";

const ARC_ID = "08561a61-44a3-40fb-b702-71d7505aea8a";
const QUAD_ID = "cd89fce7-42ab-400b-86ee-85956a619683";
const NUM_ID = "11111111-2222-4333-8444-555555555555";
const OTHER_ID = "99999999-2222-4333-8444-555555555555";

function rows(over: Partial<Record<string, Partial<BatchRow>>> = {}): Map<string, BatchRow> {
  const base: BatchRow[] = [
    { id: ARC_ID, solution: ARC_SOLUTION, solution_visual: null, question_format: "mcq", numeric_answer: null, correct: ["D"] },
    { id: QUAD_ID, solution: QUAD_SOLUTION, solution_visual: null, question_format: "mcq", numeric_answer: null, correct: ["B"] },
    { id: NUM_ID, solution: QUAD_SOLUTION, solution_visual: null, question_format: "numeric", numeric_answer: 2, correct: [] },
  ];
  return new Map(base.map((r) => [r.id, { ...r, ...(over[r.id] ?? {}) }]));
}

const batch = (b: Partial<VisualBatch>): VisualBatch => ({ visuals: [], ...b });

describe("planVisualBatch", () => {
  it("writes a visual that parses, fits the stored solution, passes its check and names the key", () => {
    const plan = planVisualBatch(batch({ visuals: [{ id: ARC_ID, option: "D", visual: ARC_VISUAL }] }), rows(), {});
    expect(plan.problems).toEqual([]);
    expect(plan.write).toEqual([{ id: ARC_ID, visual: ARC_VISUAL }]);
  });

  it("refuses an option that is not the database key", () => {
    const plan = planVisualBatch(batch({ visuals: [{ id: ARC_ID, option: "C", visual: ARC_VISUAL }] }), rows(), {});
    expect(plan.write).toEqual([]);
    expect(plan.problems.join()).toMatch(/key/);
  });

  it("refuses an MCQ visual with no option named", () => {
    const plan = planVisualBatch(batch({ visuals: [{ id: ARC_ID, visual: ARC_VISUAL }] }), rows(), {});
    expect(plan.problems.join()).toMatch(/option/);
  });

  it("compares a numeric question's answer with the stored numeric answer", () => {
    const visual = { ...QUAD_VISUAL };
    expect(planVisualBatch(batch({ visuals: [{ id: NUM_ID, visual }] }), rows(), {}).problems).toEqual([]);
    const off = planVisualBatch(batch({ visuals: [{ id: NUM_ID, visual }] }), rows({ [NUM_ID]: { numeric_answer: 3 } }), {});
    expect(off.problems.join()).toMatch(/numeric answer/);
  });

  it("refuses a visual mapped against a different solution than the stored one", () => {
    const plan = planVisualBatch(batch({ visuals: [{ id: ARC_ID, option: "D", visual: ARC_VISUAL }] }), rows({ [ARC_ID]: { solution: ARC_SOLUTION + " More." } }), {});
    expect(plan.problems.join()).toMatch(/solution/);
  });

  it("refuses a visual whose self-check disagrees with its answer", () => {
    const wrong = { ...ARC_VISUAL, answer: { value: 1, label: "1" } };
    const plan = planVisualBatch(batch({ visuals: [{ id: ARC_ID, option: "D", visual: wrong }] }), rows(), {});
    expect(plan.problems.join()).toMatch(/check/);
  });

  it("refuses a missing question and an id listed twice", () => {
    expect(planVisualBatch(batch({ visuals: [{ id: OTHER_ID, option: "A", visual: ARC_VISUAL }] }), rows(), {}).problems.join()).toMatch(/no such question/);
    const twice = planVisualBatch(
      batch({ visuals: [{ id: ARC_ID, option: "D", visual: ARC_VISUAL }], decided: [{ id: ARC_ID, verdict: "none", reason: "recall" }] }),
      rows(),
      {},
    );
    expect(twice.problems.join()).toMatch(/twice/);
  });

  it("leaves an identical visual alone and refuses to replace a different one without replace", () => {
    const same = planVisualBatch(batch({ visuals: [{ id: ARC_ID, option: "D", visual: ARC_VISUAL }] }), rows({ [ARC_ID]: { solution_visual: ARC_VISUAL } }), {});
    expect(same.write).toEqual([]);
    expect(same.already).toEqual([ARC_ID]);
    const other = { ...ARC_VISUAL, steps: [{ from: 0, beats: ["oneRadian", "compare", "angle"] }] };
    const blocked = planVisualBatch(batch({ visuals: [{ id: ARC_ID, option: "D", visual: other }] }), rows({ [ARC_ID]: { solution_visual: ARC_VISUAL } }), {});
    expect(blocked.problems.join()).toMatch(/already has/);
    const replaced = planVisualBatch(batch({ visuals: [{ id: ARC_ID, option: "D", visual: other }] }), rows({ [ARC_ID]: { solution_visual: ARC_VISUAL } }), { replace: true });
    expect(replaced.write).toHaveLength(1);
  });

  it("checks decided entries: a known verdict and a reason", () => {
    const ok = planVisualBatch(batch({ decided: [{ id: QUAD_ID, verdict: "noFit", reason: "needs a vector scene" }] }), rows(), {});
    expect(ok.problems).toEqual([]);
    const bad = planVisualBatch(batch({ decided: [{ id: QUAD_ID, verdict: "maybe" as "none", reason: "" }] }), rows(), {});
    expect(bad.problems.length).toBeGreaterThan(0);
  });

  it("lets a noFit carry a short situation word, so the pile can be sorted by what a new scene would unlock", () => {
    const ok = planVisualBatch(batch({ decided: [{ id: QUAD_ID, verdict: "noFit", reason: "functionGraph: asks for k", situation: "findK" }] }), rows(), {});
    expect(ok.problems).toEqual([]);
    for (const situation of ["find K", "x".repeat(30), "", "Roots"]) {
      const bad = planVisualBatch(batch({ decided: [{ id: QUAD_ID, verdict: "noFit", reason: "r", situation }] }), rows(), {});
      expect(bad.problems.length, situation).toBeGreaterThan(0);
    }
    // Only a noFit has a situation: a still or none verdict is not waiting for a scene.
    const still = planVisualBatch(batch({ decided: [{ id: QUAD_ID, verdict: "still", reason: "r", situation: "findK" }] }), rows(), {});
    expect(still.problems.length).toBeGreaterThan(0);
  });
});
