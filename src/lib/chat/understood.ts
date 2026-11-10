/**
 * "Did you understand?" with Yes and No under V's explanations (owner,
 * 2026-10-23), in place of the thumbs there: one plain question is answered
 * more often than two icons, and it says whether the explanation worked.
 * Yes is kept; No is kept and sends NOT_UNDERSTOOD, so V explains again more
 * simply (rule 7) and asks again under the new explanation. Buttons, not a
 * line in V's text (decision B, V_SPEC.md). Stored per reply, migration 0182.
 *
 * Pure. Spec: tests/chat-understood.test.ts.
 */
import type { ToolCallLog } from "./anthropic";

/** The message a No sends for the student. */
export const NOT_UNDERSTOOD = "I didn't understand. Please explain it more simply.";

/**
 * "Which step lost you?" (V_LEARNING_LOOP.md step 4, 2026-11-10): after a No on
 * a reply with numbered steps, the student picks the step, and that step is
 * what V explains again. "All of it" still sends NOT_UNDERSTOOD.
 */
export function stuckStepMessage(step: number): string {
  return `I didn't understand step ${step}. Please explain it more simply.`;
}

const STEP_RE = /^I didn't understand step ([1-9]\d?)\. Please explain it more simply\.$/;

/** The step a step message names, or null. */
export function stuckStepOf(message: string | null | undefined): number | null {
  const m = message ? STEP_RE.exec(message) : null;
  return m ? Number(m[1]) : null;
}

/** A No, plain or naming a step. */
export function isNotUnderstoodMessage(message: string | null | undefined): boolean {
  return message === NOT_UNDERSTOOD || stuckStepOf(message) !== null;
}

/** The most step buttons offered: they sit in one row on a phone. */
export const MAX_STEP_CHOICES = 8;

/**
 * The numbered steps of a reply ("1.", "1)" or "Step 1:" at the start of a line), counted
 * from 1 while they run in order. 0 when there is no such list (bullets or
 * plain lines carry no number to name), so the chat sends a plain No instead.
 */
export function replySteps(reply: string): number {
  let next = 1;
  for (const line of reply.split("\n")) {
    // "1." / "1)" or "Step 1:" (V writes both, 2026-11-10).
    const m = /^\s*(?:Step\s+)?(\d{1,2})(?:[.)]\s|:\s)/i.exec(line);
    if (!m) continue;
    if (Number(m[1]) !== next) break;
    next += 1;
  }
  return Math.min(next - 1, MAX_STEP_CHOICES);
}

/** The tools that make a reply an explanation: of a question, or of a concept. */
const EXPLAIN_TOOLS = new Set(["explain_question", "explain_concept"]);

/**
 * A refused explain_question (out of free answers, signed out, not found) gave
 * no answer, so it is no explanation (2026-10-28: the limit reply was asking
 * "Did you understand?"). Its logged result says which: an explanation starts
 * "Question <id> from" (questionTools explainView). A call logged without its
 * result still counts, as before.
 */
function explained(c: ToolCallLog): boolean {
  if (!EXPLAIN_TOOLS.has(c.name)) return false;
  if (c.name !== "explain_question" || c.result === undefined) return true;
  const id = (c.input as { question_id?: unknown } | null)?.question_id;
  return typeof id === "string" && c.result.startsWith(`Question ${id} from`);
}

/**
 * A reply asks "Did you understand?" only when V explained something: it used
 * an explain tool, or it answered a No (V re-explains from memory, often with
 * no tool: case 76a45899, 2026-10-23), so the question comes back each time.
 */
export function isExplanation(toolCalls: readonly ToolCallLog[] | null | undefined, message?: string | null): boolean {
  return isNotUnderstoodMessage(message) || (toolCalls ?? []).some(explained);
}

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

/**
 * The question a No belongs to, so it can go to Fix your mistakes (owner,
 * 2026-11-08): the question V's explanation explained, or, on V's
 * re-explanation (often from memory, no tool), the question the student
 * tapped Ask V on. Null when the reply explained no question (a concept, or a
 * refusal) or the id is not a uuid: the asked id comes from the browser.
 * Every No in the 30 days to 2026-11-08 had one or the other.
 */
export function notUnderstoodQuestionId(input: {
  toolCalls: readonly ToolCallLog[] | null | undefined;
  message: string | null | undefined;
  askedQuestionId: string | null | undefined;
}): string | null {
  const call = (input.toolCalls ?? []).find((c) => c.name === "explain_question" && explained(c));
  const id = call
    ? (call.input as { question_id?: unknown } | null)?.question_id
    : isNotUnderstoodMessage(input.message)
      ? input.askedQuestionId
      : null;
  return typeof id === "string" && UUID_RE.test(id) ? id.toLowerCase() : null;
}

