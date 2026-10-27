"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowRight, Check } from "lucide-react";

export type CourseChapterCard = {
  slug: string;
  title: string;
  href: string;
  /** `<lesson chapter>/<concept code>` of each concept the chapter shows. */
  keys: string[];
};

/**
 * A course's chapters. The page is cached for everyone; a signed-in student's mastered count per
 * chapter is filled in from /api/learn/progress (a guest gets 401 and sees the counts only).
 */
export function CourseChapters({ chapters, pools }: { chapters: CourseChapterCard[]; pools: string[] }) {
  const [mastered, setMastered] = useState<Set<string> | null>(null);

  useEffect(() => {
    let active = true;
    fetch(`/api/learn/progress?${new URLSearchParams({ chapters: pools.join(",") })}`)
      .then(async (res) => {
        if (!active || res.status === 401) return;
        const body = await res.json();
        if (!body.ok) throw new Error(body.error);
        const rows = body.data.progress as { chapter: string; code: string; state: string }[];
        setMastered(new Set(rows.filter((r) => r.state === "mastered").map((r) => `${r.chapter}/${r.code}`)));
      })
      .catch((e) => console.error("learn: loading course progress failed", e));
    return () => {
      active = false;
    };
  }, [pools]);

  return (
    <ol className="space-y-3">
      {chapters.map((ch, i) => {
        const done = mastered ? ch.keys.filter((k) => mastered.has(k)).length : null;
        const complete = done !== null && done === ch.keys.length;
        return (
          <li key={ch.slug}>
            <Link
              href={ch.href}
              className="group flex items-center gap-4 rounded-2xl border bg-card p-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <span
                className={`grid h-9 w-9 shrink-0 place-items-center rounded-full text-sm font-semibold tabular-nums ${complete ? "bg-emerald-600 text-white" : "bg-muted text-muted-foreground"}`}
                aria-hidden="true"
              >
                {complete ? <Check className="h-4 w-4" /> : i + 1}
              </span>
              <span className="min-w-0 flex-1">
                <span className="block font-semibold text-foreground">{ch.title}</span>
                <span className="mt-0.5 block text-sm text-muted-foreground">
                  {done === null ? `${ch.keys.length} concepts` : `${done} of ${ch.keys.length} concepts mastered`}
                </span>
              </span>
              <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-foreground" aria-hidden="true" />
            </Link>
          </li>
        );
      })}
    </ol>
  );
}
