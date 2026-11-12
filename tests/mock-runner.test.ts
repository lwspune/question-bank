import { describe, it, expect } from "vitest";
import {
  groupBySection,
  submitSummary,
  runnerKeyAction,
  crossedTimeWarning,
  beginSave,
  failSave,
  succeedSave,
  emptySaveTracker,
} from "@/lib/mocks/runner";
import type { OptionLabel, SavedResponse } from "@/lib/mocks/answers";

type Row = SavedResponse & { isFlagged: boolean };
const answered = (label: string, isFlagged = false): Row => ({
  selectedLabel: label as OptionLabel,
  numericResponse: null,
  isFlagged,
});
const blank = (isFlagged = false): Row => ({ selectedLabel: null, numericResponse: null, isFlagged });

const SECTIONS = [
  { key: "english", label: "English" },
  { key: "gk", label: "General Knowledge" },
];
const q = (position: number, sectionKey: string) => ({ questionId: `q${position}`, position, sectionKey });

describe("groupBySection", () => {
  it("groups question indices under each section, in the paper's section order", () => {
    const qs = [q(1, "english"), q(2, "english"), q(3, "gk"), q(4, "gk"), q(5, "gk")];
    expect(groupBySection(qs, SECTIONS)).toEqual([
      { key: "english", label: "English", indices: [0, 1], first: 1, last: 2 },
      { key: "gk", label: "General Knowledge", indices: [2, 3, 4], first: 3, last: 5 },
    ]);
  });

  it("keeps a question whose section is not listed, under its own key, rather than dropping it", () => {
    // Dropping it would hide a question from the only control that finds it.
    const groups = groupBySection([q(1, "english"), q(2, "mystery")], SECTIONS);
    expect(groups.map((g) => g.indices)).toEqual([[0], [1]]);
    expect(groups[1].label).toBe("mystery");
  });

  it("omits a listed section with no questions", () => {
    expect(groupBySection([q(1, "gk")], SECTIONS).map((g) => g.key)).toEqual(["gk"]);
  });
});

describe("submitSummary", () => {
  const qs = [q(1, "english"), q(2, "english"), q(3, "english"), q(4, "gk"), q(5, "gk")];

  it("counts each palette state and the answered total per section", () => {
    const s = submitSummary(
      qs,
      {
        q1: answered("A"),
        q2: answered("B", true), // answered, then marked
        q3: blank(true), // marked, no answer
        q4: blank(), // visited, no answer
        // q5 never opened
      },
      SECTIONS
    );
    expect(s.counts).toEqual({ answered: 1, answered_flagged: 1, flagged: 1, not_answered: 1, not_visited: 1 });
    // "Answered" on the confirm screen is everything that will be graded: marked or not.
    expect(s.answeredTotal).toBe(2);
    expect(s.bySection).toEqual([
      { key: "english", label: "English", answered: 2, total: 3 },
      { key: "gk", label: "General Knowledge", answered: 0, total: 2 },
    ]);
  });
});

describe("runnerKeyAction", () => {
  const labels = ["A", "B", "C", "D"] as const;
  const press = (key: string, extra: Partial<{ hasModifier: boolean; inTextField: boolean }> = {}) =>
    runnerKeyAction({ key, hasModifier: false, inTextField: false, ...extra }, labels);

  it("picks an option by its letter, in either case", () => {
    expect(press("b")).toEqual({ type: "pick", label: "B" });
    expect(press("D")).toEqual({ type: "pick", label: "D" });
  });

  it("ignores a letter that is not one of this question's options", () => {
    expect(press("E")).toBeNull();
    expect(runnerKeyAction({ key: "c", hasModifier: false, inTextField: false }, [])).toBeNull();
  });

  it("moves with the arrow keys and marks with M", () => {
    expect(press("ArrowLeft")).toEqual({ type: "prev" });
    expect(press("ArrowRight")).toEqual({ type: "next" });
    expect(press("m")).toEqual({ type: "mark" });
  });

  it("does nothing while the student types in an answer box", () => {
    // A JEE numeric box: arrows move the caret, letters are not shortcuts.
    expect(press("ArrowLeft", { inTextField: true })).toBeNull();
    expect(press("a", { inTextField: true })).toBeNull();
  });

  it("leaves browser shortcuts alone (Ctrl/Cmd/Alt held)", () => {
    expect(press("c", { hasModifier: true })).toBeNull();
    expect(press("ArrowRight", { hasModifier: true })).toBeNull();
  });
});

describe("crossedTimeWarning", () => {
  it("fires once as the clock passes 10, 5 and 1 minutes", () => {
    expect(crossedTimeWarning(601, 600)).toBe(600);
    expect(crossedTimeWarning(600, 599)).toBeNull();
    expect(crossedTimeWarning(301, 300)).toBe(300);
    expect(crossedTimeWarning(61, 60)).toBe(60);
  });

  it("gives the most urgent one when a sleeping tab jumps past several", () => {
    expect(crossedTimeWarning(700, 120)).toBe(300);
    expect(crossedTimeWarning(700, 30)).toBe(60);
  });

  it("says nothing on a resumed test that opens below a mark, or at zero", () => {
    // The resumed tab's first tick compares the clock with itself.
    expect(crossedTimeWarning(240, 240)).toBeNull();
    expect(crossedTimeWarning(5, 0)).toBeNull();
  });
});

describe("save tracker", () => {
  const row1 = answered("A");
  const row2 = answered("B");

  it("shows a failed save until that question saves again", () => {
    let t = beginSave(emptySaveTracker<Row>(), "q1", 1);
    t = failSave(t, "q1", 1, row1);
    expect(t.failed).toEqual({ q1: row1 });
    t = beginSave(t, "q1", 2);
    t = succeedSave(t, "q1", 2);
    expect(t.failed).toEqual({});
  });

  it("forgets a failed save once a newer save for the question starts", () => {
    // Otherwise a retry could send the OLD answer after the new one.
    let t = failSave(beginSave(emptySaveTracker<Row>(), "q1", 1), "q1", 1, row1);
    t = beginSave(t, "q1", 2);
    expect(t.failed).toEqual({});
  });

  it("ignores the late failure of an older save once a newer one exists", () => {
    let t = beginSave(emptySaveTracker<Row>(), "q1", 1);
    t = beginSave(t, "q1", 2);
    t = failSave(t, "q1", 1, row1);
    expect(t.failed).toEqual({});
    t = failSave(t, "q1", 2, row2);
    expect(t.failed).toEqual({ q1: row2 });
  });

  it("keeps a newer failure when an older save succeeds late", () => {
    let t = beginSave(emptySaveTracker<Row>(), "q1", 1);
    t = beginSave(t, "q1", 2);
    t = failSave(t, "q1", 2, row2);
    t = succeedSave(t, "q1", 1);
    expect(t.failed).toEqual({ q1: row2 });
  });

  it("tracks questions independently", () => {
    let t = beginSave(beginSave(emptySaveTracker<Row>(), "q1", 1), "q2", 2);
    t = failSave(t, "q1", 1, row1);
    t = succeedSave(t, "q2", 2);
    expect(Object.keys(t.failed)).toEqual(["q1"]);
  });
});
