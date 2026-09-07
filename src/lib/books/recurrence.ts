/**
 * Repeat detection for a book whose exam re-asks its questions. Pure — no I/O.
 *
 * WHY THIS EXISTS. The NDA/CDS English book had ONE duplicate in 3,180
 * questions. MHT-CET Maths has 122 redundant rows in 2,228 (5.5%), because
 * MHT-CET genuinely re-asks questions across shifts and years and those copies
 * survive `content_hash` dedup — the hash covers the options, which two
 * independent typings spell differently. Laid out chapterwise they land
 * ADJACENT under one subtopic heading, so the book must either print the same
 * question up to four times or collapse it and say how often it was asked.
 *
 * Collapsing is the better book: a question asked in four papers is the
 * highest-yield item in its chapter, and a recurrence line is exactly what a
 * PYQ book should show. But it is only honest under two constraints.
 *
 * 1. A REPEAT IS COUNTED IN SITTINGS, NEVER IN ROWS. Three MHT-CET papers were
 *    uploaded twice under different `source_file` labels. Measured on the live
 *    bank, 90 of the 118 repeated-stem groups are one of those — ONE sitting,
 *    not a repeat. Counting rows would print "asked twice" on 90 questions that
 *    were asked once, which is a fabricated claim in the book's headline
 *    feature. `sittingOrdinal` must therefore already have the duplicate-upload
 *    labels collapsed onto their primary (see EXAM_SITTING's registry rule).
 *
 * 2. COLLAPSING IS PROPOSED, NEVER APPLIED AUTOMATICALLY. A group carrying any
 *    `review` reason is left alone for a human. The reasons are not
 *    hypothetical: 16 groups disagree about the answer, 18 are filed under two
 *    different chapters or subtopics, and identical stem text can hide two
 *    different questions when the question lives in a figure ("The shaded
 *    region in the following figure is the solution set of the inequations").
 *
 * REFUSAL IS FREE, and that is the point of deriving the badge from what was
 * EXCLUDED rather than storing it. Adjudicating a group as "these are two
 * different questions" means excluding nothing, and then both copies print and
 * neither claims the other's sitting — no special case, no stored state to
 * contradict.
 */

/**
 * The subset needed to ORDER and LABEL copies — what the render path has.
 *
 * Deliberately narrower than `RecurrenceRow`: a page has a question's text and
 * its sitting but no business supplying an answer or a review verdict, and
 * `recurrenceLabels` must never grow to read one. Handing it placeholder
 * judgement fields would type-check and silently mislead.
 */
export type RecurrenceOrderRow = {
  questionId: string;
  /** Raw stem text; normalised here, so callers cannot disagree about the key. */
  stem: string;
  /**
   * The REAL sitting, with duplicate-upload labels already collapsed onto the
   * paper they duplicate. Null where the sitting could not be read.
   */
  sittingOrdinal: number | null;
  /** How that sitting is named in print, e.g. "2023 - 16 May Shift 2". */
  sittingLabel: string;
  /**
   * True when this copy came from the sitting's PRIMARY `source_file` rather
   * than a duplicate-upload label. Only ever breaks a tie between two copies of
   * ONE sitting, so the render path may omit it.
   */
  preferred?: boolean;
};

/** A copy plus everything needed to JUDGE whether a group may be collapsed. */
export type RecurrenceRow = RecurrenceOrderRow & {
  chapter: string;
  subtopic: string | null;
  /** Raw correct-option text; normalised here. Null where there is no key. */
  answer: string | null;
  hasFigure: boolean;
  /** Required when judging: it decides which copy is kept. */
  preferred: boolean;
};

/**
 * Why a group must not be collapsed without someone looking at it. Each was
 * measured on the live bank, not imagined.
 */
export type ReviewReason =
  | "answer-conflict"
  | "chapter-split"
  | "subtopic-split"
  | "figure"
  | "unknown-sitting";

