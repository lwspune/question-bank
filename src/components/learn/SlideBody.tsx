import type { ReactNode } from "react";
import type { RenderedSlide } from "@/lib/learn/lesson/renderDeck";
import type { RenderedInline } from "@/lib/learn/renderedText";
import { FigureFrame } from "./FigureFrame";
import { FigureView } from "./FigureView";
import { RenderedInlineNodes, RenderedRichText } from "./RenderedRichText";
import { StepList } from "./StepList";

// Copied from Concept Ladder (src/lessons/SlideBody.tsx, afca8bf), in PYQ Vault's colours.

/** Seconds between steps when a figure plays through on its own (the idea slide). */
const FIGURE_STAGGER_S = 0.9;

/** Text beside its figure on tablet and up; the figure below the text on phones. */
function WithFigure({ figure, children }: { figure: ReactNode; children: ReactNode }) {
  return (
    <div className="grid gap-6 md:grid-cols-2 md:items-start md:gap-10">
      <div>{children}</div>
      <div data-slide-figure>
        <FigureFrame>{figure}</FigureFrame>
      </div>
    </div>
  );
}

/** Points shown so far, the newest rising in; new ones are announced to screen readers. */
function Points({ points, shown }: { points: RenderedInline[][]; shown: number }) {
  return (
    <ul className="space-y-4" aria-live="polite">
      {points.slice(0, shown).map((p, i) => (
        <li key={i} className={`flex gap-3 ${i === shown - 1 ? "motion-safe:animate-learn-rise" : ""}`}>
          <span aria-hidden="true" className="mt-[0.6em] h-2 w-2 shrink-0 rounded-full bg-brand" />
          <span>
            <RenderedInlineNodes nodes={p} />
          </span>
        </li>
      ))}
    </ul>
  );
}

/**
 * A slide's content, below its heading. `shown`: on a points slide, how many points are revealed
 * (the figure shows its steps up to the same number).
 */
export function SlideBody({ slide, shown }: { slide: RenderedSlide; shown?: number }) {
  switch (slide.kind) {
    case "hook":
      return <RenderedRichText blocks={slide.prompt} />;
    case "reveal":
      return (
        <>
          <RenderedRichText blocks={slide.prompt} className="text-muted-foreground" />
          <RenderedRichText
            blocks={slide.reveal}
            className="mt-6 rounded-2xl border-l-4 border-brand bg-brand/10 px-5 py-4 motion-safe:animate-learn-rise"
          />
        </>
      );
    case "text":
      return slide.figure ? (
        <WithFigure figure={<FigureView figure={slide.figure} stagger={FIGURE_STAGGER_S} className="h-auto w-full" />}>
          <RenderedRichText blocks={slide.body} />
        </WithFigure>
      ) : (
        <RenderedRichText blocks={slide.body} />
      );
    case "points": {
      const n = shown ?? slide.points.length;
      return slide.figure ? (
        <WithFigure figure={<FigureView figure={slide.figure} upTo={n} className="h-auto w-full" />}>
          <Points points={slide.points} shown={n} />
        </WithFigure>
      ) : (
        <Points points={slide.points} shown={n} />
      );
    }
    case "worked": {
      const body = (
        <>
          <RenderedRichText blocks={slide.prompt} />
          <div className="mt-5">
            <StepList steps={slide.steps} current={slide.steps.length - 1} />
          </div>
          {slide.answer && (
            <p className="mt-6 rounded-2xl bg-emerald-50 px-5 py-4 text-emerald-950 motion-safe:animate-learn-rise dark:bg-emerald-950/40 dark:text-emerald-100">
              <span className="font-semibold">Answer: </span>
              <RenderedInlineNodes nodes={slide.answer} />
            </p>
          )}
        </>
      );
      return slide.figure ? (
        <WithFigure figure={<FigureView figure={slide.figure} upTo={slide.step} className="h-auto w-full" />}>{body}</WithFigure>
      ) : (
        body
      );
    }
    case "questions":
      return null;
  }
}
