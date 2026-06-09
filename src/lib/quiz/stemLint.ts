/**
 * Heuristic "is this stem self-contained?" check for quiz atoms. Pure — unit
 * tested in tests/quiz-stem-lint.test.ts; the quiz:lint runner reads atoms and
 * reports the flags.
 *
 * WHY: notes practiceSet/selfCheck prompts are authored as a CONNECTED sequence
 * read under a concept (item 2 says "the product" because item 1 defined it).
 * The harvester lifts each into a standalone atom and the assembler shuffles
 * them, so back-references lose their antecedent and the stem becomes unfair to
 * a cold quiz-taker. This is a TRIAGE tool (a human rewrites the flagged stems
 * via the verify `stem` override) — it errs toward catching, not perfection.
 */

/** Replace `\( … \)` / `\[ … \]` math zones with a single space, so prose-word
 *  checks don't trip over LaTeX. */
export function stripMathZones(stem: string): string {
  return stem
    .replace(/\\\([^]*?\\\)/g, " ")
    .replace(/\\\[[^]*?\\\]/g, " ")
    .replace(/\s+/g, " ");
}

// A definite article + a strictly ANAPHORIC adjective — "the wrong pairing",
// "the other one", "the previous result" — points at something defined earlier.
// Deliberately tight: excludes "following/above" (collide with the standard
// phrase "the following"), "same" ("the same unit as X" is self-contained), and
// "right/correct" (often fine: "the correct formula").
const BACK_REF = /\b(the|that|this) (wrong|other|previous|earlier|latter|former|aforementioned) \w+/i;

// "which is correct/right/valid/true" with no stated criterion in the stem.
const VAGUE_CHOICE = /\bwhich (?:is|one is|of (?:these|them) is)?\s*(?:correct|right|wrong|valid|true)\b/i;

// Opens with a pronoun whose antecedent is missing once the atom stands alone.
const DEICTIC_OPEN = /^\s*(this|these|those|it)\b/i;

// Alphanumeric content of the RAW stem (math kept — "Mode of \(5,5,6,6,9\)?" is
// self-contained; only true fragments like "Valid?" should trip this).
const MIN_CONTENT_CHARS = 10;

/** Returns a list of reasons the stem is likely NOT self-contained; [] = clean. */
export function flagStem(stem: string): string[] {
  const reasons: string[] = [];
  const prose = stripMathZones(stem).trim();

  if (DEICTIC_OPEN.test(prose)) reasons.push("deictic opener (missing antecedent)");
  if (BACK_REF.test(prose)) reasons.push("anaphoric back-reference to an undefined entity");
  if (VAGUE_CHOICE.test(prose)) reasons.push("criterion-less choice question");
  // Too short = a fragment ("Valid?", "Why?"). A terse but math-complete stem
  // ("GM of \(2\) and \(8\)?", "\(\sum i\)=?") is self-contained — exempt anything
  // carrying a math zone.
  const hasMath = /\\\(|\\\[/.test(stem);
  if (!hasMath && stem.replace(/[^\p{L}\p{N}]/gu, "").length < MIN_CONTENT_CHARS) {
    reasons.push("too short / telegraphic");
  }

  return reasons;
}
