"use client";

import Link from "next/link";
import { Target } from "lucide-react";
import { fixNudgeLine, fixNudgeLinkText } from "@/lib/drill/fixNudge";
import { drillHref } from "@/lib/drill/from";
import { useFixNudge } from "./fixNudgeStore";

/**
 * The "5 wrong today" line on a bank card (2026-10-05, mock 2A): one quiet
 * dashed box between the options and the solution, on the card whose wrong
 * answer was the day's 5th, 10th, 15th… Renders nothing on every other card.
 * The rule is lib/drill/fixNudge; how the card learns it is fixNudgeStore.
 */
export default function FixNudgeLine({ questionId }: { questionId: string }) {
  const nudge = useFixNudge(questionId);
  if (!nudge) return null;
  return (
    <div
      role="status"
      className="flex items-start gap-2.5 rounded-xl border border-dashed border-brand-accent/40 bg-brand-accent/5 px-3 py-2.5 font-sans text-[13px] leading-snug motion-safe:animate-fade-in-up"
    >
      <Target className="mt-0.5 h-4 w-4 shrink-0 text-brand-accent" aria-hidden />
      <div>
        <p>{fixNudgeLine(nudge.wrongToday)}</p>
        <Link
          href={drillHref("bank")}
          prefetch={false}
          className="mt-1 inline-block rounded-sm font-semibold text-brand-accent hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          {fixNudgeLinkText(nudge.due)} →
        </Link>
      </div>
    </div>
  );
}
