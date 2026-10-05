import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import {
  ArrowRight,
  Bookmark,
} from "lucide-react";
import AppHeader from "@/components/AppHeader";
import { getSessionUser } from "@/lib/auth";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { logActivityOnce } from "@/lib/activity/service";
import { surfaceViewedEvent } from "@/lib/activity/views";
import { getUserAttempts } from "@/lib/mocks/query";
import { summarizeUserMocks } from "@/lib/mocks/perf";
import { listOwnNotesProgress } from "@/lib/notes/progressService";
import { summarizeNotesProgress } from "@/lib/notes/progress";
import { notesTopicTitles } from "@/lib/notes/topicTitles";
import { listBookmarkIds } from "@/lib/bookmarks/service";
import { getLastNpsAt } from "@/lib/feedback/service";
import { needsNps } from "@/lib/feedback/nps";
import AttemptsList from "../mock/_components/AttemptsList";
import FeedbackCards from "./FeedbackCards";
import TodayCard from "./TodayCard";
import { greetingFor } from "@/lib/me/today";
import { getOwnWeekly } from "@/lib/goals/service";
import { listMyAssignments } from "@/lib/assignments/service";
import type { StudentAssignmentView } from "@/lib/assignments/core";
import { CalendarClock, Check, GraduationCap } from "lucide-react";
import StageNudge from "./StageNudge";
import QuestionCard from "../browse/QuestionCard";
import { getQuestionOfDayId } from "@/lib/daily/service";
import { queryQuestionsByIds, type QuestionRow } from "@/lib/questions/query";
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
  const [attempts, notesRows, bookmarkIds, lastNpsAt, weekly, assigned, profile, examIds] =
    await Promise.all([
    getUserAttempts(db, user.id),
    listOwnNotesProgress(db, user.id),
    listBookmarkIds(db, user.id),
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
  const savedCount = bookmarkIds.length;
  const showNps = needsNps({ completedMocks: mocks.completed, lastNpsAt, now: Date.now() });

  // Continue-where-you-left-off: an open mock beats a recently-read chapter.
  const resume = mocks.resumeAttempt;
  const cont = notes.recent[0];
  const contTitles = cont ? notesTopicTitles(cont) : null;

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
  const daily = await loadQuestionOfDay(db, targets, examIds, now);

  return (
    <>
      <AppHeader />
      <main className="mx-auto max-w-4xl space-y-6 px-4 py-6 sm:space-y-8 sm:px-6 sm:py-8">
        {/* A greeting, not "Your dashboard" over the student's own email. */}
        <header className="space-y-2">
          <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">{greetingFor(istHour(now))}</h1>
          {examLinks.length > 0 ? <YourExams links={examLinks} /> : <NoTargetCard />}
        </header>

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
          cont={
            cont && contTitles
              ? {
                  title: contTitles.topic,
                  chapter: contTitles.chapter,
                  href: `/notes/${cont.subjectRoute}/${cont.chapterSlug}/${cont.subtopicSlug}`,
                }
              : undefined
          }
          mockHref={mockHref}
          initialDone={weekly.done}
          initialGoal={weekly.goal}
        />

        {/* Papers a teacher has assigned to this student's batch, with the
            deadline (ENGAGEMENT_SPEC.md C1). Rendered only when there is one,
            so the page gains nothing for the 90% of students with no batch. */}
        {assigned.length > 0 && <DueList items={assigned} />}

        {/* Question of the day (2026-10-04): one real past-year question from
            the student's exam, the same for everyone that day. It replaced a
            proposed "thought of the day": answering is practice, a miss joins
            the drill, and it is a card, never a pop-up in the way. */}
        {daily && (
          <section aria-labelledby="daily-heading" className="space-y-3">
            <div className="flex items-center gap-2.5">
              {/* eslint-disable-next-line @next/next/no-img-element -- pre-sized static asset, see ChatWidget's VFace */}
              <img src="/chat/v-talk.png" alt="" aria-hidden className="h-10 w-10 shrink-0 rounded-full" />
              <div>
                <h2 id="daily-heading" className="text-sm font-semibold tracking-tight">
                  V&apos;s question of the day
                </h2>
                <p className="text-xs text-muted-foreground">
                  Here&apos;s today&apos;s {daily.exam.name} one. Try it before you look.
                </p>
              </div>
            </div>
            <QuestionCard
              question={daily}
              index={1}
              canEdit={false}
              isLoggedIn
              supabaseUrl={process.env.NEXT_PUBLIC_SUPABASE_URL!}
              hideCart
              surface="daily"
            />
          </section>
        )}

        {/* Progress at a glance: one row of three tiles, each a link. They
            replaced the saved card (a whole card for one number), the notes
            counts and the mock card's boxed stat tiles. */}
        <section aria-label="Your progress" className="grid grid-cols-3 gap-2 sm:gap-3">
          <StatTile
            href="/mock/attempts"
            value={mocks.completed}
            label={mocks.completed === 1 ? "mock sat" : "mocks sat"}
            note={mocks.bestPct == null ? undefined : `best ${mocks.bestPct}%`}
          />
          <StatTile href={notesHref} value={notes.masteredCount} label="topics mastered" />
          <StatTile href="/saved" value={savedCount} label={savedCount === 1 ? "question saved" : "questions saved"} />
        </section>

        {/* grid-cols-1 + min-w-0: a grid track defaults to its content's width,
            so a long attempt title pushed these cards off a phone's screen. */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <RecentMocks mocks={mocks} attempts={attempts} browseHref={mockHref} />
          <KeepReading notesHref={notesHref} recent={notes.recent} bookmarkedCount={notes.bookmarkedCount} />
        </div>

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
  action,
  children,
}: {
  title: string;
  action?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <section className="min-w-0 rounded-2xl border bg-card p-4 sm:p-5">
      <div className="mb-3 flex items-center justify-between gap-2">
        <h2 className="text-sm font-semibold tracking-tight">{title}</h2>
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

function StatTile({
  href,
  value,
  label,
  note,
}: {
  href: string;
  value: number;
  label: string;
  note?: string;
}) {
  return (
    <Link
      href={href}
      prefetch={false}
      className="rounded-xl border bg-card p-3 transition-colors hover:border-brand/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:p-4"
    >
      <span className="block text-2xl font-bold tabular-nums tracking-tight text-brand-accent">{value}</span>
      <span className="mt-0.5 block text-xs leading-snug text-muted-foreground">{label}</span>
      {note && <span className="mt-0.5 block text-xs font-medium tabular-nums text-foreground">{note}</span>}
    </Link>
  );
}

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
  return (
    <SectionCard
      title="Recent mocks"
      action={
        attempts.length > recent.length ? (
          <CardLink href="/mock/attempts">All {attempts.length}</CardLink>
        ) : (
          <CardLink href={browseHref}>Browse mocks</CardLink>
        )
      }
    >
      {attempts.length === 0 ? (
        <EmptyLine text="No mocks yet." href={browseHref} cta="Take your first mock" />
      ) : (
        <>
          <AttemptsList attempts={recent} flush />
          {/* The diagnosis needs one graded sitting to say anything. */}
          {mocks.completed > 0 && (
            <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 border-t pt-3">
              <CardLink href="/me/map">Your map</CardLink>
              <CardLink href="/performance">What to work on</CardLink>
            </div>
          )}
        </>
      )}
    </SectionCard>
  );
}

function KeepReading({
  notesHref,
  recent,
  bookmarkedCount,
}: {
  /** The first target exam's notes hub, else /notes. */
  notesHref: string;
  recent: ReturnType<typeof summarizeNotesProgress>["recent"];
  bookmarkedCount: number;
}) {
  return (
    <SectionCard title="Keep reading" action={<CardLink href={notesHref}>All notes</CardLink>}>
      {recent.length === 0 ? (
        <EmptyLine text="Nothing read yet." href={notesHref} cta="Explore notes" />
      ) : (
        <ul className="-mx-2 space-y-0.5">
          {recent.slice(0, 4).map((r) => {
            const t = notesTopicTitles(r);
            return (
              <li key={r.subtopicSlug}>
                <Link
                  href={`/notes/${r.subjectRoute}/${r.chapterSlug}/${r.subtopicSlug}`}
                  className="flex min-w-0 items-baseline gap-2 rounded-lg px-2 py-1.5 hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <span className="min-w-0 flex-1 truncate text-sm font-medium">{t.topic}</span>
                  <span className="min-w-0 max-w-[40%] truncate text-xs text-muted-foreground">{t.chapter}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      )}
      {bookmarkedCount > 0 && (
        <p className="mt-3 flex items-center gap-1.5 border-t pt-3 text-xs text-muted-foreground">
          <Bookmark className="h-3.5 w-3.5" aria-hidden />
          {bookmarkedCount} bookmarked
        </p>
      )}
    </SectionCard>
  );
}

function EmptyLine({ text, href, cta }: { text: string; href: string; cta: string }) {
  return (
    <p className="text-sm text-muted-foreground">
      {text}{" "}
      <Link href={href} prefetch={false} className="font-medium text-brand-accent hover:underline">
        {cta}
      </Link>
    </p>
  );
}

/**
 * The first target exam that has past-year MCQs gives today's question; a
 * practice-only exam (no PYQs) is skipped for the next. Best-effort: any
 * failure means no card, never a broken dashboard.
 */
async function loadQuestionOfDay(
  db: ReturnType<typeof createSupabaseServerClient>,
  targets: readonly string[],
  examIds: Readonly<Record<string, string | null>>,
  now: Date
): Promise<QuestionRow | null> {
  const day = istDayKey(now);
  for (const slug of targets) {
    const examId = examIds[slug];
    if (!examId) continue;
    const id = await getQuestionOfDayId(slug, examId, day);
    if (!id) continue;
    try {
      const [row] = await queryQuestionsByIds(db, [id]);
      return row ?? null;
    } catch (e) {
      console.error("question of the day load failed", e);
      return null;
    }
  }
  return null;
}

/** The hour of the day in India (0-23), for the greeting. */
function istHour(d: Date): number {
  return Number(
    new Intl.DateTimeFormat("en-IN", { timeZone: "Asia/Kolkata", hour: "numeric", hourCycle: "h23" }).format(d)
  );
}
