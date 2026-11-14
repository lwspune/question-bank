"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Loader2, Repeat } from "lucide-react";
import { Sheet, SheetContent, SheetDescription, SheetTitle } from "@/components/ui/sheet";
import HomeworkDayReader from "@/app/homework/_components/HomeworkDayReader";
import type { BoardQuestion } from "@/lib/board/query";
import type { HomeworkSlot } from "@/lib/homework/dayView";
import type { RepeatLine } from "@/lib/questions/repeatLine";
import { panelSlots, yourQuestionLine } from "@/lib/questions/repeatPanel";

/**
 * What the repeat line's "See all" opens since 2026-11-15 (owner, approved
 * mockup): the group's other papers in a panel on the SAME page, like V's
 * chat, so a student tries them without leaving the card they were on. On a
 * phone it fills the screen; from sm up it slides in on the right. Close (or
 * Esc) returns them where they were. "Open as a full page" keeps the old page.
 *
 * The questions come from GET /api/homework/group (the group page's own load,
 * cached for a day) and show with the page's own reader, so answers spend the
 * same free answers as the page. The student's own question is left out and
 * summed up in one line at the top (lib/questions/repeatPanel).
 */
type Group = {
  label: string;
  title: string;
  examName: string;
  href: string;
  slots: HomeworkSlot<BoardQuestion>[];
};

/** One load per group per page visit: reopening the panel shows it at once. */
const loaded = new Map<string, Group>();

export default function RepeatGroupPanel({
  open,
  onOpenChange,
  line,
  questionId,
  correct,
  onFullPage,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  line: RepeatLine;
  questionId: string;
  /** How the student did on their own question, when the screen knows. */
  correct: boolean | null;
  onFullPage: () => void;
}) {
  const key = `${line.planSlug}/${line.n}`;
  const [group, setGroup] = useState<Group | null>(() => loaded.get(key) ?? null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    if (!open || group) return;
    let active = true;
    fetch(`/api/homework/group?plan=${encodeURIComponent(line.planSlug)}&n=${line.n}`)
      .then((r) => (r.ok ? (r.json() as Promise<Group>) : Promise.reject(new Error(String(r.status)))))
      .then((g) => {
        loaded.set(key, g);
        if (active) setGroup(g);
      })
      .catch((e) => {
        console.error("repeat panel load failed", key, e);
        if (active) setFailed(true);
      });
    return () => {
      active = false;
    };
  }, [open, group, key, line.planSlug, line.n]);

  const view = group ? panelSlots(group.slots, questionId) : null;
  const yours = view ? yourQuestionLine({ sitting: view.ownSitting, correct }) : null;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        className="flex flex-col gap-0 p-0 sm:max-w-[30rem]"
        closeClassName="right-3 top-3 flex h-11 w-11 items-center justify-center rounded-xl border bg-card opacity-100"
      >
        <div className="border-b px-4 pb-3 pt-4 pr-16 font-sans">
          <SheetTitle className="flex items-center gap-2 text-base font-bold">
            <Repeat className="h-4 w-4 shrink-0 text-brand-accent" aria-hidden />
            {line.lead}
          </SheetTitle>
          <SheetDescription className="mt-1 text-[13px] leading-snug">
            {line.rest.replace(/^[:,]\s*/, "") || group?.label || ""}
          </SheetDescription>
        </div>

        <div className="flex-1 overflow-y-auto bg-background px-4 py-4">
          {!group && !failed && (
            <p className="flex items-center gap-2 font-sans text-sm text-muted-foreground" role="status">
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
              Loading the other papers…
            </p>
          )}
          {failed && (
            <p className="font-sans text-sm text-muted-foreground" role="alert">
              Could not load them here.{" "}
              <Link href={line.href} prefetch={false} onClick={onFullPage} className="font-semibold text-brand-accent hover:underline">
                Open them as a page
              </Link>
              .
            </p>
          )}
          {group && view && (
            <div className="space-y-3">
              {yours && <p className="font-sans text-sm font-semibold text-foreground">{yours}</p>}
              <p className="font-sans text-sm text-muted-foreground">Try each one first, then open its answer.</p>
              <HomeworkDayReader
                slots={view.slots}
                examName={group.examName}
                dayTitle={`${group.title}: ${group.label}`}
                supabaseUrl={process.env.NEXT_PUBLIC_SUPABASE_URL ?? ""}
                showChapter={false}
                paperHeadings
              />
            </div>
          )}
        </div>

        <div className="flex items-center justify-between gap-3 border-t px-4 py-1 font-sans">
          <span className="text-xs text-muted-foreground">Close to go back to your question</span>
          <Link
            href={line.href}
            prefetch={false}
            onClick={onFullPage}
            className="inline-flex min-h-11 items-center rounded-sm text-sm font-semibold text-brand-accent hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            Open as a full page
          </Link>
        </div>
      </SheetContent>
    </Sheet>
  );
}
