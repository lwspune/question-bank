import Link from "next/link";
import { ArrowRight, Trophy } from "lucide-react";
import { getPublishedResults } from "@/lib/results/query";
import { groupResults, resultHeadline } from "@/lib/results/summary";

/**
 * One line linking to /results: "6 PYQ Vault students cleared the NDA 2 2026
 * written exam". The newest published result, of the given exams when
 * `examSlugs` is set (an exam's own pages show only its own results).
 * Renders nothing when there is none, or when the read fails: a broken strip
 * must never break the page it sits on.
 */
export default async function ResultsStrip({ examSlugs, className = "" }: { examSlugs?: readonly string[]; className?: string }) {
  const results = await getPublishedResults().catch(() => []);
  const group = groupResults(examSlugs ? results.filter((r) => examSlugs.includes(r.examSlug)) : results)[0];
  if (!group) return null;

  return (
    <Link
      href="/results"
      className={`flex items-center gap-3 rounded-xl border bg-card p-4 transition-colors hover:border-brand/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${className}`}
    >
      <span className="icon-tile flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand/10 text-brand-accent">
        <Trophy className="h-4 w-4" aria-hidden />
      </span>
      <span className="min-w-0 flex-1 text-sm font-semibold text-foreground">{resultHeadline(group)}</span>
      <span className="hidden shrink-0 items-center gap-1 text-sm font-medium text-brand-accent sm:inline-flex">
        See their names
        <ArrowRight className="h-3.5 w-3.5" aria-hidden />
      </span>
      <ArrowRight className="h-4 w-4 shrink-0 text-brand-accent sm:hidden" aria-hidden />
    </Link>
  );
}
