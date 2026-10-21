/**
 * What grading:preview and grading:commit share (answer-sheet grading,
 * migration 0175): check the grades, then the marks, and stamp the drawing.
 * The commit refuses unless the stamp matches the last preview, so the student
 * sees exactly the pages the grader looked at.
 */
import { describe, it, expect } from "vitest";
import { checkSheet, reportPayload } from "@/lib/answerSheets/marking";
import type { PaperItemRow } from "@/lib/questionPapers/listing";

const item = (position: number, marks: number, over: Partial<PaperItemRow> = {}): PaperItemRow => ({
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
const ITEMS = [item(1, 2), item(2, 3)];

const file = (marks: unknown[] = [
  { page: 1, position: 1, kind: "score", x: 80, y: 20 },
  { page: 2, position: 2, kind: "cross", x: 40, y: 50 },
  { page: 2, position: 2, kind: "score", x: 80, y: 50 },
]) => ({
  submissionId: "s-1",
  wentWell: "Clear diagram.",
  nextSteps: "Write units.",
  grades: [
    { position: 1, max: 2, outcome: "scored", awarded: 2, earned: "All right.", missing: "", cause: "", topic: "" },
    { position: 2, max: 3, outcome: "scored", awarded: 1, earned: "Formula.", missing: "Wrong value of g.", cause: "concept", topic: "Value of g" },
  ],
  marks,
});

const check = (f: unknown, pageCount = 2) => checkSheet({ items: ITEMS, totalMarks: 5, file: f, pageCount });

describe("checkSheet", () => {
  it("passes a sound sheet and returns the grade, the marks and a stamp", () => {
    const r = check(file());
    expect(r.ok).toBe(true);
    if (!r.ok) return;
    expect(r.grade.totalAwarded).toBe(3);
    expect(r.marks).toHaveLength(3);
    expect(r.stamp).toMatch(/^[0-9a-f]{64}$/);
    expect(JSON.parse(r.payloadJson).pageCount).toBe(2);
  });

  it("checks the marks only once the grades pass, and says so", () => {
    const f = file();
    f.grades[1].cause = "";
    const r = check(f);
    expect(r.ok).toBe(false);
    if (r.ok) return;
    expect(r.errors.join("\n")).toMatch(/cause/);
    expect(r.errors.join("\n")).toMatch(/page marks are checked once the grades pass/);
  });

  it("refuses marks past the prepared pages", () => {
    expect(check(file(), 1).ok).toBe(false);
  });

  it("changes the stamp when a mark moves, and keeps it when nothing does", () => {
    const a = check(file());
    const b = check(file());
    const moved = file();
    (moved.marks[1] as { x: number }).x = 41;
    const c = check(moved);
    if (!a.ok || !b.ok || !c.ok) throw new Error("expected all to pass");
    expect(a.stamp).toBe(b.stamp);
    expect(c.stamp).not.toBe(a.stamp);
  });
});

describe("reportPayload", () => {
  it("gives the PDF the paper, the summary and every question's line", () => {
    const r = check(file());
    if (!r.ok) throw new Error(r.errors.join("\n"));
    const p = reportPayload({ title: "Physics 2025", gradedOn: "21 Oct 2026", totalMax: 5, check: r });
    expect(p).toMatchObject({ title: "Physics 2025", gradedOn: "21 Oct 2026", pageCount: 2, wentWell: "Clear diagram." });
    expect(p.grades.map((g) => [g.label, g.awarded])).toEqual([
      ["Q.1", 2],
      ["Q.2", 1],
    ]);
    expect(p.report.total).toBe(3);
    expect(p.report.focus[0].heading).toBe("Learn this again: Value of g");
  });
});
