"use client";

import Link from "next/link";
import { setExamCookie } from "@/lib/exam/examCookie";
import type { HomeExamChip } from "@/lib/exam/homeChips";

/**
 * The homepage's exam chips (UX_REVIEW_TRIAGE.md A8). Built on the server by
 * `homeExamChips`; this island only remembers the tapped exam in `qb_exam`
 * (single exams only — see lib/exam/homeChips.ts for why a family sets none).
 * Wraps rather than scrolling sideways: a hidden half-row of exams is a
 * choice the visitor never sees.
 */
export default function HomeExamChips({ chips }: { chips: HomeExamChip[] }) {
  if (chips.length === 0) return null;
  return (
    <nav aria-labelledby="pick-exam" className="mb-8">
      <h2 id="pick-exam" className="mb-3 text-sm font-semibold text-muted-foreground">
        Pick your exam
      </h2>
      <ul className="flex flex-wrap gap-2">
        {chips.map((chip) => (
          <li key={chip.key}>
            <Link
              href={chip.href}
              onClick={() => {
                if (chip.cookieSlug) setExamCookie(chip.cookieSlug);
              }}
              className="inline-flex min-h-10 items-center rounded-full border bg-card px-4 py-2 text-sm font-medium transition-colors hover:border-brand-accent/60 hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              {chip.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
