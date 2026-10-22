import { describe, it, expect } from "vitest";
import { pickRenames, planSubtopicMoves, staleSolutionOverride } from "../scripts/afcat/lib";

// A notes re-cut moves committed rows between subtopics. commit.ts cannot carry it
// (subtopic_id is not in content_hash, so a re-commit skips the row), so
// sync-subtopics.ts compares the build with the live rows. This is its plan.
describe("planSubtopicMoves", () => {
  const live = [
    { id: "q1", questionNumber: "01-1", subtopic: "Partnership" },
    { id: "q2", questionNumber: "01-2", subtopic: "Combining Ratios" },
    { id: "q3", questionNumber: "01-3", subtopic: null },
  ];

  it("moves only the rows whose built subtopic differs from the live one", () => {
    const built = [
      { questionNumber: "01-1", subtopic: "Dividing in a Ratio and Partnership" },
      { questionNumber: "01-2", subtopic: "Combining Ratios" },
      { questionNumber: "01-3", subtopic: "Combining Ratios" },
    ];
    const plan = planSubtopicMoves(built, live);
    expect(plan.moves).toEqual([
      { id: "q1", questionNumber: "01-1", from: "Partnership", to: "Dividing in a Ratio and Partnership" },
      { id: "q3", questionNumber: "01-3", from: null, to: "Combining Ratios" },
    ]);
    expect(plan.missing).toEqual([]);
  });

  it("names built rows that are not committed, so a dry run cannot hide them", () => {
    const plan = planSubtopicMoves([{ questionNumber: "01-9", subtopic: "Proportionals" }], live);
    expect(plan.moves).toEqual([]);
    expect(plan.missing).toEqual(["01-9"]);
  });
});

// A merged name ("Dividing in a Ratio and Partnership") should reuse the biggest retired
// subtopic feeding it, renamed, so its id (and every /browse link carrying it) survives.
describe("pickRenames", () => {
  const moves = [
    ...Array(26).fill(0).map(() => ({ from: "Dividing in a Given Ratio", to: "Dividing in a Ratio and Partnership" })),
    ...Array(6).fill(0).map(() => ({ from: "Partnership", to: "Dividing in a Ratio and Partnership" })),
    { from: "Algebraic Ratio Expressions", to: "Combining Ratios" },
  ];
  const keep = ["Dividing in a Ratio and Partnership", "Combining Ratios", "Algebraic Ratio Expressions"];

  it("renames the largest retired source of a name that does not exist yet", () => {
    expect(pickRenames(moves, keep, new Set(["Combining Ratios", "Algebraic Ratio Expressions"]))).toEqual({
      "Dividing in a Given Ratio": "Dividing in a Ratio and Partnership",
    });
  });

  it("never renames a subtopic the chapter keeps, or into a name that already exists", () => {
    expect(pickRenames(moves, keep, new Set(["Dividing in a Ratio and Partnership", "Combining Ratios"]))).toEqual({});
  });
});

// An override that repairs a stem leaves the blind pass's solution, which was written
// for the misprinted stem. Three Ratio rows shipped that way ("the question as printed
// has no answer" under a repaired stem), so a stem override must say what happens to it.
describe("staleSolutionOverride", () => {
  it("flags a stem repair that carries no solution", () => {
    expect(staleSolutionOverride({ stem: "60 liters of a mixture...", reason: "40 -> 60" })).toBe(true);
  });

  it("accepts a stem repair with a rewritten solution, or one that says the old one still fits", () => {
    expect(staleSolutionOverride({ stem: "x", solution: "y", reason: "r" })).toBe(false);
    expect(staleSolutionOverride({ stem: "x", solutionStands: "names the same values", reason: "r" })).toBe(false);
  });

  it("ignores overrides that do not touch the stem", () => {
    expect(staleSolutionOverride({ options: { B: "7:2" }, reason: "r" })).toBe(false);
    expect(staleSolutionOverride({ stem: "x", exclude: true, reason: "r" })).toBe(false);
  });
});
