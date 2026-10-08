/**
 * The option an MCQ solution states IN WORDS, for the solutions that name no
 * letter. Used only where `concludedLetter` (scripts/practice/audit-keys.ts)
 * returns null; that shared function is left alone.
 *
 * Why: the shipped CBSE 12 solutions mostly lead with the answer in prose
 * ("MANGANESE has the highest ...", "Both statements are true, but ..."), so
 * the key screen read "(none)" on 1,617 of them (Chemistry 712, Maths 507,
 * Physics 398) and checked nothing.
 *
 * TWO rules, each kept because it measured clean on those 1,617 (2026-10-07):
 *   1. a closing "which is option <text>" whose text matches exactly one option
 *      (64 read, 64 agree with the stored key);
 *   2. an assertion-reason verdict stated in the FIRST sentence, and only when
 *      that sentence is a verdict (opens with "Both", "The Assertion", ...)
 *      (113 read, 113 agree).
 * A third rule, "the first sentence names exactly one option", read 240 and was
 * wrong on 18: an opening sentence often names a distractor. A screen that cries
 * wolf 7% of the time trains its reader to skip the real flag, so it was dropped.
 * Rows these rules cannot read stay null: unread, never guessed.
 */

export type OptionText = { label: string; text: string };

/** A comparable form: no math delimiters or LaTeX command names, letters and digits only. */
function norm(s: string): string {
  return s
    .replace(/\\(?:mathrm|text|dfrac|frac|left|right|displaystyle|,|;|!)/g, " ")
    .replace(/\\[a-zA-Z]+/g, (m) => m.slice(1))
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

const WHICH_IS = /(?:which is (?:option|the choice)|matching the choice)\s*[:'"]?\s*([^\n]{1,160})$/i;
const VERDICT_OPENING = /^(both|the assertion|assertion|the reason|neither|only the)/;

export function statedOption(solution: string | null, options: OptionText[]): string | null {
  const sol = (solution ?? "").trim();
  if (!sol) return null;
  const opts = options.map((o) => ({ label: o.label, n: norm(o.text ?? "") })).filter((o) => o.n.length > 0);

  // Rule 1: a closing "which is option <text>".
  const m = WHICH_IS.exec(sol);
  if (m) {
    const tail = norm(m[1]);
    // An EXACT match outranks a prefix one: "which is option 1/4" normalises to
    // "1 4", which the option "1" also prefixes.
    const exact = opts.filter((o) => tail === o.n || tail === o.n.replace(/ /g, ""));
    const hits = exact.length ? exact : opts.filter((o) => tail.startsWith(o.n + " "));
    if (hits.length === 1) return hits[0].label;
  }

  // Rule 2: an assertion-reason verdict in the first sentence.
  const isAR = options.some((o) => /assertion/i.test(o.text)) && options.some((o) => /reason/i.test(o.text));
  if (isAR) {
    const first = sol.split(/(?<=[.!?])\s+|\n/)[0].toLowerCase();
    const isVerdict = VERDICT_OPENING.test(first) && /(assertion|reason|statements)/.test(first);
    if (!isVerdict) return null;
    const bothTrue = /both[^.]*\btrue\b/.test(first);
    if (bothTrue && /\bnot\b[^.]*correct explanation/.test(first)) return "B";
    if (bothTrue && /correct explanation/.test(first)) return "A";
    if (/assertion[^.]*\btrue\b/.test(first) && /reason[^.]*\bfalse\b/.test(first)) return "C";
    if (/assertion[^.]*\bfalse\b/.test(first) && /reason[^.]*\btrue\b/.test(first)) return "D";
  }
  return null;
}
