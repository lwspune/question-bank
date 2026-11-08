/**
 * PUBLIC question counts by exam and kind, in one read (migration 0237,
 * 2026-11-08). Before, the homepage catalogue ran two head counts per exam (50
 * at once), /browse one per exam (25 at once) and V one over the whole bank on
 * every message: together ~20% of all database time, mostly spent queueing.
 */
import { describe, it, expect } from "vitest";
import { tallyPublicCounts } from "@/lib/exam/publicCounts";
import { defaultViewCountsFrom } from "@/lib/questions/defaultViewCounts";
import { EXAM_REGISTRY, isPracticeOnlyExam } from "@/lib/exam/examContext";

describe("tallyPublicCounts", () => {
  it("groups rows by exam into both kinds and sums the whole bank", () => {
    const t = tallyPublicCounts([
      { exam_id: "a", question_kind: "pyq", questions: 10 },
      { exam_id: "a", question_kind: "practice", questions: 3 },
      { exam_id: "b", question_kind: "pyq", questions: 4 },
    ]);
    expect(t.byExamId.get("a")).toEqual({ pyq: 10, practice: 3 });
    expect(t.byExamId.get("b")).toEqual({ pyq: 4, practice: 0 });
    expect(t.byExamId.get("c")).toBeUndefined();
    expect(t.total).toBe(17);
  });

  it("refuses a kind it does not know rather than dropping its questions", () => {
    expect(() => tallyPublicCounts([{ exam_id: "a", question_kind: "mock", questions: 1 }])).toThrow(/kind/);
  });
});

describe("defaultViewCountsFrom (/browse exam pills)", () => {
  const practiceOnly = EXAM_REGISTRY.find((e) => isPracticeOnlyExam(e.examName))!;
  const pyqExam = EXAM_REGISTRY.find((e) => !isPracticeOnlyExam(e.examName))!;
  const idByName = new Map([
    [practiceOnly.examName, "p-id"],
    [pyqExam.examName, "q-id"],
  ]);

  it("counts the kind each exam's default view shows: practice for a practice-only exam, else PYQs", () => {
    const counts = defaultViewCountsFrom(
      tallyPublicCounts([
        { exam_id: "p-id", question_kind: "practice", questions: 40 },
        { exam_id: "p-id", question_kind: "pyq", questions: 2 },
        { exam_id: "q-id", question_kind: "pyq", questions: 900 },
        { exam_id: "q-id", question_kind: "practice", questions: 50 },
      ]).byExamId,
      idByName
    );
    expect(counts[practiceOnly.slug]).toBe(40);
    expect(counts[pyqExam.slug]).toBe(900);
  });

  it("gives a seeded exam with no questions 0, and leaves an unseeded exam out", () => {
    const counts = defaultViewCountsFrom(new Map(), idByName);
    expect(counts[pyqExam.slug]).toBe(0);
    const unseeded = EXAM_REGISTRY.find((e) => !idByName.has(e.examName))!;
    expect(unseeded.slug in counts).toBe(false);
  });
});
