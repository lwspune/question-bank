import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { ArrowRight } from "lucide-react";
import AppHeader from "@/components/AppHeader";
import { getSessionUser } from "@/lib/auth";
import { createSupabaseServerClient, createTypedServerClient } from "@/lib/supabase/server";
import { logActivityOnce } from "@/lib/activity/service";
import { surfaceViewedEvent } from "@/lib/activity/views";
import { getUserAttempts } from "@/lib/mocks/query";
import { summarizeUserMocks } from "@/lib/mocks/perf";
import { listOwnNotesProgress } from "@/lib/notes/progressService";
import { summarizeNotesProgress } from "@/lib/notes/progress";
import { notesTopicTitles } from "@/lib/notes/topicTitles";
import { getLastNpsAt } from "@/lib/feedback/service";
import { needsNps } from "@/lib/feedback/nps";
import AttemptsList from "../mock/_components/AttemptsList";
import FeedbackCards from "./FeedbackCards";
import TodayCard from "./TodayCard";
import ProgressTiles from "./ProgressTiles";
import WeakSpots from "./WeakSpots";
import ContinueCard from "./ContinueCard";
import { loadContinue } from "@/lib/me/continueServer";
import type { ContinueItem } from "@/lib/me/continue";
import HomeReminder from "./HomeReminder";
import { greetingFor, greetingName } from "@/lib/me/today";
import Greeting from "./Greeting";
import SuggestExamCard from "./SuggestExamCard";
import { loadSuggestedExam } from "@/lib/profile/suggestExamServer";
import { getExamBySlug } from "@/lib/exam/examContext";
import { getOwnWeekly } from "@/lib/goals/service";
import { listMyAssignments } from "@/lib/assignments/service";
import type { StudentAssignmentView } from "@/lib/assignments/core";
import { CalendarClock, Check, GraduationCap } from "lucide-react";
import StageNudge from "./StageNudge";
import ResultCheckCard from "./ResultCheckCard";
import { loadPendingResultChecks, loadSuggestedName } from "@/lib/results/service";
import { checkQuestion } from "@/lib/results/check";
import { mockCatalogueHref } from "@/lib/exam/examLinks";
import { istDayKey } from "@/lib/email/dueNudge";
import { getOnboardingState } from "@/lib/profile/service";
import {
  STAGE_LABELS,
  isStage,
  needsStageNudge,
  sanitizeTargetExams,
} from "@/lib/profile/onboarding";
import { getExamIdMap } from "@/lib/exam/examIdMap";
import { getNotesExamGroups } from "@/lib/notes/notesNav";
import {
  firstMockHref,
  firstNotesHref,
  yourExamLinks,
  type ExamLink,
} from "@/lib/exam/examLinks";
import { cn } from "@/lib/utils";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Your dashboard",
  robots: { index: false },
};

