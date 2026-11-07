/**
 * Everything /me shows, read for one student. Shared by /me (the student's own,
 * read with their JWT) and the staff view of a student's /me
 * (/dashboard/students/[id]/me, read with the service-role client), so the
 * staff view cannot drift from what the student sees.
 *
 * Every read here filters on `userId` itself. The one read SQL counts for "the
 * caller" (the week's study days) arrives as a promise from the page.
 */
import "server-only";
import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/types/db";
import { getUserAttempts, type UserAttempt } from "@/lib/mocks/query";
import { summarizeUserMocks } from "@/lib/mocks/perf";
import { listOwnNotesProgress } from "@/lib/notes/progressService";
import { summarizeNotesProgress } from "@/lib/notes/progress";
import { notesTopicTitles } from "@/lib/notes/topicTitles";
import { getLastNpsAt } from "@/lib/feedback/service";
import { needsNps } from "@/lib/feedback/nps";
import { loadContinue } from "@/lib/me/continueServer";
import type { ContinueItem } from "@/lib/me/continue";
import { greetingFor, greetingName } from "@/lib/me/today";
import { loadSuggestedExam } from "@/lib/profile/suggestExamServer";
import { getExamBySlug } from "@/lib/exam/examContext";
import type { OwnWeekly } from "@/lib/goals/service";
import { listMyAssignments } from "@/lib/assignments/service";
import type { StudentAssignmentView } from "@/lib/assignments/core";
import { loadPendingResultChecks, loadSuggestedName } from "@/lib/results/service";
import type { OpenAnnouncement } from "@/lib/results/check";
import { istDayKey } from "@/lib/email/dueNudge";
import { getOnboardingState } from "@/lib/profile/service";
import { isStage, needsStageNudge, sanitizeTargetExams, type Stage } from "@/lib/profile/onboarding";
import { getExamIdMap } from "@/lib/exam/examIdMap";
import { getNotesExamGroups } from "@/lib/notes/notesNav";
import { firstMockHref, firstNotesHref, yourExamLinks, type ExamLink } from "@/lib/exam/examLinks";
import { loadTutorPriceAsk } from "@/lib/tutor/priceAsk";

export type MeData = {
  greeting: string;
  name: string | null;
  examLinks: ExamLink[];
  suggestedExam: { slug: string; displayName: string } | null;
  resultCheck: OpenAnnouncement | null;
  suggestedName: string;
  stage: Stage | null;
  showStageNudge: boolean;
  pushPromptedAt: string | null;
  resume: { title: string; href: string } | undefined;
  cont: { title: string; chapter: string; href: string } | undefined;
  mockHref: string;
  notesHref: string;
  weekly: OwnWeekly;
  assigned: StudentAssignmentView[];
  attempts: UserAttempt[];
  mocks: ReturnType<typeof summarizeUserMocks>;
  continueItems: ContinueItem[];
  showNps: boolean;
  /** The 1:1 tutoring price question, for a student Yes that owes an answer (migration 0224). */
  tutorPriceAsk: { price: number } | null;
};

export async function loadMe(
  db: SupabaseClient,
  typed: SupabaseClient<Database>,
  user: { id: string; name?: string | null; preferredName?: string | null },
  weekly: Promise<OwnWeekly>,
  now: Date = new Date()
): Promise<MeData> {
  const [attempts, notesRows, lastNpsAt, week, assigned, profile, examIds] = await Promise.all([
    getUserAttempts(db, user.id),
    listOwnNotesProgress(db, user.id),
    getLastNpsAt(db, user.id),
    weekly,
    // Best-effort: a failed read costs the due list, never the dashboard.
    listMyAssignments(user.id).catch((e) => {
      console.error("assignments read failed", e);
      return [] as StudentAssignmentView[];
    }),
    getOnboardingState(db, user.id),
    getExamIdMap(),
  ]);

  const mocks = summarizeUserMocks(attempts);
  const notes = summarizeNotesProgress(notesRows);
  const showNps = needsNps({ completedMocks: mocks.completed, lastNpsAt, now: now.getTime() });

  // Continue-where-you-left-off: an open mock beats a recently-read chapter.
  const resumeAttempt = mocks.resumeAttempt;
  // Where they were last working, across the bank, /board, notes and homework
  // (2026-11-06). Best effort: a failed read costs the card, never the page.
  const continueItems = await loadContinue(
    typed,
    user.id,
    notes.recent.map((r) => ({ ...r, ...notesTopicTitles(r) })),
    examIds
  ).catch((e) => {
    console.error("continue read failed", e instanceof Error ? e.message : e);
    return [] as ContinueItem[];
  });
  const cont = continueItems[0];

  // The exam-scoped home (EXAM_TIER_SPEC.md §4.2): the student's target exams
  // and the per-exam destinations they unlock.
  const targets = sanitizeTargetExams(profile.targetExams);
  const stage = isStage(profile.stage) ? profile.stage : null;
  const notesSlugs = new Set(getNotesExamGroups().map((g) => g.slug));
  // "Did you clear it?" after a result is announced (migration 0149). Best
  // effort: a failed read costs the card, never the dashboard.
  const [resultCheck] = await loadPendingResultChecks(user.id, targets, istDayKey(now)).catch((e) => {
    console.error("result checks read failed", e instanceof Error ? e.message : e);
    return [] as OpenAnnouncement[];
  });
  const suggestedName = resultCheck ? await loadSuggestedName(user.id).catch(() => "") : "";
  // The tutoring price question (2026-11-07). Best effort, like the cards above.
  const tutorPriceAsk = await loadTutorPriceAsk(user.id, now).catch((e) => {
    console.error("tutor price ask read failed", e instanceof Error ? e.message : e);
    return null;
  });
  // No exam chosen: offer the one their practice or first page points to.
  const suggestedSlug = targets.length === 0 ? await loadSuggestedExam(db, user.id, examIds) : null;
  const suggested = suggestedSlug ? getExamBySlug(suggestedSlug) : null;

  return {
    greeting: greetingFor(istHour(now)),
    name: greetingName({ preferred_name: user.preferredName, full_name: user.name }),
    examLinks: yourExamLinks(targets, examIds),
    suggestedExam: suggested ? { slug: suggested.slug, displayName: suggested.displayName } : null,
    resultCheck: resultCheck ?? null,
    suggestedName,
    stage,
    showStageNudge: needsStageNudge({ stage, now }),
    pushPromptedAt: profile.pushPromptedAt,
    resume: resumeAttempt
      ? {
          title: resumeAttempt.mockTitle,
          href: `/mock/${resumeAttempt.mockSlug}/attempt/${resumeAttempt.attemptId}`,
        }
      : undefined,
    cont: cont ? { title: cont.title, chapter: cont.subtitle, href: cont.href } : undefined,
    mockHref: firstMockHref(targets),
    notesHref: firstNotesHref(targets, notesSlugs),
    weekly: week,
    assigned,
    attempts,
    mocks,
    continueItems,
    showNps,
    tutorPriceAsk,
  };
}

/** The hour of the day in India (0-23), for the greeting. */
function istHour(d: Date): number {
  return Number(
    new Intl.DateTimeFormat("en-IN", { timeZone: "Asia/Kolkata", hour: "numeric", hourCycle: "h23" }).format(d)
  );
}
