import type { CSSProperties } from "react";
import type { RenderedInline } from "@/lib/learn/renderedText";
import { RenderedInlineNodes } from "./RenderedRichText";

/**
 * Numbered solution steps with number chips (Concept Ladder's StepList).
 * - `current`: the step just added (worked slides); earlier steps are muted.
 * - `stagger`: seconds between steps fading in one after another (solutions).
 */
export function StepList({ steps, current, stagger }: { steps: RenderedInline[][]; current?: number; stagger?: number }) {
  return (
    <ol className="space-y-3">
      {steps.map((step, i) => {
        const isCurrent = current === i;
        const style: CSSProperties | undefined = stagger !== undefined ? { animationDelay: `${i * stagger}s` } : undefined;
        const motion = stagger !== undefined ? "fig-in" : isCurrent ? "motion-safe:animate-learn-slide-in" : "";
        return (
          <li key={i} className={`flex gap-3 ${motion}`} style={style}>
            <span
              className={`mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full text-sm font-semibold tabular-nums ${
                isCurrent || current === undefined ? "bg-brand/10 text-brand-accent" : "bg-muted text-muted-foreground"
              }`}
              aria-hidden="true"
            >
              {i + 1}
            </span>
            <span className={`min-w-0 flex-1 ${current !== undefined && !isCurrent ? "text-muted-foreground" : ""}`}>
              <RenderedInlineNodes nodes={step} />
            </span>
          </li>
        );
      })}
    </ol>
  );
}
