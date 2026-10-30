import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BookOpen, Clock, FileText, Trophy, CheckCircle2, XCircle, MinusCircle, LogIn, Info, Users } from "lucide-react";
import AppHeader from "@/components/AppHeader";
import { Button } from "@/components/ui/button";
import { createSupabaseAnonClient, createSupabaseServerClient } from "@/lib/supabase/server";
import { getSessionUser, getSessionMember } from "@/lib/auth";
import { getMockBySlug, getUserAttempts } from "@/lib/mocks/query";
import { markingCopy } from "@/lib/mocks/marking";
import { mockKindNote } from "@/lib/mocks/catalogue";
import StartMock from "./StartMock";
import { getMockQuota } from "@/lib/mocks/service";
import { mockStartState } from "@/lib/mocks/quota";
import { passCta, passForBuyer } from "@/lib/billing/plans";
import { holdsPassFor, passScopeForExam } from "@/lib/billing/passScope";
import { readCountry } from "@/lib/acquisition/country";
import { headers } from "next/headers";
import { listActivePlans } from "@/lib/billing/plansQuery";
import { logActivityOnce } from "@/lib/activity/service";
import { surfaceViewedEvent } from "@/lib/activity/views";
import { paywallEvent } from "@/lib/activity/clientEvents";
import { getExamByName } from "@/lib/exam/examContext";
import ShareMock from "./ShareMock";
import AttemptsList from "../_components/AttemptsList";
import PaperDownload from "../_components/PaperDownload";
import { paperPageHref } from "@/lib/mocks/paperPage";
import { listMyAssignments } from "@/lib/assignments/service";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import SendToFriend from "@/components/practice/SendToFriend";
import { INVITE_PARAM, isInviteCode } from "@/lib/practiceTests/mockInvite";
import { getOrCreateInvite, readInvite } from "@/lib/practiceTests/mockInviteService";
import { readFirstNames } from "@/lib/practiceTests/togetherService";
import { canonicalFor, planSiteForPath } from "@/lib/sites/intl";

type Params = { slug: string };

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const mock = await getMockBySlug(createSupabaseAnonClient(), params.slug);
  if (!mock) return { title: "Mock test not found" };
  return {
    title: `${mock.title} — timed mock test`,
    description: `Sit the ${mock.title} as a full-length timed mock: ${mock.totalQuestions} questions, ${mock.totalMarks} marks, ${Math.round(mock.durationSecs / 60)} minutes, instant scoring.`,
    alternates: { canonical: canonicalFor(`/mock/${params.slug}`) },
  };
}

