/**
 * The `mock_tests` row every builder writes. Pure; no DB.
 *
 * Three builders (past papers, practice mocks, chapter tests) write the same
 * table. Each used to carry its own copy of the column list, so a column added
 * to one silently missed the others. This pins the one shape they now share,
 * and pins that TYPE (source + scope) is always stated, never left to a column
 * default — a row must never acquire a type by accident.
 */
import { describe, it, expect } from "vitest";
import { mockTestRow } from "@/lib/mocks/row";
import type { MockPaperSnapshot } from "@/lib/mocks/reconstruct";

const snap: MockPaperSnapshot = {
  slug: "mht-cet-2024-maths",
  id: "00000000-0000-0000-0000-000000000001",
  examName: "MHT-CET",
  examSlug: "mht-cet",
  paperCode: "maths",
  title: "MHT-CET 2024 — Paper I — Mathematics",
  pyqYear: 2024,
  pyqMonth: null,
  durationSecs: 5400,
  marking: { correct: 2, wrong: 0 },
  totalQuestions: 1,
  totalMarks: 2,
  sections: [{ key: "mathematics", label: "Mathematics", count: 1 }],
  questions: [{ position: 1, questionId: "q1", sectionKey: "mathematics", marks: 2, negMarks: 0 }],
};

const NOW = new Date("2026-09-30T10:00:00.000Z");

describe("mockTestRow", () => {
  it("maps a snapshot onto every mock_tests column", () => {
    expect(
      mockTestRow(snap, {
        examId: "exam-1",
        source: "pyq",
        scope: "full",
        pyqYear: 2024,
        pyqMonth: null,
        publish: true,
        now: NOW,
      })
    ).toEqual({
      id: snap.id,
      slug: snap.slug,
      exam_id: "exam-1",
      paper_code: "maths",
      source: "pyq",
      scope: "full",
      pyq_year: 2024,
      pyq_month: null,
      title: snap.title,
      duration_secs: 5400,
      marking: { correct: 2, wrong: 0 },
      sections: snap.sections,
      questions: snap.questions,
      total_questions: 1,
      total_marks: 2,
      status: "published",
      updated_at: "2026-09-30T10:00:00.000Z",
    });
  });

  it("writes a draft unless told to publish", () => {
    const row = mockTestRow(snap, {
      examId: "e", source: "pyq", scope: "full", pyqYear: 2024, pyqMonth: null, publish: false, now: NOW,
    });
    expect(row.status).toBe("draft");
  });

  it("takes the year from the caller, not the snapshot — an assembled test has no sitting", () => {
    const row = mockTestRow(snap, {
      examId: "e", source: "pyq", scope: "sectional", pyqYear: null, pyqMonth: null, publish: true, now: NOW,
    });
    expect(row.pyq_year).toBeNull();
    expect(row.scope).toBe("sectional");
  });
});
