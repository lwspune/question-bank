import { describe, expect, it } from "vitest";
import { planSolutionSync } from "../scripts/ssc-cgl/publish";
import { parseTranscript } from "../scripts/ssc-cgl/lib";

const block = (n: number, extra = "") =>
  `=== ${n}\nchapter: c\nsubtopic: s\ndifficulty: EASY\nanswer: A\n${extra}stem:\nx\nA: a\nB: b\nC: c\nD: d\nsolution:\nWorked.\n`;

describe("planSolutionSync", () => {
  const blocks = parseTranscript(block(1) + block(2, "flawed: yes\nnotice: Printed in Hindi only.\n") + block(3, "flawed: yes\nnotice: Cut off.\n"));

  it("adds the notice to a row still holding the solution as committed, and leaves a row with no notice alone", () => {
    const plan = planSolutionSync(blocks, [
      { id: "r1", questionNumber: "1", solution: "Worked." },
      { id: "r2", questionNumber: "2", solution: "Worked." },
    ]);
    expect(plan.updates).toEqual([{ id: "r2", number: 2, solution: "**Note:** Printed in Hindi only.\n\nWorked." }]);
    expect(plan.current).toBe(1);
  });

  it("counts a row that already carries its notice as current, so a re-run writes nothing", () => {
    const plan = planSolutionSync(blocks, [{ id: "r2", questionNumber: "2", solution: "**Note:** Printed in Hindi only.\n\nWorked." }]);
    expect(plan.updates).toEqual([]);
    expect(plan.current).toBe(1);
  });

  it("never overwrites a solution edited in the bank since commit: it is reported instead", () => {
    const plan = planSolutionSync(blocks, [{ id: "r3", questionNumber: "3", solution: "Fixed by hand." }]);
    expect(plan.updates).toEqual([]);
    expect(plan.edited).toEqual([3]);
  });

  it("reports a block with no row of its own (a repeat kept under an earlier shift)", () => {
    const plan = planSolutionSync(blocks, [{ id: "r1", questionNumber: "1", solution: "Worked." }]);
    expect(plan.absent).toEqual([2, 3]);
  });
});
