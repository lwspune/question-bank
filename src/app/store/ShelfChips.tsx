"use client";

import type { ExamSlug } from "@/lib/exam/examContext";
import { feedLayout, splitByFeed } from "@/lib/exam/examFeed";
import { useExamFeed } from "@/lib/viewer/useExamFeed";

export type ShelfChip = { key: string; short: string; count: number; slugs: readonly ExamSlug[] };

/**
 * The store's jump chips, one per shelf. Shown only while the shelves below are
 * the plain list: once a student's own shelves come first (ExamFeedList), the
 * rest are folded, so a chip would jump to a shelf that is not on the page. The
 * layout is worked out by the same rule ExamFeedList uses, so the two agree.
 */
export default function ShelfChips({ chips }: { chips: ShelfChip[] }) {
  const { feed } = useExamFeed();
  if (chips.length < 2) return null;
  if (feed.tier !== null) {
    const { primary, other } = splitByFeed(chips, (c) => c.slugs, feed);
    if (feedLayout(feed.tier, primary.length, other.length, { foldWhenNone: false }) !== "plain") return null;
  }

  return (
    <nav aria-label="Jump to an exam" className="-mx-4 mt-6 overflow-x-auto px-4 sm:mx-0 sm:px-0">
      <ul className="flex w-max gap-2 sm:w-auto sm:flex-wrap sm:justify-center">
        {chips.map((c) => (
          <li key={c.key}>
            <a
              href={`#shelf-${c.key}`}
              className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-full border bg-card px-3 py-1.5 text-sm font-medium hover:border-brand-accent hover:text-brand-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              {c.short}
              <span className="text-xs text-muted-foreground">{c.count}</span>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
