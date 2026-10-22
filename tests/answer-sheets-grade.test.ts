/**
 * The grade checker (answer-sheet grading, migration 0153). A grade is written
 * by hand in a chat session, so this is the only thing standing between a
 * slip and a student's report: it must refuse every grade the paper's own
 * rules make impossible, and name what is wrong.
 */
import { describe, it, expect } from "vitest";
import { validateGrade, type GradeFile } from "@/lib/answerSheets/grade";
import type { PaperItemRow } from "@/lib/questionPapers/listing";

const item = (position: number, marks: number | null, over: Partial<PaperItemRow> = {}): PaperItemRow => ({
  position,
  printedNumber: String(position),
  section: "A",
  marks,
  alternativeTo: null,
  partOf: null,
  caseKey: null,
  questionId: `q-${position}`,
  ...over,
});

// Q1 (1 mark), Q2 (3) OR Q3 (3), Q4 (5) with a part Q5.
const ITEMS: PaperItemRow[] = [
  item(1, 1),
  item(2, 3),
  item(3, 3, { alternativeTo: 2, printedNumber: "2 OR" }),
  item(4, 5),
  item(5, null, { partOf: 4, printedNumber: "4 (ii)" }),
];

const good = (over: Partial<GradeFile> = {}): GradeFile => ({
  submissionId: "s-1",
  wentWell: "Clear working in Q2.",
  nextSteps: "Write the formula before substituting.",
  grades: [
    { position: 1, max: 1, outcome: "scored", awarded: 1, earned: "Correct answer.", missing: "", cause: "", topic: "" },
    { position: 2, max: 3, outcome: "scored", awarded: 2, earned: "Method right.", missing: "Units missing.", cause: "careless", topic: "" },
    { position: 3, max: 3, outcome: "not_attempted", awarded: null, earned: "", missing: "", cause: "", topic: "" },
    { position: 4, max: 5, outcome: "scored", awarded: 0, earned: "", missing: "Wrong law applied.", cause: "concept", topic: "Ohm's law" },
  ],
  ...over,
});

const check = (file: unknown, totalMarks = 9) => validateGrade({ items: ITEMS, totalMarks, file });

const withGrade = (position: number, over: Record<string, unknown>) => {
  const f = good();
  return { ...f, grades: f.grades.map((g) => (g.position === position ? { ...g, ...over } : g)) };
};

