/**
 * Pure onboarding helpers for STUDENT ACCOUNTS — the "intent capture" step shown
 * once right after sign-up (target exam(s) + stage). No I/O; unit-tested in
 * tests/profile-onboarding.test.ts. Sibling of mobile.ts: same "ask once, then
 * never again" shape, but the gate signal here is `onboarded_at` (set on BOTH
 * Continue and Skip) rather than a stored value.
 */
import { isExamSlug, type ExamSlug } from "@/lib/exam/examContext";

/** The self-reported stage of preparation. Closed set — mirrored by the DB
 *  CHECK on student_profiles.stage (migration 0048). */
export const STAGES = ["class-9-10", "class-11", "class-12", "dropper", "college"] as const;
export type Stage = (typeof STAGES)[number];

/** Human labels for the stage chips (shared by /welcome + /account). */
export const STAGE_LABELS: Record<Stage, string> = {
  "class-9-10": "Class 9–10",
  "class-11": "Class 11",
  "class-12": "Class 12",
  dropper: "Dropper / repeat attempt",
  college: "College / other",
};

const STAGE_SET = new Set<string>(STAGES);

export function isStage(value: unknown): value is Stage {
  return typeof value === "string" && STAGE_SET.has(value);
}

/** Most students prep for one or two exams; cap the array so a tampered request
 *  can't store an unbounded list. */
const MAX_TARGET_EXAMS = 6;

/**
 * Keep only valid registry slugs, deduped, first-seen order preserved, capped.
 * Anything that isn't an array (or is empty) yields `[]` — which the caller
 * treats as a skip.
 */
export function sanitizeTargetExams(input: unknown): ExamSlug[] {
  if (!Array.isArray(input)) return [];
  const out: ExamSlug[] = [];
  const seen = new Set<string>();
  for (const raw of input) {
    if (!isExamSlug(raw) || seen.has(raw)) continue;
    seen.add(raw);
    out.push(raw);
    if (out.length >= MAX_TARGET_EXAMS) break;
  }
  return out;
}

/** The row shape the gate cares about — just whether onboarding was done. */
export type OnboardingState = { onboardedAt: string | null } | null | undefined;

/**
 * Gate decision: should we show the post-signup intent screen? True when there's
 * no profile row yet, or the row was never onboarded. Once `onboarded_at` is
 * stamped (completed OR skipped) we never auto-show it again — remaining fields
 * resurface only on the (opt-in) account profile meter.
 */
export function needsOnboarding(state: OnboardingState): boolean {
  return !state?.onboardedAt;
}

/** The exam that drives the personalised default (the `qb_exam` cookie) — the
 *  first picked exam, or null on a skip. */
export function primaryExam(targetExams: readonly ExamSlug[]): ExamSlug | null {
  return targetExams[0] ?? null;
}

export type OnboardingSubmission = { targetExams: unknown; stage: unknown };
export type CleanOnboarding = { targetExams: ExamSlug[]; stage: Stage | null };

/**
 * Sanitise an onboarding submission into a persistable shape. Deliberately never
 * rejects (the screen is skippable): unknown exams are dropped, an unknown/absent
 * stage becomes null, an empty submission is a valid skip.
 */
export function validateOnboardingSubmission(input: OnboardingSubmission): CleanOnboarding {
  return {
    targetExams: sanitizeTargetExams(input.targetExams),
    stage: isStage(input.stage) ? input.stage : null,
  };
}
