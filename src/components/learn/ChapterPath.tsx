"use client";

import Link from "next/link";
import { ArrowRight, Check, Lock, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { ConceptState } from "@/lib/learn/engine/unlock";
import { chapterView, groupsOf, type ChapterConcept, type Outline, upNextIn } from "@/lib/learn/lessonState";
import { lessonHref } from "@/lib/learn/links";
import type { RenderedInline } from "@/lib/learn/renderedText";
import { ProgressRing } from "./ProgressRing";
import { RenderedInlineNodes } from "./RenderedRichText";
import { useLearnProgress } from "./useLearnProgress";

/**
 * A course chapter for one learner (Concept Ladder's chapter map, in PYQ Vault's colours): progress
 * with a bar per topic, the concept to open next, and the whole chapter as a path grouped by topic.
 * Cached for everyone; a signed-in student's states fill in after load. A guest sees every
 * concept open, with what each builds on.
 */

const STATE_LABEL: Record<ConceptState, string> = {
  available: "Start",
  learning: "In progress",
  mastered: "Mastered",
  locked: "Locked",
  unpublished: "Coming soon",
};

/** The dot on the path: a check when mastered, a ring when open, a lock when locked. */
function PathNode({ c }: { c: ChapterConcept }) {
  const shape = "absolute -left-[13px] top-5 grid h-6 w-6 place-items-center rounded-full";
  if (c.due) {
    return (
      <span className={`${shape} bg-amber-500 text-white`}>
        <RotateCcw className="h-3 w-3" aria-hidden="true" />
      </span>
    );
  }
  switch (c.state) {
    case "mastered":
      return (
        <span className={`${shape} bg-emerald-600 text-white`}>
          <Check className="h-3.5 w-3.5" aria-hidden="true" />
        </span>
      );
    case "learning":
      return (
        <span className={`${shape} border-2 border-brand bg-card`}>
          <span className="h-2.5 w-2.5 rounded-full bg-brand" />
        </span>
      );
    case "available":
      return <span className={`${shape} border-2 border-brand bg-card`} />;
    default:
      return (
        <span className={`${shape} border bg-muted text-muted-foreground`}>
          <Lock className="h-3 w-3" aria-hidden="true" />
        </span>
      );
  }
}

export function ChapterPath({
  outline,
  chapter,
  oneLiners,
}: {
  outline: Outline;
  chapter: string;
  /** Each concept's one-line summary with its maths rendered on the server, by `<lesson chapter>/<code>`. */
  oneLiners: Record<string, RenderedInline[]>;
}) {
  const pools = [...new Set(outline.chapters.find((c) => c.slug === chapter)?.parts.map((p) => p.chapter))];
  const progress = useLearnProgress(pools);
  const student = progress.kind === "student";
  const view = chapterView(outline, chapter, student ? progress.learner : new Map(), student, Date.now());
  if (!view) return null;
  const mastered = view.concepts.filter((c) => c.state === "mastered").length;
  const next = upNextIn(view.concepts);
  const groups = groupsOf(view.concepts);
  const href = (c: ChapterConcept) => lessonHref(c.chapter, c.slug, { course: outline.slug });

  return (
    <>
      <section className="hero-soft rounded-2xl p-5 sm:p-6">
        <div className="flex items-start gap-5">
          <ProgressRing value={mastered} max={view.concepts.length} size={72} stroke={7} label={`${mastered} of ${view.concepts.length} concepts mastered`}>
            <span className="text-sm">
              {mastered}/{view.concepts.length}
            </span>
          </ProgressRing>
          <div className="min-w-0 flex-1">
            <p className="font-semibold text-foreground">
              {student ? `${mastered} of ${view.concepts.length} concepts mastered` : `${view.concepts.length} concepts, a short lesson each`}
            </p>
            {!next && <p className="mt-1 text-sm text-muted-foreground">Every concept here is mastered.</p>}
            {/* A bar per topic only when the chapter has more than one. */}
            <ul className={groups.length > 1 ? "mt-2 space-y-1.5" : "hidden"}>
              {groups.map((g) => (
                <li key={g.group} className="grid grid-cols-[minmax(0,1fr)_5rem_2.5rem] items-center gap-3 text-xs text-muted-foreground">
                  <span className="truncate">{g.group}</span>
                  <span className="h-1.5 overflow-hidden rounded-full bg-muted" aria-hidden="true">
                    <span className="block h-full rounded-full bg-brand" style={{ width: `${(100 * g.mastered) / g.concepts.length}%` }} />
                  </span>
                  <span className="text-right tabular-nums">
                    {g.mastered}/{g.concepts.length}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {next && (
        <section aria-label="Up next" className="mt-5 rounded-2xl border-2 border-brand bg-card p-5">
          <p className="text-xs font-semibold uppercase tracking-wider text-brand-accent">
            {next.due ? "Due for review" : next.state === "learning" ? "Continue where you left off" : student ? "Up next" : "Start here"}
          </p>
          <p className="mt-1 text-lg font-semibold text-foreground">{next.title}</p>
          <p className="mt-1 text-sm text-muted-foreground">
            <RenderedInlineNodes nodes={oneLiners[`${next.chapter}/${next.code}`] ?? []} />
          </p>
          <Button asChild variant="brand" className="mt-4 w-full sm:w-auto">
            <Link href={href(next)}>
              {next.due ? "Review" : next.state === "learning" ? "Continue" : "Start"}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </Button>
        </section>
      )}

      <div className="mt-8 space-y-8">
        {groups.map((g) => (
          <section key={g.group} aria-label={g.group}>
            <h2
              className={
                groups.length > 1 ? "flex items-baseline justify-between gap-3 text-sm font-semibold uppercase tracking-wider text-muted-foreground" : "sr-only"
              }
            >
              <span>{g.group}</span>
              <span className="font-medium normal-case tracking-normal tabular-nums">
                {g.mastered} of {g.concepts.length}
              </span>
            </h2>
            <ol className={`ml-3 space-y-3 border-l-2 border-border pl-6 ${groups.length > 1 ? "mt-3" : ""}`}>
              {g.concepts.map((c) => {
                const locked = c.state === "locked";
                return (
                  <li key={`${c.chapter}/${c.code}`} className="relative">
                    <PathNode c={c} />
                    <Link
                      href={href(c)}
                      className={`group flex items-start gap-3 rounded-2xl border bg-card p-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                        c === next ? "border-brand" : ""
                      } ${locked ? "opacity-70" : ""}`}
                    >
                      <span className="min-w-0 flex-1">
                        <span className="block font-semibold text-foreground">{c.title}</span>
                        <span className="mt-0.5 block text-sm text-muted-foreground">
                          <RenderedInlineNodes nodes={oneLiners[`${c.chapter}/${c.code}`] ?? []} />
                        </span>
                        {locked && c.buildsOn.length > 0 && (
                          <span className="mt-1.5 block text-xs text-muted-foreground">Master first: {c.buildsOn.map((b) => b.title).join(", ")}</span>
                        )}
                      </span>
                      <span
                        className={`shrink-0 text-sm font-medium ${
                          c.due ? "text-amber-700 dark:text-amber-300" : c.state === "mastered" ? "text-emerald-700 dark:text-emerald-300" : locked ? "text-muted-foreground" : "text-brand-accent"
                        }`}
                      >
                        {c.due ? "Review" : STATE_LABEL[c.state]}
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ol>
          </section>
        ))}
      </div>
    </>
  );
}
