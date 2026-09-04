/**
 * Pure probes over a STUDENT-FACING solution string.
 *
 * WHY THIS EXISTS. The derivation packet's `reasoning` field was designed as
 * REVIEWER EVIDENCE -- it is what the crosstab prints on a disputed row so a
 * human can adjudicate, and the brief deliberately requires it to name the
 * runner-up and say what would flip it. `buildRecords` then pipes that same
 * string verbatim into `questions.solution`, which is what a STUDENT reads.
 *
 * Two audiences, one field, and no contract covering the student half. The
 * result reached production: 164 of 800 published CDS Maths solutions carried
 * reviewer jargon ("RUNNER-UP: option B, if ...", "ADJUDICATED BY HAND -- the
 * two blind passes DISAGREED", "Verified with sympy") and 114 carried no math
 * markup at all, so a beautifully typeset stem was answered by "the product
 * vanishes only if sin alpha equals -2" sitting beside it.
 *
 * This module is the standing check for both. It is TRIAGE, not proof: it finds
 * the shapes listed below and is blind to a solution that is merely badly
 * written. A clean run means "none of these known defects", never "this reads
 * well".
 */

/** A single finding against one solution. */
export type SolutionFinding = {
  kind: "JARGON" | "ASCII_MATH" | "NO_MATH_MARKUP" | "DUPLICATED_CLAUSE";
  /** The offending fragment, for a work list a human can act on. */
  detail: string;
};

/**
 * Phrases that belong to the review protocol and NOT in front of a student.
 *
 * Each entry earned its place from a real published row. `sympy` is included
 * because naming the tool is reviewer evidence -- a student does not care which
 * CAS confirmed it, and "verified with sympy" in a solution reads as a hedge.
 */
const JARGON_PATTERNS: { re: RegExp; label: string }[] = [
  { re: /\brunner[-\s]?up\b/i, label: "runner-up note (reviewer-only field)" },
  { re: /\badjudicated\b/i, label: "adjudication process language" },
  { re: /\bblind (?:pass|passes|derivation|re-?derivation)\b/i, label: "blind-pass process language" },
  { re: /\bpass\s+[AB]\b/, label: "names a derivation pass" },
  { re: /\bcrosstab\b/i, label: "names the crosstab tool" },
  { re: /\bsympy\b|\bSLSQP\b|\bmpmath\b/i, label: "names the CAS/optimiser used" },
  { re: /\bboth passes\b|\btwo passes\b/i, label: "refers to the two derivation passes" },
  { re: /\bDISAGREED?\b/, label: "reports pass disagreement" },
  { re: /\bconfidence:\s*(HIGH|MED|LOW)\b/, label: "leaks the confidence flag into prose" },
  // Added after a rewrite agent pointed out the list named three CAS tools but
  // missed the commoner way a derivation says how it was checked.
  //
  // SCOPED TO THE TOOL AND THE AUTHOR, deliberately. A first draft also flagged
  // "exhaustive search", "enumerated" and "brute-force" and was wrong to: for a
  // counting question, "an exhaustive check over all divisor pairs returns
  // exactly these two" IS the justification -- it tells the student the list is
  // complete, which is the entire content of the answer. Those are ordinary
  // mathematical English. Naming the LANGUAGE ("enumerated in python", "exactly
  // with Fractions") is not, and neither is the author narrating themselves.
  { re: /\b(?:in|using|with)\s+(?:python|numpy|Fractions|Decimal)\b/i, label: "names the language or library it was checked in" },
  { re: /\bI (?:checked|verified|computed|re-?derived|ran|chose|enumerated)\b/, label: "first person: the author narrating their own process" },
];

/**
 * ASCII spellings of things that should be typeset.
 *
 * Deliberately WORD-ANCHORED. `pi` unanchored matches inside "pipe" and
 * "pillar"; `mod` matches "model" and "modern". This project has already
 * shipped a probe that matched `cement` inside `displacement`, so the anchoring
 * is not caution, it is a repeat.
 */
