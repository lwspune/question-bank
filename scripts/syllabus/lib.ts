/**
 * Pure core for the syllabus concept map (migration 0065).
 *
 * The seed script is IO; everything decidable without a database lives here so
 * it can be tested. Validation is strict on purpose: this table is the spine a
 * gap report is computed from, so a malformed row silently widens or hides a gap.
 */

/** Syllabus authorities we adjudicate against. Not the same set as bank exams. */
export const SYLLABUS_EXAMS = [
  "MH State Board",
  "NDA",
  "JEE Mains",
  "MHT-CET",
  "CBSE Class 12",
] as const;

export type SyllabusExam = (typeof SYLLABUS_EXAMS)[number];

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
