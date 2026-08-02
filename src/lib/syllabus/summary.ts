/**
 * Pure helpers for the syllabus concept map view (migration 0065).
 *
 * Rulings are currently authored at chapter grain, so every concept in a chapter
 * shares a status — but nothing in the schema guarantees that, and a later
 * per-concept refinement is the whole reason the rows are per-concept. So the
 * chapter roll-up computes the real answer rather than sampling one row.
 */

export const SYLLABUS_EXAMS = [
  "MH State Board",
  "NDA",
  "MHT-CET",
  "JEE Mains",
  "CBSE Class 12",
] as const;

export type SyllabusExam = (typeof SYLLABUS_EXAMS)[number];

export type ConceptStatus = "full" | "partial" | "not";

/**
 * `null`    — no ruling for this exam yet (NOT the same as out-of-syllabus).
 * `"mixed"` — concepts within one chapter disagree, so the chapter cannot be
 *             summarised by a single status and the detail view must be opened.
 */
export type ChapterStatus = ConceptStatus | "mixed" | null;

export const STATUS_LABEL: Record<ConceptStatus, string> = {
  full: "In syllabus",
  partial: "Partly",
  not: "Not in syllabus",
};

/** Short cell text. Never rely on colour alone to convey the status. */
export const STATUS_SHORT: Record<ConceptStatus, string> = {
  full: "Yes",
  partial: "Part",
  not: "—",
};

export function rollUpChapterStatus(statuses: (ConceptStatus | null)[]): ChapterStatus {
  if (statuses.length === 0) return null;
  const present = statuses.filter((s): s is ConceptStatus => s !== null);
  // Any unassessed concept makes the chapter unassessed: reporting a status
  // derived from only the assessed subset would overstate what was reviewed.
  if (present.length !== statuses.length) return present.length === 0 ? null : "mixed";
  const first = present[0];
  return present.every((s) => s === first) ? first : "mixed";
}

export type ExamTally = { full: number; partial: number; not: number; unassessed: number };

export function tallyByExam(
  statuses: (ConceptStatus | null)[],
  totalConcepts: number,
): ExamTally {
  const t: ExamTally = { full: 0, partial: 0, not: 0, unassessed: 0 };
  for (const s of statuses) {
    if (s) t[s] += 1;
  }
  t.unassessed = totalConcepts - statuses.filter((s) => s !== null).length;
  return t;
}

/**
 * The section a concept rolls up into, one level below the chapter: "1.2.1" -> "1.2".
 * A top-level section is its own group, so grouping by this key never drops a row.
 *
 * Matches on the leading numeric pair rather than splitting on ".", so lettered
 * refs ("5.4 (a)", used by the NCERT-sourced concepts) group under their parent
 * instead of each becoming a singleton. Anything unparseable falls back to
 * itself — a row we cannot place must still be shown, never silently lost.
 */
export function sectionGroupKey(sectionNo: string): string {
  const m = /^(\d+)\.(\d+)/.exec(sectionNo.trim());
  return m ? `${m[1]}.${m[2]}` : sectionNo.trim();
}

export function isTopLevelSection(sectionNo: string): boolean {
  return sectionGroupKey(sectionNo) === sectionNo.trim();
}

/** A stable, URL-safe key for one chapter of one class. */
export function chapterKey(cls: number, chapterNo: number): string {
  return `${cls}-${chapterNo}`;
}

export function parseChapterKey(key: string): { cls: number; chapterNo: number } | null {
  const m = /^(\d{1,2})-(\d{1,2})$/.exec(key);
  if (!m) return null;
  const cls = Number(m[1]);
  const chapterNo = Number(m[2]);
  if (cls < 9 || cls > 12 || chapterNo < 1) return null;
  return { cls, chapterNo };
}
