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
import { loadMeHeader, type MeHeaderData } from "@/lib/me/header";
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
import { firstMockHref, firstNotesHref } from "@/lib/exam/examLinks";
import { loadTutorPriceAsk } from "@/lib/tutor/priceAsk";
import { loadPathCard, type PathCard } from "@/lib/path/service";

/** The header fields (greeting, exams, focus) plus the Home tab's own cards. */
export type MeData = MeHeaderData & {
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
  /** The board path (MENTOR_SPEC.md, migration 0225): today on it, or the start offer. */
  pathCard: PathCard;
};

export async function loadMe(
  db: SupabaseClient,
  typed: SupabaseClient<Database>,
  user: { id: string; name?: string | null; preferredName?: string | null },
  weekly: Promise<OwnWeekly>,
  now: Date = new Date(),
  /** The staff view reads the path without storing today's pick or grants. */
  opts: { staffView?: boolean } = {}
): Promise<MeData> {
  const [attempts, notesRows, lastNpsAt, week, assigned, profile, examIds, header] = await Promise.all([
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
    // The header (greeting, exams, focus), shared with /performance and /account.
    getExamIdMap().then((ids) => loadMeHeader(db, user, ids, { now })),
  ]);

  const focusSlug = header.focus.filterExamName ? header.focus.selected : null;

  // The open mock is resumed whatever the focus: a sitting on the clock is not
  // something to hide. The feedback ask counts every mock too.
  const allMocks = summarizeUserMocks(attempts);
  // Focused (a two-exam student, 2026-11-08): the Home cards show that exam.
  const shownAttempts = focusSlug ? attempts.filter((a) => a.examSlug === focusSlug) : attempts;
  const mocks = focusSlug ? summarizeUserMocks(shownAttempts) : allMocks;
  const notes = summarizeNotesProgress(notesRows);
  const showNps = needsNps({ completedMocks: allMocks.completed, lastNpsAt, now: now.getTime() });

  // Continue-where-you-left-off: an open mock beats a recently-read chapter.
  const resumeAttempt = allMocks.resumeAttempt;
  // Where they were last working, across the bank, /board, notes and homework
  // (2026-11-06). Best effort: a failed read costs the card, never the page.
  const continueItems = await loadContinue(
    typed,
    user.id,
    notes.recent.map((r) => ({ ...r, ...notesTopicTitles(r) })),
    examIds,
    focusSlug
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
  // The board path (2026-11-07), for students with a Class 12 board among
  // their exams. Best effort: a failed read costs the card, never the page.
  const pathCard = await loadPathCard(db, user.id, targets, { write: !opts.staffView, now }).catch((e) => {
    console.error("path read failed", e instanceof Error ? e.message : e);
    return { path: null, offer: null } as PathCard;
  });
  // The focus exam first, so "Browse mocks" and notes links open on it.
  const linkOrder = focusSlug ? [focusSlug, ...targets.filter((t) => t !== focusSlug)] : targets;

  return {
    ...header,
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
    mockHref: firstMockHref(linkOrder),
    notesHref: firstNotesHref(linkOrder, notesSlugs),
    weekly: week,
    assigned,
    attempts: shownAttempts,
    mocks,
    continueItems,
    showNps,
    tutorPriceAsk,
    pathCard,
  };
}
