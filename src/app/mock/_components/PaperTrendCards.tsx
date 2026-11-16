/**
 * "What the papers show": each paper's most-asked chapters (or its subjects),
 * averaged over every published sitting (lib/mocks/pastPapersPage.ts
 * paperTrends). Shared by the past-papers page and the exam's syllabus page.
 */
import Link from "next/link";
import type { TrendCard } from "@/lib/mocks/pastPapersPage";

export default function PaperTrendCards({ trends }: { trends: readonly TrendCard[] }) {
  const trendCounts = [...new Set(trends.map((t) => t.papers))];
  return (
    <div className="mt-4 grid gap-3 lg:grid-cols-2">
      {trends.map((card) => {
        const max = Math.max(...card.rows.map((r) => r.perPaper), 1);
        return (
          <div key={card.code} className="rounded-lg border bg-card p-4">
            <h3 className="font-semibold">
              {card.title}{" "}
              <span className="font-normal text-muted-foreground">
                (of {card.total}
                {trendCounts.length > 1 ? `, over ${card.papers} papers` : ""})
              </span>
            </h3>
            <ul className="mt-3 space-y-2">
              {card.rows.map((r) => (
                <li key={r.name} className="flex items-center gap-3 text-sm">
                  <span className="w-36 shrink-0 break-words leading-snug sm:w-48">
                    {r.href ? (
                      <Link
                        href={r.href}
                        className="rounded-sm text-brand-accent underline-offset-2 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                      >
                        {r.name}
                      </Link>
                    ) : (
                      r.name
                    )}
                  </span>
                  <span className="h-2.5 flex-1 rounded-full bg-muted" aria-hidden>
                    <span
                      className="block h-2.5 rounded-full bg-brand"
                      style={{ width: `${Math.round((r.perPaper / max) * 100)}%` }}
                    />
                  </span>
                  <span className="w-10 shrink-0 text-right font-semibold tabular-nums">{r.perPaper}</span>
                </li>
              ))}
            </ul>
          </div>
        );
      })}
    </div>
  );
}

/** "What 19 sittings of NDA papers show", or a general title when the cards average different counts. */
export function trendsTitle(examName: string, trends: readonly TrendCard[]): string {
  const counts = [...new Set(trends.map((t) => t.papers))];
  return counts.length === 1
    ? `What ${counts[0]} sittings of ${examName} papers show`
    : `What the ${examName} past papers show`;
}
