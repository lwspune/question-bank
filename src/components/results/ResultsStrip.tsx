import Link from "next/link";
import { ArrowRight, Trophy } from "lucide-react";
import { getPublishedResults } from "@/lib/results/query";
import { groupResults, resultHeadline } from "@/lib/results/summary";
import { congratsKey } from "@/lib/results/congratulate";
import CongratulateButton from "./CongratulateButton";

/**
 * One line linking to /results: "6 PYQ Vault students cleared the NDA 2 2026
 * written exam". The newest published result, of the given exams when
 * `examSlugs` is set (an exam's own pages show only its own results).
 * Renders nothing when there is none, or when the read fails: a broken strip
 * must never break the page it sits on.
 *
 * A Congratulate button sits beside the link (2026-10-11). The card used to be
 * one big link, but a button cannot sit inside a link (keyboard and screen
 * readers break), so the link is now "See their names" alone.
 */
export default async function ResultsStrip({ examSlugs, className = "" }: { examSlugs?: readonly string[]; className?: string }) {
  const results = await getPublishedResults().catch(() => []);
  const group = groupResults(examSlugs ? results.filter((r) => examSlugs.includes(r.examSlug)) : results)[0];
  if (!group) return null;

  return (
    <div
      className={`flex flex-col gap-3 rounded-xl border bg-card p-4 sm:flex-row sm:items-center ${className}`}
    >
      <div className="flex min-w-0 flex-1 items-center gap-3">
        <span className="icon-tile flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand/10 text-brand-accent">
          <Trophy className="h-4 w-4" aria-hidden />
        </span>
        <span className="min-w-0 flex-1 text-sm font-semibold text-foreground">{resultHeadline(group)}</span>
      </div>
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 sm:shrink-0">
        <CongratulateButton
          resultKey={congratsKey(group)}
          count={group.names.length}
          examSlug={group.examSlug}
          stage={group.stage}
        />
        <Link
          href="/results"
          className="inline-flex items-center gap-1 whitespace-nowrap rounded-sm text-sm font-medium text-brand-accent hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        >
          See their names
          <ArrowRight className="h-3.5 w-3.5" aria-hidden />
        </Link>
      </div>
    </div>
  );
}
