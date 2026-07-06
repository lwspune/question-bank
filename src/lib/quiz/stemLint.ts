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

// The harvester's placeholder formula stem — "Which of the following is the
// formula for <concept name>?". Never publish-ready: the concept name is a
// descriptive phrase that reads off ('…for The addition rule?'), and the
// auto-distractors are random sibling formulas (guessable by elimination). It
// needs a concrete, scenario-based stem authored in the verify pass.
// (Reversed 2026-06-11: this template was previously TOLERATED — see the test
// history — until a Probability formula quiz built entirely from these atoms
// shipped and read "off". The assembler also hard-excludes this pattern.)
const GENERIC_FORMULA_TEMPLATE = /^\s*which of the following is the formula for\b/i;

// Alphanumeric content of the RAW stem (math kept — "Mode of \(5,5,6,6,9\)?" is
// self-contained; only true fragments like "Valid?" should trip this).
const MIN_CONTENT_CHARS = 10;

// Defect A (2026-07-06): the stem points at a concrete object (a specific
// determinant / matrix / system) that is NOT given inline — the harvester lifted
// a notes item whose object lived in the surrounding prose. flagStem's back-ref
// checks miss these because the referent reads as concrete, not anaphoric.
//   - a determinant/matrix named by a pointing adjective ("the cyclic determinant")
//     or by a relative clause ("the determinant whose rows …"),
//   - a "typical value" / "in the bank|notes" meta-phrase (not a solvable object).
const OBJECT_REF =
  /\bthe (cyclic|circulant|complex|given|above|below|following|shown|previous) (determinant|matrix|matrices|system)\b|\bthe (determinant|matrix|system) (whose|that|which|shown|above|below|given)\b|\bthe typical value\b|\bin the (bank|notes)\b/i;
// …but only a problem when the object is NOT actually shown inline in the stem.
const HAS_INLINE_ARRAY = /\\begin\{[a-z]*matrix\}|\\begin\{array\}|\\begin\{cases\}/i;
// A leading participial clause with no object ("After differentiating,", "Once
// expanding,") or a bare continuation ("Then …") assumes a prior step.
const ORPHAN_OPENER = /^\s*(after|once|upon|having)\s+\w+ing,|^\s*(then|thus|hence|therefore)\b/i;
// A pronoun with no antecedent once the atom stands alone ("… x, y inside it").
const DANGLING_IT = /\b(inside|within) it\b/i;

// Defect B (2026-07-06): the CORRECT option carries an editorial aside the
// distractors lack — a parenthetical gloss (of prose OR a derivation) or an
// em/en-dash / arrow explanation. Test on math-stripped prose so a math delimiter
// `\( … \)` (which contains literal parens) never counts as an aside. A semicolon
// restatement was tried but dropped: parallel two-part answers whose distractors
// wrap the clause inside `\text{}` read as asymmetric and false-positive.
const OPTION_ASIDE = /\([^)]+\)|\s[—–-]\s|→/;

/** Returns a list of reasons the stem is likely NOT self-contained; [] = clean. */
export function flagStem(stem: string): string[] {
  const reasons: string[] = [];
  const prose = stripMathZones(stem).trim();

  if (DEICTIC_OPEN.test(prose)) reasons.push("deictic opener (missing antecedent)");
  if (BACK_REF.test(prose)) reasons.push("anaphoric back-reference to an undefined entity");
  if (VAGUE_CHOICE.test(prose)) reasons.push("criterion-less choice question");
  if (GENERIC_FORMULA_TEMPLATE.test(prose))
    reasons.push("generic auto-harvest formula template (needs a concrete stem)");
  if (ORPHAN_OPENER.test(prose)) reasons.push("orphan opener (prior step missing)");
  if (DANGLING_IT.test(prose)) reasons.push("dangling reference ('inside it')");
  if (OBJECT_REF.test(prose) && !HAS_INLINE_ARRAY.test(stem))
    reasons.push("references a determinant/matrix/value not shown in the stem");
  // Too short = a fragment ("Valid?", "Why?"). A terse but math-complete stem
  // ("GM of \(2\) and \(8\)?", "\(\sum i\)=?") is self-contained — exempt anything
  // carrying a math zone.
  const hasMath = /\\\(|\\\[/.test(stem);
  if (!hasMath && stem.replace(/[^\p{L}\p{N}]/gu, "").length < MIN_CONTENT_CHARS) {
    reasons.push("too short / telegraphic");
  }

  return reasons;
}

/**
 * Returns a reason if the CORRECT option carries an editorial aside that NONE of
 * the distractors carry — a "tell" a test-wise student can pick without knowing
 * the math ([] = clean). High-precision: an inherently-nuanced correct answer with
 * no aside (e.g. "Signed area of the parallelogram of its columns") is NOT flagged.
 */
export function flagOptionTell(
  options: Record<string, string> | null | undefined,
  answer: string | null | undefined
): string[] {
  if (!options || !answer || !(answer in options)) return [];
  const correct = String(options[answer] ?? "");
  const distractors = Object.entries(options)
    .filter(([k]) => k !== answer)
    .map(([, v]) => String(v ?? ""));
  if (distractors.length === 0) return [];
  const hasAside = (s: string) => OPTION_ASIDE.test(stripMathZones(s));
  if (hasAside(correct) && !distractors.some(hasAside)) {
    return ["correct option carries an editorial aside the distractors lack (guessable tell)"];
  }
  return [];
}
