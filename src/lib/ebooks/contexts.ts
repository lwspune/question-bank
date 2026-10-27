/**
 * A question's paper context once the question leaves its paper (2026-10-27).
 * PURE. Spec: tests/ebook-contexts.test.ts.
 *
 * Board papers store their section instructions on each question's `context`.
 * In a paper that prints once per section; in a chapter-wise or repeated-PYQs
 * book every question stands alone, so an instruction that carries nothing
 * ("Answer the following questions :") would repeat on every question and is
 * dropped. One that sets the task ("Differentiate between", "Write True or
 * False", a map to mark) is the question's own and stays, without the paper's
 * "(Any THREE)". Only short instructions are touched: a passage never is.
 */

/** Instructions that only order a paper's section and say nothing about the question. */
const EMPTY = [
  /^answer the following(?: questions?)?(?: in (?:detail|brief))?(?: \(any \w+\))?\s*[:.]?$/i,
  /^(?:select|choose) and write the correct answers? for the following multiple choice(?: type of)? questions?\s*[:.]?$/i,
  /^solve the following (?:sub)?questions?(?: \(any \w+\))?\s*[:.]?$/i,
  /^attempt any \w+ of the following\s*[:.]?$/i,
  /^do as directed\s*[:.]?$/i,
];

/** Longer than this, a context is a passage or a case study, never just an instruction. */
const INSTRUCTION_MAX = 120;

export function bookContext(context: string | null): string | null {
  if (context === null) return null;
  const trimmed = context.trim();
  if (trimmed.length > INSTRUCTION_MAX) return context;
  if (EMPTY.some((re) => re.test(trimmed))) return null;
  return trimmed.replace(/\s*\((?:attempt )?any \w+\)/gi, "").trim();
}
