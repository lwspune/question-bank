import Link from "next/link";
import { ArrowRight, Lightbulb } from "lucide-react";
import type { BeforeYouStartLine } from "@/lib/mocks/beforeYouStart";

/**
 * "Before you start" on the mock instructions page (2026-11-11): what a guess,
 * a blank and a numeric answer are worth on THIS paper, computed from its
 * marking (lib/mocks/beforeYouStart.ts), plus the paper's strategy guide when
 * it has one. Renders nothing when no line can be proved for the paper.
 */
export default function BeforeYouStart({
  lines,
  guide,
}: {
  lines: readonly BeforeYouStartLine[];
  guide: { href: string; label: string } | null;
}) {
  if (lines.length === 0) return null;
  return (
    <section aria-labelledby="before-you-start-heading" className="mt-6 rounded-lg border bg-card p-5">
      <h2 id="before-you-start-heading" className="flex items-center gap-2 text-sm font-semibold">
        <Lightbulb className="h-4 w-4 text-brand-accent" aria-hidden />
        Before you start
      </h2>
      <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
        {lines.map((l) => (
          <li key={l.kind} className="flex items-start gap-2">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-accent" aria-hidden />
            <span>{l.text}</span>
          </li>
        ))}
      </ul>
      {guide && (
        <Link
          href={guide.href}
          prefetch={false}
          className="mt-3 inline-flex min-h-[44px] items-center gap-1.5 text-sm font-medium text-brand-accent underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        >
          {guide.label}
          <ArrowRight className="h-4 w-4" aria-hidden />
        </Link>
      )}
    </section>
  );
}
