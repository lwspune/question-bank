/**
 * IMAT originality check (spec tests/imat-originality.test.ts).
 *
 * Every question we write for IMAT (notes self-checks, practice reps, later
 * practice questions) must be our own. The past papers are the evidence of
 * what is tested, never text to reuse: 2011-2022 belong to Cambridge and can
 * never be published. Copyright protects the wording and the set-up of a
 * question, not its topic or skill, so this checks for the four ways a
 * rewrite can still be a copy:
 *
 * - shared-run:   8+ words in a row taken from one past question;
 * - word-overlap: most of the candidate's words come from one past question
 *                 (the same puzzle with the names changed);
 * - same-numbers: the candidate reuses the specific numbers of one past
 *                 question (the same calculation, reworded);
 * - same-options: 3+ of one past question's answer options.
 *
 * WHAT IS NOT A COPY, each rule measured on the 1,000 past questions (every
 * past question checked against all the others):
 * - Question frames. "Which one of the following can be drawn as a
 *   conclusion from the above argument?" recurs in 3-25 papers; it is the
 *   exam's form, not one question's expression. A run or an option found in
 *   PHRASE_DF or more past questions is ignored. A question the setters
 *   REUSED appears in 2, so it still counts. A frame can also sit in exactly
 *   2 papers word for word ("one of the following, if true, weakens"), so a
 *   run must also carry RUN_MIN_WORDS uncommon words to count: frames are
 *   built from the exam's common words.
 * - Common vocabulary and numbers: a word or number in `wordDf` or more past
 *   questions (3%) is ignored, and so are whole numbers 0-10.
 * - One-token options ("16", "mitochondria"): three matching is coincidence.
 * - A few numbers shared with a number-heavy question (a timetable): a reused
 *   calculation keeps most of BOTH questions' numbers, so both shares count.
 *
 * A finding is a question for a person, not a verdict: rewrite the candidate,
 * or record why it is fine. Pure: no file or database access.
 */

import type { SubtopicNote } from "@/app/notes/_types";

export type OriginalitySource = { id: string; text: string; options?: readonly string[] };
export type OriginalityCandidate = { id: string; text: string; options?: readonly string[] };

export type OriginalityFindingKind = "shared-run" | "word-overlap" | "same-numbers" | "same-options";
export type OriginalityFinding = {
  kind: OriginalityFindingKind;
  candidateId: string;
  sourceId: string;
  detail: string;
};

/** Words in a row that count as copied. */
export const RUN_LENGTH = 8;
/** ...carrying at least this many uncommon content words (a frame is built from common ones). */
export const RUN_MIN_WORDS = 3;
/** Share of the candidate's content words found in one past question. */
export const OVERLAP_SHARE = 0.6;
/** ...and at least this many of them, so a short prompt can't trip it alone. */
export const OVERLAP_MIN_WORDS = 8;
/**
 * Distinctive numbers shared with one past question, and their share of each
 * question's distinctive numbers. Three is coincidence: on the IMAT notes all
 * four 3-number hits were unrelated questions (a sledge and a loan ledger).
 */
export const NUMBERS_MIN = 4;
export const NUMBERS_SHARE = 0.5;
/** Answer options shared with one past question. */
export const OPTIONS_MIN = 3;
/** A run or an option in at least this many past questions is a question frame. */
export const PHRASE_DF = 3;
/** A word or number in at least this share of past questions (floor 3) is common. */
export const WORD_DF_SHARE = 0.03;

const STOPWORDS = new Set(
  (
    "a an the and or but if then than that this these those of to in on at by for from with without into onto " +
    "as is are was were be been being it its it's they them their there here he she his her we our you your i " +
    "not no nor so such which what who whom whose when where why how all any each every some most more less " +
    "can could would should will shall may might must do does did done has have had having one only also very " +
    "about above below between after before over under up down out off again both other same own just"
  ).split(" ")
);

/**
 * Lower-cased word and number tokens. LaTeX command names go (their
 * arguments stay), and numbers are normalised so 0.30 and 0.3 match.
 */
