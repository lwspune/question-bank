/**
 * Pure core for reconciling an OFFICIAL answer key read off a scan, and for
 * scoring a blind derivation against it.
 *
 * Why this exists at all. Nineteen of the twenty CDS English papers have no
 * published key — that absence is the premise the whole pipeline was built on,
 * and it is why every answer in those papers is LLM-derived and carries a
 * confidence rather than a proof. `2026-2` is the first sitting UPSC published
 * a key for, so it is the first paper here whose derivation can be checked
 * against something outside itself.
 *
 * What the check is actually for, which is NOT what it looks like. For English
 * the key outranks our judgement on nearly every disputed item, so scoring is
 * not really an audit of the key. It is the only available detector for this
 * corpus's documented defect class: the transcriber copying the CORRECT
 * option's text into the WRONG letter's slot and then keying that letter. The
 * answer is right as content and wrong as a letter, and a blind re-derivation
 * cannot see it — the solver derives the right answer, finds that text at some
 * label, and confirms the label. An official key breaks that circle, because
 * its letter is defined against the booklet's PRINTED option order. So a
 * key/derivation disagreement is first evidence about the TRANSCRIPTION and
 * only then about the derivation.
 *
 * Everything below fails closed. Each refusal marks a case where the
 * convenient behaviour would manufacture a well-formed key that is quietly
 * wrong, and a wrong key here is worse than no key: it would be used to
 * "correct" answers that were right. Spec: tests/cds-key.test.ts.
 */

export type KeyRead = {
  readerId: string;
  /** The series the reader confirmed off the page's OWN header box. */
  series: string;
  /** Question number (as a string) -> "A" | "B" | "C" | "D". */
  answers: Record<string, string>;
};

export type Key = Record<string, string>;

export type Reconciliation =
  | { ok: true; key: Key; dropped: number[] }
  | { ok: false; error: string; conflicts?: { number: number; reads: Record<string, string> }[] };

const LETTERS = new Set(["A", "B", "C", "D"]);

/**
 * The marker UPSC prints in a withdrawn question's Key cell.
 *
 * A dropped question is a real property of these keys, not an edge case: CDS
 * (II) 2026 General Knowledge reports "No. of Questions Dropped: 1" in its
 * header box and prints X against Q84. Rejecting X outright — the behaviour
 * before this — would have forced the caller to strip the cell BEFORE
 * reconciling, and a cell stripped before reconciliation is a cell the two
 * reads never compare, so a misread about WHICH question was withdrawn would
 * pass unseen. It is therefore reconciled like any other cell and only then
 * separated out.
 */
const DROPPED = "X";

/**
 * Fold several independent reads of the same printed key into one key, or
 * refuse.
 *
 * Reading a scanned table of 120 cells has an error rate, and a misread cell is
 * uniquely nasty: it manufactures a FALSE disagreement with the derivation, and
 * a human then adjudicates a dispute that never existed. Hence more than one
 * read, and hence no majority vote — with two reads a vote is meaningless, and
 * with three it would silently bless the cell two readers misread the same way.
 * Unanimity or nothing.
 */
export function reconcileKeyReads(reads: KeyRead[], expectedCount: number): Reconciliation {
  if (reads.length < 2) {
    return {
      ok: false,
      error: `reconcileKeyReads needs at least two reads, got ${reads.length}. One read is not a reconciliation.`,
    };
  }

  // The wrong-series page is the failure this cannot afford to miss: UPSC
  // shuffles question order between series, so the wrong page yields a
  // well-formed key that is ~75% wrong and reads as a collapsed derivation
  // rather than as the wrong page.
  const seriesSeen = Array.from(new Set(reads.map((r) => r.series)));
  if (seriesSeen.length > 1) {
    return {
      ok: false,
      error: `reads disagree on the series: ${seriesSeen.join(", ")}. They are not reads of the same page.`,
    };
  }

  const expected = Array.from({ length: expectedCount }, (_, i) => String(i + 1));
  for (const r of reads) {
    const missing = expected.filter((n) => !(n in r.answers));
    if (missing.length) {
      return {
        ok: false,
        error: `read "${r.readerId}" is missing ${missing.length} question(s): ${missing.slice(0, 10).join(", ")}${missing.length > 10 ? " ..." : ""}`,
      };
    }
    const extra = Object.keys(r.answers).filter((n) => !expected.includes(n));
    if (extra.length) {
      return { ok: false, error: `read "${r.readerId}" has unexpected question number(s): ${extra.join(", ")}` };
    }
    for (const n of expected) {
      const v = r.answers[n];
      if (!LETTERS.has(v) && v !== DROPPED) {
        return { ok: false, error: `read "${r.readerId}" Q${n} is not a letter A-D: ${JSON.stringify(v)}` };
      }
    }
  }

  const conflicts: { number: number; reads: Record<string, string> }[] = [];
  const key: Key = {};
  const dropped: number[] = [];
  for (const n of expected) {
    const values = new Set(reads.map((r) => r.answers[n]));
    if (values.size > 1) {
      conflicts.push({
        number: Number(n),
        reads: Object.fromEntries(reads.map((r) => [r.readerId, r.answers[n]])),
      });
      continue;
    }
    const agreed = reads[0].answers[n];
    // A withdrawn question gets NO key entry, deliberately: scoreAgainstKey
    // throws on a question the key does not cover, so excluding one from the
    // score has to be an explicit decision by the caller rather than a silent
    // pass. See the header note on DROPPED.
    if (agreed === DROPPED) dropped.push(Number(n));
    else key[n] = agreed;
  }

  if (conflicts.length) {
    return {
      ok: false,
      error: `${conflicts.length} cell(s) disagree between reads; re-read those cells rather than picking one.`,
      conflicts,
    };
  }
  return { ok: true, key, dropped };
}

export type ScoredQuestion = { number: number; answer: string; confidence: string };

export type Score = {
  total: number;
  agree: number;
  disagree: { number: number; derived: string; key: string; confidence: string }[];
  byConfidence: Record<string, { total: number; agree: number }>;
};

/**
 * Compare a blind derivation against the reconciled key.
 *
 * A question the key does not cover THROWS rather than being skipped or counted
 * as agreement: silently scoring 119 of 120 and printing the result as a score
 * would overstate the measurement, which is the one thing this number exists to
 * avoid.
 */
export function scoreAgainstKey(questions: ScoredQuestion[], key: Key): Score {
  const disagree: Score["disagree"] = [];
  const byConfidence: Score["byConfidence"] = {};
  let agree = 0;

  for (const q of questions) {
    const k = key[String(q.number)];
    if (!k) throw new Error(`no key entry for Q${q.number} — cannot score a question the key does not cover`);
    const bucket = (byConfidence[q.confidence] ??= { total: 0, agree: 0 });
    bucket.total += 1;
    if (k === q.answer) {
      agree += 1;
      bucket.agree += 1;
    } else {
      disagree.push({ number: q.number, derived: q.answer, key: k, confidence: q.confidence });
    }
  }

  return { total: questions.length, agree, disagree, byConfidence };
}
