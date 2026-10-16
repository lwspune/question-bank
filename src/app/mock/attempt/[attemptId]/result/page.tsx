import { redirect } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import AppHeader from "@/components/AppHeader";
import { getSessionUser } from "@/lib/auth";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { logActivityOnce } from "@/lib/activity/service";
import { surfaceViewedEvent } from "@/lib/activity/views";
import { getAttemptReview, MockError, type ReviewItem } from "@/lib/mocks/service";
import { getOwnProfile } from "@/lib/profile/service";
import { getMockFeedback } from "@/lib/mocks/feedbackService";
import { needsMobile } from "@/lib/profile/mobile";
import { resultPageAsk } from "@/lib/profile/push";
import { drillHref } from "@/lib/drill/from";
import AttemptReviewList from "@/app/mock/_components/AttemptReviewList";
import MobileGate from "./MobileGate";
import MockFeedback from "./MockFeedback";
import ShareResult from "./ShareResult";
import SendToFriend from "@/components/practice/SendToFriend";
import TogetherCard from "./TogetherCard";
import { loadTogetherCard } from "@/lib/practiceTests/togetherService";
import WhatsappOptIn from "./WhatsappOptIn";
import PushOptIn from "@/components/push/PushOptIn";
import Findings from "./Findings";
import ScoreCard from "./ScoreCard";
import ReviewFilterShell from "./ReviewFilterShell";
import { getUserAttempts } from "@/lib/mocks/query";
import { formatElapsed, previousComparable } from "@/lib/mocks/attemptHistory";
import PulseRefresh from "./PulseRefresh";
import CelebrateOnMount from "@/components/celebrate/CelebrateOnMount";
import { awardAnsweredMilestone } from "@/lib/celebrate/service";
import { milestoneMessage } from "@/lib/celebrate/milestones";
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
  // The A1 reframe's audience: who actually SAW a result screen.
  await logActivityOnce(db, user.id, surfaceViewedEvent(user.id, "result", new Date(), params.attemptId));

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
  const ask = resultPageAsk(profile);
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
  const fixHref = drillHref("result", params.attemptId);
  // The student's own attempts (RLS own-row, a few dozen rows at most): the
  // change since their last full paper in this subject, and the time taken.
  // Best-effort like the findings: a failure costs the chips, not the result.
  const history = await getUserAttempts(db, user.id).catch((e) => {
    console.error("mock result history failed", e);
    return [];
  });
  const self = history.find((a) => a.attemptId === params.attemptId);
  const delta = previousComparable(history, params.attemptId)?.delta ?? null;
  const elapsed = self?.durationSecs ? formatElapsed(self.startedAt, self.submittedAt, self.durationSecs) : null;
  const sections = multiSection
    ? mock.sections.flatMap((s) => {
        const ss = summary.sectionScores[s.key];
        return ss ? [{ key: s.key, label: s.label, score: ss.score, maxScore: ss.maxScore }] : [];
      })
    : [];
  // "N questions answered", celebrated at the trigger surface (2026-10-04).
  // Awarded only past the mobile gate, where the result is actually seen;
  // once per milestone by the table's dedupe key, so a refresh shows nothing.
  const milestone = await awardAnsweredMilestone(db, user.id);
  // Practise together (step 2): what this student and the friends who sat the
  // same practice test missed. Service role, because a friend's attempts are
  // their rows; the loader answers only for an attempt this student owns.
  // Best-effort: a failure costs the card, not the result.
  const together =
    mock.scope === "custom"
      ? await loadTogetherCard(createSupabaseAdminClient(), user.id, params.attemptId).catch((e) => {
          console.error("practice together card failed", e);
          return null;
        })
      : null;

  return (
    <>
      <AppHeader />
      <main className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
        <p className="text-sm text-muted-foreground">{mock.title}</p>
        <h1 className="mt-1 text-2xl font-bold tracking-tight">Your result</h1>
        {res.status === "expired" && (
          <p className="mt-1 text-sm text-amber-600">Time ran out, so the test was auto-submitted.</p>
        )}

        <PulseRefresh />
        <CelebrateOnMount message={milestone !== null ? milestoneMessage(milestone, "mock") : null} />

        <ScoreCard
          headline={headline}
          score={summary.score}
          maxScore={summary.maxScore}
          correct={summary.correct}
          wrong={summary.wrong}
          skipped={summary.skipped}
          sections={sections}
          delta={delta}
          elapsed={elapsed}
          fixHref={fixHref}
          mockSlug={mock.slug}
          practice={mock.scope === "custom"}
        />

        {/* Value before asks (2026-10-11): what to fix sits straight under the
            score; the rating, Share and the notification ask follow it, and
            all three stay above the review, which on a 150-question paper is
            the bottom of the page and would bury them. */}
        {report && <Findings report={report} attemptId={params.attemptId} />}

        {together && <TogetherCard state={together} />}

        <MockFeedback
          attemptId={params.attemptId}
          initialRating={feedback?.rating ?? null}
          initialComment={feedback?.comment ?? null}
        />

        {/* The distribution loop: a finished mock is the moment a student has
            something worth passing on. Offer only, never a gate, never
            rewarded. See ShareResult + lib/mocks/share.ts. */}
        {/* A practice test's own link opens for nobody else, so it is sent as
            a friend link instead: the friend gets their own copy (0163). */}
        {mock.scope === "custom" ? (
          <SendToFriend
            code={mock.slug}
            title={mock.title}
            questions={mock.totalQuestions}
            minutes={Math.round(mock.durationSecs / 60)}
            card
          />
        ) : (
          <ShareResult
            slug={mock.slug}
            title={mock.title}
            score={summary.score}
            maxScore={summary.maxScore}
          />
        )}

        {/* One ask per screen: push first, the WhatsApp card as its fallback
            (PushOptIn renders it when this browser cannot push) or on a later
            visit. See lib/profile/push.ts. */}
        {ask.push ? (
          <PushOptIn vapidKey={process.env.VAPID_PUBLIC_KEY ?? ""}>{ask.whatsapp && <WhatsappOptIn />}</PushOptIn>
        ) : (
          ask.whatsapp && <WhatsappOptIn />
        )}

        <h2 className="mt-8 text-lg font-semibold">Review your answers</h2>
        <ReviewFilterShell items={res.review!.items.map((i) => ({ position: i.position, verdict: i.verdict }))}>
          <AttemptReviewList items={res.review!.items} supabaseUrl={supabaseUrl} />
        </ReviewFilterShell>
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
