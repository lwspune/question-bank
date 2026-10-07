"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { MockAttemptBadge, useOwnAttempts } from "./OwnAttempts";

export type HubMockRow = { id: string; slug: string; title: string; meta: string };
export type HubMockTab = { slug: string; label: string; total: number; href: string; rows: HubMockRow[] };

/**
 * An exam's mocks on its hub, one tab per type (past papers, practice,
 * sectional), the newest few each, "Show all" to the type's own page.
 *
 * Every tab, row and link is in the server HTML (inactive tabs only hidden),
 * so the cached page is complete for crawlers. Per-student state (a score, a
 * mock to resume) arrives after load through OwnAttemptsProvider and never
 * reaches the shared HTML. The chosen tab is remembered on this device;
 * storage failing just means starting on the first.
 */
const storageKey = (examSlug: string) => `qb_mock_hub_tab:${examSlug}`;

export default function MockHubTabs({ examSlug, tabs }: { examSlug: string; tabs: HubMockTab[] }) {
  const [active, setActive] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    try {
      const i = tabs.findIndex((t) => t.slug === window.localStorage.getItem(storageKey(examSlug)));
      if (i > 0) setActive(i);
    } catch {
      /* storage unavailable: start on the first tab */
    }
  }, [examSlug, tabs]);

  function choose(i: number, focus = false) {
    setActive(i);
    try {
      window.localStorage.setItem(storageKey(examSlug), tabs[i].slug);
    } catch {
      /* not remembered, still switched */
    }
    if (focus) tabRefs.current[i]?.focus();
  }

  function onKey(e: React.KeyboardEvent, i: number) {
    const last = tabs.length - 1;
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

  if (tabs.length === 0) return null;
  const multi = tabs.length > 1;

  return (
    <section className="mt-6" aria-label="Mock tests">
      {multi && (
        <div role="tablist" aria-label="Kinds of mock test" className="-mx-1 mb-4 flex gap-2 overflow-x-auto px-1 pb-1">
          {tabs.map((t, i) => (
            <button
              key={t.slug}
              ref={(el) => {
                tabRefs.current[i] = el;
              }}
              id={`mock-tab-${t.slug}`}
              type="button"
              role="tab"
              aria-selected={i === active}
              aria-controls={`mock-panel-${t.slug}`}
              tabIndex={i === active ? 0 : -1}
              onClick={() => choose(i)}
              onKeyDown={(e) => onKey(e, i)}
              className={`shrink-0 whitespace-nowrap rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${
                i === active
                  ? "border-primary bg-primary text-primary-foreground"
                  : "bg-card text-muted-foreground hover:text-foreground"
              }`}
            >
              {t.label} · {t.total}
            </button>
          ))}
        </div>
      )}

      {tabs.map((t, i) => (
        <div
          key={t.slug}
          id={`mock-panel-${t.slug}`}
          role={multi ? "tabpanel" : undefined}
          aria-labelledby={multi ? `mock-tab-${t.slug}` : undefined}
          hidden={i !== active}
        >
          <ul className="divide-y rounded-lg border bg-card">
            {t.rows.map((r) => (
              <li key={r.id}>
                <Link
                  href={`/mock/${r.slug}`}
                  className="flex items-center justify-between gap-3 px-4 py-3 transition-colors hover:bg-brand/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring"
                >
                  <span className="min-w-0">
                    <span className="block text-[15px] font-medium">{r.title}</span>
                    <span className="block text-xs text-muted-foreground tabular-nums">{r.meta}</span>
                  </span>
                  <RowStatus mockId={r.id} />
                </Link>
              </li>
            ))}
            {t.total > t.rows.length && (
              <li>
                <Link
                  href={t.href}
                  className="flex items-center gap-1.5 px-4 py-3 text-sm font-semibold text-brand-accent hover:underline underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring"
                >
                  Show all {t.total} {t.label.toLowerCase()}
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </Link>
              </li>
            )}
          </ul>
        </div>
      ))}
    </section>
  );
}

/** The student's badge for a paper they have opened, else a "Start" cue. */
function RowStatus({ mockId }: { mockId: string }) {
  const { summaries } = useOwnAttempts();
  if (summaries.has(mockId)) return <MockAttemptBadge mockId={mockId} />;
  return (
    <span
      aria-hidden
      className="shrink-0 rounded-md border border-brand/40 px-2.5 py-1 text-xs font-semibold text-brand-accent"
    >
      Start
    </span>
  );
}
