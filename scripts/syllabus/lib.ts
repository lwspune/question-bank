/**
 * Pure core for the syllabus concept map (migration 0065).
 *
 * The seed script is IO; everything decidable without a database lives here so
 * it can be tested. Validation is strict on purpose: this table is the spine a
 * gap report is computed from, so a malformed row silently widens or hides a gap.
 */

/**
 * Syllabus authorities we adjudicate against. Not the same set as bank exams.
 *
 * Re-exported from the app's copy rather than declared twice: this list gates
 * what the seed will write, and a script that accepts an exam the page cannot
 * render (or rejects one it can) is a silently invisible ruling.
 */
import {
  SYLLABUS_EXAMS,
  type SyllabusExam,
  type ChapterStatus,
} from "../../src/lib/syllabus/summary";
export { SYLLABUS_EXAMS, type SyllabusExam };

/**
 * `full`    - required by this exam as written.
 * `partial` - only part of it is required, or it is met via a different chapter.
 * `not`     - reviewed and out of syllabus.
 *
 * There is deliberately no `unknown`: an unassessed pair is represented by the
 * ABSENCE of a row, so "out of syllabus" can never be confused with "not looked
 * at yet". Adding an `unknown` status would reintroduce exactly that ambiguity.
 */
export const CONCEPT_STATUSES = ["full", "partial", "not"] as const;
export type ConceptStatus = (typeof CONCEPT_STATUSES)[number];

export type ConceptRow = {
  class: number;
  subject: string;
  source: string;
  chapter_no: number;
  chapter_name: string;
  section_no: string;
  concept: string;
  seq: number;
};

export function isSyllabusExam(value: string): value is SyllabusExam {
  return (SYLLABUS_EXAMS as readonly string[]).includes(value);
}

export function isConceptStatus(value: string): value is ConceptStatus {
  return (CONCEPT_STATUSES as readonly string[]).includes(value);
}

/** Mirrors the CHECK constraints in 0065 so a bad row fails before the round-trip. */
export function validateConceptRow(row: Partial<ConceptRow>, index: number): string[] {
  const errors: string[] = [];
  const at = `row ${index}`;

  if (typeof row.class !== "number" || row.class < 9 || row.class > 12) {
    errors.push(`${at}: class must be 9-12, got ${JSON.stringify(row.class)}`);
  }
  if (typeof row.chapter_no !== "number" || row.chapter_no < 1) {
    errors.push(`${at}: chapter_no must be a positive number`);
  }
  if (typeof row.seq !== "number" || row.seq < 1) {
    errors.push(`${at}: seq must be a positive number`);
  }
  for (const [field, max] of [
    ["subject", 60],
    ["source", 60],
    ["section_no", 20],
    ["concept", 300],
    ["chapter_name", 300],
  ] as const) {
    const value = row[field];
    if (typeof value !== "string" || value.trim().length === 0) {
      errors.push(`${at}: ${field} is required`);
    } else if (value.length > max) {
      errors.push(`${at}: ${field} exceeds ${max} chars`);
    }
  }
  return errors;
}

/**
 * The unique key of 0065. Duplicates inside one seed file would upsert onto each
 * other and silently drop a concept, so the loader checks this before writing.
 */
export function conceptKey(row: ConceptRow): string {
  return [row.source, row.class, row.subject, row.section_no].join("|");
}

export function findDuplicateKeys(rows: ConceptRow[]): string[] {
  const seen = new Set<string>();
  const dupes = new Set<string>();
  for (const row of rows) {
    const key = conceptKey(row);
    if (seen.has(key)) dupes.add(key);
    seen.add(key);
  }
  return [...dupes];
}

/**
 * How a subject's rulings were produced, which decides what "partial" means on
 * the handout.
 *
 * `adjudicated` - somebody read both books and ruled each concept. "partial" is
 *   a verdict: the section is PARTLY in the syllabus.
 * `derived`     - `derive-board-status.ts` inferred coverage from the exam
 *   banks. It writes `partial` and NEVER `full`, by design, "because a pointer
 *   proves the exam asks something in this section, not that all of it is
 *   required". That caveat describes the DERIVATION's confidence, not the
 *   syllabus, so printing "Part" for it on a teacher's sheet would report a
 *   property of our tooling as a property of the syllabus.
 */
export type HandoutVocabulary = "adjudicated" | "derived";

/**
 * Which vocabulary a subject gets, decided from its own data rather than a
 * hardcoded list of subject names - so the label corrects itself the day someone
 * authors real rulings, instead of going quietly stale.
 *
 * A subject with no `full` ruling anywhere cannot have been adjudicated, because
 * an adjudicator would have found something fully covered. NOTE THE CLIFF this
 * implies: the first genuine `full` ruling committed for Physics or Mathematics
 * flips every one of its "Yes" cells back to "Part" in one step. That is the
 * correct behaviour - "partial" becomes meaningful the moment it is authored
 * rather than inferred - but it is abrupt, so the exporter prints which
 * vocabulary each file used.
 */
export function handoutVocabulary(
  statuses: ChapterStatus[],
): HandoutVocabulary {
  return statuses.some((s) => s === "full") ? "adjudicated" : "derived";
}

/**
 * The Word handout's cell vocabulary: "Yes", "Part", or nothing.
 *
 * Deliberately NARROWER than the page's `statusCellText`, which distinguishes
 * five states. The handout carries no legend, so a reader has no way to learn a
 * third symbol - and an unexplained "Mixed" or "?" on a printed sheet is worse
 * than a blank.
 *
 * The cost is real and must be reported by the caller rather than hidden: "not
 * in syllabus" (a checked verdict) and "not yet assessed" (nobody looked) both
 * render blank, and those are the two states this project is otherwise careful
 * never to conflate. They are separable per FILE rather than per cell - the
 * adjudicated subject has no unassessed cells and the derived subjects have
 * almost no negative verdicts - which is why the exporter prints the split for
 * each subject it writes.
 */
