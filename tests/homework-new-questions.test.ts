import { describe, expect, it } from "vitest";
import { mergeNewQuestions, planFileIds, unplannedIds, type NewDecisions, type NewSlot, type PlanFileShape } from "@/lib/homework/newQuestions";
import { sittingFor } from "@/lib/homework/sittings";

// A plan file as scripts/homework/data/*.json holds it (only the fields these helpers read).
function plan(over: Partial<PlanFileShape> = {}): PlanFileShape {
  return {
    sittings: ["2021 Paper 1", "14 Jun 2022", "8 Apr 2023"],
    questions: [
      { id: "a1", sitting: "2021 Paper 1" },
      { id: "a2", sitting: "8 Apr 2023" },
      { id: "t1", sitting: "14 Jun 2022" },
      { id: "t2", sitting: "8 Apr 2023" },
      { id: "cs", sitting: "14 Jun 2022", rows: ["cs", "cs-b"] },
    ],
    excluded: ["x1"],
    groups: [
      { tier: "repeat", label: "A", sittings: ["2021 Paper 1*", "8 Apr 2023"], questionIds: ["a1", "a2"] },
      { tier: "type", label: "T", sittings: ["14 Jun 2022", "8 Apr 2023"], questionIds: ["t1", "t2"] },
    ],
    ...over,
  };
}

// New paper questions as homework:new found them: one slot each, its sitting and chapter.
const slot = (id: string, sitting = "2 Apr 2026 S1", chapter = "Matrices", rows?: string[]): NewSlot => ({
  id,
  sitting,
  chapter,
  ...(rows ? { rows } : {}),
});

describe("planFileIds / unplannedIds (2026-11-06): what a plan file covers", () => {
  it("counts every row a plan prints or leaves out, case-study parts included", () => {
    expect([...planFileIds(plan())].sort()).toEqual(["a1", "a2", "cs", "cs-b", "t1", "t2", "x1"]);
  });

  it("names the PUBLIC past questions the file neither plans nor excludes", () => {
    expect(unplannedIds(plan(), ["a1", "cs-b", "x1", "n1", "n2"])).toEqual(["n1", "n2"]);
    expect(unplannedIds(plan(), ["a1", "t2"])).toEqual([]);
  });
});

