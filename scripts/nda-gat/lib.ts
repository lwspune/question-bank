// Pure assembly + validation for the NDA Paper II (GAT) PYQ ingestion.
//
// Like scripts/nda-pyq, this module is deliberately THIN: it RE-EXPORTS the
// scripts/cds-maths pure core rather than restating it. Of that core's nine
// functions, SEVEN are subject-agnostic and are used here verbatim — including
// `validateRows`, which already carries the duplicate-option, content_hash-
// collision, LaTeX-balance and pipe-table-separator gates a GAT paper needs, and
// `validateSets`, which enforces that a `Directions:` set stays contiguous.
//
// TWO functions hard-code a single subject and are restated below, because the
// divergence changes a TYPE and a re-export would not type-check — the same
// criterion cds-maths itself used when it forked from cds-gs:
//
//   1. THE CATALOG IS THREE LEVELS, subject -> chapter -> subtopic[]. A GAT paper
//      carries NINE subjects and files `subject` PER QUESTION, so a two-level
//      catalog cannot tell "Modern India is a History chapter" from "a Biology
//      question named a History chapter". commitStaged AUTO-CREATES an unknown
//      chapter, so that second case does not error — it mints a second chapter
//      under the wrong subject and splits a corpus in two, silently.
//   2. buildRecords writes `subject: q.subject`, not a paper-wide constant.
//
// Genuinely NEW here is `validateSections`, which has no counterpart in either
// sibling: a GAT paper has a hard Part A / Part B boundary at Q50 that /mock's
// NDA_GAT_PAPER blueprint declares as two sections with hard counts of 50 and
// 100. A mis-filed subject is therefore not merely a taxonomy slip — it breaks
// the mock reconstruction. See its own comment.
import type { RawRow } from "../../src/lib/upload/validate";
import type { Derivation, Option, TQ } from "../cds-maths/lib";

export {
  type Option,
  type Band,
  type Derivation,
  type Verdict,
  type CrosstabRow,
  normalizeQuestions,
  findLatexImbalance,
  mergeBands,
  normalizeDerivations,
  crosstab,
  validateRows,
  validateSets,
} from "../cds-maths/lib";

/**
 * A GAT transcription row. `TQ` from the shared core plus the one field a
 * multi-subject paper needs.
 *
 * It is a widening, so every re-exported function above accepts a GatTQ
 * unchanged — TypeScript's structural typing does the work and no shared body
 * had to be touched. `mergeBands` returns the narrower `TQ[]`; call sites that
 * need the subject back cast at that one point rather than the core being made
 * generic for a single consumer.
 */
export type GatTQ = TQ & { subject: string };

/** subject -> chapter -> subtopic[]. GENERATED from the bank by dump-catalog.ts. */
export type GatCatalog = Record<string, Record<string, string[]>>;

/**
 * The nine subjects an NDA GAT paper is made of, and the Q-number at which
 * Part A ends.
 *
 * These are the bank's OWN subject names, not the syllabus's wording — "General
 * Science" on the printed paper is Physics / Chemistry / Biology here, and
 * "Current Events" is Current Affairs. Verified against the 18 GAT sittings
 * already in the bank, every one of which splits exactly this way.
 */
export const ENGLISH_SUBJECT = "English";
export const GK_SUBJECTS = [
  "Physics",
  "Chemistry",
  "Biology",
  "History",
  "Geography",
  "Polity",
  "Economics",
  "Current Affairs",
] as const;
export const PART_A_LAST = 50;

