"use client";

import { useId, useState, type ReactNode } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";

/**
 * The personalised layout of an index page: an eyebrow over the viewer's own
 * cards, a "Change your exams" link, and everything else folded under a
 * disclosure button. Shared by ExamFeedList (/mock, /notes, /guide) and
 * BoardFeedList (/board) so the two cannot drift.
 *
 * `other` null = nothing to fold: the button is not rendered at all.
 * `primary` null = none of the viewer's exams is on this page: no eyebrow, just
 * the link and the fold (the page's no-content notice sits above).
 */
export default function FeedSections({
  eyebrow,
  primary,
  otherLabel,
  other,
}: {
  eyebrow: string;
  primary: ReactNode | null;
  otherLabel: string;
  other: ReactNode | null;
}) {
  const [open, setOpen] = useState(false);
  const panelId = useId();

  return (
    <div>
      <div className="mt-8 flex flex-wrap items-baseline justify-between gap-2">
        {primary !== null ? (
          <p className="text-xs font-semibold uppercase tracking-wide text-brand-accent">{eyebrow}</p>
        ) : (
          <span aria-hidden />
        )}
        <Link
          href="/account"
          prefetch={false}
          className="text-xs font-medium text-muted-foreground underline-offset-2 hover:text-foreground hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          Change your exams
        </Link>
      </div>
      {primary}
      {other !== null && (
        <div className={primary !== null ? "mt-8 border-t pt-4" : "mt-3 border-t pt-4"}>
          <button
            type="button"
            aria-expanded={open}
            aria-controls={panelId}
            onClick={() => setOpen((v) => !v)}
            className="inline-flex items-center gap-1.5 rounded-md text-sm font-medium text-muted-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            {otherLabel}
            <ChevronDown className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`} aria-hidden />
          </button>
          {open && <div id={panelId}>{other}</div>}
        </div>
      )}
    </div>
  );
}
