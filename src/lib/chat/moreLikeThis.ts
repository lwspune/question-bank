/**
 * "One more like this" under an Ask V explanation (2026-11-08, owner): another
 * question from the explained question's subtopic, as a "try" card, with no
 * AI call, so it uses none of the hour's messages and no free answer (the card
 * itself opens the answer under the usual limit).
 *
 * Why a button: a student asked V for "one more like question 4", then said
 * "17"; V cannot see the page's numbering and cannot write questions. The
 * button already knows the question.
 *
 * Pure over its data sources (route: /api/chat/similar). Spec: tests/chat-more-like-this.test.ts.
 */
import type { VQuestion } from "./questionTools";

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export type MoreLikeThisDeps = {
  loadQuestion: (id: string) => Promise<VQuestion | null>;
  /** similar_question's source: another question of the subtopic, none opened today. */
  loadSimilar: (q: VQuestion) => Promise<string | null>;
};

export type MoreLikeThisResult = { status: 200; questionId: string | null } | { status: 400 | 404 };

export async function moreLikeThis(body: unknown, d: MoreLikeThisDeps): Promise<MoreLikeThisResult> {
  const id = (body as { questionId?: unknown } | null)?.questionId;
  if (typeof id !== "string" || !UUID_RE.test(id)) return { status: 400 };
  const q = await d.loadQuestion(id);
  if (!q) return { status: 404 };
  return { status: 200, questionId: await d.loadSimilar(q) };
}
