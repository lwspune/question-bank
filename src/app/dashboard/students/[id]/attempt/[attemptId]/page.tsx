import Link from "next/link";
import { redirect, notFound } from "next/navigation";
import type { Metadata } from "next";
import { Check, X, Minus } from "lucide-react";
import AppHeader from "@/components/AppHeader";
import AttemptReviewList from "@/app/mock/_components/AttemptReviewList";
import { cn } from "@/lib/utils";
import { getSessionSuperadmin } from "@/lib/auth";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { getStudentDetail } from "@/lib/students/detail";
import { getAttemptReviewForAdmin, MockError } from "@/lib/mocks/service";

/**
 * A superadmin's view of ONE student's attempt.
 *
 * WHY THIS ROUTE EXISTS. /mock/attempt/[id]/result is own-row by construction —
 * it resolves through the anon client with `.eq(user_id, session.id)` — so
 * every attempt row on the admin dashboard linked to a page that threw 404 and
 * redirected the superadmin to /mock. The links were dead for the only people
 * who could see them.
 *
 * The student page is deliberately NOT touched. This is a separate route with
 * its own gate, reading through the service-role client, and it drops the
 * student-facing furniture that makes no sense here: the mobile-capture reward
 * gate, the feedback widget, the WhatsApp opt-in and the Retake button.
 */
export const dynamic = "force-dynamic";
export const metadata: Metadata = { robots: { index: false } };

type Params = { id: string; attemptId: string };

export default async function AdminAttemptReviewPage({ params }: { params: Params }) {
  if (!(await getSessionSuperadmin())) redirect("/browse");

  const db = createSupabaseAdminClient();
  const [detail, res] = await Promise.all([
    getStudentDetail(params.id),
    getAttemptReviewForAdmin(db, params.attemptId).catch((e) => {
      if (e instanceof MockError && e.status === 404) return null;
      throw e;
    }),
  ]);
  if (!detail || !res) notFound();

  if (res.status === "in_progress" || !res.review) {
    return (
      <>
        <AppHeader />
        <main className="mx-auto max-w-3xl space-y-4 px-6 py-8">
          <BackLink id={params.id} name={detail.profile.name} />
          <p className="rounded-lg border border-dashed p-8 text-center text-sm text-muted-foreground">
            This attempt is still in progress — there is nothing to review until it is submitted.
          </p>
        </main>
      </>
    );
  }

  const { summary, mock } = res.review;
  const pct = summary.maxScore > 0 ? Math.round((summary.score / summary.maxScore) * 100) : 0;
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const multiSection = mock.sections.length > 1;

  return (
    <>
      <AppHeader />
      <main className="mx-auto max-w-3xl space-y-4 px-6 py-8">
        <BackLink id={params.id} name={detail.profile.name} />

        <div className="rounded-lg border bg-card p-4">
          <p className="text-sm text-muted-foreground">{mock.title}</p>
          <p className="mt-1 text-3xl font-bold tabular-nums">
            {summary.score}
            <span className="text-base font-normal text-muted-foreground">
              {" "}
              / {summary.maxScore}
            </span>
            <span className="ml-3 text-base font-normal text-muted-foreground">{pct}%</span>
          </p>
          <div className="mt-3 grid grid-cols-3 gap-2 text-center">
            <Tally icon={Check} value={summary.correct} label="Correct" tone="text-emerald-600 dark:text-emerald-400" />
            <Tally icon={X} value={summary.wrong} label="Wrong" tone="text-red-600 dark:text-red-400" />
            <Tally icon={Minus} value={summary.skipped} label="Skipped" tone="text-muted-foreground" />
          </div>
          {multiSection && (
            <div className="mt-3 space-y-1 border-t pt-3">
              {mock.sections.map((s) => {
                const ss = summary.sectionScores?.[s.key];
                if (!ss) return null;
                return (
                  <div key={s.key} className="flex items-center justify-between text-sm">
                    <span className="font-medium">{s.label}</span>
                    <span className="font-mono tabular-nums text-muted-foreground">
                      {ss.score} / {ss.maxScore}
                    </span>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        <h2 className="mt-8 text-lg font-semibold">
          Review — all {res.review.items.length} questions
        </h2>
        <AttemptReviewList items={res.review.items} supabaseUrl={supabaseUrl} />
      </main>
    </>
  );
}

function BackLink({ id, name }: { id: string; name: string }) {
  return (
    <Link
      href={`/dashboard/students/${id}`}
      className="rounded text-sm text-muted-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      ← {name}
    </Link>
  );
}

function Tally({
  icon: Icon,
  value,
  label,
  tone,
}: {
  icon: typeof Check;
  value: number;
  label: string;
  tone: string;
}) {
  return (
    <div className="rounded-lg border p-2">
      <Icon className={cn("mx-auto h-4 w-4", tone)} aria-hidden />
      <div className="mt-1 text-lg font-bold tabular-nums">{value}</div>
      <div className="text-xs text-muted-foreground">{label}</div>
    </div>
  );
}
