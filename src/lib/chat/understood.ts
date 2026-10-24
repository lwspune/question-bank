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

/** The tools that make a reply an explanation: of a question, or of a concept. */
const EXPLAIN_TOOLS = new Set(["explain_question", "explain_concept"]);

/**
 * A reply asks "Did you understand?" only when V explained something: it used
 * an explain tool, or it answered a No (V re-explains from memory, often with
 * no tool: case 76a45899, 2026-10-23), so the question comes back each time.
 */
export function isExplanation(toolCalls: readonly ToolCallLog[] | null | undefined, message?: string | null): boolean {
  return message === NOT_UNDERSTOOD || (toolCalls ?? []).some((c) => EXPLAIN_TOOLS.has(c.name));
}
