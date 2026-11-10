/**
 * V sees the follow-up answer (V_LEARNING_LOOP.md step 2, owner 2026-11-10).
 *
 * Under an explanation, "One more like this" puts a question from the same
 * subtopic in the chat as a try card. The card's pick goes to
 * POST /api/chat/question with the explained question's id (`after`). There
 * the server links the two (v_followups, migration 0250) once it has checked:
 *   - V explained that question to this student today (explainedIn over their
 *     chat_interactions rows), and
 *   - the card is a different question in the same subtopic (followUpEligible).
 * The first link per explanation per day is free when the switch is on
 * (lib/chat/followUpServer.ts). The client's `after` is a claim, never proof.
 *
 * The card then says what the student showed (followUpCardCopy), and "Show me
 * where I went wrong" tells V which question it explained before
 * (followUpTailLine), so V starts from the difference instead of from scratch.
 *
 * Pure. Spec: tests/chat-follow-up.test.ts.
 */

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
/** How much of the earlier question V is shown: enough to recognise it. */
const STEM_MAX = 300;

/** The explained question's id sent with a follow-up, or null. */
export function parseFollowsUp(raw: unknown): string | null {
  return typeof raw === "string" && UUID_RE.test(raw) ? raw : null;
}

/** A follow-up is a DIFFERENT question in the SAME subtopic as the one explained. */
export function followUpEligible(
  explained: { id: string; subtopicId: string | null },
  followUp: { id: string; subtopicId: string | null }
): boolean {
  return explained.id !== followUp.id && explained.subtopicId !== null && explained.subtopicId === followUp.subtopicId;
}

export type ExplainRow = { askedQuestionId: string | null; toolCalls: unknown };

/**
 * Whether these AI replies explained the question: an Ask V tap on it, or an
 * explain_question call on it (a typed or pasted question). A hint
 * (get_question) is not an explanation.
 */
export function explainedIn(rows: readonly ExplainRow[], questionId: string): boolean {
  return rows.some((r) => {
    if (r.askedQuestionId === questionId) return true;
    if (!Array.isArray(r.toolCalls)) return false;
    return r.toolCalls.some((c) => {
      if (!c || typeof c !== "object") return false;
      const { name, input } = c as { name?: unknown; input?: unknown };
      return name === "explain_question" && !!input && typeof input === "object" && (input as { question_id?: unknown }).question_id === questionId;
    });
  });
}

/** What the try card says after the pick, and which buttons follow it. */
export function followUpCardCopy(
  result: { correct: boolean; answer: string },
  followUp: boolean
): { line: string; askLabel: string; offerMore: boolean } {
  if (!followUp) {
    return { line: result.correct ? "Right, well done." : `Not quite: the answer is (${result.answer}).`, askLabel: "Ask V why", offerMore: false };
  }
  return result.correct
    ? { line: "Right: you used the same idea on a new question.", askLabel: "Ask V why", offerMore: true }
    : { line: `Not quite: the answer is (${result.answer}).`, askLabel: "Show me where I went wrong", offerMore: false };
}

/**
 * V's tail line for "Show me where I went wrong": the question V explained
 * before, and to start from where this one differs. It replaces the line that
 * tells V to leave its earlier replies alone, since here they are the point.
 */
export function followUpTailLine(explained: { stem: string | null }): string {
  const stem = explained.stem?.replace(/\s+/g, " ").trim() ?? "";
  const quoted = stem ? ` ("${stem.length > STEM_MAX ? `${stem.slice(0, STEM_MAX)}…` : stem}")` : "";
  return `This is a follow-up: you explained a similar question to them just before${quoted}, and they then tried this one. Start with the step where this one differs from that one, then explain it.`;
}