export default async function MePage() {
  const user = await getSessionUser();
  if (!user) redirect("/login?next=/me");

  const db = createSupabaseServerClient();
  await logActivityOnce(db, user.id, surfaceViewedEvent(user.id, "me", new Date()));
  const [attempts, notesRows, lastNpsAt, weekly, assigned, profile, examIds] =
    await Promise.all([
    getUserAttempts(db, user.id),
    listOwnNotesProgress(db, user.id),
    getLastNpsAt(db, user.id),
    getOwnWeekly(db, user.id),
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
  const showNps = needsNps({ completedMocks: mocks.completed, lastNpsAt, now: Date.now() });

  // Continue-where-you-left-off: an open mock beats a recently-read chapter.
  const resume = mocks.resumeAttempt;
  // Where they were last working, across the bank, /board, notes and homework
  // (2026-11-06). Best effort: a failed read costs the card, never the page.
  const continueItems = await loadContinue(
    createTypedServerClient(),
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
  const examLinks = yourExamLinks(targets, examIds);
  const mockHref = firstMockHref(targets);
  const notesHref = firstNotesHref(targets, notesSlugs);
  const now = new Date();
  const showStageNudge = needsStageNudge({ stage, now });
  // "Did you clear it?" after a result is announced (migration 0149). Best
  // effort: a failed read costs the card, never the dashboard.
  const [resultCheck] = await loadPendingResultChecks(user.id, targets, istDayKey(now)).catch((e) => {
    console.error("result checks read failed", e instanceof Error ? e.message : e);
    return [];
  });
  const suggestedName = resultCheck ? await loadSuggestedName(user.id).catch(() => "") : "";
  // No exam chosen: offer the one their practice or first page points to.
  const suggestedSlug = targets.length === 0 ? await loadSuggestedExam(db, user.id, examIds) : null;
  const suggestedExam = suggestedSlug ? getExamBySlug(suggestedSlug) : null;

  return (
    <>
      <AppHeader />
      <main className="mx-auto max-w-4xl space-y-6 px-4 py-6 sm:space-y-8 sm:px-6 sm:py-8">
        {/* A greeting, not "Your dashboard" over the student's own email. */}
        <header className="space-y-2">
          <Greeting
            greeting={greetingFor(istHour(now))}
            name={greetingName({ preferred_name: user.preferredName, full_name: user.name })}
          />
          {examLinks.length > 0 ? (
            <YourExams links={examLinks} />
          ) : suggestedExam ? (
            <SuggestExamCard slug={suggestedExam.slug} examName={suggestedExam.displayName} />
          ) : (
            <NoTargetCard />
          )}
        </header>

        {resultCheck && (
          <ResultCheckCard
            announcementId={resultCheck.id}
            question={checkQuestion(resultCheck)}
            sitting={resultCheck.sitting}
            suggestedName={suggestedName}
            practiseHref={mockCatalogueHref(resultCheck.examSlug)}
          />
        )}

        {showStageNudge && stage && (
          <StageNudge stageLabel={STAGE_LABELS[stage]} year={now.getFullYear()} />
        )}

        {/* ONE brand card with ONE lead action (2026-10-05). It replaced the
            continue card, the welcome card and the week strip, which put three
            full-width blue buttons on a phone before any progress. */}
        <TodayCard
          resume={
            resume
              ? { title: resume.mockTitle, href: `/mock/${resume.mockSlug}/attempt/${resume.attemptId}` }
              : undefined
          }
          cont={cont ? { title: cont.title, chapter: cont.subtitle, href: cont.href } : undefined}
          mockHref={mockHref}
          initialDone={weekly.done}
          initialGoal={weekly.goal}
        />

        {/* The reminder ask, one row, only while mistakes are waiting and
            only until it is answered on any screen (2026-10-05). */}
        <HomeReminder vapidKey={process.env.VAPID_PUBLIC_KEY ?? ""} pushPromptedAt={profile.pushPromptedAt} />

        {/* Papers a teacher has assigned to this student's batch, with the
            deadline (ENGAGEMENT_SPEC.md C1). Rendered only when there is one,
            so the page gains nothing for the 90% of students with no batch. */}
        {assigned.length > 0 && <DueList items={assigned} />}


        {/* Answered · % right · fixed, across every surface (2026-11-05). The
            row it replaced counted mocks, notes checkpoints and saves: 446 of
            745 students saw three zeros there while practising in the bank. */}
        <ProgressTiles />

        {/* The chapters holding most waiting mistakes, each with its own Fix
            (2026-11-06): 448 of 745 /me visitors had misses waiting. */}
        <WeakSpots />

        {/* A card only when it has something in it: 363 of 745 students saw
            "No mocks yet." beside "Nothing read yet." (2026-11-05), 236 of
            them after answering questions in the bank. grid-cols-1 + min-w-0:
            a grid track defaults to its content's width, so a long attempt
            title pushed these cards off a phone's screen. */}
        {attempts.length > 0 || continueItems.length > 0 ? (
          <div
            className={cn(
              "grid grid-cols-1 gap-6",
              attempts.length > 0 && continueItems.length > 0 && "lg:grid-cols-2"
            )}
          >
            {attempts.length > 0 && <RecentMocks mocks={mocks} attempts={attempts} browseHref={mockHref} />}
            {continueItems.length > 0 && <ContinueCard items={continueItems} notesHref={notesHref} />}
          </div>
        ) : (
          <AlsoHere mockHref={mockHref} notesHref={notesHref} />
        )}

        <FeedbackCards showNps={showNps} />
      </main>
    </>
  );
}

/* ------------------------------------------------------------ due list */

/** Deadline pull: paper, batch, due label, one Start button. Sat papers show a
 *  tick and no button. At most three rows; the rest are on the mock pages. */
function DueList({ items }: { items: StudentAssignmentView[] }) {
  const shown = items.slice(0, 3);
  return (
    <section aria-labelledby="due-heading" className="rounded-xl border bg-card p-6">
      <h2 id="due-heading" className="flex items-center gap-2 text-sm font-semibold tracking-tight">
        <CalendarClock className="h-4 w-4 text-brand-accent" aria-hidden />
        Set by your teacher
      </h2>
      <ul className="mt-3 divide-y">
        {shown.map((a) => (
          <li key={a.id} className="flex items-center gap-3 py-2.5">
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium">{a.mockTitle}</p>
              <p className="mt-0.5 truncate text-xs text-muted-foreground">
                <span
                  className={cn(
                    "font-medium",
                    a.done
                      ? "text-emerald-600 dark:text-emerald-400"
                      : a.state === "overdue"
                        ? "text-red-600 dark:text-red-400"
                        : a.state === "due-soon"
                          ? "text-amber-600 dark:text-amber-400"
                          : "text-foreground"
                  )}
                >
                  {a.done ? "Done" : a.label}
                </span>
                {" \u00b7 "}
                {a.batchName}
                {a.note && <> {" \u00b7 "} {a.note}</>}
              </p>
            </div>
            {a.done ? (
              <Check className="h-4 w-4 shrink-0 text-emerald-600" aria-label="Sat" />
            ) : (
              <Link
                href={`/mock/${a.mockSlug}`}
                className="inline-flex h-9 shrink-0 items-center justify-center rounded-md bg-brand px-4 text-sm font-medium text-brand-foreground transition-colors hover:bg-brand/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                Start
              </Link>
            )}
          </li>
        ))}
      </ul>
      {items.length > shown.length && (
        <p className="mt-2 text-xs text-muted-foreground">
          {items.length - shown.length} more on your mock pages.
        </p>
      )}
    </section>
  );
}

/* ------------------------------------------------------------ your exams */

/** The student's target exams, in order, each to its best destination. */
function YourExams({ links }: { links: ExamLink[] }) {
  return (
    <section aria-label="Your exams" className="flex flex-wrap items-center gap-2">
      <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
        Your exams
      </span>
      {links.map((l) => (
        <Link
          key={l.slug}
          href={l.href}
          prefetch={false}
          className="inline-flex h-8 items-center rounded-full border px-3 text-sm font-medium transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        >
          {l.label}
        </Link>
      ))}
      <Link
        href="/account"
        prefetch={false}
        className="text-xs font-medium text-brand-accent hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        Change
      </Link>
    </section>
  );
}

/** Shown instead of the exam row when the student has no target exam: one
 *  quiet line, not a card with a full-width button. */
function NoTargetCard() {
  return (
    <p className="text-sm text-muted-foreground">
      <GraduationCap className="mr-1.5 inline h-4 w-4 align-[-3px] text-brand-accent" aria-hidden />
      Tell us your exam and this page shows only what you need.{" "}
      <Link
        href="/account"
        prefetch={false}
        className="font-medium text-brand-accent underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        Choose your exam
      </Link>
    </p>
  );
}

/* ------------------------------------------------------------------ cards */

function SectionCard({
  title,
  meta,
  action,
  children,
}: {
  title: string;
  /** A quiet fact beside the title, e.g. "3 sat · best 62%". */
  meta?: string;
  action?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <section className="min-w-0 rounded-2xl border bg-card p-4 sm:p-5">
      <div className="mb-3 flex items-center justify-between gap-2">
        <h2 className="min-w-0 truncate text-sm font-semibold tracking-tight">
          {title}
          {meta && <span className="ml-2 font-normal tabular-nums text-muted-foreground">{meta}</span>}
        </h2>
        {action}
      </div>
      {children}
    </section>
  );
}

function CardLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      prefetch={false}
      className="inline-flex items-center gap-1 text-xs font-medium text-brand-accent hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      {children}
      <ArrowRight className="h-3 w-3" aria-hidden />
    </Link>
  );
}

/** Shown only when the student has sat a mock. The count and best score
 *  moved here from the progress row (2026-11-05). */
function RecentMocks({
  mocks,
  attempts,
  browseHref,
}: {
  mocks: ReturnType<typeof summarizeUserMocks>;
  attempts: Awaited<ReturnType<typeof getUserAttempts>>;
  /** The first target exam's catalogue, else /mock. */
  browseHref: string;
}) {
  const recent = attempts.slice(0, 3);
  const meta =
    mocks.completed > 0
      ? `${mocks.completed} sat${mocks.bestPct == null ? "" : ` \u00b7 best ${mocks.bestPct}%`}`
      : undefined;
  return (
    <SectionCard
      title="Recent mocks"
      meta={meta}
      action={
        attempts.length > recent.length ? (
          <CardLink href="/mock/attempts">All {attempts.length}</CardLink>
        ) : (
          <CardLink href={browseHref}>Browse mocks</CardLink>
        )
      }
    >
      <AttemptsList attempts={recent} flush />
      {/* The diagnosis needs one graded sitting to say anything. */}
      {mocks.completed > 0 && (
        <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 border-t pt-3">
          <CardLink href="/me/map">Your map</CardLink>
          <CardLink href="/performance">What to work on</CardLink>
        </div>
      )}
    </SectionCard>
  );
}

/** In place of the two cards when both would be empty: one quiet line. */
function AlsoHere({ mockHref, notesHref }: { mockHref: string; notesHref: string }) {
  const link =
    "font-medium text-brand-accent underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";
  return (
    <p className="text-sm text-muted-foreground">
      Also here:{" "}
      <Link href={mockHref} prefetch={false} className={link}>
        timed mocks
      </Link>
      {" \u00b7 "}
      <Link href={notesHref} prefetch={false} className={link}>
        notes
      </Link>
    </p>
  );
}

/** The hour of the day in India (0-23), for the greeting. */
function istHour(d: Date): number {
  return Number(
    new Intl.DateTimeFormat("en-IN", { timeZone: "Asia/Kolkata", hour: "numeric", hourCycle: "h23" }).format(d)
  );
}
