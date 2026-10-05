import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Sparkles, Target, Timer } from "lucide-react";
import AppHeader from "@/components/AppHeader";
import { getSessionUser } from "@/lib/auth";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { logActivity, logActivityOnce } from "@/lib/activity/service";
import { surfaceViewedEvent } from "@/lib/activity/views";
import { getOwnDrill } from "@/lib/drill/service";
import { getOnboardingState } from "@/lib/profile/service";
import { needsPushPrompt } from "@/lib/profile/push";
import DrillRunner from "./DrillRunner";
import { drillHref, parseDrillFrom } from "@/lib/drill/from";

/**
 * `/drill` — five questions this student has already got wrong, served back.
 *
 * THE FIRST READER OF `answer_wrong`. The engagement spine has recorded every
 * missed mock question since migration 0052 — 10,401 of them over 132 students
 * by the time this shipped — and until now nothing anywhere showed a student
 * one of them again. That is the whole feature: retrieval practice on material
 * that is already known to be weak, which is the "deliberate practice" and
 * "spaced repetition" pair the engagement gate names.
 *
 * Per-student and never cached: force-dynamic, noindex.
 */
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Fix your mistakes",
  robots: { index: false },
};

/** A uuid, loosely: enough to keep junk out of a query without a 400 page. */
const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export default async function DrillPage({
  searchParams,
}: {
  searchParams?: { attempt?: string; from?: string | string[] };
}) {
  const user = await getSessionUser();
  if (!user) redirect("/login?next=/drill");

  // `?attempt=<id>`: "Fix these mistakes" from a result page narrows the pool
  // to that sitting's wrong answers (ENGAGEMENT_SPEC.md A1). Anything that is
  // not a uuid is ignored, not rejected: the page's job is to serve practice.
  const attemptId =
    searchParams?.attempt && UUID_RE.test(searchParams.attempt) ? searchParams.attempt : null;

  // Which link brought them (lib/drill/from): recorded, never acted on.
  const from = parseDrillFrom(searchParams?.from);

  const [drill, profile] = await Promise.all([
    getOwnDrill({ attemptId }),
    getOnboardingState(createSupabaseServerClient(), user.id),
  ]);
  if (!drill) redirect("/login?next=/drill");
  // The end screen's reminder ask, until it is answered on any screen.
  const remind = needsPushPrompt(profile) ? { vapidKey: process.env.VAPID_PUBLIC_KEY ?? "" } : null;

  // Reach: the view (once a day) and, when there is something to do, the
  // start — so "opened the drill and left" is no longer invisible.
  {
    const db = createSupabaseServerClient();
    const now = new Date();
    const view = surfaceViewedEvent(user.id, "drill", now, attemptId ?? undefined);
    await logActivityOnce(db, user.id, { ...view, metadata: { ...view.metadata, from } });
    if (drill.questions.length > 0) {
      await logActivity(db, user.id, {
        kind: "drill_started",
        refId: attemptId ?? undefined,
        refKind: attemptId ? "mock_attempt" : undefined,
        metadata: { count: drill.questions.length, scoped: Boolean(drill.scope), from },
      });
    }
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;

  return (
    <>
      <AppHeader />
      <main className="mx-auto max-w-2xl px-4 py-6 sm:px-6 sm:py-8">
        <header className="flex items-start gap-3">
          <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand/10 text-brand-accent">
            <Target className="h-5 w-5" aria-hidden />
          </span>
          <div className="min-w-0">
            <h1 className="text-xl font-semibold tracking-tight sm:text-2xl">
              {drill.scope ? "Fix these mistakes" : "Fix your mistakes"}
            </h1>
            <p className="line-clamp-2 text-sm text-muted-foreground">
              {drill.scope
                ? `From ${drill.scope.mockTitle}`
                : drill.fresh > 0 && drill.fresh === drill.questions.length
                  ? "Five new questions from where you are weakest."
                  : drill.fresh > 0
                    ? "Your mistakes first, then new ones from the same topics."
                    : "Questions you\u2019ve got wrong before, one at a time."}
            </p>
          </div>
        </header>

        <div className="mt-6">
          {drill.questions.length > 0 ? (
            <DrillRunner
              questions={drill.questions}
              dueTotal={drill.dueTotal}
              fresh={drill.fresh}
              supabaseUrl={supabaseUrl}
              scope={drill.scope}
              remind={remind}
            />
          ) : drill.scope ? (
            <ScopedEmptyState />
          ) : (
            <EmptyState />
          )}
        </div>
      </main>
    </>
  );
}

/** The scoped drill has nothing left: every mistake from that paper is fixed
 *  or resting. The general pool may still have work, so that is the offer. */
function ScopedEmptyState() {
  return (
    <div className="rounded-2xl border bg-card p-6 text-center">
      <span className="mx-auto inline-flex h-12 w-12 items-center justify-center rounded-full bg-brand/10 text-brand-accent">
        <Sparkles className="h-6 w-6" aria-hidden />
      </span>
      <p className="mt-3 font-semibold">Nothing left to fix from this paper</p>
      <p className="mx-auto mt-2 max-w-sm text-sm text-muted-foreground">
        Every mistake from it is either fixed or resting until its check comes round.
      </p>
      <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:justify-center">
        <Link
          href={drillHref("again")}
          prefetch={false}
          className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-brand px-6 text-base font-medium text-brand-foreground transition-colors hover:bg-brand/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        >
          <Target className="h-5 w-5" aria-hidden />
          Fix mistakes from other papers
        </Link>
        <Link
          href="/mock"
          className="inline-flex h-12 items-center justify-center rounded-xl border px-6 text-base font-medium transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        >
          Take a mock test
        </Link>
      </div>
    </div>
  );
}

/**
 * One empty state for two cases: "you have never missed anything" and "you
 * have fixed everything you missed" both arrive as an empty drill with no
 * target exam to fill from, and the copy has to be true of both.
 */
function EmptyState() {
  return (
    <div className="rounded-2xl border bg-card p-6 text-center">
      <span className="mx-auto inline-flex h-12 w-12 items-center justify-center rounded-full bg-brand/10 text-brand-accent">
        <Sparkles className="h-6 w-6" aria-hidden />
      </span>
      <p className="mt-3 font-semibold">Nothing to practise right now</p>
      <p className="mx-auto mt-2 max-w-sm text-sm text-muted-foreground">
        Nothing is due, and there are no new questions to draw from until you pick a target
        exam on your account page. A question you miss in a mock or in the bank lands here. Get it
        right once and it leaves the list; miss it again and it comes back.
      </p>
      <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:justify-center">
        <Link
          href="/mock"
          className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-brand px-6 text-base font-medium text-brand-foreground transition-colors hover:bg-brand/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        >
          <Timer className="h-5 w-5" aria-hidden />
          Take a mock test
        </Link>
        <Link
          href="/browse"
          className="inline-flex h-12 items-center justify-center rounded-xl border px-6 text-base font-medium transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        >
          Answer questions in the bank
        </Link>
      </div>
    </div>
  );
}
