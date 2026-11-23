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

/**
 * Can the card show and grade it: a multiple-choice question with a marked answer (2026-11-23).
 * A figure is fine, the card shows it. A lesson's "Your turn" is the student's own mistake only
 * when this holds; otherwise it is a fresh question like it.
 */
export function canTryOnCard(q: VQuestion | null): boolean {
  return !!q && q.format === "mcq" && q.options.some((o) => o.isCorrect);
}

/**
 * The extra row a pick on the card writes beside question_practiced (2026-11-23). The drill's rule
 * (lib/drill/service recordDrillAnswer): a miss is an answer_wrong; a right answer is a recovery,
 * answer_correct, only when the student had missed the question before, which is what takes it
 * off the Fix list. Before this a right answer in V wrote nothing the Fix list reads, so a mistake
 * answered right again as a lesson's "Your turn" stayed waiting.
 */
export function vCardAnswerKind(correct: boolean, missedBefore: boolean): "answer_wrong" | "answer_correct" | null {
  if (!correct) return "answer_wrong";
  return missedBefore ? "answer_correct" : null;
}

/** Right or wrong, and the key's letter. null: not a pick on this question, or no key to grade against. */
export function gradeCard(q: VQuestion, chose: string): { correct: boolean; answer: string } | null {
  const pick = chose.toUpperCase();
  const key = q.options.find((o) => o.isCorrect);
  if (!key || !q.options.some((o) => o.label === pick)) return null;
  return { correct: pick === key.label, answer: key.label };
}
