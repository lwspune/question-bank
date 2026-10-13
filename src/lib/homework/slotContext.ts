/**
 * Whether a question's context is a PASSAGE its parts were written against, so
 * the homework review keeps those parts together as one question (2026-10-13).
 *
 * The shared detector (lib/mocks/instructionContext.ts) knows the instructions
 * MCQ papers print, and chapter tests and mocks depend on it as it stands. A
 * Maharashtra HSC Geography paper stores its SECTION instruction on every
 * question of the section ("Give geographical reasons (Any FOUR) :",
 * "Differentiate between (Any THREE) :"), openings that detector does not know,
 * so the homework prep would read a whole section as one case study. These
 * openings are recognised here only, so nothing published changes.
 *
 * Same line as the shared detector: an instruction is SHORT and OPENS with an
 * instruction; a long context is a passage whatever its first words.
 * Pure. Spec: tests/homework-slot-context.test.ts.
 */
import { isInstructionOnlyContext } from "@/lib/mocks/instructionContext";

/** The shared detector's limit: longer than any instruction, shorter than any passage. */
const MAX_INSTRUCTION_LENGTH = 160;

/** Board section instructions the shared detector does not open with. */
const SECTION_OPENING = /^(?:\*\*)?(?:give|differentiate|distinguish|draw|state|explain|answer|true or false)\b/i;

export function isHomeworkPassage(context: string | null): boolean {
  const c = (context ?? "").trim();
  if (c.length === 0) return false;
  if (isInstructionOnlyContext(c)) return false;
  return !(c.length <= MAX_INSTRUCTION_LENGTH && SECTION_OPENING.test(c));
}