const ASCII_MATH_PATTERNS: { re: RegExp; label: string }[] = [
  { re: /\bsqrt\s*[\(\d]/i, label: "sqrt(" },
  { re: /\bpi\b/, label: "bare 'pi'" },
  { re: /\b(?:alpha|beta|gamma|theta|lambda|delta|omega|phi|mu|sigma)\b/, label: "Greek letter spelled out" },
  { re: /\b\d+\s*\^\s*\d/, label: "caret exponent" },
  { re: /[a-zA-Z0-9]\s*\^\s*[({]/, label: "caret exponent" },
  { re: /(?:^|\s)>=|<=(?:\s|$)/, label: ">= or <=" },
  { re: /\b\d+\s*\/\s*\d+\s*:\s*\d/, label: "ratio written in ASCII" },
];

/** True if the position falls inside a `\( ... \)` or `\[ ... \]` math zone. */
function mathZoneRanges(s: string): [number, number][] {
  const out: [number, number][] = [];
  const re = /\\\((?:[\s\S]*?)\\\)|\\\[(?:[\s\S]*?)\\\]/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(s)) !== null) out.push([m.index, m.index + m[0].length]);
  return out;
}

/** Blank out math zones so a prose probe cannot fire on legitimate LaTeX. */
export function maskMath(s: string): string {
  const zones = mathZoneRanges(s);
  if (zones.length === 0) return s;
  const chars = s.split("");
  for (const [a, b] of zones) for (let i = a; i < b; i++) chars[i] = " ";
  return chars.join("");
}

/**
 * The provenance clause is APPENDED by buildRecords and is deliberate -- it is
 * the honesty disclosure saying the answer is derived and no official key
 * exists. It legitimately contains "blind derivations" and "confidence:", which
 * would otherwise trip two jargon rules. Strip it before probing prose.
 *
 * The body is `[^\]]*`, NOT a lazy `[\s\S]*?`. With the `$` anchor a lazy body
 * still has to reach the end of the string, so a MID-string bracket -- some
 * rows carry an inline `[Adjudicated against the external key ...]` -- matched
 * from there all the way through the appended clause's closing `]`, silently
 * swallowing every word between them. Those rows were then probed with most of
 * their prose missing, so the audit UNDER-reported. Refusing to cross a `]`
 * makes the match what it always meant: a trailing bracket, and only that.
 */
export function stripProvenance(s: string): string {
  return s.replace(/\[\s*(?:Derived answer|Adjudicated against)[^\]]*\]\s*$/i, "").trim();
}

/**
 * Does this solution contain a real math zone?
 *
 * A solution with none is not automatically wrong -- a pure-prose data
 * sufficiency answer legitimately has no formula -- so this is reported only
 * when the row ALSO carries an ASCII-math token, i.e. it wanted markup and
 * did not get it.
 */
export function hasMathMarkup(s: string): boolean {
  return mathZoneRanges(s).length > 0;
}

/** Probe one solution. Returns [] when nothing known is wrong with it. */
export function auditSolution(solution: string): SolutionFinding[] {
  const body = stripProvenance(solution ?? "");
  if (!body) return [];
  const prose = maskMath(body);
  const out: SolutionFinding[] = [];

  for (const { re, label } of JARGON_PATTERNS) {
    const m = prose.match(re);
    if (m) out.push({ kind: "JARGON", detail: `${label}: "${m[0]}"` });
  }

  const ascii: string[] = [];
  for (const { re, label } of ASCII_MATH_PATTERNS) {
    if (re.test(prose)) ascii.push(label);
  }
  if (ascii.length) {
    out.push({
      kind: hasMathMarkup(body) ? "ASCII_MATH" : "NO_MATH_MARKUP",
      detail: ascii.join(", "),
    });
  }

  // A note appended during adjudication that merely restates the sentence
  // before it. Cheap heuristic: the same >=40-char run appearing twice.
  const dup = findRepeatedRun(prose, 40);
  if (dup) out.push({ kind: "DUPLICATED_CLAUSE", detail: dup.slice(0, 60) });

  return out;
}

/** Longest-ish repeated run, used only as a duplication hint. */
export function findRepeatedRun(s: string, min: number): string | null {
  const norm = s.replace(/\s+/g, " ");
  for (let len = Math.min(120, Math.floor(norm.length / 2)); len >= min; len -= 10) {
    for (let i = 0; i + len * 2 <= norm.length; i += 5) {
      const frag = norm.slice(i, i + len);
      if (frag.trim().length < min) continue;
      if (norm.indexOf(frag, i + len) !== -1) return frag;
    }
  }
  return null;
}
