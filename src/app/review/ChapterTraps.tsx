"use client";

import { useEffect, useId, useState } from "react";
import Link from "next/link";
import { ArrowRight, ChevronDown, Lightbulb, TriangleAlert } from "lucide-react";
import { sendActivity, sendActivityOnce } from "@/lib/activity/clientBeacon";
import type { ChapterTraps as Traps } from "@/lib/guide/chapterTraps";

/**
 * "How this chapter catches students" on a Review chapter (2026-11-11): the
 * chapter's traps from its strategy-guide playbook, read beside the student's
 * own wrong answers there. Two lines show (the first trap, cut short); Show
 * more opens every trap, the "Spot it" line and the playbook link. Owner's
 * choice over a fully folded panel: folded, few would ever see it.
 *
 * Plain props from the server (lib/guide/chapterTraps is server-only).
 * Records shown / expand / playbook per chapter and day (surface review_traps).
 */
export default function ChapterTraps({ chapterId, traps }: { chapterId: string; traps: Traps }) {
  const [open, setOpen] = useState(false);
  const bodyId = useId();
  useEffect(() => {
    sendActivityOnce(`review_traps:${chapterId}`, { kind: "surface_viewed", surface: "review_traps", chapterId, action: "shown" });
  }, [chapterId]);

  const [first, ...rest] = traps.traps;
  const toggle = () => {
    if (!open) sendActivity({ kind: "surface_viewed", surface: "review_traps", chapterId, action: "expand" });
    setOpen((v) => !v);
  };

  return (
    <section aria-labelledby={`${bodyId}-h`} className="rounded-2xl border bg-card p-4 sm:p-5">
      <h2 id={`${bodyId}-h`} className="flex items-center gap-2 text-sm font-semibold tracking-tight">
        <Lightbulb className="h-4 w-4 text-brand-accent" aria-hidden />
        How this chapter catches students
      </h2>

      <div id={bodyId} className="mt-3 space-y-3">
        <Trap trap={first} clamp={!open} />
        {open && (
          <>
            {rest.map((t) => (
              <Trap key={t.name} trap={t} clamp={false} />
            ))}
            <p className="rounded-lg bg-accent px-3 py-2 text-sm leading-relaxed">
              <strong className="font-semibold">Spot it:</strong> {traps.trigger}
            </p>
            <Link
              href={traps.playbook.href}
              prefetch={false}
              onClick={() => sendActivity({ kind: "surface_viewed", surface: "review_traps", chapterId, action: "playbook" })}
              className="inline-flex min-h-[44px] items-center gap-1.5 text-sm font-medium text-brand-accent underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              {traps.playbook.label}
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </>
        )}
      </div>

      <button
        type="button"
        onClick={toggle}
        aria-expanded={open}
        aria-controls={bodyId}
        className="mt-1 inline-flex min-h-[44px] items-center gap-1.5 text-sm font-medium text-brand-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      >
        {open ? "Show less" : rest.length > 0 ? `Show more (${rest.length} more trap${rest.length === 1 ? "" : "s"})` : "Show more"}
        <ChevronDown className={`h-4 w-4 transition-transform motion-reduce:transition-none ${open ? "rotate-180" : ""}`} aria-hidden />
      </button>
    </section>
  );
}

function Trap({ trap, clamp }: { trap: { name: string; description: string }; clamp: boolean }) {
  return (
    <div className="flex gap-2.5">
      <TriangleAlert className="mt-0.5 h-4 w-4 shrink-0 text-amber-700 dark:text-amber-400" aria-hidden />
      <p className={`text-sm leading-relaxed text-muted-foreground ${clamp ? "line-clamp-2" : ""}`}>
        <strong className="font-semibold text-foreground">
          {trap.name}
          {/[.?!]$/.test(trap.name) ? "" : "."}
        </strong>{" "}
        {trap.description}
      </p>
    </div>
  );
}
