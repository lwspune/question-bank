"use client";

/**
 * A homework slot's "See all 8 of this type" (2026-11-16, owner): a tap opens
 * the group in a panel on the same page (RepeatGroupPanel, the one the repeat
 * line's See all opens since 2026-11-15), so the student tries the other papers
 * without leaving their homework, /board Top 10 or notes Top PYQs. It stays a
 * real link: Ctrl-click, middle-click or no JavaScript still opens the group's
 * full page.
 *
 * Taps are recorded as repeat_line events under their own screen names
 * (homework, board_top, notes_top), which the repeat-line readout leaves out.
 * A signed-out tap gets a quiet 401 and nothing is stored.
 */
import { useRef, useState, type MouseEvent } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { ChevronRight } from "lucide-react";
import { sendActivity } from "@/lib/activity/clientBeacon";
import type { RepeatLineFrom } from "@/lib/activity/clientEvents";

// Loaded on the first tap only: the panel carries the homework reader (which
// draws this list), and nothing in it may run during a cached page's render.
const RepeatGroupPanel = dynamic(() => import("@/components/question/RepeatGroupPanel"), {
  ssr: false,
});

type Step = "see_all" | "close" | "full_page";

export default function SeeAllGroupLink({
  label,
  href,
  planSlug,
  n,
  title,
  description,
  ownIds,
  correct,
  from,
}: {
  /** The link's own words ("See all 8 of this type"). */
  label: string;
  /** The group's full page. */
  href: string;
  planSlug: string;
  n: number;
  /** The panel's heading, from the slot's note (lib/homework/display groupPanelText). */
  title: string;
  description: string;
  /** Every part of the slot: left out of the panel, summed up in one line. */
  ownIds: readonly string[];
  /** How the student did on the slot, when an option was picked. */
  correct: boolean | null;
  from: RepeatLineFrom;
}) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const opener = useRef<HTMLAnchorElement>(null);

  const track = (action: Step) => {
    const questionId = ownIds[0];
    if (questionId) sendActivity({ kind: "surface_viewed", surface: "repeat_line", questionId, action, from });
  };

  const onClick = (e: MouseEvent<HTMLAnchorElement>) => {
    // A new tab or window keeps the full page.
    if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    e.preventDefault();
    track("see_all");
    setMounted(true);
    setOpen(true);
  };

  return (
    <>
      <Link
        ref={opener}
        href={href}
        prefetch={false}
        aria-haspopup="dialog"
        onClick={onClick}
        className="inline-flex items-center gap-0.5 whitespace-nowrap font-medium text-brand-accent hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        {label}
        <ChevronRight className="h-3.5 w-3.5" aria-hidden />
      </Link>
      {mounted && (
        <RepeatGroupPanel
          open={open}
          onOpenChange={(next) => {
            if (!next) track("close");
            setOpen(next);
          }}
          planSlug={planSlug}
          n={n}
          title={title}
          description={description}
          href={href}
          ownIds={ownIds}
          correct={correct}
          onFullPage={() => track("full_page")}
          returnFocusTo={opener}
        />
      )}
    </>
  );
}
