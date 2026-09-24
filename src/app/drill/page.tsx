import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Sparkles, Target, Timer } from "lucide-react";
import AppHeader from "@/components/AppHeader";
import { getSessionUser } from "@/lib/auth";
import { getOwnDrill } from "@/lib/drill/service";
import { COOL_DOWN_DAYS } from "@/lib/drill/select";
import DrillRunner from "./DrillRunner";

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
  searchParams?: { attempt?: string };
}) {
  const user = await getSessionUser();
  if (!user) redirect("/login?next=/drill");

  // `?attempt=<id>`: "Fix these mistakes" from a result page narrows the pool
  // to that sitting's wrong answers (ENGAGEMENT_SPEC.md A1). Anything that is
  // not a uuid is ignored, not rejected: the page's job is to serve practice.
  const attemptId =
    searchParams?.attempt && UUID_RE.test(searchParams.attempt) ? searchParams.attempt : null;

  const drill = await getOwnDrill({ attemptId });
  if (!drill) redirect("/login?next=/drill");

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
            <p className="truncate text-sm text-muted-foreground">
              {drill.scope
                ? `From ${drill.scope.mockTitle}`
                : "Questions you\u2019ve got wrong before, one at a time."}
            </p>
          </div>
        </header>

        <div className="mt-6">
          {drill.questions.length > 0 ? (
            <DrillRunner
              questions={drill.questions}
              dueTotal={drill.dueTotal}
              supabaseUrl={supabaseUrl}
              scope={drill.scope}
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
          href="/drill"
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
 * TWO empty states would be better than one, and this is deliberately the
 * honest single version: from the page's point of view "you have never missed
 * anything" and "everything you missed is resting" both arrive as an empty
 * drill, and the copy has to be true of both. It names the resting case
 * explicitly rather than implying the student has nothing to work on.
 */
function EmptyState() {
  return (
    <div className="rounded-2xl border bg-card p-6 text-center">
      <span className="mx-auto inline-flex h-12 w-12 items-center justify-center rounded-full bg-brand/10 text-brand-accent">
        <Sparkles className="h-6 w-6" aria-hidden />
      </span>
      <p className="mt-3 font-semibold">Nothing due right now</p>
      <p className="mx-auto mt-2 max-w-sm text-sm text-muted-foreground">
        Either you haven&apos;t sat a timed test yet, or you&apos;ve already fixed everything
        waiting. A question you get right comes back around {COOL_DOWN_DAYS} days later, once,
        to check it stuck.
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
          Browse questions
        </Link>
      </div>
    </div>
  );
}
