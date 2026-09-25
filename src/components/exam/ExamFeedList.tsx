"use client";

import { Fragment, useId, useState, type ReactNode } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import type { ExamSlug } from "@/lib/exam/examContext";
import { splitByFeed } from "@/lib/exam/examFeed";
import { useExamFeed } from "@/lib/viewer/useExamFeed";

/**
 * "Your exams" first, the rest collapsed under "Other exams (N)" — for the
 * cached index pages /mock, /notes, /guide and /board (EXAM_TIER_SPEC.md §4.3).
 *
 * The server page still renders every card; it hands them here ALREADY
 * RENDERED, with the exam slugs each one belongs to. Rendered elements cross
 * the server→client boundary safely; functions and component references do not
 * (they compile under `next dev` and throw under `next start`). So the card
 * markup stays on the server and this island only reorders and groups.
 *
 * The first render is the plain list, in server order — useExamFeed returns
 * ANON_FEED until identity arrives — so hydration matches the cached HTML and
 * an anonymous visitor sees exactly today's page. The grouped view appears only
 * for a signed-in student with a known tier.
 */
export type FeedListItem = {
  key: string;
  /** The exam(s) this card belongs to. A family card lists every member. */
  slugs: readonly ExamSlug[];
  node: ReactNode;
};

export default function ExamFeedList({
  items,
  as = "ul",
  className,
}: {
  items: FeedListItem[];
  /** "ul" wraps each node in an <li>; "div" renders the nodes as they are. */
  as?: "ul" | "div";
  className?: string;
}) {
  const { feed } = useExamFeed();
  const [open, setOpen] = useState(false);
  const panelId = useId();

  const renderGroup = (group: FeedListItem[], extraClass = "") => {
    const cls = [className, extraClass].filter(Boolean).join(" ") || undefined;
    return as === "ul" ? (
      <ul className={cls}>
        {group.map((i) => (
          <li key={i.key}>{i.node}</li>
        ))}
      </ul>
    ) : (
      <div className={cls}>
        {group.map((i) => (
          <Fragment key={i.key}>{i.node}</Fragment>
        ))}
      </div>
    );
  };

  const { primary, other } =
    feed.tier === null
      ? { primary: items, other: [] as FeedListItem[] }
      : splitByFeed(items, (i) => i.slugs, feed);

  // Nothing to put first, or nothing to put away: keep today's list.
  if (feed.tier === null || primary.length === 0 || other.length === 0) {
    return renderGroup(items);
  }

  return (
    <div>
      <div className="mt-8 flex flex-wrap items-baseline justify-between gap-2">
        <p className="text-xs font-semibold uppercase tracking-wide text-brand-accent">
          Your exams
        </p>
        <Link
          href="/account"
          prefetch={false}
          className="text-xs font-medium text-muted-foreground underline-offset-2 hover:text-foreground hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          Change your exams
        </Link>
      </div>
      {renderGroup(primary, "!mt-3")}
      <div className="mt-8 border-t pt-4">
        <button
          type="button"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => setOpen((v) => !v)}
          className="inline-flex items-center gap-1.5 rounded-md text-sm font-medium text-muted-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        >
          Other exams ({other.length})
          <ChevronDown
            className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`}
            aria-hidden
          />
        </button>
        {open && <div id={panelId}>{renderGroup(other, "!mt-4")}</div>}
      </div>
    </div>
  );
}