export function tokens(s: string): string[] {
  const plain = s
    .replace(/\\[a-zA-Z]+/g, " ")
    .replace(/(\d),(\d{3})\b/g, "$1$2")
    .toLowerCase();
  return (plain.match(/\d+(?:\.\d+)?|[a-z]+/g) ?? []).map((t) => (/^\d/.test(t) ? String(Number(t)) : t));
}

const isNumber = (t: string) => /^\d/.test(t);
const contentWords = (ts: readonly string[]) =>
  new Set(ts.filter((t) => !isNumber(t) && t.length >= 3 && !STOPWORDS.has(t)));
const numbersOf = (ts: readonly string[]) =>
  new Set(ts.filter((t) => isNumber(t) && !(Number.isInteger(Number(t)) && Number(t) <= 10)));
/** Options of two or more tokens; a lone number or word matching is coincidence. */
const optionKey = (o: string) => {
  const ts = tokens(o);
  return ts.length >= 2 ? ts.join(" ") : "";
};
const ngrams = (ts: readonly string[], n: number) => {
  const out: string[] = [];
  for (let i = 0; i + n <= ts.length; i++) out.push(ts.slice(i, i + n).join(" "));
  return out;
};

type Feature = Map<string, Set<number>>; // feature -> indices of the sources holding it

export type OriginalityIndex = {
  sources: readonly OriginalitySource[];
  wordDf: number;
  runs: Feature;
  words: Feature;
  numbers: Feature;
  options: Feature;
  numberSets: Set<string>[];
};

function add(f: Feature, keys: Iterable<string>, i: number) {
  for (const k of keys) {
    const s = f.get(k) ?? new Set<number>();
    s.add(i);
    f.set(k, s);
  }
}

export function buildOriginalityIndex(sources: readonly OriginalitySource[]): OriginalityIndex {
  const idx: OriginalityIndex = {
    sources,
    wordDf: Math.max(PHRASE_DF, Math.ceil(WORD_DF_SHARE * sources.length)),
    runs: new Map(),
    words: new Map(),
    numbers: new Map(),
    options: new Map(),
    numberSets: [],
  };
  sources.forEach((src, i) => {
    const ts = tokens(src.text);
    add(idx.runs, ngrams(ts, RUN_LENGTH), i);
    add(idx.words, contentWords(ts), i);
    const ns = numbersOf(ts);
    idx.numberSets.push(ns);
    add(idx.numbers, ns, i);
    add(idx.options, (src.options ?? []).map(optionKey).filter(Boolean), i);
  });
  return idx;
}

/** The candidate's features that are not boilerplate, each with the sources holding it. */
function distinctive(f: Feature, keys: Iterable<string>, df: number): Map<string, Set<number>> {
  const out = new Map<string, Set<number>>();
  for (const k of keys) {
    const held = f.get(k);
    if (held && held.size < df) out.set(k, held);
  }
  return out;
}

/** Group features by source: source index -> the features it shares. */
function bySource(hits: Map<string, Set<number>>): Map<number, string[]> {
  const out = new Map<number, string[]>();
  for (const [k, held] of hits) for (const i of held) out.set(i, [...(out.get(i) ?? []), k]);
  return out;
}

