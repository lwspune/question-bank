// Copied from Concept Ladder (src/lessons/deck.ts, afca8bf).
import { leadIn } from "./leadIn";
import type { Figure, FormalSection, LessonBody } from "../types";

/**
 * A concept as a slide deck. Slide ids are stable ("hook", "formal-2",
 * "worked-3", …) so narration scripts can be keyed to them.
 */
export type SlideSpec = { id: string; title: string } & (
  | { kind: "hook"; prompt: string }
  | { kind: "reveal"; prompt: string; reveal: string }
  | { kind: "text"; body: string; figure?: Figure }
  /** Points revealed one per click; figure step n appears with point n. */
  | { kind: "points"; points: string[]; figure?: Figure }
  /** `step` is this slide's step number (1-based): the figure shows elements up to it. */
  | { kind: "worked"; prompt: string; steps: string[]; answer: string | null; figure?: Figure; step: number }
  | { kind: "questions" }
);

/**
 * Splits authored text into slide-sized sections at blank lines. A blank line
 * inside display math ($$…$$) never splits, and a paragraph ending in a colon
 * keeps what it introduces; lists stay with their lead-in because authors
 * write them without a blank line before.
 */
function sections(text: string): string[] {
  const out: string[] = [];
  for (const part of text.split(/\n\s*\n/)) {
    const prev = out.at(-1);
    const insideDisplayMath = prev !== undefined && (prev.match(/\$\$/g) ?? []).length % 2 === 1;
    if (insideDisplayMath || prev?.endsWith(":")) out[out.length - 1] = `${prev}\n\n${part.trim()}`;
    else out.push(part.trim());
  }
  return out.filter((s) => s.length > 0);
}

type FormalSlide = { title: string; figure?: Figure } & ({ body: string } | { points: string[] });

/** The formal text as its slides' sections: a string split at blank lines, or the sections as written. */
export function formalParts<S extends { body: string } | { title: string; points: string[] }>(formal: string | S[]): (S | { body: string })[] {
  return typeof formal === "string" ? sections(formal).map((body) => ({ body })) : formal;
}

/** Each formal slide: titled by its title or lead-in, else by the slide it continues. */
export function formalSlides(formal: LessonBody["explanation"]["formal"]): FormalSlide[] {
  const parts: FormalSection[] = formalParts(formal);
  let title = "Precisely";
  return parts.map((part) => {
    const figure = part.figure && { figure: part.figure };
    if ("points" in part) {
      title = part.title;
      return { title, points: part.points, ...figure };
    }
    const lead = leadIn(part.body);
    if (lead) title = lead.title;
    return { title, body: lead ? lead.rest : part.body, ...figure };
  });
}

export function buildDeck(concept: LessonBody): SlideSpec[] {
  const { hook, explanation: ex } = concept;
  const formal = formalSlides(ex.formal);
  const steps = ex.worked.steps;

  return [
    { id: "hook", title: "Think about this", kind: "hook", prompt: hook.prompt },
    { id: "reveal", title: "Think about this", kind: "reveal", prompt: hook.prompt, reveal: hook.reveal },
    {
      id: "idea",
      title: "The idea",
      ...(typeof ex.intuition === "string" ? { kind: "text" as const, body: ex.intuition } : { kind: "points" as const, points: ex.intuition }),
      ...(ex.figure && { figure: ex.figure }),
    },
    ...formal.map(({ title, figure, ...rest }, i) => ({
      id: `formal-${i + 1}`,
      title,
      ...("points" in rest ? { kind: "points" as const, points: rest.points } : { kind: "text" as const, body: rest.body }),
      ...(figure && { figure }),
    })),
    ...steps.map((_, i) => ({
      id: `worked-${i + 1}`,
      title: "Worked example",
      kind: "worked" as const,
      prompt: ex.worked.prompt,
      steps: steps.slice(0, i + 1),
      answer: i === steps.length - 1 ? ex.worked.answer : null,
      step: i + 1,
      ...(ex.worked.figure && { figure: ex.worked.figure }),
    })),
    { id: "questions", title: "Check yourself", kind: "questions" },
  ];
}
