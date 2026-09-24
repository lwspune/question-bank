import { redirect } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { RotateCcw, Target, Timer } from "lucide-react";
import AppHeader from "@/components/AppHeader";
import { Button } from "@/components/ui/button";
import KatexRenderer from "@/components/math/KatexRenderer";
import BlockText from "@/components/math/BlockText";
import { cn } from "@/lib/utils";
import { publicImageUrl } from "@/lib/storage/imageUrl";
import { getSessionUser } from "@/lib/auth";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { getAttemptReview, MockError, type ReviewItem } from "@/lib/mocks/service";
import { getOwnProfile } from "@/lib/profile/service";
import { getMockFeedback } from "@/lib/mocks/feedbackService";
import { needsMobile } from "@/lib/profile/mobile";
import { needsWhatsappPrompt } from "@/lib/profile/whatsapp";
import AttemptReviewList from "@/app/mock/_components/AttemptReviewList";
import MobileGate from "./MobileGate";
import MockFeedback from "./MockFeedback";
import ShareResult from "./ShareResult";
import WhatsappOptIn from "./WhatsappOptIn";
import Findings from "./Findings";
import PulseRefresh from "./PulseRefresh";
import { buildResultHeadline } from "@/lib/mocks/resultHeadline";
import { getOwnPerformance } from "@/lib/performance/service";
import { buildMockReport, type MockReport } from "@/lib/email/mockReport";
import { readPeerAccuracy } from "@/lib/email/mockReportService";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";

export const metadata: Metadata = { robots: { index: false } };

type Params = { attemptId: string };

