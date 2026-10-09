"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, ChevronDown, FileText } from "lucide-react";
import { HUB_BOARD_CHAPTERS } from "@/lib/board/hub";

export type BoardHubSubject = {
  subjectRoute: string;
  subjectName: string;
  chapters: { chapterSlug: string; name: string; count: number; href: string }[];
  /** This subject's whole past papers (/question-papers), when any are published. */
  papers?: { href: string; count: number };
};

/**
 * A board exam's chapters, one tab per subject, in BOOK order (the reader
 * follows the book, so the hub does too; never re-sorted by size).
 *
 * Replaces closed <details> boxes, where chapters appeared only after a tap.
 * All panels and chapter links are in the server HTML (inactive ones only
 * hidden), so the cached page keeps every link for crawlers. Chapter numbers
 * are not shown: Balbharati prints some books in two parts that each restart
 * at 1, so a running number would not match the printed book.
 */
const storageKey = (examSlug: string) => `qb_board_hub_tab:${examSlug}`;

export default function BoardHubTabs({ examSlug, subjects }: { examSlug: string; subjects: BoardHubSubject[] }) {
  const [active, setActive] = useState(0);
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    try {
      const i = subjects.findIndex((s) => s.subjectRoute === window.localStorage.getItem(storageKey(examSlug)));
      if (i > 0) setActive(i);
    } catch {
      /* storage unavailable: start on the first tab */
    }
  }, [examSlug, subjects]);

  function choose(i: number, focus = false) {
    setActive(i);
    try {
      window.localStorage.setItem(storageKey(examSlug), subjects[i].subjectRoute);
    } catch {
      /* not remembered, still switched */
    }
    if (focus) tabRefs.current[i]?.focus();
  }

  function onKey(e: React.KeyboardEvent, i: number) {
    const last = subjects.length - 1;
    const next =
      e.key === "ArrowRight" ? (i === last ? 0 : i + 1)
      : e.key === "ArrowLeft" ? (i === 0 ? last : i - 1)
      : e.key === "Home" ? 0
      : e.key === "End" ? last
      : null;
    if (next === null) return;
    e.preventDefault();
    choose(next, true);
  }

  const multi = subjects.length > 1;

  return (
    <section aria-label="Chapters">
      {multi && (
        <div role="tablist" aria-label="Subjects" className="-mx-1 mb-4 flex gap-2 overflow-x-auto px-1 pb-1">
          {subjects.map((s, i) => (
            <button
              key={s.subjectRoute}
              ref={(el) => {
                tabRefs.current[i] = el;
              }}
              id={`board-tab-${s.subjectRoute}`}
              type="button"
              role="tab"
              aria-selected={i === active}
              aria-controls={`board-panel-${s.subjectRoute}`}
              tabIndex={i === active ? 0 : -1}
              onClick={() => choose(i)}
              onKeyDown={(e) => onKey(e, i)}
              className={`shrink-0 whitespace-nowrap rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${
                i === active
                  ? "border-primary bg-primary text-primary-foreground"
                  : "bg-card text-muted-foreground hover:text-foreground"
              }`}
            >
              {s.subjectName} · {s.chapters.length}
            </button>
          ))}
        </div>
      )}

      {subjects.map((s, i) => {
        const open = expanded[s.subjectRoute] === true;
        return (
          <div
            key={s.subjectRoute}
            id={`board-panel-${s.subjectRoute}`}
            role={multi ? "tabpanel" : undefined}
            aria-labelledby={multi ? `board-tab-${s.subjectRoute}` : undefined}
            hidden={i !== active}
          >
            {s.papers && (
              <Link
                href={s.papers.href}
                className="mb-3 flex items-center gap-3 rounded-lg border bg-card px-4 py-3 transition-colors hover:bg-brand/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                <FileText className="h-4 w-4 shrink-0 text-brand-accent" aria-hidden />
                <span className="min-w-0 flex-1">
                  <span className="block text-[15px] font-medium">{s.subjectName} past papers</span>
                  <span className="block text-xs text-muted-foreground tabular-nums">
                    {s.papers.count} whole papers with marks and answers
                  </span>
                </span>
                <ArrowRight className="h-4 w-4 shrink-0 text-brand-accent" aria-hidden />
              </Link>
            )}
            <ul className="divide-y rounded-lg border bg-card">
              {s.chapters.map((c, j) => (
                <li key={c.chapterSlug} className={!open && j >= HUB_BOARD_CHAPTERS ? "hidden" : undefined}>
                  <Link
                    href={c.href}
                    className="flex items-center justify-between gap-3 px-4 py-3 transition-colors hover:bg-brand/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring"
                  >
                    <span className="min-w-0">
                      <span className="block text-[15px] font-medium">{c.name}</span>
                      <span className="block text-xs text-muted-foreground tabular-nums">{c.count} questions</span>
                    </span>
                    <ArrowRight className="h-4 w-4 shrink-0 text-brand-accent" aria-hidden />
                  </Link>
                </li>
              ))}
              {s.chapters.length > HUB_BOARD_CHAPTERS && (
                <li>
                  <button
                    type="button"
                    aria-expanded={open}
                    onClick={() => setExpanded((e) => ({ ...e, [s.subjectRoute]: !open }))}
                    className="flex w-full items-center gap-1.5 px-4 py-3 text-left text-sm font-semibold text-brand-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring"
                  >
                    {open ? "Show fewer" : `Show all ${s.chapters.length} ${s.subjectName} chapters`}
                    <ChevronDown className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`} aria-hidden />
                  </button>
                </li>
              )}
            </ul>
          </div>
        );
      })}
    </section>
  );
}