export function checkOriginality(idx: OriginalityIndex, c: OriginalityCandidate): OriginalityFinding[] {
  const df = idx.wordDf;
  const ts = tokens(c.text);
  const findings: OriginalityFinding[] = [];
  const push = (kind: OriginalityFindingKind, i: number, detail: string) =>
    findings.push({ kind, candidateId: c.id, sourceId: idx.sources[i].id, detail });

  // 1. Runs of RUN_LENGTH words, each carrying RUN_MIN_WORDS uncommon words.
  const uncommon = (w: string) => (idx.words.get(w)?.size ?? 0) < df;
  const runs = ngrams(ts, RUN_LENGTH).filter(
    (r) => [...contentWords(r.split(" "))].filter(uncommon).length >= RUN_MIN_WORDS
  );
  for (const [i, shared] of bySource(distinctive(idx.runs, runs, PHRASE_DF)))
    push("shared-run", i, `${shared.length} shared ${RUN_LENGTH}-word run(s), e.g. "${shared[0]}"`);

  // 2. Content-word overlap, counted over the candidate's non-boilerplate words.
  const words = [...contentWords(ts)].filter((w) => (idx.words.get(w)?.size ?? 0) < df);
  if (words.length >= OVERLAP_MIN_WORDS) {
    for (const [i, shared] of bySource(distinctive(idx.words, words, df))) {
      const share = shared.length / words.length;
      if (shared.length >= OVERLAP_MIN_WORDS && share >= OVERLAP_SHARE)
        push("word-overlap", i, `${shared.length} of ${words.length} words (${Math.round(share * 100)}%)`);
    }
  }

  // 3. Distinctive numbers.
  const nums = [...numbersOf(ts)].filter((n) => (idx.numbers.get(n)?.size ?? 0) < df);
  for (const [i, shared] of bySource(distinctive(idx.numbers, nums, df))) {
    const ofSource = [...idx.numberSets[i]].filter((n) => (idx.numbers.get(n)?.size ?? 0) < df).length;
    if (shared.length >= NUMBERS_MIN && shared.length / nums.length >= NUMBERS_SHARE && shared.length / ofSource >= NUMBERS_SHARE)
      push("same-numbers", i, `numbers ${shared.join(", ")} (of ${nums.length} here, ${ofSource} there)`);
  }

  // 4. Answer options.
  const opts = new Set((c.options ?? []).map(optionKey).filter(Boolean));
  for (const [i, shared] of bySource(distinctive(idx.options, opts, PHRASE_DF)))
    if (shared.length >= OPTIONS_MIN) push("same-options", i, `options ${shared.map((o) => `"${o}"`).join(", ")}`);

  return findings;
}

/**
 * Every question a notes chapter asks, as candidates: each concept's worked
 * example, its self-check (with the five options) and its practice reps.
 * Ids read "<chapter>/<page>#<concept> <slot>" so a finding names the spot.
 */
export function notesCandidates(chapterSlug: string, notes: Record<string, SubtopicNote>): OriginalityCandidate[] {
  const out: OriginalityCandidate[] = [];
  for (const [page, note] of Object.entries(notes))
    for (const k of note.concepts) {
      const at = `${chapterSlug}/${page}#${k.slug}`;
      if (k.kind !== "reference" && k.authoredExample)
        out.push({ id: `${at} worked example`, text: k.authoredExample.prompt, options: k.authoredExample.options });
      if (k.selfCheckExample)
        out.push({ id: `${at} self-check`, text: k.selfCheckExample.prompt, options: k.selfCheckExample.options });
      (k.practiceSet ?? []).forEach((p, i) => out.push({ id: `${at} practice ${i + 1}`, text: p.prompt }));
    }
  return out;
}

/**
 * A person's verdict on one finding: this candidate, against this past
 * question, in this exact wording, is not a copy. `wording` ties the review to
 * the text, so editing the question brings the finding back for a fresh look.
 */
export type OriginalityReview = { candidate: string; source: string; wording: string; reason: string };

/** A short fingerprint of a candidate's stem and options (FNV-1a, 32-bit, hex). */
export function wordingKey(c: Pick<OriginalityCandidate, "text" | "options">): string {
  let h = 0x811c9dc5;
  for (const ch of [c.text, ...(c.options ?? [])].join("\u0001")) {
    h ^= ch.codePointAt(0)!;
    h = Math.imul(h, 0x01000193) >>> 0;
  }
  return h.toString(16).padStart(8, "0");
}

/** Findings no review covers for the candidate's current wording. */
export function unreviewed(
  findings: readonly OriginalityFinding[],
  candidates: readonly OriginalityCandidate[],
  reviews: readonly OriginalityReview[]
): OriginalityFinding[] {
  const key = new Map(candidates.map((c) => [c.id, wordingKey(c)]));
  const done = new Set(reviews.map((r) => `${r.candidate}\u0001${r.source}\u0001${r.wording}`));
  return findings.filter((f) => !done.has(`${f.candidateId}\u0001${f.sourceId}\u0001${key.get(f.candidateId)}`));
}
