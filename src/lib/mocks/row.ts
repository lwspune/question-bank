/**
 * The `mock_tests` row, built once for every builder.
 *
 * Past papers (scripts/mocks/build.ts), practice mocks
 * (build-practice-mocks.ts) and chapter tests (build-sectional.ts) all write
 * this table. Each used to spell out its own column list, so a column added to
 * one would silently miss the others. TYPE (source + scope, migration 0088) is
 * a required argument rather than a column default, so a row can never acquire
 * a type by accident.
 *
 * Pure — the caller supplies `now`. Unit-tested in tests/mock-row.test.ts.
 */

import type { MockPaperSnapshot } from "./reconstruct";
import type { MockScope, MockSource } from "./query";

export type MockTestRowOptions = {
  examId: string;
  source: MockSource;
  scope: MockScope;
  /** The sitting's year. Null for anything that is not a whole past paper. */
  pyqYear: number | null;
  pyqMonth: string | null;
  publish: boolean;
  now: Date;
};

export function mockTestRow(snap: MockPaperSnapshot, o: MockTestRowOptions) {
  return {
    id: snap.id,
    slug: snap.slug,
    exam_id: o.examId,
    paper_code: snap.paperCode,
    source: o.source,
    scope: o.scope,
    pyq_year: o.pyqYear,
    pyq_month: o.pyqMonth,
    title: snap.title,
    duration_secs: snap.durationSecs,
    marking: snap.marking,
    sections: snap.sections,
    questions: snap.questions,
    total_questions: snap.totalQuestions,
    total_marks: snap.totalMarks,
    status: o.publish ? ("published" as const) : ("draft" as const),
    updated_at: o.now.toISOString(),
  };
}
