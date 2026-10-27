import type { ReactNode } from "react";

/** A figure on a card (Concept Ladder's FigureFrame); label halos and hollow points take the card's colour (--lf-bg, globals.css). */
export function FigureFrame({ children }: { children: ReactNode }) {
  return <div className="learn-figure mx-auto w-full max-w-sm rounded-2xl border bg-card p-2 md:max-w-none">{children}</div>;
}
