import { describe, expect, it } from "vitest";
import { crossCheckProblem } from "../scripts/stateboard/crossCheckGate";

// 2026-11-17 (SUGGESTIONS 2026-09-02): Rotational Dynamics reached one command from
// PUBLIC with its step-6 book-answer cross-check never run. A skipped step leaves only
// a missing file, so flip-public now asks for the dump the cross-check reads.
describe("crossCheckProblem", () => {
  it("passes a chapter whose book prints no answers at all (the gate cannot run there)", () => {
    expect(crossCheckProblem(0, null)).toBeNull();
  });

  it("refuses when the book prints answers but the dump was never made", () => {
    expect(crossCheckProblem(12, null)).toMatch(/dump-book-answers/);
  });

  it("refuses when the dump is short of the book's keyed rows", () => {
    const dump = [{ ref: "Ex Q.1", our_solution: "x = 2" }];
    expect(crossCheckProblem(3, dump)).toMatch(/1 of 3/);
  });

  it("refuses a dumped row that has no solution of ours beside the book's answer", () => {
    const dump = [
      { ref: "Ex Q.1", our_solution: "x = 2" },
      { ref: "Ex Q.2", our_solution: "  " },
    ];
    expect(crossCheckProblem(2, dump)).toMatch(/Ex Q\.2/);
  });

  it("passes a complete dump", () => {
    const dump = [
      { ref: "Ex Q.1", our_solution: "x = 2" },
      { ref: "Ex Q.2", our_solution: "y = 3" },
    ];
    expect(crossCheckProblem(2, dump)).toBeNull();
  });
});