describe("validateGrade", () => {
  it("accepts a complete grade and totals the scored marks", () => {
    const r = check(good());
    expect(r.ok).toBe(true);
    if (!r.ok) return;
    expect(r.totalAwarded).toBe(3);
    expect(r.rows.map((x) => x.position)).toEqual([1, 2, 3, 4]);
    expect(r.rows[1]).toMatchObject({ printedNumber: "2", questionId: "q-2", maxMarks: 3, awarded: 2 });
    expect(r.rows.map((x) => [x.cause, x.topic])).toEqual([
      [null, null],
      ["careless", null],
      [null, null],
      ["concept", "Ohm's law"],
    ]);
  });

  it("requires one cause from the list on every question that lost marks", () => {
    const none = check(withGrade(2, { cause: "" }));
    expect(none.ok).toBe(false);
    if (!none.ok) expect(none.errors.join("\n")).toMatch(/Q\.2.*cause/);
    expect(check(withGrade(2, { cause: "lazy" })).ok).toBe(false);
    for (const cause of ["careless", "misread", "mcq"]) expect(check(withGrade(2, { cause })).ok).toBe(true);
  });

  it("requires a topic for a concept or incomplete cause, at most 60 characters", () => {
    expect(check(withGrade(4, { topic: "" })).ok).toBe(false);
    expect(check(withGrade(4, { cause: "incomplete", topic: "" })).ok).toBe(false);
    expect(check(withGrade(4, { cause: "incomplete", topic: "Steps of the derivation" })).ok).toBe(true);
    expect(check(withGrade(4, { topic: "x".repeat(61) })).ok).toBe(false);
    // Optional for the others.
    expect(check(withGrade(2, { topic: "Units" })).ok).toBe(true);
  });

  it("refuses a cause or topic where no marks were lost", () => {
    expect(check(withGrade(1, { cause: "careless" })).ok).toBe(false);
    expect(check(withGrade(1, { topic: "Units" })).ok).toBe(false);
    expect(check(withGrade(3, { cause: "concept", topic: "Ohm's law" })).ok).toBe(false);
  });

  it("refuses `missing` on full marks: a red line beside full marks reads as lost marks", () => {
    const r = check(withGrade(1, { missing: "Could be neater." }));
    expect(r.ok).toBe(false);
    if (!r.ok) expect(r.errors.join("\n")).toMatch(/Q\.1.*full marks/);
  });

  it("reads a file written before causes existed as having none", () => {
    const f = good();
    const old = { ...f, grades: f.grades.map(({ cause: _c, topic: _t, ...g }) => g) };
    const r = check(old);
    expect(r.ok).toBe(false);
    if (!r.ok) expect(r.errors.join("\n")).toMatch(/cause/);
  });

  it("refuses marks above the question's maximum", () => {
    const r = check(withGrade(1, { awarded: 2 }));
    expect(r.ok).toBe(false);
    if (r.ok) return;
    expect(r.errors.join("\n")).toMatch(/Q\.1.*more than its 1 mark/);
  });

  it("refuses negative marks and marks finer than half a mark", () => {
    expect(check(withGrade(2, { awarded: -1 })).ok).toBe(false);
    expect(check(withGrade(2, { awarded: 1.25 })).ok).toBe(false);
    expect(check(withGrade(2, { awarded: 1.5 })).ok).toBe(true);
  });

  it("refuses a max that disagrees with the paper (a stale template)", () => {
    const r = check(withGrade(4, { max: 4 }));
    expect(r.ok).toBe(false);
    if (r.ok) return;
    expect(r.errors.join("\n")).toMatch(/Q\.4.*5 marks/);
  });

  it("refuses a grade that leaves a question out", () => {
    const f = good();
    const r = check({ ...f, grades: f.grades.filter((g) => g.position !== 4) });
    expect(r.ok).toBe(false);
    if (r.ok) return;
    expect(r.errors.join("\n")).toMatch(/Q\.4.*no grade/);
  });

  it("refuses a grade for a part, an unknown position, or the same question twice", () => {
    const f = good();
    const part = { position: 5, max: 0, outcome: "not_attempted", awarded: null, earned: "", missing: "" };
    expect(check({ ...f, grades: [...f.grades, part] }).ok).toBe(false);
    expect(check({ ...f, grades: [...f.grades, { ...part, position: 99 }] }).ok).toBe(false);
    expect(check({ ...f, grades: [...f.grades, f.grades[0]] }).ok).toBe(false);
  });

  it("refuses both sides of an OR scored", () => {
    const r = check(withGrade(3, { outcome: "scored", awarded: 1, earned: "Some", missing: "More" }));
    expect(r.ok).toBe(false);
    if (r.ok) return;
    expect(r.errors.join("\n")).toMatch(/OR/);
  });

  it("allows the other side of an OR marked not counted, with a reason", () => {
    expect(check(withGrade(3, { outcome: "not_counted", missing: "Q.2 was answered first; only one side counts." })).ok).toBe(true);
    expect(check(withGrade(3, { outcome: "not_counted", missing: "" })).ok).toBe(false);
  });

  it("refuses marks on a question that was not scored", () => {
    expect(check(withGrade(3, { awarded: 0 })).ok).toBe(false);
  });

  it("requires feedback: what was missing when marks were lost, what earned marks when any were given", () => {
    expect(check(withGrade(2, { missing: "" })).ok).toBe(false);
    expect(check(withGrade(2, { earned: "  " })).ok).toBe(false);
    // Full marks need no "missing" (and refuse one); zero needs no "earned".
    expect(check(withGrade(1, { missing: "" })).ok).toBe(true);
    expect(check(withGrade(4, { earned: "" })).ok).toBe(true);
  });

  it("requires the two summary lines", () => {
    expect(check(good({ wentWell: "" })).ok).toBe(false);
    expect(check(good({ nextSteps: " " })).ok).toBe(false);
  });

  it("refuses a total above the paper's maximum (too many attempt-any questions counted)", () => {
    const r = check(good(), 2);
    expect(r.ok).toBe(false);
    if (r.ok) return;
    expect(r.errors.join("\n")).toMatch(/total 3.*maximum of 2/);
  });

  it("refuses a grade with nothing scored: that is a rejection, not a grade", () => {
    const f = good();
    const blank = f.grades.map((g) => ({ ...g, outcome: "not_attempted" as const, awarded: null, earned: "", missing: "" }));
    const r = check({ ...f, grades: blank });
    expect(r.ok).toBe(false);
    if (r.ok) return;
    expect(r.errors.join("\n")).toMatch(/--reject/);
  });

  it("refuses text longer than the database allows", () => {
    expect(check(withGrade(2, { missing: "x".repeat(1001) })).ok).toBe(false);
  });

  it("refuses a malformed file without throwing", () => {
    expect(check(null).ok).toBe(false);
    expect(check({ grades: "no" }).ok).toBe(false);
    expect(check(withGrade(1, { outcome: "great" })).ok).toBe(false);
  });

  it("treats an OR chain (a OR b OR c) as one choice", () => {
    const items = [item(1, 2), item(2, 2, { alternativeTo: 1 }), item(3, 2, { alternativeTo: 2 })];
    const g = (position: number, outcome: string, awarded: number | null) => ({
      position,
      max: 2,
      outcome,
      awarded,
      earned: awarded ? "ok" : "",
      missing: awarded === 2 ? "" : "x",
    });
    const file = { submissionId: "s", wentWell: "a", nextSteps: "b", grades: [g(1, "scored", 2), g(2, "not_attempted", null), g(3, "scored", 1)] };
    expect(validateGrade({ items, totalMarks: 2, file }).ok).toBe(false);
  });
});
