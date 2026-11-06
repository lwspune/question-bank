"use client";

import { useCallback, useState } from "react";
import Link from "next/link";
import { ArrowRight, BookOpen, CalendarDays, Library, ListChecks } from "lucide-react";
import type { ContinueItem, ContinueKind } from "@/lib/me/continue";
import HomeworkProgressLine from "./HomeworkProgressLine";

/**
 * /me's Continue card (2026-11-06): where the student was last working, newest
 * first, across the bank, /board, notes and homework. Replaced "Keep reading",
 * which listed notes topics only. Items are read on the server
 * (lib/me/continueServer); a homework entry fills in its day count here.
 */
const ICON: Record<ContinueKind, typeof BookOpen> = {
  bank: ListChecks,
  board: Library,
  notes: BookOpen,
  homework: CalendarDays,
};

const KIND_LABEL: Record<ContinueKind, string> = {
  bank: "Questions",
  board: "Textbook",
  notes: "Notes",
  homework: "Homework",
};

export default function ContinueCard({ items, notesHref }: { items: ContinueItem[]; notesHref: string }) {
  return (
    <section className="min-w-0 rounded-2xl border bg-card p-4 sm:p-5">
      <div className="mb-3 flex items-center justify-between gap-2">
        <h2 className="text-sm font-semibold tracking-tight">Continue</h2>
        <Link
          href={notesHref}
          prefetch={false}
          className="inline-flex items-center gap-1 text-xs font-medium text-brand-accent hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          All notes
          <ArrowRight className="h-3 w-3" aria-hidden />
        </Link>
      </div>
      <ul className="-mx-2 space-y-0.5">
        {items.map((i) => (
          <Row key={i.key} item={i} />
        ))}
      </ul>
    </section>
  );
}

function Row({ item }: { item: ContinueItem }) {
  const [href, setHref] = useState(item.href);
  const onHref = useCallback((h: string) => setHref(h), []);
  const Icon = ICON[item.kind];
  return (
    <li>
      <Link
        href={href}
        prefetch={false}
        className="flex min-w-0 items-center gap-3 rounded-lg px-2 py-2 hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        <Icon className="h-4 w-4 shrink-0 text-brand-accent" aria-label={KIND_LABEL[item.kind]} />
        <span className="min-w-0 flex-1">
          <span className="block truncate text-sm font-medium">{item.title}</span>
          <span className="block truncate text-xs text-muted-foreground">
            {item.kind === "homework" && item.planSlug ? (
              <HomeworkProgressLine slug={item.planSlug} fallback={item.subtitle} onHref={onHref} />
            ) : (
              <>
                {KIND_LABEL[item.kind]} {" · "} {item.subtitle}
              </>
            )}
          </span>
        </span>
      </Link>
    </li>
  );
}
