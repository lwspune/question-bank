"use client";

import { useState } from "react";
import { ChevronDown, ClipboardCheck, Lightbulb } from "lucide-react";
import KatexRenderer from "@/components/math/KatexRenderer";
import BlockText from "@/components/math/BlockText";
import type { AuthoredExample } from "@/app/notes/_types";
import AskVButton from "@/components/chat/AskVButton";

type Props = {
  example: AuthoredExample;
  /** The concept it belongs to: Ask V finds the question by it (lib/chat/notesItem.ts). */
  conceptSlug: string;
};

/**
 * The independent-attempt rung after the worked example.
 *
 * Student sees only the prompt and a "Show solution" button. Encourages a
 * full independent attempt before checking. Sky/cyan accent to read as
 * "checkpoint" and stay distinct from the neutral worked card above it.
 */
export default function SelfCheckCard({ example, conceptSlug }: Props) {
  const [showSolution, setShowSolution] = useState(false);
  // Before the solution (V offers a hint first) and after it (for "I still don't get step 2").
  const askV = <AskVButton notes={{ concept: conceptSlug, item: "self" }} ariaLabel="Ask V about this self-check" />;

  return (
    <div className="rounded-lg border border-sky-200 bg-sky-50/40 dark:border-sky-900/60 dark:bg-sky-950/20 p-5">
      <p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-sky-700 dark:text-sky-300">
        <ClipboardCheck className="h-3.5 w-3.5" aria-hidden />
        Try it yourself
      </p>

      <div className="mt-3 font-serif text-base leading-relaxed text-foreground">
        <BlockText text={example.prompt} />
      </div>

      {example.options && example.options.length > 0 && (
        <ol className="mt-3 space-y-1.5 font-serif text-base leading-relaxed text-foreground">
          {example.options.map((option, i) => (
            <li key={i} className="flex gap-2">
              <span className="shrink-0 font-sans text-sm font-semibold text-sky-700 dark:text-sky-300">
                ({String.fromCharCode(65 + i)})
              </span>
              <KatexRenderer text={option} />
            </li>
          ))}
        </ol>
      )}

      {!showSolution ? (
        <div className="mt-4 flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => setShowSolution(true)}
            className="inline-flex items-center gap-1.5 rounded-md border border-sky-300 dark:border-sky-800 bg-background px-3 py-1.5 text-sm font-medium text-sky-700 dark:text-sky-300 hover:bg-sky-100 dark:hover:bg-sky-950/40 transition-colors"
          >
            <ChevronDown className="h-3.5 w-3.5" aria-hidden />
            Show solution
          </button>
          {askV}
        </div>
      ) : (
        <div className="solution-math mt-4 space-y-3">
          <ol className="list-decimal space-y-2 pl-6 font-serif text-sm text-muted-foreground">
            {example.steps.map((step, i) => (
              <li key={i} className="leading-relaxed">
                <BlockText text={step} />
              </li>
            ))}
          </ol>
          <div className="inline-flex items-center gap-2 rounded-md bg-emerald-50 dark:bg-emerald-950/30 px-3 py-1.5 text-sm">
            <Lightbulb
              className="h-4 w-4 text-emerald-700 dark:text-emerald-400"
              aria-hidden
            />
            <span className="font-semibold text-emerald-800 dark:text-emerald-200">
              Answer:
            </span>
            <span className="font-serif text-emerald-900 dark:text-emerald-100">
              <KatexRenderer text={example.answer} />
            </span>
          </div>
          <div>{askV}</div>
        </div>
      )}
    </div>
  );
}