export function validateCatalog(
  questions: GatTQ[],
  cat: GatCatalog,
  opts: { strictSubtopics?: boolean } = {}
): { errors: string[]; warnings: string[] } {
  const errors: string[] = [];
  const warnings: string[] = [];
  const subjects = Object.keys(cat);

  for (const q of questions) {
    const chapters = cat[q.subject];
    if (!chapters) {
      errors.push(
        `Q${q.number}: unknown subject "${q.subject}" (known: ${subjects.join(", ")})`
      );
      continue;
    }
    const subtopics = chapters[q.chapter];
    if (!subtopics) {
      errors.push(
        `Q${q.number}: unknown chapter "${q.chapter}" under subject "${q.subject}" ` +
          `(${Object.keys(chapters).length} chapters known for that subject, see catalog.json)`
      );
      continue;
    }
    if (q.subtopic && !subtopics.includes(q.subtopic)) {
      const msg = `Q${q.number}: subtopic "${q.subtopic}" is not listed under ${q.subject} / "${q.chapter}"`;
      if (opts.strictSubtopics) errors.push(msg);
      else warnings.push(msg);
    }
  }
  return { errors, warnings };
}

/**
 * Enforce the printed paper's own Part A / Part B boundary.
 *
 * WHY THIS IS A GATE AND NOT A NOTE. `NDA_GAT_PAPER` declares two sections with
 * HARD counts — english 50, gk 100 — and reconstructs each by SUBJECT
 * membership. So an English question mis-filed under Physics does not merely sit
 * in the wrong /browse filter: it makes the english section 49 and the gk
 * section 101, and the mock fails to build with a count error that names neither
 * the question nor the cause. The printed paper states the boundary explicitly
 * ("PART — A" on page 2, "PART — B" on page 9), so this is checkable against the
 * source rather than inferred.
 */
export function validateSections(questions: GatTQ[]): string[] {
  const errs: string[] = [];
  const gk = new Set<string>(GK_SUBJECTS);
  for (const q of questions) {
    const isEnglish = q.subject === ENGLISH_SUBJECT;
    if (!isEnglish && !gk.has(q.subject)) {
      errs.push(
        `Q${q.number}: subject "${q.subject}" is not on the GAT paper ` +
          `(expected ${ENGLISH_SUBJECT} or one of ${GK_SUBJECTS.join(", ")})`
      );
      continue;
    }
    if (q.number <= PART_A_LAST && !isEnglish) {
      errs.push(
        `Q${q.number}: Part A is English only, but this row is filed under "${q.subject}"`
      );
    }
    if (q.number > PART_A_LAST && isEnglish) {
      errs.push(
        `Q${q.number}: Part B is General Knowledge, but this row is filed under "${ENGLISH_SUBJECT}"`
      );
    }
  }
  return errs;
}

/**
 * Assemble commit-ready rows. Faithful to cds-maths' buildRecords except that
 * `subject` comes from the question rather than being a paper-wide constant —
 * see this file's header for why that one difference forced a local copy.
 */
export function buildRecords(
  questions: GatTQ[],
  derivations: Derivation[],
  opts: { reconciled?: Set<number>; keyed?: boolean; sourceRowOffset?: number } = {}
): RawRow[] {
  const byNumber = new Map(derivations.map((d) => [d.number, d]));
  const rows: RawRow[] = [];

  for (const q of questions) {
    const d = byNumber.get(q.number);
    if (!d) continue;
    // A NULL answer means the deriver found no printed option correct, which is
    // a finding rather than a gap. It cannot be committed: the bank requires
    // exactly one correct option, so the only ways to ship such a row are to
    // invent an answer or to mark a wrong option right. Drop it — the paper is
    // then short by one question, which is TRUE, instead of carrying one that is
    // wrong. commit.ts reports every such drop by number.
    if (d.answer == null) continue;
    const opt = (l: string) => q.options.find((o: Option) => o.label === l)?.text ?? "";
    rows.push({
      sourceRow: q.number + (opts.sourceRowOffset ?? 0),
      questionNumber: String(q.number),
      subject: q.subject,
      chapter: q.chapter,
      subtopic: q.subtopic,
      ...(q.context ? { context: q.context } : {}),
      ...(q.setLabel ? { setLabel: q.setLabel } : {}),
      question: q.stem,
      optionA: opt("A"),
      optionB: opt("B"),
      optionC: opt("C"),
      optionD: opt("D"),
      answer: d.answer.toUpperCase(),
      difficulty: q.difficulty,
      solution: (d.solution ?? d.reasoning).trim(),
    });
  }
  return rows;
}
