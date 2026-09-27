import Link from "next/link";
import { redirect } from "next/navigation";
import { ClipboardCheck, Lightbulb, MessageSquareHeart } from "lucide-react";
import AppHeader from "@/components/AppHeader";
import StatCard from "@/app/dashboard/StatCard";
import { getSessionSuperadmin } from "@/lib/auth";
import { getFeedbackOverview, type FeedbackItem, type MockRatingItem } from "@/lib/feedback/adminStats";
import { RATINGS, RATING_LABELS, isRating, type RatingDistribution } from "@/lib/mocks/feedback";

export const dynamic = "force-dynamic";

/** Rows in the per-mock table. The rest are one click away on each mock's page. */
const BY_MOCK_LIMIT = 15;

function pct(n: number, total: number): string {
  return total > 0 ? `${Math.round((n / total) * 100)}%` : "—";
}

function fmtDate(iso: string): string {
  return new Date(iso).toLocaleString("en-IN", {
    day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit",
  });
}

export default async function FeedbackDashboardPage() {
  // Platform-wide data (not org-scoped) — superadmin only.
  if (!(await getSessionSuperadmin())) redirect("/browse");

  const { nps, npsComments, featureRequests, mockRatings } = await getFeedbackOverview();

  return (
    <>
      <AppHeader />
      <main className="mx-auto max-w-4xl space-y-8 px-6 py-8">
        <div>
          <Link href="/dashboard" className="text-sm text-muted-foreground hover:text-foreground">
            ← Dashboard
          </Link>
          <h1 className="mt-2 flex items-center gap-2 text-2xl font-semibold tracking-tight">
            <MessageSquareHeart className="h-6 w-6 text-brand-accent" aria-hidden />
            Feedback
          </h1>
        </div>

        {/* Mock ratings — the largest channel, so it leads. */}
        <section className="space-y-3">
          <h2 className="flex items-center gap-2 text-sm font-semibold text-foreground/80">
            <ClipboardCheck className="h-4 w-4" aria-hidden />
            Mock ratings ({mockRatings.count})
          </h2>
          {mockRatings.count === 0 ? (
            <p className="rounded-lg border border-dashed p-6 text-center text-sm text-muted-foreground">
              No ratings yet — students rate a mock on its result page.
            </p>
          ) : (
            <>
              <div className="grid grid-cols-3 gap-3">
                {RATINGS.map((r) => (
                  <StatCard
                    key={r}
                    kind="text"
                    value={`${mockRatings.distribution[r]}`}
                    label={`${RATING_LABELS[r]} · ${pct(mockRatings.distribution[r], mockRatings.count)}`}
                  />
                ))}
              </div>
              <ByMockTable rows={mockRatings.byMock.slice(0, BY_MOCK_LIMIT)} />
              {mockRatings.byMock.length > BY_MOCK_LIMIT && (
                <p className="text-xs text-muted-foreground">
                  Showing the {BY_MOCK_LIMIT} most-rated of {mockRatings.byMock.length} mocks.
                </p>
              )}
              {mockRatings.comments.length > 0 && (
                <ul className="space-y-2">
                  {mockRatings.comments.map((c, i) => (
                    <RatingComment key={i} c={c} />
                  ))}
                </ul>
              )}
            </>
          )}
        </section>

        {/* NPS */}
        <section className="space-y-3">
          <h2 className="text-sm font-semibold text-foreground/80">Net Promoter Score</h2>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            <StatCard kind="numeric" value={nps.score} label="NPS" />
            <StatCard kind="text" value={`${nps.promoters}`} label="Promoters (9–10)" />
            <StatCard kind="text" value={`${nps.passives}`} label="Passives (7–8)" />
            <StatCard kind="text" value={`${nps.detractors}`} label="Detractors (0–6)" />
          </div>
          {nps.count === 0 && (
            <p className="rounded-lg border border-dashed p-6 text-center text-sm text-muted-foreground">
              No NPS responses yet — the prompt shows to students after 2 completed mocks.
            </p>
          )}
          {npsComments.length > 0 && (
            <ul className="space-y-2">
              {npsComments.map((c, i) => (
                <NpsComment key={i} c={c} />
              ))}
            </ul>
          )}
        </section>

        {/* Feature requests */}
        <section className="space-y-3">
          <h2 className="flex items-center gap-2 text-sm font-semibold text-foreground/80">
            <Lightbulb className="h-4 w-4" aria-hidden />
            Feature requests ({featureRequests.length})
          </h2>
          {featureRequests.length === 0 ? (
            <p className="rounded-lg border border-dashed p-6 text-center text-sm text-muted-foreground">
              No suggestions yet.
            </p>
          ) : (
            <ul className="space-y-2">
              {featureRequests.map((f, i) => (
                <li key={i} className="rounded-lg border bg-card p-3 text-sm">
                  <p className="text-foreground">{f.message}</p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {f.who} · {fmtDate(f.createdAt)}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </section>
      </main>
    </>
  );
}

function NpsComment({ c }: { c: FeedbackItem }) {
  const tone =
    c.score != null && c.score >= 9
      ? "text-emerald-700 dark:text-emerald-400"
      : c.score != null && c.score <= 6
        ? "text-red-700 dark:text-red-400"
        : "text-muted-foreground";
  return (
    <li className="rounded-lg border bg-card p-3 text-sm">
      <div className="flex items-start gap-2">
        <span className={`shrink-0 font-mono text-xs font-semibold tabular-nums ${tone}`}>
          {c.score}
        </span>
        <div className="min-w-0">
          <p className="text-foreground">{c.message}</p>
          <p className="mt-1 text-xs text-muted-foreground">
            {c.who} · {fmtDate(c.createdAt)}
          </p>
        </div>
      </div>
    </li>
  );
}

function ByMockTable({
  rows,
}: {
  rows: { slug: string; title: string; count: number; distribution: RatingDistribution }[];
}) {
  return (
    <div className="overflow-x-auto rounded-lg border">
      <table className="w-full text-sm">
        <thead className="bg-muted/40 text-xs text-muted-foreground">
          <tr>
            <th scope="col" className="px-3 py-2 text-left font-medium">Mock</th>
            <th scope="col" className="px-3 py-2 text-right font-medium">Ratings</th>
            {RATINGS.map((r) => (
              <th key={r} scope="col" className="px-3 py-2 text-right font-medium">
                {RATING_LABELS[r]}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((m) => (
            <tr key={m.slug || m.title} className="border-t">
              <td className="px-3 py-2">
                {m.slug ? (
                  // prefetch off: each mock page is a per-request admin render,
                  // and a table of prefetching links multiplies it.
                  <Link
                    href={`/dashboard/mocks/${m.slug}`}
                    prefetch={false}
                    className="underline-offset-2 hover:underline focus-visible:underline focus-visible:outline-none"
                  >
                    {m.title}
                  </Link>
                ) : (
                  m.title
                )}
              </td>
              <td className="px-3 py-2 text-right tabular-nums">{m.count}</td>
              {RATINGS.map((r) => (
                <td key={r} className="px-3 py-2 text-right tabular-nums">
                  {m.distribution[r]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function RatingComment({ c }: { c: MockRatingItem }) {
  return (
    <li className="rounded-lg border bg-card p-3 text-sm">
      <p className="text-foreground">
        <span className="mr-2 text-xs font-medium text-brand-accent">
          {isRating(c.rating) ? RATING_LABELS[c.rating] : c.rating}
        </span>
        {c.comment}
      </p>
      <p className="mt-1 text-xs text-muted-foreground">
        {c.who} · {c.mockTitle} · {fmtDate(c.createdAt)}
      </p>
    </li>
  );
}