export default async function MockResultPage({ params }: { params: Params }) {
  const user = await getSessionUser();
  if (!user) redirect("/login?next=/mock");

  const db = createSupabaseServerClient();
  let res;
  try {
    res = await getAttemptReview(db, user.id, params.attemptId);
  } catch (e) {
    if (e instanceof MockError && e.status === 404) redirect("/mock");
    throw e;
  }
  if (res.status === "in_progress") redirect(`/mock/${res.slug}/attempt/${params.attemptId}`);

  const { summary, mock } = res.review!;

  // Gate the reward: a signed-in student must give their contact mobile once
  // before the score + review are revealed. Attempt is already graded + stored —
  // this gates only the VIEW, and is server-checked every render so it can't be
  // bypassed by refresh / back / URL-sharing. Once a mobile is on file, skipped.
  const profile = await getOwnProfile(db, user.id);
  if (needsMobile(profile)) {
    return (
      <>
        <AppHeader />
        <main className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
          <p className="text-sm text-muted-foreground">{mock.title}</p>
          <h1 className="mt-1 text-2xl font-bold tracking-tight">You&apos;re done!</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Your test has been submitted and graded.
          </p>
          <MobileGate mockTitle={mock.title} />
        </main>
      </>
    );
  }
  // Past the gate → a mobile is on file. Load any existing feedback (to render
  // the widget vs a filled state) and decide whether to offer the WhatsApp opt-in.
  const feedback = await getMockFeedback(db, params.attemptId);
  const report = await loadFindings(params.attemptId);
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const multiSection = mock.sections.length > 1;
  // The headline is about what they ATTEMPTED (lib/mocks/resultHeadline.ts).
  // It used to print score/max and a percentage of max marks: median 11% on a
  // paper 27% answered, read as a verdict on the student. See ENGAGEMENT_SPEC.md.
  const headline = buildResultHeadline(summary);
  const fixHref = `/drill?attempt=${params.attemptId}`;

  return (
    <>
      <AppHeader />
      <main className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
        <p className="text-sm text-muted-foreground">{mock.title}</p>
        <h1 className="mt-1 text-2xl font-bold tracking-tight">Your result</h1>
        {res.status === "expired" && (
          <p className="mt-1 text-sm text-amber-600">Time ran out — the test was auto-submitted.</p>
        )}

        <PulseRefresh />

        {/* Headline: accuracy on attempted, the unanswered count as its own
            fact, marks as a secondary line. One card, one primary action. */}
        <div className="mt-5 rounded-xl border bg-card p-6">
          {headline.accuracyPct !== null ? (
            <div className="text-4xl font-bold tabular-nums">
              {headline.accuracyPct}%
              <span className="ml-2 text-base font-normal text-muted-foreground">
                right on what you attempted
              </span>
            </div>
          ) : null}
          <p className={headline.accuracyPct !== null ? "mt-2 text-sm" : "text-base font-medium"}>
            {headline.lead}
          </p>
          {headline.detail && (
            <p className="mt-1 text-sm text-muted-foreground">{headline.detail}</p>
          )}
          <p className="mt-3 text-sm tabular-nums text-muted-foreground">
            {summary.score} / {summary.maxScore} marks
            {headline.attempted > 0 && (
              <>
                {" \u00b7 "}
                {summary.correct} right, {summary.wrong} wrong
              </>
            )}
          </p>

          {multiSection && (
            <div className="mt-4 grid gap-2 sm:grid-cols-2">
              {mock.sections.map((s) => {
                const ss = summary.sectionScores[s.key];
                if (!ss) return null;
                return (
                  <div key={s.key} className="flex items-center justify-between rounded-lg border px-4 py-3 text-sm">
                    <span className="font-medium">{s.label}</span>
                    <span className="font-mono tabular-nums text-muted-foreground">
                      {ss.score} / {ss.maxScore}
                    </span>
                  </div>
                );
              })}
            </div>
          )}

          {/* The primary action follows the data: something to fix, so the
              drill on THIS paper's mistakes; nothing wrong, so another mock;
              nothing attempted, so try again. Retake is never the lead when
              there is something to fix: 45% of students who sat one mock never
              sat a second, and the old lead was the same 150 minutes again. */}
          <div className="mt-5 flex flex-col gap-2 sm:flex-row sm:flex-wrap">
            {headline.primaryAction === "fix" && (
              <Button asChild variant="brand" size="lg" className="h-12 rounded-xl text-base">
                <Link href={fixHref} prefetch={false}>
                  <Target className="h-5 w-5" aria-hidden />
                  Fix these mistakes
                </Link>
              </Button>
            )}
            {headline.primaryAction === "fix" && (
              // What the button DOES, in one line, because a student who has
              // never seen a drill reads "Fix these mistakes" as "retake".
              // Two students had ever finished a drill when this was added
              // (2026-09-24); the same words are step 2 of /start.
              <p className="order-last basis-full text-xs text-muted-foreground sm:mt-1">
                Five of the questions you missed, with solutions, about five minutes. One you
                get right goes quiet; one you miss comes back round.
              </p>
            )}
            {headline.primaryAction === "another" && (
              <Button asChild variant="brand" size="lg" className="h-12 rounded-xl text-base">
                <Link href="/mock">
                  <Timer className="h-5 w-5" aria-hidden />
                  Take another mock
                </Link>
              </Button>
            )}
            {headline.primaryAction === "retake" ? (
              <Button asChild variant="brand" size="lg" className="h-12 rounded-xl text-base">
                <Link href={`/mock/${mock.slug}`}>
                  <RotateCcw className="h-5 w-5" aria-hidden />
                  Try again
                </Link>
              </Button>
            ) : (
              <Button asChild variant="outline" size="lg" className="h-12 rounded-xl text-base">
                <Link href={`/mock/${mock.slug}`}>
                  <RotateCcw className="h-4 w-4" aria-hidden />
                  Retake
                </Link>
              </Button>
            )}
          </div>
        </div>

        {/* The distribution loop: a finished mock is the moment a student has
            something worth passing on, and the paper they just sat is a thing
            their study group can open. Offer only — never a gate, never
            rewarded. See ShareResult + lib/mocks/share.ts. */}
        <ShareResult
          slug={mock.slug}
          title={mock.title}
          score={summary.score}
          maxScore={summary.maxScore}
        />

        {report && <Findings report={report} attemptId={params.attemptId} />}

        {/* Phase 3 — capture at the high-intent moment */}
        <MockFeedback
          attemptId={params.attemptId}
          initialRating={feedback?.rating ?? null}
          initialComment={feedback?.comment ?? null}
        />
        {needsWhatsappPrompt(profile) && <WhatsappOptIn />}

        {/* Review */}
        <h2 className="mt-8 text-lg font-semibold">Review — all {res.review!.items.length} questions</h2>
        <AttemptReviewList items={res.review!.items} supabaseUrl={supabaseUrl} />
      </main>
    </>
  );
}

/**
 * The findings card's data, and it is BEST-EFFORT ON PURPOSE.
 *
 * `get_own_performance` returns the student's whole answer history, so it is
 * both the most expensive read on this page and the most likely to fail on a
 * slow database. The score and the review below are the page's reason to exist
 * and they are already in hand by this point — losing the diagnosis must not
 * cost the student their result, so a failure logs at the boundary and renders
 * nothing. Same discipline as the activity writer, which never blocks the
 * action it is recording.
 *
 * PEER RATES, QUESTION LEVEL ONLY (ENGAGEMENT_SPEC.md C4, the user's decision
 * 2026-09-24). question_item_stats is staff-read by RLS, so this is the one
 * SERVICE-ROLE read on a student page — scoped to the ids of THIS attempt's
 * questions and pooled at read time by readPeerAccuracy, the same read the
 * report email makes. It says "62% of students got this right" about a
 * QUESTION; it never says anything about a person, which is the line the
 * engagement gate draws. Best-effort like the rest of this loader.
 */
async function loadFindings(attemptId: string): Promise<MockReport | null> {
  try {
    const payload = await getOwnPerformance();
    if (!payload) return null;
    const mine = payload.facts.filter((f) => f.a === attemptId).map((f) => f.q);
    const peer = await readPeerAccuracy(createSupabaseAdminClient(), mine).catch(() => new Map());
    return buildMockReport(payload, attemptId, peer, new Date());
  } catch (e) {
    console.error("mock result findings failed", e);
    return null;
  }
}