export type RepeatGroup = {
  /** The normalised stem these copies share. */
  key: string;
  /**
   * "upload-duplicate" = one paper uploaded twice, so the question was asked
   * ONCE and earns no badge. "repeat" = genuinely set in two or more sittings.
   */
  kind: "upload-duplicate" | "repeat";
  /** The copy to print: earliest sitting, primary upload, then id. */
  keeperId: string;
  /** The copies it stands for. */
  redundantIds: string[];
  /** Distinct sitting labels, oldest first. Length 1 => upload-duplicate. */
  sittings: string[];
  /** Empty => safe to collapse automatically. */
  review: ReviewReason[];
};

/**
 * The grouping key.
 *
 * It sees through the formatting variance of two independent typings — spacing,
 * `\tan` vs `tan`, `\,` — while KEEPING every character that can change what is
 * asked. Dropping operators as well would be a smaller, tidier key and it merges
 * real questions: measured against the live bank, it welds `cos 2t` to `cos^2 t`,
 * two plane questions whose coefficients differ only in sign, and a line through
 * `z - m` to one through `z + m`. A false merge DELETES a distinct question and
 * mislabels the pair as an answer conflict, so the key errs towards splitting.
 *
 * The one thing dropped beyond punctuation is an EMPTY sub/superscript: `_{}^{}`
 * is a typesetting artifact carrying no meaning, and leaving it in splits one
 * genuine duplicate pair.
 */
export function normaliseStem(text: string): string {
  return text
    .toLowerCase()
    .replace(/[_^]\{\}/g, "")
    .replace(/[^a-z0-9+*/^=<>-]/g, "");
}

/**
 * The key for comparing two copies' ANSWERS — deliberately looser than the stem
 * key in what it strips, and stricter in what it keeps.
 *
 * A stem is long prose where brackets are LaTeX scaffolding (`\left(`, `{}`) and
 * dropping them is what sees through two typings. An OPTION is a short
 * expression where a bracket is frequently the entire content: `(1, 7/3)`,
 * `[1, 7/3)` and `[1, 7/3]` are three different answers, and the stem key
 * flattens all three to the same string. That is the DANGEROUS direction — two
 * genuinely different answers comparing equal means the group is never flagged
 * and gets collapsed automatically.
 *
 * It also folds every unicode dash onto ASCII. The stem key drops en-dashes as
 * punctuation, which makes the option list `-3, 1, -1, 3` read as two pairs of
 * duplicates when it is four distinct values.
 *
 * Erring towards FLAGGING is free here: a false conflict costs one look, and a
 * missed one silently deletes a distinct answer. Two known false-positive
 * sources are left in DELIBERATELY for that reason: a trailing full stop
 * ("...many points" vs "...many points.") and LaTeX grouping braces
 * ("x^{2}" vs "x^2"). Stripping either would move this key back towards the
 * dangerous direction — "{2}" and "2" are different answers, and "0.5" and "05"
 * more so. Measured cost on MHT-CET Maths: 3 false flags in 118 groups.
 */
export function normaliseAnswer(text: string): string {
  return text
    .toLowerCase()
    // Math DELIMITERS first, and this order is load-bearing. Keeping brackets as
    // content means the inline-math wrappers would themselves read as content,
    // so `\(4\)` and `4` — the same answer, one copy typed with delimiters and
    // one without — would compare as different. Measured: that alone produced 14
    // false conflicts on MHT-CET Maths.
    .replace(/\\[()[\]]/g, "")
    .replace(/\$/g, "")
    .replace(/[‒-―−]/g, "-")
    .replace(/[_^]\{\}/g, "")
    .replace(/[^a-z0-9+*/^=<>()[\]{},.-]/g, "");
}

/** Sorts a missing ordinal last instead of first, without dropping the row. */
const LAST = Number.MAX_SAFE_INTEGER;

/** Earliest sitting, then the primary upload's copy, then id for determinism. */
function byPrintOrder(a: RecurrenceOrderRow, b: RecurrenceOrderRow): number {
  return (
    (a.sittingOrdinal ?? LAST) - (b.sittingOrdinal ?? LAST) ||
    Number(b.preferred ?? true) - Number(a.preferred ?? true) ||
    a.questionId.localeCompare(b.questionId)
  );
}

