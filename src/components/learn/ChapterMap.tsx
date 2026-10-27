"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { Check, CircleDot, Lock, RotateCcw } from "lucide-react";
import { chapterView, type ConceptProgress, type Outline } from "@/lib/learn/lessonState";
import { lessonHref } from "@/lib/learn/links";
import type { RenderedInline } from "@/lib/learn/renderedText";
import { RenderedInlineNodes } from "./RenderedRichText";

/**
 * A course chapter's concepts in teaching order (Concept Ladder's chapter map, as a list). The page
 * is cached for everyone; a signed-in student's states come from /api/learn/progress. A guest
 * sees every concept open, with what each builds on.
 */
export function ChapterMap({
  outline,
  chapter,
  oneLiners,
}: {
  outline: Outline;
  chapter: string;
  /** Each concept's one-line summary with its maths rendered on the server, by `<lesson chapter>/<code>`. */
  oneLiners: Record<string, RenderedInline[]>;
}) {
  const [learner, setLearner] = useState<Map<string, ConceptProgress> | null>(null);
  const pools = useMemo(() => [...new Set(outline.chapters.find((c) => c.slug === chapter)?.parts.map((p) => p.chapter))], [outline, chapter]);

  useEffect(() => {
    let active = true;
    fetch(`/api/learn/progress?${new URLSearchParams({ chapters: pools.join(",") })}`)
      .then(async (res) => {
        if (!active || res.status === 401) return;
        const body = await res.json();
        if (!body.ok) throw new Error(body.error);
        const rows = body.data.progress as { chapter: string; code: string; state: "learning" | "mastered"; next_review_at: string | null }[];
        setLearner(new Map(rows.map((r) => [`${r.chapter}/${r.code}`, { state: r.state, nextReviewAt: r.next_review_at }])));
      })
      .catch((e) => console.error("learn: loading chapter progress failed", e));
    return () => {
      active = false;
    };
  }, [pools]);

  const view = chapterView(outline, chapter, learner ?? new Map(), learner !== null, Date.now());
  if (!view) return null;
  const firstOpen = view.concepts.find((c) => c.state === "learning" || c.state === "available" || c.due);

  return (
    <ol className="space-y-3">
      {view.concepts.map((c, i) => {
        const locked = c.state === "locked";
        const status = c.due
          ? { icon: <RotateCcw className="h-4 w-4" />, label: "Review due", tile: "bg-amber-100 text-amber-800 dark:bg-amber-900/50 dark:text-amber-200" }
          : c.state === "mastered"
            ? { icon: <Check className="h-4 w-4" />, label: "Mastered", tile: "bg-emerald-600 text-white" }
            : c.state === "learning"
              ? { icon: <CircleDot className="h-4 w-4" />, label: "In progress", tile: "bg-brand text-brand-foreground" }
              : locked
                ? { icon: <Lock className="h-4 w-4" />, label: "Locked", tile: "bg-muted text-muted-foreground" }
                : null;
        return (
          <li key={`${c.chapter}/${c.code}`}>
            <Link
              href={lessonHref(c.chapter, c.slug, { course: outline.slug })}
              className={`group flex items-start gap-4 rounded-2xl border bg-card p-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${c === firstOpen ? "border-brand" : ""} ${locked ? "opacity-75" : ""}`}
            >
              <span className={`grid h-9 w-9 shrink-0 place-items-center rounded-full text-sm font-semibold tabular-nums ${status?.tile ?? "bg-muted text-muted-foreground"}`} aria-hidden="true">
                {status?.icon ?? i + 1}
              </span>
              <span className="min-w-0 flex-1">
                <span className="block font-semibold text-foreground">{c.title}</span>
                <span className="mt-0.5 block text-sm text-muted-foreground">
                  <RenderedInlineNodes nodes={oneLiners[`${c.chapter}/${c.code}`] ?? []} />
                </span>
                {status && <span className="mt-1 block text-xs font-medium text-muted-foreground">{status.label}</span>}
                {locked && c.buildsOn.length > 0 && (
                  <span className="mt-1 block text-xs text-muted-foreground">Master first: {c.buildsOn.map((b) => b.title).join(", ")}</span>
                )}
                {c === firstOpen && <span className="mt-1 block text-xs font-semibold text-brand-accent">{learner ? "Up next" : "Start here"}</span>}
              </span>
            </Link>
          </li>
        );
      })}
    </ol>
  );
}
