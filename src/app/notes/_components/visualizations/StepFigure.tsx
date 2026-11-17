"use client";

/**
 * The notes stepper: an animated figure that walks a process one step at a
 * time (mitosis, PCR, a replication fork...). Each animated visualization is a
 * client component that hands this its steps and a function drawing the SVG
 * for a given step; the stepper owns the buttons, the timer and the caption.
 *
 * - It opens on the OVERVIEW, the last step (lib/notes/stepFigure), with every
 *   step listed below the picture. That is all the server markup ever shows,
 *   so the notes ebooks and a page before it loads get the whole story.
 * - Once the page has loaded it adds Play, Back, Next and a dot per step, and
 *   shows one caption at a time (read out by screen readers as it changes).
 *   The full list stays in the printed page.
 * - Shapes that move use MOTION, which drops the transition when the reader's
 *   device asks for reduced motion: the steps still change, nothing slides.
 */
import { type ReactNode, useEffect, useReducer, useSyncExternalStore } from "react";
import { ChevronLeft, ChevronRight, Pause, Play, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { STEP_MS, initialStepState, stepReducer, type StepAction, type StepState } from "@/lib/notes/stepFigure";
import { cn } from "@/lib/utils";

/** Class for any SVG shape that moves or fades between steps. */
export const MOTION = "transition-all duration-700 ease-in-out motion-reduce:transition-none";

const r2 = (n: number) => Math.round(n * 100) / 100;

/**
 * The `style.transform` for a moving shape. Always the same three functions,
 * so the browser can interpolate between any two steps, and every number
 * rounded to 2 decimals: the browser shortens long decimals in a style it
 * parses, and an unrounded one makes the server's markup differ from the
 * page's first render (a hydration mismatch, seen on 2026-11-17).
 */
export function svgTransform(p: { x: number; y: number; angle?: number; sx?: number; sy?: number }): string {
  return `translate(${r2(p.x)}px, ${r2(p.y)}px) rotate(${r2(p.angle ?? 0)}deg) scale(${r2(p.sx ?? 1)}, ${r2(p.sy ?? 1)})`;
}

export type FigureStep = {
  /** Short name of the step, e.g. "Metaphase". */
  title: string;
  /** One or two plain sentences on what happens in this step. */
  caption: string;
};

const noSubscribe = () => () => {};

export default function StepFigure({
  title,
  label,
  viewBox,
  steps,
  children,
  note,
}: {
  /** The header line, e.g. "Animation · mitosis, step by step". */
  title: string;
  /** What the picture shows, for screen readers. */
  label: string;
  viewBox: string;
  steps: readonly FigureStep[];
  /** Draws the SVG contents for one step (0-based). */
  children: (step: number) => ReactNode;
  /** Optional line under the figure. */
  note?: ReactNode;
}) {
  const total = steps.length;
  const [state, dispatch] = useReducer(
    (s: StepState, a: StepAction) => stepReducer(s, a, total),
    total,
    initialStepState,
  );
  // False on the server and in the first client render, true after: the two
  // renders that must match do, so hydration never warns.
  const live = useSyncExternalStore(noSubscribe, () => true, () => false);

  useEffect(() => {
    if (!state.playing) return;
    const t = setTimeout(() => dispatch({ type: "tick" }), STEP_MS);
    return () => clearTimeout(t);
  }, [state]);

  const step = live ? state.step : total - 1;
  const current = steps[step];
  const atEnd = state.step >= total - 1;

  return (
    <div className="mx-auto max-w-md rounded-lg border border-indigo-200 bg-indigo-50/30 p-4 dark:border-indigo-900/60 dark:bg-indigo-950/15">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-indigo-700 dark:text-indigo-300">{title}</p>

      <svg viewBox={viewBox} className="block h-auto w-full" role="img" aria-label={label}>
        {children(step)}
      </svg>

      {live && current && (
        <div className="print:hidden">
          <div className="mt-3 min-h-[3.5rem] text-sm" aria-live="polite">
            <p className="font-semibold text-foreground">
              Step {step + 1} of {total}: {current.title}
            </p>
            <p className="text-muted-foreground">{current.caption}</p>
          </div>

          <div className="mt-3 flex flex-wrap items-center gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => dispatch({ type: "prev" })}
              disabled={state.step === 0}
              aria-label="Previous step"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            {state.playing ? (
              <Button type="button" size="sm" onClick={() => dispatch({ type: "pause" })}>
                <Pause className="h-4 w-4" />
                Pause
              </Button>
            ) : (
              <Button type="button" size="sm" onClick={() => dispatch({ type: "play" })}>
                {atEnd ? <RotateCcw className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                {/* "Replay", not "Play from the start": the longer label pushed Next onto a second line at 390 px. */}
                {atEnd ? "Replay" : "Play"}
              </Button>
            )}
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => dispatch({ type: "next" })}
              disabled={atEnd}
              aria-label="Next step"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
            <div className="flex w-full justify-center gap-1.5 sm:ml-auto sm:w-auto">
              {/* Own centred row on a phone (the row is ~270 px there); beside the buttons from sm up. */}
              {steps.map((s, i) => (
                <button
                  key={s.title}
                  type="button"
                  onClick={() => dispatch({ type: "goto", step: i })}
                  aria-label={`Step ${i + 1}: ${s.title}`}
                  aria-current={i === step ? "step" : undefined}
                  className={cn(
                    "h-3 w-3 rounded-full border border-indigo-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                    i === step ? "bg-indigo-600 dark:bg-indigo-400" : "bg-transparent",
                  )}
                />
              ))}
            </div>
          </div>
        </div>
      )}

      <ol
        className={cn("mt-3 list-decimal space-y-1 pl-5 text-xs text-muted-foreground", live && "hidden print:block")}
        data-step-list=""
      >
        {steps.map((s) => (
          <li key={s.title}>
            <span className="font-semibold text-foreground">{s.title}:</span> {s.caption}
          </li>
        ))}
      </ol>

      {note && <p className="mt-2 text-xs text-muted-foreground">{note}</p>}
    </div>
  );
}
