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
import MobileGate from "./MobileGate";
import MockFeedback from "./MockFeedback";
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

        {/* Phase 3 — capture at the high-intent moment */}
        <MockFeedback
          attemptId={params.attemptId}
          initialRating={feedback?.rating ?? null}
          initialComment={feedback?.comment ?? null}
        />
        {needsWhatsappPrompt(profile) && <WhatsappOptIn />}

        {/* Review */}
        <h2 className="mt-8 text-lg font-semibold">Review — all {res.review!.items.length} questions</h2>
        <ol className="mt-4 space-y-4">
          {res.review!.items.map((item) => (
            <ReviewCard key={item.position} item={item} supabaseUrl={supabaseUrl} />
          ))}
        </ol>
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

function ReviewCard({ item, supabaseUrl }: { item: ReviewItem; supabaseUrl: string }) {
  const border = item.grace
    ? "border-l-amber-500"
    : item.verdict === 1
      ? "border-l-emerald-500"
      : item.verdict === -1
        ? "border-l-red-500"
        : "border-l-muted-foreground/40";
  return (
    <li className={cn("rounded-lg border border-l-4 bg-card p-4", border)}>
      <div className="flex items-center justify-between">
        <span className="font-mono text-xs text-muted-foreground">Q{item.position}</span>
        {item.grace ? (
          <span className="inline-flex items-center gap-1 text-xs font-medium text-amber-700 dark:text-amber-400">
            <Gift className="h-3.5 w-3.5" aria-hidden />
            Grace — awarded to all
          </span>
        ) : (
          <VerdictBadge verdict={item.verdict} />
        )}
      </div>
      {item.grace && (
        <p className="mt-2 rounded-md border border-amber-300 bg-amber-50 px-3 py-2 text-xs text-amber-800 dark:border-amber-800 dark:bg-amber-950/30 dark:text-amber-300">
          This question was officially dropped (or marked bonus) by NTA — every candidate was
          awarded full marks regardless of their answer, so there is no correct option. See the
          note in the solution for the reason.
        </p>
      )}
      {item.context && (
        <div className="mt-2 border-l-2 border-muted pl-3 font-serif text-sm italic text-muted-foreground">
          <BlockText text={item.context} />
        </div>
      )}
      <div className="mt-2 font-serif text-[15px] leading-relaxed [&_.katex]:max-w-full">
        <BlockText text={item.text} />
      </div>
      {item.imageUrl && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={publicImageUrl(supabaseUrl, item.imageUrl)} alt="Question diagram" className="mt-3 max-h-60 w-auto rounded border" />
      )}

      {item.format === "numeric" ? (
        /* JEE Section-B: no options to paint, so show the two values side by
           side. Rendered from the review row rather than re-derived here, so it
           cannot disagree with the verdict badge above it. */
        <dl className="mt-3 grid gap-2 sm:grid-cols-2">
          <div
            className={cn(
              "rounded-md border p-2 text-sm",
              item.verdict === 1 && "border-emerald-400 bg-emerald-50 dark:bg-emerald-950/30",
              item.verdict === -1 && "border-red-400 bg-red-50 dark:bg-red-950/30"
            )}
          >
            <dt className="text-xs font-medium text-muted-foreground">Your answer</dt>
            <dd className="mt-0.5 font-mono text-base">
              {item.numericResponse === null ? (
                <span className="text-muted-foreground">Not answered</span>
              ) : (
                item.numericResponse
              )}
            </dd>
          </div>
          <div className="rounded-md border border-emerald-400 bg-emerald-50 p-2 text-sm dark:bg-emerald-950/30">
            <dt className="text-xs font-medium text-muted-foreground">Correct answer</dt>
            <dd className="mt-0.5 font-mono text-base">
              {item.correctNumeric === null ? (
                <span className="text-muted-foreground">—</span>
              ) : (
                item.correctNumeric
              )}
            </dd>
          </div>
        </dl>
      ) : (
      <ul className="mt-3 space-y-1.5">
        {item.options.map((opt) => {
          // Grace questions have no valid key (NTA awarded all) — never paint an
          // option correct/wrong; just neutrally mark what the student picked.
          const isCorrect = !item.grace && opt.isCorrect;
          const isPicked = item.selectedLabel === opt.label;
          return (
            <li
              key={opt.label}
              className={cn(
                "flex items-start gap-2 rounded-md border p-2 text-sm",
                isCorrect && "border-emerald-400 bg-emerald-50 dark:bg-emerald-950/30",
                isPicked && !isCorrect && !item.grace && "border-red-400 bg-red-50 dark:bg-red-950/30",
                isPicked && item.grace && "border-amber-400 bg-amber-50 dark:bg-amber-950/30"
              )}
            >
              <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-muted text-xs font-bold">
                {opt.label}
              </span>
              <div className="min-w-0 flex-1 overflow-x-auto font-serif [&_.katex]:max-w-full">
                <KatexRenderer text={opt.text} />
              </div>
              {isCorrect && <span className="shrink-0 text-xs font-medium text-emerald-700 dark:text-emerald-400">Correct</span>}
              {isPicked && !isCorrect && (
                <span className={cn("shrink-0 text-xs font-medium", item.grace ? "text-amber-700 dark:text-amber-400" : "text-red-700 dark:text-red-400")}>Your pick</span>
              )}
            </li>
          );
        })}
      </ul>
      )}

      {item.solution && (
        <details className="mt-3 rounded-md border border-dashed bg-muted/20 p-3 text-sm">
          <summary className="cursor-pointer select-none font-sans text-xs font-medium text-brand-accent">Show solution</summary>
          <div className="mt-2 font-serif">
            <BlockText text={item.solution} />
            {item.solutionImageUrl && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={publicImageUrl(supabaseUrl, item.solutionImageUrl)} alt="Solution diagram" className="mt-3 max-h-60 w-auto rounded border" />
            )}
          </div>
        </details>
      )}
    </li>
  );
}

function VerdictBadge({ verdict }: { verdict: 1 | -1 | 0 }) {
  if (verdict === 1)
    return <span className="inline-flex items-center gap-1 text-xs font-medium text-emerald-700 dark:text-emerald-400"><Check className="h-3.5 w-3.5" aria-hidden />Correct</span>;
  if (verdict === -1)
    return <span className="inline-flex items-center gap-1 text-xs font-medium text-red-700 dark:text-red-400"><X className="h-3.5 w-3.5" aria-hidden />Wrong</span>;
  return <span className="inline-flex items-center gap-1 text-xs font-medium text-muted-foreground"><Minus className="h-3.5 w-3.5" aria-hidden />Skipped</span>;
}