describe("mergeNewQuestions (2026-11-06): folding a reviewed new paper into a plan file", () => {
  it("adds every new question, even one no reviewer grouped (it is then asked once)", () => {
    const out = mergeNewQuestions(plan(), [slot("n1"), slot("n2", "2 Apr 2026 S2")], []);
    expect(out.questions.map((q) => q.id)).toEqual(["a1", "a2", "t1", "t2", "cs", "n1", "n2"]);
    expect(out.sittings).toEqual(["2021 Paper 1", "14 Jun 2022", "8 Apr 2023", "2 Apr 2026 S1", "2 Apr 2026 S2"]);
  });

  it("keeps a new case study as one slot with its parts", () => {
    const out = mergeNewQuestions(plan(), [slot("c1", "2 Apr 2026 S1", "Matrices", ["c1", "c2"])], []);
    expect(out.questions.at(-1)).toEqual({ id: "c1", sitting: "2 Apr 2026 S1", rows: ["c1", "c2"] });
  });

  it("joins an existing type, adding its sitting", () => {
    const d: NewDecisions = [{ chapter: "Matrices", attach: [{ id: "n1", type: 1 }] }];
    const t = mergeNewQuestions(plan(), [slot("n1")], d).groups[1];
    expect(t.questionIds).toEqual(["t1", "t2", "n1"]);
    expect(t.sittings).toEqual(["14 Jun 2022", "8 Apr 2023", "2 Apr 2026 S1"]);
  });

  it("joins an existing repeat as its newest wording, numbers unchanged: the new sitting is unstarred", () => {
    const d: NewDecisions = [{ chapter: "Matrices", attach: [{ id: "n1", repeat: 0, changed: false }] }];
    const a = mergeNewQuestions(plan(), [slot("n1")], d).groups[0];
    expect(a.questionIds).toEqual(["a1", "a2", "n1"]);
    expect(a.sittings).toEqual(["2021 Paper 1*", "8 Apr 2023", "2 Apr 2026 S1"]);
  });

  it("joins a repeat with its numbers changed: every older sitting that matched the old newest is now starred", () => {
    const d: NewDecisions = [{ chapter: "Matrices", attach: [{ id: "n1", repeat: 0, changed: true }] }];
    const a = mergeNewQuestions(plan(), [slot("n1")], d).groups[0];
    expect(a.sittings).toEqual(["2021 Paper 1*", "8 Apr 2023*", "2 Apr 2026 S1"]);
  });

  it("stars an OLDER paper joining a repeat only when its own numbers changed", () => {
    const d: NewDecisions = [{ chapter: "Matrices", attach: [{ id: "n1", repeat: 0, changed: true }] }];
    const a = mergeNewQuestions(plan(), [slot("n1", "14 Jun 2022")], d).groups[0];
    expect(a.sittings).toEqual(["2021 Paper 1*", "14 Jun 2022*", "8 Apr 2023"]);
  });

  it("creates a new group from new questions, or new and old ones, sittings in date order", () => {
    const d: NewDecisions = [
      {
        chapter: "Matrices",
        newRepeats: [{ label: "R", members: [{ id: "n1", changed: false }, { id: "t1", changed: true }] }],
        newTypes: [{ label: "U", members: ["n1", "n2", "a1"] }],
      },
    ];
    const g = mergeNewQuestions(plan(), [slot("n1"), slot("n2", "2 Apr 2026 S2")], d).groups;
    expect(g[2]).toEqual({ tier: "repeat", label: "R", sittings: ["14 Jun 2022*", "2 Apr 2026 S1"], questionIds: ["n1", "t1"] });
    expect(g[3]).toEqual({ tier: "type", label: "U", sittings: ["2021 Paper 1", "2 Apr 2026 S1", "2 Apr 2026 S2"], questionIds: ["n1", "n2", "a1"] });
  });

  it("refuses a decision that would break the plan, writing nothing", () => {
    const one = [slot("n1")];
    expect(() => mergeNewQuestions(plan(), one, [{ chapter: "M", attach: [{ id: "zz", type: 1 }] }])).toThrow(/zz.*not a new question/);
    expect(() => mergeNewQuestions(plan(), one, [{ chapter: "M", attach: [{ id: "n1", type: 0 }] }])).toThrow(/group 0 is a repeat/);
    expect(() => mergeNewQuestions(plan(), one, [{ chapter: "M", attach: [{ id: "n1", repeat: 9, changed: false }] }])).toThrow(/no group 9/);
    expect(() => mergeNewQuestions(plan(), one, [{ chapter: "M", attach: [{ id: "n1", repeat: 0 }] }])).toThrow(/changed/);
    // An old question already in a repeat cannot join a new repeat.
    expect(() =>
      mergeNewQuestions(plan(), one, [{ chapter: "M", newRepeats: [{ label: "R", members: [{ id: "n1", changed: false }, { id: "a1", changed: true }] }] }])
    ).toThrow(/a1 is already in repeat "A"/);
    // A group must span two sittings.
    expect(() => mergeNewQuestions(plan(), [slot("n1"), slot("n2")], [{ chapter: "M", newTypes: [{ label: "U", members: ["n1", "n2"] }] }])).toThrow(/spans 1 sitting/);
    // A new group needs at least one new question; regrouping old ones is a full review.
    expect(() => mergeNewQuestions(plan(), one, [{ chapter: "M", newTypes: [{ label: "U", members: ["a1", "t1"] }] }])).toThrow(/no new question/);
  });

  it("files a new question from a chapter the plan leaves out as excluded, with its reason", () => {
    const out = mergeNewQuestions(
      plan({ excludedChapters: ["Mathematical Reasoning"], excludedQuestions: [] }),
      [slot("n1", "2 Apr 2026 S1", "Mathematical Reasoning")],
      []
    );
    expect(out.questions.some((q) => q.id === "n1")).toBe(false);
    expect(out.excluded).toContain("n1");
    expect(out.excludedQuestions).toEqual([{ id: "n1", reason: "in Mathematical Reasoning, a chapter this plan leaves out" }]);
  });
});

describe("sittingFor (2026-11-06): one labeller for every planned exam", () => {
  it("names a sitting the way each exam's plan does", () => {
    expect(sittingFor("CBSE Class 12", { pyq_year: 2024, pyq_month: "Mar", pyq_note: null })).toBe("2024");
    expect(sittingFor("JEE Mains", { pyq_year: 2026, pyq_month: null, pyq_note: "2 Apr 2026 Shift 1" })).toBe("2 Apr 2026 S1");
    expect(sittingFor("NDA", { pyq_year: 2024, pyq_month: "Apr", pyq_note: null })).toBe("NDA 1 2024");
    expect(sittingFor("SSC CGL", { pyq_year: 2023, pyq_month: null, pyq_note: "Tier I, 14 Jul 2023, Shift 3" })).toBe("14 Jul 2023 S3");
  });
});
