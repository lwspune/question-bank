/**
 * The public-quiz funnel's activity spine — pure, both directions. No I/O;
 * unit-tested in tests/quiz-activity.test.ts.
 *
 * WHY THIS EXISTS: `quiz_taken` sat in ACTIVITY_KINDS and in the 0052 DB CHECK
 * from the beginning, and carried a rendered label in THREE surfaces
 * (activity/shape.ts "Quiz taken", pmf/snapshot.ts "Daily quiz",
 * students/profileView.ts "Took a quiz") — with no emitter anywhere. Prod had
 * zero rows of it while /dashboard/pmf rendered "Daily quiz — 0 users" as a
 * measurement. Same class of defect as 0107 (guide reveals) and 0108 (board
 * reveals); this is the fourth.
 *
 * SIGNED-IN ONLY, and that is not a coverage gap to be fixed later. An anon
 * quiz-taker is captured as a `quiz_leads` row keyed by MOBILE — a different
 * identity space with no auth.users to hang activity off. The two populations
 * deliberately do not reconcile, and SURFACE_COVERAGE says so on the page.
 *
 * WHY user_activity AND NOT A NEW TABLE: taking a quiz is a learning act, which
 * is exactly what that log is an allowlist for. The `export_events` (0104) /
 * `share_events` (0109) precedent — a separate table — applies to DISTRIBUTION
 * and PRODUCTION acts, which this is not. user_activity also already grants
 * authenticated users own-row SELECT, which is what makes /quiz/attempts a page
 * with no new policy and no new migration.
 */
import type { ActivityEvent } from "@/lib/activity/events";

/** What `refId` points at, for readers of the log. */
export const QUIZ_REF_KIND = "public_quiz";

/** Bound on the denormalised title. `quizzes.title` is unbounded text and this
 *  is an append-only log, so the cap is on the way in, not at render. Also keeps
 *  refId/metadata inside sanitizeActivityEvent's MAX_REF_LEN of 200. */
const MAX_LEN = 200;

export type QuizTakenInput = {
  quizId: string;
  /** The PUBLIC slug — see the refId note below. */
  slug: string;
  title: string;
  score: number;
  total: number;
  correct: number;
  incorrect: number;
  notAttempted: number;
};

/**
 * The `quiz_taken` event for one completed, signed-in submission.
 *
 * refId is the PUBLIC SLUG rather than the quiz uuid: `quizzes` is admin-RLS, so
 * a student-facing history page holding a uuid could not resolve it to anything
 * — not a title, not a working link. The uuid rides along in metadata for
 * staff-side joins.
 *
 * No dedupeKey: a retake is legitimate history. (dedupeKey is reserved for the
 * backfill script, whose re-runs must no-op.)
 */
export function buildQuizTakenEvent(input: QuizTakenInput): ActivityEvent {
  return {
    kind: "quiz_taken",
    refId: input.slug.slice(0, MAX_LEN),
    refKind: QUIZ_REF_KIND,
    metadata: {
      quizId: input.quizId,
      title: input.title.slice(0, MAX_LEN),
      score: input.score,
      total: input.total,
      correct: input.correct,
      incorrect: input.incorrect,
      notAttempted: input.notAttempted,
    },
  };
}

/** One past quiz, as the history page renders it. Every score field is nullable
 *  because the row it came from is schemaless jsonb — see parseQuizAttempt. */
export type QuizAttemptView = {
  /** null when the row carries no ref_id: render the entry, omit the link. */
  slug: string | null;
  title: string;
  score: number | null;
  total: number | null;
  correct: number | null;
  incorrect: number | null;
  notAttempted: number | null;
  /** ISO, verbatim from the row — formatting belongs to the render layer. */
  takenAt: string;
};

/** A jsonb value coerced to a number, or null. Guards the render layer against
 *  NaN: `user_activity.metadata` has no schema, so a string here is possible and
 *  `Number("seven")` would print as NaN on the page. */
function num(v: unknown): number | null {
  return typeof v === "number" && Number.isFinite(v) ? v : null;
}

export type QuizActivityRow = {
  ref_id: string | null;
  metadata: unknown;
  created_at: string;
};

/**
 * Shape one `user_activity` row into the history view model.
 *
 * DEGRADES, NEVER THROWS. The column is schemaless, ref_id is nullable in 0052,
 * and rows written by a future emitter or a hand-run backfill may be missing
 * anything. A history page that 500s because one old row lacks a title is worse
 * than one that renders it as "Quiz".
 */
export function parseQuizAttempt(row: QuizActivityRow): QuizAttemptView {
  const m: Record<string, unknown> =
    typeof row.metadata === "object" && row.metadata !== null && !Array.isArray(row.metadata)
      ? (row.metadata as Record<string, unknown>)
      : {};
  const title = typeof m.title === "string" && m.title.trim() ? m.title : "Quiz";

  return {
    slug: row.ref_id && row.ref_id.trim() ? row.ref_id : null,
    title,
    score: num(m.score),
    total: num(m.total),
    correct: num(m.correct),
    incorrect: num(m.incorrect),
    notAttempted: num(m.notAttempted),
    takenAt: row.created_at,
  };
}
