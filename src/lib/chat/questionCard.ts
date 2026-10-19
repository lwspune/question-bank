/**
 * The question card inside V (2026-10-19, study-partner Phase 1): "Try a
 * similar one" and "Is this your question?". The browser is sent the question
 * without its answer (cardView); the pick is checked on the server
 * (gradeCard), where it also counts as one of the day's free answers.
 *
 * Pure. Spec: tests/chat-question-card.test.ts.
 */
import type { VQuestion } from "./questionTools";

export type CardQuestion = {
  id: string;
  text: string;
  context: string | null;
  imageUrl: string | null;
  /** "NDA · Arithmetic". */
  where: string;
  options: { label: string; text: string }[];
};

export function cardView(q: VQuestion, imageUrl: string | null): CardQuestion {
  return {
    id: q.id,
    text: q.text,
    context: q.context,
    imageUrl,
    where: `${q.exam} · ${q.chapter}`,
    options: q.options.map((o) => ({ label: o.label, text: o.text })),
  };
}

/** Right or wrong, and the key's letter. null: not a pick on this question, or no key to grade against. */
export function gradeCard(q: VQuestion, chose: string): { correct: boolean; answer: string } | null {
  const pick = chose.toUpperCase();
  const key = q.options.find((o) => o.isCorrect);
  if (!key || !q.options.some((o) => o.label === pick)) return null;
  return { correct: pick === key.label, answer: key.label };
}
