// Copied from Concept Ladder (src/lessons/renderDeck.ts, afca8bf).
import "server-only";
import type { Figure } from "../types";
import type { RenderedBlock, RenderedInline } from "../renderedText";
import { renderInlineText, renderRichText } from "../richText";
import type { SlideSpec } from "./deck";

/**
 * A slide with its math pre-rendered on the server (JSON-safe, no KaTeX on the client).
 * `heading` is the title as shown; `title` is plain text for labels.
 */
export type RenderedSlide = { id: string; title: string; heading: RenderedInline[] } & (
  | { kind: "hook"; prompt: RenderedBlock[] }
  | { kind: "reveal"; prompt: RenderedBlock[]; reveal: RenderedBlock[] }
  | { kind: "text"; body: RenderedBlock[]; figure?: Figure }
  | { kind: "points"; points: RenderedInline[][]; figure?: Figure }
  | { kind: "worked"; prompt: RenderedBlock[]; steps: RenderedInline[][]; answer: RenderedInline[] | null; figure?: Figure; step: number }
  | { kind: "questions" }
);

export function renderDeck(deck: SlideSpec[]): RenderedSlide[] {
  return deck.map((spec): RenderedSlide => {
    const s = { ...spec, title: spec.title.replaceAll("$", ""), heading: renderInlineText(spec.title) };
    switch (s.kind) {
      case "hook":
        return { ...s, prompt: renderRichText(s.prompt) };
      case "reveal":
        return { ...s, prompt: renderRichText(s.prompt), reveal: renderRichText(s.reveal) };
      case "text":
        return { ...s, body: renderRichText(s.body) };
      case "points":
        return { ...s, points: s.points.map(renderInlineText) };
      case "worked":
        return {
          ...s,
          prompt: renderRichText(s.prompt),
          steps: s.steps.map(renderInlineText),
          answer: s.answer === null ? null : renderInlineText(s.answer),
        };
      case "questions":
        return s;
    }
  });
}
