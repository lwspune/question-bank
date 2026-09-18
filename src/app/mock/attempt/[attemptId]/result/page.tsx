import { redirect } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { Check, X, Minus, RotateCcw, Gift } from "lucide-react";
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
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const pct = summary.maxScore > 0 ? Math.round((summary.score / summary.maxScore) * 100) : 0;
  const multiSection = mock.sections.length > 1;

  return (
    <>
      <AppHeader />
      <main className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
        <p className="text-sm text-muted-foreground">{mock.title}</p>
        <h1 className="mt-1 text-2xl font-bold tracking-tight">Your result</h1>
        {res.status === "expired" && (
          <p className="mt-1 text-sm text-amber-600">Time ran out — the test was auto-submitted.</p>
        )}

        {/* Score headline */}
        <div className="mt-5 rounded-xl border bg-card p-6 text-center">
          <div className="text-4xl font-bold tabular-nums">
            {summary.score}
            <span className="text-xl font-normal text-muted-foreground"> / {summary.maxScore}</span>
          </div>
          <div className="mt-1 text-sm text-muted-foreground">{pct}%</div>
          <div className="mx-auto mt-4 grid max-w-md grid-cols-3 gap-3">
            <Tally icon={Check} value={summary.correct} label="Correct" tone="text-emerald-600" />
            <Tally icon={X} value={summary.wrong} label="Wrong" tone="text-red-600" />
            <Tally icon={Minus} value={summary.skipped} label="Skipped" tone="text-muted-foreground" />
          </div>
        </div>

        {multiSection && (
          <div className="mt-4 grid gap-2 sm:grid-cols-2">
            {mock.sections.map((s) => {
              const ss = summary.sectionScores[s.key];
              if (!ss) return null;
              return (
                <div key={s.key} className="flex items-center justify-between rounded-lg border bg-card px-4 py-3 text-sm">
                  <span className="font-medium">{s.label}</span>
                  <span className="font-mono tabular-nums text-muted-foreground">
                    {ss.score} / {ss.maxScore}
                  </span>
                </div>
              );
            })}
          </div>
        )}

        <div className="mt-5 flex flex-wrap gap-2">
          <Button asChild variant="brand">
            <Link href={`/mock/${mock.slug}`}>
              <RotateCcw className="h-4 w-4" aria-hidden />
              Retake
            </Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/mock">All mock tests</Link>
          </Button>
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

function Tally({ icon: Icon, value, label, tone }: { icon: typeof Check; value: number; label: string; tone: string }) {
  return (
    <div className="rounded-lg border p-2">
      <Icon className={cn("mx-auto h-4 w-4", tone)} aria-hidden />
      <div className="mt-1 text-lg font-bold tabular-nums">{value}</div>
      <div className="text-xs text-muted-foreground">{label}</div>
    </div>
  );
}
