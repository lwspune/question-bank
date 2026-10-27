// Copied from Concept Ladder (src/lessons/navigation.ts, afca8bf).
/**
 * Moving through a deck whose slides may reveal points one at a time. A position is the slide
 * and how many of its points are shown (0 on slides without points). Next shows the next point
 * and only then moves on; Back hides the last point, then returns to the previous slide whole.
 */
export type Position = { index: number; shown: number };

type Navigable = { kind: string; points?: readonly unknown[] };

export const pointsOf = (slide: Navigable): number => (slide.kind === "points" ? (slide.points?.length ?? 0) : 0);

/** A slide entered afresh: a points slide starts with its first point. */
export const startAt = (slides: readonly Navigable[], index: number): Position => ({ index, shown: Math.min(1, pointsOf(slides[index])) });

export function forward(slides: readonly Navigable[], { index, shown }: Position): Position {
  if (shown < pointsOf(slides[index])) return { index, shown: shown + 1 };
  return index + 1 < slides.length ? startAt(slides, index + 1) : { index, shown };
}

export function backward(slides: readonly Navigable[], { index, shown }: Position): Position {
  if (shown > 1) return { index, shown: shown - 1 };
  return index > 0 ? { index: index - 1, shown: pointsOf(slides[index - 1]) } : { index, shown };
}

/**
 * The first slide's main button reads Start until the learner begins: it opens full screen and
 * stays on the slide. Only where full screen works (not on iPhone); elsewhere it stays Next.
 */
export const offersStart = (
  { index }: Position,
  { canFullscreen, isFullscreen, begun }: { canFullscreen: boolean; isFullscreen: boolean; begun: boolean },
): boolean => index === 0 && canFullscreen && !isFullscreen && !begun;
