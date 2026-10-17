import { describe, expect, it } from "vitest";
import { planSolutionSync, toPublish } from "../scripts/ssc-cgl/publish";
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

describe("toPublish", () => {
  const rows = [
    { id: "a", questionNumber: "34", visibility: "PRIVATE" },
    { id: "b", questionNumber: "35", visibility: "PRIVATE" },
    { id: "c", questionNumber: "36", visibility: "PUBLIC" },
    { id: "d", questionNumber: "59", visibility: "PRIVATE" },
  ];

  it("makes every PRIVATE row PUBLIC, except the question numbers held for the shift", () => {
    expect(toPublish(rows, [35, 59])).toEqual({ ids: ["a"], held: [35, 59] });
  });

  it("holds nothing when the shift holds nothing, and skips rows already PUBLIC", () => {
    expect(toPublish(rows, [])).toEqual({ ids: ["a", "b", "d"], held: [] });
  });

  it("refuses a held number the shift has no row for (a typo would silently publish nothing held)", () => {
    expect(() => toPublish(rows, [99])).toThrow(/Q99 is held but has no row/);
  });
});
