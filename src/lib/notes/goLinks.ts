import { NOTES_CHAPTERS } from "./chapters";

/**
 * Resolution layer for the cross-app `/go/*` remediation redirects.
 *
 * nda-tracker (the delivery app) only knows a missed question by the slugs that
 * ride on a daily-quiz question — `subtopic` (a globally-unique notes subtopic
 * slug) and `conceptSlug` (the in-page anchor). It does NOT know our UUIDs or
 * URL shapes. So it hits `/go/learn` / `/go/practice` with those slugs and we
 * resolve them here, keeping taxonomy ownership on the side that has the
 * taxonomy. Pure (no DB) — the practice route layers a resolveTaxonomy call on
 * top to turn the names below into /browse UUIDs.
 */

export type SubtopicLocation = {
  examName: string;
  subjectName: string;
  subjectRoute: string;
  chapterSlug: string;
  chapterName: string;
  subtopicSlug: string;
  subtopicName: string;
  conceptSlugs: string[];
};

// Build lookups once at module load. Notes subtopic slugs are globally unique
// (enforced by notes-lint — see the mht-cet collision pitfall), so the slug
// alone pins exactly one location. We ALSO key by (chapterName, subtopicName)
// so the exam path — which only carries DB names, never notes slugs — can
// resolve too. The (chapter, subtopic) name pair is unique by the DB
// subtopics_chapter_id_name_key constraint.
export type ChapterLocation = {
  examName: string;
  subjectName: string;
  subjectRoute: string;
  chapterSlug: string;
  chapterName: string;
};

const BY_SLUG: Map<string, SubtopicLocation> = new Map();
const BY_NAME: Map<string, SubtopicLocation> = new Map();
// Chapter-level lookup for the "Where to focus" widget, which points at whole
// chapters (root-cause concepts), not individual subtopics. Keyed by chapter
// name alone — same last-write-wins convention as BY_NAME (a name shared across
// exams resolves to the last-registered notes chapter).
//
// EXCEPTION: a CDS or JEE Mains chapter never takes a name another chapter
// already holds. /go/learn is nda-tracker's "Learn this" target and carries no
// exam, so when CDS Statistics and CDS Quadratic Equations shipped (2026-09-29)
// last-write-wins silently re-pointed NDA's links for those chapters at the CDS
// pages; JEE reuses MHT-CET and NDA names the same way ("Conic Sections"). The
// older NDA/MHT-CET name collisions keep their existing last-write-wins winner.
const BY_CHAPTER: Map<string, ChapterLocation> = new Map();
const YIELDING_EXAMS = new Set(["CDS", "JEE Mains"]);
const yieldsName = (examName: string, taken: boolean) => YIELDING_EXAMS.has(examName) && taken;
const nameKey = (chapterName: string, subtopicName: string) =>
  `${chapterName}\u0000${subtopicName}`;

for (const ch of NOTES_CHAPTERS) {
  if (!yieldsName(ch.examName, BY_CHAPTER.has(ch.chapter.chapterName))) BY_CHAPTER.set(ch.chapter.chapterName, {
    examName: ch.examName,
    subjectName: ch.subjectName,
    subjectRoute: ch.subjectRoute,
    chapterSlug: ch.chapterSlug,
    chapterName: ch.chapter.chapterName,
  });
  for (const [subtopicSlug, note] of Object.entries(ch.notes)) {
    const loc: SubtopicLocation = {
      examName: ch.examName,
      subjectName: ch.subjectName,
      subjectRoute: ch.subjectRoute,
      chapterSlug: ch.chapterSlug,
      chapterName: ch.chapter.chapterName,
      subtopicSlug,
      subtopicName: note.subtopicName,
      conceptSlugs: note.concepts.map((c) => c.slug),
    };
    BY_SLUG.set(subtopicSlug, loc);
    const key = nameKey(ch.chapter.chapterName, note.subtopicName);
    if (!yieldsName(ch.examName, BY_NAME.has(key))) BY_NAME.set(key, loc);
  }
}

/** Resolve a notes subtopic slug to its full location, or null if unknown. */
export function getSubtopicBySlug(
  slug: string | null | undefined
): SubtopicLocation | null {
  if (!slug) return null;
  return BY_SLUG.get(slug) ?? null;
}

/**
 * Resolve by canonical DB names (the exam path — exam questions carry
 * chapter+subtopic NAMES, never notes slugs). Both names are required; the
 * (chapter, subtopic) pair is unique, so this pins one location or returns null
 * (e.g. an English subtopic with no notes).
 */
export function getSubtopicByName(
  chapterName: string | null | undefined,
  subtopicName: string | null | undefined
): SubtopicLocation | null {
  if (!chapterName || !subtopicName) return null;
  return BY_NAME.get(nameKey(chapterName, subtopicName)) ?? null;
}

/**
 * Resolve a DB chapter NAME to its notes location (the "Where to focus"
 * chapter-level path). Returns null when the chapter has no shipped notes.
 */
export function getChapterByName(
  chapterName: string | null | undefined
): ChapterLocation | null {
  if (!chapterName) return null;
  return BY_CHAPTER.get(chapterName) ?? null;
}

/**
 * Chapter-level "Learn" target → the /notes chapter index page. Returns null
 * when the chapter has no notes, so callers can fall back (e.g. /notes index).
 */
export function buildChapterLearnPath(
  chapterName: string | null | undefined
): string | null {
  const loc = getChapterByName(chapterName);
  if (!loc) return null;
  return `/notes/${loc.subjectRoute}/${loc.chapterSlug}`;
}

/**
 * Build the internal `/notes` path that teaches a missed question.
 *
 * `subtopic` is tried first as a notes slug (quiz path + tagged exam questions),
 * then — when `chapterName` is supplied — as a DB subtopic NAME (the exam path,
 * which has no slugs for untagged subjects). Appends the concept anchor only
 * when the concept is real for that subtopic (a stale/missing concept just lands
 * at the subtopic top — never a dead anchor). Returns null when nothing resolves
 * (e.g. an English subtopic with no notes → the route falls back to /notes).
 */
export function buildLearnPath(
  subtopic: string | null | undefined,
  conceptSlug?: string | null,
  chapterName?: string | null
): string | null {
  const loc =
    getSubtopicBySlug(subtopic) ?? getSubtopicByName(chapterName, subtopic);
  if (!loc) return null;
  const base = `/notes/${loc.subjectRoute}/${loc.chapterSlug}/${loc.subtopicSlug}`;
  if (conceptSlug && loc.conceptSlugs.includes(conceptSlug)) {
    return `${base}#${conceptSlug}`;
  }
  return base;
}

// Subjects whose name differs between the exam Tags export ("Maths") and the
// canonical DB subject ("Mathematics"). Extend as more aliases appear.
const SUBJECT_ALIASES: Record<string, string> = {
  Maths: "Mathematics",
};

/** Normalise an exam-side subject name to the canonical DB subject name. */
export function canonicalSubjectName(subject: string): string {
  return SUBJECT_ALIASES[subject.trim()] ?? subject.trim();
}

/** Which corpus to drill for a subject: practice bank for Maths (fresh problems),
 *  PYQ for everything else (no practice bank exists). */
export function corpusForSubject(subject: string): "practice" | "pyq" {
  return canonicalSubjectName(subject) === "Mathematics" ? "practice" : "pyq";
}
