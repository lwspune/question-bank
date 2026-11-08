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
import { greetingFor, greetingName } from "./today";
import { loadFocus } from "./focusServer";
import { resolveFocus, type Focus } from "./focus";

export type MeHeaderData = {
  greeting: string;
  name: string | null;
  focus: Focus;
  /** The student's exams, each to its best page: the chips of a one-exam student. */
  examLinks: ExamLink[];
  /** No exam chosen: the one their practice or first page points to. */
  suggestedExam: { slug: string; displayName: string } | null;
};

export async function loadMeHeader(
  db: SupabaseClient,
  user: { id: string; name?: string | null; preferredName?: string | null },
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
  const suggestedSlug = targets.length === 0 ? await loadSuggestedExam(db, user.id, examIds) : null;
  const suggested = suggestedSlug ? getExamBySlug(suggestedSlug) : null;
  return {
    greeting: greetingFor(istHour(now)),
    name: greetingName({ preferred_name: user.preferredName, full_name: user.name }),
    focus,
    examLinks: yourExamLinks(targets, examIds),
    suggestedExam: suggested ? { slug: suggested.slug, displayName: suggested.displayName } : null,
  };
}

/** The hour of the day in India (0-23), for the greeting. */
export function istHour(d: Date): number {
  return Number(
    new Intl.DateTimeFormat("en-IN", { timeZone: "Asia/Kolkata", hour: "numeric", hourCycle: "h23" }).format(d)
  );
}
