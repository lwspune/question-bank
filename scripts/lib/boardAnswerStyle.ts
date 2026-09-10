/**
 * The BOARD-ANSWER convention for a stored model answer, as a probe.
 *
 * A solution in this bank is read by a student preparing for a board exam, so it
 * must read as the answer they would WRITE to score the marks: state the
 * principle, show every step, close on the result. It is not a note to whoever
 * is marking it, and it is not a commentary on the question.
 *
 * WHY THIS IS CODE AND NOT A PARAGRAPH. Eleven authoring briefs live under
 * scripts/, and a rule repeated in eleven files is a rule that rots in ten of
 * them — this repo has watched exactly that happen to hand-maintained counts and
 * enumerations. The briefs describe the convention; THIS decides it, and a
 * pipeline wires it into whatever gate stands between authoring and `data/`.
 *
 * The convention was not invented here, and it was MEASURED rather than
 * assumed. Across the 153 shipped Maharashtra HSC Maths numericals:
 *   - `\therefore` before the concluding step .... 135 (88%)  -> a real convention
 *   - closing on a bolded result line ............   0 (0%)   -> NOT a convention
 * A first draft of this file warned on the missing bolded line and fired on 43%
 * of the shipped corpus. That rule had been generalised from two short answers;
 * what the corpus actually does is close a numerical with a SANITY CHECK ("the
 * same value", "is consistent"), which is the better habit and is asked for in
 * the brief rather than enforced here — it is not reliably detectable.
 *
 * Every `error` pattern below was written by a real authoring pass and caught in
 * review.
 *
 * TWO SEVERITIES, deliberately.
 *   error — the text addresses the reader instead of answering, or asserts a
 *           result the brief requires be derived. Unambiguous; blocks.
 *   warn  — a convention a numerical should follow. Reported, never blocking:
 *           a probe that refuses legitimate content trains people to skip it.
 */

export type StyleFinding = {
  ref: string;
  severity: "error" | "warn";
  reason: string;
  /** The offending text, so a reviewer can act without re-reading the answer. */
  quote: string;
};

export type StyleOpts = {
  /** MCQ answers legitimately open "**(B)** value" — not an option letter in prose. */
  mcq?: boolean;
  /** Set for a question that asks the student to calculate/find/determine. */
  numerical?: boolean;
};

const ERRORS: { rx: RegExp; reason: string }[] = [
  {
    rx: /\((?:Other|Also)\s+acceptable[^)]*\)|\balso acceptable\b|\bacceptable (?:answers?|alternatives?)\b/i,
    reason: "marker-facing: offers the marker alternative answers rather than giving one",
  },
  {
    rx: /\bworth (?:stating|noting|saying)\b|\bA caution\b|\bAn aside\b|\bas an aside\b/i,
    reason: "editorial aside — a board answer does not address its reader",
  },
  {
    rx: /\bnote (?:that )?the question (?:asks|says|wants)\b|\bthe question is asking\b/i,
    reason: "comments on the question instead of answering it",
  },
  {
    rx: /\bby the standard result\b|\bit can be shown that\b|\bit is (?:well[- ])?known that\b|\bstandard result gives\b/i,
    reason: "asserts the result where the brief requires the working",
  },
  {
    rx: /\bwhich is option [A-D]\b|\brules? out options? [A-D]\b|\boptions? [A-D] and [A-D]\b|\bso option [A-D] is\b/i,
    reason: "names an option LETTER in prose — also what makes audit:keys misfire",
  },
];

const WARNS: { rx: RegExp; reason: string }[] = [
  {
    rx: /\bcorresponds to\b[^.]*\\text\{/,
    reason: "'corresponds to' inside a math step reads as a hand-waved derivation",
  },
];

const THEREFORE = /\\therefore/;

export function probeBoardAnswer(ref: string, answer: string, opts: StyleOpts = {}): StyleFinding[] {
  const out: StyleFinding[] = [];
  const text = answer ?? "";

  // An MCQ answer opens with the chosen option and its value — that is the
  // convention, not a stray letter. Exempt only that opening from the
  // option-letter rule; a letter anywhere else is still prose.
  const body = opts.mcq ? text.replace(/^\s*\*\*\([A-D]\)\*\*/, "") : text;

  for (const { rx, reason } of ERRORS) {
    const m = rx.exec(body);
    if (m) out.push({ ref, severity: "error", reason, quote: m[0].slice(0, 90) });
  }
  for (const { rx, reason } of WARNS) {
    const m = rx.exec(body);
    if (m) out.push({ ref, severity: "warn", reason, quote: m[0].slice(0, 90) });
  }

  // Conventions asked of a NUMERICAL only. A derivation, a proof or an
  // explanation legitimately ends on its concluding sentence, so imposing a
  // bolded result there would be noise.
  if (opts.numerical) {
    if (!THEREFORE.test(text)) {
      out.push({
        ref,
        severity: "warn",
        reason: "no \\therefore before the concluding step",
        quote: "",
      });
    }
  }
  return out;
}

/** True when a stem asks the student to compute something. */
export function isNumericalStem(stem: string): boolean {
  return /\b(calculate|find|determine|compute|evaluate|obtain the value)\b/i.test(stem);
}
