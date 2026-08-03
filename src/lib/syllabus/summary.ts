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

export type GapEntry = { cls: number; chapterNo: number; chapterName: string; conceptCount: number };

export type GapView = {
  /** Chapters the State Board teaches that this exam never requires. */
  notRequired: GapEntry[];
  /** Chapters this exam requires only in part. */
  partlyRequired: GapEntry[];
  /** Chapters with no ruling yet — reported separately so they read as unknown, not safe. */
  unassessed: GapEntry[];
  notConcepts: number;
  partlyConcepts: number;
  unassessedConcepts: number;
};

/**
 * "The State Board teaches this; exam X does not need it."
 *
 * Unassessed chapters are kept in their own bucket rather than folded into
 * notRequired. Presenting an unreviewed chapter as skippable is the single most
 * damaging thing this view could do — a teacher would drop content on the
 * strength of a ruling nobody ever made.
 */
export function buildGapView<
  T extends { cls: number; chapterNo: number; chapterName: string; conceptCount: number; status: Record<string, ChapterStatus> },
>(chapters: T[], exam: string): GapView {
  const view: GapView = {
    notRequired: [],
    partlyRequired: [],
    unassessed: [],
    notConcepts: 0,
    partlyConcepts: 0,
    unassessedConcepts: 0,
  };
  for (const c of chapters) {
    const entry: GapEntry = {
      cls: c.cls,
      chapterNo: c.chapterNo,
      chapterName: c.chapterName,
      conceptCount: c.conceptCount,
    };
    const s = c.status[exam];
    if (s === "not") {
      view.notRequired.push(entry);
      view.notConcepts += c.conceptCount;
    } else if (s === "partial" || s === "mixed") {
      view.partlyRequired.push(entry);
      view.partlyConcepts += c.conceptCount;
    } else if (s === null || s === undefined) {
      view.unassessed.push(entry);
      view.unassessedConcepts += c.conceptCount;
    }
  }
  return view;
}

/**
 * The spine a row belongs to. `syllabus_concepts.source` names the book or bank
 * a row was extracted from, and rows from different spines must never be mixed:
 * every spine uses subject "Chemistry" and numbers its chapters from 1, so a
 * query filtered on subject alone folds State Board Ch.1, NCERT Ch.1 and the
 * exam-bank rows into one chapter.
 */
export const SPINE = {
  stateBoard: "MH State Board",
  ncert: "NCERT",
  jee: "JEE Mains bank taxonomy",
} as const;

/**
 * Which syllabus an exam column is asking about when it sits on an EXAM-spine
 * row. On the State Board spine the column means "does exam X require this?";
 * on an exam spine it means "does book Y cover this?", so the same column name
 * points at a different book.
 */
export const BOOK_OF_EXAM: Record<string, string> = {
  "MH State Board": SPINE.stateBoard,
  "CBSE Class 12": SPINE.ncert,
};

/** "Diazonium Salts (12 PYQ)" -> { name, pyq }. Exam spines carry the count in the name. */
export function splitPyqCount(concept: string): { name: string; pyq: number } {
  const m = /^(.*?)\s*\((\d+)\s*PYQ\)\s*$/.exec(concept);
  return m ? { name: m[1], pyq: Number(m[2]) } : { name: concept, pyq: 0 };
}

/**
 * Parse one covered_by reference. An `XI:` / `XII:` prefix names the school YEAR
 * explicitly; without one the ref belongs to the same year as the row it sits on.
 * Cross-year mappings are the common case in this data, so a bare number cannot
 * be assumed to mean the row's own year without that default being stated.
 */
export function parseCoveredRef(ref: string, defaultCls: number): { cls: number; no: string } {
  const m = /^(XI|XII):(.+)$/.exec(ref.trim());
  if (!m) return { cls: defaultCls, no: ref.trim() };
  return { cls: m[1] === "XII" ? 12 : 11, no: m[2].trim() };
}

export function splitCoveredBy(coveredBy: string): string[] {
  return coveredBy
    .split(",")
    .map((x) => x.trim())
    .filter(Boolean);
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
