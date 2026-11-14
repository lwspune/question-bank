/**
 * What the header above Home · Performance · Account shows (2026-11-08): the
 * greeting, the student's exams (as the focus switch for a two-exam student)
 * and, with no exam chosen, the exam their practice points to.
 *
 * One loader for all three pages and the staff view of a student's /me, so
 * the header cannot say one thing on Home and another on Performance.
 */
import type { SupabaseClient } from "@supabase/supabase-js";
import type { ExamIdMap } from "@/lib/exam/examNav";
import { getExamBySlug } from "@/lib/exam/examContext";
import { yourExamLinks, type ExamLink } from "@/lib/exam/examLinks";
import { getOnboardingState } from "@/lib/profile/service";
import { sanitizeTargetExams } from "@/lib/profile/onboarding";
import { loadSuggestedExam } from "@/lib/profile/suggestExamServer";
import { loadStoredGuess } from "@/lib/profile/examGuessServer";
import { guessCardVariant, storedGuess } from "@/lib/profile/examGuess";
import type { InferredExam } from "@/lib/profile/suggestExam";
import { greetingFor, greetingName } from "./today";
import { loadFocus } from "./focusServer";
import { resolveFocus, type Focus } from "./focus";

export type MeHeaderData = {
  greeting: string;
  name: string | null;
  focus: Focus;
  /** The student's exams, each to its best page: the chips of a one-exam student. */
  examLinks: ExamLink[];
  /**
   * No exam chosen: the one their practice or first page points to, stored
   * (migration 0254) or worked out now. `card` picks Home's card: "guess" is
   * "Your exam: X (our guess)", "suggest" the older "Studying for X?", kept for
   * accounts the welcome-screen test measures until it ends.
   */
  suggestedExam: { slug: string; displayName: string; card: "guess" | "suggest" } | null;
};

export async function loadMeHeader(
  db: SupabaseClient,
  user: { id: string; name?: string | null; preferredName?: string | null; createdAt?: string | null },
  examIds: ExamIdMap,
  opts: { now?: Date; targets?: readonly string[] } = {}
): Promise<MeHeaderData> {
  const now = opts.now ?? new Date();
  // Both reads at once: the server is far from the database.
  const [rawTargets, focusOrNull] = await Promise.all([
    opts.targets ? Promise.resolve(opts.targets) : getOnboardingState(db, user.id).then((p) => p.targetExams),
    // Best effort: a failed read shows the exams without a focus, never no page.
    loadFocus(db, user.id, examIds).catch((e: unknown) => {
      console.error("header focus read failed", e instanceof Error ? e.message : e);
      return null;
    }),
  ]);
  const targets = sanitizeTargetExams([...rawTargets]);
  const focus = focusOrNull ?? resolveFocus({ targets, saved: null, recent: null });
  // No exam chosen: the one their practice or first page points to.
  const guess = targets.length === 0 ? await loadGuess(db, user.id, examIds) : null;
  const suggested = guess ? getExamBySlug(guess.slug) : null;
  return {
    greeting: greetingFor(istHour(now)),
    name: greetingName({ preferred_name: user.preferredName, full_name: user.name }),
    focus,
    examLinks: yourExamLinks(targets, examIds),
    suggestedExam: suggested
      ? { slug: suggested.slug, displayName: suggested.displayName, card: guessCardVariant(user.createdAt, now) }
      : null,
  };
}

/**
 * The stored guess first (the daily job's, stable between visits), else the
 * live one. None once the student tapped Change: they said it is wrong. A
 * failed read of the stored guess falls back to the live one.
 */
async function loadGuess(db: SupabaseClient, userId: string, examIds: ExamIdMap): Promise<InferredExam | null> {
  const stored = await loadStoredGuess(db, userId)
    .then(storedGuess)
    .catch((e: unknown) => {
      console.error("stored exam guess read failed", e instanceof Error ? e.message : e);
      return null;
    });
  if (stored === "declined") return null;
  return stored ?? loadSuggestedExam(db, userId, examIds);
}

/** The hour of the day in India (0-23), for the greeting. */
export function istHour(d: Date): number {
  return Number(
    new Intl.DateTimeFormat("en-IN", { timeZone: "Asia/Kolkata", hour: "numeric", hourCycle: "h23" }).format(d)
  );
}
