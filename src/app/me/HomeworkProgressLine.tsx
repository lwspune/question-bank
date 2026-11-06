"use client";

import { useEffect, useState } from "react";
import { homeworkLine, type HomeworkProgressLite } from "@/lib/me/continue";

/**
 * A homework entry's second line on /me's Continue card: "Day 4 next · 3 of 30
 * days done", from the same /api/homework/progress the plan page uses, so /me
 * never reads a plan's questions itself. Until it answers (or if it fails) the
 * entry keeps its server line and its link to the plan.
 */
export default function HomeworkProgressLine({
  slug,
  fallback,
  onHref,
}: {
  slug: string;
  fallback: string;
  onHref: (href: string) => void;
}) {
  const [line, setLine] = useState(fallback);

  useEffect(() => {
    let live = true;
    fetch(`/api/homework/progress?plan=${encodeURIComponent(slug)}`, { cache: "no-store" })
      .then((r) => (r.ok ? r.json() : null))
      .then((body: { progress?: { started: boolean; nextDay: number | null; doneDays: number; days: unknown[] } } | null) => {
        const p = body?.progress;
        if (!live || !p) return;
        const lite: HomeworkProgressLite = {
          started: p.started,
          nextDay: p.nextDay,
          doneDays: p.doneDays,
          totalDays: p.days.length,
        };
        const out = homeworkLine({ slug }, lite);
        setLine(out.line);
        onHref(out.href);
      })
      .catch(() => {
        /* keep the server line */
      });
    return () => {
      live = false;
    };
  }, [slug, onHref]);

  return <>{line}</>;
}