export function handoutCellText(
  status: ChapterStatus,
  vocabulary: HandoutVocabulary = "adjudicated",
): string {
  if (status === "full") return "Yes";
  if (status !== "partial" && status !== "mixed" && status !== "partly-assessed") return "";
  // "mixed" (the ruled concepts disagree) and "partly-assessed" (some are not
  // ruled at all) are one cell here. The PAGE separates them and this sheet
  // deliberately cannot: there is no third word available and no legend to
  // explain one. Under an adjudicated vocabulary both read Part; rounding either
  // up to "Yes" would overstate coverage on the sheet a teacher plans from.
  // Under a derived one there is no partial verdict to overstate - only "the
  // exam points here" or "nothing points here".
  return vocabulary === "derived" ? "Yes" : "Part";
}

/**
 * Evidence gathered for ONE (section, exam) pair while deriving the State Board
 * spine's exam columns. Kept apart from the verdict so the verdict is a pure
 * function of it, and so a note can say which kind of evidence it rests on.
 *
 * `exactLive`   - live subtopics whose covered_by names THIS section.
 * `rolledUpLive`- live subtopics that named a DESCENDANT; the citation rolled up
 *                 to here. Evidence that something under this section is asked,
 *                 and nothing more.
 * `old`         - subtopics that cite it but sit in a chapter the exam no longer
 *                 sets.
 */
export type SectionEvidence = {
  exactLive: string[];
  rolledUpLive: string[];
  old: string[];
};

/**
 * ref -> the refs exactly ONE level below it. Membership is what matters; the
 * order is sorted only so callers and tests are deterministic.
 *
 * Prefix-based rather than by splitting on ".", which is what makes the two
 * lettered aliases in the Maths spine come out right: "2.1.3b" (minted where the
 * book printed 2.1.3 twice) is a second child of 2.1 and NOT a child of 2.1.3,
 * because "2.1.3b" does not begin with "2.1.3.". Reading it as a child would
 * make 2.1.3 look like a parent whose subtree is never fully cited, and so
 * permanently block it from being promoted.
 *
 * A ref may carry a class prefix ("11|1.1"); no separator argument is needed,
 * since "12|1.1.1" does not begin with "11|1.1." either.
 */
export function directChildrenOf(refs: readonly string[]): Map<string, string[]> {
  const out = new Map<string, string[]>();
  for (const parent of refs) {
    const kids = refs.filter(
      (r) => r !== parent && r.startsWith(`${parent}.`) && !r.slice(parent.length + 1).includes("."),
    );
    out.set(parent, kids.sort());
  }
  return out;
}

/**
 * Turn per-section citation evidence into the State Board spine's exam column.
 *
 * WHAT CHANGED AND WHY IT IS A CHANGE OF CLAIM, not a bug fix. This step used to
 * write `partial` for every cited section and `full` for none, on the reasoning
 * that "a pointer proves the exam asks SOMETHING in that section, never that the
 * whole section is required". That is sound for a section with sub-sections. It
 * is not sound for a LEAF: a leaf is the finest grain this map has, so "part of
 * it is required" is not a statement the map can express or a reader can act on,
 * and the hedge described the derivation's confidence rather than the syllabus.
 *
 * The cost of the old rule was measurable. On 2026-08-18 the two derived
 * subjects rendered ZERO `full` cells between them against Chemistry's 1,032,
 * and the Word exporter had grown a whole second vocabulary to paper over it -
 * printing "Yes" for `partial` on a derived subject, with a documented cliff
 * waiting for the first real `full`.
 *
 * The rules, weakest claim that fits the evidence:
 *
 *   exactly cited + leaf            -> full     (nothing finer to withhold)
 *   every direct child is full      -> full     (the subtree is wholly required)
 *   any other live citation         -> partial  (something here is asked)
 *   only old-syllabus citations     -> not
 *   no citation at all              -> NO ROW   (nobody looked; never `not`)
 *
 * The child-closure rule is not cosmetic. Without it a parent sits `partial`
 * above children that are all `full`, and the chapter roll-up then reports that
 * as a genuine disagreement - a finding manufactured by this function rather
 * than found in the data.
 *
 * WHAT WOULD FALSIFY THE LEAF RULE: a leaf section the exam demonstrably asks
 * only half of. That is invisible here by construction, and the honest response
 * is a finer spine, not a hedge on every cell.
 */
export function deriveSectionStatuses(
  evidence: ReadonlyMap<string, SectionEvidence>,
  directChildren: ReadonlyMap<string, string[]>,
): Map<string, ConceptStatus> {
  const out = new Map<string, ConceptStatus>();
  // Deepest first, so a parent is decided only after every child it depends on.
  const byDepth = [...evidence.keys()].sort(
    (a, b) => (b.split(".").length - a.split(".").length) || a.localeCompare(b),
  );
  for (const ref of byDepth) {
    const e = evidence.get(ref)!;
    if (e.exactLive.length === 0 && e.rolledUpLive.length === 0) {
      out.set(ref, "not");
      continue;
    }
    const kids = directChildren.get(ref) ?? [];
    if (kids.length === 0) {
      // A leaf reached only by roll-up cannot happen (roll-up targets ancestors),
      // but if it ever did, the weaker claim is the right one.
      out.set(ref, e.exactLive.length > 0 ? "full" : "partial");
      continue;
    }
    out.set(ref, kids.every((k) => out.get(k) === "full") ? "full" : "partial");
  }
  return out;
}
