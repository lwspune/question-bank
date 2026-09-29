import { describe, it, expect } from "vitest";
import { planFileEdits } from "../scripts/cds-maths/reshapeFiles";

const base = {
  pid: "2021-2",
  chapter: "Time and Work",
  order: ["Work Rates", "Man-Days", "Pipes and Cisterns"],
  whole: {} as Record<string, string>,
};

describe("planFileEdits — the per-paper data side of a CDS re-cut", () => {
  it("moves a row to the subtopic its bank row now has", () => {
    const list = [{ number: 12, chapter: "Time and Work", subtopic: "Time and Work" }];
    const byKey = new Map([["2021-2#12", "Man-Days"]]);
    expect(planFileEdits(list, { ...base, byKey })).toEqual({ changes: [{ index: 0, to: "Man-Days" }], problems: [] });
  });

  it("reports a withheld row (no bank row, no whole move) instead of leaving a dead subtopic", () => {
    const list = [{ number: 39, chapter: "Time and Work", subtopic: "Time and Work" }];
    const out = planFileEdits(list, { ...base, byKey: new Map() });
    expect(out.changes).toEqual([]);
    expect(out.problems).toHaveLength(1);
    expect(out.problems[0]).toMatch(/2021-2 Q39/);
  });

  it("lets a withheld row follow a whole-subtopic move", () => {
    const list = [{ number: 39, chapter: "Time and Work", subtopic: "Pipes" }];
    const out = planFileEdits(list, { ...base, whole: { Pipes: "Pipes and Cisterns" }, byKey: new Map() });
    expect(out).toEqual({ changes: [{ index: 0, to: "Pipes and Cisterns" }], problems: [] });
  });

  it("keeps a withheld row already in a teaching subtopic, and ignores other chapters", () => {
    const list = [
      { number: 39, chapter: "Time and Work", subtopic: "Work Rates" },
      { number: 40, chapter: "Averages", subtopic: "Anything" },
    ];
    expect(planFileEdits(list, { ...base, byKey: new Map() })).toEqual({ changes: [], problems: [] });
  });
});
