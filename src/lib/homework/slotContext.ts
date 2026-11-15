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

/** Board section instructions the shared detector does not open with. The MH
 *  SSC Class 10 papers (2026-10-13) add solve, complete, do as directed, mark,
 *  rewrite and identify: their sections carry these on every question too. */
const SECTION_OPENING =
  /^(?:\*\*)?(?:give|differentiate|distinguish|draw|state|explain|answer|true or false|solve the following|complete the activit|do as directed|mark the following|rewrite the following|identify the odd)\b/i;

/** "Attempt any five of the following." is an instruction only when that is
 *  ALL it says; "Attempt any one of the following. In the extraction of
 *  aluminium:" carries the stem its parts share. */
const ATTEMPT_ONLY = /^attempt any \w+ of the following(?: questions)?\s*[.:]?\s*$/i;

/** UPSC (NDA, CDS) English stores its section direction on every question of
 *  the section (2026-11-15). They run up to ~530 characters, longer than any
 *  board instruction, so they are known by their SHAPE: they open with
 *  "Directions" and END by telling you how to answer ("... accordingly.",
 *  "... indicated as (d)."). A Maths set opening the same way ends with the
 *  data its parts share, and a cloze passage carries its blanks. */
const UPSC_DIRECTION_MAX = 560;
const UPSC_DIRECTION_OPENING = /^(?:\*\*)?directions\b/i;
const UPSC_DIRECTION_ENDING =
  /(?:accordingly|answer sheet|indicated as \(d\)|by the letter \(d\)|\(a\), \(b\), \(c\) (?:or|and) \(d\)|correct alternative|most appropriate expression|response as \(d\)|code given below the lists(?:\s*:\s*list i \([^)]*\), list ii \([^)]*\))?)\s*[.:]?$/i;
const HAS_BLANK = /_{3,}|\[\d+\]/;

/** CDS English (2026-11-15) mostly stores a one-line SUMMARY of the direction
 *  ("Directions: find error in underlined part or No error"). Every such line
 *  in the bank is an instruction; a set opens "Directions for the following",
 *  and a passage or set data runs on to a new line, a blank or maths. */
const UPSC_SUMMARY_MAX = 100;
const UPSC_SUMMARY_OPENING = /^(?:\*\*)?directions\s*:/i;

function isUpscDirection(c: string): boolean {
  if (
    c.length <= UPSC_SUMMARY_MAX &&
    UPSC_SUMMARY_OPENING.test(c) &&
    !c.includes("\n") &&
    !c.includes("\\(") &&
    !HAS_BLANK.test(c)
  ) {
    return true;
  }
  return (
    c.length <= UPSC_DIRECTION_MAX &&
    UPSC_DIRECTION_OPENING.test(c) &&
    UPSC_DIRECTION_ENDING.test(c) &&
    !HAS_BLANK.test(c)
  );
}

export function isHomeworkPassage(context: string | null): boolean {
  const c = (context ?? "").trim();
  if (c.length === 0) return false;
  if (isInstructionOnlyContext(c)) return false;
  if (ATTEMPT_ONLY.test(c)) return false;
  if (isUpscDirection(c)) return false;
  return !(c.length <= MAX_INSTRUCTION_LENGTH && SECTION_OPENING.test(c));
}
