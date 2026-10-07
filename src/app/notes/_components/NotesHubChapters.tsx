"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, ChevronDown } from "lucide-react";
import { HUB_VISIBLE_CHAPTERS, HUB_VISIBLE_CHAPTERS_WIDE, type HubSubject } from "@/lib/notes/examHub";

/**
 * Every chapter of an exam's notes on its hub, one tab per subject, so a
 * chapter is one tap away instead of two.
 *
 * All panels and all chapter links are in the server HTML (inactive panels and
 * rows past the first few are only hidden), so the cached page stays complete
 * for search engines and for a reader whose JavaScript has not loaded yet. The
 * chosen tab is remembered on this device; it is a convenience, so storage
 * failing (private window, blocked site data) just means starting on the first.
 */
const storageKey = (examSlug: string) => `qb_notes_hub_tab:${examSlug}`;

export default function NotesHubChapters({
  examSlug,
  subjects,
}: {
  examSlug: string;
  subjects: HubSubject[];
}) {
  const [active, setActive] = useState(0);
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(storageKey(examSlug));
      const i = subjects.findIndex((s) => s.subjectRoute === saved);
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

  function onTabKey(e: React.KeyboardEvent, i: number) {
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

  const tabId = (s: HubSubject) => `hub-tab-${s.subjectRoute}`;
  const panelId = (s: HubSubject) => `hub-panel-${s.subjectRoute}`;

  return (
    <section className="mt-2 sm:mt-4" aria-labelledby="hub-chapters-heading">
      <h2
        id="hub-chapters-heading"
        className="mb-3 text-sm font-semibold uppercase tracking-wide text-muted-foreground"
      >
        Chapters
      </h2>

      {subjects.length > 1 && (
        <div
          role="tablist"
          aria-label="Subjects"
          className="-mx-1 mb-4 flex gap-2 overflow-x-auto px-1 pb-1"
        >
          {subjects.map((s, i) => (
            <button
              key={s.subjectRoute}
              ref={(el) => {
                tabRefs.current[i] = el;
              }}
              id={tabId(s)}
              type="button"
              role="tab"
              aria-selected={i === active}
              aria-controls={panelId(s)}
              tabIndex={i === active ? 0 : -1}
              onClick={() => choose(i)}
              onKeyDown={(e) => onTabKey(e, i)}
              className={`shrink-0 whitespace-nowrap rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${
                i === active
                  ? "border-primary bg-primary text-primary-foreground"
                  : "bg-card text-muted-foreground hover:text-foreground"
              }`}
            >
              {s.tabLabel} · {s.chapters.length}
            </button>
          ))}
        </div>
      )}

      {subjects.map((s, i) => {
        const open = expanded[s.subjectRoute] === true;
        const start = s.chapters.find((c) => c.slug === s.startHereSlug) ?? null;
        const rest = s.chapters.filter((c) => c !== start);
        const visible = HUB_VISIBLE_CHAPTERS - (start ? 1 : 0);
        const visibleWide = HUB_VISIBLE_CHAPTERS_WIDE - (start ? 1 : 0);
        return (
          <div
            key={s.subjectRoute}
            id={panelId(s)}
            role={subjects.length > 1 ? "tabpanel" : undefined}
            aria-labelledby={subjects.length > 1 ? tabId(s) : undefined}
            hidden={i !== active}
          >
            {/* Phone: the Start-here card, then one bordered list. From sm up the
                list's box dissolves (`contents`) so every row becomes its own card
                in the grid, with Start here as the first cell. */}
            <div className="sm:grid sm:grid-cols-2 sm:gap-3 lg:grid-cols-3">
            {start && (
              <Link
                href={start.href}
                className="group mb-3 flex items-center justify-between gap-3 rounded-lg border border-l-4 border-l-brand bg-card p-4 transition-colors hover:bg-brand/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:mb-0"
              >
                <span className="min-w-0">
                  <span className="block text-[11px] font-semibold uppercase tracking-wide text-brand-accent">
                    Start here · most asked
                  </span>
                  <span className="mt-0.5 block text-base font-semibold tracking-tight">{start.name}</span>
                  <span className="block text-sm text-muted-foreground">
                    {start.count} past questions · {start.subtopicCount} subtopics
                  </span>
                </span>
                <ArrowRight className="h-4 w-4 shrink-0 text-brand-accent" aria-hidden />
              </Link>
            )}

            <ul role="list" className="divide-y rounded-lg border bg-card sm:contents sm:divide-y-0">
              {rest.map((c, j) => (
                <li
                  key={c.slug}
                  className={`sm:rounded-lg sm:border sm:bg-card ${
                    open || j < visible ? "" : j < visibleWide ? "hidden sm:block" : "hidden"
                  }`}
                >
                  <Link
                    href={c.href}
                    className="flex items-center justify-between gap-3 px-4 py-3 transition-colors hover:bg-brand/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring sm:h-full sm:rounded-lg"
                  >
                    <span className="min-w-0">
                      <span className="block text-[15px] font-medium">{c.name}</span>
                      {c.count > 0 && (
                        <span className="block text-xs text-muted-foreground">{c.count} past questions</span>
                      )}
                    </span>
                    <ArrowRight className="h-4 w-4 shrink-0 text-brand-accent" aria-hidden />
                  </Link>
                </li>
              ))}
              {rest.length > visible && (
                <li
                  className={`sm:col-span-full sm:border-0 ${rest.length > visibleWide ? "" : "sm:hidden"}`}
                >
                  <button
                    type="button"
                    aria-expanded={open}
                    onClick={() => setExpanded((e) => ({ ...e, [s.subjectRoute]: !open }))}
                    className="flex w-full items-center gap-1.5 px-4 py-3 text-left text-sm font-semibold text-brand-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring"
                  >
                    {open ? "Show fewer" : `Show all ${s.chapters.length} ${s.tabLabel} chapters`}
                    <ChevronDown className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`} aria-hidden />
                  </button>
                </li>
              )}
            </ul>
            </div>
          </div>
        );
      })}
    </section>
  );
}