export default async function MockInstructions({
  params,
  searchParams,
}: {
  params: Params;
  searchParams?: Record<string, string | string[] | undefined>;
}) {
  const mock = await getMockBySlug(createSupabaseAnonClient(), params.slug);
  if (!mock) notFound();
  const [user, member] = await Promise.all([getSessionUser(), getSessionMember()]);
  const [myAttempts, quota] = user
    ? await Promise.all([
        getUserAttempts(createSupabaseServerClient(), user.id, mock.id),
        getMockQuota(createSupabaseServerClient()),
      ])
    : [[], null];

  // Practise together (migration 0166). Service role: the invite tables have
  // no student policies. Best-effort, so a failure costs the box or the note,
  // never the page.
  const admin = createSupabaseAdminClient();
  // Opened from a friend's link (?with=<code>): who sent it, unless it is the
  // viewer's own link.
  const withParam = searchParams?.[INVITE_PARAM];
  const withCode = isInviteCode(withParam) ? withParam : null;
  const sent = withCode
    ? await readInvite(admin, withCode, mock.slug).catch((e) => {
        console.error("mock page: read invite failed", e);
        return null;
      })
    : null;
  const fromFriend = sent && sent.inviterId !== user?.id ? sent : null;
  const senderName = fromFriend
    ? ((await readFirstNames(admin, [fromFriend.inviterId]).catch(() => null))?.get(fromFriend.inviterId) ?? null)
    : null;
  // The viewer's own invite, for the box under Start.
  const myInvite = user
    ? await getOrCreateInvite(admin, mock.id, user.id).catch((e) => {
        console.error("mock page: invite failed", e);
        return null;
      })
    : null;

  // Free-test limits (0120 + 0134): open, "N free left", or locked. A chapter
  // test counts against its own limit; a retake of this paper is always open,
  // and so is a paper a friend sent (0166).
  // The pass that covers THIS paper's exam (0206): the IMAT pass for an IMAT
  // paper, the Premium Pass for an Indian one. The database's trigger asks the
  // same question when the attempt starts.
  const examScope = passScopeForExam(getExamByName(mock.examName)?.slug);
  const examQuota = quota ? { ...quota, hasPass: holdsPassFor(quota, examScope) } : quota;
  const startState = mockStartState(examQuota, myAttempts.length > 0, mock.scope, fromFriend !== null);
  // The pass offered at the limit (null = none on sale; the card then links to /pricing).
  const mockPass =
    startState.kind === "open"
      ? null
      : passCta(
          passForBuyer(
            await listActivePlans(createSupabaseAnonClient()),
            examScope,
            // An international paper is sold on intl.pyqvault.com (0203), at the
            // buyer's country price where one is set (0206).
            planSiteForPath(`/mock/${params.slug}`),
            readCountry(headers())
          )
        );
  if (user) {
    const db = createSupabaseServerClient();
    const now = new Date();
    await logActivityOnce(db, user.id, surfaceViewedEvent(user.id, "mock_start", now, mock.id));
    if (startState.kind === "locked") {
      const gate = mock.scope === "sectional" ? "chapter_test" : "mock_limit";
      await logActivityOnce(db, user.id, paywallEvent("shown", gate, mockPass?.urlKey, { userId: user.id, now }));
    }
  }
  // Set by a teacher? One line under the title, only for a student in a batch
  // this paper was assigned to (ENGAGEMENT_SPEC.md C1). Best-effort.
  const assigned = user
    ? await listMyAssignments(user.id)
        .then((rows) => rows.find((a) => a.mockId === mock.id) ?? null)
        .catch(() => null)
    : null;

  const mins = Math.round(mock.durationSecs / 60);
  // A whole past paper can also be downloaded (2026-10-07); a chapter test or
  // a practice paper is not a paper anyone sat, so it cannot.
  const isPastPaper = mock.source === "pyq" && mock.scope === "full";
  const bilingual = getExamByName(mock.examName)?.bilingual === true;
  // Copy is derived, not hard-coded: MHT-CET has NO negative marking, and the
  // old wording asserted a penalty and told the reader to "skip if unsure" —
  // advice that costs marks when a blank scores the same as a wrong answer.
  const marking = markingCopy(mock.marking);
  // Stated for EVERY type, past papers included — see mockKindNote. This is the
  // screen someone reaches from a shared link, with no route to tell them what
  // they are about to sit.
  const kindNote = mockKindNote({
    source: mock.source,
    scope: mock.scope,
    examName: mock.examName,
    totalQuestions: mock.totalQuestions,
  });

  return (
    <>
      <AppHeader />
      <main className="mx-auto max-w-2xl px-4 py-8 sm:px-6">
        <Link href="/mock" className="text-sm text-muted-foreground hover:text-foreground">
          ← All mock tests
        </Link>

        <h1 className="mt-4 text-2xl font-bold tracking-tight">{mock.title}</h1>
        {assigned && (
          <p
            className={
              "mt-2 text-sm font-medium " +
              (assigned.done
                ? "text-emerald-600 dark:text-emerald-400"
                : assigned.state === "overdue"
                  ? "text-red-600 dark:text-red-400"
                  : "text-brand-accent")
            }
          >
            {assigned.done ? "Done" : assigned.label} {"\u00b7"} set by your teacher for {assigned.batchName}
            {assigned.note ? ` ${"\u00b7"} ${assigned.note}` : ""}
          </p>
        )}

        {/* Org staff (admins/teachers) get a copy-able share link for students. */}
        {member && <ShareMock slug={mock.slug} />}

        <div className="mt-6 grid grid-cols-3 gap-3">
          <Stat icon={FileText} value={String(mock.totalQuestions)} label="questions" />
          <Stat icon={Trophy} value={String(mock.totalMarks)} label="marks" />
          <Stat icon={Clock} value={`${mins}`} label="minutes" />
        </div>

        <p className="mt-6 flex items-start gap-2 rounded-lg border bg-muted/40 p-4 text-sm text-muted-foreground">
          <Info className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
          <span>{kindNote}</span>
        </p>

        <section className="mt-6 rounded-lg border bg-card p-5">
          <h2 className="text-sm font-semibold">Instructions</h2>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" aria-hidden />
              <span><strong className="text-foreground">{marking.correctValue}</strong> marks for every correct answer.</span>
            </li>
            <li className="flex items-start gap-2">
              <XCircle
                className={`mt-0.5 h-4 w-4 shrink-0 ${marking.hasPenalty ? "text-red-600" : "text-muted-foreground"}`}
                aria-hidden
              />
              <span><strong className="text-foreground">{marking.wrongValue}</strong> {marking.wrongNote}</span>
            </li>
            <li className="flex items-start gap-2">
              <MinusCircle className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" aria-hidden />
              <span><strong className="text-foreground">0</strong> {marking.unattemptedAdvice}</span>
            </li>
            <li className="flex items-start gap-2">
              <Clock className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" aria-hidden />
              <span>The <strong className="text-foreground">{mins}-minute</strong> timer starts when you begin and auto-submits at zero. You can jump between questions and flag them for review.</span>
            </li>
          </ul>
        </section>

        <div className="mt-6">
          {fromFriend && (
            <p className="mb-3 flex items-start gap-2 rounded-lg border border-brand-accent/30 bg-brand/10 p-3 text-sm">
              <Users className="mt-0.5 h-4 w-4 shrink-0 text-brand-accent" aria-hidden />
              <span>
                {senderName ?? "A friend"} sent you this paper. It&apos;s free for you, and when you have both finished
                you each see what the other missed.
              </span>
            </p>
          )}
          {user ? (
            <StartMock
              slug={mock.slug}
              bilingual={bilingual}
              startState={startState}
              mockPass={mockPass}
              unit={mock.scope === "sectional" ? "chapter_test" : "mock"}
              isPastPaper={isPastPaper}
              invite={fromFriend ? withCode : null}
            />
          ) : (
            <div className="rounded-lg border border-dashed p-5 text-center">
              <p className="text-sm text-muted-foreground">Sign in to take this timed mock and save your score.</p>
              <Button asChild variant="brand" className="mt-3">
                <Link
                  href={`/login?next=${encodeURIComponent(
                    `/mock/${mock.slug}${fromFriend && withCode ? `?${INVITE_PARAM}=${withCode}` : ""}`
                  )}`}
                >
                  <LogIn className="h-4 w-4" aria-hidden />
                  Sign in to start
                </Link>
              </Button>
            </div>
          )}
          {myInvite && (
            <div className="mt-3">
              <SendToFriend
                target={{ kind: "mock", slug: mock.slug, invite: myInvite }}
                title={mock.title}
                questions={mock.totalQuestions}
                minutes={mins}
              />
            </div>
          )}
          {isPastPaper && (
            <div className="mt-3 space-y-3">
              <PaperDownload slug={mock.slug} paperTitle={mock.title} bilingual={bilingual} />
              <Link
                href={paperPageHref(mock.slug)}
                className="inline-flex items-center gap-1.5 text-sm font-medium text-brand-accent underline-offset-2 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
              >
                <BookOpen className="h-4 w-4" aria-hidden />
                Read the whole paper with answers, free
              </Link>
            </div>
          )}
        </div>

        {myAttempts.length > 0 && (
          <section className="mt-8">
            <h2 className="mb-3 text-sm font-semibold">Your attempts</h2>
            <AttemptsList attempts={myAttempts} showMock={false} />
          </section>
        )}
      </main>
    </>
  );
}

function Stat({ icon: Icon, value, label }: { icon: typeof Clock; value: string; label: string }) {
  return (
    <div className="rounded-lg border bg-card p-3 text-center">
      <Icon className="mx-auto h-4 w-4 text-brand-accent" aria-hidden />
      <div className="mt-1 text-xl font-bold tabular-nums">{value}</div>
      <div className="text-xs text-muted-foreground">{label}</div>
    </div>
  );
}
