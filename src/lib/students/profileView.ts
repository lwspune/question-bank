/**
 * Pure presentation helpers for the /dashboard/students/[id] student detail page.
 * No I/O — unit-tested in tests/students-profile-view.test.ts.
 *
 * Two rules run through all of them:
 *
 * 1. ABSENCE RENDERS AS A DASH, NEVER AS A VALUE. Most of these columns are
 *    nullable because the student was never asked or chose not to answer, and a
 *    label invented for a NULL is an assertion we can't support (city is filled
 *    for 4 of 316 students — the dashes are the finding, not a rendering bug).
 * 2. AN UNKNOWN VALUE FALLS BACK TO ITSELF. Every enum here is CHECK-constrained
 *    in Postgres, so a value these maps don't know means the DB and the app have
 *    drifted. Showing the raw string surfaces that; showing "Unknown" hides it.
 */
import { STAGE_LABELS, isStage } from "@/lib/profile/onboarding";
import { MEDIUM_LABELS, STREAM_LABELS, isMedium, isStream } from "@/lib/profile/fields";
import { getExamBySlug } from "@/lib/exam/examContext";
import { ACTIVITY_KINDS, type ActivityKind } from "@/lib/activity/events";

/** The single em-dash used for "we don't have this", shared so it can't drift. */
export const DASH = "—";

export function stageLabel(stage: string | null | undefined): string {
  if (!stage) return DASH;
  return isStage(stage) ? STAGE_LABELS[stage] : stage;
}

export function mediumLabel(medium: string | null | undefined): string {
  if (!medium) return DASH;
  return isMedium(medium) ? MEDIUM_LABELS[medium] : medium;
}

export function streamLabel(stream: string | null | undefined): string {
  if (!stream) return DASH;
  return isStream(stream) ? STREAM_LABELS[stream] : stream;
}

/**
 * Registry display names for the student's chosen exams. `target_exams` is a soft
 * ref (no FK, migration 0048), so a slug retired from EXAM_REGISTRY still has to
 * render — dropping it would make "picked a dead exam" look like "picked none".
 */
export function examLabels(slugs: readonly string[] | null | undefined): string[] {
  if (!slugs) return [];
  return slugs.map((slug) => getExamBySlug(slug)?.displayName ?? slug);
}

/**
 * Human label per activity kind. Typed as a total Record, so adding a kind to
 * ACTIVITY_KINDS fails typecheck here rather than rendering a raw enum in the UI.
 * (It did exactly that when mock_started + question_practiced landed in 0105.)
 */
const ACTIVITY_LABELS: Record<ActivityKind, string> = {
  mock_submitted: "Submitted a mock",
  mock_started: "Opened a mock",
  answer_wrong: "Missed a question",
  answer_correct: "Answered correctly",
  chapter_mastered: "Marked a subtopic mastered",
  note_checkpoint: "Completed a notes checkpoint",
  question_bookmarked: "Saved a question",
  question_practiced: "Revealed a bank answer",
  quiz_taken: "Took a quiz",
  drill_completed: "Completed a drill",
};

const ACTIVITY_KIND_SET: ReadonlySet<string> = new Set(ACTIVITY_KINDS);

export function activityLabel(kind: string): string {
  return ACTIVITY_KIND_SET.has(kind) ? ACTIVITY_LABELS[kind as ActivityKind] : kind;
}

const MIN = 60_000;
const HOUR = 60 * MIN;
const DAY = 24 * HOUR;
const WEEK = 7 * DAY;

/** Pluralise without a library: `1 day ago` / `6 days ago`. `min` is an
 *  abbreviation, not a word, so it never takes the -s. */
function ago(n: number, unit: string): string {
  const plural = n === 1 || unit === "min" ? "" : "s";
  return `${n} ${unit}${plural} ago`;
}

/**
 * Coarse relative time for "last active" / the activity timeline. Deliberately
 * coarse: staff read this to answer "recently or not", and a precise timestamp
 * invites reading a precision the event log doesn't carry.
 *
 * A FUTURE timestamp clamps to "just now" rather than printing "in 3 minutes" —
 * the DB clock and the renderer's clock are different machines, and small skew
 * is expected on every freshly-written row.
 */
export function relativeTime(iso: string | null | undefined, now: Date): string {
  if (!iso) return DASH;
  const then = Date.parse(iso);
  if (!Number.isFinite(then)) return DASH;

  const delta = now.getTime() - then;
  if (delta < 5 * MIN) return "just now";
  if (delta < HOUR) return ago(Math.floor(delta / MIN), "min");
  if (delta < DAY) return ago(Math.floor(delta / HOUR), "hour");
  if (delta < WEEK) return ago(Math.floor(delta / DAY), "day");
  if (delta < 9 * WEEK) return ago(Math.floor(delta / WEEK), "week");

  // Past ~two months the relative form stops being useful — an exam-prep cohort
  // reads "8 Jun 2026" faster than "14 weeks ago".
  return new Date(then).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}
