"use client";

import { useEffect, useState, type ReactNode } from "react";
import { pickStoredSubject, type SubjectFilterOption } from "@/lib/mocks/catalogue";

/**
 * Subject buttons above an exam's sectional list, one subject shown at a time.
 *
 * Every group is in the server HTML and a choice only hides the others, so the
 * cached page stays complete for crawlers and a `?subject=` param never bails
 * the static prerender. The page opens on the first subject (A to Z) and then
 * on the one this device chose last, per exam; storage failing just means
 * staying on the first.
 */
const storageKey = (examSlug: string) => `qb_sectional_subject:${examSlug}`;

export default function SubjectFilter({
  examSlug,
  options,
  panels,
}: {
  examSlug: string;
  options: SubjectFilterOption[];
  /** One rendered group per option, keyed the same. */
  panels: { key: string; node: ReactNode }[];
}) {
  const [active, setActive] = useState(() => pickStoredSubject(null, options));

  useEffect(() => {
    try {
      setActive(pickStoredSubject(window.localStorage.getItem(storageKey(examSlug)), options));
    } catch {
      /* storage unavailable: stay on the first subject */
    }
  }, [examSlug, options]);

  function choose(key: string) {
    setActive(key);
    try {
      window.localStorage.setItem(storageKey(examSlug), key);
    } catch {
      /* not remembered, still switched */
    }
  }

  return (
    <>
      <div
        role="group"
        aria-label="Filter by subject"
        // WRAPS rather than scrolling sideways: with nine subjects a scrolling
        // row hid six of them on a phone, Mathematics (the largest) among them.
        className="mb-6 flex flex-wrap gap-2"
      >
        {options.map((o) => (
          <button
            key={o.key}
            type="button"
            aria-pressed={o.key === active}
            onClick={() => choose(o.key)}
            className={`whitespace-nowrap rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${
              o.key === active
                ? "border-primary bg-primary text-primary-foreground"
                : "bg-card text-muted-foreground hover:text-foreground"
            }`}
          >
            {o.label} · <span className="tabular-nums">{o.count}</span>
          </button>
        ))}
      </div>
      {panels.map((p) => (
        <div key={p.key} hidden={p.key !== active}>
          {p.node}
        </div>
      ))}
    </>
  );
}