function distinctSittings(members: RecurrenceOrderRow[]): string[] {
  const seen = new Set<string>();
  const out: string[] = [];
  for (const m of members) {
    if (seen.has(m.sittingLabel)) continue;
    seen.add(m.sittingLabel);
    out.push(m.sittingLabel);
  }
  return out;
}

function reviewReasons(members: RecurrenceRow[]): ReviewReason[] {
  const reasons: ReviewReason[] = [];
  const distinct = <T>(values: T[]) => new Set(values).size > 1;

  if (distinct(members.map((m) => normaliseAnswer(m.answer ?? "")))) {
    reasons.push("answer-conflict");
  }
  if (distinct(members.map((m) => m.chapter))) reasons.push("chapter-split");
  if (distinct(members.map((m) => m.subtopic ?? ""))) reasons.push("subtopic-split");
  if (members.some((m) => m.hasFigure)) reasons.push("figure");
  // Without a sitting there is no way to tell a duplicate upload from a repeat,
  // so the badge would be a guess either way.
  if (members.some((m) => m.sittingOrdinal == null)) reasons.push("unknown-sitting");

  return reasons;
}

/**
 * Group a chapter's questions by stem and classify each repeat.
 *
 * Deterministic: the output depends only on the CONTENT of the rows, never on
 * the order they arrive in. Questions appearing once yield no group at all —
 * this reports repeats, not an index of everything.
 */
export function groupRepeats(rows: RecurrenceRow[]): RepeatGroup[] {
  const byKey = new Map<string, RecurrenceRow[]>();
  for (const r of rows) {
    const key = normaliseStem(r.stem);
    const list = byKey.get(key);
    if (list) list.push(r);
    else byKey.set(key, [r]);
  }

  const groups: RepeatGroup[] = [];
  for (const [key, unsorted] of byKey) {
    if (unsorted.length < 2) continue;
    const members = [...unsorted].sort(byPrintOrder);
    const sittings = distinctSittings(members);
    groups.push({
      key,
      // ONE sitting means one paper uploaded twice — the question was asked
      // once, so collapsing it is pure de-duplication and earns no badge.
      kind: sittings.length === 1 ? "upload-duplicate" : "repeat",
      keeperId: members[0].questionId,
      redundantIds: members.slice(1).map((m) => m.questionId),
      sittings,
      review: reviewReasons(members),
    });
  }

  return groups.sort((a, b) => a.key.localeCompare(b.key));
}

/**
 * What each PRINTED question stands for: its own sitting, plus the sittings of
 * the copies excluded in its favour. More than one entry earns a badge.
 *
 * Derived at render time rather than stored, for the same reason the contents
 * table is: a stored badge is a fourth place for the truth to live and would rot
 * the next time a group is re-adjudicated, with nothing to say so.
 *
 * Only the first printed copy absorbs the excluded ones. In a collapsed group
 * that is the keeper, which is the whole point; in a group someone REFUSED,
 * nothing is excluded, so every copy speaks only for itself and no badge
 * appears. An excluded question is absent from the result entirely — it is not
 * in the book.
 */
export function recurrenceLabels(
  rows: RecurrenceOrderRow[],
  excludedIds: ReadonlySet<string>
): Map<string, string[]> {
  const byKey = new Map<string, RecurrenceOrderRow[]>();
  for (const r of rows) {
    const key = normaliseStem(r.stem);
    const list = byKey.get(key);
    if (list) list.push(r);
    else byKey.set(key, [r]);
  }

  const labels = new Map<string, string[]>();
  for (const unsorted of byKey.values()) {
    const members = [...unsorted].sort(byPrintOrder);
    const printed = members.filter((m) => !excludedIds.has(m.questionId));
    const dropped = members.filter((m) => excludedIds.has(m.questionId));

    printed.forEach((m, i) => {
      // The absorbed sittings are re-sorted with the keeper's own so the badge
      // always reads oldest-first, whatever order the group was excluded in.
      const stood = i === 0 ? [m, ...dropped].sort(byPrintOrder) : [m];
      labels.set(m.questionId, distinctSittings(stood));
    });
  }

  return labels;
}
