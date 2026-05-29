"use client";

import { useState } from "react";
import { ChevronDown, ClipboardCheck, Lightbulb } from "lucide-react";
import KatexRenderer from "@/components/math/KatexRenderer";
import type { AuthoredExample } from "@/app/notes/_types";

type Props = {
  example: AuthoredExample;
};

/**
 * The independent-attempt rung after the worked example.
 *
 * Student sees only the prompt and a "Show solution" button. Encourages a
 * full independent attempt before checking. Sky/cyan accent to read as
 * "checkpoint" and stay distinct from the neutral worked card above it.
 */
export default function SelfCheckCard({ example }: Props) {
  const [showSolution, setShowSolution] = useState(false);

  return (
    <div className="rounded-lg border border-sky-200 bg-sky-50/40 dark:border-sky-900/60 dark:bg-sky-950/20 p-5">
      <p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-sky-700 dark:text-sky-300">
        <ClipboardCheck className="h-3.5 w-3.5" aria-hidden />
        Try it yourself
      </p>

      <div className="mt-3 font-serif text-base leading-relaxed text-foreground">
        <KatexRenderer text={example.prompt} />
      </div>

      {!showSolution ? (
        <button
          type="button"
          onClick={() => setShowSolution(true)}
          className="mt-4 inline-flex items-center gap-1.5 rounded-md border border-sky-300 dark:border-sky-800 bg-background px-3 py-1.5 text-sm font-medium text-sky-700 dark:text-sky-300 hover:bg-sky-100 dark:hover:bg-sky-950/40 transition-colors"
        >
          <ChevronDown className="h-3.5 w-3.5" aria-hidden />
          Show solution
        </button>
      ) : (
        <div className="mt-4 space-y-3">
          <ol className="list-decimal space-y-2 pl-6 font-serif text-sm text-muted-foreground">
            {example.steps.map((step, i) => (
              <li key={i} className="leading-relaxed">
                <KatexRenderer text={step} />
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
        </div>
      )}
    </div>
  );
}
