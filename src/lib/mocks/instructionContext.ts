/**
 * A question's `context` is either a shared PASSAGE or only an INSTRUCTION.
 *
 * Board MCQs almost always carry one: the textbook exercise's "Choose the
 * correct option." is stored on every question of the exercise, and so is a
 * CBSE paper's Assertion-Reason direction. Neither is a passage. A chapter test
 * may take such a question on its own, because nothing in the question depends
 * on its neighbours. A real passage (a CBSE case study) is different: its
 * questions were written against it, and they stay out of loose selection.
 *
 * The line between the two is measured, not guessed (2026-10-05, every MCQ
 * context of CBSE 12, MH HSC 12 and MH SSC 10): instructions run 16 to 137
 * characters, the shortest passage runs 180. So an instruction is SHORT and
 * OPENS with an instruction. Opening matters as much as length: a passage
 * can say "choose the correct option" in its last sentence.
 *
 * Pure. Spec: tests/mock-instruction-context.test.ts.
 */

/** Longer than any instruction in the bank, shorter than any passage. */
const MAX_INSTRUCTION_LENGTH = 160;

/** Assertion-Reason directions can list the four codes, so they run longer. */
const MAX_ASSERTION_REASON_LENGTH = 700;

/**
 * How an instruction opens. Matched against the start of the context, after an
 * optional lead-in ("Do as directed:", a unit convention ending in a full stop
 * such as "Use g = 10 m/s², unless otherwise stated.").
 */
const INSTRUCTION_OPENING =
  /^(?:\*\*)?(?:choose|select|write|rewrite|tick|mark|find|fill|identify|complete|answer the following|do as directed|multiple choice|four alternative|some questions)\b/i;

/** A lead-in that may precede the instruction: a "use g = 10" style convention. */
const LEAD_IN = /^use\b[^\n]*?\.\s*/i;

export function isAssertionReasonInstruction(context: string | null): boolean {
  if (!context) return false;
  const c = context.trim();
  return (
    c.length > 0 &&
    c.length <= MAX_ASSERTION_REASON_LENGTH &&
    /\bassertion\b/i.test(c) &&
    /\breason\b/i.test(c)
  );
}

/** True when the context only tells the student what to do, and holds no passage. */
export function isInstructionOnlyContext(context: string | null): boolean {
  if (!context) return false;
  const c = context.trim();
  if (c.length === 0) return false;
  if (isAssertionReasonInstruction(c)) return true;
  if (c.length > MAX_INSTRUCTION_LENGTH) return false;
  return INSTRUCTION_OPENING.test(c.replace(LEAD_IN, ""));
}

/**
 * What a chapter test shows in place of an Assertion-Reason direction.
 *
 * The printed directions name their place in the paper ("For Questions number
 * 13 to 16"), which is wrong inside a 15-question test, and several print the
 * codes as (a)-(d) while the options are lettered A-D. The options already
 * spell out each choice in full, so the direction only has to say what kind of
 * question this is.
 */
export const ASSERTION_REASON_INSTRUCTION =
  "Two statements are given, one labelled Assertion (A) and the other labelled Reason (R). Select the correct answer from the options given below.";

/**
 * The context a mock shows for one question. A full paper shows what was
 * printed, where the question numbers are right; a chapter test swaps an
 * Assertion-Reason direction for the standard one. The stored text is never
 * changed, so `content_hash` is untouched.
 */
export function chapterTestContext(
  context: string | null,
  scope: "full" | "sectional"
): string | null {
  if (scope === "sectional" && isAssertionReasonInstruction(context)) {
    return ASSERTION_REASON_INSTRUCTION;
  }
  return context;
}
