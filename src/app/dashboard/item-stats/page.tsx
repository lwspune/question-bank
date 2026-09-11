import Link from "next/link";
import { redirect } from "next/navigation";
import { AlertTriangle, ChevronRight } from "lucide-react";
import AppHeader from "@/components/AppHeader";
import StatCard from "@/app/dashboard/StatCard";
import KatexRenderer from "@/components/math/KatexRenderer";
import { getSessionSuperadmin } from "@/lib/auth";
import { loadItemStatOverview } from "@/lib/itemStats/admin";
import { LEAD_RATIO_DEFAULT, MIN_N_CHIP, MIN_N_HEADLINE } from "@/lib/itemStats/leads";

export const dynamic = "force-dynamic";

const SOURCE_LABEL: Record<string, string> = {
  tracker: "Institute (OMR)",
  vault_mock: "Online mock",
};

/**
 * Item statistics — coverage, and the wrong-key LEADS queue.
 *
 * Superadmin-only. Two reasons, and the second is the stronger: the numbers pool
 * across every org by construction, so this is cross-tenant data with no org
 * filter (the platform-wide dashboard precedent); and acting on a lead means
 * editing question content, which is superadmin-only since migration 0056.
 *
 * A LEAD IS NOT A VERDICT. A distractor outpulling the key means the key is
 * wrong, OR the question is hard and the distractor is a well-built trap (which
 * is what a good PYQ does), OR there is a systematic misconception worth
 * teaching to. The data cannot separate them, so this page ranks and links —
 * it never re-keys anything. An adjudicated outcome belongs in `question_reviews`
 * (migration 0074).
 *
 * See ITEM_STATS.md.
 */
export default async function ItemStatsPage({
  searchParams,
}: {
  searchParams?: { ratio?: string };
}) {
  if (!(await getSessionSuperadmin())) redirect("/browse");

  const parsed = Number(searchParams?.ratio);
  const minRatio = Number.isFinite(parsed) && parsed >= 0 ? parsed : LEAD_RATIO_DEFAULT;

  const { coverage, leads, keyNeverChosen } = await loadItemStatOverview(minRatio);

  return (
    <>
      <AppHeader />
      <main className="mx-auto max-w-6xl p-8">
        <nav className="mb-2 flex items-center gap-1 text-sm text-muted-foreground">
          <Link href="/dashboard" className="hover:text-foreground">
            Dashboard
          </Link>
          <ChevronRight className="h-3.5 w-3.5" aria-hidden />
          <span className="text-foreground">Item statistics</span>
        </nav>

        <h1 className="text-2xl font-semibold tracking-tight">Item statistics</h1>
        <p className="mt-1 max-w-3xl text-sm text-muted-foreground">
          How students have actually performed on each bank question, pooled across every
          source. Coverage is deliberately sparse — only a question with real response volume
          says anything.
        </p>

        <section className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard kind="numeric" label="Questions with data" value={coverage.questionsWithData} />
          <StatCard kind="numeric" label={`At n≥${MIN_N_CHIP}`} value={coverage.atChipThreshold} />
          <StatCard kind="numeric" label={`At n≥${MIN_N_HEADLINE}`} value={coverage.atHeadlineThreshold} />
          <StatCard kind="numeric" label="Total attempts" value={coverage.totalAttempts} />
        </section>

        <p className="mt-3 text-xs text-muted-foreground">
          {coverage.bySource
            .map(
              (s) =>
                `${SOURCE_LABEL[s.source] ?? s.source}: ${s.sittings.toLocaleString()} sittings, ${s.attempts.toLocaleString()} attempts`
            )
            .join(" · ")}
        </p>

        <section className="mt-10">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <h2 className="text-lg font-semibold tracking-tight">
              Key-doubt leads
              <span className="ml-2 text-sm font-normal text-muted-foreground">
                {leads.length} shown
                {keyNeverChosen > 0 && ` · ${keyNeverChosen} with a key nobody chose`}
              </span>
            </h2>
            <div className="flex items-center gap-2 text-sm">
              <span className="text-muted-foreground">Ratio</span>
              {[0, 1, 2, 3].map((r) => (
                <Link
                  key={r}
                  href={`/dashboard/item-stats?ratio=${r}`}
                  className={
                    minRatio === r
                      ? "rounded bg-brand px-2 py-0.5 text-brand-foreground"
                      : "rounded px-2 py-0.5 text-muted-foreground hover:bg-accent"
                  }
                >
                  {r === 0 ? "all" : `≥${r}×`}
                </Link>
              ))}
            </div>
          </div>

          <div className="mt-2 flex items-start gap-2 rounded-md border border-amber-500/40 bg-amber-500/5 p-3 text-sm">
            <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-amber-600" aria-hidden />
            <p className="text-muted-foreground">
              <span className="font-medium text-foreground">These are leads, not verdicts.</span>{" "}
              A distractor outpulling the key can mean the key is wrong, that the distractor is a
              well-built trap, or that a misconception is widespread. Read the question before
              concluding anything, and record what you conclude.{" "}
              <span className="font-medium text-foreground">
                MARK ≠ KEY is the exception:
              </span>{" "}
              it means students were marked against a different answer than the paper records —
              a mis-keyed or dropped question. Which of those is still yours to decide, but that
              something is wrong is not in doubt. It is scoped to the sitting it happened in.
            </p>
          </div>

          {leads.length === 0 ? (
            <p className="mt-6 text-sm text-muted-foreground">
              No leads at this threshold.
            </p>
          ) : (
            <ul className="mt-4 space-y-2">
              {leads.map(({ lead, question, pct }) => (
                <li
                  key={lead.questionId}
                  className="rounded-lg border bg-card p-3 text-sm"
                >
                  <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    <span
                      className={
                        lead.reason === "verdict-mismatch"
                          ? "rounded bg-amber-500/15 px-1.5 font-mono text-xs font-semibold tabular-nums text-amber-700 dark:text-amber-400"
                          : "font-mono text-xs font-semibold tabular-nums"
                      }
                    >
                      {lead.reason === "verdict-mismatch"
                        ? `MARK ≠ KEY on ${lead.verdictMismatch}`
                        : lead.reason === "key-never-chosen"
                          ? "KEY NEVER CHOSEN"
                          : `${(lead.ratio as number).toFixed(1)}×`}
                    </span>
                    <span className="text-xs tabular-nums text-muted-foreground">
                      key {lead.topDistractor && `vs ${lead.topDistractor.label}`}:{" "}
                      {lead.keyCount} vs {lead.topDistractor?.count} · n={lead.attempted} · {pct}%
                      correct
                      {lead.discrimination !== null &&
                        ` · disc ${lead.discrimination >= 0 ? "+" : ""}${lead.discrimination.toFixed(2)}`}
                    </span>
                    {question && (
                      <span className="text-xs text-muted-foreground">
                        {question.exam.name} · {question.chapter.name}
                      </span>
                    )}
                    <Link
                      href={`/dashboard/questions/${lead.questionId}/edit`}
                      className="ml-auto text-xs text-brand-accent hover:underline"
                    >
                      Open
                    </Link>
                  </div>
                  <div className="mt-1 line-clamp-2 font-serif text-sm">
                    {question ? (
                      <KatexRenderer text={question.text} />
                    ) : (
                      <span className="text-muted-foreground">
                        (question not readable — withdrawn or deleted)
                      </span>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>
      </main>
    </>
  );
}
