"use client";

import * as Popover from "@radix-ui/react-popover";
import { Check, ChevronDown } from "lucide-react";
import { EXAM_REGISTRY, type ExamSlug } from "@/lib/exam/examContext";

/**
 * Header pill that switches the active exam.
 *
 * It used to write the cookie and then call `router.refresh()` so the SERVER
 * would recompute the Bank/Guides/Notes hrefs. That stopped being viable once
 * pages became cacheable — a refresh would simply re-serve the same cached copy
 * and the nav would never change. The owner (HeaderBar) now holds the active
 * slug in client state and this pill just reports the choice upward, so the nav
 * updates instantly and no server round-trip is involved at all.
 */
export default function ExamPill({
  activeSlug,
  onPick,
}: {
  activeSlug: ExamSlug;
  onPick: (slug: ExamSlug) => void;
}) {
  const active =
    EXAM_REGISTRY.find((e) => e.slug === activeSlug) ?? EXAM_REGISTRY[0];

  function pick(slug: ExamSlug) {
    if (slug === activeSlug) return;
    onPick(slug);
  }

  return (
    <Popover.Root>
      <Popover.Trigger asChild>
        <button
          type="button"
          aria-label={`Switch exam — currently ${active.displayName}`}
          title="Switch exam — changes Bank, Guides & Notes"
          className="inline-flex h-9 items-center gap-1 rounded-full border border-brand-accent/30 bg-brand-accent/5 px-2.5 text-xs font-semibold text-brand-accent transition-colors hover:bg-brand-accent/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 sm:px-3"
        >
          <span>{active.displayName}</span>
          <ChevronDown className="h-3 w-3 text-brand-accent/70" aria-hidden />
        </button>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content
          align="end"
          sideOffset={8}
          className="z-50 w-48 rounded-md border bg-popover p-1 text-popover-foreground shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95"
        >
          <p className="px-3 py-2 text-xs text-muted-foreground">
            Switch exam context
          </p>
          {EXAM_REGISTRY.map((exam) => {
            const isActive = exam.slug === activeSlug;
            return (
              <button
                key={exam.slug}
                type="button"
                onClick={() => pick(exam.slug)}
                className="flex w-full items-center justify-between rounded-sm px-3 py-2 text-left text-sm transition-colors hover:bg-accent focus-visible:bg-accent focus-visible:outline-none"
              >
                <span>{exam.displayName}</span>
                {isActive ? (
                  <Check className="h-4 w-4 text-primary" aria-hidden />
                ) : null}
              </button>
            );
          })}
          <p className="border-t px-3 pb-2 pt-1.5 text-[10px] leading-tight text-muted-foreground">
            Sets the default exam for Bank, Guides, and Notes.
          </p>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}
