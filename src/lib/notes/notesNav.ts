/**
 * Cross-exam navigation model for /notes, derived entirely from the
 * NOTES_CHAPTERS registry + EXAM_REGISTRY. The /notes top index and the
 * per-exam hubs (/notes/<examSlug>) render from these groupings, so adding a
 * new exam's notes is just a registry entry — no new hand-written hub page.
 *
 * Pure (no DB / no React); unit-tested in tests/notes-nav.test.ts.
 */

import { EXAM_REGISTRY, type ExamEntry, type ExamSlug } from "@/lib/exam/examContext";
import { NOTES_CHAPTERS } from "@/lib/notes/chapters";

export type NotesSubjectGroup = {
  /** URL segment, e.g. "nda-biology" → /notes/nda-biology. */
  subjectRoute: string;
  /** Display label, e.g. "NDA Biology". */
  subjectDisplay: string;
  chapterCount: number;
  subtopicCount: number;
};

export type NotesExamGroup = {
  slug: ExamSlug;
  /** Short label, e.g. "NDA". */
  displayName: string;
  /** Canonical exam name from the DB / registry, e.g. "NDA". */
  examName: string;
  subjects: NotesSubjectGroup[];
};

/** Build the subject groups for a single exam (registration order preserved). */
function subjectsForExam(examName: string): NotesSubjectGroup[] {
  const bySubject = new Map<string, NotesSubjectGroup>();
  for (const c of NOTES_CHAPTERS) {
    if (c.examName !== examName) continue;
    const existing = bySubject.get(c.subjectRoute);
    const subtopics = c.slugs.length;
    if (existing) {
      existing.chapterCount += 1;
      existing.subtopicCount += subtopics;
    } else {
      bySubject.set(c.subjectRoute, {
        subjectRoute: c.subjectRoute,
        subjectDisplay: c.subjectDisplay,
        chapterCount: 1,
        subtopicCount: subtopics,
      });
    }
  }
  return [...bySubject.values()];
}

/**
 * All exams that have at least one notes subject, in EXAM_REGISTRY order.
 * Used by the /notes cross-exam index.
 */
export function getNotesExamGroups(): NotesExamGroup[] {
  return EXAM_REGISTRY.map(toExamGroup).filter((g) => g.subjects.length > 0);
}

/**
 * One exam's group by slug. Returns the entry even when it has zero notes
 * subjects (so /notes/<slug> can show an honest "coming soon" instead of
 * 404). Returns null only for an unknown slug.
 */
export function getNotesExamGroup(slug: string): NotesExamGroup | null {
  const entry = EXAM_REGISTRY.find((e) => e.slug === slug);
  return entry ? toExamGroup(entry) : null;
}

function toExamGroup(entry: ExamEntry): NotesExamGroup {
  return {
    slug: entry.slug,
    displayName: entry.displayName,
    examName: entry.examName,
    subjects: subjectsForExam(entry.examName),
  };
}

/** Slugs of exams that should be statically pre-rendered for /notes/[examSlug]. */
export function notesExamSlugs(): ExamSlug[] {
  return EXAM_REGISTRY.map((e) => e.slug);
}
